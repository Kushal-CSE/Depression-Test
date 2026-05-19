import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params

    // Fetch specific test result
    const { data, error } = await supabase
      .from('test_results')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: 'Test result not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        result: {
          id: data.id,
          testType: data.test_type,
          score: data.score,
          severityLevel: data.severity_level,
          interpretation: data.interpretation,
          recommendations: data.recommendations,
          answers: data.answers,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Result fetch error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
