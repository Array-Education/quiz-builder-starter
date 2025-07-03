import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Difficulty, CreateQuestionRequest, chatGPTModelCompletionRequest, chatGPTModel } from './types'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatPrompt(
	model: chatGPTModel = 'gpt-4.1',
	topic: string,
	difficulty: Difficulty
): chatGPTModelCompletionRequest {
	return {
		model,
		messages: [
			{
				role: 'developer',
				content: `${topic}. If we were to make a scale from easy to medium to hard, give me an answer on a ${difficulty} level. Send the list of questions separated by;`,
			},
		],
	}
}

export function formatChatGPTResponse(response: string): string[] {
	const formattedChatGPTResponse = response
		.split(';')
		.map((question) => question.trim())
		.filter((question) => question.length > 0)
		.slice(1)
	return formattedChatGPTResponse
}

export function clientGenerateQuestionsWithAI(questionRequest: CreateQuestionRequest) {
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

export function createQuestions(data: Array<CreateQuestionRequest>) {
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
