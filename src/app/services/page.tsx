import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { serviceDivisions } from "@/data/servicesData";

export const metadata: Metadata = {
  title: "Services | GS-Softwares",
  description:
    "GS-Softwares offers six focused service divisions covering the full spectrum of digital needs — from websites and branding to AI automation, analytics, and technical infrastructure.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-bg-base min-h-screen">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="services-hero-heading"
          className="bg-bg-dark py-24 md:py-32"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent mb-4">
              What We Build
            </p>
            <h1
              id="services-hero-heading"
              className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-darkText-primary leading-tight max-w-3xl mb-6"
            >
              Six Service Divisions.{" "}
              <span className="text-darkText-secondary font-normal">
                One Engineering Agency.
              </span>
            </h1>
            <p className="font-body text-darkText-secondary text-base md:text-lg max-w-2xl leading-relaxed">
              We cover the full spectrum of digital needs — from your first
              website to complex AI-powered business systems. Select a division
              to explore its services.
            </p>
          </div>
        </section>

        {/* ── Division Grid ─────────────────────────────────────────────── */}
        <section
          aria-labelledby="divisions-heading"
          className="py-20 md:py-28"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="divisions-heading" className="sr-only">
              Service Divisions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceDivisions.map((div) => (
                <article
                  key={div.id}
                  className="group rounded-2xl bg-bg-base shadow-neu-flat transition-all duration-300 hover:shadow-neu-flat-lg hover:-translate-y-1 p-6 md:p-8 flex flex-col"
                >
                  {/* Number + Name */}
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="font-mono text-3xl font-bold leading-none"
                      style={{ color: div.accentColor }}
                    >
                      {div.number}
                    </span>
                  </div>

                  <h2 className="font-heading text-xl font-bold text-text-primary mb-1 leading-snug">
                    {div.name}
                  </h2>
                  <p className="font-body text-xs text-text-secondary mb-5 leading-relaxed">
                    {div.tagline}
                  </p>

                  {/* First 3 services */}
                  <ul className="space-y-2 flex-1 mb-6">
                    {div.services.slice(0, 3).map((svc) => (
                      <li
                        key={svc.name}
                        className="flex items-start gap-2 font-body text-sm text-text-secondary"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: div.accentColor }}
                          aria-hidden="true"
                        />
                        {svc.name}
                      </li>
                    ))}
                    {div.services.length > 3 && (
                      <li className="font-body text-xs text-text-secondary/60 pl-3.5">
                        +{div.services.length - 3} more services
                      </li>
                    )}
                  </ul>

                  {/* CTA */}
                  <div className="mt-auto pt-5 border-t border-black/5">
                    <Link
                      href={`/services/${div.slug}`}
                      className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-brand-accent hover:text-brand-accentHover transition-colors group/link"
                    >
                      Explore Division
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover/link:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Section ───────────────────────────────────────────────── */}
        <section
          aria-labelledby="cta-heading"
          className="py-20 md:py-28"
          style={{ backgroundColor: "#171C29" }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2
              id="cta-heading"
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-darkText-primary mb-4 leading-tight"
            >
              Not sure which services you need?
            </h2>
            <p className="font-body text-darkText-secondary text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Tell us about your business and we&apos;ll recommend the right
              combination.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 font-body font-semibold text-sm px-7 py-3.5 rounded-2xl bg-brand-accent text-white shadow-neu-accent hover:bg-brand-accentHover hover:-translate-y-0.5 transition-all duration-200"
              >
                Discuss Your Requirements
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center gap-2 font-body font-semibold text-sm px-7 py-3.5 rounded-2xl bg-bg-dark text-darkText-primary border border-white/10 shadow-neu-dark-flat hover:shadow-neu-dark-flat-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Explore Industry Solutions
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
