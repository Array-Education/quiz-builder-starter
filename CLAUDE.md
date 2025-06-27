# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application for creating quiz questions with AI assistance. It's a starter template for technical interviews evaluating candidates for the Teaching Simulator position. The main task is to implement AI-powered question generation using OpenAI.

## Essential Commands

### Development
```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run lint         # Run ESLint
npm run test         # Run Jest tests
npm run test:watch   # Run tests in watch mode
```

### Supabase Local Development
```bash
npm run supabase:start   # Start local Supabase stack
npm run supabase:studio  # Open Supabase Studio (http://127.0.0.1:54323)
npm run supabase:stop    # Stop all services
npm run supabase:reset   # Reset database (re-run migrations + seed)
npm run supabase:status  # Check service status
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15.3.4 with App Router
- **Language**: TypeScript with strict mode
- **UI**: React 19 + Tailwind CSS v4
- **Forms**: React Hook Form + Zod validation
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI SDK
- **Testing**: Jest + React Testing Library

### Key Directories
- `src/app/api/questions/` - API routes for CRUD operations
- `src/app/api/questions/generate/` - AI generation endpoint (TODO)
- `src/components/` - React components (Button, QuestionForm, QuestionList)
- `src/lib/` - Core utilities:
  - `supabase.ts` - Database client initialization
  - `types.ts` - TypeScript interfaces
  - `validations.ts` - Zod schemas
  - `utils.ts` - Helper functions

### Database Schema
The `questions` table (defined in `supabase/migrations/001_initial.sql`):
```sql
- id: SERIAL PRIMARY KEY
- question: TEXT NOT NULL
- answer: TEXT NOT NULL
- difficulty: question_difficulty ('easy', 'medium', 'hard')
- topic: TEXT NOT NULL
- created_at: TIMESTAMP
```

### API Endpoints
- `GET /api/questions` - List all questions
- `POST /api/questions` - Create a question
- `POST /api/questions/generate` - Generate questions with AI (to be implemented)

## Local Development Setup

1. **Environment Variables**
   Create `.env.local` with:
   ```
   OPENAI_API_KEY=your_key_here
   NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
   ```

2. **Start Services**
   ```bash
   npm run supabase:start
   npm run dev
   ```

## Interview Task Requirements

The main task is implementing AI question generation at `/api/questions/generate`:

1. Accept `topic` and `difficulty` parameters
2. Call OpenAI API to generate questions
3. Validate generated content
4. Store in database
5. Return created questions

The UI integration point is in `QuestionForm.tsx` where the "Generate with AI" button needs to be enabled.

## Important Files

- `src/app/api/questions/generate/route.ts` - Main implementation file (TODO)
- `src/components/QuestionForm.tsx` - Contains AI generation button
- `src/lib/types.ts` - Has `AIGenerationRequest` and `AIGenerationResponse` types
- `src/lib/validations.ts` - Has `aiGenerationRequestSchema` for validation

## Type System

The project uses strict TypeScript. Key types:
- `Question` - Database question model
- `CreateQuestionData` - Question creation payload
- `AIGenerationRequest` - AI generation request
- `AIGenerationResponse` - AI generation response

All API requests are validated using Zod schemas before processing.