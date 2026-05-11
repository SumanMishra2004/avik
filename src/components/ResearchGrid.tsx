"use client";

import { motion } from "framer-motion";
import {
  Radio,
  Waves,
  Brain,
  Wifi,
  Lightbulb,
  Activity,
  Mountain,
  Zap,
} from "lucide-react";
import { researchInterests } from "@/lib/data";

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
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ResearchGrid() {
  return (
    <section id="research" className="py-24 relative">
      {/* Section background accent */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />

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
              Research Areas
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C8A558]" />
          </div>
          <h2 className="section-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Research{" "}
            <span className="text-gradient">Interests</span>
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {researchInterests.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 40px rgba(200,165,88,0.2)",
              }}
              className="glass-card rounded-2xl p-6 flex flex-col gap-4 cursor-default group transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl  bg-[#C8A558] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {ICON_MAP[item.icon]}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-white text-sm leading-snug group-hover:text-[#C8A558] transition-colors duration-300">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[#94A3B8] text-xs leading-relaxed flex-1">
                {item.description}
              </p>

              {/* Bottom accent line */}
              <div className="h-[2px] w-0 bg-gradient-to-r from-[#C8A558] to-[#C8A558] rounded-full group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
