-- =========================================================================
-- GS-SOFTWARES COMPLETE ENTERPRISE DATABASE SCHEMA FOR SUPABASE
-- Run this script in your Supabase SQL Editor.
-- =========================================================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Function for auto-updating timestamps
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- -------------------------------------------------------------------------
-- 1. SERVICES TABLE
-- -------------------------------------------------------------------------
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

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Services" ON services FOR SELECT USING (true);
CREATE POLICY "Full Access Services" ON services FOR ALL USING (true) WITH CHECK (true);

DROP TRIGGER IF EXISTS set_timestamp_services ON services;
CREATE TRIGGER set_timestamp_services
BEFORE UPDATE ON services
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();


-- -------------------------------------------------------------------------
-- 2. SOLUTIONS (INDUSTRIES) TABLE
-- -------------------------------------------------------------------------
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

ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Solutions" ON solutions FOR SELECT USING (true);
CREATE POLICY "Full Access Solutions" ON solutions FOR ALL USING (true) WITH CHECK (true);

DROP TRIGGER IF EXISTS set_timestamp_solutions ON solutions;
CREATE TRIGGER set_timestamp_solutions
BEFORE UPDATE ON solutions
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();


-- -------------------------------------------------------------------------
-- 3. PROJECTS (PORTFOLIO SHOWCASE) TABLE
-- -------------------------------------------------------------------------
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
  "imageUrl" TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Full Access Projects" ON projects FOR ALL USING (true) WITH CHECK (true);

DROP TRIGGER IF EXISTS set_timestamp_projects ON projects;
CREATE TRIGGER set_timestamp_projects
BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();


-- -------------------------------------------------------------------------
-- 4. CONTACT LEADS & CLIENT INQUIRIES TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  industry TEXT,
  services JSONB DEFAULT '[]'::jsonb,
  budget_range TEXT,
  preferred_contact TEXT,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'closed'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Insert Inquiries" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins Read Inquiries" ON contact_submissions FOR SELECT USING (true);
CREATE POLICY "Admins Modify Inquiries" ON contact_submissions FOR ALL USING (true) WITH CHECK (true);

DROP TRIGGER IF EXISTS set_timestamp_contact_submissions ON contact_submissions;
CREATE TRIGGER set_timestamp_contact_submissions
BEFORE UPDATE ON contact_submissions
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();


-- -------------------------------------------------------------------------
-- 5. SITE CONFIGURATION & BRAND METADATA TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Site Settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admin Write Site Settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);
