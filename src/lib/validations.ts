import { z } from 'zod'

export const DifficultySchema = z.enum(['easy', 'medium', 'hard'])

export const QuestionSchema = z.object({
  id: z.string().uuid(),
  topic: z.string().min(1, 'Topic is required').max(255, 'Topic must be less than 255 characters'),
  difficulty: DifficultySchema,
  question_text: z.string().min(1, 'Question text is required'),
  created_at: z.string(),
  updated_at: z.string(),
})

export const CreateQuestionSchema = z.object({
  topic: z.string().min(1, 'Topic is required').max(255, 'Topic must be less than 255 characters'),
  difficulty: DifficultySchema,
  question_text: z.string().min(1, 'Question text is required').max(2000, 'Question must be less than 2000 characters'),
})

export const QuestionFormSchema = CreateQuestionSchema

export const GenerateQuestionSchema = z.object({
  topic: z.string().min(1, 'Topic is required').max(255, 'Topic must be less than 255 characters'),
  difficulty: DifficultySchema,
})

export type QuestionFormData = z.infer<typeof QuestionFormSchema>
export type CreateQuestionData = z.infer<typeof CreateQuestionSchema>
export type GenerateQuestionData = z.infer<typeof GenerateQuestionSchema>