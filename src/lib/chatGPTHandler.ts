import { chatGPTModel, chatGPTModelCompletionResponse, Difficulty, chatGPTModelCompletionChoiceMessage } from './types'
import { chatGPTModelAPIURL, chatGPTModelAPIKey } from './consts'
import { formatChatGPTResponse } from './utils'

export async function getChatGPTModelQuestions(
	model: chatGPTModel,
	messages: Array<chatGPTModelCompletionChoiceMessage>,
	difficulty: Difficulty,
	topic: string
) {
	return fetch(chatGPTModelAPIURL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${chatGPTModelAPIKey}`,
		},
		body: JSON.stringify({
			model,
			messages,
		}),
	})
		.then((response) => response.json() as Promise<chatGPTModelCompletionResponse>)
		.then((data) => {
			if (!data.choices || data.choices.length === 0) {
				throw new Error('No choices returned from OpenAI API')
				//
			}
			const choice = data.choices[0]
			const messages = formatChatGPTResponse(choice.message.content)
			const mappedMessageg = messages.map((message) => {
				return {
					id: `${data.id}-${Math.random().toString(36).substring(2, 15)}	`,
					question_text: message.trim(),
					difficulty: difficulty,
					topic: topic,
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString(),
				}
			})
			return mappedMessageg
		})
		.catch((error) => {
			throw new Error('Failed to fetch questions from OpenAI')
		})
}
