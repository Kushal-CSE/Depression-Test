'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authAPI } from './flask-client'

interface User {
  id: string
  email: string
  username: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signup: (email: string, password: string, username: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('flask_token')
        if (token) {
          const userData = await authAPI.getCurrentUser()
          setUser(userData)
        }
      } catch (error) {
        console.error('[v0] Auth check failed:', error)
        localStorage.removeItem('flask_token')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signup = async (email: string, password: string, username: string) => {
    try {
      const userData = await authAPI.signup(email, password, username)
      setUser(userData)
      router.push('/dashboard')
    } catch (error) {
      console.error('[v0] Signup failed:', error)
      throw error
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const userData = await authAPI.login(email, password)
      setUser(userData)
      router.push('/dashboard')
    } catch (error) {
      console.error('[v0] Login failed:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await authAPI.logout()
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('[v0] Logout failed:', error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
