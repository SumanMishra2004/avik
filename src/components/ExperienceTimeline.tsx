"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import type { SanityExperience } from "@/types/sanity";

interface ExperienceTimelineProps {
  experience: SanityExperience[];
}

export default function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
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
              Work History
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#9E7B28] dark:to-[#C8A558]" />
          </div>
          <h2 className="section-heading text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-slate-600 dark:text-[#94A3B8] text-lg mt-4">
            6+ years of academic excellence, research, and engineering
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C8A558] via-[#C8A558]/40 to-transparent md:-translate-x-px" />

          <div className="space-y-8">
            {experience.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`relative flex flex-col md:flex-row gap-4 md:gap-24 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } pl-20 md:pl-0`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 top-6 -translate-y-1/2 md:-translate-x-1/2 z-10">
                    <motion.div
                      whileInView={{ scale: [0, 1.3, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 + 0.2 }}
                      className={`timeline-dot ${item.isCurrent ? "timeline-dot-current" : ""}`}
                    />
                  </div>

                  {/* Date Badge */}
                  <div className={`hidden md:flex md:w-5/12 ${isLeft ? "justify-end" : "justify-start"} items-start pt-2`}>
                    <div className={isLeft ? "text-right" : "text-left"}>
                      <div className="text-[#9E7B28] dark:text-[#C8A558] text-sm hf-mono font-semibold">{item.duration}</div>
                      <div className="text-slate-500 dark:text-[#64748B] text-xs mt-1">{item.years}</div>
                    </div>
                  </div>

                  {/* Card */}
                  <div className="md:w-5/12">
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="rounded-2xl p-5 border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[.02] shadow-xl shadow-slate-900/5 dark:shadow-none hover:border-[#C8A558]/40 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="hf-display font-bold text-slate-900 dark:text-white text-base">{item.role}</h3>
                        {item.isCurrent && (
                          <span className="flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
                            CURRENT
                          </span>
                        )}
                      </div>
                      {item.department && (
                        <p className="text-[#9E7B28] dark:text-[#C8A558]/90 text-xs font-semibold mb-1">{item.department}</p>
                      )}
                      <p className="text-slate-600 dark:text-[#94A3B8] text-sm">{item.institution}</p>
                      <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-500 dark:text-[#64748B]">
                        <span className="flex items-center gap-1 md:hidden">
                          <Calendar size={12} />
                          {item.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {item.location}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
