"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, CheckCircle2 } from "lucide-react";
import { allProjects, featuredProjects, Project } from "@/data/projectsData";

const GitHubIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const filterCategories = [
  "All",
  "Websites",
  "Applications",
  "Business Platforms",
  "AI Systems",
  "Prototypes",
];

export const SectionProjects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filterProject = (project: Project) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Websites") {
      return (
        project.industry.includes("Retail") ||
        project.name.toLowerCase().includes("tailors") ||
        project.name.toLowerCase().includes("gym")
      );
    }
    if (activeFilter === "Applications") {
      return (
        project.name.toLowerCase().includes("cafeos") ||
        project.name.toLowerCase().includes("campus") ||
        project.name.toLowerCase().includes("krishi")
      );
    }
    if (activeFilter === "Business Platforms") {
      return (
        project.name.toLowerCase().includes("vyapar") ||
        project.name.toLowerCase().includes("faculty") ||
        project.name.toLowerCase().includes("inventory")
      );
    }
    if (activeFilter === "AI Systems") {
      return (
        project.name.toLowerCase().includes("monolith") ||
        project.description.toLowerCase().includes("agent")
      );
    }
    if (activeFilter === "Prototypes") {
      return project.status === "prototype" || project.status === "in-development";
    }
    return true;
  };

  const filteredFeatured = featuredProjects.filter(filterProject);
  const filteredAdditional = allProjects
    .filter((p) => !p.featured)
    .filter(filterProject);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return "bg-brand-success/10 text-brand-success border-brand-success/20";
      case "in-development":
        return "bg-brand-accent/10 text-brand-accent border-brand-accent/20";
      case "prototype":
        return "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20";
      default:
        return "bg-text-secondary/10 text-text-secondary border-text-secondary/20";
    }
  };

  return (
    <section id="work" className="py-20 md:py-28 bg-bg-base relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full shadow-neu-pressed-sm bg-bg-base text-brand-accent font-mono text-xs font-semibold uppercase tracking-widest mb-4">
            <span>Verified Systems</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Engineering Demonstrated, Not Just Described.
          </h2>
          <p className="font-body text-base sm:text-lg text-text-secondary leading-relaxed">
            Every project below is authentic — developed with clean architectures, addressing operational challenges, and linked to verified source repositories.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeFilter === cat
                  ? "bg-bg-base text-brand-accent shadow-neu-pressed font-semibold"
                  : "bg-bg-base text-text-secondary hover:text-text-primary shadow-neu-flat hover:shadow-neu-flat-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredFeatured.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl bg-bg-base shadow-neu-flat-lg p-8 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-semibold text-text-muted">
                    {project.industry}
                  </span>
                  <span
                    className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${getStatusBadge(
                      project.status
                    )}`}
                  >
                    {project.status.replace("-", " ")}
                  </span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-text-primary mb-3">
                  {project.name}
                </h3>
                <p className="font-body text-sm text-text-secondary mb-6 leading-relaxed">
                  {project.longDescription}
                </p>

                <div className="mb-6">
                  <p className="font-mono text-xs font-semibold text-text-primary mb-2">Key Highlights:</p>
                  <ul className="space-y-1.5">
                    {project.keyFeatures.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-start text-xs text-text-secondary font-body">
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-accent mr-2 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] px-2.5 py-1 rounded-lg bg-bg-base shadow-neu-pressed-sm text-brand-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl shadow-neu-flat hover:shadow-neu-pressed text-xs font-semibold text-text-primary transition-all bg-bg-base"
                  >
                    <GitHubIcon className="h-4 w-4" />
                    <span>View Repository</span>
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-accent text-white hover:bg-brand-accentHover text-xs font-semibold transition-all shadow-neu-accent"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Projects Compact Grid */}
        {filteredAdditional.length > 0 && (
          <div>
            <h4 className="font-heading text-xl font-bold text-text-primary mb-6">
              Additional R&amp;D Systems &amp; Platforms
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAdditional.map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl bg-bg-base shadow-neu-flat p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[11px] text-text-muted">
                        {project.industry}
                      </span>
                      <span
                        className={`font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusBadge(
                          project.status
                        )}`}
                      >
                        {project.status.replace("-", " ")}
                      </span>
                    </div>
                    <h5 className="font-heading text-lg font-bold text-text-primary mb-2">
                      {project.name}
                    </h5>
                    <p className="font-body text-xs text-text-secondary mb-4 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-brand-accent">
                      {project.techStack.slice(0, 2).join(" • ")}
                    </span>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-primary hover:text-brand-accent p-1.5 rounded-lg shadow-neu-flat hover:shadow-neu-pressed bg-bg-base transition-all"
                      aria-label={`View ${project.name} on GitHub`}
                    >
                      <GitHubIcon className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
