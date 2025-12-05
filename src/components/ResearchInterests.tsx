"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Radio,
  Waves,
  Brain,
  Wifi,
  Lightbulb,
  Network,
  Zap,
  Cpu,
} from "lucide-react";

const researchAreas = [
  {
    icon: Waves,
    title: "Underwater Acoustic Communication",
    description:
      "Acoustic modem design, JANUS protocol, PAMGUARD integration, IoUT applications, VLC-UWA hybrid systems for UUV design",
    color: "text-blue-400",
    keywords: ["Acoustic Modems", "JANUS", "IoUT", "UUV Design"],
  },
  {
    icon: Radio,
    title: "Wireless Communication & Signal Processing",
    description:
      "OTFS modulation, MIMO systems, voice and image processing for challenging environments, channel estimation and modeling",
    color: "text-purple-400",
    keywords: ["OTFS", "MIMO", "Channel Estimation", "Signal Processing"],
  },
  {
    icon: Brain,
    title: "AI/ML for Communication Systems",
    description:
      "CNN for channel estimation, LLM and NLP for data analysis, deep learning for imbalanced datasets, real-time signal processing using neural networks",
    color: "text-indigo-400",
    keywords: ["CNN", "LLM", "Deep Learning", "Neural Networks"],
  },
  {
    icon: Wifi,
    title: "IoT & Sensor Networks",
    description:
      "Underground mine monitoring (LoRa, WSN), water quality monitoring, smart agriculture, precision farming, hydroponics, GNSS-based positioning",
    color: "text-violet-400",
    keywords: ["LoRa", "WSN", "Smart Agriculture", "GNSS"],
  },
  {
    icon: Lightbulb,
    title: "Visible Light Communication (VLC)",
    description:
      "VLC for GNSS-denied areas, underground mine positioning, hybrid VLC-UWA systems, Li-Fi applications",
    color: "text-cyan-400",
    keywords: ["VLC", "Li-Fi", "Positioning", "GNSS-Denied"],
  },
  {
    icon: Network,
    title: "Cognitive Radio Networks",
    description:
      "Energy-efficient cognitive radio, spectrum sensing, secure communication, dynamic spectrum access",
    color: "text-green-400",
    keywords: ["Spectrum Sensing", "Energy Efficiency", "Security"],
  },
  {
    icon: Zap,
    title: "6G & Emerging Technologies",
    description:
      "6G channel modeling, terahertz communication, V2V communication with AI, next-generation wireless systems",
    color: "text-pink-400",
    keywords: ["6G", "THz", "V2V", "Next-Gen"],
  },
  {
    icon: Cpu,
    title: "Embedded Systems & FPGA",
    description:
      "Real-time system design, FPGA implementation, DSP processors (TMS320C6748), hardware-software co-design",
    color: "text-orange-400",
    keywords: ["FPGA", "DSP", "Real-Time", "Embedded"],
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

export default function ResearchInterests() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Research Interests
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interdisciplinary research spanning wireless communication, artificial
            intelligence, and IoT applications for challenging environments
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {researchAreas.map((area, index) => (
            <motion.div key={area.title} variants={itemVariants}>
              <Card className="gradient-card border-primary/20 h-full hover:border-primary/40 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`${area.color} p-3 rounded-lg bg-background/50 group-hover:scale-110 transition-transform`}
                    >
                      <area.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-lg flex-1">{area.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {area.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {area.keywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="outline"
                        className="text-xs"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
