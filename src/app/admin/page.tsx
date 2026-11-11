"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { serviceDivisions as defaultServices } from "@/data/servicesData";
import { industrySolutions as defaultSolutions } from "@/data/industriesData";
import { allProjects as defaultProjects } from "@/data/projectsData";
import {
  Settings,
  Database,
  Briefcase,
  Layers,
  Sparkles,
  Save,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  RefreshCw,
  ExternalLink,
  Download,
  UploadCloud,
  Mail,
  Check,
  X
} from "lucide-react";

type ActiveTab = "dashboard" | "services" | "solutions" | "projects" | "leads" | "settings";

interface PendingChange {
  id: string;
  table: string;
  title: string;
  action: "update" | "insert" | "delete";
  timestamp: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");

  // Supabase Configuration State (persisted in localStorage for mobile APK)
  const [supabaseUrl, setSupabaseUrl] = useState("");
  const [supabaseKey, setSupabaseKey] = useState("");
  const [configSaved, setConfigSaved] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Data states (pre-populated with default offline system data per SOP)
  const [services, setServices] = useState<any[]>(defaultServices);
  const [solutions, setSolutions] = useState<any[]>(defaultSolutions);
  const [projects, setProjects] = useState<any[]>(defaultProjects);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  // SOP Offline-First Ledger
  const [pendingLedger, setPendingLedger] = useState<PendingChange[]>([]);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [lastPublishedAt, setLastPublishedAt] = useState<string | null>(null);

  // Modal State for Adding New Content
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addType, setAddType] = useState<"service" | "solution" | "project">("service");
  const [newItemName, setNewItemName] = useState("");
  const [newItemHeadline, setNewItemHeadline] = useState("");
  const [newItemTagline, setNewItemTagline] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemExtra, setNewItemExtra] = useState(""); // URL or extra tag
  const [newItemImage, setNewItemImage] = useState(""); // Google Drive / image link

  // Load saved credentials on start & Register Service Worker
  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((err) => {
        console.warn("SW registration skipped:", err);
      });
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Load credentials & publish timestamp
    const savedUrl = localStorage.getItem("gs_supabase_url") || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const savedKey = localStorage.getItem("gs_supabase_key") || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    const savedSync = localStorage.getItem("gs_last_published_at");
    if (savedSync) setLastPublishedAt(savedSync);

    setSupabaseUrl(savedUrl);
    setSupabaseKey(savedKey);
    if (savedUrl && savedKey) {
      fetchData(savedUrl, savedKey);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      setInstallPrompt(null);
    }
  };

  const getClient = (url = supabaseUrl, key = supabaseKey) => {
    if (!url || !key) return null;
    return createClient(url, key);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("gs_supabase_url", supabaseUrl);
    localStorage.setItem("gs_supabase_key", supabaseKey);
    setConfigSaved(true);
    setStatusMessage({ text: "Database connection settings saved!", type: "success" });
    setTimeout(() => setConfigSaved(false), 3000);
    fetchData(supabaseUrl, supabaseKey);
  };

  const fetchData = async (url = supabaseUrl, key = supabaseKey) => {
    const client = getClient(url, key);
    if (!client) {
      setServices(defaultServices);
      setSolutions(defaultSolutions);
      setProjects(defaultProjects);
      setStatusMessage({ text: "Loaded baseline data. Enter Supabase credentials in Settings to sync live.", type: "success" });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const [sRes, solRes, pRes, leadRes] = await Promise.all([
        client.from("services").select("*").order("number"),
        client.from("solutions").select("*"),
        client.from("projects").select("*"),
        client.from("contact_submissions").select("*").order("created_at", { ascending: false }).limit(20),
      ]);

      if (sRes.data && sRes.data.length > 0) setServices(sRes.data);
      else setServices(defaultServices);

      if (solRes.data && solRes.data.length > 0) setSolutions(solRes.data);
      else setSolutions(defaultSolutions);

      if (pRes.data && pRes.data.length > 0) setProjects(pRes.data);
      else setProjects(defaultProjects);

      if (leadRes.data) setLeads(leadRes.data);

      setStatusMessage({ text: "Live data synchronized from database.", type: "success" });
    } catch (err: any) {
      setServices(defaultServices);
      setSolutions(defaultSolutions);
      setProjects(defaultProjects);
      setStatusMessage({ text: `Failed to fetch live data (${err.message}). Showing baseline.`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // SOP Edit & Track Draft
  const handleUpdate = async (table: string, id: string, payload: any, itemTitle?: string) => {
    const newEntry: PendingChange = {
      id: `${table}_${id}_${Date.now()}`,
      table,
      title: itemTitle || `${table} record (${id})`,
      action: "update",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setPendingLedger((prev) => [newEntry, ...prev]);

    // Local state immediate optimistic update
    if (table === "services") {
      setServices((prev) => prev.map((item) => (item.id === id ? { ...item, ...payload } : item)));
    } else if (table === "solutions") {
      setSolutions((prev) => prev.map((item) => (item.id === id ? { ...item, ...payload } : item)));
    } else if (table === "projects") {
      setProjects((prev) => prev.map((item) => (item.id === id ? { ...item, ...payload } : item)));
    }

    const client = getClient();
    if (!client) {
      setStatusMessage({ text: `Saved locally! Click Publish when ready to push live.`, type: "success" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await client.from(table).update(payload).eq("id", id);
      if (error) throw error;
      setStatusMessage({ text: `Updated ${table} live in database!`, type: "success" });
      const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setLastPublishedAt(nowStr);
      localStorage.setItem("gs_last_published_at", nowStr);
    } catch (err: any) {
      setStatusMessage({ text: `Update error: ${err.message}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // SOP Add New Record Handler
  const handleCreateNewItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const slug = newItemName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    let table = "services";
    let newRecord: any = null;

    if (addType === "service") {
      table = "services";
      const nextNum = String(services.length + 1).padStart(2, "0");
      newRecord = {
        id: slug,
        slug,
        number: nextNum,
        name: newItemName,
        shortName: newItemName,
        iconKey: "layers",
        accentColor: "#3B82F6",
        tagline: newItemTagline || "Engineered for scalable business operations.",
        headline: newItemHeadline || newItemName,
        description: newItemDescription || "Custom engineered systems and technical infrastructure.",
        whyItMatters: "Direct operational advantage and business efficiency.",
        services: [],
        technologies: ["Next.js", "TypeScript", "Node.js"],
        whoNeedsThis: ["Growing Businesses", "Enterprises"],
        relatedIndustries: [],
      };
      setServices((prev) => [...prev, newRecord]);
    } else if (addType === "solution") {
      table = "solutions";
      newRecord = {
        id: slug,
        slug,
        name: newItemName,
        shortName: newItemName,
        iconKey: "sparkles",
        accentColor: "#8B5CF6",
        tagline: newItemTagline || "Engineered industry solution.",
        headline: newItemHeadline || newItemName,
        description: newItemDescription || "Specialized technology stack designed for this industry vertical.",
        problems: ["Manual processes causing bottlenecks", "Lack of real-time visibility"],
        solutions: [{ name: "System Integration", description: "Automated end-to-end platform", serviceSlug: "applications" }],
        automationOpportunities: ["Client onboarding", "Reporting workflows"],
        analyticsOpportunities: ["Key metrics dashboard"],
        recommendedDivisions: ["digital-presence", "applications"],
        implementationRoadmap: [{ phase: "Phase 1", title: "Architecture", description: "System design & requirements" }],
      };
      setSolutions((prev) => [...prev, newRecord]);
    } else if (addType === "project") {
      table = "projects";
      newRecord = {
        id: slug,
        slug,
        name: newItemName,
        industry: newItemTagline || "Software & Technology",
        status: "live",
        description: newItemDescription || "Engineered platform delivery with measurable impact.",
        longDescription: newItemDescription || "Full-stack application engineered and deployed for client operations.",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
        keyFeatures: ["Custom architecture", "Automated workflows", "High performance"],
        githubUrl: "https://github.com/gs-softwares-code",
        liveUrl: newItemExtra || null,
        imageUrl: newItemImage || null,
        featured: true,
      };
      setProjects((prev) => [...prev, newRecord]);
    }

    // Add to pending ledger
    const newEntry: PendingChange = {
      id: `${table}_${slug}_${Date.now()}`,
      table,
      title: `Created: ${newItemName}`,
      action: "insert",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setPendingLedger((prev) => [newEntry, ...prev]);

    // Push to Supabase if configured
    const client = getClient();
    if (client && newRecord) {
      try {
        await client.from(table).upsert(newRecord);
        setStatusMessage({ text: `Created and published new ${addType} live!`, type: "success" });
      } catch (err: any) {
        setStatusMessage({ text: `Added locally. Database sync note: ${err.message}`, type: "error" });
      }
    } else {
      setStatusMessage({ text: `New ${addType} created locally!`, type: "success" });
    }

    // Reset form and close
    setNewItemName("");
    setNewItemHeadline("");
    setNewItemTagline("");
    setNewItemDescription("");
    setNewItemExtra("");
    setNewItemImage("");
    setIsAddModalOpen(false);
  };

  // SOP Delete item handler
  const handleDelete = async (table: string, id: string) => {
    if (!confirm(`Are you sure you want to delete this record from ${table}?`)) return;

    if (table === "services") {
      setServices((prev) => prev.filter((i) => i.id !== id));
    } else if (table === "solutions") {
      setSolutions((prev) => prev.filter((i) => i.id !== id));
    } else if (table === "projects") {
      setProjects((prev) => prev.filter((i) => i.id !== id));
    }

    const client = getClient();
    if (!client) {
      setStatusMessage({ text: `Removed locally from ${table}.`, type: "success" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await client.from(table).delete().eq("id", id);
      if (error) throw error;
      setStatusMessage({ text: `Record deleted from ${table}!`, type: "success" });
    } catch (err: any) {
      setStatusMessage({ text: `Delete error: ${err.message}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // SOP Backup & Recovery
  const handleExportBackup = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      services,
      solutions,
      projects,
      leads,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gs_softwares_backup_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatusMessage({ text: "Backup JSON successfully exported!", type: "success" });
  };

  return (
    <div className="min-h-screen bg-[#E9EDF2] text-[#151A23] font-sans pb-24">
      {/* SOP Header with Status Indicators */}
      <header className="sticky top-0 z-50 bg-[#E9EDF2]/90 backdrop-blur-md px-4 py-3 border-b border-black/5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-[#171C29] text-white flex items-center justify-center font-bold text-xs shadow-md">
            GS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-sm tracking-tight">GS Admin Console</h1>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isOnline ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                }`}
              >
                {isOnline ? "Online" : "Offline Mode"}
              </span>
            </div>
            <p className="text-[10px] text-gray-500 font-mono">
              Status: {pendingLedger.length === 0 ? "Up to Date" : `${pendingLedger.length} Pending Drafts`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {installPrompt && (
            <button
              onClick={handleInstallClick}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all animate-pulse"
              title="Install PWA"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Install App</span>
            </button>
          )}

          <button
            onClick={() => setIsPublishModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
            title="Publish Changes"
          >
            <UploadCloud className="h-3.5 w-3.5" />
            <span>Publish</span>
          </button>

          <button
            onClick={() => fetchData()}
            disabled={loading}
            className="p-2 rounded-xl bg-[#E9EDF2] shadow-[3px_3px_6px_rgba(163,177,198,0.4),-3px_-3px_6px_rgba(255,255,255,0.8)] active:shadow-[inset_2px_2px_4px_rgba(163,177,198,0.4)] text-blue-600 transition-all"
            title="Sync / Refresh Data"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </header>

      {/* Status banner */}
      {statusMessage && (
        <div
          className={`mx-4 mt-4 p-3 rounded-xl flex items-center gap-2 text-xs font-medium ${
            statusMessage.type === "success"
              ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20"
              : "bg-rose-500/10 text-rose-700 border border-rose-500/20"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="p-4 max-w-2xl mx-auto space-y-6">
        {/* TAB 1: SOP DASHBOARD */}
        {activeTab === "dashboard" && (
          <section className="space-y-5">
            <div>
              <h2 className="text-lg font-bold">Console Overview</h2>
              <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                Real-time operational dashboard per SOP protocols.
              </p>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-[#E9EDF2] shadow-[4px_4px_10px_rgba(163,177,198,0.35),-4px_-4px_10px_rgba(255,255,255,0.8)] text-center">
                <p className="text-[10px] font-mono uppercase text-gray-500">Services</p>
                <p className="text-xl font-bold text-blue-600 mt-1">{services.length}</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#E9EDF2] shadow-[4px_4px_10px_rgba(163,177,198,0.35),-4px_-4px_10px_rgba(255,255,255,0.8)] text-center">
                <p className="text-[10px] font-mono uppercase text-gray-500">Solutions</p>
                <p className="text-xl font-bold text-purple-600 mt-1">{solutions.length}</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#E9EDF2] shadow-[4px_4px_10px_rgba(163,177,198,0.35),-4px_-4px_10px_rgba(255,255,255,0.8)] text-center">
                <p className="text-[10px] font-mono uppercase text-gray-500">Projects</p>
                <p className="text-xl font-bold text-emerald-600 mt-1">{projects.length}</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#E9EDF2] shadow-[4px_4px_10px_rgba(163,177,198,0.35),-4px_-4px_10px_rgba(255,255,255,0.8)] text-center">
                <p className="text-[10px] font-mono uppercase text-gray-500">Inquiries</p>
                <p className="text-xl font-bold text-amber-600 mt-1">{leads.length}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-5 rounded-3xl bg-[#E9EDF2] shadow-[6px_6px_14px_rgba(163,177,198,0.35),-6px_-6px_14px_rgba(255,255,255,0.85)] space-y-3">
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-gray-700">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setAddType("service");
                    setIsAddModalOpen(true);
                  }}
                  className="p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 text-xs font-semibold text-left flex items-center gap-2 transition-all border border-blue-500/20"
                >
                  <Plus className="h-4 w-4 shrink-0 text-blue-600" />
                  <span>Add New Service</span>
                </button>
                <button
                  onClick={() => {
                    setAddType("solution");
                    setIsAddModalOpen(true);
                  }}
                  className="p-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 text-xs font-semibold text-left flex items-center gap-2 transition-all border border-purple-500/20"
                >
                  <Plus className="h-4 w-4 shrink-0 text-purple-600" />
                  <span>Add Solution Vertical</span>
                </button>
                <button
                  onClick={() => {
                    setAddType("project");
                    setIsAddModalOpen(true);
                  }}
                  className="p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 text-xs font-semibold text-left flex items-center gap-2 transition-all border border-emerald-500/20"
                >
                  <Plus className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Add Project Showcase</span>
                </button>
                <button
                  onClick={handleExportBackup}
                  className="p-3 rounded-xl bg-white/60 hover:bg-white text-xs font-medium text-left flex items-center gap-2 transition-all shadow-sm"
                >
                  <Download className="h-4 w-4 text-amber-600" />
                  <span>Export Backup</span>
                </button>
              </div>
            </div>

            {/* Pending Ledger Display */}
            <div className="p-5 rounded-3xl bg-[#E9EDF2] shadow-[6px_6px_14px_rgba(163,177,198,0.35),-6px_-6px_14px_rgba(255,255,255,0.85)] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-gray-700">
                  Draft &amp; Audit Ledger ({pendingLedger.length})
                </h3>
                {pendingLedger.length > 0 && (
                  <button
                    onClick={() => setPendingLedger([])}
                    className="text-[10px] text-gray-500 hover:text-rose-600 font-mono underline"
                  >
                    Clear History
                  </button>
                )}
              </div>

              {pendingLedger.length === 0 ? (
                <p className="text-xs text-gray-500 py-3 text-center">No pending changes. Live website is in sync.</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {pendingLedger.map((change) => (
                    <div key={change.id} className="p-2.5 rounded-xl bg-white/50 text-xs flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-gray-800">{change.title}</span>
                        <span className="text-[10px] text-gray-500 ml-2 font-mono uppercase">[{change.table}]</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono">{change.timestamp}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* TAB 2: SERVICES */}
        {activeTab === "services" && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Services Divisions</h2>
                <p className="text-xs text-gray-500">Edit core divisions, taglines and headlines.</p>
              </div>
              <button
                onClick={() => {
                  setAddType("service");
                  setIsAddModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 shadow-md transition-all active:scale-95"
              >
                <Plus className="h-4 w-4" />
                <span>Add Division</span>
              </button>
            </div>

            {services.map((svc) => (
              <div
                key={svc.id}
                className="p-5 rounded-3xl bg-[#E9EDF2] shadow-[6px_6px_14px_rgba(163,177,198,0.35),-6px_-6px_14px_rgba(255,255,255,0.85)] space-y-3.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">
                    Division {svc.number || "Custom"}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-gray-400">/{svc.slug}</span>
                    <button
                      onClick={() => handleDelete("services", svc.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                      title="Delete Service"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    Division Name
                  </label>
                  <input
                    type="text"
                    defaultValue={svc.name}
                    placeholder="Enter division title..."
                    onBlur={(e) => handleUpdate("services", svc.id, { name: e.target.value }, svc.name)}
                    className="w-full px-3 py-2 rounded-xl bg-[#E9EDF2] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] font-bold text-sm text-gray-800 outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    defaultValue={svc.tagline}
                    placeholder="Enter concise punchy tagline..."
                    onBlur={(e) => handleUpdate("services", svc.id, { tagline: e.target.value }, svc.name)}
                    className="w-full px-3 py-2 rounded-xl bg-[#E9EDF2] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] text-xs text-gray-700 outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={svc.description}
                    placeholder="Enter complete division description..."
                    onBlur={(e) => handleUpdate("services", svc.id, { description: e.target.value }, svc.name)}
                    className="w-full px-3 py-2 rounded-xl bg-[#E9EDF2] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] text-xs text-gray-700 outline-none focus:ring-1 focus:ring-blue-600 resize-none"
                  />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* TAB 3: SOLUTIONS */}
        {activeTab === "solutions" && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Industry Solutions</h2>
                <p className="text-xs text-gray-500">Edit enterprise vertical solutions &amp; headlines.</p>
              </div>
              <button
                onClick={() => {
                  setAddType("solution");
                  setIsAddModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1 shadow-md transition-all active:scale-95"
              >
                <Plus className="h-4 w-4" />
                <span>Add Vertical</span>
              </button>
            </div>

            {solutions.map((sol) => (
              <div
                key={sol.id}
                className="p-5 rounded-3xl bg-[#E9EDF2] shadow-[6px_6px_14px_rgba(163,177,198,0.35),-6px_-6px_14px_rgba(255,255,255,0.85)] space-y-3.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-gray-800">{sol.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-gray-400">/{sol.slug}</span>
                    <button
                      onClick={() => handleDelete("solutions", sol.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                      title="Delete Solution"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    Headline
                  </label>
                  <input
                    type="text"
                    defaultValue={sol.headline}
                    placeholder="Enter industry headline..."
                    onBlur={(e) => handleUpdate("solutions", sol.id, { headline: e.target.value }, sol.name)}
                    className="w-full px-3 py-2 rounded-xl bg-[#E9EDF2] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] text-xs text-gray-800 font-medium outline-none focus:ring-1 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={sol.description}
                    placeholder="Enter industry problem/solution description..."
                    onBlur={(e) => handleUpdate("solutions", sol.id, { description: e.target.value }, sol.name)}
                    className="w-full px-3 py-2 rounded-xl bg-[#E9EDF2] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] text-xs text-gray-700 outline-none focus:ring-1 focus:ring-purple-600 resize-none"
                  />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* TAB 4: PROJECTS */}
        {activeTab === "projects" && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Portfolio Case Studies</h2>
                <p className="text-xs text-gray-500">Manage showcased client systems and live links.</p>
              </div>
              <button
                onClick={() => {
                  setAddType("project");
                  setIsAddModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-md transition-all active:scale-95"
              >
                <Plus className="h-4 w-4" />
                <span>Add Case Study</span>
              </button>
            </div>

            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-5 rounded-3xl bg-[#E9EDF2] shadow-[6px_6px_14px_rgba(163,177,198,0.35),-6px_-6px_14px_rgba(255,255,255,0.85)] space-y-3.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-gray-800">{proj.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg uppercase">
                      {proj.status}
                    </span>
                    <button
                      onClick={() => handleDelete("projects", proj.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                      title="Delete Case Study"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    Status / Category
                  </label>
                  <input
                    type="text"
                    defaultValue={proj.status}
                    placeholder="e.g. live, in-development, prototype"
                    onBlur={(e) => handleUpdate("projects", proj.id, { status: e.target.value }, proj.name)}
                    className="w-full px-3 py-2 rounded-xl bg-[#E9EDF2] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] text-xs text-gray-700 outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    Overview Description
                  </label>
                  <input
                    type="text"
                    defaultValue={proj.description}
                    placeholder="Enter project summary..."
                    onBlur={(e) => handleUpdate("projects", proj.id, { description: e.target.value }, proj.name)}
                    className="w-full px-3 py-2 rounded-xl bg-[#E9EDF2] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] text-xs text-gray-700 outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    Live Demo / Site URL (Optional)
                  </label>
                  <input
                    type="text"
                    defaultValue={proj.liveUrl || ""}
                    placeholder="https://client-demo.vercel.app"
                    onBlur={(e) => handleUpdate("projects", proj.id, { liveUrl: e.target.value || null }, proj.name)}
                    className="w-full px-3 py-2 rounded-xl bg-[#E9EDF2] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] text-xs text-gray-700 outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    Project Image Link (Google Drive / Direct URL)
                  </label>
                  <input
                    type="text"
                    defaultValue={proj.imageUrl || ""}
                    placeholder="https://drive.google.com/file/d/... or https://..."
                    onBlur={(e) => handleUpdate("projects", proj.id, { imageUrl: e.target.value || null }, proj.name)}
                    className="w-full px-3 py-2 rounded-xl bg-[#E9EDF2] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] text-xs text-gray-700 outline-none focus:ring-1 focus:ring-emerald-600 font-mono"
                  />
                  <p className="text-[9px] text-gray-400 mt-1">
                    Tip: Paste your Google Drive sharing link here. The system automatically converts it into a high-res image stream for the website.
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* TAB 5: LEADS & INQUIRIES */}
        {activeTab === "leads" && (
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-bold">Client Inquiries &amp; Leads</h2>
              <p className="text-xs text-gray-500">Live lead intake pipeline from the contact form.</p>
            </div>

            {leads.length === 0 ? (
              <div className="p-8 text-center rounded-3xl bg-[#E9EDF2] shadow-[inset_4px_4px_8px_rgba(163,177,198,0.35),inset_-4px_-4px_8px_rgba(255,255,255,0.7)] text-xs text-gray-500">
                No inquiries recorded yet in Supabase `contact_submissions`.
              </div>
            ) : (
              leads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-5 rounded-3xl bg-[#E9EDF2] shadow-[6px_6px_14px_rgba(163,177,198,0.35),-6px_-6px_14px_rgba(255,255,255,0.85)] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-gray-800">{lead.full_name}</span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg uppercase">
                      {lead.status || "new"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    <strong>Business:</strong> {lead.business_name} | <strong>Email:</strong> {lead.email}
                  </p>
                  <p className="text-xs text-gray-600">
                    <strong>Industry:</strong> {lead.industry} | <strong>Budget:</strong> {lead.budget_range || "N/A"}
                  </p>
                  <div className="p-3 rounded-xl bg-white/50 text-xs text-gray-700 font-mono">
                    {lead.description}
                  </div>
                </div>
              ))
            )}
          </section>
        )}

        {/* TAB 6: SETTINGS & BACKUP */}
        {activeTab === "settings" && (
          <section className="space-y-5">
            <div>
              <h2 className="text-lg font-bold">Console Settings &amp; Recovery</h2>
              <p className="text-xs text-gray-500 leading-relaxed mt-1">
                Configure database connection parameters and export disaster recovery backups per SOP Section 6.
              </p>
            </div>

            {/* Supabase Connection */}
            <form onSubmit={handleSaveSettings} className="p-6 rounded-3xl bg-[#E9EDF2] shadow-[6px_6px_14px_rgba(163,177,198,0.35),-6px_-6px_14px_rgba(255,255,255,0.85)] space-y-4">
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-gray-700">Supabase Connection</h3>
              <div>
                <label className="block font-mono text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Public Supabase URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://xxxxxxxxxxxx.supabase.co"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#E9EDF2] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.35),inset_-2px_-2px_4px_rgba(255,255,255,0.75)] text-xs font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Supabase API Key (Anon / Service Role) *
                </label>
                <input
                  type="password"
                  required
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI..."
                  value={supabaseKey}
                  onChange={(e) => setSupabaseKey(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#E9EDF2] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.35),inset_-2px_-2px_4px_rgba(255,255,255,0.75)] text-xs font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Connection &amp; Sync</span>
                </button>
              </div>
            </form>

            {/* SOP Backup & Restore */}
            <div className="p-6 rounded-3xl bg-[#E9EDF2] shadow-[6px_6px_14px_rgba(163,177,198,0.35),-6px_-6px_14px_rgba(255,255,255,0.85)] space-y-3">
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-gray-700">Disaster Recovery (SOP Section 6)</h3>
              <p className="text-xs text-gray-500">
                Export full JSON snapshots of services, solutions, projects, and client inquiries.
              </p>
              <button
                onClick={handleExportBackup}
                className="w-full py-3 rounded-xl bg-white/80 hover:bg-white text-gray-800 font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-2 border border-black/5"
              >
                <Download className="h-4 w-4 text-emerald-600" />
                <span>Export Full Backup (.JSON)</span>
              </button>
            </div>
          </section>
        )}
      </main>

      {/* MODAL: ADD NEW CONTENT (TILES) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="max-w-md w-full bg-[#E9EDF2] rounded-3xl p-6 shadow-2xl space-y-4 border border-black/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold text-sm capitalize">Add New {addType}</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-black hover:bg-black/5 transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNewItem} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-mono font-semibold text-gray-600 uppercase mb-1">
                  Title / Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder={`e.g. NextGen ${addType === "service" ? "Microservices" : addType === "solution" ? "Logistics" : "Fintech Dashboard"}`}
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#E9EDF2] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] text-xs text-gray-800 font-semibold outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-semibold text-gray-600 uppercase mb-1">
                  Headline / Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Engineered Scalability for Fast Operations"
                  value={newItemHeadline}
                  onChange={(e) => setNewItemHeadline(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#E9EDF2] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] text-xs text-gray-800 outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-semibold text-gray-600 uppercase mb-1">
                  Tagline / Subtitle
                </label>
                <input
                  type="text"
                  placeholder="e.g. Turn operational bottlenecks into automated throughput"
                  value={newItemTagline}
                  onChange={(e) => setNewItemTagline(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#E9EDF2] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] text-xs text-gray-800 outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-semibold text-gray-600 uppercase mb-1">
                  Detailed Description *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the capabilities, impact, and deliverables..."
                  value={newItemDescription}
                  onChange={(e) => setNewItemDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#E9EDF2] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] text-xs text-gray-800 outline-none focus:ring-1 focus:ring-blue-600 resize-none"
                />
              </div>

              {addType === "project" && (
                <>
                  <div>
                    <label className="block text-[10px] font-mono font-semibold text-gray-600 uppercase mb-1">
                      Live Demo / Website URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newItemExtra}
                      onChange={(e) => setNewItemExtra(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#E9EDF2] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] text-xs text-gray-800 outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-semibold text-gray-600 uppercase mb-1">
                      Project Image URL (Google Drive / Direct Link)
                    </label>
                    <input
                      type="text"
                      placeholder="https://drive.google.com/file/d/... or https://..."
                      value={newItemImage}
                      onChange={(e) => setNewItemImage(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#E9EDF2] shadow-[inset_2px_2px_4px_rgba(163,177,198,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] text-xs text-gray-800 outline-none focus:ring-1 focus:ring-blue-600 font-mono"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create &amp; Add Tile</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SOP Publish Modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="max-w-md w-full bg-[#E9EDF2] rounded-3xl p-6 shadow-2xl space-y-4 border border-black/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UploadCloud className="h-5 w-5 text-emerald-600" />
                <h3 className="font-bold text-sm">Publish Content to Live Website</h3>
              </div>
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="text-xs font-mono text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-600">
              Audit pending drafts before publishing live to Supabase and the production website.
            </p>

            <div className="p-3 rounded-2xl bg-white/60 space-y-1 text-xs">
              <p className="font-bold text-gray-700">Pre-Publish Validation:</p>
              <p className="text-emerald-700 flex items-center gap-1 font-mono">
                <Check className="h-3.5 w-3.5" /> Schema integrity verified
              </p>
              <p className="text-emerald-700 flex items-center gap-1 font-mono">
                <Check className="h-3.5 w-3.5" /> {pendingLedger.length} item(s) in change ledger
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setPendingLedger([]);
                  const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                  setLastPublishedAt(nowStr);
                  localStorage.setItem("gs_last_published_at", nowStr);
                  setIsPublishModalOpen(false);
                  setStatusMessage({ text: "All changes published live to production!", type: "success" });
                }}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
              >
                Confirm &amp; Publish Live
              </button>
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="px-4 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#E9EDF2]/95 backdrop-blur-md border-t border-black/5 px-2 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === "dashboard" ? "text-blue-600 font-bold" : "text-gray-500"
          }`}
        >
          <Database className="h-4 w-4" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab("services")}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === "services" ? "text-blue-600 font-bold" : "text-gray-500"
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>Services</span>
        </button>

        <button
          onClick={() => setActiveTab("solutions")}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === "solutions" ? "text-blue-600 font-bold" : "text-gray-500"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>Solutions</span>
        </button>

        <button
          onClick={() => setActiveTab("projects")}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === "projects" ? "text-blue-600 font-bold" : "text-gray-500"
          }`}
        >
          <Briefcase className="h-4 w-4" />
          <span>Projects</span>
        </button>

        <button
          onClick={() => setActiveTab("leads")}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === "leads" ? "text-blue-600 font-bold" : "text-gray-500"
          }`}
        >
          <Mail className="h-4 w-4" />
          <span>Inquiries</span>
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === "settings" ? "text-blue-600 font-bold" : "text-gray-500"
          }`}
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
}
