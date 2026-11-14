import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { industrySolutions } from "@/data/industriesData";
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

export const metadata = {
  title: "Industry Solutions | GS-Softwares",
  description:
    "Digital solutions built for hospitality, fitness, beauty, professional services, retail, education, real estate, and growing businesses.",
};

const iconMap: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  utensils: {
    icon: Utensils,
    color: "text-[#F59E0B]",
    bg: "bg-[#F59E0B]/10",
  },
  dumbbell: {
    icon: Dumbbell,
    color: "text-[#10B981]",
    bg: "bg-[#10B981]/10",
  },
  sparkles: {
    icon: Sparkles,
    color: "text-[#EC4899]",
    bg: "bg-[#EC4899]/10",
  },
  briefcase: {
    icon: Briefcase,
    color: "text-[#4A65DC]",
    bg: "bg-[#4A65DC]/10",
  },
  "shopping-bag": {
    icon: ShoppingBag,
    color: "text-[#F97316]",
    bg: "bg-[#F97316]/10",
  },
  "graduation-cap": {
    icon: GraduationCap,
    color: "text-[#8B5CF6]",
    bg: "bg-[#8B5CF6]/10",
  },
  "building-2": {
    icon: Building2,
    color: "text-[#0EA5E9]",
    bg: "bg-[#0EA5E9]/10",
  },
  rocket: {
    icon: Rocket,
    color: "text-[#36A783]",
    bg: "bg-[#36A783]/10",
  },
};

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Navbar />
      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="pt-32 pb-20 bg-bg-base">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <p className="font-mono text-xs tracking-widest uppercase text-brand-accent mb-4">
              Solutions by Industry
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
              Built for Businesses Like Yours.
            </h1>
            <p className="font-body text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              We engineer industry-specific digital solutions that address the
              actual challenges your business faces — not generic templates
              applied to every sector.
            </p>
          </div>
        </section>

        {/* ── Industry Grid ─────────────────────────────────────────────── */}
        <section className="py-16 bg-bg-base">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {industrySolutions.map((industry) => {
                const iconConfig = iconMap[industry.iconKey] ?? {
                  icon: Rocket,
                  color: "text-brand-accent",
                  bg: "bg-brand-accent/10",
                };
                const IconComponent = iconConfig.icon;

                return (
                  <div
                    key={industry.id}
                    className="group rounded-3xl bg-bg-base shadow-neu-flat hover:-translate-y-1 hover:shadow-neu-flat-lg transition-all duration-300 p-5 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Bar: Icon + Category Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`p-3 rounded-2xl shadow-neu-pressed-sm ${iconConfig.bg} ${iconConfig.color}`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <span className="font-mono text-[10px] uppercase font-bold text-text-muted bg-bg-base px-2.5 py-1 rounded-full shadow-neu-flat">
                          {industry.shortName}
                        </span>
                      </div>

                      {/* Dynamic 5-Second Fade Image Space */}
                      {industry.galleryImages && industry.galleryImages.length > 0 && (
                        <div className="mb-4">
                          <IndustryImageSlider
                            images={industry.galleryImages}
                            intervalMs={5000}
                            categoryName={industry.name}
                          />
                        </div>
                      )}

                      {/* Title & Tagline */}
                      <div className="mb-4">
                        <h2 className="font-heading text-lg font-bold text-text-primary leading-snug group-hover:text-brand-accent transition-colors">
                          {industry.name}
                        </h2>
                        <p className="font-mono text-xs text-brand-accent mt-1 leading-relaxed">
                          {industry.tagline}
                        </p>
                      </div>

                      {/* Key problems */}
                      <ul className="space-y-2 mb-6">
                        {industry.problems.slice(0, 3).map((problem, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                            <span className="font-body text-xs text-text-secondary leading-relaxed">
                              {problem}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA link */}
                    <Link
                      href={`/solutions/${industry.slug}`}
                      className="mt-2 inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl font-mono text-xs font-semibold text-brand-accent bg-bg-base shadow-neu-flat hover:shadow-neu-pressed transition-all"
                    >
                      <span>Explore Solutions</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA Section ───────────────────────────────────────────────── */}
        <section className="py-20 bg-bg-dark">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <p className="font-mono text-xs tracking-widest uppercase text-brand-accent mb-4">
              Your Industry. Your Challenges.
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-darkText-primary mb-6 leading-tight">
              Every industry has unique digital challenges.
              <br />
              <span className="text-darkText-secondary font-normal">
                We engineer solutions around yours.
              </span>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-accent text-white font-body font-medium px-7 py-3.5 rounded-2xl shadow-neu-accent hover:bg-brand-accentHover hover:-translate-y-0.5 transition-all duration-200"
            >
              Discuss Your Industry
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
