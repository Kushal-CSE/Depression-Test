'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  username: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signup: (email: string, password: string, username: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  // Check if user is already logged in
  const checkAuth = useCallback(async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      
      if (authUser) {
        // Fetch user profile
        try {
          const response = await fetch('/api/auth/me')
          if (response.ok) {
            const data = await response.json()
            setUser(data.user)
          } else {
            setUser(null)
          }
        } catch (error) {
          console.error('[v0] Error fetching user profile:', error)
          setUser(null)
        }
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('[v0] Auth check error:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    checkAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_IN') {
        await checkAuth()
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [checkAuth, supabase.auth])

  const signup = useCallback(
    async (email: string, password: string, username: string) => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, username }),
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || 'Signup failed')
        }

        // After signup, redirect to verification page
        router.push('/auth/signup-success')
      } catch (error) {
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [router]
  )

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setIsLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          throw new Error(error.message)
        }

        // Fetch user profile after login
        await checkAuth()
        router.push('/dashboard')
      } catch (error) {
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [supabase.auth, checkAuth, router]
  )

  const logout = useCallback(async () => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signOut()

      if (error) {
        throw new Error(error.message)
      }

      setUser(null)
      router.push('/')
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [supabase.auth, router])

  const refreshUser = useCallback(async () => {
    await checkAuth()
  }, [checkAuth])

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signup,
    login,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
