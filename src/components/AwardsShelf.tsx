"use client";

import { motion } from "framer-motion";
import { awards } from "@/lib/data";

export default function AwardsShelf() {
  return (
    <section id="awards" className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F172A]/60 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8A558]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8A558]/20 to-transparent" />

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
              Recognition
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C8A558]" />
          </div>
          <h2 className="section-heading text-4xl md:text-5xl font-bold text-white">
            Honors &amp; <span className="text-gradient">Awards</span>
          </h2>
          <p className="text-[#94A3B8] text-lg mt-4">
            Recognized by Govt. of India, IEEE, and global organizations.
          </p>
        </motion.div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {awards.map((award, i) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{
                y: -4,
                boxShadow: award.highlight
                  ? "0 0 40px rgba(245,158,11,0.2)"
                  : "0 0 30px rgba(200,165,88,0.15)",
              }}
              className={`glass-card rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 ${
                award.highlight
                  ? "border border-yellow-400/30"
                  : "border border-white/5"
              }`}
            >
              {/* Icon */}
              <div className="text-4xl">{award.icon}</div>

              {/* Content */}
              <div className="flex flex-col gap-1">
                <h3
                  className={`font-semibold text-sm leading-snug ${
                    award.highlight ? "text-yellow-300" : "text-white"
                  }`}
                >
                  {award.title}
                </h3>
                <p className="text-[#94A3B8] text-xs">{award.issuer}</p>
                {award.via && (
                  <p className="text-[#64748B] text-xs">{award.via}</p>
                )}
              </div>

              {/* Year Badge */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                <span
                  className={`text-xs hf-mono font-medium px-2 py-1 rounded-full ${
                    award.highlight
                      ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/30"
                      : "bg-white/5 text-[#94A3B8] border border-white/10"
                  }`}
                >
                  {award.year}
                </span>
                {award.highlight && (
                  <span className="text-xs text-yellow-400 font-medium">
                    Gov. Funded ★
                  </span>
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
          className="mt-12 glass-card rounded-2xl p-6 border border-[#C8A558]/20 text-center"
          style={{ boxShadow: "0 0 40px rgba(200,165,88,0.1)" }}
        >
          <div className="text-2xl mb-2">🏆</div>
          <p className="text-white font-semibold">
            Government of India Recognized Researcher
          </p>
          <p className="text-[#94A3B8] text-sm mt-2">
            PRISM grant by DSIR (via IIT Kharagpur) & MeitY TIDE Fund (via SINE
            IIT Bombay) — awarded for pioneering research in IoT and AI-driven
            systems.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
