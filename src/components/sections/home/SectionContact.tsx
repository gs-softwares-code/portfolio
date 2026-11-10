"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormErrors {
  fullName?: string;
  businessName?: string;
  email?: string;
  industry?: string;
  services?: string;
  description?: string;
  terms?: string;
}

const industryOptions = [
  { value: "hospitality", label: "Hospitality (Café / Restaurant / Hotel)" },
  { value: "health-fitness", label: "Health & Fitness (Gym / Studio)" },
  { value: "beauty-wellness", label: "Beauty & Wellness (Salon / Spa)" },
  { value: "professional-services", label: "Legal & Professional Services" },
  { value: "retail-commerce", label: "Retail & Commerce" },
  { value: "education", label: "Education & Academies" },
  { value: "real-estate", label: "Real Estate & Brokerage" },
  { value: "sme", label: "Growing SME" },
  { value: "other", label: "Other" },
];

const availableServices = [
  { id: "digital-presence", label: "Digital Presence & Websites" },
  { id: "applications", label: "Applications & Business Systems" },
  { id: "ai-automation", label: "AI & Workflow Automation" },
  { id: "analytics", label: "Analytics & Business Intelligence" },
  { id: "digital-growth", label: "SEO & Digital Visibility" },
  { id: "infrastructure", label: "Infrastructure & Technical Support" },
];

const budgetRanges = [
  "Under ₹25,000",
  "₹25,000 – ₹1,00,000",
  "₹1,00,000 – ₹5,00,000",
  "Above ₹5,00,000",
  "International Project (USD/EUR)",
  "Not Sure / Let's Discuss",
];

const contactMethods = [
  { value: "email", label: "Email" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "phone", label: "Phone Call" },
];

export const SectionContact: React.FC = () => {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("India");
  const [industry, setIndustry] = useState("hospitality");
  const [selectedServices, setSelectedServices] = useState<string[]>(["digital-presence"]);
  const [budgetRange, setBudgetRange] = useState("₹25,000 – ₹1,00,000");
  const [preferredContact, setPreferredContact] = useState("email");
  const [description, setDescription] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((s) => s !== id) : prev) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    if (!fullName.trim() || fullName.length < 2) newErrors.fullName = "Full name is required (min 2 chars).";
    if (!businessName.trim() || businessName.length < 2) newErrors.businessName = "Business name is required.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Valid email is required.";
    if (selectedServices.length === 0) newErrors.services = "Select at least one service.";
    if (!description.trim() || description.length < 10) newErrors.description = "Please provide more details (min 10 chars).";
    if (!agreedToTerms) newErrors.terms = "You must agree to the Terms & Conditions and Privacy Policy to submit.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setFormState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          businessName,
          email,
          phone: phone.trim() || null,
          country,
          industry,
          service: selectedServices[0], // for backwards compatibility
          services: selectedServices,
          budgetRange,
          preferredContact,
          description,
          website,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.message || "Failed to submit inquiry. Please try again.");
        setFormState("error");
        return;
      }

      setFormState("success");
    } catch {
      setErrorMessage("Network error. Please check your internet connection.");
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <section id="contact" className="py-24 bg-bg-base">
        <div className="mx-auto max-w-xl px-4 text-center">
          <div className="rounded-3xl bg-bg-base shadow-neu-flat p-10 md:p-14">
            <CheckCircle2 className="h-14 w-14 text-brand-success mx-auto mb-5" />
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-3">
              Inquiry Received
            </h3>
            <p className="font-body text-text-secondary text-sm md:text-base leading-relaxed mb-6">
              Thank you for reaching out to GS-Softwares. We have logged your project inquiry and will analyze your requirements. Expect an architectural follow-up within 1–2 business days.
            </p>
            <button
              onClick={() => setFormState("idle")}
              className="px-6 py-2.5 rounded-xl shadow-neu-flat hover:shadow-neu-pressed font-medium text-xs text-brand-accent bg-bg-base transition-all"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-bg-base relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full shadow-neu-pressed-sm bg-bg-base text-brand-accent font-mono text-xs font-semibold uppercase tracking-widest mb-4">
            <span>Direct Inquiry</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Start Your Project.
          </h2>
          <p className="font-body text-base text-text-secondary leading-relaxed">
            Tell us about your business bottlenecks or technical aspirations. We engineer systems that deliver real ROI.
          </p>
        </div>

        <div className="rounded-3xl bg-bg-base shadow-neu-flat p-8 md:p-12">
          {formState === "error" && (
            <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-600 text-sm">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot field */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jaspreet Singh"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-bg-base shadow-neu-pressed text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block font-mono text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Hospitality Group"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-bg-base shadow-neu-pressed text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                />
                {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block font-mono text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                  Business Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-bg-base shadow-neu-pressed text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block font-mono text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-bg-base shadow-neu-pressed text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                  Country / Region
                </label>
                <input
                  type="text"
                  placeholder="India, USA, UK, etc."
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-bg-base shadow-neu-pressed text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                  Primary Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-bg-base shadow-neu-pressed text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                >
                  {industryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                  Budget Expectation
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-bg-base shadow-neu-pressed text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
                >
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Multi-select Services */}
            <div>
              <label className="block font-mono text-xs font-semibold text-text-primary uppercase tracking-wider mb-3">
                Required Services (Select all that apply) *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {availableServices.map((svc) => {
                  const isSelected = selectedServices.includes(svc.id);
                  return (
                    <button
                      type="button"
                      key={svc.id}
                      onClick={() => toggleService(svc.id)}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                        isSelected
                          ? "bg-bg-base shadow-neu-pressed text-brand-accent font-semibold border border-brand-accent/30"
                          : "bg-bg-base shadow-neu-flat text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {svc.label}
                    </button>
                  );
                })}
              </div>
              {errors.services && <p className="text-red-500 text-xs mt-1">{errors.services}</p>}
            </div>

            <div>
              <label className="block font-mono text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                Preferred Contact Method
              </label>
              <div className="flex gap-4">
                {contactMethods.map((m) => (
                  <label key={m.value} className="flex items-center gap-2 text-xs font-medium text-text-secondary cursor-pointer">
                    <input
                      type="radio"
                      name="contactMethod"
                      value={m.value}
                      checked={preferredContact === m.value}
                      onChange={(e) => setPreferredContact(e.target.value)}
                      className="text-brand-accent focus:ring-brand-accent"
                    />
                    <span>{m.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                Project Overview &amp; Operational Challenges *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe what you want to build, current operational bottlenecks, and your expected timeline..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-bg-base shadow-neu-pressed text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all"
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Terms and Privacy Policy Consent */}
            <div>
              <label className="flex items-start gap-3 text-xs font-body text-text-secondary cursor-pointer p-3 rounded-xl bg-bg-base shadow-neu-pressed-sm border border-black/5">
                <input
                  type="checkbox"
                  required
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 rounded text-brand-accent focus:ring-brand-accent h-4 w-4"
                />
                <span className="leading-relaxed">
                  I agree to the{" "}
                  <Link
                    href="/terms-and-conditions"
                    target="_blank"
                    className="text-brand-accent font-semibold hover:underline"
                  >
                    Terms &amp; Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    target="_blank"
                    className="text-brand-accent font-semibold hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={formState === "submitting"}
                className="w-full py-4 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white font-semibold text-sm transition-all shadow-neu-accent flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {formState === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <span>Submit Project Inquiry</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

