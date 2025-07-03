import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { CreateQuestionsSchema } from '@/lib/validations'
import { Question, ApiResponse } from '@/lib/types'

export async function GET(): Promise<NextResponse<ApiResponse<Question[]>>> {
	try {
		// TODO: Add observability here
		// Consider: What metrics matter for this endpoint? 
		// Exectuion time, i.e. how long sql select would take. Ideally can be tracked with EXPLAIN ANALYZE, adding extra incides, caching results into redis or even adding some views if needed.
		// Consider: How would you track response times and error rates? I'd start simply with performance.now() and console.time/console.timeEnd, but in production would use some other tools like Sentry or maybe something Vercel provides out of the box.

		const { data: questions, error } = await supabase
			.from('questions')
			.select('*')
			.order('created_at', { ascending: false })

		if (error) {
			// TODO: Add proper error tracking
			// Consider: What information should be logged vs exposed to client? Full error message should be logged internally and never exposed to client. Client should only get generic error message, like "Failed to fetch questions".
			console.error('Error fetching questions:', error)
			return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
		}

		return NextResponse.json({ data: questions || [] })
	} catch (error) {
		console.error('Unexpected error:', error)
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
			console.error('Error fetching newly created questions:', error)
			return NextResponse.json({ error: 'Failed to fetch newly created questions' }, { status: 500 })
		}
		return NextResponse.json({ data: questions }, { status: 201 })
	} catch (error) {
		console.error('Unexpected error:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
