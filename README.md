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
During the interview, you'll enhance this quiz builder app by adding AI-powered question generation functionality.

User Story: As a teacher, I want to generate quiz questions using AI so that I can quickly create relevant questions for my students based on a topic and difficulty level.

Feature Requirements:
- Teachers should be able to generate questions by providing a topic and difficulty level
- The AI should generate educationally appropriate quiz questions
- Generated questions should be editable before saving

The specific implementation approach is up to you - we want to see how you think about and solve the problem.

## 🗄️ Database Setup

### Option A: Local Development with Supabase CLI (Recommended)
```bash
# Start local Supabase stack
npm run supabase:start

# Open Supabase Studio dashboard
npm run supabase:studio

# Stop when done
npm run supabase:stop
```

This provides the full Supabase stack locally:
- PostgreSQL database at `127.0.0.1:54322`
- API Gateway at `127.0.0.1:54321`
- Studio Dashboard at `127.0.0.1:54323`
- Email testing at `127.0.0.1:54324`

### Option B: Use Cloud Supabase Project
1. Create a project at [supabase.com](https://supabase.com)
2. Run the migration in `supabase/migrations/001_initial.sql`
3. Update `.env.local` with your project URL and anon key

### Option C: Basic Docker (Not Recommended)
```bash
docker-compose --profile manual up -d
# Basic PostgreSQL only at localhost:5433
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/questions/        # API endpoints
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page
├── components/               # React components
├── lib/                      # Utilities and configuration
└── __tests__/               # Test files
```

## 🔧 Available Scripts

### Development
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run test     # Run tests
```

### Supabase Local Development
```bash
npm run supabase:start   # Start local Supabase stack
npm run supabase:stop    # Stop all Supabase services
npm run supabase:status  # Check running services
npm run supabase:studio  # Open Supabase Studio dashboard
npm run supabase:reset   # Reset database (run migrations + seed)
```

## 🎯 What We're Looking For

We'll evaluate your approach to:
- Problem solving and implementation decisions
- Code quality and organization
- Error handling and edge cases
- User experience considerations

## 🔍 Getting Started

Explore the existing codebase to understand:
- How questions are currently created and stored
- The database schema and API structure
- Available UI components and styling patterns

## 🎉 Success Criteria

Your implementation is successful when:
- [ ] Users can generate questions using AI
- [ ] Generated questions are saved and displayed
- [ ] The application handles various scenarios appropriately

## 📝 Environment Variables

```bash
# Required
OPENAI_API_KEY=your_openai_api_key_here

# Supabase (provided in demo, or use your own)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🤝 Getting Help

- Feel free to ask questions about the requirements
- The existing code shows how manual question creation works
- Sample questions are pre-loaded in the database

---

**Good luck! 🚀 Show us how you approach full-stack development with AI integration.**