-- =========================================================================
-- GS-SOFTWARES DATABASE SCHEMA FOR SUPABASE
-- Run this script in the Supabase SQL Editor to initialize your tables.
-- =========================================================================

-- 1. Services Table
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  number TEXT NOT NULL,
  name TEXT NOT NULL,
  "shortName" TEXT NOT NULL,
  "iconKey" TEXT NOT NULL,
  "accentColor" TEXT NOT NULL,
  tagline TEXT NOT NULL,
  headline TEXT NOT NULL,
  description TEXT NOT NULL,
  "whyItMatters" TEXT NOT NULL,
  services JSONB NOT NULL DEFAULT '[]'::jsonb,
  technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
  "whoNeedsThis" JSONB NOT NULL DEFAULT '[]'::jsonb,
  "relatedIndustries" JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and public read
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on services" ON services FOR SELECT USING (true);


-- 2. Solutions / Industries Table
CREATE TABLE IF NOT EXISTS solutions (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  "shortName" TEXT NOT NULL,
  "iconKey" TEXT NOT NULL,
  "accentColor" TEXT NOT NULL,
  tagline TEXT NOT NULL,
  headline TEXT NOT NULL,
  description TEXT NOT NULL,
  problems JSONB NOT NULL DEFAULT '[]'::jsonb,
  solutions JSONB NOT NULL DEFAULT '[]'::jsonb,
  "automationOpportunities" JSONB NOT NULL DEFAULT '[]'::jsonb,
  "analyticsOpportunities" JSONB NOT NULL DEFAULT '[]'::jsonb,
  "recommendedDivisions" JSONB NOT NULL DEFAULT '[]'::jsonb,
  "implementationRoadmap" JSONB NOT NULL DEFAULT '[]'::jsonb,
  "relatedProjectId" TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and public read
ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on solutions" ON solutions FOR SELECT USING (true);


-- 3. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  industry TEXT NOT NULL,
  status TEXT NOT NULL,
  description TEXT NOT NULL,
  "longDescription" TEXT NOT NULL,
  "techStack" JSONB NOT NULL DEFAULT '[]'::jsonb,
  "keyFeatures" JSONB NOT NULL DEFAULT '[]'::jsonb,
  "githubUrl" TEXT NOT NULL,
  "liveUrl" TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and public read
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);

