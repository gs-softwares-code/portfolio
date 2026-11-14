import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { industrySolutions, getIndustryBySlug } from "@/data/industriesData";
import { IndustryImageSlider } from "@/components/ui/IndustryImageSlider";
import {
  Utensils,
  Dumbbell,
  Sparkles,
  Briefcase,
  ShoppingBag,
  GraduationCap,
  Building2,
  Rocket,
  ArrowRight,
  LucideIcon,
} from "lucide-react";

export async function generateStaticParams() {
  return industrySolutions.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry } = await params;
  const ind = getIndustryBySlug(industry);
  if (!ind) return { title: "Solution Not Found" };
  return {
    title: `${ind.name} Solutions | GS-Softwares`,
    description: ind.description,
  };
}

const serviceLabels: Record<string, string> = {
  "digital-presence": "Digital Presence",
  applications: "Applications",
  "ai-automation": "AI & Automation",
  analytics: "Analytics & Reporting",
  "digital-growth": "Digital Growth",
  infrastructure: "Infrastructure",
};

const iconMap: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  utensils: { icon: Utensils, color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/15" },
  dumbbell: { icon: Dumbbell, color: "text-[#10B981]", bg: "bg-[#10B981]/15" },
  sparkles: { icon: Sparkles, color: "text-[#EC4899]", bg: "bg-[#EC4899]/15" },
  briefcase: { icon: Briefcase, color: "text-[#4A65DC]", bg: "bg-[#4A65DC]/15" },
  "shopping-bag": { icon: ShoppingBag, color: "text-[#F97316]", bg: "bg-[#F97316]/15" },
  "graduation-cap": { icon: GraduationCap, color: "text-[#8B5CF6]", bg: "bg-[#8B5CF6]/15" },
  "building-2": { icon: Building2, color: "text-[#0EA5E9]", bg: "bg-[#0EA5E9]/15" },
  rocket: { icon: Rocket, color: "text-[#36A783]", bg: "bg-[#36A783]/15" },
};

export default async function IndustrySolutionPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const iconConfig = iconMap[industry.iconKey] ?? {
    icon: Rocket,
    color: "text-brand-accent",
    bg: "bg-brand-accent/15",
  };
  const IconComponent = iconConfig.icon;

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Navbar />
      <main>
        {/* ── Immersive Cinematic Header with Dynamic Image Showcase ─────────────────────────────────── */}
        <section className="pt-32 pb-24 md:pb-32 bg-bg-dark text-white relative overflow-hidden">
          {/* Ambient lighting & radial glows */}
          <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-96 h-96 bg-brand-accent/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 right-10 w-80 h-80 bg-brand-success/10 rounded-full blur-3xl pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Heading & Narrative */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full shadow-neu-dark-pressed bg-bg-dark border border-white/5 mb-6">
                  <div className={`p-1.5 rounded-full ${iconConfig.bg} ${iconConfig.color}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-xs uppercase font-semibold tracking-wider text-brand-accent">
                    Industry Solutions
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="font-mono text-xs text-darkText-muted uppercase">
                    {industry.shortName}
                  </span>
                </div>

                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {industry.name}
                </h1>
                
                <p className="font-mono text-base sm:text-lg text-brand-accent font-semibold mb-6">
                  {industry.tagline}
                </p>

                <p className="font-body text-darkText-secondary text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
                  {industry.description}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-brand-accent text-white font-body font-medium px-6 py-3 rounded-xl shadow-neu-accent hover:bg-brand-accentHover transition-all text-sm"
                  >
                    <span>Engineer {industry.shortName} System</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <a
                    href="#engineering"
                    className="inline-flex items-center gap-2 bg-bg-dark text-darkText-primary font-body font-medium px-6 py-3 rounded-xl border border-white/5 shadow-neu-dark-flat hover:shadow-neu-dark-pressed transition-all text-sm"
                  >
                    Explore Capabilities
                  </a>
                </div>
              </div>

              {/* Right Column: Dynamic 5-Second Fade Image Experience */}
              <div className="lg:col-span-5">
                {industry.galleryImages && industry.galleryImages.length > 0 ? (
                  <div className="rounded-3xl bg-bg-dark p-3.5 border border-white/10 shadow-neu-dark-flat relative group">
                    <IndustryImageSlider
                      images={industry.galleryImages}
                      intervalMs={5000}
                      categoryName={industry.name}
                      className="!h-72 sm:!h-80 md:!h-96 rounded-2xl"
                    />
                    
                    {/* Floating Telemetry Metric */}
                    <div className="absolute -bottom-4 -left-4 bg-bg-dark/95 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <div>
                        <p className="font-mono text-[10px] text-darkText-muted uppercase">
                          System Architecture
                        </p>
                        <p className="font-mono text-xs font-bold text-white">
                          Domain-Optimized
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-3xl bg-bg-dark p-8 border border-white/5 shadow-neu-dark-flat flex items-center justify-center text-center">
                    <IconComponent className="h-20 w-20 text-brand-accent/40" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Organic Fog Gradient Transition into Light Section */}
          <div
            className="absolute bottom-0 inset-x-0 h-36 pointer-events-none z-20"
            style={{
              background: `linear-gradient(to bottom,
                rgba(23, 28, 41, 0) 0%,
                rgba(27, 33, 49, 0.2) 14%,
                rgba(45, 54, 76, 0.35) 26%,
                rgba(80, 94, 125, 0.45) 40%,
                rgba(135, 148, 175, 0.6) 55%,
                rgba(200, 208, 222, 0.8) 72%,
                rgba(233, 237, 242, 0.95) 88%,
                #E9EDF2 100%
              )`,
            }}
          />
        </section>

        {/* ── Challenges We Address ─────────────────────────────────────── */}
        <section className="py-20 bg-bg-base">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="font-mono text-xs tracking-widest uppercase text-brand-accent mb-3">
                Pain Points
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary leading-tight">
                Challenges We Address
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {industry.problems.map((problem, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-2xl bg-bg-base shadow-neu-flat p-5"
                >
                  <span className="flex-shrink-0 h-7 w-7 rounded-lg bg-brand-accent/10 flex items-center justify-center">
                    <span className="font-mono text-xs font-bold text-brand-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <p className="font-body text-sm text-text-secondary leading-relaxed pt-0.5">
                    {problem}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What We Engineer ──────────────────────────────────── */}
        <section id="engineering" className="py-20 bg-bg-base">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="font-mono text-xs tracking-widest uppercase text-brand-accent mb-3">
                Our Engineering
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary leading-tight">
                What We Engineer for {industry.name}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industry.solutions.map((solution, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-bg-base shadow-neu-flat p-6 flex flex-col"
                >
                  <h3 className="font-heading text-base font-bold text-text-primary mb-3 leading-snug">
                    {solution.name}
                  </h3>
                  <p className="font-body text-sm text-text-secondary leading-relaxed flex-1 mb-4">
                    {solution.description}
                  </p>
                  <Link
                    href={`/services/${solution.serviceSlug}`}
                    className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-brand-accent hover:text-brand-accentHover transition-colors duration-200"
                  >
                    {serviceLabels[solution.serviceSlug] ?? solution.serviceSlug} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Automation Opportunities ──────────────────────────────────── */}
        <section className="py-20 bg-bg-dark">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-brand-accent mb-3">
                  AI & Automation
                </p>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-darkText-primary mb-6 leading-tight">
                  Automation Opportunities
                </h2>
                <ul className="space-y-3">
                  {industry.automationOpportunities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                      <span className="font-body text-sm text-darkText-secondary leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Analytics Opportunities ───────────────────────────────── */}
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-brand-success mb-3">
                  Data & Intelligence
                </p>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-darkText-primary mb-6 leading-tight">
                  Analytics &amp; Reporting
                </h2>
                <ul className="space-y-3">
                  {industry.analyticsOpportunities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-success flex-shrink-0" />
                      <span className="font-body text-sm text-darkText-secondary leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Implementation Roadmap ────────────────────────────────────── */}
        <section className="py-20 bg-bg-base">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <p className="font-mono text-xs tracking-widest uppercase text-brand-accent mb-3">
                How We Work
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary leading-tight">
                Implementation Roadmap
              </h2>
            </div>
            <div className="relative">
              {/* Vertical connector line */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-brand-accent/20 hidden md:block" />
              <div className="space-y-6">
                {industry.implementationRoadmap.map((phase, i) => (
                  <div
                    key={i}
                    className="relative flex gap-6 rounded-2xl bg-bg-base shadow-neu-flat p-6"
                  >
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-brand-accent flex items-center justify-center">
                      <span className="font-mono text-xs font-bold text-white">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <p className="font-mono text-xs text-brand-accent mb-1">
                        {phase.phase}
                      </p>
                      <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                        {phase.title}
                      </h3>
                      <p className="font-body text-sm text-text-secondary leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="py-20 bg-bg-dark">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-darkText-primary mb-6 leading-tight">
              Ready to build your {industry.name} digital system?
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand-accent text-white font-body font-medium px-7 py-3.5 rounded-2xl shadow-neu-accent hover:bg-brand-accentHover hover:-translate-y-0.5 transition-all duration-200"
              >
                Start Your Project
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 bg-bg-dark text-darkText-primary font-body font-medium px-7 py-3.5 rounded-2xl border border-white/10 shadow-neu-dark-flat hover:-translate-y-0.5 transition-all duration-200"
              >
                View All Solutions
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
