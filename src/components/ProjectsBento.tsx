"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const FILTER_TABS = ["All", "IoT", "AI/ML", "Communication", "GNSS"];

const CATEGORY_COLORS: Record<string, string> = {
  IoT: "from-[#A68541] to-[#C8A558]",
  "AI/ML": "from-[#C8A558] to-[#C8A558]",
  Communication: "from-[#C8A558] to-[#C8A558]",
  GNSS: "from-[#E2C07A] to-[#C8A558]",
};

type ProjectItem = {
  id: string;
  category: string;
  status: string;
  title: string;
  description: string;
  institution: string;
  duration: string;
  featured: boolean;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  funded?: string;
};

export default function ProjectsBento() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [dbProjects, setDbProjects] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        const mapped = data.map(p => {
          // Attempt to assign a category based on tech_stack
          let cat = "AI/ML";
          if (p.tech_stack && p.tech_stack.length > 0) {
            const firstTech = p.tech_stack[0].toUpperCase();
            if (firstTech.includes("IOT")) cat = "IoT";
            else if (firstTech.includes("GNSS") || firstTech.includes("GPS")) cat = "GNSS";
            else if (firstTech.includes("COMM") || firstTech.includes("RF")) cat = "Communication";
          }
          return {
            id: p.id,
            category: cat,
            status: "Active",
            title: p.title,
            description: p.description,
            institution: "Research", // Placeholder since it's not in db yet
            duration: "Present",
            featured: false, // Could compute this if needed
            techStack: p.tech_stack,
            githubUrl: p.github_url,
            liveUrl: p.live_url,
            imageUrl: p.image_url
          };
        });
        setDbProjects(mapped);
      }
      setIsLoading(false);
    }
    fetchProjects();
  }, []);

  const filtered = activeFilter === "All"
    ? dbProjects
    : dbProjects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-12 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C8A558]" />
            <span className="text-[#C8A558] text-sm hf-mono font-medium tracking-widest uppercase">
              Active Research
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C8A558]" />
          </div>
          <h2 className="section-heading text-4xl md:text-5xl font-bold text-white">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-[#94A3B8] text-lg mt-4 max-w-2xl mx-auto">
            16+ active research projects spanning IoT, AI/ML, wireless communication, and precision navigation.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              id={`filter-${tab.toLowerCase().replace("/", "-")}`}
              onClick={() => setActiveFilter(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeFilter === tab
                  ? "bg-gradient-to-r from-[#C8A558] to-[#C8A558] text-white shadow-[0_0_20px_rgba(200,165,88,0.3)]"
                  : "glass-card text-[#94A3B8] hover:text-white hover:border-[#C8A558]/30 border border-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-20 text-[#C8A558]"
            >
              <Loader2 className="w-8 h-8 animate-spin" />
            </motion.div>
          ) : (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 0 35px rgba(200,165,88,0.15)",
                }}
                className={`glass-card rounded-2xl p-6 border flex flex-col gap-4 transition-all duration-300 ${
                  project.featured
                    ? "border-[#C8A558]/30 md:col-span-2 lg:col-span-2 shadow-[0_0_20px_rgba(200,165,88,0.05)]"
                    : "border-white/5 col-span-1"
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                      CATEGORY_COLORS[project.category]
                    } flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                  >
                    {project.category === "IoT"
                      ? "IoT"
                      : project.category === "AI/ML"
                      ? "AI"
                      : project.category === "GNSS"
                      ? "GPS"
                      : "RF"}
                  </div>
                  <div className="flex flex-wrap gap-1 justify-end">
                    <span className="px-2 py-0.5 rounded-full text-xs badge-active">
                      {project.status}
                    </span>
                    {project.funded && (
                      <span className="px-2 py-0.5 rounded-full text-xs badge-funded">
                        {project.funded}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="hf-display font-bold text-white text-base mb-1 group-hover:text-[#C8A558]">
                    {project.title}
                  </h3>
                  <p className="text-[#94A3B8] text-xs leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#64748B]">
                  <span>{project.institution}</span>
                  <span className="hf-mono">{project.duration}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
          )}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#64748B]">
            No projects in this category yet.
          </div>
        )}
      </div>
    </section>
  );
}
