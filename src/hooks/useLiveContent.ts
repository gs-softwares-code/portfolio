"use client";

import { useState, useEffect } from "react";
import { serviceDivisions as defaultServices, ServiceDivision } from "@/data/servicesData";
import { industrySolutions as defaultSolutions, IndustrySolution } from "@/data/industriesData";
import { createClient } from "@supabase/supabase-js";

/**
 * Hook to retrieve live synchronized Services & Solutions cards.
 * Ensures that changes made in the PWA Admin Console immediately reflect on the frontend.
 */
export function useLiveContent() {
  const [services, setServices] = useState<ServiceDivision[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("gs_cached_services");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
    }
    return defaultServices;
  });

  const [solutions, setSolutions] = useState<IndustrySolution[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("gs_cached_solutions");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
    }
    return defaultSolutions;
  });

  const syncFromStorage = () => {
    try {
      const cachedSvc = localStorage.getItem("gs_cached_services");
      if (cachedSvc) {
        const parsed = JSON.parse(cachedSvc);
        if (Array.isArray(parsed) && parsed.length > 0) setServices(parsed);
      }
      const cachedSol = localStorage.getItem("gs_cached_solutions");
      if (cachedSol) {
        const parsed = JSON.parse(cachedSol);
        if (Array.isArray(parsed) && parsed.length > 0) setSolutions(parsed);
      }
    } catch (e) {}
  };

  useEffect(() => {
    syncFromStorage();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "gs_cached_services" || e.key === "gs_cached_solutions") {
        syncFromStorage();
      }
    };
    const handleCustom = () => syncFromStorage();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("gs_content_updated", handleCustom);

    // Supabase sync
    const sUrl = localStorage.getItem("gs_supabase_url") || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const sKey = localStorage.getItem("gs_supabase_key") || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (sUrl && sKey) {
      const client = createClient(sUrl, sKey);
      Promise.all([
        client.from("services").select("*").order("number"),
        client.from("solutions").select("*"),
      ]).then(([sRes, solRes]) => {
        if (sRes.data && sRes.data.length > 0) {
          localStorage.setItem("gs_cached_services", JSON.stringify(sRes.data));
          setServices(sRes.data as ServiceDivision[]);
        }
        if (solRes.data && solRes.data.length > 0) {
          localStorage.setItem("gs_cached_solutions", JSON.stringify(solRes.data));
          setSolutions(solRes.data as IndustrySolution[]);
        }
      }).catch((err) => {
        console.warn("Content live sync notice:", err);
      });
    }

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("gs_content_updated", handleCustom);
    };
  }, []);

  return { services, solutions };
}
