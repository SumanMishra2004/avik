"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  BookOpen,
  GraduationCap,
} from "lucide-react";

const socialLinks = [
  {
    icon: Mail,
    href: "mailto:avik@example.com",
    label: "Email",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: Github,
    href: "https://github.com",
    label: "GitHub",
  },
  {
    icon: BookOpen,
    href: "https://scholar.google.com",
    label: "Google Scholar",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/50 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h3 className="font-bold text-lg">Dr. Avik Kumar Das</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Associate Professor specializing in AI-ML, IoT, and Wireless
              Communication research at UEM Kolkata.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/research"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Research Interests
                </Link>
              </li>
              <li>
                <Link
                  href="/publications"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Publications
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
            <p className="text-muted-foreground text-xs mt-4">
              ORCID: 0000-0001-8824-703X
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} Dr. Avik Kumar Das. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
