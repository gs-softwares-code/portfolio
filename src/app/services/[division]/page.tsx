import { serviceDivisions, getDivisionBySlug } from "@/data/servicesData";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export async function generateStaticParams() {
  return serviceDivisions.map((d) => ({ division: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ division: string }>;
}): Promise<Metadata> {
  const { division } = await params;
  const div = getDivisionBySlug(division);
  if (!div) return { title: "Service Not Found" };
  return {
    title: `${div.name} | GS-Softwares`,
    description: div.description,
  };
}

export default async function DivisionPage({
  params,
}: {
  params: Promise<{ division: string }>;
}) {
  const { division } = await params;
  const div = getDivisionBySlug(division);

  if (!div) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="bg-bg-base min-h-screen">
        {/* ── 1. Page Header ────────────────────────────────────────────── */}
        <section
          aria-labelledby="division-heading"
          className="py-24 md:py-32"
          style={{ backgroundColor: "#171C29" }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Number badge */}
            <div
              className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-6 shadow-neu-dark-flat"
              style={{ backgroundColor: `${div.accentColor}20` }}
            >
              <span
                className="font-mono text-lg font-bold"
                style={{ color: div.accentColor }}
              >
                {div.number}
              </span>
            </div>

            <h1
              id="division-heading"
              className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-darkText-primary leading-tight max-w-3xl mb-4"
            >
              {div.name}
            </h1>
            <p
              className="font-mono text-sm font-semibold mb-6"
              style={{ color: div.accentColor }}
            >
              {div.tagline}
            </p>
            <p className="font-body text-darkText-secondary text-base md:text-lg max-w-2xl leading-relaxed">
              {div.description}
            </p>
          </div>
        </section>

        {/* ── 2. Services Grid ──────────────────────────────────────────── */}
        <section
          aria-labelledby="services-grid-heading"
          className="py-20 md:py-28 bg-bg-base"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2
                id="services-grid-heading"
                className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-4 leading-snug"
              >
                {div.headline}
              </h2>
              <p className="font-body text-text-secondary text-base max-w-2xl leading-relaxed">
                {div.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {div.services.map((svc) => (
                <article
                  key={svc.name}
                  className="rounded-2xl bg-bg-base shadow-neu-flat p-6 md:p-8 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-heading text-base font-bold text-text-primary leading-snug flex-1 pr-3">
                      {svc.name}
                    </h3>
                    {/* Status badge */}
                    <span
                      className={`flex-shrink-0 font-mono text-xs font-semibold px-2.5 py-1 rounded-full ${
                        svc.status === "available"
                          ? "bg-brand-success/15 text-brand-success"
                          : "bg-text-secondary/10 text-text-secondary"
                      }`}
                    >
                      {svc.status === "available" ? "Available" : "Coming Soon"}
                    </span>
                  </div>
                  <p className="font-body text-sm text-text-secondary leading-relaxed flex-1">
                    {svc.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Why It Matters ─────────────────────────────────────────── */}
        <section
          aria-labelledby="why-matters-heading"
          className="py-16 md:py-20 bg-bg-base"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2
              id="why-matters-heading"
              className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mb-8"
            >
              Why It Matters
            </h2>
            <div className="rounded-2xl shadow-neu-pressed bg-bg-base p-8 md:p-12 max-w-3xl">
              <span
                className="block font-mono text-4xl font-bold mb-4 leading-none"
                style={{ color: div.accentColor }}
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="font-body text-text-primary text-lg md:text-xl leading-relaxed italic">
                {div.whyItMatters}
              </p>
            </div>
          </div>
        </section>

        {/* ── 4. Who Needs This ─────────────────────────────────────────── */}
        <section
          aria-labelledby="who-needs-heading"
          className="py-16 md:py-20 bg-bg-base"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2
              id="who-needs-heading"
              className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mb-8"
            >
              Is This Right for Your Business?
            </h2>
            <ul className="space-y-4 max-w-2xl">
              {div.whoNeedsThis.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: div.accentColor }}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span className="font-body text-text-secondary text-base leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 5. Technologies ───────────────────────────────────────────── */}
        <section
          aria-labelledby="tech-heading"
          className="py-16 md:py-20 bg-bg-base"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2
              id="tech-heading"
              className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mb-8"
            >
              Technologies We Use
            </h2>
            <div className="flex flex-wrap gap-3">
              {div.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-xl shadow-neu-flat px-4 py-2 font-mono text-sm text-text-secondary bg-bg-base"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. CTA Footer ─────────────────────────────────────────────── */}
        <section
          aria-labelledby="division-cta-heading"
          className="py-20 md:py-28"
          style={{ backgroundColor: "#171C29" }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2
              id="division-cta-heading"
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-darkText-primary mb-4 leading-tight"
            >
              Ready to discuss{" "}
              <span style={{ color: div.accentColor }}>{div.shortName}</span>{" "}
              for your business?
            </h2>
            <p className="font-body text-darkText-secondary text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Let&apos;s talk through your requirements and build something that
              actually works for your team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 font-body font-semibold text-sm px-7 py-3.5 rounded-2xl bg-brand-accent text-white shadow-neu-accent hover:bg-brand-accentHover hover:-translate-y-0.5 transition-all duration-200"
              >
                Start a Project
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 font-body font-semibold text-sm px-7 py-3.5 rounded-2xl bg-bg-dark text-darkText-primary border border-white/10 shadow-neu-dark-flat hover:shadow-neu-dark-flat-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Back to All Services
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
