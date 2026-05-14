"use client";

import { motion } from "framer-motion";
import type { SanitySiteSettings, SanityNavLink } from "@/types/sanity";

interface FooterProps {
  personalInfo?: Pick<SanitySiteSettings, "name" | "twitter" | "twitterUrl" | "linkedin" | "linkedinUrl" | "orcid" | "email" | "footerTagline" | "copyrightYear">;
  navLinks?: SanityNavLink[];
}

const EMPTY_PERSONAL = {
  name: "",
  twitter: "",
  twitterUrl: "",
  linkedin: "",
  linkedinUrl: "",
  orcid: "",
  email: "",
  footerTagline: undefined as string | undefined,
  copyrightYear: new Date().getFullYear().toString(),
};

export default function Footer({ personalInfo = EMPTY_PERSONAL, navLinks = [] }: FooterProps) {
  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#060A14]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8A558]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C8A558] to-[#C8A558] flex items-center justify-center hf-mono font-bold text-white text-sm shadow-[0_0_20px_rgba(200,165,88,0.3)]">
                AKD
              </div>
              <div>
                <div className="text-white font-semibold text-sm hf-display">{personalInfo.name}</div>
                <div className="text-[#64748B] text-xs">Associate Professor &amp; Researcher</div>
              </div>
            </div>
            <p className="text-[#64748B] text-xs leading-relaxed max-w-xs">
              {personalInfo.footerTagline ?? "Kolkata, India · Bridging deep technology with real-world impact."}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Open to Research Collaborations
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-widest mb-5 hf-mono">Quick Nav</p>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link._id}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-[#64748B] text-sm hover:text-[#C8A558] transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <p className="text-[#94A3B8] text-xs font-medium uppercase tracking-widest mb-5 hf-mono">Connect</p>
            <div className="space-y-3">
              <a href={personalInfo.twitterUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#64748B] text-sm hover:text-[#C8A558] transition-colors group">
                <div className="w-7 h-7 rounded-lg glass-card border border-white/10 flex items-center justify-center text-xs font-bold group-hover:border-[#C8A558]/40 transition-colors">𝕏</div>
                {personalInfo.twitter}
              </a>
              <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#64748B] text-sm hover:text-[#C8A558] transition-colors group">
                <div className="w-7 h-7 rounded-lg glass-card border border-white/10 flex items-center justify-center text-xs font-bold text-[#E2C07A] group-hover:border-[#C8A558]/40 transition-colors">in</div>
                linkedin.com/in/{personalInfo.linkedin}
              </a>
              <a href={personalInfo.orcid} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#64748B] text-sm hover:text-[#C8A558] transition-colors group">
                <div className="w-7 h-7 rounded-lg glass-card border border-white/10 flex items-center justify-center text-xs font-bold text-green-400 group-hover:border-[#C8A558]/40 transition-colors">ID</div>
                ORCID Profile
              </a>
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 text-[#64748B] text-sm hover:text-[#C8A558] transition-colors group">
                <div className="w-7 h-7 rounded-lg glass-card border border-white/10 flex items-center justify-center text-xs font-bold group-hover:border-[#C8A558]/40 transition-colors">@</div>
                {personalInfo.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
          <span>
            © {personalInfo.copyrightYear ?? "2025"} <span className="text-[#94A3B8]">{personalInfo.name}</span> · All rights reserved
          </span>
          <span className="hf-mono" suppressHydrationWarning>
            {"Designed with passion from "}
            <span className="text-[#C8A558]">{"Kolkata 🇮🇳"}</span>
            {" · Built with Next.js & Tailwind"}
          </span>
        </div>
      </div>
    </footer>
  );
}
