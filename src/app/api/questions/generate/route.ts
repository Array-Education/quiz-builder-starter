import { NextRequest, NextResponse } from 'next/server'
import { GenerateQuestionSchema } from '@/lib/validations'
import { Question, ApiResponse, chatGPTModel } from '@/lib/types'
import { formatPrompt } from '@/lib/utils'
import { getChatGPTModelQuestions } from '@/lib/chatGPTHandler'

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Question[]>>> {
	try {
		const body = await request.json()
		console.log('Received request body:', body)
		// Validate request body
		const validationResult = GenerateQuestionSchema.safeParse(body)
		if (!validationResult.success) {
			return NextResponse.json(
				{ error: 'Invalid request data', details: validationResult.error.flatten() },
				{ status: 400 }
			)
		}
		const { topic, difficulty } = validationResult.data

		const { messages, model } = formatPrompt(process.env.OPENAI_API_MODEL as chatGPTModel, topic, difficulty)

		let questions: Question[] = []

		return getChatGPTModelQuestions(model, messages, difficulty, topic)
			.then((data) => {
				questions = data
				return NextResponse.json({ data: questions }, { status: 200 })
			})
			.catch(() => {
				return NextResponse.json({ error: 'Service not available' }, { status: 503 })
			})
		//
	} catch (error) {
		return NextResponse.json({ error: 'Service not available' }, { status: 503 })
	}
}
