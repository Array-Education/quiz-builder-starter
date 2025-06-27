-- Initial schema for AI Question Builder
-- Teaching Simulator Interview Starter

-- Create questions table
CREATE TABLE questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  topic VARCHAR(255) NOT NULL,
  difficulty VARCHAR(50) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  question_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX idx_questions_topic ON questions(topic);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_questions_created_at ON questions(created_at DESC);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON questions
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- Insert sample data for development and interviews
INSERT INTO questions (topic, difficulty, question_text) VALUES
  ('Math', 'easy', 'What is 2 + 2?'),
  ('Math', 'medium', 'Solve for x: 3x + 7 = 22'),
  ('Math', 'hard', 'Find the derivative of f(x) = x³ + 2x² - 5x + 1'),
  ('Science', 'easy', 'What gas do plants absorb from the atmosphere during photosynthesis?'),
  ('Science', 'medium', 'What is the process by which plants make their own food?'),
  ('Science', 'hard', 'Explain the role of mitochondria in cellular respiration and ATP production'),
  ('History', 'easy', 'In which year did World War II end?'),
  ('History', 'medium', 'Who was the first President of the United States?'),
  ('History', 'hard', 'Analyze the causes and effects of the French Revolution on European society'),
  ('Literature', 'easy', 'Who wrote the play "Romeo and Juliet"?'),
  ('Literature', 'medium', 'What is the main theme of George Orwell''s "1984"?'),
  ('Literature', 'hard', 'Compare the narrative techniques used in "The Great Gatsby" and "To Kill a Mockingbird"');