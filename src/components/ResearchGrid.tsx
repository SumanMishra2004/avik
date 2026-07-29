"use client";

import { motion } from "framer-motion";
import {
  Radio, Waves, Brain, Wifi, Lightbulb, Activity, Mountain, Zap, UserCheck, Mail
} from "lucide-react";
import type { SanityResearchInterest } from "@/types/sanity";

const ICON_MAP: Record<string, React.ReactNode> = {
  Radio: <Radio size={28} />,
  Waves: <Waves size={28} />,
  Brain: <Brain size={28} />,
  Wifi: <Wifi size={28} />,
  Lightbulb: <Lightbulb size={28} />,
  Activity: <Activity size={28} />,
  Mountain: <Mountain size={28} />,
  Zap: <Zap size={28} />,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

interface ResearchGridProps {
  interests: SanityResearchInterest[];
}

export default function ResearchGrid({ interests }: ResearchGridProps) {
  return (
    <section id="research" className="py-24 relative">
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
              Research Areas
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#9E7B28] dark:to-[#C8A558]" />
          </div>
          <h2 className="section-heading text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Research <span className="text-gradient">Interests</span>
          </h2>
          <p className="text-slate-600 dark:text-[#94A3B8] text-lg max-w-2xl mx-auto">
            Working at the intersection of cutting-edge communication theory,
            deep learning, and embedded systems engineering.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {interests.map((item) => (
            <motion.div
              key={item._id}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[.02] p-6 flex flex-col justify-between cursor-default group shadow-xl shadow-slate-900/5 dark:shadow-none hover:border-[#C8A558]/50 transition-all duration-300"
            >
              <div>
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C8A558] to-[#A68541] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300 mb-4">
                  {ICON_MAP[item.icon] ?? <Zap size={28} />}
                </div>

                {/* Title */}
                <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug group-hover:text-[#9E7B28] dark:group-hover:text-[#C8A558] transition-colors duration-300 mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 dark:text-[#94A3B8] text-xs leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Corresponding Authors */}
              {item.correspondingAuthors && item.correspondingAuthors.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#9E7B28] dark:text-[#C8A558] uppercase tracking-wider mb-1">
                    <UserCheck size={12} /> Lead Corresponding Author
                  </div>
                  {item.correspondingAuthors.slice(0, 1).map((ca, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                      <span className="font-semibold">{ca.name}</span>
                      {ca.email && (
                        <a href={`mailto:${ca.email}`} className="text-[#9E7B28] dark:text-[#C8A558] hover:underline inline-flex items-center gap-0.5 text-[11px]">
                          <Mail size={11} /> Contact
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom accent line */}
              <div className="h-[2px] w-0 bg-[#C8A558] rounded-full group-hover:w-full transition-all duration-500 mt-4" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
