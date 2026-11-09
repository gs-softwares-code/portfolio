"use client";

import React, { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}
import { NeumorphicCard } from "@/components/ui/NeumorphicCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { NeumorphicButton } from "@/components/ui/NeumorphicButton";
import { featuredProjects, additionalProjects } from "@/data/projectsData";
import type { Project, ProjectStatus } from "@/data/projectsData";

function statusVariant(status: ProjectStatus): "success" | "warning" | "accent" | "neutral" {
  switch (status) {
    case "live": return "success";
    case "in-development": return "warning";
    case "prototype": return "accent";
    case "early-stage": return "neutral";
  }
}

function statusLabel(status: ProjectStatus): string {
  switch (status) {
    case "live": return "Live";
    case "in-development": return "In Development";
    case "prototype": return "Prototype";
    case "early-stage": return "Early Stage";
  }
}

// Lightweight SVG UI mockup per project
function ProjectMockup({ projectId }: { projectId: string }) {
  const mockups: Record<string, React.ReactNode> = {
    "off-the-grid-gym": (
      <svg viewBox="0 0 320 180" className="w-full h-full" aria-label="Off The Grid Gym interface preview">
        <rect width="320" height="180" fill="#08090B" rx="8" />
        {/* Nav */}
        <rect x="0" y="0" width="320" height="28" fill="#111214" rx="0" />
        <circle cx="16" cy="14" r="6" fill="#00FF66" fillOpacity="0.8" />
        <rect x="30" y="10" width="60" height="8" rx="3" fill="#00FF66" fillOpacity="0.7" />
        <rect x="230" y="9" width="40" height="10" rx="5" fill="#00FF66" fillOpacity="0.9" />
        {/* Hero text */}
        <rect x="12" y="40" width="140" height="12" rx="3" fill="#fff" fillOpacity="0.9" />
        <rect x="12" y="58" width="100" height="8" rx="3" fill="#fff" fillOpacity="0.4" />
        {/* Price cards */}
        {[0,1,2,3].map(i => (
          <g key={i}>
            <rect x={12 + i*76} y="80" width="68" height="72" rx="6" fill="#1a1b1f" />
            <rect x={12 + i*76} y="80" width="68" height="20" rx="6" fill="#00FF66" fillOpacity={i===1?0.9:0.3} />
            <rect x={18 + i*76} y="85" width="40" height="8" rx="2" fill="#000" fillOpacity="0.6" />
            <rect x={18 + i*76} y="108" width="30" height="8" rx="2" fill="#fff" fillOpacity="0.6" />
            <rect x={18 + i*76} y="120" width="50" height="6" rx="2" fill="#fff" fillOpacity="0.3" />
            <rect x={18 + i*76} y="132" width="50" height="6" rx="2" fill="#fff" fillOpacity="0.2" />
          </g>
        ))}
        {/* WhatsApp FAB */}
        <circle cx="296" cy="160" r="14" fill="#25D366" />
        <rect x="289" y="155" width="14" height="10" rx="2" fill="#fff" fillOpacity="0.9" />
      </svg>
    ),
    "cafeos": (
      <svg viewBox="0 0 320 180" className="w-full h-full" aria-label="CafeOS interface preview">
        <rect width="320" height="180" fill="#F8F7F4" rx="8" />
        {/* Top bar */}
        <rect x="0" y="0" width="320" height="32" fill="#2D2A26" rx="0" />
        <rect x="10" y="10" width="80" height="12" rx="4" fill="#C8A97A" fillOpacity="0.9" />
        <rect x="230" y="8" width="30" height="16" rx="8" fill="#D4954A" />
        <rect x="268" y="8" width="42" height="16" rx="8" fill="#fff" fillOpacity="0.15" />
        {/* Kitchen Kanban columns */}
        {["Received","Preparing","Ready"].map((col, ci) => (
          <g key={col}>
            <rect x={8 + ci*104} y="42" width="96" height="130" rx="6" fill="#EDE9E3" />
            <rect x={8 + ci*104} y="42" width="96" height="20" rx="6" fill="#2D2A26" fillOpacity="0.08" />
            <rect x={14 + ci*104} y="48" width="50" height="8" rx="2" fill="#2D2A26" fillOpacity="0.5" />
            {/* Order ticket cards */}
            {[0,1].map(ti => (
              <g key={ti}>
                <rect x={12 + ci*104} y={70 + ti*50} width="88" height="42" rx="6" fill="#fff" />
                <rect x={16 + ci*104} y={74 + ti*50} width="40" height="6" rx="2" fill="#2D2A26" fillOpacity="0.7" />
                <rect x={16 + ci*104} y={84 + ti*50} width="60" height="5" rx="2" fill="#2D2A26" fillOpacity="0.3" />
                <rect x={16 + ci*104} y={94 + ti*50} width="30" height="12" rx="4" fill={ci===2?"#36A783":"#D4954A"} fillOpacity="0.9" />
                <rect x={50 + ci*104} y={94 + ti*50} width="40" height="12" rx="4" fill="#2D2A26" fillOpacity="0.08" />
              </g>
            ))}
          </g>
        ))}
      </svg>
    ),
    "rupnagar-tailors": (
      <svg viewBox="0 0 320 180" className="w-full h-full" aria-label="Rupnagar Tailors interface preview">
        <rect width="320" height="180" fill="#F5F0E8" rx="8" />
        {/* Royal nav */}
        <rect x="0" y="0" width="320" height="30" fill="#1A0A00" rx="0" />
        <rect x="10" y="8" width="80" height="14" rx="3" fill="#C8A040" fillOpacity="0.9" />
        <rect x="140" y="10" width="40" height="10" rx="2" fill="#C8A040" fillOpacity="0.5" />
        <rect x="190" y="10" width="40" height="10" rx="2" fill="#C8A040" fillOpacity="0.5" />
        <rect x="250" y="8" width="60" height="14" rx="7" fill="#C8A040" fillOpacity="0.9" />
        {/* Hero banner */}
        <rect x="0" y="30" width="320" height="70" fill="#2C1A00" />
        <rect x="20" y="44" width="120" height="14" rx="3" fill="#C8A040" fillOpacity="0.9" />
        <rect x="20" y="64" width="80" height="8" rx="2" fill="#fff" fillOpacity="0.4" />
        <rect x="20" y="78" width="80" height="16" rx="8" fill="#C8A040" fillOpacity="0.9" />
        {/* Category cards */}
        {[0,1,2].map(i => (
          <g key={i}>
            <rect x={8 + i*104} y="108" width="96" height="66" rx="8" fill="#fff" />
            <rect x={8 + i*104} y="108" width="96" height="36" rx="8" fill="#C8A040" fillOpacity={0.15 + i*0.1} />
            <rect x={18 + i*104} y="118" width="50" height="8" rx="2" fill="#1A0A00" fillOpacity="0.6" />
            <rect x={18 + i*104} y="150" width="60" height="10" rx="5" fill="#C8A040" fillOpacity="0.8" />
          </g>
        ))}
      </svg>
    ),
    "vyaparos": (
      <svg viewBox="0 0 320 180" className="w-full h-full" aria-label="VyaparOS interface preview">
        <rect width="320" height="180" fill="#0F1117" rx="8" />
        {/* Sidebar */}
        <rect x="0" y="0" width="64" height="180" fill="#1A1D2E" />
        {["B","I","C","S","G"].map((l, i) => (
          <g key={l}>
            <rect x="8" y={12 + i*32} width="48" height="28" rx="8" fill={i===0?"#4A65DC":"transparent"} fillOpacity={i===0?0.3:0} />
            <rect x="20" y={20 + i*32} width="24" height="12" rx="3" fill="#fff" fillOpacity={i===0?0.8:0.3} />
          </g>
        ))}
        {/* Main area */}
        <rect x="72" y="0" width="248" height="30" fill="#1A1D2E" />
        <rect x="82" y="8" width="80" height="14" rx="4" fill="#fff" fillOpacity="0.7" />
        <rect x="250" y="8" width="60" height="14" rx="7" fill="#4A65DC" fillOpacity="0.8" />
        {/* Stats */}
        {[0,1,2].map(i => (
          <g key={i}>
            <rect x={80 + i*80} y="40" width="70" height="40" rx="8" fill="#1A1D2E" />
            <rect x={88 + i*80} y="48" width="30" height="8" rx="2" fill="#fff" fillOpacity="0.3" />
            <rect x={88 + i*80} y="62" width="50" height="10" rx="3" fill="#4A65DC" fillOpacity={0.6 + i*0.1} />
          </g>
        ))}
        {/* Bill list */}
        {[0,1,2,3].map(i => (
          <g key={i}>
            <rect x="80" y={92 + i*20} width="230" height="16" rx="4" fill="#1A1D2E" />
            <rect x="88" y={96 + i*20} width="60" height="8" rx="2" fill="#fff" fillOpacity="0.5" />
            <rect x="230" y={96 + i*20} width="40" height="8" rx="2" fill="#36A783" fillOpacity="0.7" />
            <rect x="280" y={96 + i*20} width="20" height="8" rx="2" fill="#fff" fillOpacity="0.2" />
          </g>
        ))}
      </svg>
    ),
  };

  return (
    <div className="w-full h-full rounded-xl overflow-hidden bg-bg-dark">
      {mockups[projectId] ?? (
        <div className="w-full h-full flex items-center justify-center">
          <span className="font-mono text-xs text-darkText-muted">Interface Preview</span>
        </div>
      )}
    </div>
  );
}

function FeaturedProjectCard({ project, idx, revealed }: { project: Project; idx: number; revealed: boolean }) {
  return (
    <div
      className={cn(
        "transition-all duration-700 motion-reduce:transition-none",
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: revealed ? `${idx * 100}ms` : "0ms" }}
    >
      <div className="rounded-3xl bg-bg-base shadow-neu-flat overflow-hidden h-full flex flex-col">
        {/* Mockup preview */}
        <div className="relative h-48 md:h-56 p-4 bg-bg-dark">
          <ProjectMockup projectId={project.id} />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
              {project.industry}
            </span>
            <StatusBadge
              variant={statusVariant(project.status)}
              pulse={project.status === "live"}
            >
              {statusLabel(project.status)}
            </StatusBadge>
          </div>

          <h3 className="font-heading text-xl font-bold text-text-primary mb-2">
            {project.name}
          </h3>
          <p className="font-body text-sm text-text-secondary leading-relaxed mb-5">
            {project.longDescription}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] px-2 py-1 rounded-lg bg-bg-base shadow-neu-pressed border border-black/5 text-text-muted"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Features */}
          <ul className="space-y-1.5 mb-6 flex-1">
            {project.keyFeatures.slice(0, 4).map((feat) => (
              <li key={feat} className="flex items-start gap-2 text-xs font-body text-text-secondary">
                <div className="h-1.5 w-1.5 rounded-full bg-brand-success mt-1.5 flex-shrink-0" />
                {feat}
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 mt-auto pt-4 border-t border-black/5">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-text-primary hover:text-brand-accent transition-colors"
            >
              <GitHubIcon className="h-4 w-4" />
              View on GitHub
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-brand-success hover:text-brand-success/80 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live Site
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdditionalProjectCard({ project, idx, revealed }: { project: Project; idx: number; revealed: boolean }) {
  return (
    <div
      className={cn(
        "transition-all duration-700 motion-reduce:transition-none",
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: revealed ? `${idx * 60 + 400}ms` : "0ms" }}
    >
      <NeumorphicCard className="h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-heading text-base font-bold text-text-primary">{project.name}</h4>
            <p className="font-mono text-[10px] text-text-muted mt-0.5">{project.industry}</p>
          </div>
          <StatusBadge variant={statusVariant(project.status)} pulse={false}>
            {statusLabel(project.status)}
          </StatusBadge>
        </div>

        <p className="font-body text-xs text-text-secondary leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-bg-base shadow-neu-pressed border border-black/5 text-text-muted"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded text-text-muted">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-body text-xs font-semibold text-text-secondary hover:text-brand-accent transition-colors mt-auto"
        >
          <GitHubIcon className="h-3.5 w-3.5" />
          GitHub Repository
        </a>
      </NeumorphicCard>
    </div>
  );
}

export function Section06Projects() {
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
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-labelledby="projects-heading"
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
            Our Work
          </p>
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <h2
              id="projects-heading"
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary max-w-2xl leading-tight"
            >
              Engineered Solutions.{" "}
              <span className="text-text-secondary font-normal">
                Real-World Applications.
              </span>
            </h2>
            <div className="flex items-center gap-3 md:ml-auto flex-shrink-0">
              <NeumorphicButton variant="ghost" size="sm">
                <a
                  href="https://github.com/gs-softwares-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <GitHubIcon className="h-4 w-4" />
                  GitHub Organization
                </a>
              </NeumorphicButton>
              <a
                href="https://github.com/Gulshan-Singh-gs"
                target="_blank"
                rel="noopener noreferrer"
                className="sr-only"
              >
                Gulshan-Singh-gs
              </a>
            </div>
          </div>
        </div>

        {/* Featured Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {featuredProjects.map((project, idx) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              idx={idx}
              revealed={revealed}
            />
          ))}
        </div>

        {/* Additional Projects */}
        <div
          className={cn(
            "transition-all duration-700 motion-reduce:transition-none mb-8",
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{ transitionDelay: revealed ? "350ms" : "0ms" }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-black/8" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-text-muted">
              Additional Projects
            </span>
            <div className="h-px flex-1 bg-black/8" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {additionalProjects.map((project, idx) => (
            <AdditionalProjectCard
              key={project.id}
              project={project}
              idx={idx}
              revealed={revealed}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
