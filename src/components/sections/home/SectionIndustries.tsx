"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Utensils, Dumbbell, Sparkles, Briefcase, ShoppingBag, GraduationCap, Building2, Rocket } from "lucide-react";
import { industrySolutions } from "@/data/industriesData";

const iconMap: Record<string, React.ReactNode> = {
  utensils: <Utensils className="h-6 w-6 text-[#F59E0B]" />,
  dumbbell: <Dumbbell className="h-6 w-6 text-[#10B981]" />,
  sparkles: <Sparkles className="h-6 w-6 text-[#EC4899]" />,
  briefcase: <Briefcase className="h-6 w-6 text-[#4A65DC]" />,
  "shopping-bag": <ShoppingBag className="h-6 w-6 text-[#F97316]" />,
  "graduation-cap": <GraduationCap className="h-6 w-6 text-[#8B5CF6]" />,
  "building-2": <Building2 className="h-6 w-6 text-[#0EA5E9]" />,
  rocket: <Rocket className="h-6 w-6 text-brand-success" />,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
    },
  },
};

export const SectionIndustries: React.FC = () => {
  return (
    <section id="solutions" className="py-20 md:py-28 bg-bg-base relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full shadow-neu-pressed-sm bg-bg-base text-brand-accent font-mono text-xs font-semibold uppercase tracking-widest mb-4">
            <span>Solutions by Industry</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Built for Businesses Like Yours.
          </h2>
          <p className="font-body text-base sm:text-lg text-text-secondary leading-relaxed">
            Every sector faces specific operational hurdles. We engineer tailored workflows, customer portals, and management dashboards optimized for your exact industry.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {industrySolutions.map((ind) => (
            <motion.div
              key={ind.id}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              <Link
                href={`/solutions/${ind.slug}`}
                className="h-full rounded-3xl bg-bg-base shadow-neu-flat hover:shadow-neu-pressed p-6 flex flex-col justify-between transition-all duration-300 group block"
              >
                <div>
                  <div className="p-3 rounded-2xl shadow-neu-flat-sm bg-bg-base w-fit mb-5 group-hover:scale-110 transition-transform duration-300">
                    {iconMap[ind.iconKey]}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-text-primary mb-2">
                    {ind.name}
                  </h3>
                  <p className="font-body text-xs text-text-muted mb-4 line-clamp-2 leading-relaxed">
                    {ind.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5 flex items-center justify-between text-brand-accent font-semibold text-xs mt-2">
                  <span>View Solutions</span>
                  <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
