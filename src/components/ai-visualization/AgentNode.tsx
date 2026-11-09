"use client";

import React from "react";
import {
  Cpu,
  Database,
  Brain,
  Zap,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface AgentTelemetry {
  latency: string;
  throughput: string;
  protocol: string;
  activeTask: string;
  guardrail: string;
}

export interface AgentNodeData {
  id: string;
  name: string;
  shortName: string;
  role: string;
  category: "orchestrator" | "ingestion" | "reasoning" | "execution" | "sentinel";
  status: "active" | "processing" | "verified" | "standby";
  x: number; // Percentage 0 - 100
  y: number; // Percentage 0 - 100
  isOrchestrator?: boolean;
  telemetry: AgentTelemetry;
}

export interface AgentNodeProps {
  node: AgentNodeData;
  isSelected: boolean;
  isHovered?: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const AgentNode: React.FC<AgentNodeProps> = ({
  node,
  isSelected,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const getIcon = () => {
    switch (node.category) {
      case "orchestrator":
        return <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-brand-accent animate-pulse" />;
      case "ingestion":
        return <Database className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-600" />;
      case "reasoning":
        return <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />;
      case "execution":
        return <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />;
      case "sentinel":
        return <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-brand-success" />;
      default:
        return <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-brand-accent" />;
    }
  };

  const isOrch = node.isOrchestrator || node.category === "orchestrator";

  const getLabelAlignment = () => {
    if (node.x < 35) {
      return "left-0 text-left";
    }
    if (node.x > 65) {
      return "right-0 text-right";
    }
    return "left-1/2 -translate-x-1/2 text-center";
  };

  return (
    <div
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      className="absolute z-20"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        aria-label={`${node.name} (${node.role}) - Status: ${node.status}`}
        className={cn(
          "group relative flex items-center justify-center cursor-pointer select-none outline-none transition-all duration-300",
          "focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg-base rounded-2xl"
        )}
      >
        {/* Node Circle */}
        <div
          className={cn(
            "relative flex items-center justify-center rounded-2xl transition-all duration-300",
            isOrch
              ? "h-16 w-16 sm:h-20 sm:w-20 bg-bg-base neu-rim shadow-neu-flat"
              : "h-12 w-12 sm:h-14 sm:w-14 bg-bg-base neu-rim shadow-neu-flat hover:-translate-y-0.5",
            isSelected && (isOrch ? "ring-2 ring-brand-accent shadow-neu-accent scale-105" : "ring-2 ring-brand-accent shadow-neu-accent scale-110"),
            !isSelected && "hover:shadow-neu-flat-lg hover:scale-105 active:shadow-neu-pressed active:scale-95"
          )}
        >
          {/* Active Pulse Ring */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span
              className={cn(
                "absolute inline-flex h-full w-full rounded-full opacity-75 motion-safe:animate-ping",
                node.status === "active" && "bg-brand-success",
                node.status === "processing" && "bg-brand-accent",
                node.status === "verified" && "bg-emerald-500",
                node.status === "standby" && "bg-slate-400"
              )}
            />
            <span
              className={cn(
                "relative inline-flex h-3 w-3 rounded-full border-2 border-bg-base",
                node.status === "active" && "bg-brand-success",
                node.status === "processing" && "bg-brand-accent",
                node.status === "verified" && "bg-emerald-500",
                node.status === "standby" && "bg-slate-400"
              )}
            />
          </span>

          {/* Central Icon */}
          {getIcon()}
        </div>

        {/* Node Label Capsule */}
        <div
          className={cn(
            "absolute top-full mt-1.5 px-2 py-0.5 rounded-md neu-rim shadow-neu-flat-sm bg-bg-base transition-all duration-200 pointer-events-none whitespace-nowrap z-30",
            getLabelAlignment(),
            isSelected ? "shadow-neu-pressed border-brand-accent/40" : "bg-bg-base/90"
          )}
        >
          <p className="font-heading text-[11px] sm:text-xs font-semibold text-text-primary whitespace-nowrap leading-tight">
            {node.shortName}
          </p>
          <p className="font-mono text-[9px] sm:text-[10px] text-text-secondary whitespace-nowrap leading-tight hidden sm:block">
            {node.role}
          </p>
        </div>
      </div>
    </div>
  );
};
