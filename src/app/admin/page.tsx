"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
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
} from "lucide-react";

type ActiveTab = "services" | "solutions" | "projects" | "settings";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("services");

  // Supabase Configuration State (persisted in localStorage for mobile APK)
  const [supabaseUrl, setSupabaseUrl] = useState("");
  const [supabaseKey, setSupabaseKey] = useState("");
  const [configSaved, setConfigSaved] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Data states
  const [services, setServices] = useState<any[]>([]);
  const [solutions, setSolutions] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Load saved credentials on start
  useEffect(() => {
    const savedUrl = localStorage.getItem("gs_supabase_url") || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const savedKey = localStorage.getItem("gs_supabase_key") || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    setSupabaseUrl(savedUrl);
    setSupabaseKey(savedKey);
    if (savedUrl && savedKey) {
      fetchData(savedUrl, savedKey);
    }
  }, []);

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
      setStatusMessage({ text: "Configure your Supabase URL & Key in Settings to load data.", type: "error" });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const [sRes, solRes, pRes] = await Promise.all([
        client.from("services").select("*").order("number", { ascending: true }),
        client.from("solutions").select("*").order("name", { ascending: true }),
        client.from("projects").select("*").order("name", { ascending: true }),
      ]);

      if (sRes.data) setServices(sRes.data);
      if (solRes.data) setSolutions(solRes.data);
      if (pRes.data) setProjects(pRes.data);

      setStatusMessage({ text: "Live data synchronized from database.", type: "success" });
    } catch (err: any) {
      setStatusMessage({ text: `Failed to fetch data: ${err.message}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Update item handler
  const handleUpdate = async (table: string, id: string, payload: any) => {
    const client = getClient();
    if (!client) return;

    setLoading(true);
    try {
      const { error } = await client.from(table).update(payload).eq("id", id);
      if (error) throw error;
      setStatusMessage({ text: `Updated ${table} successfully!`, type: "success" });
      fetchData();
    } catch (err: any) {
      setStatusMessage({ text: `Update error: ${err.message}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Delete item handler
  const handleDelete = async (table: string, id: string) => {
    if (!confirm(`Are you sure you want to delete this record from ${table}?`)) return;
    const client = getClient();
    if (!client) return;

    setLoading(true);
    try {
      const { error } = await client.from(table).delete().eq("id", id);
      if (error) throw error;
      setStatusMessage({ text: `Deleted from ${table}!`, type: "success" });
      fetchData();
    } catch (err: any) {
      setStatusMessage({ text: `Delete error: ${err.message}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E9EDF2] text-[#151A23] font-sans pb-24">
      {/* Mobile-Friendly Top Bar */}
      <header className="sticky top-0 z-50 bg-[#E9EDF2]/90 backdrop-blur-md px-4 py-3.5 border-b border-black/5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-[#171C29] text-white flex items-center justify-center font-bold text-xs shadow-md">
            GS
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight">GS Admin Mobile</h1>
            <p className="text-[10px] text-gray-500 font-mono">Live Content Orchestrator</p>
          </div>
        </div>

        <button
          onClick={() => fetchData()}
          disabled={loading}
          className="p-2 rounded-xl bg-[#E9EDF2] shadow-[3px_3px_6px_rgba(163,177,198,0.4),-3px_-3px_6px_rgba(255,255,255,0.8)] active:shadow-[inset_2px_2px_4px_rgba(163,177,198,0.4)] text-blue-600 transition-all"
          title="Refresh Data"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </button>
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
        {/* TAB: SERVICES */}
        {activeTab === "services" && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Service Divisions ({services.length})</h2>
              <span className="text-xs font-mono text-gray-500">Live Database</span>
            </div>

            {services.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-500 rounded-2xl bg-[#E9EDF2] shadow-[inset_2px_2px_5px_rgba(163,177,198,0.35),inset_-2px_-2px_5px_rgba(255,255,255,0.75)]">
                No services found. Ensure your Supabase credentials are configured in Settings and tables are seeded.
              </div>
            ) : (
              services.map((svc) => (
                <div
                  key={svc.id}
                  className="p-5 rounded-2xl bg-[#E9EDF2] shadow-[6px_6px_14px_rgba(163,177,198,0.35),-6px_-6px_14px_rgba(255,255,255,0.85)] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      DIV {svc.number}
                    </span>
                    <button
                      onClick={() => handleDelete("services", svc.id)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase">Division Name</label>
                    <input
                      type="text"
                      defaultValue={svc.name}
                      onBlur={(e) => handleUpdate("services", svc.id, { name: e.target.value })}
                      className="w-full text-sm font-bold bg-transparent border-b border-gray-300 focus:border-blue-600 outline-none pb-1"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase">Tagline</label>
                    <input
                      type="text"
                      defaultValue={svc.tagline}
                      onBlur={(e) => handleUpdate("services", svc.id, { tagline: e.target.value })}
                      className="w-full text-xs text-gray-700 bg-transparent border-b border-gray-300 focus:border-blue-600 outline-none pb-1"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase">Description</label>
                    <textarea
                      defaultValue={svc.description}
                      rows={2}
                      onBlur={(e) => handleUpdate("services", svc.id, { description: e.target.value })}
                      className="w-full text-xs text-gray-600 bg-transparent border border-gray-200 rounded-lg p-2 focus:border-blue-600 outline-none"
                    />
                  </div>
                </div>
              ))
            )}
          </section>
        )}

        {/* TAB: SOLUTIONS */}
        {activeTab === "solutions" && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Industry Solutions ({solutions.length})</h2>
              <span className="text-xs font-mono text-gray-500">Live Database</span>
            </div>

            {solutions.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-500 rounded-2xl bg-[#E9EDF2] shadow-[inset_2px_2px_5px_rgba(163,177,198,0.35),inset_-2px_-2px_5px_rgba(255,255,255,0.75)]">
                No solutions found. Please configure Supabase and run seed.
              </div>
            ) : (
              solutions.map((sol) => (
                <div
                  key={sol.id}
                  className="p-5 rounded-2xl bg-[#E9EDF2] shadow-[6px_6px_14px_rgba(163,177,198,0.35),-6px_-6px_14px_rgba(255,255,255,0.85)] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {sol.slug}
                    </span>
                    <button
                      onClick={() => handleDelete("solutions", sol.id)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase">Industry Name</label>
                    <input
                      type="text"
                      defaultValue={sol.name}
                      onBlur={(e) => handleUpdate("solutions", sol.id, { name: e.target.value })}
                      className="w-full text-sm font-bold bg-transparent border-b border-gray-300 focus:border-blue-600 outline-none pb-1"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase">Headline</label>
                    <input
                      type="text"
                      defaultValue={sol.headline}
                      onBlur={(e) => handleUpdate("solutions", sol.id, { headline: e.target.value })}
                      className="w-full text-xs text-gray-700 bg-transparent border-b border-gray-300 focus:border-blue-600 outline-none pb-1"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase">Description</label>
                    <textarea
                      defaultValue={sol.description}
                      rows={2}
                      onBlur={(e) => handleUpdate("solutions", sol.id, { description: e.target.value })}
                      className="w-full text-xs text-gray-600 bg-transparent border border-gray-200 rounded-lg p-2 focus:border-blue-600 outline-none"
                    />
                  </div>
                </div>
              ))
            )}
          </section>
        )}

        {/* TAB: PROJECTS */}
        {activeTab === "projects" && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Portfolio Projects ({projects.length})</h2>
              <span className="text-xs font-mono text-gray-500">Live Database</span>
            </div>

            {projects.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-500 rounded-2xl bg-[#E9EDF2] shadow-[inset_2px_2px_5px_rgba(163,177,198,0.35),inset_-2px_-2px_5px_rgba(255,255,255,0.75)]">
                No projects found.
              </div>
            ) : (
              projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 rounded-2xl bg-[#E9EDF2] shadow-[6px_6px_14px_rgba(163,177,198,0.35),-6px_-6px_14px_rgba(255,255,255,0.85)] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                      {proj.status}
                    </span>
                    <button
                      onClick={() => handleDelete("projects", proj.id)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase">Project Name</label>
                    <input
                      type="text"
                      defaultValue={proj.name}
                      onBlur={(e) => handleUpdate("projects", proj.id, { name: e.target.value })}
                      className="w-full text-sm font-bold bg-transparent border-b border-gray-300 focus:border-blue-600 outline-none pb-1"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase">Short Description</label>
                    <input
                      type="text"
                      defaultValue={proj.description}
                      onBlur={(e) => handleUpdate("projects", proj.id, { description: e.target.value })}
                      className="w-full text-xs text-gray-700 bg-transparent border-b border-gray-300 focus:border-blue-600 outline-none pb-1"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase">Live URL (Optional)</label>
                    <input
                      type="text"
                      defaultValue={proj.liveUrl || ""}
                      placeholder="https://..."
                      onBlur={(e) => handleUpdate("projects", proj.id, { liveUrl: e.target.value || null })}
                      className="w-full text-xs text-gray-700 bg-transparent border-b border-gray-300 focus:border-blue-600 outline-none pb-1"
                    />
                  </div>
                </div>
              ))
            )}
          </section>
        )}

        {/* TAB: SETTINGS & DATABASE CREDENTIALS */}
        {activeTab === "settings" && (
          <section className="space-y-5">
            <div>
              <h2 className="text-lg font-bold">APK Database Connection</h2>
              <p className="text-xs text-gray-500 leading-relaxed mt-1">
                Configure your Supabase credentials here. These settings are persisted locally inside the APK so you can manage any environment directly.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="p-6 rounded-3xl bg-[#E9EDF2] shadow-[6px_6px_14px_rgba(163,177,198,0.35),-6px_-6px_14px_rgba(255,255,255,0.85)] space-y-4">
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

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 space-y-1">
              <p className="font-bold">Security Tip:</p>
              <p>
                Using your <strong>anon key</strong> allows updating tables protected with public policies. For unrestricted full management across all tables, you can provide your <strong>service_role secret</strong> here inside your private Android app.
              </p>
            </div>
          </section>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#E9EDF2]/95 backdrop-blur-md border-t border-black/5 px-2 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setActiveTab("services")}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === "services" ? "text-blue-600 font-bold" : "text-gray-500"
          }`}
        >
          <Layers className="h-5 w-5" />
          <span>Services</span>
        </button>

        <button
          onClick={() => setActiveTab("solutions")}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === "solutions" ? "text-blue-600 font-bold" : "text-gray-500"
          }`}
        >
          <Sparkles className="h-5 w-5" />
          <span>Solutions</span>
        </button>

        <button
          onClick={() => setActiveTab("projects")}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === "projects" ? "text-blue-600 font-bold" : "text-gray-500"
          }`}
        >
          <Briefcase className="h-5 w-5" />
          <span>Projects</span>
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-medium transition-all ${
            activeTab === "settings" ? "text-blue-600 font-bold" : "text-gray-500"
          }`}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
}

