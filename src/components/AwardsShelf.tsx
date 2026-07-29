"use client";

import { motion } from "framer-motion";
import type { SanityAward } from "@/types/sanity";

interface AwardsShelfProps {
  awards: SanityAward[];
}

export default function AwardsShelf({ awards }: AwardsShelfProps) {
  return (
    <section id="awards" className="py-24 relative overflow-hidden">
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
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#9E7B28] dark:to-[#C8A558]" />
            <span className="text-[#9E7B28] dark:text-[#C8A558] text-sm hf-mono font-semibold tracking-widest uppercase">
              Recognition
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#9E7B28] dark:to-[#C8A558]" />
          </div>
          <h2 className="section-heading text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Honors &amp; <span className="text-gradient">Awards</span>
          </h2>
          <p className="text-slate-600 dark:text-[#94A3B8] text-lg mt-4">
            Recognized by Govt. of India, IEEE, and global organizations.
          </p>
        </motion.div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {awards.map((award, i) => (
            <motion.div
              key={award._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className={`rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 border bg-white dark:bg-white/[.02] shadow-xl shadow-slate-900/5 dark:shadow-none ${
                award.highlight
                  ? "border-amber-400/50 bg-amber-500/5 dark:bg-amber-500/10"
                  : "border-slate-200 dark:border-white/5 hover:border-[#C8A558]/40"
              }`}
            >
              <div className="text-4xl">{award.icon}</div>
              <div className="flex flex-col gap-1">
                <h3 className={`font-bold text-sm leading-snug ${award.highlight ? "text-amber-800 dark:text-yellow-300" : "text-slate-900 dark:text-white"}`}>
                  {award.title}
                </h3>
                <p className="text-slate-600 dark:text-[#94A3B8] text-xs font-medium">{award.issuer}</p>
                {award.via && <p className="text-slate-500 dark:text-[#64748B] text-xs">{award.via}</p>}
              </div>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-200 dark:border-white/5">
                <span className={`text-xs hf-mono font-semibold px-2.5 py-1 rounded-full ${
                  award.highlight
                    ? "bg-amber-400/20 text-amber-900 dark:text-yellow-400 border border-amber-400/40"
                    : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-[#94A3B8] border border-slate-200 dark:border-white/10"
                }`}>
                  {award.year}
                </span>
                {award.highlight && (
                  <span className="text-xs text-amber-800 dark:text-yellow-400 font-bold">Gov. Funded ★</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 rounded-2xl p-6 border border-[#C8A558]/40 bg-white dark:bg-white/[.02] text-center shadow-xl shadow-slate-900/5 dark:shadow-none"
        >
          <div className="text-3xl mb-2">🏆</div>
          <p className="text-slate-900 dark:text-white font-bold text-base">Government of India Recognized Researcher</p>
          <p className="text-slate-600 dark:text-[#94A3B8] text-sm mt-2 max-w-2xl mx-auto">
            PRISM grant by DSIR (via IIT Kharagpur) &amp; MeitY TIDE Fund (via SINE IIT Bombay) — awarded for
            pioneering research in IoT and AI-driven systems.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
