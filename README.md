# AI Question Builder - Teaching Simulator Interview Starter

A Next.js application for creating quiz questions with AI assistance. This starter repo is designed for technical interviews evaluating candidates for the Teaching Simulator position.

## 🚀 Quick Start (5 minutes)

1. **Clone and setup**
   ```bash
   git clone <repository-url>
   cd quiz-builder-starter
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.example .env.local
   # Add your OpenAI API key to .env.local
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Visit the application**
   Open [http://localhost:3000](http://localhost:3000)

## 🛠️ What You'll Build

This starter includes basic CRUD functionality for questions. **Your task is to add AI-powered question generation** using the OpenAI API.

### Pre-built Features ✅
- ✅ Question list with responsive table
- ✅ Manual question creation form
- ✅ Form validation with Zod
- ✅ API routes for CRUD operations
- ✅ TypeScript types and schemas
- ✅ Tailwind CSS styling
- ✅ Supabase database integration

### Your Interview Task 🎯
Implement AI question generation by adding:

1. **AI Generation API** (`/api/questions/generate`)
   - Accept topic and difficulty parameters
   - Call OpenAI to generate questions
   - Store generated questions in database

2. **UI Integration**
   - Enable the "Generate with AI" button
   - Add loading states
   - Handle errors gracefully

3. **Optional Enhancements** (if time permits)
   - Request duration logging
   - Error tracking hooks
   - Batch generation

## 🗄️ Database Setup

### Option A: Use Provided Supabase Project
The `.env.example` includes a demo Supabase project URL. Just add your OpenAI API key.

### Option B: Local Setup with Docker
```bash
docker-compose up -d
# Database will be available at localhost:5432
```

### Option C: Your Own Supabase Project
1. Create a project at [supabase.com](https://supabase.com)
2. Run the migration in `supabase/migrations/001_initial.sql`
3. Update `.env.local` with your project URL and anon key

## 📁 Project Structure

```
src/
├── app/
│   ├── api/questions/
│   │   ├── route.ts          # GET/POST endpoints (✅ implemented)
│   │   └── generate/
│   │       └── route.ts      # 🎯 Your task: AI generation
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page
├── components/
│   ├── Button.tsx            # Reusable button component
│   ├── QuestionForm.tsx      # Form with AI generation placeholder
│   └── QuestionList.tsx      # Responsive question table
├── lib/
│   ├── supabase.ts           # Database client
│   ├── types.ts              # TypeScript interfaces
│   ├── validations.ts        # Zod schemas
│   └── utils.ts              # Utility functions
└── __tests__/
    └── Button.test.tsx       # Example test
```

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run test     # Run tests
```

## 🎯 Interview Evaluation Points

### Core Implementation (Required)
- [ ] OpenAI API integration
- [ ] Database storage of generated questions
- [ ] Error handling
- [ ] Loading states

### Code Quality
- [ ] TypeScript usage
- [ ] Error boundaries
- [ ] Input validation
- [ ] Clean, readable code

### Discussion Points
- Schema evolution strategies
- Scaling considerations
- Rate limiting approaches
- Cost optimization
- Security best practices

## 🔍 Key Files to Examine

| File | Purpose | Status |
|------|---------|---------|
| `src/app/api/questions/generate/route.ts` | 🎯 **Your main task** | TODO |
| `src/components/QuestionForm.tsx` | UI integration point | Needs AI button |
| `src/lib/types.ts` | AI generation types | Ready |
| `src/lib/validations.ts` | Request validation | Ready |

## 💡 Implementation Hints

### OpenAI Integration
```typescript
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Craft a good prompt for question generation
const prompt = `Generate a ${difficulty} ${topic} question...`
```

### Error Handling Considerations
- OpenAI rate limits
- Network timeouts
- Invalid API responses
- Database connection issues

### UI/UX Considerations
- Loading states (generation takes 2-5s)
- Optimistic updates
- Error messages
- Form validation

## 🚨 Common Pitfalls to Avoid

1. **Missing error handling** - Always wrap API calls in try/catch
2. **No loading states** - Users need feedback during generation
3. **Ignoring TypeScript** - Use the provided types
4. **Poor prompts** - Craft specific, clear prompts for OpenAI
5. **No validation** - Validate both input and AI responses

## 🎉 Success Criteria

Your implementation is successful when:
- [ ] AI generation button works
- [ ] Generated questions appear in the list
- [ ] Loading states are shown
- [ ] Errors are handled gracefully
- [ ] Code follows TypeScript best practices

## 📝 Environment Variables

```bash
# Required
OPENAI_API_KEY=your_openai_api_key_here

# Supabase (provided in demo, or use your own)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🤝 Getting Help

- Check the TODO comments in the code for guidance
- Use the browser dev tools to debug API calls
- The existing manual question creation shows the expected data flow
- Sample questions are pre-loaded to test the UI

---

**Good luck! 🚀 Show us how you approach full-stack development with AI integration.**