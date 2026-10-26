-- Run this in the Supabase SQL Editor for Skill Circle (leaderboard, quizzes, resources, admin).
-- After running, create one admin row (replace email/password):
-- INSERT INTO skill_circle_admins (email, password, name)
-- VALUES ('admin@eduminerva.org', 'your-secure-password', 'Skill Circle Admin');

-- Optional: remove test/placeholder leaderboard rows
-- DELETE FROM leaderboard_users WHERE email LIKE '%test%' OR email LIKE '%example.com%';

CREATE TABLE IF NOT EXISTS skill_circle_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS skill_circle_quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT,
  description TEXT,
  questions INTEGER DEFAULT 0,
  duration TEXT,
  points INTEGER DEFAULT 50,
  level TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  quiz_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS skill_circle_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT,
  description TEXT,
  format TEXT,
  topics TEXT,
  file_url TEXT,
  file_size TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE skill_circle_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_circle_quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_circle_resources ENABLE ROW LEVEL SECURITY;

-- Anon client policies (tighten in production: use Edge Functions + service role for writes)
CREATE POLICY "admins_select" ON skill_circle_admins FOR SELECT TO anon USING (true);
CREATE POLICY "quizzes_select" ON skill_circle_quizzes FOR SELECT TO anon USING (true);
CREATE POLICY "quizzes_insert" ON skill_circle_quizzes FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "quizzes_update" ON skill_circle_quizzes FOR UPDATE TO anon USING (true);
CREATE POLICY "quizzes_delete" ON skill_circle_quizzes FOR DELETE TO anon USING (true);
CREATE POLICY "resources_select" ON skill_circle_resources FOR SELECT TO anon USING (true);
CREATE POLICY "resources_insert" ON skill_circle_resources FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "resources_update" ON skill_circle_resources FOR UPDATE TO anon USING (true);
CREATE POLICY "resources_delete" ON skill_circle_resources FOR DELETE TO anon USING (true);

-- Storage bucket for PDFs (create in Dashboard → Storage → New bucket: skill-circle-resources, public)
-- Then allow anon upload if needed, or use public URLs only.
