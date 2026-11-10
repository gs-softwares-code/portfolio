"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { NeumorphicButton } from "@/components/ui/NeumorphicButton";
import { NeumorphicCard } from "@/components/ui/NeumorphicCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { HeroVisualization } from "@/components/ai-visualization/HeroVisualization";

export const SectionHero: React.FC = () => {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28 overflow-hidden"
    >
      {/* Subtle Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-2xl h-72 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Asymmetrical Editorial Grid (55% / 45% on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Positioning, Narrative & Direct Action (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* System Status Pill */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <StatusBadge variant="success" pulse size="md">
                LIVE TELEMETRY: AUTONOMOUS SYSTEMS ACTIVE
              </StatusBadge>
              <span className="hidden sm:inline-flex items-center gap-1 font-mono text-xs text-text-secondary neu-rim shadow-neu-flat-sm px-2.5 py-1 rounded-full bg-bg-base">
                <CheckCircle2 className="h-3 w-3 text-brand-success" />
                Zero-Trust Deterministic Core
              </span>
            </div>

            {/* Display Headline */}
            <h1
              id="hero-heading"
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-[1.08]"
            >
              Your Business Deserves Better{" "}
              <span className="block text-brand-accent mt-1.5 sm:mt-2">
                Digital Infrastructure.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="font-body text-base sm:text-lg lg:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto lg:mx-0">
              From high-converting websites and custom applications to intelligent
              automation and AI-powered business systems, we engineer technology that
              helps businesses operate smarter and grow faster.
            </p>

            {/* Action Button Group */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/solutions">
                <NeumorphicButton
                  variant="accent"
                  size="lg"
                  className="font-medium shadow-neu-accent"
                >
                  Explore Our Solutions
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </NeumorphicButton>
              </Link>

              <Link href="/contact">
                <NeumorphicButton
                  variant="default"
                  size="lg"
                  className="font-medium"
                >
                  Discuss Your Project
                </NeumorphicButton>
              </Link>
            </div>

            {/* Trust Statement */}
            <div className="pt-2">
              <p className="font-body text-xs sm:text-sm text-text-muted flex items-center justify-center lg:justify-start gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-accent shrink-0" />
                <span>
                  Backed by production systems deployed in commerce, fitness,
                  logistics, and education.
                </span>
              </p>
            </div>

            {/* Technical SLA Indicators (exercising NeumorphicCard & Typography) */}
            <div className="pt-4 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto lg:mx-0">
              <NeumorphicCard variant="inset" padding="sm" className="text-center rounded-xl">
                <p className="font-mono text-xl sm:text-2xl font-bold text-text-primary">
                  99.9%
                </p>
                <p className="font-mono text-[10px] sm:text-[11px] text-text-secondary uppercase tracking-wider mt-0.5">
                  Accuracy SLA
                </p>
              </NeumorphicCard>

              <NeumorphicCard variant="inset" padding="sm" className="text-center rounded-xl">
                <p className="font-mono text-xl sm:text-2xl font-bold text-brand-accent">
                  &lt; 15ms
                </p>
                <p className="font-mono text-[10px] sm:text-[11px] text-text-secondary uppercase tracking-wider mt-0.5">
                  Latency Budget
                </p>
              </NeumorphicCard>

              <NeumorphicCard variant="inset" padding="sm" className="text-center rounded-xl">
                <p className="font-mono text-xl sm:text-2xl font-bold text-brand-success">
                  10+
                </p>
                <p className="font-mono text-[10px] sm:text-[11px] text-text-secondary uppercase tracking-wider mt-0.5">
                  Production Systems
                </p>
              </NeumorphicCard>
            </div>

            {/* Brand Statement */}
            <p className="font-mono text-xs sm:text-sm text-text-muted text-center lg:text-left pt-1">
              <span className="text-brand-accent font-semibold">We Engineer Intelligence.</span>{" "}
              You Build the Future.
            </p>
          </div>

          {/* Right Column: Interactive AI Systems Visualizer (lg:col-span-5) */}
          <div className="lg:col-span-5 w-full">
            <HeroVisualization />
          </div>
        </div>
      </div>
    </section>
  );
};
