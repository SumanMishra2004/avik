"use client";

import type { SanitySiteSettings, SanityNavLink } from "@/types/sanity";

interface FooterProps {
  personalInfo?: Pick<SanitySiteSettings, "name" | "twitter" | "twitterUrl" | "linkedin" | "linkedinUrl" | "orcid" | "email" | "footerTagline" | "copyrightYear">;
  navLinks?: SanityNavLink[];
}

const EMPTY_PERSONAL = {
  name: "Dr. Avik Kumar Das",
  twitter: "@005avik_das",
  twitterUrl: "https://twitter.com/005avik_das",
  linkedin: "avikdasetc",
  linkedinUrl: "https://www.linkedin.com/in/avikdasetc",
  orcid: "https://orcid.org/0000-0001-8824-703X",
  email: "avikdas005@gmail.com",
  footerTagline: undefined as string | undefined,
  copyrightYear: new Date().getFullYear().toString(),
};

export default function Footer({ personalInfo = EMPTY_PERSONAL, navLinks = [] }: FooterProps) {
  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#060A14] text-slate-700 dark:text-slate-300">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8A558]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C8A558] to-[#A68541] flex items-center justify-center hf-mono font-bold text-white text-sm shadow-md">
                AKD
              </div>
              <div>
                <div className="text-slate-900 dark:text-white font-bold text-sm hf-display">{personalInfo.name}</div>
                <div className="text-slate-500 dark:text-[#64748B] text-xs font-medium">Associate Professor &amp; Researcher</div>
              </div>
            </div>
            <p className="text-slate-600 dark:text-[#64748B] text-xs leading-relaxed max-w-xs">
              {personalInfo.footerTagline ?? "Kolkata, India · Bridging deep technology with real-world impact."}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-[#64748B] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Open to Research Collaborations
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <p className="text-[#9E7B28] dark:text-[#C8A558] text-xs font-bold uppercase tracking-widest mb-5 hf-mono">Quick Nav</p>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link._id}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-slate-600 dark:text-[#64748B] text-sm hover:text-[#9E7B28] dark:hover:text-[#C8A558] transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <p className="text-[#9E7B28] dark:text-[#C8A558] text-xs font-bold uppercase tracking-widest mb-5 hf-mono">Connect</p>
            <div className="space-y-3">
              <a href={personalInfo.twitterUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 dark:text-[#64748B] text-sm hover:text-[#9E7B28] dark:hover:text-[#C8A558] transition-colors group">
                <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-white/10 flex items-center justify-center text-xs font-bold group-hover:border-[#C8A558]">𝕏</div>
                {personalInfo.twitter}
              </a>
              <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 dark:text-[#64748B] text-sm hover:text-[#9E7B28] dark:hover:text-[#C8A558] transition-colors group">
                <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-white/10 flex items-center justify-center text-xs font-bold text-[#9E7B28] dark:text-[#E2C07A] group-hover:border-[#C8A558]">in</div>
                linkedin.com/in/{personalInfo.linkedin}
              </a>
              <a href={personalInfo.orcid} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 dark:text-[#64748B] text-sm hover:text-[#9E7B28] dark:hover:text-[#C8A558] transition-colors group">
                <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-white/10 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:border-[#C8A558]">ID</div>
                ORCID Profile
              </a>
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 text-slate-600 dark:text-[#64748B] text-sm hover:text-[#9E7B28] dark:hover:text-[#C8A558] transition-colors group">
                <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-white/10 flex items-center justify-center text-xs font-bold group-hover:border-[#C8A558]">@</div>
                {personalInfo.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-[#64748B]">
          <span>
            © {personalInfo.copyrightYear ?? "2026"} <span className="text-slate-900 dark:text-[#94A3B8] font-semibold">{personalInfo.name}</span> · All rights reserved
          </span>
          <span className="hf-mono" suppressHydrationWarning>
            {"Designed with passion from "}
            <span className="text-[#9E7B28] dark:text-[#C8A558] font-bold">{"Kolkata 🇮🇳"}</span>
            {" · Built with Next.js & Sanity CMS"}
          </span>
        </div>
      </div>
    </footer>
  );
}
