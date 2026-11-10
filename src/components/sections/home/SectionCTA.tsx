"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare, Terminal } from "lucide-react";

export const SectionCTA: React.FC = () => {
  return (
    <section id="cta" className="py-24 md:py-32 bg-bg-dark relative overflow-hidden text-center">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(74,101,220,0.15)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 bg-brand-accent/15 border border-brand-accent/25 rounded-full px-4 py-1.5 mb-8">
          <div className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-pulse" />
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Ready to Build?
          </span>
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Let&apos;s Engineer What&apos;s Next for Your Business.
        </h2>

        <p className="font-body text-darkText-secondary text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          From your first high-converting digital storefront to custom operations software and AI workflow automation — we architect the right systems for where you are and where you&apos;re going.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white font-medium text-sm transition-all shadow-neu-accent"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Start a Project</span>
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-bg-dark shadow-neu-dark-flat hover:shadow-neu-dark-pressed text-white border border-white/5 font-medium text-sm transition-all"
          >
            <span>Book a Consultation</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="mt-10 font-mono text-xs text-darkText-muted flex items-center justify-center gap-1.5">
          <Terminal className="h-3.5 w-3.5 text-brand-accent" />
          Zero sales pressure. Direct architectural discussion.
        </p>
      </div>
    </section>
  );
};

