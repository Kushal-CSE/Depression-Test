import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { TestType } from '@/lib/types'
import { testInfo } from '@/lib/test-data'
import { ArrowRight } from 'lucide-react'

interface TestCardProps {
  testType: TestType
  completed?: boolean
  lastTaken?: string
}

export function TestCard({ testType, completed, lastTaken }: TestCardProps) {
  const info = testInfo[testType]
  
  const getGradient = (type: TestType) => {
    switch(type) {
      case 'phq9':
        return 'from-primary/20 to-primary/5'
      case 'bdi2':
        return 'from-secondary/20 to-secondary/5'
      case 'cesd':
        return 'from-accent/20 to-accent/5'
      case 'ai-test':
        return 'from-primary/20 to-accent/5'
      default:
        return 'from-primary/20 to-primary/5'
    }
  }
  
  const getAccentColor = (type: TestType) => {
    switch(type) {
      case 'phq9':
        return 'text-primary'
      case 'bdi2':
        return 'text-secondary'
      case 'cesd':
        return 'text-accent'
      case 'ai-test':
        return 'text-primary'
      default:
        return 'text-primary'
    }
  }

  return (
    <Link href={`/tests/${testType}`}>
      <Card className={`group hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer h-full border border-border bg-gradient-to-br ${getGradient(testType)} hover:border-primary/30 overflow-hidden relative`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <CardHeader className="relative z-10">
          <div className={`h-12 w-12 rounded-xl bg-white/50 backdrop-blur-sm flex items-center justify-center mb-3 ${getAccentColor(testType)} group-hover:scale-110 transition-transform`}>
            {testType === 'phq9' && <span className="text-lg font-bold">📋</span>}
            {testType === 'bdi2' && <span className="text-lg font-bold">📊</span>}
            {testType === 'cesd' && <span className="text-lg font-bold">🌱</span>}
            {testType === 'ai-test' && <span className="text-lg font-bold">🤖</span>}
          </div>
          <CardTitle className="text-lg text-foreground">{info.name}</CardTitle>
          <CardDescription className="text-muted-foreground">{info.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 relative z-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1 p-3 rounded-lg bg-white/50 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Questions</p>
              <p className={`text-2xl font-bold ${getAccentColor(testType)}`}>{info.questions}</p>
            </div>
            <div className="space-y-1 p-3 rounded-lg bg-white/50 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Duration</p>
              <p className={`text-2xl font-bold ${getAccentColor(testType)}`}>{info.duration}</p>
            </div>
          </div>
          
          {completed && (
            <div className="pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                📅 Last taken: {lastTaken}
              </p>
            </div>
          )}
          
          <Button className="w-full group/btn bg-gradient-to-r from-primary to-primary hover:shadow-lg transition-all gap-2" size="sm">
            {completed ? 'Retake Test' : 'Start Test'}
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
