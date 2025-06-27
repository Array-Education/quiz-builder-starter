-- Seed data for AI Question Builder
-- Teaching Simulator Interview Starter

-- Insert sample questions for development and interviews
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
  ('Literature', 'hard', 'Compare the narrative techniques used in "The Great Gatsby" and "To Kill a Mockingbird"'),
  ('Computer Science', 'easy', 'What does HTML stand for?'),
  ('Computer Science', 'medium', 'Explain the difference between a stack and a queue data structure'),
  ('Computer Science', 'hard', 'Describe the time complexity of merge sort and explain why it is considered efficient')
ON CONFLICT DO NOTHING;