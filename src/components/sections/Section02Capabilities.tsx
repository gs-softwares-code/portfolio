"use client";

import React, { useEffect, useRef, useState } from "react";
import { Brain, Workflow, Code2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Animated Dots Canvas (INTELLIGENCE pillar) ---
function AnimatedDotCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dots: { x: number; y: number; vx: number; vy: number; r: number }[] =
      [];
    const N = 36;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < N; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1.5,
      });
    }

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((d, i) => {
        if (!prefersReduced.current) {
          d.x += d.vx;
          d.y += d.vy;
          if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
          if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        }

        // Draw connections
        dots.slice(i + 1).forEach((d2) => {
          const dist = Math.hypot(d.x - d2.x, d.y - d2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.strokeStyle = `rgba(74,101,220,${0.18 * (1 - dist / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });

        // Draw node
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(74,101,220,0.55)";
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

// --- Section Component ---
export function Section02Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const revealBase = "transition-all duration-700 motion-reduce:transition-none";

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="py-24 md:py-32 bg-bg-base overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={cn(
            revealBase,
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent mb-4">
            Core Capabilities
          </p>
          <h2
            id="capabilities-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary max-w-3xl leading-tight"
          >
            Beyond Digital Presence.{" "}
            <span className="text-text-secondary font-normal">
              Into Intelligent Operations.
            </span>
          </h2>
        </div>

        {/* Three Pillars — each with DIFFERENT visual composition */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* PILLAR 1: INTELLIGENCE — Wide canvas with animated nodes */}
          <div
            className={cn(
              "lg:col-span-7 relative overflow-hidden rounded-3xl bg-bg-base shadow-neu-flat min-h-[400px] p-8 md:p-10 flex flex-col justify-between",
              revealBase,
              revealed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10",
              "transition-delay-100"
            )}
            style={{ transitionDelay: revealed ? "0ms" : "0ms" }}
          >
            <AnimatedDotCanvas />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-bg-base shadow-neu-pressed-sm rounded-full px-3.5 py-1.5 mb-6">
                <Brain className="h-3.5 w-3.5 text-brand-accent" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-brand-accent">
                  Intelligence
                </span>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4 leading-tight">
                AI That Works<br />
                <span className="text-brand-accent">For Your Business</span>
              </h3>
              <p className="font-body text-text-secondary text-sm md:text-base max-w-md leading-relaxed">
                Autonomous AI agents, intelligent decision support, and smart
                customer interactions — engineered to operate your business
                logic, not just answer questions.
              </p>
            </div>

            <div className="relative z-10 mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                "Autonomous AI Agents",
                "AI-Powered Decision Support",
                "Intelligent Customer Interactions",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 bg-bg-base rounded-xl px-3 py-2.5 shadow-neu-flat-sm"
                >
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                  <span className="font-body text-xs text-text-primary font-medium leading-tight">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* PILLAR 2: AUTOMATION — Timeline/flow layout */}
          <div
            className={cn(
              "lg:col-span-5 rounded-3xl bg-bg-base shadow-neu-flat p-8 md:p-10 flex flex-col",
              revealBase,
              revealed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: revealed ? "120ms" : "0ms" }}
          >
            <div className="inline-flex items-center gap-2 bg-bg-base shadow-neu-pressed-sm rounded-full px-3.5 py-1.5 mb-6 self-start">
              <Workflow className="h-3.5 w-3.5 text-brand-success" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-brand-success">
                Automation
              </span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-text-primary mb-3 leading-tight">
              Eliminate Manual Work
            </h3>
            <p className="font-body text-sm text-text-secondary mb-8 leading-relaxed">
              Cross-platform workflow automation that removes repetitive tasks
              from your team&rsquo;s daily operations.
            </p>

            {/* Flow diagram */}
            <div className="flex-1 space-y-0">
              {[
                { step: "01", label: "Trigger", desc: "Business event detected" },
                { step: "02", label: "Process", desc: "Logic applied automatically" },
                { step: "03", label: "Integrate", desc: "Cross-platform sync" },
                { step: "04", label: "Complete", desc: "Task done, team notified" },
              ].map((item, idx) => (
                <div key={item.step} className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-base shadow-neu-flat-sm flex-shrink-0">
                      <span className="font-mono text-[10px] font-bold text-brand-success">
                        {item.step}
                      </span>
                    </div>
                    {idx < 3 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-brand-success/40 to-transparent my-1 min-h-[24px]" />
                    )}
                  </div>
                  <div className="pb-5">
                    <p className="font-heading text-sm font-semibold text-text-primary">
                      {item.label}
                    </p>
                    <p className="font-body text-xs text-text-secondary mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PILLAR 3: ENGINEERING — Enterprise Neumorphic Dark Card */}
          <div
            className={cn(
              "lg:col-span-12 rounded-3xl bg-bg-dark shadow-neu-dark-flat p-8 md:p-12 overflow-hidden relative",
              revealBase,
              revealed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: revealed ? "240ms" : "0ms" }}
          >
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
              <div className="flex-1 max-w-xl">
                {/* Inset pressed badge */}
                <div className="inline-flex items-center gap-2.5 bg-bg-dark shadow-neu-dark-pressed-sm rounded-full px-4 py-1.5 mb-6">
                  <Code2 className="h-3.5 w-3.5 text-brand-accentLight" />
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-darkText-primary">
                    &lt;/&gt; ENGINEERING
                  </span>
                  <span className="sr-only">Deterministic Engineering</span>
                </div>
                
                {/* High contrast typography */}
                <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-darkText-primary mb-4 leading-tight tracking-tight">
                  Custom Software Built<br className="hidden sm:block" />
                  {" "}for the Way You Work
                </h3>
                <p className="font-body text-darkText-secondary text-sm md:text-base leading-relaxed">
                  Purpose-built business platforms, operational dashboards, and
                  cloud-native infrastructure — engineered from scratch to fit
                  your exact workflows.
                </p>
              </div>

              {/* Recessed Neumorphic Terminal Window */}
              <div className="w-full md:w-[420px] max-w-full bg-bg-dark shadow-neu-dark-pressed rounded-2xl p-4 sm:p-5 flex-shrink-0">
                {/* Header with Muted Physical LED Indicators */}
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-white/[0.04]">
                  <div
                    className="h-2.5 w-2.5 rounded-full bg-[#E06C75]/80 shadow-neu-dark-dot"
                    title="Close"
                    aria-hidden="true"
                  />
                  <div
                    className="h-2.5 w-2.5 rounded-full bg-[#E5C07B]/80 shadow-neu-dark-dot"
                    title="Minimize"
                    aria-hidden="true"
                  />
                  <div
                    className="h-2.5 w-2.5 rounded-full bg-[#98C379]/80 shadow-neu-dark-dot"
                    title="Maximize"
                    aria-hidden="true"
                  />
                  <span className="ml-2 font-mono text-[11px] text-darkText-secondary font-medium tracking-wide">
                    gs-engineering.sh
                  </span>
                </div>

                {/* High contrast terminal content */}
                <div className="space-y-2 font-mono text-xs">
                  {[
                    { prompt: "$", text: "build --platform=custom", promptColor: "text-brand-accentLight", textColor: "text-darkText-primary" },
                    { prompt: "→", text: "Custom Business Platforms", promptColor: "text-[#4ADE80]", textColor: "text-darkText-secondary" },
                    { prompt: "→", text: "Operational Dashboards", promptColor: "text-[#4ADE80]", textColor: "text-darkText-secondary" },
                    { prompt: "→", text: "Cloud-Native Infrastructure", promptColor: "text-[#4ADE80]", textColor: "text-darkText-secondary" },
                    { prompt: "→", text: "Mobile & PWA Applications", promptColor: "text-[#4ADE80]", textColor: "text-darkText-secondary" },
                    { prompt: "$", text: "status --all systems", promptColor: "text-brand-accentLight", textColor: "text-darkText-primary" },
                    { prompt: "✓", text: "Built for scale.", promptColor: "text-[#4ADE80]", textColor: "text-darkText-primary font-semibold" },
                  ].map((line, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className={cn("flex-shrink-0 font-bold", line.promptColor)}>
                        {line.prompt}
                      </span>
                      <span className={line.textColor}>
                        {line.text}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="font-bold text-brand-accentLight">$</span>
                    <span className="inline-block h-3.5 w-1.5 bg-brand-accentLight animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA row */}
        <div
          className={cn(
            "mt-10 flex flex-col sm:flex-row items-center justify-between gap-4",
            revealBase,
            revealed ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: revealed ? "400ms" : "0ms" }}
        >
          <p className="font-body text-text-secondary text-sm text-center sm:text-left">
            Every capability is engineered around your specific business reality.
          </p>
          <a
            href="#services"
            className="inline-flex items-center gap-2 font-body text-sm font-semibold text-brand-accent hover:text-brand-accentHover transition-colors"
          >
            Explore all services
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
