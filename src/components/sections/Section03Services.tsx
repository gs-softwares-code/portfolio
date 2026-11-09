"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Bot,
  Zap,
  LayoutDashboard,
  Globe,
  Smartphone,
  Server,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NeumorphicCard } from "@/components/ui/NeumorphicCard";

interface Service {
  id: string;
  icon: React.ElementType;
  label: string;
  title: string;
  description: string;
  capabilities: string[];
  colSpan: string;
  rowSpan?: string;
  dark?: boolean;
  accentColor?: string;
}

const services: Service[] = [
  {
    id: "ai-agents",
    icon: Bot,
    label: "01",
    title: "AI Agent Development",
    description:
      "Autonomous AI agents that handle complex, multi-step business tasks — customer support, decision routing, data processing — operating 24/7 without manual intervention.",
    capabilities: [
      "Multi-agent orchestration pipelines",
      "Deterministic business logic enforcement",
      "Natural language customer interfaces",
      "Real-time decision routing systems",
    ],
    colSpan: "md:col-span-2",
    dark: true,
    accentColor: "text-brand-accent",
  },
  {
    id: "automation",
    icon: Zap,
    label: "02",
    title: "Business Automation",
    description:
      "Identify, design, and implement automation layers that eliminate repetitive work and connect your existing tools into synchronized, error-free workflows.",
    capabilities: [
      "Cross-platform workflow automation",
      "Repetitive task elimination",
      "API and integration engineering",
      "Event-driven trigger systems",
    ],
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    dark: false,
  },
  {
    id: "platforms",
    icon: LayoutDashboard,
    label: "03",
    title: "Custom Business Platforms",
    description:
      "Full operational software built specifically for how your business works — not adapted from templates, but engineered from requirements.",
    capabilities: [
      "Business OS and admin dashboards",
      "Multi-tenant SaaS architectures",
      "Real-time data and analytics",
      "Role-based access control",
    ],
    colSpan: "md:col-span-1",
    dark: false,
  },
  {
    id: "web-engineering",
    icon: Globe,
    label: "04",
    title: "Website Engineering",
    description:
      "High-performance, conversion-optimized web presences built for real business results — not just aesthetic presence.",
    capabilities: [
      "Conversion-optimized architecture",
      "SEO and Core Web Vitals",
      "CMS and content management",
      "Owner admin interfaces",
    ],
    colSpan: "md:col-span-1",
    dark: false,
  },
  {
    id: "app-dev",
    icon: Smartphone,
    label: "05",
    title: "Application Development",
    description:
      "Mobile and Progressive Web Apps that give your customers and teams the power to operate from anywhere — on any device.",
    capabilities: [
      "Cross-platform mobile apps",
      "Progressive Web Applications",
      "Offline-first architecture",
      "Native Android via Capacitor",
    ],
    colSpan: "md:col-span-1",
    dark: false,
  },
  {
    id: "infrastructure",
    icon: Server,
    label: "06",
    title: "Digital Infrastructure",
    description:
      "Cloud-native, edge-deployed backend infrastructure that scales with your business and stays resilient under real-world demand.",
    capabilities: [
      "Cloudflare edge deployments",
      "Supabase and PostgreSQL backends",
      "Security and authentication layers",
      "Monitoring and observability",
    ],
    colSpan: "md:col-span-1",
    dark: false,
  },
];

export function Section03Services() {
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
      id="services"
      aria-labelledby="services-heading"
      className="py-24 md:py-32 bg-bg-base"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={cn(
            "transition-all duration-700 motion-reduce:transition-none mb-14 md:mb-16",
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent mb-4">
            Services
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              id="services-heading"
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary max-w-2xl leading-tight"
            >
              Everything Your Business Needs to{" "}
              <span className="text-text-secondary font-normal">
                Operate Smarter.
              </span>
            </h2>
            <p className="font-body text-text-secondary text-sm md:text-base max-w-xs md:max-w-sm md:text-right leading-relaxed flex-shrink-0">
              Six focused engineering disciplines — each solving a specific
              layer of your business operations.
            </p>
          </div>
        </div>

        {/* Service grid with varied layouts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const delay = `${idx * 80}ms`;

            if (service.dark) {
              // Featured dark card — spans 2 cols
              return (
                <div
                  key={service.id}
                  className={cn(
                    service.colSpan,
                    "transition-all duration-700 motion-reduce:transition-none",
                    revealed
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  )}
                  style={{ transitionDelay: revealed ? delay : "0ms" }}
                >
                  <div className="group relative overflow-hidden rounded-3xl bg-bg-dark shadow-neu-dark-flat p-8 md:p-10 h-full min-h-[320px] flex flex-col justify-between hover:shadow-neu-dark-flat-lg transition-shadow duration-300">
                    {/* Background accent glow */}
                    <div
                      className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-brand-accent/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60"
                      aria-hidden="true"
                    />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <div className="p-3 rounded-2xl bg-brand-accent/15 border border-brand-accent/25">
                          <Icon className="h-6 w-6 text-brand-accent" />
                        </div>
                        <span className="font-mono text-3xl font-bold text-white/8 select-none">
                          {service.label}
                        </span>
                      </div>
                      <h3 className="font-heading text-xl md:text-2xl font-bold text-darkText-primary mb-3">
                        {service.title}
                      </h3>
                      <p className="font-body text-darkText-secondary text-sm leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="flex items-center gap-2 text-xs font-body text-darkText-secondary"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-brand-success flex-shrink-0" />
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative z-10 mt-8 flex items-center">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-brand-accent hover:text-brand-accentLight transition-colors group/link"
                      >
                        Discuss This Service
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            }

            // Standard card
            return (
              <div
                key={service.id}
                className={cn(
                  service.colSpan,
                  "transition-all duration-700 motion-reduce:transition-none",
                  revealed
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: revealed ? delay : "0ms" }}
              >
                <NeumorphicCard
                  interactive
                  className="group h-full flex flex-col min-h-[280px]"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="p-2.5 rounded-xl bg-bg-base shadow-neu-pressed border border-white/50">
                      <Icon className="h-5 w-5 text-brand-accent" />
                    </div>
                    <span className="font-mono text-2xl font-bold text-text-primary/6 select-none">
                      {service.label}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                    {service.title}
                  </h3>
                  <p className="font-body text-text-secondary text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <ul className="space-y-1.5 flex-1">
                    {service.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="flex items-center gap-2 text-xs font-body text-text-secondary"
                      >
                        <div className="h-1 w-1 rounded-full bg-brand-accent flex-shrink-0" />
                        {cap}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-4 border-t border-black/5">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-brand-accent hover:text-brand-accentHover transition-colors group/link"
                    >
                      Learn More
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                    </a>
                  </div>
                </NeumorphicCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
