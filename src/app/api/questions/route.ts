import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { CreateQuestionSchema } from '@/lib/validations'
import { Question, ApiResponse } from '@/lib/types'

export async function GET(): Promise<NextResponse<ApiResponse<Question[]>>> {
  try {
    // TODO: Add observability here
    // Consider: What metrics matter for this endpoint?
    // Consider: How would you track response times and error rates?
    
    const { data: questions, error } = await supabase
      .from('questions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      // TODO: Add proper error tracking
      // Consider: What information should be logged vs exposed to client?
      console.error('Error fetching questions:', error)
      return NextResponse.json(
        { error: 'Failed to fetch questions' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: questions || [] })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Question>>> {
  try {
    const body = await request.json()
    
    // Validate request body
    const validationResult = CreateQuestionSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.flatten() },
        { status: 400 }
      )
    }

    const { topic, difficulty, question_text } = validationResult.data

    // Insert question into database
    const { data: question, error } = await supabase
      .from('questions')
      .insert([{
        topic,
        difficulty,
        question_text,
      }])
      .select()
      .single()

    if (error) {
      console.error('Error creating question:', error)
      return NextResponse.json(
        { error: 'Failed to create question' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: question }, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}