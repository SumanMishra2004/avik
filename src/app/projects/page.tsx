"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Users,
  DollarSign,
  Target,
  ExternalLink,
  FileText,
} from "lucide-react";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "AQUA-SENSE-AI",
    subtitle: "IoUT for Underwater Monitoring",
    role: "Principal Investigator",
    duration: "2024-2025",
    status: "Active",
    funding: "Institutional",
    category: "underwater",
    problem:
      "Traditional underwater monitoring systems lack intelligent sensing and real-time data processing capabilities for marine environmental monitoring.",
    approach:
      "Developing an Internet of Underwater Things (IoUT) platform integrating acoustic modems, AI-powered sensors, and cloud analytics for real-time underwater monitoring.",
    impact:
      "Enabling marine biologists and oceanographers to monitor underwater ecosystems with unprecedented accuracy and real-time data insights.",
    technologies: ["IoUT", "Acoustic Communication", "AI/ML", "Cloud Computing"],
    collaborators: ["DSP Lab, IIEST Shibpur"],
    publications: ["Under preparation"],
  },
  {
    id: 2,
    title: "Smart Underground Mine Monitoring System",
    subtitle: "LoRa + VLC Hybrid Positioning",
    role: "Principal Investigator",
    duration: "2022-Present",
    status: "Active",
    funding: "IIC Prototype Competition Fund",
    category: "iot",
    problem:
      "Underground mines face critical safety challenges with inadequate positioning systems and environmental monitoring in GNSS-denied environments.",
    approach:
      "Hybrid system combining LoRa for long-range communication and Visible Light Communication (VLC) for precise positioning in underground mines.",
    impact:
      "Enhanced miner safety through real-time location tracking and environmental hazard detection. Patent filed for innovative positioning system.",
    technologies: ["LoRa", "VLC", "WSN", "Positioning Systems"],
    collaborators: ["IIEST Shibpur"],
    publications: ["Patent Filed (Application Pending)"],
  },
  {
    id: 3,
    title: "GAPPS - GNSS-AI Precision Positioning System",
    subtitle: "Next-Gen Positioning for GNSS-Denied Areas",
    role: "Principal Investigator",
    duration: "2024-2025",
    status: "Active",
    funding: "Research Grant",
    category: "positioning",
    problem:
      "GNSS systems fail in underground, underwater, and indoor environments, creating gaps in positioning coverage.",
    approach:
      "AI-enhanced positioning system using sensor fusion, VLC, and machine learning for accurate positioning in GNSS-denied environments.",
    impact:
      "Revolutionizing navigation for autonomous systems in challenging environments including mines, underwater vehicles, and indoor spaces.",
    technologies: ["AI/ML", "VLC", "Sensor Fusion", "GNSS"],
    collaborators: ["Industry Partners"],
    publications: ["2 Conference Papers"],
  },
  {
    id: 4,
    title: "UWA-VLC Hybrid UUV Design",
    subtitle: "Next-Gen Underwater Vehicle Communication",
    role: "Lead Researcher",
    duration: "2019-Present",
    status: "Active",
    funding: "Multiple Sources",
    category: "underwater",
    problem:
      "Underwater vehicles face communication bottlenecks with limited bandwidth and high latency in acoustic channels.",
    approach:
      "Hybrid communication system combining Underwater Acoustic (UWA) for long-range and Visible Light Communication (VLC) for high-bandwidth short-range links.",
    impact:
      "Enabling autonomous underwater vehicles with superior communication capabilities for oceanographic research and underwater exploration.",
    technologies: ["UWA", "VLC", "UUV", "Hybrid Systems"],
    collaborators: ["DSP Lab, IIEST Shibpur", "International Collaborators"],
    publications: ["IEEE Transactions (2)", "Conference Papers (3)"],
  },
  {
    id: 5,
    title: "Real-Time Visibility Enhancement System",
    subtitle: "PRISM Funded Project",
    role: "Principal Investigator",
    duration: "2024-2025",
    status: "Active",
    funding: "DSIR (Govt. of India) via IIT Kharagpur",
    category: "image-processing",
    problem:
      "Poor visibility in challenging environments (fog, underwater, low light) hampers safety and operational efficiency.",
    approach:
      "Deep learning-based image enhancement system for real-time visibility improvement in adverse conditions using CNN and adaptive filtering.",
    impact:
      "Critical applications in autonomous vehicles, surveillance systems, and underwater imaging.",
    technologies: ["Deep Learning", "CNN", "Image Processing", "Real-Time Systems"],
    collaborators: ["IIT Kharagpur", "Industry Partners"],
    publications: ["Journal Paper (Under Review)"],
  },
  {
    id: 6,
    title: "SMART-ARAI",
    subtitle: "Traffic Optimization with AI & V2V",
    role: "Principal Investigator",
    duration: "2024-2025",
    status: "Active",
    funding: "MeitY TIDE Fund via SINE IIT Bombay",
    category: "ai-iot",
    problem:
      "Urban traffic congestion and accidents due to lack of intelligent vehicle communication and traffic management.",
    approach:
      "AI-powered traffic optimization system with Vehicle-to-Vehicle (V2V) communication for smart cities and autonomous vehicles.",
    impact:
      "Reducing traffic congestion by 30% and improving road safety through intelligent traffic management.",
    technologies: ["AI/ML", "V2V Communication", "IoT", "Smart Cities"],
    collaborators: ["SINE IIT Bombay", "Municipal Authorities"],
    publications: ["Conference Paper (Accepted)"],
  },
];

const categories = [
  { value: "all", label: "All Projects" },
  { value: "underwater", label: "Underwater Communication" },
  { value: "iot", label: "IoT & Sensing" },
  { value: "ai-iot", label: "AI/ML" },
  { value: "positioning", label: "Positioning Systems" },
  { value: "image-processing", label: "Image Processing" },
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

export default function ProjectsPage() {
  return (
    <div className="gradient-bg min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Research Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Flagship projects spanning underwater communication, IoT, AI/ML, and
            smart systems with real-world impact
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              16 Active Projects
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              4 Patents Filed
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              3 Funding Agencies
            </Badge>
          </div>
        </motion.div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
            {categories.map((cat) => (
              <TabsTrigger key={cat.value} value={cat.value}>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.value} value={category.value}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-6"
              >
                {projects
                  .filter(
                    (p) =>
                      category.value === "all" || p.category === category.value
                  )
                  .map((project) => (
                    <motion.div key={project.id} variants={itemVariants}>
                      <Card className="gradient-card border-primary/20 hover:border-primary/40 transition-all">
                        <CardHeader>
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex-1">
                              <CardTitle className="text-2xl mb-2">
                                {project.title}
                              </CardTitle>
                              <p className="text-primary font-semibold">
                                {project.subtitle}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="w-fit border-green-500 text-green-400"
                            >
                              {project.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {/* Project Metadata */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                Role:
                              </span>
                              <span className="font-semibold">
                                {project.role}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                Duration:
                              </span>
                              <span>{project.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                Funding:
                              </span>
                              <span>{project.funding}</span>
                            </div>
                          </div>

                          {/* Problem Statement */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Target className="h-4 w-4 text-primary" />
                              <h4 className="font-semibold">Problem Statement</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {project.problem}
                            </p>
                          </div>

                          {/* Technical Approach */}
                          <div>
                            <h4 className="font-semibold mb-2">
                              Technical Approach
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {project.approach}
                            </p>
                          </div>

                          {/* Impact */}
                          <div>
                            <h4 className="font-semibold mb-2">Impact</h4>
                            <p className="text-sm text-muted-foreground">
                              {project.impact}
                            </p>
                          </div>

                          {/* Technologies */}
                          <div>
                            <h4 className="font-semibold mb-2">
                              Key Technologies
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Collaborators */}
                          <div>
                            <h4 className="font-semibold mb-2">Collaborators</h4>
                            <p className="text-sm text-muted-foreground">
                              {project.collaborators.join(" • ")}
                            </p>
                          </div>

                          {/* Publications */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="h-4 w-4 text-primary" />
                              <h4 className="font-semibold">
                                Related Publications
                              </h4>
                            </div>
                            <div className="space-y-1">
                              {project.publications.map((pub, idx) => (
                                <p
                                  key={idx}
                                  className="text-sm text-muted-foreground"
                                >
                                  • {pub}
                                </p>
                              ))}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-3 pt-4">
                            <Button variant="outline" size="sm" className="gap-2">
                              <ExternalLink className="h-4 w-4" />
                              Project Details
                            </Button>
                            <Link href="/contact">
                              <Button size="sm">Collaborate</Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
