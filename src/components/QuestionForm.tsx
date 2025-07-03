'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { QuestionFormSchema, type QuestionFormData } from '@/lib/validations'
import { Button } from './Button'
interface QuestionFormProps {
	onSubmit: (data: Array<QuestionFormData>) => Promise<void>
	onMessagesGeneratedWithAI: (data: QuestionFormData) => Promise<void>
	onCustomSave: () => Promise<void>
	loading?: boolean
}

export function QuestionForm({
	onSubmit,
	onCustomSave,
	onMessagesGeneratedWithAI,
	loading = false,
}: QuestionFormProps) {
	const [submitError, setSubmitError] = useState<string | null>(null)
	const [isAIGenerationButtonDisabled, setAIGenerationButtonDisabled] = useState<boolean>(false)
	const [isGeneratedWithAIButtonVisible, setGeneratedWithAIButtonVisible] = useState<boolean>(false)
	const {
		register,
		handleSubmit,
		getValues,
		setError,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<QuestionFormData>({
		resolver: zodResolver(QuestionFormSchema),
		defaultValues: {
			topic: '',
			difficulty: 'medium',
			question_text: '',
		},
	})
	const onFormSubmit = async (data: QuestionFormData) => {
		try {
			setSubmitError(null)
      setAIGenerationButtonDisabled(true)
			await onSubmit([data])
      setAIGenerationButtonDisabled(false)
			reset()
		} catch (error) {
			setSubmitError(error instanceof Error ? error.message : 'An error occurred')
		}
	}
	const handleAIButtonClick = async () => {
		const values = getValues()
		const validation = QuestionFormSchema.safeParse(values)

		if (!validation.success) {
			const zodErrors = validation.error.flatten()

			if (zodErrors.fieldErrors) {
				Object.entries(zodErrors.fieldErrors).forEach(([field, messages]) => {
					if (messages && messages.length > 0) {
						setError(field as keyof QuestionFormData, {
							type: 'manual',
							message: messages[0],
						})
					}
				})
			}
			return
		}
		try {
			setSubmitError(null)
			const {data} = validation
			setAIGenerationButtonDisabled(true)
			await onMessagesGeneratedWithAI(data)
			reset()
			setGeneratedWithAIButtonVisible(true)
		} catch (error) {
			setSubmitError(error instanceof Error ? error.message : 'An error occurred while generating questions')
		} finally {
			setAIGenerationButtonDisabled(false)
		}
	}

	const handleGeneratedWithAI = async () => {
		try {
			setSubmitError(null)
      setGeneratedWithAIButtonVisible(false)
			await onCustomSave()
			reset()
		} catch (error) {
			setSubmitError(error instanceof Error ? error.message : 'An error occurred')
		}
	}

	return (
		<div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
			<h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Question</h2>

			<form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
				<div>
					<label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
						Topic
					</label>
					<input
						{...register('topic')}
						type="text"
						id="topic"
						placeholder="e.g., Math, Science, History"
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
					{errors.topic && <p className="mt-1 text-sm text-red-600">{errors.topic.message}</p>}
				</div>

				<div>
					<label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
						Difficulty
					</label>
					<select
						{...register('difficulty')}
						id="difficulty"
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
						<option value="easy">Easy</option>
						<option value="medium">Medium</option>
						<option value="hard">Hard</option>
					</select>
					{errors.difficulty && <p className="mt-1 text-sm text-red-600">{errors.difficulty.message}</p>}
				</div>

				<div>
					<label htmlFor="question_text" className="block text-sm font-medium text-gray-700 mb-1">
						Question Text
					</label>
					<textarea
						{...register('question_text')}
						id="question_text"
						rows={4}
						placeholder="Enter your question here..."
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
					{errors.question_text && <p className="mt-1 text-sm text-red-600">{errors.question_text.message}</p>}
				</div>

				{submitError && (
					<div className="bg-red-50 border border-red-200 rounded-md p-3">
						<p className="text-sm text-red-600">{submitError}</p>
					</div>
				)}

				<div className="flex gap-3">
					<Button type="submit" loading={isSubmitting || loading} disabled={isSubmitting || loading}>
						Create Question
					</Button>

					<Button
						type="button"
						onClick={handleAIButtonClick}
						variant="outline"
						disabled={ isAIGenerationButtonDisabled || isSubmitting || loading}>
						Generate with AI
					</Button>
					{isGeneratedWithAIButtonVisible && (
						<Button
							type="button"
							onClick={handleGeneratedWithAI}
							variant="outline"
							disabled={isSubmitting || loading}>
							Save Generated with AI
						</Button>
					)}
				</div>
			</form>
		</div>
	)
}
