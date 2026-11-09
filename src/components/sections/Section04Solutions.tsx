"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  UtensilsCrossed,
  Scissors,
  Briefcase,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NeumorphicButton } from "@/components/ui/NeumorphicButton";

interface Industry {
  id: string;
  icon: React.ElementType;
  label: string;
  title: string;
  description: string;
  capabilities: string[];
  mockupLines: { label: string; value: string; accent?: boolean }[];
  mockupTitle: string;
}

const industries: Industry[] = [
  {
    id: "hospitality",
    icon: UtensilsCrossed,
    label: "Hospitality",
    title: "Built for Cafés, Restaurants & Food Businesses",
    description:
      "Replace paper kots and third-party commissions with a fully owned digital operations platform — from customer ordering to kitchen management, analytics to owner control.",
    capabilities: [
      "Zero-commission digital ordering system (CafeOS architecture)",
      "Live kitchen Kanban & order tracking",
      "Branded mobile customer storefront",
      "Owner dashboard: menu, pricing, analytics",
      "Multi-outlet management architecture",
    ],
    mockupTitle: "Kitchen Operations Terminal",
    mockupLines: [
      { label: "Active Orders", value: "12 tickets", accent: true },
      { label: "Today Revenue", value: "₹18,450" },
      { label: "Avg Order Value", value: "₹385" },
      { label: "Completed", value: "34 orders" },
      { label: "Status", value: "● Live", accent: true },
    ],
  },
  {
    id: "beauty",
    icon: Scissors,
    label: "Beauty & Wellness",
    title: "Built for Salons, Spas & Wellness Studios",
    description:
      "Complete salon management with appointment booking, customer records, service menus, and automated reminders — giving you full operational visibility from one dashboard.",
    capabilities: [
      "Online appointment booking system (Off The Grid Gym & Salon architecture)",
      "Client profiles & service history",
      "Automated WhatsApp reminders",
      "Staff schedule & performance tracking",
      "Service catalog & pricing management",
    ],
    mockupTitle: "Appointment Dashboard",
    mockupLines: [
      { label: "Today Bookings", value: "9 appointments", accent: true },
      { label: "Next Client", value: "Priya S. — 2:30 PM" },
      { label: "Revenue MTD", value: "₹52,800" },
      { label: "Pending Reminders", value: "4 clients" },
      { label: "Staff Active", value: "3 stylists", accent: true },
    ],
  },
  {
    id: "legal",
    icon: Briefcase,
    label: "Legal & Professional",
    title: "Built for Law Firms & Professional Services",
    description:
      "Professional digital presence paired with operational tools — client intake portals, case management systems, secure document handling, and administrative automation.",
    capabilities: [
      "Professional website with client portal",
      "Secure client intake forms",
      "Case and matter tracking dashboard",
      "Document management system",
      "Automated admin workflows",
    ],
    mockupTitle: "Client Portal Dashboard",
    mockupLines: [
      { label: "Active Matters", value: "23 cases", accent: true },
      { label: "Pending Review", value: "5 documents" },
      { label: "Client Requests", value: "3 new", accent: true },
      { label: "Deadlines (7d)", value: "4 upcoming" },
      { label: "Billings MTD", value: "₹1,24,000" },
    ],
  },
  {
    id: "retail",
    icon: ShoppingBag,
    label: "Retail & Commerce",
    title: "Built for Retail Shops & Commerce Operations",
    description:
      "Real-time inventory management, sales dashboards, supplier tracking, and operational automation — engineered for the way Indian retail businesses actually function.",
    capabilities: [
      "Real-time inventory & stock management (VyaparOS architecture)",
      "Order management & purchase tracking",
      "Supplier and vendor management",
      "Sales analytics & reporting",
      "Low-stock alerts & reorder automation",
    ],
    mockupTitle: "Inventory Control Center",
    mockupLines: [
      { label: "Total SKUs", value: "1,247 items", accent: true },
      { label: "Low Stock Alerts", value: "8 items", accent: true },
      { label: "Today Orders", value: "34 processed" },
      { label: "Pending Reorders", value: "3 suppliers" },
      { label: "Revenue Today", value: "₹24,600" },
    ],
  },
  {
    id: "growing",
    icon: TrendingUp,
    label: "Growing Businesses",
    title: "Built for Businesses Ready to Scale",
    description:
      "A custom business OS that centralizes your operations — AI-powered admin tools, workflow integrations, digital infrastructure, and the technical foundation to grow without limits.",
    capabilities: [
      "Custom business OS platform",
      "AI-powered admin and decision support",
      "Workflow automation & integrations",
      "Cloud-native scalable infrastructure",
      "Analytics and business intelligence",
    ],
    mockupTitle: "Business Intelligence Hub",
    mockupLines: [
      { label: "Active Workflows", value: "14 running", accent: true },
      { label: "AI Tasks Today", value: "238 automated" },
      { label: "System Health", value: "● All Good", accent: true },
      { label: "Data Synced", value: "6 platforms" },
      { label: "MRR Growth", value: "+22% MoM" },
    ],
  },
];

export function Section04Solutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState("hospitality");

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

  const active = industries.find((i) => i.id === activeTab) ?? industries[0];

  return (
    <section
      ref={sectionRef}
      id="solutions"
      aria-labelledby="solutions-heading"
      className="py-24 md:py-32 bg-bg-base"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={cn(
            "transition-all duration-700 motion-reduce:transition-none mb-14",
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent mb-4">
            Industry Solutions
          </p>
          <h2
            id="solutions-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary max-w-3xl leading-tight"
          >
            Technology Engineered Around{" "}
            <span className="text-text-secondary font-normal">
              Your Industry.
            </span>
          </h2>
        </div>

        {/* Tab Selector */}
        <div
          role="tablist"
          aria-label="Industry sectors"
          className={cn(
            "flex flex-wrap gap-2 mb-10 transition-all duration-700 motion-reduce:transition-none",
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{ transitionDelay: revealed ? "150ms" : "0ms" }}
        >
          {industries.map((ind) => {
            const Icon = ind.icon;
            const isActive = activeTab === ind.id;
            return (
              <button
                key={ind.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${ind.id}`}
                onClick={() => setActiveTab(ind.id)}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium font-body transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base",
                  isActive
                    ? "bg-bg-base shadow-neu-pressed text-text-primary border border-brand-accent/20"
                    : "bg-bg-base shadow-neu-flat text-text-secondary hover:text-text-primary hover:shadow-neu-flat-lg hover:-translate-y-0.5 active:shadow-neu-pressed active:translate-y-0 border border-transparent"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isActive ? "text-brand-accent" : "text-text-muted"
                  )}
                />
                {ind.label}
              </button>
            );
          })}
        </div>

        {/* Content Panel */}
        <div
          id={`panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${active.id}`}
          className={cn(
            "transition-all duration-700 motion-reduce:transition-none",
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: revealed ? "250ms" : "0ms" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left — text content */}
            <div className="rounded-3xl bg-bg-base shadow-neu-flat p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                {React.createElement(active.icon, {
                  className: "h-7 w-7 text-brand-accent",
                })}
                <h3 className="font-heading text-xl md:text-2xl font-bold text-text-primary leading-tight">
                  {active.title}
                </h3>
              </div>
              <p className="font-body text-text-secondary text-sm md:text-base leading-relaxed mb-7">
                {active.description}
              </p>
              <ul className="space-y-3">
                {active.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="flex items-center gap-3 text-sm font-body text-text-primary"
                  >
                    <div className="h-5 w-5 rounded-full bg-brand-accent/15 flex items-center justify-center flex-shrink-0">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                    </div>
                    {cap}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <NeumorphicButton variant="accent" size="md">
                  <a href="#contact">Discuss This Solution</a>
                </NeumorphicButton>
              </div>
            </div>

            {/* Right — Enterprise Neumorphic Mockup Preview */}
            <div className="rounded-3xl bg-bg-dark shadow-neu-dark-flat p-7 sm:p-9 overflow-hidden relative min-h-[340px] flex flex-col justify-between">
              <div className="relative z-10">
                {/* Mock window bar with Indented Physical LEDs */}
                <div className="flex items-center gap-2 pb-4 mb-5 border-b border-white/[0.04]">
                  <div
                    className="h-2.5 w-2.5 rounded-full bg-[#E06C75]/80 shadow-neu-dark-dot"
                    title="Close"
                    aria-hidden="true"
                  />
                  <div
                    className="h-2.5 w-2.5 rounded-full bg-[#E5C07B]/80 shadow-neu-dark-dot"
                    title="Minimize"
                    aria-hidden="true"
                  />
                  <div
                    className="h-2.5 w-2.5 rounded-full bg-[#98C379]/80 shadow-neu-dark-dot"
                    title="Maximize"
                    aria-hidden="true"
                  />
                  <span className="ml-2 font-mono text-[11px] text-darkText-secondary uppercase tracking-[0.18em] font-medium">
                    {active.mockupTitle}
                  </span>
                </div>

                {/* Stat rows recessed into the dark material */}
                <div className="space-y-3">
                  {active.mockupLines.map((line, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-bg-dark shadow-neu-dark-pressed-sm rounded-xl px-4 py-3 transition-transform duration-200"
                    >
                      <span className="font-mono text-xs text-darkText-secondary font-medium tracking-wide">
                        {line.label}
                      </span>
                      <span
                        className={cn(
                          "font-mono text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-2",
                          line.accent
                            ? "text-brand-accentLight"
                            : "text-darkText-primary"
                        )}
                      >
                        {line.label.toLowerCase() === "status" && (
                          <span className="inline-block h-2 w-2 rounded-full bg-brand-accentLight animate-pulse" />
                        )}
                        {line.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Recessed Neumorphic Bottom Indicator */}
                <div className="mt-6 h-1.5 w-full rounded-full bg-bg-dark shadow-neu-dark-pressed-sm overflow-hidden p-[1px]">
                  <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-brand-accent to-brand-accentLight" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
