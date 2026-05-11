"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Detect active section
      const sections = navLinks.map((l) => l.href.replace("/#", ""));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    
    if (href.startsWith("/#")) {
      const sectionId = href.replace("/", "");
      if (pathname === "/") {
        const target = document.querySelector(sectionId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(href);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 backdrop-blur-xl bg-[#0A0F1E]/80 border-b border-[rgba(200,165,88,0.15)] shadow-[0_4px_30px_rgba(200,165,88,0.08)]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 group cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C8A558] to-[#C8A558] flex items-center justify-center hf-mono font-bold text-white text-sm shadow-[0_0_20px_rgba(200,165,88,0.4)] group-hover:shadow-[0_0_30px_rgba(200,165,88,0.6)] transition-all duration-300">
                AKD
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#C8A558] border-2 border-[#0A0F1E] shadow-[0_0_6px_rgba(200,165,88,0.8)]" />
            </div>
            <div className="hidden sm:block">
              <div className="text-[#F1F5F9] font-semibold text-sm leading-tight hf-display">
                Avik Kumar Das
              </div>
              <div className="text-[#94A3B8] text-xs leading-tight">
                Associate Professor
              </div>
            </div>
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              let isActive = false;
              if (link.href.startsWith("/#")) {
                const sectionId = link.href.replace("/#", "");
                isActive = pathname === "/" && activeSection === sectionId;
              } else if (link.href === "/") {
                isActive = pathname === "/" && activeSection === "";
              } else {
                isActive = pathname === link.href;
              }

              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`nav-link px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isActive
                      ? "text-[#C8A558] bg-[rgba(200,165,88,0.08)]"
                      : "text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/5"
                  } ${isActive ? "active" : ""}`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* CTA + Mobile Burger */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:avikdas005@gmail.com"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#C8A558] to-[#C8A558] text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(200,165,88,0.4)] transition-all duration-300 hover:scale-105"
            >
              me
            </a>

            <button
              id="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/10 transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-72 z-40 backdrop-blur-2xl bg-[#161920]/95 border-l border-white/10 flex flex-col pt-20 pb-8 px-6"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => {
                let isActive = false;
                if (link.href.startsWith("/#")) {
                  const sectionId = link.href.replace("/#", "");
                  isActive = pathname === "/" && activeSection === sectionId;
                } else if (link.href === "/") {
                  isActive = pathname === "/" && activeSection === "";
                } else {
                  isActive = pathname === link.href;
                }
                
                return (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-left px-4 py-3 rounded-xl font-medium transition-all ${
                      isActive ? "text-[#C8A558] bg-[rgba(200,165,88,0.08)]" : "text-[#94A3B8] hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </motion.button>
                );
              })}
              <div className="mt-4 pt-4 border-t border-white/10">
                <a
                  href="mailto:avikdas005@gmail.com"
                  className="block text-center px-4 py-3 rounded-xl bg-gradient-to-r from-[#C8A558] to-[#C8A558] text-white font-medium"
                >
                  Hire Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
