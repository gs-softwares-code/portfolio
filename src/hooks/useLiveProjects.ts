"use client";

import { useState, useEffect } from "react";
import { allProjects as defaultProjects, Project } from "@/data/projectsData";
import { createClient } from "@supabase/supabase-js";

/**
 * Hook to retrieve live synchronized projects.
 * - Always ensures defaultProjects are safely available as the baseline so tiles NEVER vanish.
 * - Merges updates/additions from Supabase or local cache.
 * - Only excludes specific projects that the user explicitly deleted.
 */
export function useLiveProjects() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const rawDeleted = localStorage.getItem("gs_deleted_project_ids");
      const deletedIds: string[] = rawDeleted ? JSON.parse(rawDeleted) : [];

      const cached = localStorage.getItem("gs_cached_projects");
      let baseList = defaultProjects;

      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge cached items over defaultProjects
          baseList = defaultProjects.map((dp) => {
            const found = parsed.find((item: any) => item.id === dp.id || item.slug === dp.slug);
            return found ? { ...dp, ...found } : dp;
          });
          // Include any newly created custom projects
          parsed.forEach((item: any) => {
            if (!baseList.some((b) => b.id === item.id || b.slug === item.slug)) {
              baseList.push(item);
            }
          });
        }
      }

      // Filter only explicitly deleted IDs
      const activeProjects = baseList.filter(
        (p) => !deletedIds.includes(p.id) && !deletedIds.includes(p.slug)
      );

      // If everything was somehow marked deleted by accident, restore defaultProjects
      if (activeProjects.length > 0) {
        setProjects(activeProjects);
      } else {
        localStorage.removeItem("gs_deleted_project_ids");
        setProjects(defaultProjects);
      }
    } catch (e) {
      setProjects(defaultProjects);
    }

    // Connect to live Supabase if credentials exist
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
          const rawDeleted = localStorage.getItem("gs_deleted_project_ids");
          const deletedIds: string[] = rawDeleted ? JSON.parse(rawDeleted) : [];

          // Merge live data with default projects
          const merged = defaultProjects.map((dp) => {
            const found = data.find((item: any) => item.id === dp.id || item.slug === dp.slug);
            return found ? { ...dp, ...found } : dp;
          });

          data.forEach((item: any) => {
            if (!merged.some((m) => m.id === item.id || m.slug === item.slug)) {
              merged.push(item as Project);
            }
          });

          const activeLive = merged.filter(
            (p) => !deletedIds.includes(p.id) && !deletedIds.includes(p.slug)
          );

          if (activeLive.length > 0) {
            localStorage.setItem("gs_cached_projects", JSON.stringify(activeLive));
            setProjects(activeLive);
          }
        }
      } catch (err) {
        console.warn("Supabase projects sync warning:", err);
      } finally {
        setLoading(false);
      }
    };

    loadLive();
  }, []);

  return { projects, loading };
}


