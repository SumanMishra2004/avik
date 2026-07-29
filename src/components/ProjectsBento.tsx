"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranchIcon, ArrowRight, Mail, UserCheck } from "lucide-react";
import type { SanityProject } from "@/types/sanity";

const FILTER_TABS = ["All", "IoT", "AI/ML", "Communication", "GNSS"];

interface ProjectsBentoProps {
  projects: SanityProject[];
}

export default function ProjectsBento({ projects }: ProjectsBentoProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-16 relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#9E7B28] dark:to-[#C8A558]" />
            <span className="text-[#9E7B28] dark:text-[#C8A558] text-xs hf-mono font-semibold tracking-widest uppercase">
              Current Focus
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#9E7B28] dark:to-[#C8A558]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Featured <span className="text-[#9E7B28] dark:text-[#C8A558]">Projects</span>
          </h2>
          <p className="text-slate-600 dark:text-[#94A3B8] text-lg max-w-2xl mx-auto">
            Exploring the frontiers of connectivity, machine intelligence, and systems engineering.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === tab
                  ? "bg-[#C8A558] text-slate-950 font-bold shadow-lg shadow-[#C8A558]/20"
                  : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-[#94A3B8] hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* List View */}
        <div className="space-y-12">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 text-slate-400 dark:text-[#64748B] text-lg"
              >
                No projects found for this category.
              </motion.div>
            ) : (
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-12"
              >
                {filtered.map((project, i) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="group flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[.02] hover:border-[#C8A558]/40 shadow-xl shadow-slate-900/5 dark:shadow-none transition-all duration-500"
                  >
                    {/* Image Container - alternates left/right based on index */}
                    <div className={`w-full lg:w-1/2 rounded-2xl overflow-hidden bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 aspect-video relative min-h-[260px] ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                      {project.image?.asset?.url ? (
                        <div 
                           className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                           style={{ backgroundImage: `url(${project.image.asset.url})` }}
                        />
                      ) : (
                         <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#0A0F1E] dark:to-[#1a2235] flex flex-col items-center justify-center text-[#9E7B28] dark:text-[#C8A558]/40">
                            <span className="font-display text-4xl font-bold">{project.category}</span>
                            <span className="text-sm tracking-widest uppercase mt-2 opacity-70">Project</span>
                         </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className={`w-full lg:w-1/2 flex flex-col justify-between ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5 mb-4">
                          <span className="px-3 py-1 rounded-full text-xs uppercase tracking-widest font-mono text-[#9E7B28] dark:text-[#C8A558] bg-[#C8A558]/10 border border-[#C8A558]/30 font-semibold">
                            {project.category}
                          </span>
                          <span className="text-slate-600 dark:text-[#94A3B8] text-xs font-mono border border-slate-200 dark:border-white/10 px-3 py-1 rounded-full bg-slate-50 dark:bg-transparent">
                            {project.status}
                          </span>
                          {project.funded && (
                            <span className="text-emerald-700 dark:text-emerald-400 text-xs font-mono border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-full font-medium">
                              {project.funded}
                            </span>
                          )}
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#9E7B28] dark:group-hover:text-[#C8A558] transition-colors leading-tight">
                          {project.title}
                        </h3>
                        
                        <p className="text-slate-600 dark:text-[#94A3B8] text-sm sm:text-base leading-relaxed mb-4">
                          {project.description}
                        </p>

                        {/* Authors / Team */}
                        {project.authors && project.authors.length > 0 && (
                          <p className="text-slate-500 dark:text-[#64748B] text-xs sm:text-sm mb-4">
                            <span className="text-[#9E7B28] dark:text-[#E2C07A] font-semibold mr-1.5">Collaborators:</span>
                            {project.authors.join(", ")}
                          </p>
                        )}

                        {/* Corresponding Authors Section */}
                        {project.correspondingAuthors && project.correspondingAuthors.length > 0 && (
                          <div className="mb-5 p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#9E7B28] dark:text-[#C8A558] uppercase tracking-wider mb-2">
                              <UserCheck size={14} />
                              Corresponding Author Details
                            </div>
                            <div className="flex flex-col gap-2">
                              {project.correspondingAuthors.map((ca, idx) => (
                                <div key={idx} className="flex flex-wrap items-center justify-between gap-2 text-xs">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-slate-900 dark:text-white">{ca.name}</span>
                                    {ca.role && (
                                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C8A558]/20 text-[#9E7B28] dark:text-[#E2C07A] font-mono">
                                        {ca.role}
                                      </span>
                                    )}
                                    {ca.affiliation && (
                                      <span className="text-slate-500 dark:text-white/50 text-[11px]">
                                        ({ca.affiliation})
                                      </span>
                                    )}
                                  </div>
                                  {ca.email && (
                                    <a
                                      href={`mailto:${ca.email}`}
                                      className="inline-flex items-center gap-1 text-[11px] text-[#9E7B28] dark:text-[#C8A558] hover:underline font-medium"
                                    >
                                      <Mail size={12} /> {ca.email}
                                    </a>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tech Stack Chips */}
                        {project.techStack && project.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-[#cbd5e1] font-mono"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-white/10">
                         <div className="flex flex-col gap-0.5">
                           {project.institution && (
                             <span className="text-xs font-semibold text-slate-800 dark:text-[#E2E8F0]">{project.institution}</span>
                           )}
                           {project.duration && (
                             <span className="text-[11px] font-mono text-slate-500 dark:text-[#64748B]">{project.duration}</span>
                           )}
                         </div>

                         <div className="flex items-center gap-4">
                           {project.githubUrl && (
                             <a
                               href={project.githubUrl}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white transition-colors"
                             >
                               <GitBranchIcon size={16} /> Source
                             </a>
                           )}
                           {project.liveUrl && (
                             <a
                               href={project.liveUrl}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="flex items-center gap-1.5 text-xs font-bold text-[#9E7B28] dark:text-[#C8A558] hover:underline transition-colors"
                             >
                               View Project <ArrowRight size={14} />
                             </a>
                           )}
                         </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
