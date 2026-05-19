import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const submitTestSchema = z.object({
  testType: z.enum(['phq9', 'bdi2', 'cesd', 'ai-test']),
  score: z.number().int().min(0),
  severityLevel: z.string(),
  interpretation: z.string(),
  recommendations: z.array(z.string()).default([]),
  answers: z.record(z.number()).default({}),
})

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
    
    // Validate input
    const validatedData = submitTestSchema.parse(body)
    const { testType, score, severityLevel, interpretation, recommendations, answers } = validatedData

    // Insert test result
    const { data, error } = await supabase
      .from('test_results')
      .insert({
        user_id: user.id,
        test_type: testType,
        score,
        severity_level: severityLevel,
        interpretation,
        recommendations,
        answers,
      })
      .select()
      .single()

    if (error) {
      console.error('Test submission error:', error)
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
          interpretation: data.interpretation,
          recommendations: data.recommendations,
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

    console.error('Test submission error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
