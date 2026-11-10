import Link from "next/link";
import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Section05Philosophy } from "@/components/sections/Section05Philosophy";

export const metadata: Metadata = {
  title: "About | GS-Softwares",
  description:
    "GS-Softwares is a hybrid digital solutions and AI engineering agency — building websites, business applications, automation systems, and analytics platforms for growing businesses.",
};

const whatWeBuild = [
  "Professional Websites & Landing Pages",
  "Business Management Applications",
  "AI-Powered Automation Systems",
  "Sales & Operations Analytics Dashboards",
  "E-commerce & Digital Storefronts",
  "Custom Client & Staff Portals",
];

const whoWeServe = [
  "Independent cafes, restaurants, and hospitality businesses",
  "Gyms, fitness studios, and wellness centres",
  "Salons, spas, and beauty businesses",
  "Retail shops and online sellers",
  "Coaching institutes, schools, and academies",
  "Real estate agents, brokers, and developers",
  "Professional service firms and consultants",
  "Growing SMEs ready to scale operations",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Navbar />
      <main>
        {/* ── Dark Hero ─────────────────────────────────────────────────── */}
        <section className="pt-32 pb-24 bg-bg-dark">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <p className="font-mono text-xs tracking-widest uppercase text-brand-accent mb-4">
              Who We Are
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-darkText-primary mb-4 leading-tight">
              About GS-Softwares
            </h1>
            <p className="font-body text-darkText-secondary text-xl">
              Hybrid Digital Solutions &amp; AI Engineering Agency
            </p>
          </div>
        </section>

        {/* ── Brand Philosophy ──────────────────────────────────────────── */}
        <section className="py-20 bg-bg-base">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-brand-accent mb-4">
                  Brand Philosophy
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-2 leading-tight">
                  We Engineer Intelligence.
                </h2>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-secondary mb-6 leading-tight">
                  You Build the Future.
                </h2>
                <p className="font-body text-text-secondary leading-relaxed mb-4">
                  GS-Softwares exists at the intersection of digital craft and
                  business intelligence. We don&apos;t sell template-based
                  websites or one-size-fits-all software. We build purpose-built
                  systems — engineered around the specific workflows, users, and
                  constraints of your business.
                </p>
                <p className="font-body text-text-secondary leading-relaxed">
                  Our work spans the complete digital stack: from customer-facing
                  websites that convert visitors to business management platforms
                  that eliminate manual processes — connected by automation and
                  analytics that turn your operations into intelligence.
                </p>
              </div>
              <div className="rounded-2xl bg-bg-dark shadow-neu-dark-flat p-8">
                <p className="font-mono text-xs tracking-widest uppercase text-brand-accent mb-3">
                  Our Mission
                </p>
                <p className="font-heading text-xl font-bold text-darkText-primary mb-4 leading-snug">
                  From Digital Presence to Business Intelligence.
                </p>
                <p className="font-body text-sm text-darkText-secondary leading-relaxed">
                  Every engagement starts with understanding your business —
                  not selling you a package. We study your operations, identify
                  friction points, and engineer systems that address the actual
                  problems. The result is technology that fits your business,
                  not the other way around.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── What We Build ─────────────────────────────────────────────── */}
        <section className="py-20 bg-bg-base">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="font-mono text-xs tracking-widest uppercase text-brand-accent mb-3">
                Our Services
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary leading-tight">
                What We Build
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {whatWeBuild.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-2xl bg-bg-base shadow-neu-flat p-5"
                >
                  <span className="flex-shrink-0 h-8 w-8 rounded-lg bg-brand-accent/10 flex items-center justify-center">
                    <span className="font-mono text-xs font-bold text-brand-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="font-body text-sm text-text-primary font-medium leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Who We Serve ──────────────────────────────────────────────── */}
        <section className="py-20 bg-bg-dark">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="font-mono text-xs tracking-widest uppercase text-brand-accent mb-3">
                  Our Clients
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-darkText-primary mb-4 leading-tight">
                  Who We Serve
                </h2>
                <p className="font-body text-darkText-secondary leading-relaxed mb-6">
                  India-first. International-ready. We work with business owners
                  who are ready to invest in systems that actually work — from
                  local businesses in Punjab to growing enterprises across the
                  country.
                </p>
                <div className="inline-flex items-center gap-2 rounded-xl bg-brand-accent/10 border border-brand-accent/20 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-brand-accent" />
                  <span className="font-mono text-xs text-brand-accent font-semibold">
                    India-First. International-Ready.
                  </span>
                </div>
              </div>
              <ul className="space-y-3">
                {whoWeServe.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                    <span className="font-body text-sm text-darkText-secondary leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Engineering Philosophy ────────────────────────────────────── */}
        <Section05Philosophy />

        {/* ── GitHub Section ────────────────────────────────────────────── */}
        <section className="py-16 bg-bg-base">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <div className="rounded-2xl bg-bg-base shadow-neu-flat p-8 md:p-10">
              <p className="font-mono text-xs tracking-widest uppercase text-brand-accent mb-3">
                Open Source
              </p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4">
                Our Engineering, Visible.
              </h2>
              <p className="font-body text-text-secondary mb-8 max-w-xl mx-auto leading-relaxed">
                Every project we build is authentic — real technology, real
                problems, real code. View our open projects on GitHub and judge
                the quality of our engineering directly.
              </p>
              <a
                href="https://github.com/gs-softwares-code"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-bg-dark text-darkText-primary font-body font-medium px-7 py-3.5 rounded-2xl border border-white/10 shadow-neu-dark-flat hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                View our open projects on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section className="py-20 bg-bg-dark">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <p className="font-mono text-xs tracking-widest uppercase text-brand-accent mb-4">
              Ready to Work Together?
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-darkText-primary mb-8 leading-tight">
              Work with GS-Softwares
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand-accent text-white font-body font-medium px-7 py-3.5 rounded-2xl shadow-neu-accent hover:bg-brand-accentHover hover:-translate-y-0.5 transition-all duration-200"
              >
                Start a Project
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-bg-dark text-darkText-primary font-body font-medium px-7 py-3.5 rounded-2xl border border-white/10 shadow-neu-dark-flat hover:-translate-y-0.5 transition-all duration-200"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
