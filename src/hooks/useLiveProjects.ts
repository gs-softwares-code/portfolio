"use client";

import { useState, useEffect } from "react";
import { allProjects as defaultProjects, Project } from "@/data/projectsData";
import { createClient } from "@supabase/supabase-js";

/**
 * Hook to retrieve live synchronized projects.
 * Follows the Offline-First SOP protocol:
 * 1. Checks localStorage for custom Supabase credentials configured via the PWA / Admin console.
 * 2. Falls back to NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
 * 3. Also checks localStorage cached projects ('gs_cached_projects') so client-side updates persist instantly across the browser.
 * 4. Merges live database data seamlessly over baseline defaultProjects.
 */
export function useLiveProjects() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Immediately check for any local cached projects from PWA publish
    const cachedProjects = localStorage.getItem("gs_cached_projects");
    if (cachedProjects) {
      try {
        const parsed = JSON.parse(cachedProjects);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge with default projects to ensure complete dataset
          const merged = defaultProjects.map((p) => {
            const liveMatch = parsed.find((item: any) => item.id === p.id || item.slug === p.slug);
            return liveMatch ? { ...p, ...liveMatch } : p;
          });
          // Add any newly added custom projects
          parsed.forEach((item: any) => {
            if (!merged.some((m) => m.id === item.id || m.slug === item.slug)) {
              merged.push(item);
            }
          });
          setProjects(merged);
        }
      } catch (e) {
        console.warn("Failed to parse local cached projects", e);
      }
    }

    // 2. Fetch live data from Supabase if configured
    const sUrl = localStorage.getItem("gs_supabase_url") || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const sKey = localStorage.getItem("gs_supabase_key") || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!sUrl || !sKey) {
      setLoading(false);
      return;
    }

    const client = createClient(sUrl, sKey);

    const loadLive = async () => {
      try {
        const { data, error } = await client.from("projects").select("*");
        if (!error && data && data.length > 0) {
          // Cache to localStorage for fast subsequent loads
          localStorage.setItem("gs_cached_projects", JSON.stringify(data));

          const merged = defaultProjects.map((p) => {
            const liveMatch = data.find((item: any) => item.id === p.id || item.slug === p.slug);
            return liveMatch ? { ...p, ...liveMatch } : p;
          });

          data.forEach((item: any) => {
            if (!merged.some((m) => m.id === item.id || m.slug === item.slug)) {
              merged.push(item as Project);
            }
          });

          setProjects(merged);
        }
      } catch (err) {
        console.warn("Failed to fetch live projects from Supabase:", err);
      } finally {
        setLoading(false);
      }
    };

    loadLive();
  }, []);

  return { projects, loading };
}
