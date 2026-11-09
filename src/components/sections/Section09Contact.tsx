"use client";

import React, { useEffect, useRef, useState, useId } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { NeumorphicInput } from "@/components/ui/NeumorphicInput";
import { NeumorphicSelect } from "@/components/ui/NeumorphicSelect";
import { NeumorphicButton } from "@/components/ui/NeumorphicButton";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormErrors {
  fullName?: string;
  businessName?: string;
  email?: string;
  industry?: string;
  service?: string;
  description?: string;
}

const industryOptions = [
  { value: "hospitality", label: "Hospitality (Café / Restaurant / Hotel)" },
  { value: "beauty-wellness", label: "Beauty & Wellness (Salon / Spa)" },
  { value: "legal-professional", label: "Legal & Professional Services" },
  { value: "retail-commerce", label: "Retail & Commerce" },
  { value: "growing-business", label: "Growing / Scaling Business" },
  { value: "other", label: "Other" },
];

const serviceOptions = [
  { value: "ai-agents", label: "AI Agent Development" },
  { value: "automation", label: "Business Automation" },
  { value: "website", label: "Website Development" },
  { value: "app-dev", label: "Application Development" },
  { value: "custom-software", label: "Custom Business Software / Platform" },
  { value: "infrastructure", label: "Digital Infrastructure" },
  { value: "other", label: "Other / Not Sure Yet" },
];

function validateForm(data: {
  fullName: string;
  businessName: string;
  email: string;
  industry: string;
  service: string;
  description: string;
}): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim() || data.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name (minimum 2 characters).";
  }
  if (!data.businessName.trim() || data.businessName.trim().length < 2) {
    errors.businessName = "Please enter your business name.";
  }
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.industry) {
    errors.industry = "Please select your industry.";
  }
  if (!data.service) {
    errors.service = "Please select the service you need.";
  }
  if (!data.description.trim() || data.description.trim().length < 10) {
    errors.description = "Please describe your project (minimum 10 characters).";
  }

  return errors;
}

export function Section09Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [errorMessage, setErrorMessage] = useState<string>("");
  const textareaId = useId();

  // Form fields
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState("");
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  // Honeypot
  const [website, setWebsite] = useState("");

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { fullName, businessName, email, phone, industry, service, description, website };
    const validationErrors = validateForm(data);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setFormState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.status === 429) {
        setErrorMessage("Too many submissions. Please try again in a few minutes.");
        setFormState("error");
        return;
      }

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErrorMessage(body?.message || "Something went wrong. Please try again.");
        setFormState("error");
        return;
      }

      setFormState("success");
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setFormState("error");
    }
  };

  if (formState === "success") {
    return (
      <section
        id="contact"
        aria-label="Contact form — submission confirmed"
        className="py-24 md:py-32 bg-bg-base"
      >
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <div className="rounded-3xl bg-bg-base shadow-neu-flat p-10 md:p-14">
            <CheckCircle2 className="h-12 w-12 text-brand-success mx-auto mb-5" />
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-3">
              Inquiry Received
            </h2>
            <p className="font-body text-text-secondary text-sm md:text-base leading-relaxed">
              Thank you for reaching out. We&rsquo;ve received your project inquiry and will
              review it carefully. Expect to hear from us within 1–2 business days.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 md:py-32 bg-bg-base"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={cn(
            "transition-all duration-700 motion-reduce:transition-none mb-14",
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent mb-4">
            Get In Touch
          </p>
          <h2
            id="contact-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary max-w-3xl leading-tight"
          >
            Let&rsquo;s Engineer{" "}
            <span className="text-text-secondary font-normal">
              Your Next Big Idea.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left sidebar info */}
          <div
            className={cn(
              "lg:col-span-2 space-y-6 transition-all duration-700 motion-reduce:transition-none",
              revealed ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            )}
            style={{ transitionDelay: revealed ? "150ms" : "0ms" }}
          >
            <div className="rounded-2xl bg-bg-base shadow-neu-flat p-6">
              <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                What happens next?
              </h3>
              <div className="space-y-4 mt-4">
                {[
                  { step: "1", text: "We review your inquiry within 1–2 business days" },
                  { step: "2", text: "We schedule a discovery call to understand your requirements" },
                  { step: "3", text: "We propose a tailored solution and timeline" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-brand-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="font-mono text-[9px] font-bold text-brand-accent">{item.step}</span>
                    </div>
                    <p className="font-body text-sm text-text-secondary leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-bg-base shadow-neu-flat p-6">
              <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-2">Email</p>
              <a
                href="mailto:gssoftwares.official@gmail.com"
                className="font-body text-sm font-semibold text-brand-accent hover:text-brand-accentHover transition-colors"
              >
                gssoftwares.official@gmail.com
              </a>
            </div>

            <div className="rounded-2xl bg-bg-base shadow-neu-flat p-6">
              <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-2">GitHub</p>
              <a
                href="https://github.com/gs-softwares-code"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm font-semibold text-brand-accent hover:text-brand-accentHover transition-colors"
              >
                github.com/gs-softwares-code
              </a>
              <a
                href="https://github.com/Gulshan-Singh-gs"
                target="_blank"
                rel="noopener noreferrer"
                className="sr-only"
              >
                Gulshan-Singh-gs
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div
            className={cn(
              "lg:col-span-3 transition-all duration-700 motion-reduce:transition-none",
              revealed ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            )}
            style={{ transitionDelay: revealed ? "250ms" : "0ms" }}
          >
            <div className="rounded-3xl bg-bg-base shadow-neu-flat p-6 md:p-8">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Honeypot — hidden from real users */}
                <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                {/* Row 1: Full Name + Business Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <NeumorphicInput
                    label="Full Name *"
                    placeholder="Your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    error={errors.fullName}
                    autoComplete="name"
                    required
                    disabled={formState === "submitting"}
                  />
                  <NeumorphicInput
                    label="Business Name *"
                    placeholder="Your business name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    error={errors.businessName}
                    autoComplete="organization"
                    required
                    disabled={formState === "submitting"}
                  />
                </div>

                {/* Row 2: Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <NeumorphicInput
                    label="Email Address *"
                    type="email"
                    placeholder="you@business.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    autoComplete="email"
                    required
                    disabled={formState === "submitting"}
                  />
                  <NeumorphicInput
                    label="Phone Number"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    disabled={formState === "submitting"}
                  />
                </div>

                {/* Row 3: Industry + Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <NeumorphicSelect
                    label="Your Industry *"
                    placeholder="Select your industry..."
                    options={industryOptions}
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    error={errors.industry}
                    required
                    disabled={formState === "submitting"}
                  />
                  <NeumorphicSelect
                    label="Required Service *"
                    placeholder="Select a service..."
                    options={serviceOptions}
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    error={errors.service}
                    required
                    disabled={formState === "submitting"}
                  />
                </div>

                {/* Project Description */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor={textareaId}
                    className="text-xs font-semibold uppercase tracking-wider font-mono text-text-secondary select-none"
                  >
                    Project Description *
                  </label>
                  <textarea
                    id={textareaId}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your business challenge, what you need built, and any relevant context (current tools, team size, timeline)..."
                    rows={5}
                    required
                    disabled={formState === "submitting"}
                    aria-invalid={!!errors.description}
                    className={cn(
                      "w-full rounded-xl bg-bg-base px-4 py-3 text-sm font-body text-text-primary transition-all duration-200 resize-none",
                      "shadow-neu-pressed border border-black/5 placeholder:text-text-muted/60",
                      "focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent/40 focus:ring-offset-1 focus:ring-offset-bg-base",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      errors.description &&
                        "border-rose-500/60 ring-1 ring-rose-500/30 focus:ring-rose-500 focus:border-rose-500"
                    )}
                  />
                  {errors.description && (
                    <p role="alert" className="text-xs font-medium text-rose-700 mt-0.5">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Error banner */}
                {formState === "error" && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-50 p-4"
                  >
                    <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-rose-700">{errorMessage}</p>
                  </div>
                )}

                {/* Submit */}
                <div className="pt-2">
                  <NeumorphicButton
                    type="submit"
                    variant="accent"
                    size="lg"
                    disabled={formState === "submitting"}
                    className="w-full sm:w-auto"
                  >
                    {formState === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending Inquiry...
                      </>
                    ) : (
                      "Send Project Inquiry"
                    )}
                  </NeumorphicButton>
                  <p className="font-body text-xs text-text-muted mt-3">
                    * Required fields. We respond within 1–2 business days.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
