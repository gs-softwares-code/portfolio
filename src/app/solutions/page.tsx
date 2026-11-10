import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { industrySolutions } from "@/data/industriesData";

export const metadata = {
  title: "Industry Solutions | GS-Softwares",
  description:
    "Digital solutions built for hospitality, fitness, beauty, professional services, retail, education, real estate, and growing businesses.",
};

const iconMap: Record<string, string> = {
  utensils: "🍽️",
  dumbbell: "🏋️",
  sparkles: "✨",
  briefcase: "💼",
  "shopping-bag": "🛍️",
  "graduation-cap": "🎓",
  "building-2": "🏢",
  rocket: "🚀",
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
              {industrySolutions.map((industry) => (
                <div
                  key={industry.id}
                  className="group rounded-2xl bg-bg-base shadow-neu-flat hover:-translate-y-1 hover:shadow-neu-flat-lg transition-all duration-300 p-6 flex flex-col"
                >
                  {/* Icon + name */}
                  <div className="mb-4">
                    <div className="text-3xl mb-3">
                      {iconMap[industry.iconKey] ?? "⚙️"}
                    </div>
                    <h2 className="font-heading text-lg font-bold text-text-primary leading-snug">
                      {industry.name}
                    </h2>
                    <p className="font-mono text-xs text-brand-accent mt-1 leading-relaxed">
                      {industry.tagline}
                    </p>
                  </div>

                  {/* Key problems */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {industry.problems.slice(0, 3).map((problem, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                        <span className="font-body text-xs text-text-secondary leading-relaxed">
                          {problem}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA link */}
                  <Link
                    href={`/solutions/${industry.slug}`}
                    className="mt-auto inline-flex items-center gap-1 font-mono text-xs font-semibold text-brand-accent hover:text-brand-accentHover transition-colors duration-200"
                  >
                    Explore Solutions →
                  </Link>
                </div>
              ))}
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
