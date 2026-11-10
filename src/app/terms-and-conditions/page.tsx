import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms and Conditions of Service | GS-Softwares",
  description:
    "Official enterprise Terms and Conditions governing custom engineering engagements, intellectual property rights, and commercial standards at GS-Softwares.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Navbar />

      <main className="pt-28 pb-20 md:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-bg-base shadow-neu-flat p-8 md:p-14 border border-white/40">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full shadow-neu-pressed-sm bg-bg-base text-brand-accent font-mono text-xs font-semibold uppercase tracking-widest mb-4">
              <span>Legal &amp; Commercial Framework</span>
            </div>
            
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">
              Terms and Conditions of Service
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted mb-8 pb-6 border-b border-black/5">
              <span><strong>Effective Date:</strong> November 10, 2026</span>
              <span>&bull;</span>
              <span><strong>Jurisdiction:</strong> Republic of India</span>
              <span>&bull;</span>
              <a href="https://gs-softwares-official.vercel.app/" className="text-brand-accent hover:underline">
                https://gs-softwares-official.vercel.app/
              </a>
            </div>

            <div className="space-y-8 font-body text-sm text-text-secondary leading-relaxed">
              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-3">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing this website, requesting a proposal, or engaging the services of GS-Softwares, you (the &quot;Client&quot;) agree to be legally bound by these Terms and Conditions. If you do not agree to these terms, you must immediately cease use of our website and services. These terms form the baseline of all subsequent engagements and may only be modified by a mutually executed, written Statement of Work (SOW).
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-3">
                  2. Nature of Services &amp; Performance Expectations
                </h2>
                <p className="mb-2">
                  GS-Softwares provides specialized engineering, automation, and custom software development services.
                </p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>
                    <strong className="text-text-primary">Deterministic Aids:</strong> Any AI, machine learning, or automation tools integrated into our solutions are provided as deterministic aids to enhance operational efficiency.
                  </li>
                  <li>
                    <strong className="text-text-primary">No Revenue Guarantees:</strong> We guarantee the functional delivery of the engineered system as explicitly scoped in the SOW. We do not guarantee specific business revenue outcomes, market adoption, or ROI, as these are subject to external market forces and client execution.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-3">
                  3. Intellectual Property Rights (The Blueprint Rule)
                </h2>
                <ul className="list-disc list-inside space-y-2.5 pl-2">
                  <li>
                    <strong className="text-text-primary">GS-Softwares Background IP:</strong> GS-Softwares retains all right, title, and interest in and to all pre-existing code, frameworks, orchestrators (including but not limited to &quot;Nexus Core&quot;), proprietary methodologies, and general know-how developed prior to or independently of this engagement.
                  </li>
                  <li>
                    <strong className="text-text-primary">Client Deliverable IP:</strong> Upon <strong>full and final payment</strong> of all invoices, the Client is granted a perpetual, worldwide, non-exclusive, non-transferable license to use the custom-delivered software for their internal business operations.
                  </li>
                  <li>
                    <strong className="text-text-primary">Source Code Buyout:</strong> GS-Softwares does not transfer ownership of the foundational source code of our core engines or frameworks unless explicitly contracted and paid for as a separate, full intellectual property buyout in a written agreement.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-3">
                  4. Financial Obligations &amp; Payment Terms
                </h2>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>
                    <strong className="text-text-primary">Engagement Requirement:</strong> All custom projects require a formal, signed Statement of Work (SOW) and a non-refundable initial deposit (typically 50% of the total project fee) before any engineering or architectural work commences.
                  </li>
                  <li>
                    <strong className="text-text-primary">Invoicing:</strong> Progress and final invoices are due <strong>Net-15 days</strong> from the invoice date.
                  </li>
                  <li>
                    <strong className="text-text-primary">Late Payments:</strong> Overdue balances will incur a late fee of <strong>1.5% per month</strong> (or the maximum rate permitted by law, whichever is lower). GS-Softwares reserves the right to immediately suspend all services, system access, and support until the account is brought current.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-3">
                  5. Client Responsibilities
                </h2>
                <p className="mb-2">
                  The success of the project depends on timely Client cooperation. The Client agrees to:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 mb-3">
                  <li>Provide accurate, comprehensive business requirements.</li>
                  <li>Deliver timely feedback and approvals at designated project milestones.</li>
                  <li>Provide necessary access credentials, APIs, and third-party accounts securely.</li>
                </ul>
                <p className="text-xs text-text-muted italic">
                  <strong>Delays:</strong> Delays caused by the Client&apos;s failure to meet these responsibilities will automatically extend project timelines and may incur additional maintenance or resource reallocation fees.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-3">
                  6. Limitation of Liability
                </h2>
                <ul className="list-disc list-inside space-y-2.5 pl-2">
                  <li>
                    <strong className="text-text-primary">Exclusion of Consequential Damages:</strong> To the maximum extent permitted by law, GS-Softwares shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, loss of data, business interruption, or reputational harm, arising from the use or inability to use our software or services.
                  </li>
                  <li>
                    <strong className="text-text-primary">Liability Cap:</strong> GS-Softwares&apos; total aggregate liability for any and all claims arising out of or related to these Terms or any SOW shall be strictly capped at the total amount actually paid by the Client to GS-Softwares in the <strong>six (6) months</strong> preceding the event giving rise to the claim. We do not assume liability for a client&apos;s operational mismanagement or misuse of the delivered systems.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-3">
                  7. Term &amp; Termination
                </h2>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>Either party may terminate an active project agreement by providing thirty (30) days written notice to the other party.</li>
                  <li>Upon termination, the Client remains strictly liable for payment for all work completed, hours logged, and expenses incurred up to the effective date of termination.</li>
                  <li>GS-Softwares reserves the right to immediately disable access to any hosted services, repositories, or administrative dashboards upon termination for non-payment.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-3">
                  8. Governing Law &amp; Dispute Resolution
                </h2>
                <div className="p-4 rounded-xl bg-bg-base shadow-neu-pressed space-y-2 border border-black/5">
                  <p>
                    <strong className="text-text-primary">Governing Law:</strong> These Terms and any disputes arising out of or related to them shall be governed by and construed in accordance with the laws of the <strong>Republic of India</strong>, without regard to its conflict of law principles.
                  </p>
                  <p>
                    <strong className="text-text-primary">Dispute Resolution:</strong> To ensure efficient, confidential, and cost-effective resolution, any dispute, controversy, or claim arising out of these Terms shall first be subject to good-faith negotiation between senior representatives of both parties. If unresolved within thirty (30) days, the dispute shall be finally settled by <strong>binding arbitration</strong> in <strong>Chandigarh, Punjab</strong>, in accordance with the Arbitration and Conciliation Act, 1996. Both parties explicitly waive their right to resolve disputes through traditional court litigation, acknowledging arbitration as the exclusive remedy.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-lg font-bold text-text-primary mb-3">
                  9. Contact Information
                </h2>
                <p>
                  For any legal, privacy, or terms-related inquiries, please contact us at:
                </p>
                <p className="font-mono text-xs mt-1">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:gssoftwares.official@gmail.com" className="text-brand-accent underline">
                    gssoftwares.official@gmail.com
                  </a>
                  <br />
                  <strong>Website:</strong>{" "}
                  <a href="https://gs-softwares-official.vercel.app/" className="text-brand-accent underline">
                    https://gs-softwares-official.vercel.app/
                  </a>
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
