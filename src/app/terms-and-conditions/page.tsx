import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | GS-Softwares",
  description: "Terms and conditions of service for GS-Softwares digital engineering and consultancy.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Navbar />

      <main className="pt-28 pb-20 md:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-bg-base shadow-neu-flat p-8 md:p-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full shadow-neu-pressed-sm bg-bg-base text-brand-accent font-mono text-xs font-semibold uppercase tracking-widest mb-4">
              <span>Client Agreement &amp; Standards</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Terms &amp; Conditions
            </h1>
            <p className="font-mono text-xs text-text-muted mb-8">
              Effective Date: November 10, 2026
            </p>

            <div className="space-y-8 font-body text-sm text-text-secondary leading-relaxed">
              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-2">
                  1. Scope of Services
                </h2>
                <p>
                  GS-Softwares provides bespoke software engineering, website development, application design, workflow automation, and technical consultancy. Formal project engagements are governed by mutually executed Statement of Work (SOW) documents defining exact deliverables, timelines, and commercial terms.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-2">
                  2. Intellectual Property
                </h2>
                <p>
                  Upon complete settlement of agreed project fees, full intellectual property and ownership rights for customized software artifacts and source code are assigned to the client, excluding any pre-existing open-source libraries or underlying frameworks utilized under their respective public licenses.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-2">
                  3. Commercial Transparency &amp; Hosting
                </h2>
                <p>
                  Development fees compensate direct engineering, architecture, and deployment efforts. External infrastructure expenses — including third-party domain registrations, serverless cloud consumption, dedicated hosting nodes, and proprietary API quotas (e.g., OpenAI, Resend, WhatsApp Business API) — remain separate and are paid directly to respective providers or billed transparently.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-2">
                  4. Warranties &amp; Performance
                </h2>
                <p>
                  We build to rigorous architectural standards with extensive automated testing. However, we do not promise arbitrary search engine rank positions, guaranteed lead volumes, or speculative revenue increases, as these depend on broader business variables beyond technical control.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-2">
                  5. Inquiries &amp; Governance
                </h2>
                <p>
                  For any questions regarding these terms, reach us directly at{" "}
                  <a
                    href="mailto:gssoftwares.official@gmail.com"
                    className="text-brand-accent underline"
                  >
                    gssoftwares.official@gmail.com
                  </a>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

