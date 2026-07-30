"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { SanitySkill } from "@/types/sanity";

function SkillBar({ name, level }: { name: string; level: number }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-slate-900 dark:text-white text-sm font-semibold">{name}</span>
        <span className="text-[#2563EB] dark:text-[#60A5FA] text-xs hf-mono font-bold">{level}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden border border-slate-200 dark:border-white/5">
        <motion.div
          className="h-full rounded-full progress-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: animated ? `${level}%` : 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

function DotRating({ level }: { level: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className={i < level ? "dot-filled" : "dot-empty"} />
      ))}
    </div>
  );
}

interface SkillsSectionProps {
  skills: SanitySkill[];
  toolChips: string[];
}

export default function SkillsSection({ skills, toolChips }: SkillsSectionProps) {
  const technicalSkills = skills.filter((s) => s.category === "technical");
  const languages = skills.filter((s) => s.category === "language");

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#2563EB] dark:to-[#60A5FA]" />
            <span className="text-[#2563EB] dark:text-[#60A5FA] text-sm hf-mono font-semibold tracking-widest uppercase">
              Expertise
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#2563EB] dark:to-[#60A5FA]" />
          </div>
          <h2 className="section-heading text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Skills &amp; <span className="text-gradient">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-8 border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[.02] shadow-xl shadow-slate-900/5 dark:shadow-none"
          >
            <h3 className="hf-display font-bold text-xl text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#60A5FA]" />
              Technical Skills
            </h3>
            <div className="space-y-5">
              {technicalSkills.map((skill) => (
                <SkillBar key={skill._id} name={skill.name} level={skill.level} />
              ))}
            </div>
          </motion.div>

          {/* Languages + Tools */}
          <div className="space-y-6">
            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl p-8 border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[.02] shadow-xl shadow-slate-900/5 dark:shadow-none"
            >
              <h3 className="hf-display font-bold text-xl text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#60A5FA]" />
                Languages
              </h3>
              <div className="space-y-4">
                {languages.map((lang) => (
                  <div key={lang._id} className="flex items-center justify-between">
                    <span className="text-slate-800 dark:text-[#F1F5F9] text-sm font-semibold">{lang.name}</span>
                    <DotRating level={lang.languageLevel ?? lang.level} />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tool Chips */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl p-8 border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[.02] shadow-xl shadow-slate-900/5 dark:shadow-none"
            >
              <h3 className="hf-display font-bold text-xl text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#60A5FA]" />
                Tools &amp; Platforms
              </h3>
              <div className="flex flex-wrap gap-2">
                {toolChips.map((tool) => (
                  <motion.span
                    key={tool}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-3 py-1.5 rounded-full text-xs hf-mono font-semibold border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-[#94A3B8] hover:text-[#2563EB] dark:hover:text-[#60A5FA] hover:border-[#60A5FA] transition-all duration-200 cursor-default"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
