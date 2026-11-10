"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Monitor, LayoutDashboard, Cpu, BarChart3, TrendingUp, Server } from "lucide-react";
import { serviceDivisions } from "@/data/servicesData";

const iconMap: Record<string, React.ReactNode> = {
  monitor: <Monitor className="h-6 w-6 text-brand-accent" />,
  "layout-dashboard": <LayoutDashboard className="h-6 w-6 text-brand-success" />,
  cpu: <Cpu className="h-6 w-6 text-[#7C5CFC]" />,
  "bar-chart-3": <BarChart3 className="h-6 w-6 text-[#F59E0B]" />,
  "trending-up": <TrendingUp className="h-6 w-6 text-[#10B981]" />,
  server: <Server className="h-6 w-6 text-[#64748B]" />,
};

export const SectionCapabilities: React.FC = () => {
  return (
    <section id="capabilities" className="py-20 md:py-28 bg-bg-base relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full shadow-neu-pressed-sm bg-bg-base text-brand-accent font-mono text-xs font-semibold uppercase tracking-widest mb-4">
            <span>What We Build</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Six Divisions. One Engineering Agency.
          </h2>
          <p className="font-body text-base sm:text-lg text-text-secondary leading-relaxed">
            We cover the full spectrum of digital needs — from your first high-converting website to complex AI-powered operations and custom software platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceDivisions.map((division) => {
            const isDarkAnchor = division.slug === "ai-automation";

            if (isDarkAnchor) {
              return (
                <div
                  key={division.id}
                  className="rounded-3xl bg-bg-dark text-darkText-primary shadow-neu-dark-flat p-8 flex flex-col justify-between relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300 border border-white/5"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-full blur-2xl pointer-events-none" />
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-sm font-bold text-brand-accent px-3 py-1 rounded-full shadow-neu-dark-pressed bg-bg-dark">
                        DIV {division.number}
                      </span>
                      <div className="p-3 rounded-2xl shadow-neu-dark-pressed bg-bg-dark">
                        {iconMap[division.iconKey]}
                      </div>
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white mb-2">
                      {division.name}
                    </h3>
                    <p className="font-body text-xs font-medium text-brand-accent mb-4">
                      {division.tagline}
                    </p>
                    <p className="font-body text-sm text-darkText-secondary mb-6 leading-relaxed">
                      {division.description}
                    </p>
                    <ul className="space-y-2 mb-8">
                      {division.services.slice(0, 3).map((s, idx) => (
                        <li key={idx} className="flex items-center text-xs text-darkText-muted font-mono">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-accent mr-2" />
                          {s.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/services/${division.slug}`}
                    className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-brand-accent text-white font-medium text-sm hover:bg-brand-accentHover transition-colors shadow-neu-accent"
                  >
                    <span>Explore Division</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            }

            return (
              <div
                key={division.id}
                className="rounded-3xl bg-bg-base text-text-primary shadow-neu-flat p-8 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-sm font-bold text-brand-accent px-3 py-1 rounded-full shadow-neu-pressed-sm bg-bg-base">
                      DIV {division.number}
                    </span>
                    <div className="p-3 rounded-2xl shadow-neu-flat-sm bg-bg-base">
                      {iconMap[division.iconKey]}
                    </div>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-text-primary mb-2">
                    {division.name}
                  </h3>
                  <p className="font-body text-xs font-semibold text-brand-accent mb-4">
                    {division.tagline}
                  </p>
                  <p className="font-body text-sm text-text-secondary mb-6 leading-relaxed">
                    {division.description}
                  </p>
                  <ul className="space-y-2 mb-8">
                    {division.services.slice(0, 3).map((s, idx) => (
                      <li key={idx} className="flex items-center text-xs text-text-muted font-mono">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-accent mr-2" />
                        {s.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/services/${division.slug}`}
                  className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl shadow-neu-flat hover:shadow-neu-pressed text-brand-accent font-semibold text-sm transition-all bg-bg-base group"
                >
                  <span>Explore Division</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

