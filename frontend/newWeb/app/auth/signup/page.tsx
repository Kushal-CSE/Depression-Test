'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { signupSchema, SignupInput } from '@/lib/schemas'
import { useAuth } from '@/lib/supabase-auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField } from '@/components/form-field'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const { signup } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [globalError, setGlobalError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  })

  async function onSubmit(data: SignupInput) {
    setIsLoading(true)
    setGlobalError(null)

    try {
      await signup(data.email, data.password, data.username)
      // Redirect happens in signup function
    } catch (error: any) {
      const message = error.message || 'Failed to create account. Please try again.'
      setGlobalError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-background p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -ml-32 -mb-32" />
      </div>

      <Card className="w-full max-w-md border border-border/50 shadow-2xl hover:shadow-3xl transition-shadow relative z-10 bg-card/95 backdrop-blur-sm">
        <CardHeader className="space-y-3 pb-6">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-2">
            <span className="text-xl font-bold text-white">🌱</span>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Create Account</CardTitle>
          <CardDescription className="text-base">Join to begin your mental health journey</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {globalError && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                <p className="text-sm text-destructive">{globalError}</p>
              </div>
            )}

            <FormField label="Email Address" error={errors.email} required>
              <Input
                {...register('email')}
                type="email"
                placeholder="name@example.com"
                disabled={isLoading}
              />
            </FormField>

            <FormField label="Username" error={errors.username} required>
              <Input
                {...register('username')}
                type="text"
                placeholder="your_username"
                disabled={isLoading}
              />
            </FormField>

            <FormField label="Password" error={errors.password} required>
              <Input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground mt-2">
                At least 8 characters, one uppercase letter, and one number
              </p>
            </FormField>

            <FormField label="Confirm Password" error={errors.confirmPassword} required>
              <Input
                {...register('confirmPassword')}
                type="password"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </FormField>

            <Button type="submit" disabled={isLoading} size="lg" className="w-full bg-gradient-to-r from-secondary to-secondary hover:shadow-lg transition-all font-semibold">
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card/95 px-2 text-muted-foreground font-medium">Or sign up with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full gap-2 hover:bg-secondary/5 hover:border-secondary/30 transition-all" disabled={isLoading}>
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href="/auth/login" className="text-primary font-semibold hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
