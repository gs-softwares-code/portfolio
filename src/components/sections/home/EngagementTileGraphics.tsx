"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Animated micro-interactions corresponding to the 4 Agency Engagement Pillars:
 * 1. Modular Services: Dynamic block matrix / pickable micro-services with glowing selector pulse
 * 2. Integrated Solutions: Connected ecosystem data flow with pulsing bezier paths and node sync
 * 3. Custom Software: Logic gate / compiler stream with sleek scanning laser and execution status
 * 4. Ongoing Support: 24/7 telemetry monitor with live heartbeat pulse wave & uptime indicator
 */

// 1. Modular Services Animation
export const ModularServicesGraphic: React.FC = () => {
  return (
    <div className="relative w-full h-24 mb-5 rounded-2xl bg-bg-dark/80 border border-white/5 overflow-hidden flex items-center justify-center p-3">
      {/* Background ambient grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#4A65DC_1px,transparent_1px)] [background-size:12px_12px] opacity-20" />
      
      {/* Floating modular blocks */}
      <div className="relative z-10 grid grid-cols-3 gap-2 w-full max-w-[200px]">
        {[
          { label: "WEB", delay: 0 },
          { label: "APP", delay: 0.4 },
          { label: "AI", delay: 0.8 },
          { label: "API", delay: 1.2 },
          { label: "BI", delay: 0.2 },
          { label: "OPS", delay: 0.6 },
        ].map((block, idx) => (
          <motion.div
            key={idx}
            animate={{
              scale: [1, 1.04, 1],
              borderColor: [
                "rgba(255,255,255,0.08)",
                idx % 2 === 0 ? "rgba(74,101,220,0.7)" : "rgba(54,167,131,0.7)",
                "rgba(255,255,255,0.08)",
              ],
              backgroundColor: [
                "rgba(23,28,41,0.7)",
                idx % 2 === 0 ? "rgba(74,101,220,0.18)" : "rgba(54,167,131,0.18)",
                "rgba(23,28,41,0.7)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: block.delay,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg border text-center shadow-sm backdrop-blur-xs"
          >
            <span className="font-mono text-[9px] font-bold text-white/90 tracking-wider">
              {block.label}
            </span>
            <div className="w-1.5 h-1.5 rounded-full mt-1 bg-brand-accent/60" />
          </motion.div>
        ))}
      </div>

      {/* Scanning laser beam indicator */}
      <motion.div
        animate={{
          x: ["-100%", "200%"],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent pointer-events-none"
      />
    </div>
  );
};

// 2. Integrated Solutions Animation (Ecosystem Network)
export const IntegratedSolutionsGraphic: React.FC = () => {
  return (
    <div className="relative w-full h-24 mb-5 rounded-2xl bg-bg-dark/80 border border-brand-accent/20 overflow-hidden flex items-center justify-center p-2">
      {/* Radial soft glow */}
      <div className="absolute inset-0 bg-brand-accent/10 rounded-full blur-xl pointer-events-none" />

      <svg className="w-full h-full" viewBox="0 0 240 80" fill="none">
        {/* Connecting Paths */}
        <motion.path
          d="M 40 40 C 80 15, 120 15, 120 40 C 120 65, 160 65, 200 40"
          stroke="rgba(74,101,220,0.3)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <motion.path
          d="M 40 40 C 80 65, 120 65, 120 40 C 120 15, 160 15, 200 40"
          stroke="rgba(54,167,131,0.3)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        {/* Dynamic Data Packets Traveling */}
        <motion.circle
          r="3.5"
          fill="#4A65DC"
          animate={{
            cx: [40, 80, 120, 160, 200],
            cy: [40, 25, 40, 55, 40],
            opacity: [0.2, 1, 0.8, 1, 0.2],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.circle
          r="3"
          fill="#36A783"
          animate={{
            cx: [200, 160, 120, 80, 40],
            cy: [40, 25, 40, 55, 40],
            opacity: [0.2, 1, 0.8, 1, 0.2],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            delay: 1.4,
            ease: "easeInOut",
          }}
        />

        {/* Central Hub Node */}
        <g transform="translate(120, 40)">
          <circle r="14" fill="#171C29" stroke="#4A65DC" strokeWidth="2" />
          <motion.circle
            r="18"
            fill="none"
            stroke="#4A65DC"
            strokeWidth="1"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          <text
            x="0"
            y="3"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="7"
            fontFamily="monospace"
            fontWeight="bold"
          >
            HUB
          </text>
        </g>

        {/* Left Node (Web / Front) */}
        <g transform="translate(40, 40)">
          <circle r="10" fill="#171C29" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <text
            x="0"
            y="3"
            textAnchor="middle"
            fill="#94A3B8"
            fontSize="6"
            fontFamily="monospace"
          >
            UI
          </text>
        </g>

        {/* Right Node (Data / Automation) */}
        <g transform="translate(200, 40)">
          <circle r="10" fill="#171C29" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <text
            x="0"
            y="3"
            textAnchor="middle"
            fill="#94A3B8"
            fontSize="6"
            fontFamily="monospace"
          >
            DB
          </text>
        </g>
      </svg>
    </div>
  );
};

// 3. Custom Software Animation (Execution & Logic Gates)
export const CustomSoftwareGraphic: React.FC = () => {
  return (
    <div className="relative w-full h-24 mb-5 rounded-2xl bg-bg-dark/80 border border-white/5 overflow-hidden flex flex-col justify-between p-3 font-mono">
      {/* Ambient background glow */}
      <div className="absolute right-0 top-0 w-24 h-24 bg-brand-accent/10 rounded-full blur-xl pointer-events-none" />

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between text-[10px] text-darkText-muted border-b border-white/5 pb-1 relative z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/70" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/70" />
        </div>
        <span className="text-[9px] text-brand-accent font-semibold">core.engine.ts</span>
      </div>

      {/* Code Stream Simulation */}
      <div className="text-[10px] space-y-1 my-auto relative z-10 text-left">
        <div className="flex items-center gap-1 text-darkText-secondary">
          <span className="text-brand-accent font-bold">&gt;</span>
          <span className="text-white/80">exec:</span>
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="text-emerald-400 font-semibold"
          >
            build_proprietary()
          </motion.span>
        </div>
        <div className="flex items-center justify-between text-[9px] text-darkText-muted">
          <span>state: synchronized</span>
          <span className="text-brand-accent">0.04ms</span>
        </div>
      </div>

      {/* Logic sweep line */}
      <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden relative">
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-1/2 h-full bg-gradient-to-r from-transparent via-brand-accent to-emerald-400 rounded-full"
        />
      </div>
    </div>
  );
};

// 4. Ongoing Support Animation (Live Telemetry & Radar Heartbeat)
export const OngoingSupportGraphic: React.FC = () => {
  return (
    <div className="relative w-full h-24 mb-5 rounded-2xl bg-bg-dark/80 border border-white/5 overflow-hidden flex flex-col justify-between p-3 font-mono">
      {/* Header telemetry badge */}
      <div className="flex items-center justify-between text-[10px] relative z-10">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-emerald-400 text-[10px] font-bold">LIVE TELEMETRY</span>
        </div>
        <span className="text-white/80 text-[10px] font-bold">99.99% UP</span>
      </div>

      {/* SVG Heartbeat Wave */}
      <div className="relative w-full h-10 flex items-center justify-center overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 200 40" fill="none">
          <motion.path
            d="M 0 20 L 40 20 L 50 8 L 60 32 L 70 12 L 80 26 L 90 20 L 140 20 L 150 10 L 160 30 L 170 20 L 200 20"
            stroke="rgba(54,167,131,0.8)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0.2, pathOffset: 0 }}
            animate={{
              pathOffset: [0, 1],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>
      </div>

      {/* Bottom status metrics */}
      <div className="flex items-center justify-between text-[9px] text-darkText-muted border-t border-white/5 pt-1 relative z-10">
        <span>SLA: 24/7 Monitoring</span>
        <span className="text-emerald-400 font-semibold">Active</span>
      </div>
    </div>
  );
};
