CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL,
  title TEXT NOT NULL,
  price_inr NUMERIC NOT NULL,
  original_price_inr NUMERIC,
  discount_percent NUMERIC,
  rating NUMERIC,
  hours NUMERIC,
  level TEXT,
  topic TEXT,
  url TEXT UNIQUE,
  hidden_gem BOOLEAN DEFAULT false,
  scraped_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE price_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  price_inr NUMERIC NOT NULL,
  recorded_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_courses_topic ON courses(topic);
CREATE INDEX idx_courses_platform ON courses(platform);
CREATE INDEX idx_courses_rating ON courses(rating DESC);
CREATE INDEX idx_price_history_course_id ON price_history(course_id);
