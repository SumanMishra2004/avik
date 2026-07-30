"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Download } from "lucide-react";
import type { SanitySiteSettings, SanityHeroStat } from "@/types/sanity";
import Image from "next/image";
import Link from "next/link";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

interface HeroSectionProps {
  personalInfo: Pick<
    SanitySiteSettings,
    "name" | "bio" | "cvUrl" | "profileImage"
  >;
  heroStats: SanityHeroStat[];
  heroTags: string[];
}

export default function HeroSection({ personalInfo, heroStats, heroTags }: HeroSectionProps) {
  const profileImageUrl = personalInfo.profileImage?.asset?.url ?? "/profile.png";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-28 lg:pt-36 pb-12 transition-colors duration-300"
    >
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 hero-radial-glow pointer-events-none opacity-40 dark:opacity-100" />

      {/* ══════════════════════════════════════════════════
          MAIN HERO GRID
      ══════════════════════════════════════════════════ */}
      <div className="relative z-10 flex-1 max-w-[1360px] mx-auto w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_460px] items-center gap-12 lg:gap-8">

        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col">

          {/* Eyebrow rule */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-10 bg-[#2563EB] dark:bg-[#60A5FA]" />
            <span className="hf-mono text-[10px] sm:text-xs tracking-[0.24em] text-[#2563EB] dark:text-[#60A5FA] uppercase font-semibold">
              PhD · IIEST Shibpur &nbsp;·&nbsp; Associate Professor · UEM Kolkata
            </span>
          </motion.div>

          {/* ── DISPLAY NAME ── */}
          <div className="overflow-hidden">
            <motion.h1
              className="hf-display font-bold leading-[0.92] tracking-[-0.01em] text-slate-900 dark:text-white"
              style={{ fontSize: "clamp(2.75rem, 6.5vw, 5.75rem)" }}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {personalInfo.name.split(" ").slice(0, -1).join(" ")}{" "}
              <em className="not-italic text-[#2563EB] dark:text-[#60A5FA]">
                {personalInfo.name.split(" ").slice(-1)}
              </em>
            </motion.h1>
          </div>

          {/* ── ROLE TAGS ── */}
          <motion.div
            className="flex flex-wrap gap-2.5 mt-6 mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.5 }}
          >
            {heroTags.map((t) => (
              <span
                key={t}
                className="hero-tag hf-mono border-slate-300 dark:border-white/10 text-slate-600 dark:text-white/60 hover:border-[#60A5FA] hover:text-[#2563EB] dark:hover:text-[#60A5FA]"
              >
                {t}
              </span>
            ))}
          </motion.div>

          {/* ── BIO ── */}
          <motion.p
            className="hf-body text-slate-600 dark:text-white/60 text-base sm:text-lg leading-[1.8] max-w-[580px] mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.6 }}
          >
            {personalInfo.bio}
          </motion.p>

          {/* ── CTAs ── */}
          <motion.div
            className="flex flex-wrap gap-3.5"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.7 }}
          >
            <Link
              href="/publications"
              className="cta-gold hf-body inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold shadow-md transition-all hover:-translate-y-0.5"
            >
              View Research
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/#contact"
              className="cta-ghost hf-body inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border-slate-300 dark:border-white/15 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all hover:-translate-y-0.5"
            >
              <Mail size={16} />
              Collaborate
            </Link>
            <Link
              href={personalInfo.cvUrl ?? "/CV.pdf"}
              target="_blank"
              className="cta-ghost hf-body inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border-slate-300 dark:border-white/15 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all hover:-translate-y-0.5"
            >
              <Download size={16} />
              Download CV
            </Link>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN: Photo ── */}
        <motion.div
          className="hidden lg:flex justify-end items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            {/* Blue offset frame */}
            <div
              aria-hidden
              className="absolute inset-0 translate-x-3 translate-y-3 -z-10"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)",
                background:
                  "linear-gradient(160deg, rgba(96,165,250,0.4) 0%, rgba(96,165,250,0.1) 60%, transparent 100%)",
              }}
            />

            {/* Photo Container */}
            <div
              className="relative overflow-hidden border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl"
              style={{
                width: "clamp(270px, 25vw, 380px)",
                height: "clamp(350px, 33vw, 480px)",
                clipPath: "polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)",
              }}
            >
              <Image
                src={profileImageUrl}
                alt={personalInfo.profileImage?.alt ?? `Dr. ${personalInfo.name}`}
                fill
                className="object-cover object-top"
                priority
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(12,14,19,0.4) 0%, transparent 50%)",
                }}
              />
            </div>

            {/* Floating card — top left */}
            <motion.div
              className="absolute -left-12 top-10 bg-white/90 dark:bg-[#0C1425]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 shadow-xl"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="hf-mono text-[9px] text-[#2563EB] dark:text-[#60A5FA] font-bold tracking-widest mb-0.5">FUNDED RESEARCH</p>
              <p className="hf-body text-slate-900 dark:text-white text-xs font-bold leading-tight">PRISM · DSIR</p>
              <p className="hf-body text-slate-500 dark:text-white/40 text-[11px] mt-0.5">MeitY TIDE Grant</p>
            </motion.div>

            {/* Floating card — bottom right */}
            <motion.div
              className="absolute -right-8 bottom-20 bg-[#60A5FA] text-slate-950 backdrop-blur-xl rounded-xl px-4 py-3 shadow-xl"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <p className="hf-mono text-[9px] tracking-widest text-slate-900/80 font-bold mb-0.5">OUTPUT</p>
              <p className="hf-body text-slate-950 text-xs font-bold leading-tight">60+ Papers</p>
              <p className="hf-body text-slate-900/70 text-[10px] mt-0.5">IEEE · Springer</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════ */}
      <div className="relative z-10 border-t border-slate-200 dark:border-white/10 mt-12 bg-white/40 dark:bg-white/[0.02]">
        <div className="max-w-[1360px] mx-auto w-full px-6">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {heroStats.map((stat, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
                className="stat-cell px-6 py-6 border-r border-slate-200 dark:border-white/5 last:border-r-0"
              >
                <p
                  className="hf-display text-slate-900 dark:text-white font-semibold"
                  style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1 }}
                >
                  {stat.value}
                  <span className="text-[#2563EB] dark:text-[#60A5FA] text-[0.7em]">{stat.suffix}</span>
                </p>
                <p
                  className="hf-mono uppercase tracking-[0.2em] mt-2 font-medium"
                  style={{ fontSize: "10px", color: "var(--muted-foreground)" }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}