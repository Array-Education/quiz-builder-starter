import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { CreateQuestionsSchema } from '@/lib/validations'
import { Question, ApiResponse } from '@/lib/types'

export async function GET(): Promise<NextResponse<ApiResponse<Question[]>>> {
	try {
		const startTime = performance.now()
		
		const { data: questions, error } = await supabase
			.from('questions')
			.select('*')
			.order('created_at', { ascending: false })

		const endTime = performance.now()
		console.log(`Questions fetch took ${endTime - startTime} milliseconds`)

		if (error) {
			console.error('Database error fetching questions:', {
				error: error.message,
				code: error.code,
				details: error.details
			})
			return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
		}

		return NextResponse.json({ data: questions || [] })
	} catch (error) {
		console.error('Unexpected error in GET /api/questions:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Array<Question>>>> {
	try {
		const body = await request.json()
		// Validate request body
		const validationResult = CreateQuestionsSchema.safeParse(body)
		if (!validationResult.success) {
			return NextResponse.json(
				{ error: 'Invalid request data', details: validationResult.error.flatten() },
				{ status: 400 }
			)
		}
		// Insert questions into database
		const { data: questions, error } = await supabase
      .from('questions')
      .insert(validationResult.data)
      .select()
			.order('created_at', { ascending: false })

		if (error) {
			console.error('Database error creating questions:', {
				error: error.message,
				code: error.code,
				details: error.details
			})
			return NextResponse.json({ error: 'Failed to create questions' }, { status: 500 })
		}
		return NextResponse.json({ data: questions }, { status: 201 })
	} catch (error) {
		console.error('Unexpected error in POST /api/questions:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
