"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { formSections, getDefaultFormData } from "@/lib/assessment-data"
import { AssessmentFormSection } from "./form-section"
import { ProgressIndicator } from "./progress-indicator"
import { ResultDisplay, type AssessmentResult } from "./result-display"
import { SubmissionPopup } from "./submission-popup"
import { ChevronLeft, ChevronRight, Send, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function AssessmentForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, number | string>>(
    getDefaultFormData()
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [submissionDate, setSubmissionDate] = useState<Date>(new Date())

  const handleChange = useCallback((key: string, value: number | string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleNext = () => {
    if (currentStep < formSections.length - 1) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleShowPopup = () => {
    setSubmissionDate(new Date())
    setShowPopup(true)
  }

  const handlePopupCancel = () => {
    setShowPopup(false)
  }

  const handleSubmit = async (userName: string, isAnonymous: boolean) => {
    setIsSubmitting(true)
    setError(null)

    // Build the request body according to the new format
    const requestBody = {
      name: isAnonymous ? "User" : userName,
      submitted_at: submissionDate.toISOString(),
      responses: formData,
    }

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error("Failed to get prediction. Please try again.")
      }

      const data = await response.json()
      setResult({
        prediction: data.prediction,
        confidence: data.confidence,
        evaluation: data.evaluation || getDefaultEvaluation(data.prediction),
        recommendations:
          data.recommendations || getDefaultRecommendations(data.prediction),
        userName: isAnonymous ? "User" : userName,
        submittedAt: submissionDate,
      })
      setShowPopup(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setShowPopup(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setFormData(getDefaultFormData())
    setResult(null)
    setError(null)
    setSubmissionDate(new Date())
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const isLastStep = currentStep === formSections.length - 1
  const currentSection = formSections[currentStep]

  if (result) {
    return <ResultDisplay result={result} onReset={handleReset} />
  }

  return (
    <div className="space-y-6">
      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={formSections.length}
        sectionTitles={formSections.map((s) => s.title)}
      />

      <Card className="p-6 md:p-8">
        <AssessmentFormSection
          section={currentSection}
          formData={formData}
          onChange={handleChange}
        />
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between gap-4">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <div className="flex gap-2">
          {!isLastStep ? (
            <Button onClick={handleNext} className="gap-2">
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleShowPopup} className="gap-2">
              <Send className="h-4 w-4" />
              <span>Submit Assessment</span>
            </Button>
          )}
        </div>
      </div>

      <SubmissionPopup
        open={showPopup}
        submissionDate={submissionDate}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onCancel={handlePopupCancel}
      />
    </div>
  )
}

// Default evaluation messages if not provided by API
// function getDefaultEvaluation(prediction: number): string {
//   if (prediction === 1) {
//     return "Based on your responses, several indicators suggest that you may be experiencing symptoms associated with depression. This is not a diagnosis, but rather an indication that speaking with a mental health professional could be beneficial."
//   }
//   return "Based on your responses, your current indicators appear to be within normal ranges. While this is encouraging, remember that mental health is dynamic. Continue monitoring your wellbeing and don't hesitate to seek support if needed."
// }
function getDefaultEvaluation(prediction: number): string {
  switch (prediction) {
    case 0:
      return "Mild indicators. Maintain a healthy lifestyle and monitor your mental well-being."

    case 1:
      return "Some signs of stress or low mood. Consider talking to someone you trust."

    case 2:
      return "Moderate indicators of depression. It is recommended to consult a mental health professional."

    case 3:
      return "High risk detected. Please consult a doctor or mental health professional as soon as possible."

    default:
      return "Unable to evaluate."
  }
}

// Default recommendations if not provided by API
// function getDefaultRecommendations(prediction: number): string[] {
//   if (prediction === 1) {
//     return [
//       "Consider scheduling an appointment with a mental health professional for a proper evaluation",
//       "Reach out to trusted friends or family members about how you're feeling",
//       "Practice self-care activities such as regular exercise, adequate sleep, and healthy eating",
//       "Avoid isolating yourself - try to maintain social connections even when it feels difficult",
//       "If you're having thoughts of self-harm, please contact a crisis helpline immediately",
//     ]
//   }
//   return [
//     "Continue maintaining healthy sleep habits (7-9 hours per night)",
//     "Stay physically active - aim for at least 30 minutes of moderate activity most days",
//     "Nurture your social connections and relationships",
//     "Practice stress management techniques such as mindfulness or deep breathing",
//     "Check in with yourself regularly and be aware of any changes in your mood or behavior",
//   ]
// }
function getDefaultRecommendations(prediction: number): string[] {
  switch (prediction) {
    case 0:
      return [
        "Maintain healthy habits",
        "Exercise regularly",
        "Stay socially connected",
      ]

    case 1:
      return [
        "Talk to friends/family",
        "Practice relaxation techniques",
        "Monitor mood regularly",
      ]

    case 2:
      return [
        "Consult a therapist",
        "Avoid isolation",
        "Follow structured daily routine",
      ]

    case 3:
      return [
        "Seek immediate professional help",
        "Contact a mental health helpline",
        "Do not stay alone during distress",
      ]

    default:
      return ["No recommendations available"]
  }
}
