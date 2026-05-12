"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Download } from "lucide-react";
import { personalInfo, heroStats } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

/* ─── Scroll-reveal variants (whileInView only — no entrance anim) ── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const TAGS = [
  "Associate Professor",
  "AI & Machine Learning",
  "14 Patents",
];

export default function HeroSection() {
  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex flex-col lg:gap-8 gap-1 overflow-hidden"
      >
     
       


        {/* ══════════════════════════════════════════════════
            TOP BAR
        ══════════════════════════════════════════════════ */}
  
        {/* ══════════════════════════════════════════════════
            MAIN HERO GRID
        ══════════════════════════════════════════════════ */}
        <div className="relative z-10 flex-1 max-w-[1360px] mx-auto w-full px-6 lg:px-12 pt-10 pb-0 grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_460px] items-end gap-0">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col pb-0">

            {/* Eyebrow rule */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-10 bg-[#C8A558]" />
              <span className="hf-mono text-[10px] tracking-[0.28em] text-[#C8A558] uppercase">
                PhD · IIest Shibpur &nbsp;·&nbsp; Associate Professor · UEM Kolkata
              </span>
            </motion.div>

            {/* ── DISPLAY NAME ── */}
            <div className="overflow-hidden">
              <motion.h1
                className="hf-display font-medium leading-[0.86] tracking-[-0.01em] text-white"
                style={{
                  fontSize: "clamp(3rem, 7vw, 6.5rem)",
                }}
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                Avik Kumar{" "}
                <em
                  className="not-italic"
                  style={{ color: "#C8A558" }}
                >
                  Das
                </em>
              </motion.h1>
            </div>

            {/* ── ROLE TAGS ── */}
            <motion.div
              className="flex flex-wrap gap-2 mt-8 mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.6 }}
            >
              {TAGS.map((t) => (
                <span key={t} className="hero-tag hf-mono">
                  {t}
                </span>
              ))}
            </motion.div>

            {/* ── BIO ── */}
            <motion.p
              className="hf-body text-white/38 text-[15px] leading-[1.8] max-w-[560px] mb-10"
              style={{ color: "rgba(255,255,255,0.36)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.72 }}
            >
              Pioneering research in Wireless Communication, Underwater Acoustics, LLMs & IoT.
              Funded by{" "}
              <span style={{ color: "rgba(255,255,255,0.72)" }}>PRISM (DSIR)</span> &{" "}
              <span style={{ color: "rgba(255,255,255,0.72)" }}>MeitY TIDE</span> grants.
              Author of 60+ peer-reviewed papers across IEEE, Springer & Taylor&nbsp;&amp;&nbsp;Francis.
            </motion.p>

            {/* ── CTAs ── */}
            <motion.div
              className="flex flex-wrap gap-3 pb-12"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.82 }}
            >
              <Link
                href="/publications"
              
                className="cta-gold hf-body inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                View Research
                <ArrowUpRight size={14} />
              </Link>
              <Link
                href="/#contact"
                className="cta-ghost hf-body inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <Mail size={14} />
                Collaborate
              </Link>
              <Link
                href="/CV.pdf"
                target="_blank"
                className="cta-ghost hf-body inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <Download size={14} />
                Download CV
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: Photo ── */}
          <motion.div
            className="hidden lg:flex justify-end items-end self-end"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Gold offset frame */}
              <div
                aria-hidden
                className="absolute inset-0 translate-x-3 translate-y-3 -z-10"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)",
                  background:
                    "linear-gradient(160deg, rgba(200,165,88,0.35) 0%, rgba(200,165,88,0.08) 60%, transparent 100%)",
                }}
              />

              {/* Photo */}
              <div
                className="relative overflow-hidden"
                style={{
                  width: "clamp(260px, 26vw, 380px)",
                  height: "clamp(340px, 34vw, 480px)",
                  clipPath: "polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)",
                }}
              >
                <Image
                  src="/profile.png"
                  alt="Dr. Avik Kumar Das — Associate Professor & Researcher"
                  fill
                  className="object-cover object-top"
                  style={{ filter: "contrast(1.04) saturate(0.92)" }}
                  priority
                />
                {/* Bottom fade */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(12,14,19,0.55) 0%, rgba(12,14,19,0.1) 35%, transparent 60%)",
                  }}
                />
              </div>

              {/* Floating card — top left */}
              <motion.div
                className="absolute -left-14 top-14 bg-[#161920]/50 backdrop-blur-2xl border border-white/8 rounded-md px-4 py-3 shadow-2xl"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="hf-mono text-[9px] text-[#C8A558] tracking-widest mb-1">FUNDED RESEARCH</p>
                <p className="hf-body text-white text-sm font-medium leading-none">PRISM · DSIR</p>
                <p className="hf-body text-white/30 text-[11px] mt-1">MeitY TIDE Grant</p>
              </motion.div>

              {/* Floating card — bottom right */}
              <motion.div
                className="absolute -right-10 bottom-24 bg-[#C8A558]/80 backdrop-blur-2xl rounded-md px-4 py-3 shadow-2xl"
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              >
                <p
                  className="hf-mono text-[9px] tracking-widest mb-1"
                  style={{ color: "rgba(12,14,19,0.6)" }}
                >
                  RESEARCH OUTPUT
                </p>
                <p className="hf-body text-[#0C0E13] text-sm font-semibold leading-none">60+ Papers</p>
                <p className="hf-body text-[11px] mt-1" style={{ color: "rgba(12,14,19,0.55)" }}>
                  IEEE · Springer · T&amp;F
                </p>
              </motion.div>

              {/* Vertical label */}
              <div
                className="absolute -left-8 bottom-20 flex flex-col items-center gap-3"
                style={{ writingMode: "vertical-rl" }}
              >
                <div className="w-px h-10 bg-white/10" />
                <span
                  className="hf-mono text-[9px] tracking-[0.25em] text-white/60 uppercase"
                  style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                >
                  Associate Professor
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════
            STATS BAR — SCROLL TRIGGERED
        ══════════════════════════════════════════════════ */}
        <div
          className="relative z-10 border-t mt-0"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <div className="max-w-[1360px] mx-auto w-full px-0">
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
            >
              {heroStats.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  className="stat-cell px-8 py-7"
                >
                  <p
                    className="hf-display text-white font-light"
                    style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1 }}
                  >
                    {stat.value}
                    <span style={{ color: "#C8A558", fontSize: "0.7em" }}>{stat.suffix}</span>
                  </p>
                  <p
                    className="hf-mono uppercase tracking-[0.22em] mt-2"
                    style={{ fontSize: "9px", color: "rgba(255,255,255,0.28)" }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}