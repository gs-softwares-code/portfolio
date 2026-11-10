"use client";

import React from "react";
import { Search, Compass, Cpu, Code2, Rocket } from "lucide-react";

const stages = [
  {
    step: "01",
    title: "Discover",
    tagline: "Understand the Business & Objectives",
    description: "We audit existing workflows, evaluate operational bottlenecks, and identify exact integration requirements before proposing software.",
    icon: <Search className="h-5 w-5 text-brand-accent" />,
  },
  {
    step: "02",
    title: "Strategize",
    tagline: "Identify the Optimal Technical Solution",
    description: "We evaluate architecture trade-offs, choose the right platforms (web, PWA, native, AI layer), and outline realistic, transparent delivery phases.",
    icon: <Compass className="h-5 w-5 text-brand-success" />,
  },
  {
    step: "03",
    title: "Architect",
    tagline: "Establish the System Architecture",
    description: "We define schema boundaries, security standards, database relationships, API contracts, and user access models with zero guesswork.",
    icon: <Cpu className="h-5 w-5 text-[#7C5CFC]" />,
  },
  {
    step: "04",
    title: "Engineer",
    tagline: "Develop & Integrate the Solution",
    description: "We build using type-safe Next.js, resilient databases, automated workflows, and robust state machines with rigorous testing throughout.",
    icon: <Code2 className="h-5 w-5 text-[#F59E0B]" />,
  },
  {
    step: "05",
    title: "Deploy & Evolve",
    tagline: "Launch, Monitor & Optimize",
    description: "We deploy to high-availability edge networks, verify telemetry and analytics, and provide continuous technical support as your business scales.",
    icon: <Rocket className="h-5 w-5 text-[#10B981]" />,
  },
];

export const SectionProcess: React.FC = () => {
  return (
    <section id="process" className="py-20 md:py-28 bg-bg-base relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full shadow-neu-pressed-sm bg-bg-base text-brand-accent font-mono text-xs font-semibold uppercase tracking-widest mb-4">
            <span>Engineering Process</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Five Stages. Zero Surprises.
          </h2>
          <p className="font-body text-base sm:text-lg text-text-secondary leading-relaxed">
            Our engineering methodology prioritizes architectural clarity and direct collaboration, ensuring delivered systems perform under real production loads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {stages.map((stage) => (
            <div
              key={stage.step}
              className="rounded-3xl bg-bg-base shadow-neu-flat p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 relative"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xl font-bold text-brand-accent">
                    {stage.step}
                  </span>
                  <div className="p-2.5 rounded-xl shadow-neu-flat-sm bg-bg-base">
                    {stage.icon}
                  </div>
                </div>
                <h3 className="font-heading text-xl font-bold text-text-primary mb-1">
                  {stage.title}
                </h3>
                <p className="font-body text-xs font-semibold text-brand-accent mb-3">
                  {stage.tagline}
                </p>
                <p className="font-body text-xs text-text-secondary leading-relaxed">
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

