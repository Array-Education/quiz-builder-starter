import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Difficulty, ChatGPTModelCompletionRequest, ChatGPTModel } from './types'
import { CreateQuestionData } from './validations'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatPrompt(
	model: ChatGPTModel = 'gpt-4.1',
	topic: string,
	difficulty: Difficulty
): ChatGPTModelCompletionRequest {
	return {
		model,
		messages: [
			{
				role: 'system',
				content: `You are an expert question generator. Create 5-10 ${difficulty} level questions about ${topic}. Format your response as a semicolon-separated list of questions. Start with 'Questions:' followed by the questions.`,
			},
		],
	}
}

export function formatChatGPTResponse(response: string): string[] {
	if (!response || typeof response !== 'string') {
		return []
	}
	
	const formattedChatGPTResponse = response
		.split(';')
		.map((question) => question.trim())
		.filter((question) => question.length > 0)
		.filter((question) => !question.toLowerCase().includes('questions:'))
		.slice(0, 5)
	
	return formattedChatGPTResponse
}

export function clientGenerateQuestionsWithAI(questionRequest: CreateQuestionData) {
	return fetch('/api/questions/generate', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(questionRequest),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			return response.json()
		})
		.then((data) => {
			if (data.error) {
				throw new Error(data.error)
			}
			return data.data
		})
		.catch((error) => {
			console.error('Error generating questions:', error)
			throw error
		})
}

export function createQuestions(data: Array<CreateQuestionData>) {
	return fetch('/api/questions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			return response.json()
		})
		.then((data) => {
			if (data.error) {
				throw new Error(data.error)
			}
			return data
		})
}

export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}