'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, Heart, TrendingDown, MessageCircle, Share2 } from 'lucide-react'

interface MentalHealthResult {
  prediction: number // 0-3
  confidence_score: number // 0-1
  mental_health_tip: string
  test_type?: string
}

export function MentalHealthResultCard({ result }: { result: MentalHealthResult }) {
  const getSeverityInfo = (prediction: number) => {
    const severityMap = {
      0: {
        label: 'Minimal',
        description: 'Your responses indicate minimal depressive symptoms',
        color: 'from-green-500 to-emerald-500',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-700',
        icon: '😊',
        recommendations: [
          'Continue your healthy lifestyle and self-care practices',
          'Maintain regular exercise and sleep schedule',
          'Stay connected with friends and family',
          'Practice mindfulness or meditation regularly'
        ]
      },
      1: {
        label: 'Mild',
        description: 'Your responses suggest mild depressive symptoms',
        color: 'from-yellow-500 to-amber-500',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        textColor: 'text-yellow-700',
        icon: '🙂',
        recommendations: [
          'Consider talking to someone you trust about your feelings',
          'Engage in activities you enjoy regularly',
          'Get adequate sleep and eat nutritious meals',
          'Monitor your mood and seek support if needed'
        ]
      },
      2: {
        label: 'Moderate',
        description: 'Your responses indicate moderate depressive symptoms',
        color: 'from-orange-500 to-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        textColor: 'text-orange-700',
        icon: '😐',
        recommendations: [
          'Consider speaking with a mental health professional',
          'Reach out to a trusted friend or family member',
          'Establish a daily routine with healthy activities',
          'Limit social media and screen time',
          'Consider therapy or counseling services'
        ]
      },
      3: {
        label: 'Severe',
        description: 'Your responses suggest significant depressive symptoms',
        color: 'from-red-500 to-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-700',
        icon: '😞',
        recommendations: [
          'Please reach out to a mental health professional immediately',
          'Contact a crisis helpline for immediate support',
          'Talk to a trusted family member or friend today',
          'Consider visiting your doctor or psychiatrist',
          'If in crisis, please call emergency services or a crisis hotline'
        ]
      }
    }

    return severityMap[prediction as keyof typeof severityMap] || severityMap[0]
  }

  const severity = getSeverityInfo(result.prediction)
  const confidencePercentage = Math.round(result.confidence_score * 100)

  return (
    <div className="w-full space-y-6">
      {/* Main Result Card */}
      <Card className={`border-2 ${severity.borderColor} ${severity.bgColor} overflow-hidden`}>
        <CardHeader className={`bg-gradient-to-r ${severity.color} text-white`}>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle className="text-3xl">Mental Health Assessment Results</CardTitle>
              <p className="text-white/90">Your personalized mental wellness evaluation</p>
            </div>
            <div className="text-6xl">{severity.icon}</div>
          </div>
        </CardHeader>

        <CardContent className="pt-8 space-y-8">
          {/* Severity Level Display */}
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Severity Level
              </p>
              <h3 className={`text-4xl font-bold ${severity.textColor}`}>
                {severity.label}
              </h3>
              <p className="text-muted-foreground text-lg">
                {severity.description}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Prediction Score */}
            <div className="p-4 rounded-lg bg-white border border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                Severity Score
              </p>
              <div className="flex items-baseline gap-2">
                <p className={`text-3xl font-bold ${severity.textColor}`}>
                  {result.prediction}
                </p>
                <p className="text-muted-foreground">/3</p>
              </div>
            </div>

            {/* Confidence Score */}
            <div className="p-4 rounded-lg bg-white border border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                Model Confidence
              </p>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-primary">
                    {confidencePercentage}%
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${severity.color} h-2 rounded-full transition-all`}
                    style={{ width: `${confidencePercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI Tip */}
          <div className={`p-4 rounded-lg border-l-4 ${severity.borderColor} bg-white`}>
            <div className="flex gap-3">
              <MessageCircle className={`flex-shrink-0 ${severity.textColor}`} />
              <div>
                <p className="font-semibold text-foreground mb-1">AI Insight</p>
                <p className="text-muted-foreground">{result.mental_health_tip}</p>
              </div>
            </div>
          </div>

          {/* Key Recommendations */}
          <div className="space-y-3">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-primary" />
              Recommendations for You
            </h4>
            <div className="space-y-2">
              {severity.recommendations.map((rec, idx) => (
                <div key={idx} className="flex gap-3 p-3 rounded-lg bg-white border border-border">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${severity.bgColor}`}>
                    <span className={`text-xs font-bold ${severity.textColor}`}>
                      {idx + 1}
                    </span>
                  </div>
                  <p className="text-foreground">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Crisis Resources - Show for Severe */}
          {result.prediction === 3 && (
            <div className="p-4 rounded-lg border-2 border-red-300 bg-red-50">
              <div className="flex gap-3 items-start">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-3">
                  <p className="font-semibold text-red-900">Immediate Support Available</p>
                  <p className="text-red-800 text-sm">
                    You deserve support. Please reach out to a mental health professional or crisis service immediately.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="text-sm">
                      <p className="font-semibold text-red-900">National Helpline</p>
                      <p className="text-red-800">988 (US)</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold text-red-900">Crisis Text Line</p>
                      <p className="text-red-800">Text HOME to 741741</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button className="flex-1 gap-2" variant="default">
              <Share2 className="w-4 h-4" />
              Save Results
            </Button>
            <Button className="flex-1 gap-2" variant="outline">
              <Heart className="w-4 h-4" />
              Share with Doctor
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info Box */}
      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Note:</span> This assessment is for informational purposes only and should not replace professional medical advice. Please consult a mental health professional for diagnosis and treatment.
        </p>
      </div>
    </div>
  )
}
