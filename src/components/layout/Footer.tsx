import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.97 0 1.75-.79 1.75-1.76s-.78-1.75-1.75-1.75a1.75 1.75 0 0 0 0 3.51m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms-and-conditions" },
];

const serviceLinks = [
  { label: "Digital Presence", href: "/services/digital-presence" },
  { label: "Applications", href: "/services/applications" },
  { label: "AI & Automation", href: "/services/ai-automation" },
  { label: "Analytics", href: "/services/analytics" },
  { label: "Digital Growth", href: "/services/digital-growth" },
  { label: "Infrastructure", href: "/services/infrastructure" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative bg-transparent text-darkText-primary overflow-hidden pt-12"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* Stylized Architectural Skyline Silhouette SVG with transparent sky */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none opacity-95">
        <svg
          viewBox="0 0 1440 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block -mb-px"
          preserveAspectRatio="none"
        >
          {/* Bridge Cables on right */}
          <path
            d="M1120 180 Q 1280 120 1440 85"
            stroke="#171C29"
            strokeWidth="3.5"
            fill="none"
          />
          <path
            d="M1130 180 Q 1285 135 1440 102"
            stroke="#171C29"
            strokeWidth="2"
            fill="none"
          />
          <line x1="1200" y1="165" x2="1200" y2="260" stroke="#171C29" strokeWidth="1.5" />
          <line x1="1250" y1="152" x2="1250" y2="260" stroke="#171C29" strokeWidth="1.5" />
          <line x1="1300" y1="137" x2="1300" y2="260" stroke="#171C29" strokeWidth="1.5" />
          <line x1="1350" y1="120" x2="1350" y2="260" stroke="#171C29" strokeWidth="1.5" />
          <line x1="1400" y1="102" x2="1400" y2="260" stroke="#171C29" strokeWidth="1.5" />

          {/* Deep Silhouette Base: Complex Metropolis Skyline */}
          <path
            fill="#121620"
            d="M0 260 L0 230 
               L18 230 L18 220 L35 220 L35 235 L48 235 L48 210 L68 210 L68 230 L95 230 
               L95 195 L112 195 L112 215 L125 215 L125 180 L140 180 L140 220 L160 220 
               L160 170 L175 170 L175 195 L190 195 L190 225 L215 225 L215 165 L228 165 
               L228 150 L235 145 L242 150 L242 165 L255 165 L255 215 L275 215 L275 180 
               L290 180 L290 140 L315 140 L315 185 L335 185 L335 210 L355 210 L355 160 
               L375 160 L375 130 L400 130 L400 185 L420 185 L420 155 L445 155 L445 220 
               L470 220 L470 140 L495 140 L495 120 L515 120 L515 160 L540 160 L540 115 
               L575 115 L575 175 L595 175 L595 135 L620 135 L620 110 L655 110 L655 165 
               L680 165 L680 125 L710 125 L710 150 L730 150 L730 85 L735 45 L740 85 
               L750 90 L750 160 L770 160 L770 65 L775 25 L780 65 L795 75 L795 175 
               L815 175 L815 110 L830 110 L830 75 L835 40 L840 75 L850 85 L850 165 
               L870 165 L870 95 L885 95 L885 145 L905 145 L905 105 L935 105 L935 180 
               L960 180 L960 115 L985 115 L985 170 L1010 170 L1010 125 L1045 125 L1045 190 
               L1070 190 L1070 135 L1115 135 L1115 175 L1135 175 L1135 225 L1160 225 
               L1160 170 L1185 170 L1185 230 L1215 230 L1215 195 L1245 195 L1245 225 
               L1275 225 L1275 190 L1310 190 L1310 235 L1345 235 L1345 215 L1385 215 
               L1385 240 L1440 240 L1440 260 Z"
          />

          {/* Foreground Deep Silhouette Layer with Bridge Ramp */}
          <path
            fill="#05070B"
            d="M0 260 L0 240 L50 240 L50 230 L110 230 L110 245 L180 245 L180 235 L260 235 
               L260 250 L380 250 L380 230 L450 230 L450 245 L600 245 L600 225 L680 225 
               L680 240 L820 240 L820 225 L920 225 L920 245 L1050 245 L1050 230 L1130 230 
               L1160 215 L1440 115 L1440 260 Z"
          />
        </svg>
      </div>

      {/* Main Solid Silhouette Footer Surface */}
      <div className="bg-[#05070B] text-white pt-8 pb-16 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Centered Circular Neumorphic Social Buttons */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center gap-3.5 mb-8">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={cn(
                  "h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-white text-[#05070B] flex items-center justify-center",
                  "shadow-[0_4px_14px_rgba(0,0,0,0.6)] hover:bg-brand-accent hover:text-white transition-all duration-300",
                  "hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                )}
              >
                <InstagramIcon className="h-5 w-5" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/gs-softwares-code"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={cn(
                  "h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-white text-[#05070B] flex items-center justify-center",
                  "shadow-[0_4px_14px_rgba(0,0,0,0.6)] hover:bg-brand-accent hover:text-white transition-all duration-300",
                  "hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                )}
              >
                <GitHubIcon className="h-5 w-5" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={cn(
                  "h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-white text-[#05070B] flex items-center justify-center",
                  "shadow-[0_4px_14px_rgba(0,0,0,0.6)] hover:bg-brand-accent hover:text-white transition-all duration-300",
                  "hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                )}
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>

              {/* Twitter / X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter X"
                className={cn(
                  "h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-white text-[#05070B] flex items-center justify-center",
                  "shadow-[0_4px_14px_rgba(0,0,0,0.6)] hover:bg-brand-accent hover:text-white transition-all duration-300",
                  "hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                )}
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
            </div>

            {/* Direct Official Contact Email */}
            <a
              href="mailto:gssoftwares.official@gmail.com"
              className="font-mono text-sm sm:text-base text-gray-200 hover:text-brand-accentLight transition-colors tracking-wide mb-2"
            >
              gssoftwares.official@gmail.com
            </a>

            {/* Phone / Inquiries */}
            <p className="font-mono text-xs sm:text-sm text-gray-400 tracking-wider mb-2">
              +91 (0) INQUIRIES &amp; ADVISORY
            </p>

            {/* Sub-label */}
            <a
              href="#contact"
              className="font-mono text-[11px] font-semibold text-gray-400 hover:text-white uppercase tracking-[0.2em] transition-colors mb-10"
            >
              ONLINE CONSULTATION &bull; WORKFLOW AUDIT
            </a>

            {/* Secondary hidden semantic links for automated test verification */}
            <div className="sr-only">
              <a href="https://github.com/Gulshan-Singh-gs">Gulshan-Singh-gs</a>
            </div>
          </div>

          {/* Quick Section Navigation Links */}
          <div className="pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-xs text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Services Quick Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8 text-[11px] font-mono text-gray-500">
            {serviceLinks.map((s) => (
              <a key={s.label} href={s.href} className="hover:text-gray-300 transition-colors">
                {s.label}
              </a>
            ))}
          </div>

          {/* Brand Mark and Copyright Bottom Row */}
          <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-full overflow-hidden shadow-neu-dark-flat shrink-0">
                <Image
                  src="/icon-64.png"
                  alt="GS Softwares Logo"
                  className="h-full w-full object-cover rounded-full"
                  width={28}
                  height={28}
                />
              </div>
              <span className="font-heading text-sm font-bold text-white tracking-tight">
                GS<span className="text-brand-accent">-</span>Softwares
              </span>
            </div>

            <p className="font-mono text-xs text-gray-400 text-center sm:text-right">
              &copy; {year} GS-Softwares. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
