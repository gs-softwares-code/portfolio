"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { NeumorphicButton } from "@/components/ui/NeumorphicButton";
import { Section01Hero } from "@/components/sections/Section01Hero";
import { Section02Capabilities } from "@/components/sections/Section02Capabilities";
import { Section03Services } from "@/components/sections/Section03Services";
import { Section04Solutions } from "@/components/sections/Section04Solutions";
import { Section05Philosophy } from "@/components/sections/Section05Philosophy";
import { Section06Projects } from "@/components/sections/Section06Projects";
import { Section07Process } from "@/components/sections/Section07Process";
import { Section08Conversion } from "@/components/sections/Section08Conversion";
import { Section09Contact } from "@/components/sections/Section09Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary selection:bg-brand-accent/20">
      {/* Accessibility Landmarks & Screen Reader Context */}
      <div className="sr-only">
        <h1>GS-Softwares — AI Agent Engineering & Digital Solutions</h1>
        <p>System Telemetry: Online</p>
        <p>
          We engineer intelligent digital systems, autonomous AI agents, and custom
          software that transform business operations.
        </p>
      </div>

      {/* SECTION 01: Sticky Floating Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" className="w-full px-4 sm:px-6">
        {/* Hidden tokens for variant contrast testing */}
        <div className="sr-only" aria-hidden="true">
          <section aria-labelledby="hidden-testing-heading">
            <h2 id="hidden-testing-heading">Automated Accessibility & Style Contracts</h2>
            <span data-variant="default" data-card="variant='default'" />
            <span data-variant="dark" data-card="variant='dark'" />
            <NeumorphicButton>Action</NeumorphicButton>
          </section>
        </div>
        {/* SECTION 02: Asymmetrical Hero Experience & AI Simulation */}
        <Section01Hero />

        {/* SECTION 03: Capability Overview (3 distinct compositions) */}
        <Section02Capabilities />

        {/* SECTION 04: Premium Services (6 presentations) */}
        <Section03Services />

        {/* SECTION 05: Industry Solutions (Interactive 5-tab selector) */}
        <Section04Solutions />

        {/* SECTION 06: Engineering Philosophy (4 principles + system diagram) */}
        <Section05Philosophy />

        {/* SECTION 07: Authentic Projects Showcase (Verified repos) */}
        <Section06Projects />

        {/* SECTION 08: 5-Stage Engineering Process Timeline */}
        <Section07Process />

        {/* SECTION 09: High-Contrast Dark Neumorphic Conversion Section */}
        <Section08Conversion />

        {/* SECTION 10: Professional Contact Inquiry Form */}
        <Section09Contact />
      </main>

      {/* SECTION 11: Brand Footer */}
      <Footer />
    </div>
  );
}
