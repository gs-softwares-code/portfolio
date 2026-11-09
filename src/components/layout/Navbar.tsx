"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ArrowRight, Sparkles, Terminal } from "lucide-react";
import { NeumorphicButton } from "@/components/ui/NeumorphicButton";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "#hero" },
  { name: "Services", href: "#services" },
  { name: "Solutions", href: "#solutions" },
  { name: "Our Work", href: "#work" },
  { name: "About", href: "#philosophy" },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [scrolled, setScrolled] = useState(false);

  // Scroll spy & elevation state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const isAtBottom =
        window.scrollY > 50 &&
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;

      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      // Section spy based on viewport scroll position
      const sections = ["hero", "services", "solutions", "work", "philosophy", "contact"];
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
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Escape key handler to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

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
          {/* Brand Wordmark & Glyph */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#hero");
            }}
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-lg p-1"
            aria-label="GS-Softwares Home"
          >
            {/* Intelligence Glyph / Logo */}
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
                AI Engineering
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className={cn(
                    "px-3.5 py-1.5 text-xs sm:text-sm font-body font-medium rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent",
                    isActive
                      ? "bg-bg-base text-brand-accent shadow-neu-pressed font-semibold border border-black/5"
                      : "text-text-secondary hover:text-text-primary hover:bg-black/[0.02]"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.name}
                </a>
              );
            })}
          </div>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Consultation CTA */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#contact");
              }}
              className="hidden sm:inline-block"
            >
              <NeumorphicButton
                variant="accent"
                size="sm"
                className="font-medium text-xs sm:text-sm shadow-neu-accent"
              >
                Initiate Consultation
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </NeumorphicButton>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex md:hidden items-center justify-center p-2 rounded-xl text-text-primary bg-bg-base neu-rim shadow-neu-flat active:shadow-neu-pressed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent transition-all duration-200"
              aria-controls="mobile-navigation-drawer"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Responsive Mobile Drawer */}
        {isOpen && (
          <div
            id="mobile-navigation-drawer"
            className="pointer-events-auto md:hidden mt-3 p-4 rounded-2xl neu-glass neu-rim shadow-neu-flat-lg bg-bg-base/95 space-y-3 transition-all duration-200 animate-in fade-in slide-in-from-top-2"
          >
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 min-h-[44px] rounded-xl text-sm font-body font-medium transition-all duration-200 active:shadow-neu-pressed",
                      isActive
                        ? "bg-bg-base text-brand-accent shadow-neu-pressed font-semibold"
                        : "text-text-primary hover:bg-black/[0.03] shadow-neu-flat-sm"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-brand-accent" />
                    )}
                  </a>
                );
              })}
            </div>

            <div className="pt-2 border-t border-black/5">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick("#contact");
                }}
                className="block w-full"
              >
                <NeumorphicButton
                  variant="accent"
                  size="md"
                  className="w-full justify-center shadow-neu-accent text-sm min-h-[44px]"
                >
                  Initiate Consultation
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </NeumorphicButton>
              </a>
            </div>

            <div className="pt-1 text-center">
              <p className="font-mono text-[11px] text-text-secondary flex items-center justify-center gap-1.5">
                <Terminal className="h-3 w-3 text-brand-accent" />
                Autonomous AI & Systems Engineering
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
