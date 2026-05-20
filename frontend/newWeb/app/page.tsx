'use client'

import React from 'react'
import { useAuth } from '@/lib/flask-auth-context'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Leaf, Heart, Brain, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // React.useEffect(() => {
  //   if (!isLoading && isAuthenticated) {
  //     router.push('/dashboard')
  //   }
  // }, [isAuthenticated, isLoading, router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg">MindWell</span>
            </div>
            <div className="flex gap-4">
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative overflow-hidden">
        {/* Gradient orbs background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -ml-32 -mb-32" />
        </div>

        <div className="text-center space-y-8 relative z-10">
          <div className="inline-block">
            <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
              ✨ Evidence-Based Mental Health Assessments
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance leading-tight">
            Understand Your <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Emotional Well-Being</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Take evidence-based mental health assessments developed by medical professionals. Get compassionate support and personalized guidance in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary hover:opacity-90 shadow-lg hover:shadow-xl transition-all">
                Start Free Assessment
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto hover:bg-accent/10 transition-colors">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Comprehensive Assessment Tools
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose from multiple evidence-based assessment methods to understand your mental health better.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="group hover:shadow-xl hover:border-primary/30 transition-all duration-300 border border-border hover:scale-105 transform">
            <CardContent className="p-8 space-y-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
                <Brain className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">PHQ-9 Assessment</h3>
              <p className="text-muted-foreground leading-relaxed">
                The widely-used Patient Health Questionnaire to screen for depression. Quick and reliable.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">9 Questions</span>
                <span className="px-3 py-1 rounded-full bg-secondary/10 text-xs font-medium text-secondary">5 min</span>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:border-secondary/30 transition-all duration-300 border border-border hover:scale-105 transform">
            <CardContent className="p-8 space-y-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center group-hover:from-secondary/30 group-hover:to-secondary/20 transition-all">
                <TrendingUp className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">BDI-II Assessment</h3>
              <p className="text-muted-foreground leading-relaxed">
                Beck Depression Inventory-II provides deeper insight into depressive symptoms and severity.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">21 Questions</span>
                <span className="px-3 py-1 rounded-full bg-secondary/10 text-xs font-medium text-secondary">10 min</span>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:border-accent/30 transition-all duration-300 border border-border hover:scale-105 transform">
            <CardContent className="p-8 space-y-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent/20 transition-all">
                <Leaf className="h-7 w-7 text-accent" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">CES-D Assessment</h3>
              <p className="text-muted-foreground leading-relaxed">
                Center for Epidemiologic Studies Depression Scale for comprehensive emotional evaluation.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">20 Questions</span>
                <span className="px-3 py-1 rounded-full bg-secondary/10 text-xs font-medium text-secondary">5 min</span>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:border-primary/30 transition-all duration-300 border border-border hover:scale-105 transform">
            <CardContent className="p-8 space-y-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
                <Heart className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">AI-Powered Assessment</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our intelligent algorithm provides personalized evaluation based on modern AI technology.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">8 Questions</span>
                <span className="px-3 py-1 rounded-full bg-secondary/10 text-xs font-medium text-secondary">5 min</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 rounded-3xl my-20 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><rect fill=%22none%22 stroke=%22rgba(0,102,255,0.05)%22 width=%2299%22 height=%2299%22/></svg>')] opacity-50" />
        
        <div className="relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose MindWell?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 p-6 rounded-2xl bg-white/50 hover:bg-white transition-colors">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">Evidence-Based</h3>
              <p className="text-muted-foreground leading-relaxed">
                All our assessments are backed by clinical research and validated by mental health professionals.
              </p>
            </div>
            <div className="space-y-4 p-6 rounded-2xl bg-white/50 hover:bg-white transition-colors">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-secondary/30 to-secondary/10 flex items-center justify-center">
                <Heart className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">Compassionate Support</h3>
              <p className="text-muted-foreground leading-relaxed">
                We approach mental health with empathy and understanding, never judgment or stigma.
              </p>
            </div>
            <div className="space-y-4 p-6 rounded-2xl bg-white/50 hover:bg-white transition-colors">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">Privacy First</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your data is secure and confidential. We never share your information without consent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
          Ready to understand yourself better?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
          Take the first step toward better mental health today. It takes just a few minutes.
        </p>
        <Link href="/auth/signup">
          <Button size="lg">
            Start Your Free Assessment Now
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Features</a></li>
                <li><a href="#" className="hover:text-foreground">Assessments</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 MindWell. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
