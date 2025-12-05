"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Radio, Wifi, Lightbulb, Users, Mail } from "lucide-react";

const researchAreas = [
  {
    icon: Radio,
    title: "Underwater Acoustic Communication",
    description: "JANUS protocol, IoUT, VLC-UWA hybrid systems",
  },
  {
    icon: Brain,
    title: "AI/ML for Communication",
    description: "Channel estimation, LLM, deep learning applications",
  },
  {
    icon: Wifi,
    title: "IoT & Sensor Networks",
    description: "Mine monitoring, smart agriculture, WSN",
  },
  {
    icon: Lightbulb,
    title: "6G & Emerging Technologies",
    description: "Channel modeling, terahertz, V2V communication",
  },
];

const funding = [
  {
    title: "PRISM Funding",
    agency: "DSIR, Govt. of India",
    via: "IIT Kharagpur",
    year: "2024",
    color: "text-purple-400",
  },
  {
    title: "MeitY TIDE Fund",
    agency: "Ministry of Electronics and IT",
    via: "SINE IIT Bombay",
    year: "2023",
    color: "text-blue-400",
  },
  {
    title: "IIC Prototype Fund",
    agency: "Institution Innovation Council",
    via: "IIEST Shibpur",
    year: "2022-Present",
    color: "text-indigo-400",
  },
];

const awards = [
  {
    title: "IEEE R10 WIE Hackathon Winner",
    description: "Smart Resource Management",
    year: "2023",
    emoji: "🏆",
  },
  {
    title: "AEGIS GRAHAM BELL Award",
    description: "Top 3 Global Finalist",
    year: "2024",
    emoji: "🥇",
  },
  {
    title: "Photography Competition Winner",
    description: "Botanical Survey of India",
    year: "2022, 2023",
    emoji: "📸",
  },
];

const memberships = [
  { org: "Optical Society of India (OSI)", type: "Life Member" },
  { org: "Material Science India (MSI)", type: "Life Member" },
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

export default function ResearchPage() {
  return (
    <div className="gradient-bg min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Research Profile
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pioneering research at the intersection of wireless communication,
            artificial intelligence, and IoT applications
          </p>
        </motion.div>

        {/* Bio Section */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="gradient-card border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">About</h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Dr. Avik Kumar Das is an Associate Professor at the
                    University of Engineering and Management, Kolkata, and an
                    active researcher at the DSP Lab, IIEST Shibpur. His
                    research bridges wireless communication, artificial
                    intelligence, and IoT to solve critical challenges in harsh
                    environments—from underwater acoustic channels to
                    underground coal mines.
                  </p>
                  <p>
                    With <strong>4 patents</strong>, government funding from{" "}
                    <strong>DSIR and MeitY</strong>, and recognition as a
                    global finalist for the <strong>AEGIS GRAHAM BELL Award</strong>,
                    Dr. Das is pioneering the integration of OTFS modulation,
                    deep learning, and IoT for next-generation communication
                    systems.
                  </p>
                  <p>
                    His work spans{" "}
                    <strong>8+ active research domains</strong> including
                    underwater acoustic communication, OTFS modulation, AI/ML
                    for communication systems, IoT sensor networks, visible
                    light communication, cognitive radio, 6G channel modeling,
                    and embedded systems.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Key Research Areas */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Key Research Areas
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {researchAreas.map((area, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="gradient-card border-primary/20 hover:border-primary/40 transition-all h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-background/50">
                        <area.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{area.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Funding & Grants */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Research Funding & Grants
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {funding.map((fund, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="gradient-card border-primary/20 h-full">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">💰</div>
                    <h3 className={`font-bold text-xl mb-2 ${fund.color}`}>
                      {fund.title}
                    </h3>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">{fund.agency}</p>
                      <p className="text-primary">via {fund.via}</p>
                      <Badge variant="secondary" className="mt-2">
                        {fund.year}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Awards & Recognition */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Awards & Recognition
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {awards.map((award, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="gradient-card border-primary/20 hover:border-primary/40 transition-all h-full">
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl mb-4">{award.emoji}</div>
                    <h3 className="font-bold text-lg mb-2">{award.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {award.description}
                    </p>
                    <Badge variant="outline">{award.year}</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Professional Activities */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Professional Activities
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            <motion.div variants={itemVariants}>
              <Card className="gradient-card border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Professional Memberships
                  </h3>
                  <ul className="space-y-2">
                    {memberships.map((member, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-primary">•</span>
                        <span>
                          {member.org} ({member.type})
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="gradient-card border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-4">Other Activities</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      R&D Team Member, Digital System Design Lab
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      Speaker at FPGA & IoT Webinars
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      Conference Organization Volunteer
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary">•</span>
                      Higher Education Conclave Participant
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* Collaboration Opportunities */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="gradient-card border-primary/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Mail className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold">
                    Collaboration Opportunities
                  </h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p className="text-lg">
                    I welcome collaborations with researchers, industry
                    partners, and academic institutions. I am particularly
                    interested in:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Joint research projects in underwater communication and
                        6G technologies
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        PhD/M.Tech co-supervision with international
                        institutions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Industry partnerships for R&D in IoT and AI
                        applications
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Interdisciplinary projects combining wireless
                        communication with AI/ML
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Visiting positions and sabbatical hosting opportunities
                      </span>
                    </li>
                  </ul>
                  <div className="pt-4">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
                    >
                      Get in touch to discuss collaboration opportunities
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
