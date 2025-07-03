import { NextRequest, NextResponse } from 'next/server'
import { GenerateQuestionSchema } from '@/lib/validations'
import { Question, ApiResponse, ChatGPTModel } from '@/lib/types'
import { formatPrompt } from '@/lib/utils'
import { getChatGPTModelQuestions } from '@/lib/chatGPTHandler'

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Question[]>>> {
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
		const { topic, difficulty } = validationResult.data

		const { messages, model } = formatPrompt(process.env.OPENAI_API_MODEL as ChatGPTModel, topic, difficulty)

		const questions = await getChatGPTModelQuestions(model, messages, difficulty, topic)
		return NextResponse.json({ data: questions }, { status: 200 })
	} catch (error) {
		console.error('Error generating questions with AI:', error)
		return NextResponse.json({ error: 'Failed to generate questions' }, { status: 500 })
	}
}
