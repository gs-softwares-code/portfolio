"use client";

import { useState, useEffect } from "react";
import { allProjects as defaultProjects, Project } from "@/data/projectsData";
import { createClient } from "@supabase/supabase-js";

/**
 * Hook to retrieve live synchronized projects.
 * Follows the Offline-First SOP protocol:
 * 1. Checks localStorage for custom Supabase credentials configured via the PWA / Admin console.
 * 2. Respects deletion tombstones ('gs_deleted_project_ids') so deleted projects are NEVER resurrected by defaults.
 * 3. Uses 'gs_cached_projects' directly when available.
 * 4. Synchronizes with Supabase live table if credentials exist.
 */
export function useLiveProjects() {
  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const rawDeleted = localStorage.getItem("gs_deleted_project_ids");
        const deletedIds: string[] = rawDeleted ? JSON.parse(rawDeleted) : [];
        const cached = localStorage.getItem("gs_cached_projects");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed)) {
            return parsed.filter((p: any) => !deletedIds.includes(p.id) && !deletedIds.includes(p.slug));
          }
        }
        return defaultProjects.filter((p) => !deletedIds.includes(p.id) && !deletedIds.includes(p.slug));
      } catch (e) {
        return defaultProjects;
      }
    }
    return defaultProjects;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rawDeleted = localStorage.getItem("gs_deleted_project_ids");
    const deletedIds: string[] = rawDeleted ? JSON.parse(rawDeleted) : [];

    // 1. Immediately check for any local cached projects from PWA publish or deletion
    const cachedProjects = localStorage.getItem("gs_cached_projects");
    if (cachedProjects) {
      try {
        const parsed = JSON.parse(cachedProjects);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter((p: any) => !deletedIds.includes(p.id) && !deletedIds.includes(p.slug));
          setProjects(filtered);
        }
      } catch (e) {
        console.warn("Failed to parse local cached projects", e);
      }
    } else if (deletedIds.length > 0) {
      setProjects(defaultProjects.filter((p) => !deletedIds.includes(p.id) && !deletedIds.includes(p.slug)));
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
        if (!error && data) {
          // Filter out any tombstone deleted projects
          const activeLive = data.filter(
            (item: any) => !deletedIds.includes(item.id) && !deletedIds.includes(item.slug)
          );

          localStorage.setItem("gs_cached_projects", JSON.stringify(activeLive));
          setProjects(activeLive as Project[]);
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

