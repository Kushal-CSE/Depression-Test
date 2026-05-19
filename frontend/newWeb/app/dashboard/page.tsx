'use client'

import React from 'react'
import { useAuth } from '@/lib/supabase-auth-context'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TestCard } from '@/components/test-card'
import { LogOut, User, BarChart3, History } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login')
    }
  }, [user, isLoading, router])

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-12 w-48 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-32" />
        <div className="absolute bottom-32 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -ml-32" />
      </div>

      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-xl sticky top-0 z-40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome back, <span className="font-semibold text-foreground">{user.username}</span></p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/profile">
                <Button variant="outline" size="sm" className="gap-2 hover:bg-primary/10 hover:border-primary/30">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 hover:bg-destructive/10 hover:border-destructive/30 text-destructive">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border border-border/50 bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">Total Tests</p>
                  <p className="text-4xl font-bold text-primary">0</p>
                </div>
                <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border border-border/50 bg-gradient-to-br from-secondary/5 to-transparent hover:border-secondary/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">Last Assessment</p>
                  <p className="text-2xl font-semibold text-foreground">—</p>
                  <p className="text-xs text-muted-foreground">No assessments yet</p>
                </div>
                <div className="h-16 w-16 rounded-2xl bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                  <History className="h-8 w-8 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border border-border/50 bg-gradient-to-br from-accent/5 to-transparent hover:border-accent/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">Member Since</p>
                  <p className="text-lg font-semibold text-foreground">
                    {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div className="h-16 w-16 rounded-2xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <User className="h-8 w-8 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tests Section */}
        <div className="mb-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Available Assessments</h2>
            <p className="text-muted-foreground">
              Choose an assessment to understand your emotional well-being
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TestCard testType="phq9" />
            <TestCard testType="bdi2" />
            <TestCard testType="cesd" />
            <TestCard testType="ai-test" />
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Recent Results</h2>
            <p className="text-muted-foreground">No assessments completed yet</p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  Start your first assessment to track your progress and get personalized insights.
                </p>
                <Link href="/tests/phq9">
                  <Button>Take Your First Assessment</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
