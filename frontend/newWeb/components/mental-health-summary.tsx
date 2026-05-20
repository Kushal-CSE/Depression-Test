'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingDown, AlertCircle, Lightbulb } from 'lucide-react'

interface MentalHealthSummaryProps {
  latestResult?: {
    prediction: number
    confidence_score: number
    test_type: string
    created_at: string
  }
  totalTests: number
}

export function MentalHealthSummary({ latestResult, totalTests }: MentalHealthSummaryProps) {
  const getSeverityDisplay = (prediction: number) => {
    const severityMap = {
      0: { label: 'Minimal', color: 'bg-green-100 text-green-800', icon: '😊' },
      1: { label: 'Mild', color: 'bg-yellow-100 text-yellow-800', icon: '🙂' },
      2: { label: 'Moderate', color: 'bg-orange-100 text-orange-800', icon: '😐' },
      3: { label: 'Severe', color: 'bg-red-100 text-red-800', icon: '😞' }
    }
    return severityMap[prediction as keyof typeof severityMap] || severityMap[0]
  }

  if (!latestResult) {
    return (
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-primary" />
            Mental Health Status
          </CardTitle>
          <CardDescription>Track your mental wellness journey</CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <div className="text-center py-8 space-y-4">
            <p className="text-muted-foreground">No assessments yet</p>
            <p className="text-sm text-muted-foreground">
              Start your first mental health assessment to track your wellness
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const severity = getSeverityDisplay(latestResult.prediction)
  const confidencePercentage = Math.round(latestResult.confidence_score * 100)
  const formattedDate = new Date(latestResult.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-primary" />
              Mental Health Status
            </CardTitle>
            <CardDescription>Based on your latest assessment</CardDescription>
          </div>
          <span className="text-4xl">{severity.icon}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-8 space-y-6">
        {/* Current Status */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Current Status
          </p>
          <div className="flex items-end gap-4">
            <Badge className={`${severity.color} text-lg px-4 py-2 rounded-lg`}>
              {severity.label}
            </Badge>
            <p className="text-3xl font-bold text-primary">{latestResult.prediction}</p>
            <p className="text-muted-foreground">/3</p>
          </div>
        </div>

        {/* Confidence */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Model Confidence
          </p>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all"
                  style={{ width: `${confidencePercentage}%` }}
                />
              </div>
            </div>
            <span className="font-semibold text-lg">{confidencePercentage}%</span>
          </div>
        </div>

        {/* Assessment Info */}
        <div className="p-3 rounded-lg bg-muted/50 space-y-1">
          <p className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Last Assessment
          </p>
          <p className="text-sm text-muted-foreground">
            {formattedDate} • {latestResult.test_type}
          </p>
          <p className="text-sm text-muted-foreground">
            Total assessments completed: {totalTests}
          </p>
        </div>

        {/* Quick Insight */}
        {latestResult.prediction >= 2 && (
          <div className="p-4 rounded-lg border-l-4 border-orange-400 bg-orange-50">
            <p className="text-sm text-orange-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              Consider reaching out to a mental health professional for support and guidance.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
