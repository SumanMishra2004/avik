"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ResearchInterests from "@/components/ResearchInterests";

const experience = [
  {
    title: "Associate Professor",
    institution: "University of Engineering and Management, Kolkata",
    duration: "2020 - Present",
    description:
      "Leading research in AI-ML, IoT, and Wireless Communication. Managing 16+ active research projects with government funding.",
  },
  {
    title: "Researcher",
    institution: "DSP Lab, IIEST Shibpur",
    duration: "2019 - Present",
    description:
      "Conducting cutting-edge research in underwater acoustic communication and signal processing.",
  },
  {
    title: "Examiner",
    institution: "WBUT (MAKAUT)",
    duration: "2017 - 2018",
    description: "External examiner for undergraduate engineering programs.",
  },
];

const courses = [
  {
    category: "AI/ML & Data Science",
    courses: [
      "Artificial Intelligence & Machine Learning",
      "Data Structures & Algorithms",
      "Cloud Computing",
    ],
  },
  {
    category: "Communication Systems",
    courses: [
      "Wireless Communication",
      "Signal Processing",
      "Electromagnetic Theory",
      "Communication Engineering",
    ],
  },
  {
    category: "IoT & Embedded Systems",
    courses: [
      "Internet of Things (IoT)",
      "Computer Architecture",
      "Computer Networks",
    ],
  },
  {
    category: "Electronics",
    courses: ["Analog Circuits", "Digital Signal Processing"],
  },
];

const labs = [
  {
    name: "Digital Image Processing & Computer Vision Lab",
    tools: "Matlab, Python, OpenCV",
    focus: "Image enhancement, object detection, deep learning applications",
  },
  {
    name: "Digital Signal Processing Lab",
    tools: "TMS320C6748 DSP Processor, Code Composer Studio",
    focus: "Real-time signal processing, filter design, communication systems",
  },
  {
    name: "Communication Engineering Lab",
    tools: "Modulation/Demodulation kits, Spectrum Analyzers",
    focus: "Analog and digital communication techniques",
  },
  {
    name: "Computer Networks Lab",
    tools: "Cisco Packet Tracer, Wireshark, Network Simulators",
    focus: "Network protocols, IoT communication, wireless networks",
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

export default function TeachingPage() {
  return (
    <div className="gradient-bg min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Teaching & Mentorship
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Inspiring the next generation of researchers and engineers through
            innovative pedagogy and hands-on laboratory experience
          </p>
        </motion.div>

        {/* Experience Section */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Academic Experience
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-4"
          >
            {experience.map((exp, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="gradient-card border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{exp.title}</h3>
                        <p className="text-primary font-semibold">
                          {exp.institution}
                        </p>
                      </div>
                      <Badge variant="secondary">{exp.duration}</Badge>
                    </div>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Courses Section */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Courses Taught
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {courses.map((category, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="gradient-card border-primary/20 h-full">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-primary">
                      {category.category}
                    </h3>
                    <ul className="space-y-2">
                      {category.courses.map((course, cIdx) => (
                        <li
                          key={cIdx}
                          className="flex items-center gap-2 text-muted-foreground"
                        >
                          <span className="text-primary">•</span>
                          {course}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Laboratory Experience */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Laboratory Experience
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-4"
          >
            {labs.map((lab, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="gradient-card border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">{lab.name}</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Tools & Technologies:
                        </span>
                        <p className="text-sm">{lab.tools}</p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Focus Areas:
                        </span>
                        <p className="text-sm">{lab.focus}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Student Supervision */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6"
          >
            Student Supervision & Mentorship
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            <motion.div variants={itemVariants}>
              <Card className="gradient-card border-primary/20 text-center">
                <CardContent className="p-6">
                  <div className="text-5xl font-bold text-primary mb-2">
                    5+
                  </div>
                  <p className="text-lg font-semibold mb-2">
                    PhD Students Supervised
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Co-supervision in underwater communication, IoT, and AI/ML
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="gradient-card border-primary/20 text-center">
                <CardContent className="p-6">
                  <div className="text-5xl font-bold text-primary mb-2">
                    15+
                  </div>
                  <p className="text-lg font-semibold mb-2">
                    M.Tech Projects Guided
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Advanced topics in wireless communication and signal
                    processing
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card className="gradient-card border-primary/20 text-center">
                <CardContent className="p-6">
                  <div className="text-5xl font-bold text-primary mb-2">
                    30+
                  </div>
                  <p className="text-lg font-semibold mb-2">
                    Undergraduate Mentees
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Research internships and final year projects
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* Philosophy */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="gradient-card border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4">Teaching Philosophy</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    I believe in fostering a research-oriented learning
                    environment where students are encouraged to explore
                    beyond textbooks and engage with real-world problems. My
                    teaching methodology emphasizes:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Hands-on Learning:</strong> Extensive
                        laboratory work with modern tools and technologies
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Research Integration:</strong> Connecting
                        classroom concepts with ongoing research projects
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Industry Relevance:</strong> Bridging academic
                        knowledge with industry requirements
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Interdisciplinary Approach:</strong> Encouraging
                        students to think across domains—AI, IoT, and
                        communication systems
                      </span>
                    </li>
                  </ul>
                  <p className="pt-4">
                    I am always looking for motivated students interested in
                    pursuing research in underwater communication, IoT
                    applications, or AI-enabled wireless systems. If you are
                    passionate about solving real-world challenges, I welcome
                    you to reach out for PhD/M.Tech supervision opportunities.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
