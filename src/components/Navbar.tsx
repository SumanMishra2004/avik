"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Send } from "lucide-react";
import type { SanityNavLink } from "@/types/sanity";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

interface NavbarProps {
  navLinks?: SanityNavLink[];
}

export default function Navbar({ navLinks = [] }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = [...navLinks]
        .map((l) => l.href.replace("/#", ""))
        .filter((id) => id !== "/" && !id.startsWith("/"));

      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const sectionId = href.replace("/", "");
      if (pathname === "/") {
        document.querySelector(sectionId)?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(href);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-3 sm:p-5 pointer-events-none transition-all duration-300">
        <div className="w-full max-w-7xl px-2 sm:px-4">
          <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`pointer-events-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-2.5 rounded-2xl border transition-all duration-300 ${
              scrolled
                ? "bg-white/85 dark:bg-[#0A0F1E]/80 backdrop-blur-xl border-slate-200 dark:border-[#60A5FA]/25 shadow-xl shadow-slate-900/5 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                : "bg-white/60 dark:bg-[#070B14]/60 backdrop-blur-md border-slate-200/50 dark:border-white/10"
            }`}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center cursor-pointer shadow-md shadow-[#60A5FA]/20"
              >
                <Link href="/" className="text-white font-black text-xs tracking-wider">
                  AKD
                </Link>
              </motion.div>
              <div className="hidden sm:block">
                <Link href="/">
                  <p className="font-bold text-sm leading-none text-slate-900 dark:text-white transition-colors">
                    Dr. Avik Kumar Das
                  </p>
                  <p className="text-[#2563EB] dark:text-[#60A5FA] text-[10px] uppercase tracking-widest mt-1 font-medium">
                    Associate Professor
                  </p>
                </Link>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center bg-slate-100/80 dark:bg-white/5 rounded-xl p-1 border border-slate-200 dark:border-white/10">
              {navLinks.map((link) => {
                const sectionId = link.href.replace("/#", "");
                const isActive =
                  (link.href === "/" && activeSection === "" && pathname === "/") ||
                  (pathname === "/" && activeSection === sectionId) ||
                  (pathname === link.href);

                return (
                  <button
                    key={link._id}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors duration-300 rounded-lg ${
                      isActive
                        ? "text-slate-900 dark:text-white font-semibold"
                        : "text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
                    }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-[#60A5FA]/25 dark:bg-[#60A5FA] rounded-lg shadow-sm dark:shadow-[0_0_15px_rgba(96,165,250,0.3)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Actions: Theme Toggle + CTA + Mobile Toggle */}
            <div className="flex items-center gap-2.5">
              <ThemeToggle />

              <motion.a
                href="/#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-xs font-bold hover:bg-[#60A5FA] dark:hover:bg-[#60A5FA] dark:hover:text-white transition-all shadow-md"
              >
                LET&apos;S TALK <Send size={14} />
              </motion.a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Open navigation menu"
                className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </motion.nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-950/40 dark:bg-black/60 backdrop-blur-md flex items-center justify-center p-6 md:hidden"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm bg-white dark:bg-[#0A0F1E] border border-slate-200 dark:border-[#60A5FA]/30 rounded-3xl p-8 shadow-2xl relative"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link._id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left text-xl font-bold text-slate-700 dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="absolute top-6 right-6 text-slate-400 dark:text-white/50 hover:text-slate-800 dark:hover:text-white"
              >
                <X size={22} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}