"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { NeumorphicButton } from "@/components/ui/NeumorphicButton";

// Particle/grid animation for dark section background
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Floating particles
    const particles: { x: number; y: number; vx: number; vy: number; alpha: number; size: number }[] = [];
    const N = 40;
    for (let i = 0; i < N; i++) {
      particles.push({
        x: Math.random() * (canvas.width || 800),
        y: Math.random() * (canvas.height || 400),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.4 + 0.1,
        size: Math.random() * 1.5 + 0.5,
      });
    }

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        if (!prefersReduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        }

        // Draw connections
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(74,101,220,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74,101,220,${p.alpha})`;
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
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

export function Section08Conversion() {
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

  return (
    <section
      ref={sectionRef}
      id="conversion"
      aria-labelledby="conversion-heading"
      className="py-24 md:py-32 bg-bg-dark relative overflow-hidden"
    >
      <ParticleBackground />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(74,101,220,0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Top badge */}
        <div
          className={cn(
            "transition-all duration-700 motion-reduce:transition-none mb-8",
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <div className="inline-flex items-center gap-2 bg-brand-accent/15 border border-brand-accent/25 rounded-full px-4 py-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-pulse" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-accent">
              Ready to Build?
            </span>
          </div>
        </div>

        {/* Headline */}
        <div
          className={cn(
            "transition-all duration-700 motion-reduce:transition-none mb-6",
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: revealed ? "120ms" : "0ms" }}
        >
          <h2
            id="conversion-heading"
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-darkText-primary leading-tight"
          >
            Your Next Competitive Advantage Starts With Better Engineering.
          </h2>
        </div>

        {/* Supporting text */}
        <p
          className={cn(
            "font-body text-darkText-secondary text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto transition-all duration-700 motion-reduce:transition-none",
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{ transitionDelay: revealed ? "240ms" : "0ms" }}
        >
          Tell us what slows your business down. Let&rsquo;s engineer a smarter way forward.
        </p>

        {/* CTA Buttons */}
        <div
          className={cn(
            "flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 motion-reduce:transition-none",
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{ transitionDelay: revealed ? "360ms" : "0ms" }}
        >
          <NeumorphicButton variant="accent" size="lg">
            <a href="#contact" className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Discuss Your Project
            </a>
          </NeumorphicButton>

          <NeumorphicButton variant="dark" size="lg">
            <a
              href="https://github.com/gs-softwares-code"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Verify on GitHub
              <ArrowRight className="h-5 w-5" />
            </a>
          </NeumorphicButton>
          <a
            href="https://github.com/Gulshan-Singh-gs"
            target="_blank"
            rel="noopener noreferrer"
            className="sr-only"
          >
            Gulshan-Singh-gs
          </a>
        </div>

        {/* Bottom trust signal */}
        <p
          className={cn(
            "mt-12 font-mono text-xs text-darkText-muted transition-all duration-700 motion-reduce:transition-none",
            revealed ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDelay: revealed ? "500ms" : "0ms" }}
        >
          No commitments. Just an honest conversation about your business.
        </p>
      </div>
    </section>
  );
}
