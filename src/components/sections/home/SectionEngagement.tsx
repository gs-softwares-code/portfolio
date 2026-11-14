"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { engagementModels } from "@/data/engagementData";
import {
  ModularServicesGraphic,
  IntegratedSolutionsGraphic,
  CustomSoftwareGraphic,
  OngoingSupportGraphic,
} from "./EngagementTileGraphics";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const SectionEngagement: React.FC = () => {
  return (
    <section id="engagement" className="py-24 md:py-32 bg-bg-dark text-white relative overflow-hidden">
      {/* Fog-like multi-stop organic atmospheric gradient transition (Light #E9EDF2 -> Dark #171C29) */}
      <div
        className="absolute top-0 inset-x-0 h-44 sm:h-52 md:h-64 pointer-events-none z-20"
        style={{
          background: `linear-gradient(to bottom,
            #E9EDF2 0%,
            rgba(233, 237, 242, 0.95) 12%,
            rgba(200, 208, 222, 0.8) 28%,
            rgba(135, 148, 175, 0.6) 45%,
            rgba(80, 94, 125, 0.45) 60%,
            rgba(45, 54, 76, 0.35) 74%,
            rgba(27, 33, 49, 0.2) 86%,
            rgba(23, 28, 41, 0) 100%
          )`,
        }}
      />
      {/* Soft atmospheric fog haze layer */}
      <div
        className="absolute top-0 inset-x-0 h-48 sm:h-56 md:h-72 pointer-events-none z-10"
        style={{
          background: `radial-gradient(ellipse 90% 60% at 50% 0%, rgba(233, 237, 242, 0.85) 0%, rgba(200, 210, 228, 0.35) 45%, rgba(23, 28, 41, 0) 80%)`,
        }}
      />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full shadow-neu-dark-pressed bg-bg-dark text-brand-accent font-mono text-xs font-semibold uppercase tracking-widest mb-4">
            <span>How We Work Together</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Four Flexible Engagement Models.
          </h2>
          <p className="font-body text-base sm:text-lg text-darkText-secondary leading-relaxed">
            We don&apos;t force clients into rigid, bloated packages. Choose the exact model that aligns with your operational stage and timeline.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {engagementModels.map((model) => {
            const isFeatured = model.featured;

            return (
              <motion.div
                key={model.id}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`rounded-3xl bg-bg-dark p-6 flex flex-col justify-between transition-all duration-300 relative border group ${
                  isFeatured
                    ? "border-brand-accent shadow-neu-accent"
                    : "border-white/5 hover:border-brand-accent/40 shadow-neu-dark-flat hover:shadow-neu-dark-pressed"
                }`}
              >
                {isFeatured && (
                  <span className="absolute -top-3 right-6 bg-brand-accent text-white font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md z-20">
                    Most Popular
                  </span>
                )}

                <div>
                  {/* Service Specific Animated Element */}
                  {model.id === "individual-services" && <ModularServicesGraphic />}
                  {model.id === "integrated-solutions" && <IntegratedSolutionsGraphic />}
                  {model.id === "custom-development" && <CustomSoftwareGraphic />}
                  {model.id === "ongoing-support" && <OngoingSupportGraphic />}

                  <h3 className="font-heading text-xl font-bold text-white mb-1 group-hover:text-brand-accent transition-colors duration-200">
                    {model.title}
                  </h3>
                  <p className="font-body text-xs text-brand-accent font-semibold mb-4">
                    {model.subtitle}
                  </p>
                  <p className="font-body text-xs text-darkText-secondary mb-6 leading-relaxed">
                    {model.description}
                  </p>

                  <div className="mb-6 space-y-2">
                    <p className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
                      Includes:
                    </p>
                    {model.includes.map((item, idx) => (
                      <div key={idx} className="flex items-start text-xs text-darkText-muted font-body">
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-accent mr-2 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={model.ctaHref}
                  className={`inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isFeatured
                      ? "bg-brand-accent hover:bg-brand-accentHover text-white shadow-neu-accent"
                      : "bg-bg-dark shadow-neu-dark-flat hover:shadow-neu-dark-pressed text-brand-accent border border-white/5"
                  }`}
                >
                  <span>{model.cta}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
