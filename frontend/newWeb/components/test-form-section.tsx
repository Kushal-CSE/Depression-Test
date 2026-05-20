'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ChevronRight, Clock } from 'lucide-react'

interface Question {
  id: string
  text: string
  options: { value: number; label: string }[]
}

interface TestFormSectionProps {
  currentQuestion: number
  totalQuestions: number
  question: Question
  isLoading: boolean
  onAnswerSelect: (value: number) => void
  onSubmit: () => void
  selectedAnswers: Record<string, number>
}

export function TestFormSection({
  currentQuestion,
  totalQuestions,
  question,
  isLoading,
  onAnswerSelect,
  onSubmit,
  selectedAnswers
}: TestFormSectionProps) {
  const progress = ((currentQuestion) / totalQuestions) * 100
  const isAnswered = selectedAnswers[question.id] !== undefined
  const isLastQuestion = currentQuestion === totalQuestions

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white pb-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-white">Mental Health Assessment</CardTitle>
              <p className="text-white/90 mt-2">Answer honestly for accurate results</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white">{currentQuestion}</p>
              <p className="text-white/80 text-sm">of {totalQuestions}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-white/30 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-white/80">{Math.round(progress)}% Complete</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-8 space-y-8">
        {/* Question */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground leading-relaxed">
            {question.text}
          </h2>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Select one response that best applies to you
          </p>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = selectedAnswers[question.id] === option.value
            return (
              <button
                key={option.value}
                onClick={() => onAnswerSelect(option.value)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 bg-white'
                } hover:shadow-md`}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{option.label}</p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                      isSelected
                        ? 'border-primary bg-primary'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {isSelected && (
                      <CheckCircle2 className="w-6 h-6 text-primary absolute" />
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-4 border-t border-border">
          {isLastQuestion ? (
            <Button
              onClick={onSubmit}
              disabled={!isAnswered || isLoading}
              className="flex-1 gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              size="lg"
            >
              {isLoading ? 'Processing...' : 'Get Results'}
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={onSubmit}
              disabled={!isAnswered || isLoading}
              className="flex-1 gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              size="lg"
            >
              Next Question
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Answer Summary */}
        <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Progress:</span> You've answered {Object.keys(selectedAnswers).length} of {totalQuestions} questions
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
