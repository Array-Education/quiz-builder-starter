# Teaching Simulator Interview Guide

## Interview Structure (45 minutes total)

### Phase 1: Introduction & Setup (5-10 minutes)
- [ ] Candidate shares screen
- [ ] Verify app is running (`npm run dev`)
- [ ] Quick walkthrough of existing features
- [ ] Explain the task: Add AI question generation

### Phase 2: Core Implementation (25-30 minutes)

#### Task
Implement AI-powered question generation using the OpenAI API. The candidate should determine the best approach for:
- Backend API implementation
- Frontend integration
- Error handling and edge cases
- User experience considerations

#### Success Criteria
- [ ] AI generation functionality works end-to-end
- [ ] Appropriate error handling is implemented
- [ ] User experience is considered
- [ ] Code quality and TypeScript usage

### Phase 3: Extensions (5-10 minutes if time permits)
Discuss potential enhancements and optimizations the candidate would consider for production use.

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

## Implementation Notes

Observe how the candidate approaches:
- API integration patterns
- State management decisions
- Error handling strategies
- Code organization and structure

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

### General Interview Approach:
- Understand the existing codebase
- Plan the implementation approach
- Consider error scenarios and edge cases
- Test functionality as you build
- Communicate throughout the process

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