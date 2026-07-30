"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import type { SanityEducation, SanitySiteSettings } from "@/types/sanity";

interface AboutSectionProps {
  personalInfo: Pick<SanitySiteSettings, "name" | "bio" | "email" | "phone" | "location" | "identityBadges">;
  education: SanityEducation[];
}

export default function AboutSection({ personalInfo, education }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 relative">
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
              About Me
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#2563EB] dark:to-[#60A5FA]" />
          </div>
          <h2 className="section-heading text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Who I <span className="text-gradient">Am</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Bio + Badges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Bio card */}
            <div className="rounded-2xl p-8 border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[.02] shadow-xl shadow-slate-900/5 dark:shadow-none">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center text-white hf-display font-bold text-xl shadow-lg flex-shrink-0">
                  AKD
                </div>
                <div>
                  <h3 className="hf-display font-bold text-xl text-slate-900 dark:text-white">
                    {personalInfo.name}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-[#94A3B8] text-sm mt-1">
                    <MapPin size={14} className="text-[#2563EB] dark:text-[#60A5FA]" />
                    <span>{personalInfo.location}</span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Currently Active — UEM Kolkata
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-slate-600 dark:text-[#94A3B8] leading-relaxed text-sm">
                {personalInfo.bio}
              </p>
            </div>

            {/* Identity Badges */}
            <div className="rounded-2xl p-6 border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[.02] shadow-xl shadow-slate-900/5 dark:shadow-none">
              <h4 className="text-slate-900 dark:text-white font-semibold text-sm mb-4 flex items-center gap-2">
                <Briefcase size={16} className="text-[#2563EB] dark:text-[#60A5FA]" />
                Identity &amp; Roles
              </h4>
              <div className="flex flex-wrap gap-2">
                {personalInfo.identityBadges.map((badge) => (
                  <motion.span
                    key={badge}
                    whileHover={{ scale: 1.05, y: -1 }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[#2563EB] dark:text-[#60A5FA] hover:border-[#60A5FA] transition-all duration-200 cursor-default"
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Contact chips */}
            <div className="rounded-2xl p-6 border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[.02] shadow-xl shadow-slate-900/5 dark:shadow-none">
              <h4 className="text-slate-900 dark:text-white font-semibold text-sm mb-4">
                Get In Touch
              </h4>
              <div className="space-y-3">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 text-slate-600 dark:text-[#94A3B8] text-sm hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#2563EB] dark:text-[#60A5FA] group-hover:bg-[#60A5FA]/20 transition-colors font-bold">
                    @
                  </div>
                  <span>{personalInfo.email}</span>
                </a>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-3 text-slate-600 dark:text-[#94A3B8] text-sm hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#2563EB] dark:text-[#60A5FA] text-xs group-hover:bg-[#60A5FA]/20 transition-colors">
                    📞
                  </div>
                  <span>{personalInfo.phone}</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="hf-display font-bold text-xl text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="text-gradient">Education</span> Timeline
            </h3>

            <div className="relative space-y-4">
              {/* Vertical line */}
              <div className="absolute left-4 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#60A5FA] via-[#60A5FA]/40 to-transparent" />

              {education.map((edu, i) => (
                <motion.div
                  key={edu._id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-6 pl-2"
                >
                  {/* Dot */}
                  <div className="relative flex-shrink-0 flex items-start pt-4">
                    <div
                      className={`timeline-dot z-10 ${i === 0 ? "timeline-dot-current" : ""}`}
                    />
                  </div>

                  {/* Content */}
                  <div className="rounded-xl p-5 flex-1 border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[.02] shadow-md dark:shadow-none hover:border-[#60A5FA]/40 transition-all duration-300 group">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="hf-display font-bold text-slate-900 dark:text-white text-base group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">
                          {edu.degree}
                        </span>
                        {edu.grade && (
                          <span className="ml-2 text-xs text-[#2563EB] dark:text-[#60A5FA] hf-mono font-medium">
                            {edu.grade}
                          </span>
                        )}
                      </div>
                      <span
                        className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full font-mono ${
                          i === 0
                            ? "text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30"
                            : "text-slate-600 dark:text-[#94A3B8] bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                        }`}
                      >
                        {i === 0 ? "In Progress" : "Completed"}
                      </span>
                    </div>
                    <p className="text-[#2563EB] dark:text-[#60A5FA]/90 text-xs font-semibold mb-1">
                      {edu.field}
                    </p>
                    <p className="text-slate-600 dark:text-[#94A3B8] text-xs">
                      {edu.institution}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-slate-400 dark:text-[#64748B] text-xs font-mono">
                      <Calendar size={12} />
                      <span>{edu.duration}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
