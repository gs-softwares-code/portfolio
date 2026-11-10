import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | GS-Softwares",
  description: "Privacy policy and data governance practices at GS-Softwares.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Navbar />

      <main className="pt-28 pb-20 md:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-bg-base shadow-neu-flat p-8 md:p-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full shadow-neu-pressed-sm bg-bg-base text-brand-accent font-mono text-xs font-semibold uppercase tracking-widest mb-4">
              <span>Legal &amp; Data Governance</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Privacy Policy
            </h1>
            <p className="font-mono text-xs text-text-muted mb-8">
              Effective Date: November 10, 2026 &bull; Compliant with DPDP Act 2023 &amp; Global Privacy Standards
            </p>

            <div className="space-y-8 font-body text-sm text-text-secondary leading-relaxed">
              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-2">
                  1. Information We Collect
                </h2>
                <p>
                  GS-Softwares (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects only the minimal personal information necessary to deliver our engineering consultation and software development services. When you submit a project inquiry, we collect:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Full Name and Business Name</li>
                  <li>Business Email Address and Phone Number (if provided)</li>
                  <li>Industry, Required Services, and Project Requirements</li>
                  <li>Technical metadata (IP address and timestamp for anti-spam verification)</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-2">
                  2. How We Use Your Data
                </h2>
                <p>
                  Your information is utilized solely for reviewing project inquiries, responding with architectural proposals, and facilitating engineering communication. We do not sell, rent, monetize, or disclose your contact information to third-party data brokers or marketing aggregators.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-2">
                  3. Infrastructure &amp; Security
                </h2>
                <p>
                  Inquiry submissions are processed using TLS-encrypted transmission, verified with server-side validation schemas, and transmitted via secure transactional email relays (Resend) or stored in protected application directories. We apply industry-standard defensive controls to safeguard against unauthorized access.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-2">
                  4. Data Retention &amp; Your Rights
                </h2>
                <p>
                  Inquiry records are retained for up to 12 months for active technical consultation and then securely purged. Under India&apos;s Digital Personal Data Protection Act (DPDP) and applicable global regulations, you have the right to request access, correction, or permanent erasure of your personal data by contacting us at{" "}
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

