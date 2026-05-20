import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Mapping of ML prediction values (0,1,2,3) to severity levels and interpretations
const SEVERITY_MAP = {
  0: {
    level: 'minimal',
    label: 'Minimal Depressive Indicators',
    interpretation: 'Your responses suggest minimal depressive indicators. Continue maintaining positive mental health practices.',
    color: 'green',
  },
  1: {
    level: 'mild',
    label: 'Mild Depressive Indicators',
    interpretation: 'Your responses suggest mild depressive indicators. Consider self-care practices and monitoring your well-being.',
    color: 'yellow',
  },
  2: {
    level: 'moderate',
    label: 'Moderate Depressive Indicators',
    interpretation: 'Your responses suggest moderate depressive indicators. Professional support may be beneficial.',
    color: 'orange',
  },
  3: {
    level: 'severe',
    label: 'Severe Depressive Indicators',
    interpretation: 'Your responses suggest elevated depressive indicators. We strongly recommend consulting with a mental health professional.',
    color: 'red',
  },
}

const predictSchema = z.object({
  testType: z.enum(['phq9', 'bdi2', 'cesd', 'ai-test']),
  answers: z.record(z.number()),
})

interface MLPredictionResponse {
  prediction: 0 | 1 | 2 | 3
  confidence_score: number
  mental_health_tip?: string
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { testType, answers } = predictSchema.parse(body)

    // Call ML prediction service
    const mlServiceUrl = process.env.NEXT_PUBLIC_ML_SERVICE_URL
    if (!mlServiceUrl) {
      return NextResponse.json(
        { error: 'ML service not configured' },
        { status: 500 }
      )
    }

    console.log('[v0] Calling ML prediction service at:', mlServiceUrl)
    const mlResponse = await fetch(`${mlServiceUrl}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
    })

    if (!mlResponse.ok) {
      const errorText = await mlResponse.text()
      console.error('[v0] ML service error:', mlResponse.status, errorText)
      throw new Error(`ML service returned ${mlResponse.status}`)
    }

    const mlData: MLPredictionResponse = await mlResponse.json()
    
    // Extract prediction (0, 1, 2, 3)
    const predictionValue = mlData.prediction as 0 | 1 | 2 | 3
    const severityInfo = SEVERITY_MAP[predictionValue]
    const confidencePercentage = Math.round(mlData.confidence_score * 100)

    // Generate recommendations based on severity level
    const recommendations = generateRecommendations(predictionValue, mlData.mental_health_tip)

    // Save result to database
    const { data, error } = await supabase
      .from('test_results')
      .insert({
        user_id: user.id,
        test_type: testType,
        score: predictionValue,
        severity_level: severityInfo.level,
        interpretation: severityInfo.interpretation,
        recommendations,
        answers,
      })
      .select()
      .single()

    if (error) {
      console.error('[v0] Test submission error:', error)
      return NextResponse.json(
        { error: 'Failed to save test results' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Test results saved successfully',
        result: {
          id: data.id,
          testType: data.test_type,
          score: data.score,
          severityLevel: data.severity_level,
          severityLabel: severityInfo.label,
          interpretation: data.interpretation,
          recommendations: data.recommendations,
          confidencePercentage,
          createdAt: data.created_at,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('[v0] Prediction error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

function generateRecommendations(
  predictionValue: 0 | 1 | 2 | 3,
  mlTip?: string
): string[] {
  const baseRecommendations: Record<number, string[]> = {
    0: [
      'Continue maintaining your current mental health practices',
      'Engage in regular physical activity and exercise',
      'Keep a consistent sleep schedule',
      'Stay connected with supportive friends and family',
    ],
    1: [
      'Practice stress-reduction techniques like meditation or deep breathing',
      'Maintain a regular exercise routine',
      'Ensure adequate sleep (7-9 hours per night)',
      'Consider journaling to track your thoughts and feelings',
      'Reach out to friends or family for support',
    ],
    2: [
      'Consider speaking with a mental health professional',
      'Establish a structured daily routine',
      'Engage in activities you enjoy and find meaningful',
      'Practice self-compassion and be gentle with yourself',
      'Limit alcohol and caffeine intake',
      'Schedule regular check-ins with trusted people',
    ],
    3: [
      'We strongly encourage you to speak with a mental health professional',
      'Consider calling 988 (Suicide & Crisis Lifeline) for immediate support',
      'Reach out to SAMHSA National Helpline: 1-800-662-4357',
      'Share your results with someone you trust',
      'Prioritize self-care and safety',
      'Explore therapy options (individual, group, or online counseling)',
    ],
  }

  const recommendations = baseRecommendations[predictionValue] || []
  
  // Add ML-specific tip if available
  if (mlTip && mlTip !== 'Model confidence is low. Consider retaking the assessment.') {
    recommendations.unshift(mlTip)
  }

  return recommendations
}
