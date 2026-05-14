"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranchIcon, ExternalLink, ArrowRight } from "lucide-react";
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0F1E]/40 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#C8A558]" />
            <span className="text-[#C8A558] text-xs hf-mono tracking-widest uppercase">
              Current Focus
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#C8A558]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="text-[#C8A558]">Projects</span>
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
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
                  ? "bg-[#C8A558] text-[#0A0F1E] shadow-[0_0_20px_rgba(200,165,88,0.3)]"
                  : "bg-white/5 text-[#94A3B8] hover:bg-white/10 hover:text-white border border-white/5"
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
                className="text-center py-20 text-[#64748B] text-lg"
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
                    className="group flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"
                  >
                    {/* Image Container - alternates left/right based on index */}
                    <div className={`w-full lg:w-1/2 rounded-3xl overflow-hidden bg-white/5 border border-white/10 aspect-video relative group-hover:border-[#C8A558]/40 transition-colors duration-500 ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                      {project.image?.asset?.url ? (
                        <div 
                           className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                           style={{ backgroundImage: `url(${project.image.asset.url})` }}
                        />
                      ) : (
                         <div className="w-full h-full bg-gradient-to-br from-[#0A0F1E] to-[#1a2235] flex flex-col items-center justify-center text-[#C8A558]/30">
                            <span className="font-display text-4xl font-bold">{project.category}</span>
                            <span className="text-sm tracking-widest uppercase mt-2 opacity-50">Project</span>
                         </div>
                      )}
                      
                      {/* Overlay gradients */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E]/80 via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Content */}
                    <div className={`w-full lg:w-1/2 flex flex-col ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                      <div className="flex flex-wrap items-center gap-3 mb-5">
                        <span className="px-3 py-1 rounded-full text-xs uppercase tracking-widest font-mono text-[#C8A558] bg-[#C8A558]/10 border border-[#C8A558]/20">
                          {project.category}
                        </span>
                        <span className="text-[#64748B] text-xs font-mono border border-white/10 px-3 py-1 rounded-full">
                          {project.status}
                        </span>
                        {project.funded && (
                          <span className="text-green-400 text-xs font-mono border border-green-400/20 bg-green-400/10 px-3 py-1 rounded-full">
                            {project.funded}
                          </span>
                        )}
                      </div>

                      <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-[#C8A558] transition-colors leading-tight">
                        {project.title}
                      </h3>
                      
                      <p className="text-[#94A3B8] text-base leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {project.authors && project.authors.length > 0 && (
                        <p className="text-[#64748B] text-sm mb-6">
                          <span className="text-[#E2C07A]/70 font-medium mr-2">Team:</span>
                          {project.authors.join(", ")}
                        </p>
                      )}

                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[#cbd5e1]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                         <div className="flex flex-col gap-1">
                           {project.institution && (
                             <span className="text-sm font-medium text-[#E2E8F0]">{project.institution}</span>
                           )}
                           {project.duration && (
                             <span className="text-xs font-mono text-[#64748B]">{project.duration}</span>
                           )}
                         </div>

                         <div className="flex items-center gap-4">
                           {project.githubUrl && (
                             <a
                               href={project.githubUrl}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="flex items-center gap-2 text-sm font-medium text-[#94A3B8] hover:text-white transition-colors"
                             >
                               <GitBranchIcon size={18} /> Source
                             </a>
                           )}
                           {project.liveUrl && (
                             <a
                               href={project.liveUrl}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="flex items-center gap-2 text-sm font-bold text-[#C8A558] hover:text-[#E2C07A] transition-colors"
                             >
                               View Project <ArrowRight size={16} />
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
