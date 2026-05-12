"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Send } from "lucide-react";
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
      setScrolled(window.scrollY > 50);

      const sections = [...navLinks]
        .map((l) => l.href.replace("/#", ""))
        .filter((id) => id !== "/");

      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
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
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 sm:p-6 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            width: scrolled ? "auto" : "100%",
            maxWidth: scrolled ? "830px" : "1280px"
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={`
            pointer-events-auto flex items-center justify-between gap-6 px-4 py-2.5
            rounded-2xl border transition-colors duration-500
            ${scrolled
              ? "bg-[#0A0F1E]/70 backdrop-blur-md border-[#C8A558]/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              : "bg-transparent border-transparent"
            }
          `}
        >
          {/* Logo Section */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.div
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-10 h-10 rounded-xl bg-[#C8A558] flex items-center justify-center cursor-pointer shadow-lg shadow-[#C8A558]/20"
              whileHover={{ rotate: 5, scale: 1.05 }}
            >
              <span className="text-white font-black text-xs">AKD</span>
            </motion.div>
            {!scrolled && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden lg:block"
              >
                <p className="text-white font-bold text-sm leading-none">Avik Kumar Das</p>
                <p className="text-[#C8A558] text-[10px] uppercase tracking-widest mt-1 font-medium">Associate Professor</p>
              </motion.div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center bg-white/5 rounded-xl p-1 border border-white/10">
            {navLinks.map((link) => {
              const sectionId = link.href.replace("/#", "");
              const isActive = (link.href === "/" && activeSection === "") || (pathname === "/" && activeSection === sectionId) || (pathname === link.href);

              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-300 ${isActive ? "text-white" : "text-gray-400 hover:text-white"
                    }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-[#C8A558] rounded-lg shadow-[0_0_15px_rgba(200,165,88,0.3)]"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-[#C8A558] hover:text-white transition-all shadow-xl"
            >
              LET'S TALK <Send size={18} />
            </motion.a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 text-white border border-white/10"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Overlay - Clean Fullscreen Blur */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-6 md:hidden"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm bg-[#0A0F1E] border border-[#C8A558]/30 rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left text-2xl font-bold text-gray-400 hover:text-[#C8A558] transition-colors"
                  >
                    {link.label}
                  </motion.button>
                ))}
                <hr className="border-white/10 my-4" />
                <a href="mailto:avikdas005@gmail.com" className="text-[#C8A558] font-mono text-sm uppercase tracking-widest">
                  avikdas005@gmail.com
                </a>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-6 right-6 text-white/50"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}