"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { CheckCircle2, Cpu, Layers, GitBranch, Shield, Zap, RefreshCw, Users } from "lucide-react";

const differentiators = [
  {
    icon: <Layers className="h-6 w-6 text-brand-accent" />,
    title: "Integrated Solutions",
    description: "We engineer complete digital ecosystems, not disconnected individual services. Your website, custom apps, automation, and analytics work together seamlessly.",
  },
  {
    icon: <Cpu className="h-6 w-6 text-brand-success" />,
    title: "Business-Specific Engineering",
    description: "Every system we build is designed around how your specific business operates — matching your workflows rather than forcing you into generic templates.",
  },
  {
    icon: <GitBranch className="h-6 w-6 text-[#7C5CFC]" />,
    title: "Modular Service Model",
    description: "Start with what you need today, from a fast storefront to lead automation. Add capabilities as your business grows without re-engineering from scratch.",
  },
  {
    icon: <Zap className="h-6 w-6 text-[#F59E0B]" />,
    title: "Practical AI Adoption",
    description: "AI tools that solve real operational bottlenecks — not experimental technology for its own sake. Reliable, deterministic automation with human oversight.",
  },
  {
    icon: <Shield className="h-6 w-6 text-[#10B981]" />,
    title: "Transparent Implementation",
    description: "Clear scopes, honest timelines, zero hidden infrastructure charges, and direct communication at every stage of the development process.",
  },
  {
    icon: <RefreshCw className="h-6 w-6 text-[#0EA5E9]" />,
    title: "Scalable Technology",
    description: "Systems architected to grow with your transaction volume and team size — built on enterprise-grade TypeScript, Next.js, and modern cloud primitives.",
  },
  {
    icon: <Users className="h-6 w-6 text-[#EC4899]" />,
    title: "Direct Technical Collaboration",
    description: "You work directly with the senior engineers building your system, ensuring high-fidelity delivery without account managers relaying distorted messages.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export const SectionWhyGS: React.FC = () => {
  return (
    <section id="why-gs" className="py-20 md:py-28 bg-bg-base relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full shadow-neu-pressed-sm bg-bg-base text-brand-accent font-mono text-xs font-semibold uppercase tracking-widest mb-4">
            <span>Why GS-Softwares</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Engineering Partners, Not Just Vendors.
          </h2>
          <p className="font-body text-base sm:text-lg text-text-secondary leading-relaxed">
            We don&apos;t just build websites and walk away. We engineer the reliable digital infrastructure behind sustainable business growth.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {differentiators.map((d, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`rounded-3xl bg-bg-base shadow-neu-flat p-8 flex flex-col justify-between group ${
                index === differentiators.length - 1 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl shadow-neu-flat-sm bg-bg-base group-hover:scale-110 transition-transform duration-300">
                    {d.icon}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-text-primary">
                    {d.title}
                  </h3>
                </div>
                <p className="font-body text-sm text-text-secondary leading-relaxed">
                  {d.description}
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-mono text-brand-success gap-1.5 pt-4 border-t border-black/5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Verified Architecture Standard</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
