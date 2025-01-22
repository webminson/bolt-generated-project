/*
  # Career Assessment Platform Schema

  1. New Tables
    - `profiles`
      - Student profiles with basic information
    - `assessments`
      - Stores different types of assessments (RIASEC, Big Five, Skills)
    - `questions`
      - Assessment questions with type and scoring info
    - `user_responses`
      - Student responses to assessment questions
    - `user_results`
      - Aggregated assessment results
    - `resources`
      - Educational resources (videos, articles)
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text NOT NULL,
  email text NOT NULL,
  avatar_url text,
  education_level text,
  field_of_study text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL CHECK (type IN ('RIASEC', 'BIG_FIVE', 'SKILLS')),
  duration_minutes integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid REFERENCES assessments(id) NOT NULL,
  question_text text NOT NULL,
  options jsonb NOT NULL,
  scoring_logic jsonb NOT NULL,
  order_number integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_responses table
CREATE TABLE IF NOT EXISTS user_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  question_id uuid REFERENCES questions(id) NOT NULL,
  response jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, question_id)
);

-- Create user_results table
CREATE TABLE IF NOT EXISTS user_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  assessment_id uuid REFERENCES assessments(id) NOT NULL,
  results jsonb NOT NULL,
  completed_at timestamptz DEFAULT now(),
  UNIQUE(user_id, assessment_id)
);

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL CHECK (type IN ('VIDEO', 'ARTICLE')),
  content_url text NOT NULL,
  thumbnail_url text,
  categories text[] NOT NULL,
  duration_minutes integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Anyone can view assessments"
  ON assessments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can view questions"
  ON questions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own responses"
  ON user_responses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own responses"
  ON user_responses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own results"
  ON user_results FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own results"
  ON user_results FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view resources"
  ON resources FOR SELECT
  TO authenticated
  USING (true);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating timestamps
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_resources_updated_at
  BEFORE UPDATE ON resources
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();
