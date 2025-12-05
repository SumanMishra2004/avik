"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const metrics = [
  { label: "Patents", value: "4", color: "text-purple-400" },
  { label: "Journal Papers", value: "2", color: "text-blue-400" },
  { label: "IEEE Transactions", value: "2", color: "text-indigo-400" },
  { label: "Conference Papers", value: "10+", color: "text-violet-400" },
  { label: "Active Projects", value: "16", color: "text-purple-400" },
  { label: "Research Domains", value: "8+", color: "text-blue-400" },
];

const researchHighlights = [
  "Underwater Acoustic Communication",
  "OTFS Modulation",
  "AI/ML for Communication",
  "IoT & Sensor Networks",
  "Underground Mine Monitoring",
  "Visible Light Communication",
  "6G Channel Modeling",
  "Cognitive Radio Networks",
];

const awards = [
  {
    title: "IEEE R10 WIE Hackathon Winner",
    year: "2023",
    description: "Smart Resource Management",
  },
  {
    title: "AEGIS GRAHAM BELL Award",
    year: "2024",
    description: "Top 3 Global Finalist",
  },
  {
    title: "PRISM Funding (DSIR)",
    year: "2024",
    description: "via IIT Kharagpur",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function HeroSection() {
  return (
    <section className="gradient-bg min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Top Section - Main Info */}
          <div className="text-center space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <Badge className="text-base px-6 py-2 bg-primary/20 border-primary/40">
                Associate Professor
              </Badge>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
                Dr. Avik Kumar Das
              </h1>
              <div className="space-y-2">
                <p className="text-3xl md:text-4xl text-primary font-semibold">
                  AI-ML & IoT Researcher
                </p>
                <p className="text-xl md:text-2xl text-muted-foreground">
                  Wireless Communication Specialist
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-center gap-6 text-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <span>University of Engineering and Management, Kolkata</span>
              </div>
              <span className="hidden md:block text-muted-foreground">|</span>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔬</span>
                <span>DSP Lab, IIEST Shibpur</span>
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto"
            >
              Bridging Underwater Acoustics, IoT, and Deep Learning for
              Next-Gen Communication Systems. Pioneering research in harsh
              environments—from underwater acoustic channels to underground
              coal mines.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 pt-4"
            >
              <Link href="/contact">
                <Button size="lg" className="gap-2 text-lg px-8 py-6">
                  <Mail className="h-5 w-5" />
                  Get in Touch
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6">
                <Download className="h-5 w-5" />
                Download CV
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6">
              <a
                href="https://scholar.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
              >
                Google Scholar
              </a>
              <a
                href="https://orcid.org/0000-0001-8824-703X"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
              >
                ORCID
              </a>
              <a
                href="https://researchgate.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
              >
                ResearchGate
              </a>
            </motion.div>
          </div>

          {/* Bottom Section - Stats & Info */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Metrics Grid */}
            <Card className="gradient-card border-primary/20 md:col-span-2">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">
                  Research Impact
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  {metrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 * index, type: "spring" }}
                      className="text-center"
                    >
                      <div className={`text-5xl font-bold ${metric.color} mb-2`}>
                        {metric.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {metric.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Awards Highlight */}
            <Card className="gradient-card border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6">Recognition</h3>
                <div className="space-y-4">
                  {awards.map((award, index) => (
                    <motion.div
                      key={award.title}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                      className="space-y-1"
                    >
                      <div className="text-2xl mb-1">🏆</div>
                      <div className="font-semibold text-sm leading-tight">
                        {award.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {award.description}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {award.year}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Research Highlights - Full Width */}
            <Card className="gradient-card border-primary/20 md:col-span-3">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6 text-center">
                  Research Domains
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {researchHighlights.map((highlight, index) => (
                    <motion.div
                      key={highlight}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * index }}
                    >
                      <Badge variant="secondary" className="text-sm px-4 py-2">
                        {highlight}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
