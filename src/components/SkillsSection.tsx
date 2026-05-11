"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { technicalSkills, languages, toolChips } from "@/lib/data";

function SkillBar({ name, level }: { name: string; level: number }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimated(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-white text-sm font-medium">{name}</span>
        <span className="text-[#C8A558] text-xs hf-mono">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
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

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C8A558]" />
            <span className="text-[#C8A558] text-sm hf-mono font-medium tracking-widest uppercase">
              Expertise
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C8A558]" />
          </div>
          <h2 className="section-heading text-4xl md:text-5xl font-bold text-white">
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
            className="glass-card rounded-2xl p-8 border border-white/5"
          >
            <h3 className="hf-display font-bold text-xl text-white mb-6 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gradient-to-br from-[#C8A558] to-[#C8A558]" />
              Technical Skills
            </h3>
            <div className="space-y-5">
              {technicalSkills.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
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
              className="glass-card rounded-2xl p-8 border border-white/5"
            >
              <h3 className="hf-display font-bold text-xl text-white mb-6 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gradient-to-br from-[#C8A558] to-[#E2C07A]" />
                Languages
              </h3>
              <div className="space-y-4">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between">
                    <span className="text-[#F1F5F9] text-sm font-medium">{lang.name}</span>
                    <DotRating level={lang.level} />
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
              className="glass-card rounded-2xl p-8 border border-white/5"
            >
              <h3 className="hf-display font-bold text-xl text-white mb-5 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gradient-to-br from-[#C8A558] to-[#E2C07A]" />
                Tools & Platforms
              </h3>
              <div className="flex flex-wrap gap-2">
                {toolChips.map((tool) => (
                  <motion.span
                    key={tool}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="px-3 py-1.5 rounded-full text-xs hf-mono font-medium glass-card border border-white/10 text-[#94A3B8] hover:text-[#C8A558] hover:border-[#C8A558]/40 transition-all duration-200 cursor-default"
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
