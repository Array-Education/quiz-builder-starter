export type Difficulty = 'easy' | 'medium' | 'hard'

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