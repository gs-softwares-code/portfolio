import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { serviceDivisions as defaultServices, ServiceDivision } from "@/data/servicesData";
import { industrySolutions as defaultIndustries, IndustrySolution } from "@/data/industriesData";
import { allProjects as defaultProjects, Project } from "@/data/projectsData";

/**
 * Fetch all Service Divisions from Supabase with graceful fallback to defaults
 */
export async function getServiceDivisions(): Promise<ServiceDivision[]> {
  if (!isSupabaseConfigured || !supabase) {
    return defaultServices;
  }

  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("number", { ascending: true });

    if (error || !data || data.length === 0) {
      return defaultServices;
    }

    return data as ServiceDivision[];
  } catch (err) {
    console.warn("Supabase services fetch error, using defaults:", err);
    return defaultServices;
  }
}

/**
 * Fetch single Service Division by slug
 */
export async function getServiceDivisionBySlug(slug: string): Promise<ServiceDivision | undefined> {
  if (!isSupabaseConfigured || !supabase) {
    return defaultServices.find((s) => s.slug === slug);
  }

  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return defaultServices.find((s) => s.slug === slug);
    }

    return data as ServiceDivision;
  } catch (err) {
    return defaultServices.find((s) => s.slug === slug);
  }
}

/**
 * Fetch all Industry Solutions from Supabase with graceful fallback to defaults
 */
export async function getIndustrySolutions(): Promise<IndustrySolution[]> {
  if (!isSupabaseConfigured || !supabase) {
    return defaultIndustries;
  }

  try {
    const { data, error } = await supabase
      .from("solutions")
      .select("*")
      .order("name", { ascending: true });

    if (error || !data || data.length === 0) {
      return defaultIndustries;
    }

    return data as IndustrySolution[];
  } catch (err) {
    console.warn("Supabase solutions fetch error, using defaults:", err);
    return defaultIndustries;
  }
}

/**
 * Fetch single Industry Solution by slug
 */
export async function getIndustrySolutionBySlug(slug: string): Promise<IndustrySolution | undefined> {
  if (!isSupabaseConfigured || !supabase) {
    return defaultIndustries.find((i) => i.slug === slug);
  }

  try {
    const { data, error } = await supabase
      .from("solutions")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return defaultIndustries.find((i) => i.slug === slug);
    }

    return data as IndustrySolution;
  } catch (err) {
    return defaultIndustries.find((i) => i.slug === slug);
  }
}

/**
 * Fetch all Projects from Supabase with graceful fallback to defaults
 */
export async function getProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured || !supabase) {
    return defaultProjects;
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*");

    if (error || !data || data.length === 0) {
      return defaultProjects;
    }

    return data as Project[];
  } catch (err) {
    console.warn("Supabase projects fetch error, using defaults:", err);
    return defaultProjects;
  }
}

/**
 * Fetch single Project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (!isSupabaseConfigured || !supabase) {
    return defaultProjects.find((p) => p.slug === slug);
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return defaultProjects.find((p) => p.slug === slug);
    }

    return data as Project;
  } catch (err) {
    return defaultProjects.find((p) => p.slug === slug);
  }
}
