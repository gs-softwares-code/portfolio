"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ChevronDown, Terminal } from "lucide-react";
import { serviceDivisions } from "@/data/servicesData";
import { industrySolutions } from "@/data/industriesData";
import { cn } from "@/lib/utils";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  // Scroll spy on home page
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const isAtBottom =
        window.scrollY > 50 &&
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;

      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      const sections = ["hero", "capabilities", "why-gs", "solutions", "work", "process", "engagement", "contact"];
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="mx-auto max-w-6xl w-full">
        {/* Main Floating Capsule */}
        <nav
          role="navigation"
          aria-label="Main Navigation"
          className={cn(
            "pointer-events-auto flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full neu-glass neu-rim transition-all duration-300",
            scrolled ? "shadow-neu-flat-lg bg-bg-base/95" : "shadow-neu-flat bg-bg-base/85"
          )}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-lg p-1"
            aria-label="GS-Softwares Home"
          >
            <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-bg-base neu-rim shadow-neu-flat transition-transform duration-200 group-hover:scale-105 overflow-hidden">
              <Image
                src="/icon-64.png"
                alt="GS Softwares Icon"
                className="h-full w-full object-cover rounded-full"
                width={36}
                height={36}
                priority
              />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-success opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-success" />
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-heading font-bold text-base sm:text-lg tracking-tight text-text-primary">
                GS-Softwares<span className="text-brand-accent">.</span>
              </span>
              <span className="hidden sm:inline-block font-mono text-[9px] uppercase tracking-wider text-text-secondary -mt-1">
                AI &amp; Systems Engineering
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            <a
              href="#hero"
              className={cn(
                "px-3 py-1.5 text-xs sm:text-sm font-body font-medium rounded-full transition-all duration-200",
                isHomePage && activeSection === "hero"
                  ? "bg-bg-base text-brand-accent shadow-neu-pressed font-semibold"
                  : "text-text-secondary hover:text-text-primary"
              )}
            >
              Home
            </a>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href="/services"
                className={cn(
                  "px-3 py-1.5 text-xs sm:text-sm font-body font-medium rounded-full transition-all duration-200 inline-flex items-center gap-1",
                  pathname.startsWith("/services")
                    ? "bg-bg-base text-brand-accent shadow-neu-pressed font-semibold"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                <span>Services</span>
                <ChevronDown className="h-3 w-3" />
              </Link>

              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 p-3 rounded-2xl bg-bg-base shadow-neu-flat-lg border border-white/50 space-y-1 animate-in fade-in slide-in-from-top-1">
                  {serviceDivisions.map((d) => (
                    <Link
                      key={d.id}
                      href={`/services/${d.slug}`}
                      className="block px-3 py-2 rounded-xl text-xs hover:bg-black/[0.03] transition-colors"
                      onClick={() => setServicesOpen(false)}
                    >
                      <div className="font-semibold text-text-primary">{d.name}</div>
                      <div className="text-[11px] text-text-muted line-clamp-1">{d.tagline}</div>
                    </Link>
                  ))}
                  <div className="pt-2 border-t border-black/5 mt-1">
                    <Link
                      href="/services"
                      className="block text-center text-xs font-semibold text-brand-accent py-1 hover:underline"
                    >
                      All Six Divisions &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <Link
                href="/solutions"
                className={cn(
                  "px-3 py-1.5 text-xs sm:text-sm font-body font-medium rounded-full transition-all duration-200 inline-flex items-center gap-1",
                  pathname.startsWith("/solutions")
                    ? "bg-bg-base text-brand-accent shadow-neu-pressed font-semibold"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                <span>Solutions</span>
                <ChevronDown className="h-3 w-3" />
              </Link>

              {solutionsOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 p-3 rounded-2xl bg-bg-base shadow-neu-flat-lg border border-white/50 space-y-1 animate-in fade-in slide-in-from-top-1">
                  {industrySolutions.map((ind) => (
                    <Link
                      key={ind.id}
                      href={`/solutions/${ind.slug}`}
                      className="block px-3 py-2 rounded-xl text-xs hover:bg-black/[0.03] transition-colors"
                      onClick={() => setSolutionsOpen(false)}
                    >
                      <div className="font-semibold text-text-primary">{ind.name}</div>
                      <div className="text-[11px] text-text-muted line-clamp-1">{ind.tagline}</div>
                    </Link>
                  ))}
                  <div className="pt-2 border-t border-black/5 mt-1">
                    <Link
                      href="/solutions"
                      className="block text-center text-xs font-semibold text-brand-accent py-1 hover:underline"
                    >
                      All Industry Solutions &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/portfolio"
              className={cn(
                "px-3 py-1.5 text-xs sm:text-sm font-body font-medium rounded-full transition-all duration-200",
                pathname.startsWith("/portfolio")
                  ? "bg-bg-base text-brand-accent shadow-neu-pressed font-semibold"
                  : "text-text-secondary hover:text-text-primary"
              )}
            >
              Portfolio
            </Link>

            <Link
              href="/about"
              className={cn(
                "px-3 py-1.5 text-xs sm:text-sm font-body font-medium rounded-full transition-all duration-200",
                pathname === "/about"
                  ? "bg-bg-base text-brand-accent shadow-neu-pressed font-semibold"
                  : "text-text-secondary hover:text-text-primary"
              )}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={cn(
                "px-3 py-1.5 text-xs sm:text-sm font-body font-medium rounded-full transition-all duration-200",
                pathname === "/contact"
                  ? "bg-bg-base text-brand-accent shadow-neu-pressed font-semibold"
                  : "text-text-secondary hover:text-text-primary"
              )}
            >
              Contact
            </Link>
          </div>

          {/* CTA & Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-accent hover:bg-brand-accentHover text-white font-medium text-xs sm:text-sm transition-all shadow-neu-accent"
            >
              <span>Start a Project</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex md:hidden items-center justify-center p-2 rounded-xl text-text-primary bg-bg-base neu-rim shadow-neu-flat active:shadow-neu-pressed"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="pointer-events-auto md:hidden mt-3 p-5 rounded-2xl neu-glass neu-rim shadow-neu-flat-lg bg-bg-base/95 space-y-3 transition-all animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-black/[0.03]"
              >
                Home
              </Link>
              <Link
                href="/services"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-black/[0.03]"
              >
                Services (Six Divisions)
              </Link>
              <Link
                href="/solutions"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-black/[0.03]"
              >
                Industry Solutions
              </Link>
              <Link
                href="/portfolio"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-black/[0.03]"
              >
                Portfolio &amp; Codebases
              </Link>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-black/[0.03]"
              >
                About GS-Softwares
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-black/[0.03]"
              >
                Contact
              </Link>
            </div>

            <div className="pt-2 border-t border-black/5">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-xl bg-brand-accent text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-neu-accent"
              >
                <span>Start a Project</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
