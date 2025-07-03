export type Difficulty = 'easy' | 'medium' | 'hard'
export type ChatGPTModel = 'gpt-4.1' | 'o4-mini'

export interface Question {
	id?: string
	topic: string
	difficulty: Difficulty
	question_text: string
	created_at: string
	updated_at?: string
}

export interface ApiResponse<T> {
	data?: T
	error?: string
	details?: unknown
}

export interface ChatGPTModelCompletionRequest {
	model: ChatGPTModel
	messages: Array<{ role: string; content: string }>
}

export interface ChatGPTModelCompletionResponse {
	id: string
	choices: Array<ChatGPTModelCompletionChoice>
	usage?: {
		prompt_tokens: number
		completion_tokens: number
		total_tokens: number
	}
}

export interface ChatGPTModelCompletionChoice {
	index: number
	message: ChatGPTModelCompletionChoiceMessage
	finish_reason?: string
}

export interface ChatGPTModelCompletionChoiceMessage {
	role: string
	content: string
}
