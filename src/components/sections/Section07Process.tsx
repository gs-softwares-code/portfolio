"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const stages = [
  {
    num: "01",
    label: "DISCOVER",
    title: "Discover: Understand Your Business",
    description:
      "Deep dive into your operations, workflows, pain points, and goals. We map your business reality before writing a single line of code.",
    details: ["Requirements analysis", "Stakeholder interviews", "Workflow mapping", "Technical assessment"],
  },
  {
    num: "02",
    label: "ARCHITECT",
    title: "Architect: Design the Solution",
    description:
      "Technical architecture, database design, integration strategy, and solution roadmap. Every decision documented and reasoned.",
    details: ["System architecture", "Database design", "API planning", "Technology selection"],
  },
  {
    num: "03",
    label: "ENGINEER",
    title: "Engineer: Build with Precision",
    description:
      "Iterative development with continuous feedback. Full-stack engineering, integrations, and AI capability implementation.",
    details: ["Full-stack development", "AI/automation integration", "Testing & QA", "Performance optimization"],
  },
  {
    num: "04",
    label: "DEPLOY",
    title: "Deploy: Launch with Confidence",
    description:
      "Production deployment, operational readiness checks, team onboarding, and go-live support until everything runs smoothly.",
    details: ["Production deployment", "Team training", "Go-live support", "Performance monitoring"],
  },
  {
    num: "05",
    label: "EVOLVE",
    title: "Evolve: Grow Without Limits",
    description:
      "Ongoing maintenance, feature expansion, optimization, and scaling as your business grows. Your technology partner, not just a vendor.",
    details: ["Ongoing maintenance", "Feature expansion", "Performance tuning", "Scale planning"],
  },
];

export function Section07Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [activeStage, setActiveStage] = useState(0);

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

  // Auto-advance active stage
  useEffect(() => {
    if (!revealed) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const timer = setInterval(() => {
      setActiveStage((s) => (s + 1) % stages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [revealed]);

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-heading"
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
            How We Work
          </p>
          <h2
            id="process-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary max-w-3xl leading-tight"
          >
            From Business Challenge to{" "}
            <span className="text-text-secondary font-normal">
              Intelligent Solution.
            </span>
          </h2>
        </div>

        {/* Desktop timeline */}
        <div className="hidden md:block">
          {/* Stage selector row */}
          <div
            className={cn(
              "relative flex items-start gap-0 mb-10 transition-all duration-700 motion-reduce:transition-none",
              revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: revealed ? "150ms" : "0ms" }}
          >
            {stages.map((stage, idx) => (
              <button
                key={stage.num}
                onClick={() => setActiveStage(idx)}
                className={cn(
                  "flex-1 relative text-left px-4 pt-4 pb-6 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-t-2xl",
                  "group"
                )}
                aria-pressed={activeStage === idx}
              >
                {/* Progress line */}
                <div
                  className={cn(
                    "absolute bottom-0 left-0 h-1 rounded-full transition-all duration-500 motion-reduce:transition-none",
                    activeStage === idx
                      ? "w-full bg-brand-accent"
                      : activeStage > idx
                      ? "w-full bg-brand-accent/30"
                      : "w-0 bg-transparent"
                  )}
                />

                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={cn(
                      "h-7 w-7 rounded-full flex items-center justify-center transition-all duration-300",
                      activeStage === idx
                        ? "bg-brand-accent text-white shadow-neu-accent"
                        : activeStage > idx
                        ? "bg-brand-accent/20 text-brand-accent"
                        : "bg-bg-base shadow-neu-flat-sm text-text-muted"
                    )}
                  >
                    <span className="font-mono text-[9px] font-bold">{stage.num}</span>
                  </div>
                  <span
                    className={cn(
                      "font-mono text-[10px] font-bold uppercase tracking-widest transition-colors",
                      activeStage === idx ? "text-brand-accent" : "text-text-muted"
                    )}
                  >
                    {stage.label}
                  </span>
                </div>
                <p
                  className={cn(
                    "font-heading text-sm font-semibold transition-colors leading-tight",
                    activeStage === idx ? "text-text-primary" : "text-text-secondary"
                  )}
                >
                  {stage.title}
                </p>
              </button>
            ))}
          </div>

          {/* Active stage detail */}
          <div
            className={cn(
              "rounded-3xl bg-bg-base shadow-neu-flat p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 motion-reduce:transition-none",
              revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: revealed ? "300ms" : "0ms" }}
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-xl bg-brand-accent flex items-center justify-center shadow-neu-accent">
                  <span className="font-mono text-xs font-bold text-white">
                    {stages[activeStage].num}
                  </span>
                </div>
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                    {stages[activeStage].label}
                  </p>
                  <h3 className="font-heading text-xl font-bold text-text-primary leading-tight">
                    {stages[activeStage].title}
                  </h3>
                </div>
              </div>
              <p className="font-body text-text-secondary text-sm md:text-base leading-relaxed">
                {stages[activeStage].description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {stages[activeStage].details.map((detail) => (
                <div
                  key={detail}
                  className="rounded-xl bg-bg-base shadow-neu-pressed border border-white/50 p-3 flex items-center gap-2"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                  <span className="font-body text-xs text-text-primary font-medium">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="md:hidden space-y-0">
          {stages.map((stage, idx) => (
            <div
              key={stage.num}
              className={cn(
                "relative flex gap-4 transition-all duration-700 motion-reduce:transition-none",
                revealed ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              )}
              style={{ transitionDelay: revealed ? `${idx * 100}ms` : "0ms" }}
            >
              {/* Left rail */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="h-9 w-9 rounded-full bg-bg-base shadow-neu-flat border border-brand-accent/20 flex items-center justify-center">
                  <span className="font-mono text-[10px] font-bold text-brand-accent">{stage.num}</span>
                </div>
                {idx < stages.length - 1 && (
                  <div className="w-px flex-1 bg-gradient-to-b from-brand-accent/30 to-transparent my-2 min-h-[32px]" />
                )}
              </div>

              {/* Content */}
              <div className={cn("pb-8", idx === stages.length - 1 && "pb-0")}>
                <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-brand-accent mb-1">
                  {stage.label}
                </p>
                <h3 className="font-heading text-base font-bold text-text-primary mb-1.5">
                  {stage.title}
                </h3>
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
}
