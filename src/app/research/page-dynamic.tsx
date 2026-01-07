"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Radio, Wifi, Lightbulb, Users, Mail } from "lucide-react";

const iconMap: Record<string, any> = {
  Radio,
  Brain,
  Wifi,
  Lightbulb,
};

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
  const [researchAreas, setResearchAreas] = useState<any[]>([]);
  const [funding, setFunding] = useState<any[]>([]);
  const [awards, setAwards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [areasRes, fundingRes, awardsRes] = await Promise.all([
          fetch("/api/research-areas"),
          fetch("/api/funding"),
          fetch("/api/awards"),
        ]);

        const [areasData, fundingData, awardsData] = await Promise.all([
          areasRes.json(),
          fundingRes.json(),
          awardsRes.json(),
        ]);

        setResearchAreas(areasData);
        setFunding(fundingData);
        setAwards(awardsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="gradient-bg min-h-screen py-20 flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

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
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Key Research Areas */}
        {researchAreas.length > 0 && (
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
              {researchAreas.map((area) => {
                const Icon = iconMap[area.icon] || Brain;
                return (
                  <motion.div key={area.id} variants={itemVariants}>
                    <Card className="gradient-card border-primary/20 hover:border-primary/40 transition-all h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-background/50">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-2">
                              {area.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {area.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>
        )}

        {/* Funding & Grants */}
        {funding.length > 0 && (
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
              {funding.map((fund) => (
                <motion.div key={fund.id} variants={itemVariants}>
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
        )}

        {/* Awards & Recognition */}
        {awards.length > 0 && (
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
              {awards.map((award) => (
                <motion.div key={award.id} variants={itemVariants}>
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
        )}
      </div>
    </div>
  );
}
