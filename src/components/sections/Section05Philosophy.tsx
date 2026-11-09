"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const principles = [
  {
    id: "business-first",
    num: "01",
    title: "Business-First Engineering",
    description:
      "Technology decisions start with business outcomes, not engineering preferences. Every architectural choice is weighed against the real-world operations it needs to support.",
    x: 40,
    y: 40,
  },
  {
    id: "purpose-built",
    num: "02",
    title: "Purpose-Built Systems",
    description:
      "Generic templates produce generic results. Every system we build is designed from requirements — crafted for the specific workflows, users, and constraints of your business.",
    x: 380,
    y: 40,
  },
  {
    id: "intelligent-design",
    num: "03",
    title: "Intelligent by Design",
    description:
      "Intelligence isn't bolted on after the fact. AI capabilities, automation layers, and decision logic are embedded into the system architecture from day one.",
    x: 40,
    y: 240,
  },
  {
    id: "built-to-scale",
    num: "04",
    title: "Built to Scale",
    description:
      "Systems engineered for today's load and tomorrow's growth. Cloud-native infrastructure, modular codebases, and expandable architectures that evolve with your business.",
    x: 380,
    y: 240,
  },
];

// SVG diagram connecting the 4 principles
function PhilosophyDiagram({ revealed }: { revealed: boolean }) {
  // Center is (300, 180)
  // Card 01: (40, 40) w:180, h:80 -> center (130, 80), right edge (220, 80), bottom edge (130, 120)
  // Card 02: (380, 40) w:180, h:80 -> center (470, 80), left edge (380, 80), bottom edge (470, 120)
  // Card 03: (40, 240) w:180, h:80 -> center (130, 280), right edge (220, 280), top edge (130, 240)
  // Card 04: (380, 240) w:180, h:80 -> center (470, 280), left edge (380, 280), top edge (470, 240)

  return (
    <div className="relative w-full" aria-hidden="true">
      <svg
        viewBox="0 0 600 360"
        className="w-full h-auto max-h-[380px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="neu-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="3" stdDeviation="6" floodColor="#A3B1C6" floodOpacity="0.4" />
            <feDropShadow dx="-3" dy="-3" stdDeviation="6" floodColor="#FFFFFF" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* Connection lines */}
        <g
          className={cn(
            "transition-opacity duration-1000 motion-reduce:transition-none",
            revealed ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: "400ms" }}
        >
          {/* Horizontal top line between card 1 and 2 */}
          <line
            x1="220"
            y1="80"
            x2="380"
            y2="80"
            stroke="#4A65DC"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            strokeOpacity="0.35"
          />
          {/* Horizontal bottom line between card 3 and 4 */}
          <line
            x1="220"
            y1="280"
            x2="380"
            y2="280"
            stroke="#4A65DC"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            strokeOpacity="0.35"
          />
          {/* Vertical left line between card 1 and 3 */}
          <line
            x1="130"
            y1="120"
            x2="130"
            y2="240"
            stroke="#4A65DC"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            strokeOpacity="0.35"
          />
          {/* Vertical right line between card 2 and 4 */}
          <line
            x1="470"
            y1="120"
            x2="470"
            y2="240"
            stroke="#4A65DC"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            strokeOpacity="0.35"
          />
          {/* Diagonals to center hub */}
          <line
            x1="200"
            y1="110"
            x2="260"
            y2="150"
            stroke="#4A65DC"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            strokeOpacity="0.25"
          />
          <line
            x1="400"
            y1="110"
            x2="340"
            y2="150"
            stroke="#4A65DC"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            strokeOpacity="0.25"
          />
          <line
            x1="200"
            y1="250"
            x2="260"
            y2="210"
            stroke="#4A65DC"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            strokeOpacity="0.25"
          />
          <line
            x1="400"
            y1="250"
            x2="340"
            y2="210"
            stroke="#4A65DC"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            strokeOpacity="0.25"
          />
        </g>

        {/* Center hub - Circular GS Software mark */}
        <g
          className={cn(
            "transition-all duration-700 motion-reduce:transition-none",
            revealed ? "opacity-100 scale-100" : "opacity-0 scale-90"
          )}
          style={{ transformOrigin: "300px 180px", transitionDelay: "600ms" }}
        >
          {/* Outer glow ring */}
          <circle
            cx="300"
            cy="180"
            r="44"
            fill="#E9EDF2"
            stroke="#4A65DC"
            strokeWidth="1.5"
            strokeOpacity="0.3"
            filter="url(#neu-glow)"
          />
          <circle cx="300" cy="180" r="38" fill="#E9EDF2" />
          {/* Icon image */}
          <image
            href="/icon-192.png"
            x="264"
            y="144"
            width="72"
            height="72"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>

        {/* Principle nodes */}
        {principles.map((p, i) => (
          <g
            key={p.id}
            className={cn(
              "transition-all duration-700 motion-reduce:transition-none",
              revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: revealed ? `${i * 120}ms` : "0ms" }}
          >
            {/* Card Background with Neumorphic Drop Shadow */}
            <rect
              x={p.x}
              y={p.y}
              width="180"
              height="80"
              rx="18"
              fill="#E9EDF2"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="1"
              filter="url(#neu-glow)"
            />
            {/* Step Number Tag */}
            <text
              x={p.x + 18}
              y={p.y + 28}
              fontFamily="var(--font-ibm-plex-mono), monospace"
              fontSize="11"
              fill="#4A65DC"
              fontWeight="700"
              letterSpacing="0.05em"
            >
              {p.num}
            </text>
            {/* Principle Title - Full text with clean typography */}
            <text
              x={p.x + 18}
              y={p.y + 52}
              fontFamily="var(--font-space-grotesk), sans-serif"
              fontSize="12.5"
              fill="#151A23"
              fontWeight="700"
            >
              {p.title}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function Section05Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="py-24 md:py-32 bg-bg-base overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={cn(
            "transition-all duration-700 motion-reduce:transition-none mb-16",
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent mb-4">
            Our Philosophy
          </p>
          <h2
            id="philosophy-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary max-w-3xl leading-tight"
          >
            Not Another Template.{" "}
            <span className="text-text-secondary font-normal">
              Not Another Generic Solution.
            </span>
          </h2>
        </div>

        {/* Asymmetric layout: diagram left, principles right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: SVG system diagram */}
          <div
            className={cn(
              "rounded-3xl bg-bg-base shadow-neu-flat p-8 transition-all duration-700 motion-reduce:transition-none",
              revealed ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            )}
            style={{ transitionDelay: revealed ? "150ms" : "0ms" }}
          >
            <div className="mb-4 flex items-center gap-2">
              <div className="h-1.5 w-6 rounded-full bg-brand-accent" />
              <span className="font-mono text-xs text-text-secondary uppercase tracking-widest">
                Core System Principles
              </span>
            </div>
            <PhilosophyDiagram revealed={revealed} />
          </div>

          {/* Right: Detailed principle breakdowns */}
          <div className="space-y-5">
            {principles.map((p, i) => (
              <div
                key={p.id}
                className={cn(
                  "flex gap-5 rounded-2xl bg-bg-base shadow-neu-flat p-5 md:p-6 transition-all duration-700 motion-reduce:transition-none",
                  revealed
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                )}
                style={{ transitionDelay: revealed ? `${i * 100 + 200}ms` : "0ms" }}
              >
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center">
                    <span className="font-mono text-xs font-bold text-brand-accent">
                      {p.num}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-text-primary mb-1.5">
                    {p.title}
                  </h3>
                  <p className="font-body text-sm text-text-secondary leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
