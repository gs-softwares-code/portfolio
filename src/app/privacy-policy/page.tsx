import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | GS-Softwares",
  description:
    "Official enterprise privacy policy detailing data minimization, zero-trust security architecture, and client data protection at GS-Softwares.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Navbar />

      <main className="pt-28 pb-20 md:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-bg-base shadow-neu-flat p-8 md:p-14 border border-white/40">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full shadow-neu-pressed-sm bg-bg-base text-brand-accent font-mono text-xs font-semibold uppercase tracking-widest mb-4">
              <span>Enterprise Governance</span>
            </div>
            
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">
              Privacy Policy
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted mb-8 pb-6 border-b border-black/5">
              <span><strong>Effective Date:</strong> November 10, 2026</span>
              <span>&bull;</span>
              <span><strong>Entity:</strong> GS-Softwares</span>
              <span>&bull;</span>
              <a href="https://gs-softwares-official.vercel.app/" className="text-brand-accent hover:underline">
                https://gs-softwares-official.vercel.app/
              </a>
            </div>

            <div className="space-y-8 font-body text-sm text-text-secondary leading-relaxed">
              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-3">
                  1. Introduction &amp; Scope
                </h2>
                <p>
                  GS-Softwares (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy and security of your data. This Privacy Policy outlines how we collect, use, disclose, and safeguard information when you visit our website, engage our services, or interact with our deployed systems. This policy applies to all visitors, prospective clients, and active enterprise clients of GS-Softwares.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-3">
                  2. Information We Collect
                </h2>
                <p className="mb-3">
                  We adhere to a strict principle of data minimization, collecting only what is necessary for service delivery and system security.
                </p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>
                    <strong className="text-text-primary">Voluntarily Provided Data:</strong> Information you submit via our contact forms or during onboarding, including name, business name, email address, phone number, and industry.
                  </li>
                  <li>
                    <strong className="text-text-primary">Automated Telemetry:</strong> Non-personally identifiable information collected for performance, security, and analytics purposes. This includes IP addresses, browser type, device information, and site interaction metrics. This data is used for infrastructure optimization and threat detection, not for intrusive tracking.
                  </li>
                  <li>
                    <strong className="text-text-primary">Client Project Data:</strong> Operational data, business logic, and credentials explicitly provided by clients solely for the purpose of designing, building, and maintaining their custom software solutions.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-3">
                  3. How We Use Your Information
                </h2>
                <p className="mb-3">
                  Your data is utilized strictly for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-2 mb-3">
                  <li>To respond to inquiries, provide requested services, and execute Statements of Work (SOW).</li>
                  <li>To maintain, secure, and optimize our digital infrastructure (e.g., monitoring via Cloudflare and Supabase telemetry).</li>
                </ul>
                <div className="p-4 rounded-xl bg-bg-base shadow-neu-pressed border border-brand-accent/20">
                  <p className="text-text-primary font-medium">
                    <strong>Explicit Guarantee:</strong> GS-Softwares <strong>does not sell, rent, lease, or trade</strong> your personal or business data to third-party marketers or data brokers. Data is treated as a tool for service delivery, not a commodity.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-3">
                  4. Data Security &amp; Zero-Trust Architecture
                </h2>
                <p className="mb-3">
                  We employ enterprise-grade security measures to protect your information, including:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-2 mb-3">
                  <li>Encryption of data in transit (TLS 1.2/1.3) and at rest.</li>
                  <li>Secure, isolated backend environments with strict Role-Based Access Control (RBAC).</li>
                  <li>Continuous monitoring via zero-trust security principles.</li>
                </ul>
                <p className="text-xs text-text-muted italic">
                  <strong>Acknowledgment:</strong> While we engineer our systems for maximum security, no digital system is 100% immune to unprecedented force majeure events or sophisticated, state-level cyber threats. We commit to immediate notification and mitigation in the unlikely event of a breach.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-3">
                  5. Third-Party Service Providers
                </h2>
                <p className="mb-2">
                  To deliver our services, we rely on a vetted supply chain of enterprise infrastructure partners, including but not limited to: <strong>Vercel, Cloudflare, Supabase, GitHub, Resend, and Google Apps Script</strong>.
                </p>
                <p>
                  These partners have their own independent privacy policies. We share data with them strictly on a need-to-know basis to ensure system functionality, deployment, and security. We do not grant these partners the right to use your data for their own independent marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-3">
                  6. User Rights &amp; Data Control
                </h2>
                <p className="mb-3">
                  Depending on your jurisdiction, you may have the right to:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 mb-4">
                  <li>Request access to the personal data we hold about you.</li>
                  <li>Request correction of inaccurate or incomplete data.</li>
                  <li>Request deletion of your personal data, subject to legal and contractual retention requirements.</li>
                </ul>
                <p>
                  To exercise these rights, please submit a formal request to{" "}
                  <a href="mailto:gssoftwares.official@gmail.com" className="text-brand-accent underline font-mono">
                    gssoftwares.official@gmail.com
                  </a>. We are committed to responding to all verified privacy requests within <strong>14 to 30 days</strong>.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-3">
                  7. Cookies &amp; Tracking Technologies
                </h2>
                <p>
                  We use essential cookies and local storage mechanisms strictly for site functionality, session management, and performance analytics. We do not deploy third-party advertising or cross-site tracking cookies.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-3">
                  8. Policy Updates
                </h2>
                <p>
                  GS-Softwares reserves the right to update this Privacy Policy at any time to reflect changes in our practices or regulatory requirements. The updated policy will be posted on this page with a revised &quot;Effective Date.&quot; Your continued use of our website or services constitutes acceptance of the revised terms.
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
