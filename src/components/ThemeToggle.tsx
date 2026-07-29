"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-gray-400">
        <span className="w-4 h-4 rounded-full bg-current opacity-30" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark" || theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle Light and Dark Theme"
      className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 border ${
        isDark
          ? "bg-white/5 text-[#C8A558] border-white/10 hover:bg-white/10 hover:border-[#C8A558]/40 shadow-inner"
          : "bg-slate-100 text-amber-600 border-slate-300 hover:bg-slate-200 hover:border-amber-500 shadow-sm"
      }`}
    >
      <motion.div
        key={isDark ? "dark" : "light"}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.25 }}
      >
        {isDark ? <Sun size={18} className="text-[#C8A558]" /> : <Moon size={18} className="text-amber-600" />}
      </motion.div>
    </motion.button>
  );
}
