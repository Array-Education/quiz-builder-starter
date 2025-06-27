import { NextRequest, NextResponse } from 'next/server'
import { GenerateQuestionSchema } from '@/lib/validations'
import { Question, ApiResponse } from '@/lib/types'

// TODO: Add AI generation endpoint here
// Consider: How would you handle rate limiting?
// Consider: What errors might OpenAI return?
// Consider: How long might generation take?

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Question>>> {
  try {
    const body = await request.json()
    
    // Validate request body
    const validationResult = GenerateQuestionSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.flatten() },
        { status: 400 }
      )
    }

    // TODO: Implement OpenAI integration
    // const { topic, difficulty } = validationResult.data
    
    // Steps to implement:
    // 1. Configure OpenAI client
    // 2. Create appropriate prompt for question generation
    // 3. Call OpenAI API
    // 4. Parse and validate response
    // 5. Store generated question in database
    // 6. Return created question

    return NextResponse.json(
      { error: 'AI generation not implemented yet - this is your interview task!' },
      { status: 501 }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}