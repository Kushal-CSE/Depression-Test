import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
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

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const testType = searchParams.get('testType')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build query
    let query = supabase
      .from('test_results')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    // Filter by test type if provided
    if (testType && ['phq9', 'bdi2', 'cesd', 'ai-test'].includes(testType)) {
      query = query.eq('test_type', testType)
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) {
      console.error('History fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch test history' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        results: (data || []).map((result) => ({
          id: result.id,
          testType: result.test_type,
          score: result.score,
          severityLevel: result.severity_level,
          interpretation: result.interpretation,
          recommendations: result.recommendations,
          createdAt: result.created_at,
        })),
        total: count || 0,
        limit,
        offset,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('History fetch error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
