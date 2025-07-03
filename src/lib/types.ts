export type Difficulty = 'easy' | 'medium' | 'hard'
export type chatGPTModel = 'gpt-4.1' | 'o4-mini'

export interface Question {
	id: string
	topic: string
	difficulty: Difficulty
	question_text: string
	created_at: string
	updated_at: string
}

export interface CreateQuestionRequest {
	topic: string
	difficulty: Difficulty
	question_text: string
}

export interface QuestionFormData {
	topic: string
	difficulty: Difficulty
	question_text: string
}

export interface GenerateQuestionRequest {
	topic: string
	difficulty: Difficulty
}

export interface ApiResponse<T> {
	data?: T
	error?: string
}

export interface ApiError {
	message: string
	code?: string
}

export interface chatGPTModelCompletionRequest {
	model: chatGPTModel
	messages: Array<{ role: string; content: string }>
}

export interface chatGPTModelCompletionResponse {
	id: string
	choices: Array<chatGPTModelCompletionChoice>
}

export interface chatGPTModelCompletionChoice {
	index: number
	message: chatGPTModelCompletionChoiceMessage
}

export interface chatGPTModelCompletionChoiceMessage {
	role: string
	content: string
}
