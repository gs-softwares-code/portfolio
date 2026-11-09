"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  FastForward,
  Shield,
  Activity,
  Terminal,
  Zap,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { AgentNode, AgentNodeData } from "./AgentNode";
import { DataPulsePath } from "./DataPulsePath";
import { NeumorphicCard } from "@/components/ui/NeumorphicCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

// 5 Connected Agent Nodes Definition
const initialAgents: AgentNodeData[] = [
  {
    id: "orchestrator",
    name: "Nexus Core Orchestrator",
    shortName: "Nexus Core",
    role: "Central Orchestrator Hub",
    category: "orchestrator",
    status: "active",
    isOrchestrator: true,
    x: 50,
    y: 47,
    telemetry: {
      latency: "12ms",
      throughput: "1.4k ops/s",
      protocol: "Event-Driven RPC",
      activeTask: "Routing multi-agent consensus matrix",
      guardrail: "Active / Zero-Trust",
    },
  },
  {
    id: "ingestion",
    name: "Perception & Analysis Agent",
    shortName: "Analysis Agent",
    role: "Data Ingestion & Extraction",
    category: "ingestion",
    status: "active",
    x: 18,
    y: 22,
    telemetry: {
      latency: "14ms",
      throughput: "420 events/s",
      protocol: "Streaming gRPC",
      activeTask: "Normalizing incoming ledger payloads",
      guardrail: "Active / Schema Checked",
    },
  },
  {
    id: "reasoning",
    name: "Autonomous Reasoning Engine",
    shortName: "Reasoning Engine",
    role: "Decision & Policy Synthesis",
    category: "reasoning",
    status: "processing",
    x: 82,
    y: 22,
    telemetry: {
      latency: "18ms",
      throughput: "310 evals/s",
      protocol: "Context Memory Bus",
      activeTask: "Synthesizing deterministic execution plan",
      guardrail: "Active / Deterministic Bound",
    },
  },
  {
    id: "execution",
    name: "Action Dispatch & Execution Agent",
    shortName: "Execution Worker",
    role: "API Dispatch & Worker",
    category: "execution",
    status: "active",
    x: 80,
    y: 76,
    telemetry: {
      latency: "15ms",
      throughput: "890 ops/s",
      protocol: "Transactional Webhook",
      activeTask: "Committing verified state mutations",
      guardrail: "Active / Idempotent",
    },
  },
  {
    id: "sentinel",
    name: "Sovereign Guardrail Sentinel",
    shortName: "Verification Sentinel",
    role: "Telemetry & Zero-Trust Sentinel",
    category: "sentinel",
    status: "verified",
    x: 20,
    y: 76,
    telemetry: {
      latency: "8ms",
      throughput: "1.8k checks/s",
      protocol: "Cryptographic Audit",
      activeTask: "Continuous invariant compliance audit",
      guardrail: "Active / Zero-Trust",
    },
  },
];

const activityLogs = [
  "Nexus Core routed state transition to Execution Worker (14ms)",
  "Verification Sentinel verified zero-trust cryptographic invariant",
  "Analysis Agent normalized 124 batch events from intake queue",
  "Reasoning Engine evaluated policy branch: deterministic approval",
  "Execution Worker committed idempotent state to ledger",
  "Nexus Core synchronized memory context across 5 agent nodes",
];

export const HeroVisualization: React.FC = () => {
  const [nodes, setNodes] = useState<AgentNodeData[]>(initialAgents);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("orchestrator");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [currentLogIndex, setCurrentLogIndex] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Check prefers-reduced-motion media query on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Real-time telemetry ticker
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentLogIndex((prev) => (prev + 1) % activityLogs.length);

      // Micro-jitter telemetry latency for genuine real-time feel
      setNodes((prevNodes) =>
        prevNodes.map((n) => {
          const baseLat = n.category === "sentinel" ? 8 : n.category === "orchestrator" ? 12 : 15;
          const jitter = Math.floor(Math.random() * 5) - 2;
          const newLat = Math.max(6, baseLat + jitter);
          return {
            ...n,
            telemetry: {
              ...n.telemetry,
              latency: `${newLat}ms`,
            },
          };
        })
      );
    }, (2400 / speedMultiplier));

    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion, speedMultiplier]);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];
  const effectivelyPaused = isPaused || prefersReducedMotion;

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col space-y-4">
      {/* Visualizer Frame */}
      <NeumorphicCard
        variant="default"
        padding="none"
        className="relative overflow-hidden neu-rim shadow-neu-flat rounded-3xl bg-bg-base/90 p-4 sm:p-6"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-black/5 gap-2">
          <div className="flex items-center gap-2">
            <StatusBadge variant="success" size="sm" pulse={!effectivelyPaused}>
              SYSTEM TELEMETRY: ACTIVE
            </StatusBadge>
            <span className="hidden sm:inline-block font-mono text-[11px] text-text-secondary">
              5/5 Agents Online
            </span>
          </div>

          {/* Interactive Animation & Speed Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? "Resume simulation animation" : "Pause simulation animation"}
              className={cn(
                "p-1.5 rounded-lg neu-rim text-text-primary transition-all duration-200 active:shadow-neu-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent",
                isPaused ? "shadow-neu-pressed bg-black/[0.04]" : "shadow-neu-flat-sm hover:shadow-neu-flat"
              )}
              title={isPaused ? "Resume Stream" : "Pause Stream"}
            >
              {isPaused ? <Play className="h-3.5 w-3.5 text-brand-success" /> : <Pause className="h-3.5 w-3.5 text-brand-accent" />}
            </button>

            <button
              type="button"
              onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 2 : 1))}
              aria-label={`Toggle simulation speed: current ${speedMultiplier}x`}
              className={cn(
                "px-2 py-1 rounded-lg font-mono text-[11px] font-semibold neu-rim text-text-primary transition-all duration-200 active:shadow-neu-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent flex items-center gap-1",
                speedMultiplier === 2 ? "shadow-neu-pressed text-brand-accent bg-black/[0.04]" : "shadow-neu-flat-sm hover:shadow-neu-flat"
              )}
              title="Toggle Stream Speed (1x / 2x)"
            >
              <FastForward className="h-3 w-3" />
              <span>{speedMultiplier}x</span>
            </button>
          </div>
        </div>

        {/* Central Visualization Canvas */}
        <div className="relative w-full h-[280px] sm:h-[320px] my-2 select-none overflow-hidden rounded-2xl bg-gradient-to-b from-black/[0.01] to-black/[0.03]">
          {/* Subtle Grid Blueprint Background */}
          <div
            className="absolute inset-0 opacity-[0.25] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(100, 116, 139, 0.4) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* SVG Vector Connections & Data Pulse Paths */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* 1. Ingestion -> Orchestrator */}
            <DataPulsePath
              id="ingestion-orch"
              start={{ x: 18, y: 22 }}
              end={{ x: 50, y: 47 }}
              isPaused={effectivelyPaused}
              speedMultiplier={speedMultiplier}
              color="#06B6D4"
            />

            {/* 2. Orchestrator -> Reasoning */}
            <DataPulsePath
              id="orch-reasoning"
              start={{ x: 50, y: 47 }}
              end={{ x: 82, y: 22 }}
              isPaused={effectivelyPaused}
              speedMultiplier={speedMultiplier}
              color="#4A65DC"
            />

            {/* 3. Orchestrator -> Execution Worker */}
            <DataPulsePath
              id="orch-execution"
              start={{ x: 50, y: 47 }}
              end={{ x: 80, y: 76 }}
              isPaused={effectivelyPaused}
              speedMultiplier={speedMultiplier}
              color="#D97706"
            />

            {/* 4. Sentinel -> Orchestrator */}
            <DataPulsePath
              id="sentinel-orch"
              start={{ x: 20, y: 76 }}
              end={{ x: 50, y: 47 }}
              isPaused={effectivelyPaused}
              speedMultiplier={speedMultiplier}
              color="#36A783"
            />

            {/* 5. Ingestion <-> Sentinel Cross Guardrail */}
            <DataPulsePath
              id="ingestion-sentinel"
              start={{ x: 18, y: 22 }}
              end={{ x: 20, y: 76 }}
              controlPoint={{ x: 10, y: 49 }}
              isPaused={effectivelyPaused}
              speedMultiplier={speedMultiplier}
              color="#10B981"
            />

            {/* 6. Reasoning <-> Execution Cross Flow */}
            <DataPulsePath
              id="reasoning-execution"
              start={{ x: 82, y: 22 }}
              end={{ x: 80, y: 76 }}
              controlPoint={{ x: 90, y: 49 }}
              isPaused={effectivelyPaused}
              speedMultiplier={speedMultiplier}
              color="#6366F1"
            />
          </svg>

          {/* Connected Agent Nodes */}
          {nodes.map((node) => (
            <AgentNode
              key={node.id}
              node={node}
              isSelected={selectedNodeId === node.id}
              onClick={() => setSelectedNodeId(node.id)}
            />
          ))}
        </div>

        {/* Live Telemetry Inspector HUD */}
        <div className="pt-3 border-t border-black/5 space-y-3">
          {/* Node Selected Header & Metrics */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
              <p className="font-heading text-xs sm:text-sm font-semibold text-text-primary">
                {selectedNode.name}
              </p>
              <span className="font-mono text-[10px] text-brand-accent px-1.5 py-0.2 rounded neu-rim shadow-neu-flat-sm">
                {selectedNode.category.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="text-text-secondary">
                Latency: <strong className="text-text-primary">{selectedNode.telemetry.latency}</strong>
              </span>
              <span className="text-text-secondary">
                Throughput: <strong className="text-text-primary">{selectedNode.telemetry.throughput}</strong>
              </span>
            </div>
          </div>

          {/* Current Task & Guardrail State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="p-2 rounded-xl bg-bg-base neu-rim shadow-neu-pressed flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-brand-accent shrink-0" />
              <span className="text-text-secondary truncate">
                Task: <span className="text-text-primary font-medium">{selectedNode.telemetry.activeTask}</span>
              </span>
            </div>

            <div className="p-2 rounded-xl bg-bg-base neu-rim shadow-neu-pressed flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-brand-success shrink-0" />
              <span className="text-text-secondary truncate">
                Guardrail: <span className="text-text-primary font-medium">{selectedNode.telemetry.guardrail}</span>
              </span>
            </div>
          </div>

          {/* Real-time Event Stream / Log Ticker */}
          <div className="p-2.5 rounded-xl bg-bg-dark text-darkText-primary neu-rim-dark shadow-neu-dark-pressed flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <Terminal className="h-3.5 w-3.5 text-brand-accentLight shrink-0" />
              <p className="font-mono text-[11px] text-darkText-secondary truncate">
                <span className="text-brand-accentLight mr-1.5">&gt;</span>
                {activityLogs[currentLogIndex]}
              </p>
            </div>
            <span className="shrink-0 font-mono text-[10px] text-brand-success flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              VERIFIED
            </span>
          </div>
        </div>
      </NeumorphicCard>
    </div>
  );
};
