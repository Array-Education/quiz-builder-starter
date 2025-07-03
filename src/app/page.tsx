'use client'

import { useState, useEffect } from 'react'
import { QuestionList } from '@/components/QuestionList'
import { QuestionForm } from '@/components/QuestionForm'
import { Question, QuestionFormData } from '@/lib/types'
import { createQuestions } from '@/lib/utils'
import { clientGenerateQuestionsWithAI } from '@/lib/utils'

export default function Home() {
	const [questions, setQuestions] = useState<Question[]>([])
	const [notSavedQuestions, setNotSavedQuestions] = useState<Question[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [submitting, setSubmitting] = useState(false)

	// Fetch questions on component mount
	useEffect(() => {
		fetchQuestions()
	}, [])

	const fetchQuestions = async () => {
		try {
			setLoading(true)
			setError(null)

			const response = await fetch('/api/questions')
			const result = await response.json()

			if (!response.ok) {
				throw new Error(result.error || 'Failed to fetch questions')
			}
			setQuestions(result.data || [])
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred')
		} finally {
			setLoading(false)
		}
	}

	const handleCreateQuestion = async (data: Array<QuestionFormData>) => {
		try {
			setSubmitting(true)
			const result = await createQuestions(data)

			setSubmitting(false)
			// Optimistic UI update
			setQuestions((prev) => [...result.data, ...prev])
		} catch (err) {
			throw err // Re-throw to let form handle the error
		} finally {
			setSubmitting(false)
		}
	}

	const handleCustomQuestionsCreation = async () => {
		setSubmitting(true)
		setLoading(true)
		await handleCreateQuestion(questions)
			.then(() => {
				setNotSavedQuestions([])
			})
			.catch((err) => {
				setError(err instanceof Error ? err.message : 'An error occurred while saving questions')
			})
			.finally(() => {
				setSubmitting(false)
				setLoading(false)
			})
	}

	const fetchOpenAIQuestion = async (data: QuestionFormData) => {
		const generatedMessages = await clientGenerateQuestionsWithAI(data)
		return handleQuestionsListUpdate(generatedMessages)
	}

	const handleQuestionsListUpdate = (updatedQuestions: Question[]) => {
		setNotSavedQuestions((prev) => [...updatedQuestions, ...prev])
	}

	return (
		<div className="space-y-8">
			<div className="text-center">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">AI Question Builder</h1>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto">
					Create quiz questions manually or use AI to generate them automatically. Perfect for teachers and educators
					building engaging assessments.
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-1">
					<QuestionForm
						onSubmit={handleCreateQuestion}
						onCustomSave={handleCustomQuestionsCreation}
						onMessagesGeneratedWithAI={fetchOpenAIQuestion}
						loading={submitting}
					/>
				</div>

				<div className="lg:col-span-2">
					<QuestionList questions={questions} notSavedQuestions={notSavedQuestions} loading={loading} error={error} />
				</div>
			</div>

			{/* Developer Notes Section */}
			<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
				<h3 className="text-lg font-semibold text-yellow-800 mb-3">🛠️ Developer Setup Notes</h3>
				<div className="space-y-2 text-sm text-yellow-700">
					<p>
						• Copy <code className="bg-yellow-100 px-1 rounded">.env.example</code> to{' '}
						<code className="bg-yellow-100 px-1 rounded">.env.local</code> and add your OpenAI API key
					</p>
					<p>
						• Run <code className="bg-yellow-100 px-1 rounded">npm run dev</code> to start the development server
					</p>
					<p>• The app is pre-built with manual question creation - your task is to add AI generation!</p>
				</div>
			</div>
		</div>
	)
}
