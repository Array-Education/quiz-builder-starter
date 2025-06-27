# Teaching Simulator Interview Guide

## Interview Structure (45 minutes total)

### Phase 1: Introduction & Setup (5-10 minutes)
- [ ] Candidate shares screen
- [ ] Verify app is running (`npm run dev`)
- [ ] Quick walkthrough of existing features
- [ ] Explain the task: Add AI question generation

### Phase 2: Core Implementation (25-30 minutes)

#### Required Implementation
1. **AI Generation API Endpoint** (15-20 minutes)
   - Location: `src/app/api/questions/generate/route.ts`
   - Accept `topic` and `difficulty` parameters
   - Integrate with OpenAI API
   - Store generated question in database
   - Return the created question

2. **UI Integration** (10-15 minutes)
   - Enable the "Generate with AI" button in `QuestionForm.tsx`
   - Add loading state during generation
   - Handle success and error cases
   - Display generated question in the list

#### Success Criteria
- [ ] AI button works without errors
- [ ] Loading state is shown during generation
- [ ] Generated questions appear in the list
- [ ] Error handling is implemented
- [ ] Code follows TypeScript best practices

### Phase 3: Extensions (5-10 minutes if time permits)
- [ ] Add request duration logging
- [ ] Implement batch question generation
- [ ] Add caching for similar requests
- [ ] Discuss rate limiting strategies

### Phase 4: Technical Discussion (10 minutes)
- [ ] Schema evolution strategies
- [ ] Scaling considerations
- [ ] Cost optimization approaches
- [ ] Security best practices
- [ ] Error monitoring and observability

## Evaluation Criteria

### Technical Skills (60%)
- **API Integration**: Proper OpenAI SDK usage
- **Database Operations**: Correct Supabase integration
- **Error Handling**: Comprehensive error scenarios
- **TypeScript**: Proper type usage and safety
- **React/Next.js**: Component patterns and hooks

### Code Quality (25%)
- **Clean Code**: Readable, well-structured code
- **Best Practices**: Following established patterns
- **Testing Mindset**: Consideration of edge cases
- **Documentation**: Clear comments and explanations

### Problem Solving (15%)
- **Debugging**: Ability to identify and fix issues
- **Architecture**: Understanding of full-stack flow
- **Communication**: Explaining thought process
- **Adaptability**: Handling unexpected challenges

## Common Implementation Approaches

### OpenAI Integration Options
```typescript
// Option 1: Simple completion
const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: prompt }],
})

// Option 2: With system prompt
const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    { role: "system", content: "You are a quiz question generator..." },
    { role: "user", content: `Generate a ${difficulty} ${topic} question` }
  ],
})
```

### UI State Management
```typescript
// Loading state management
const [generating, setGenerating] = useState(false)

const handleAIGenerate = async () => {
  setGenerating(true)
  try {
    // API call
  } finally {
    setGenerating(false)
  }
}
```

## Probing Questions

### Technical Depth
- "How would you handle OpenAI rate limits?"
- "What if the AI generates inappropriate content?"
- "How would you validate the AI response?"
- "What caching strategy would you implement?"

### Architecture & Scaling
- "How would you handle 1000 concurrent AI requests?"
- "What database indexes would you add?"
- "How would you monitor API costs?"
- "What would a retry mechanism look like?"

### Security & Best Practices
- "How do you prevent API key exposure?"
- "What input validation is needed?"
- "How would you implement user authentication?"
- "What logging is appropriate vs sensitive?"

## Red Flags to Watch For

### Technical Red Flags
- [ ] Hardcoded API keys in code
- [ ] No error handling around API calls
- [ ] Missing TypeScript types
- [ ] No loading states in UI
- [ ] Incorrect database schema assumptions

### Process Red Flags
- [ ] Not reading existing code patterns
- [ ] Ignoring TODO comments and hints
- [ ] Not testing the implementation
- [ ] Poor communication of approach
- [ ] Not asking clarifying questions

## Positive Indicators

### Strong Candidates Will:
- [ ] Read and understand existing code first
- [ ] Follow established patterns and conventions
- [ ] Ask about requirements and edge cases
- [ ] Implement proper error handling
- [ ] Consider user experience (loading states)
- [ ] Think about production concerns (costs, monitoring)
- [ ] Write clean, typed TypeScript code
- [ ] Test their implementation as they go

### Exceptional Candidates Will Also:
- [ ] Suggest improvements to existing code
- [ ] Consider accessibility and responsive design
- [ ] Discuss database performance implications
- [ ] Propose monitoring and observability strategies
- [ ] Think about A/B testing AI prompts
- [ ] Consider different AI models and tradeoffs

## Interview Tips

### For Interviewers:
1. **Let them drive**: Don't give away the solution
2. **Ask "why"**: Understand their reasoning
3. **Focus on process**: How they approach problems
4. **Note edge cases**: Do they think about error scenarios?
5. **Time management**: Keep track of progress vs time

### For Candidates:
1. **Read the code first**: Understand existing patterns
2. **Start simple**: Get basic functionality working
3. **Handle errors**: Always consider what can go wrong
4. **Test as you go**: Verify each step works
5. **Communicate**: Explain your thought process

## Follow-up Tasks (if time permits)

### Easy Extensions:
- Add character limits to generated questions
- Implement question difficulty validation
- Add question categories/tags

### Medium Extensions:
- Batch generation (multiple questions at once)
- Question editing/refinement
- AI response caching

### Advanced Extensions:
- Streaming AI responses
- Custom AI prompt templates
- Question quality scoring
- A/B testing different prompts