"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { engagementModels } from "@/data/engagementData";

export const SectionEngagement: React.FC = () => {
  return (
    <section id="engagement" className="py-20 md:py-28 bg-bg-dark text-white relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full shadow-neu-dark-pressed bg-bg-dark text-brand-accent font-mono text-xs font-semibold uppercase tracking-widest mb-4">
            <span>How We Work Together</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Four Flexible Engagement Models.
          </h2>
          <p className="font-body text-base sm:text-lg text-darkText-secondary leading-relaxed">
            We don&apos;t force clients into rigid, bloated packages. Choose the exact model that aligns with your operational stage and timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {engagementModels.map((model) => {
            const isFeatured = model.featured;

            return (
              <div
                key={model.id}
                className={`rounded-3xl bg-bg-dark p-6 flex flex-col justify-between transition-all duration-300 relative border ${
                  isFeatured
                    ? "border-brand-accent shadow-neu-accent"
                    : "border-white/5 shadow-neu-dark-flat"
                }`}
              >
                {isFeatured && (
                  <span className="absolute -top-3 right-6 bg-brand-accent text-white font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="font-heading text-xl font-bold text-white mb-1">
                    {model.title}
                  </h3>
                  <p className="font-body text-xs text-brand-accent font-semibold mb-4">
                    {model.subtitle}
                  </p>
                  <p className="font-body text-xs text-darkText-secondary mb-6 leading-relaxed">
                    {model.description}
                  </p>

                  <div className="mb-6 space-y-2">
                    <p className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
                      Includes:
                    </p>
                    {model.includes.map((item, idx) => (
                      <div key={idx} className="flex items-start text-xs text-darkText-muted font-body">
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-accent mr-2 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={model.ctaHref}
                  className={`inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isFeatured
                      ? "bg-brand-accent hover:bg-brand-accentHover text-white shadow-neu-accent"
                      : "bg-bg-dark shadow-neu-dark-flat hover:shadow-neu-dark-pressed text-brand-accent border border-white/5"
                  }`}
                >
                  <span>{model.cta}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

