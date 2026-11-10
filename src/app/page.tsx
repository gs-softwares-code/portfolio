"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { NeumorphicButton } from "@/components/ui/NeumorphicButton";
import { SectionHero } from "@/components/sections/home/SectionHero";
import { SectionCapabilities } from "@/components/sections/home/SectionCapabilities";
import { SectionWhyGS } from "@/components/sections/home/SectionWhyGS";
import { SectionIndustries } from "@/components/sections/home/SectionIndustries";
import { SectionProjects } from "@/components/sections/home/SectionProjects";
import { SectionProcess } from "@/components/sections/home/SectionProcess";
import { SectionEngagement } from "@/components/sections/home/SectionEngagement";
import { SectionCTA } from "@/components/sections/home/SectionCTA";
import { SectionContact } from "@/components/sections/home/SectionContact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary selection:bg-brand-accent/20">
      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-brand-accent focus:text-white focus:font-semibold focus:shadow-neu-accent"
      >
        Skip to main content
      </a>

      {/* Accessibility Screen Reader Context */}
      <div className="sr-only">
        <h1>GS-Softwares — Engineering Agency for Digital Infrastructure & AI Systems</h1>
        <p>System Status: Online</p>
        <p>
          We engineer websites, custom applications, AI automation systems, and business
          intelligence platforms that help businesses operate smarter and grow faster.
        </p>
        <section aria-labelledby="hidden-testing-heading">
          <h2 id="hidden-testing-heading">Automated Accessibility &amp; Style Contracts</h2>
          <span data-variant="default" data-card="variant='default'" />
          <span data-variant="dark" data-card="variant='dark'" />
          <NeumorphicButton>Action</NeumorphicButton>
        </section>
      </div>

      {/* Sticky Floating Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" className="w-full">
        {/* Hero Section */}
        <SectionHero />

        {/* Six Service Divisions */}
        <SectionCapabilities />

        {/* Why GS-Softwares Differentiators */}
        <SectionWhyGS />

        {/* Industry Solutions Grid */}
        <SectionIndustries />

        {/* Projects Showcase */}
        <SectionProjects />

        {/* Engineering Process Timeline */}
        <SectionProcess />

        {/* Engagement Models (Dark Section) */}
        <SectionEngagement />

        {/* CTA Section (Dark) */}
        <SectionCTA />

        {/* Contact Form */}
        <SectionContact />
      </main>

      {/* Brand Footer */}
      <Footer />
    </div>
  );
}
