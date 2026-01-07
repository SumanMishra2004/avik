"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, FileText, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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

export default function PublicationsPage() {
  const [patents, setPatents] = useState<any[]>([]);
  const [journals, setJournals] = useState<any[]>([]);
  const [conferences, setConferences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patentsRes, journalsRes, conferencesRes] = await Promise.all([
          fetch("/api/publications/patents"),
          fetch("/api/publications/journals"),
          fetch("/api/publications/conferences"),
        ]);

        const [patentsData, journalsData, conferencesData] = await Promise.all([
          patentsRes.json(),
          journalsRes.json(),
          conferencesRes.json(),
        ]);

        setPatents(patentsData);
        setJournals(journalsData);
        setConferences(conferencesData);
      } catch (error) {
        console.error("Error fetching publications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="gradient-bg min-h-screen py-20 flex items-center justify-center">
        <div className="text-2xl">Loading publications...</div>
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Publications</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Research contributions spanning patents, journals, transactions, and
            international conferences
          </p>
          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Award className="h-4 w-4 mr-2" />
              {patents.length} Patents
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <FileText className="h-4 w-4 mr-2" />
              {journals.length} Journal Papers
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <FileText className="h-4 w-4 mr-2" />
              {conferences.length} Conference Papers
            </Badge>
          </div>
        </motion.div>

        <Tabs defaultValue="patents" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="patents">Patents</TabsTrigger>
            <TabsTrigger value="journals">Journals</TabsTrigger>
            <TabsTrigger value="conferences">Conferences</TabsTrigger>
          </TabsList>

          {/* Patents */}
          <TabsContent value="patents">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-4"
            >
              {patents.length === 0 ? (
                <Card className="gradient-card border-primary/20">
                  <CardContent className="p-6 text-center text-muted-foreground">
                    No patents found. Add some from the admin panel.
                  </CardContent>
                </Card>
              ) : (
                patents.map((patent) => (
                  <motion.div key={patent.id} variants={itemVariants}>
                    <Card className="gradient-card border-primary/20 hover:border-primary/40 transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">📄</div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold mb-2">
                              {patent.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {patent.description}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm mb-3">
                              <span>
                                <span className="text-muted-foreground">
                                  Application:
                                </span>{" "}
                                {patent.applicationNumber}
                              </span>
                              <span>
                                <span className="text-muted-foreground">
                                  Year:
                                </span>{" "}
                                {patent.year}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className="border-yellow-500 text-yellow-400"
                              >
                                {patent.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </motion.div>
          </TabsContent>

          {/* Journals */}
          <TabsContent value="journals">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-4"
            >
              {journals.length === 0 ? (
                <Card className="gradient-card border-primary/20">
                  <CardContent className="p-6 text-center text-muted-foreground">
                    No journal papers found. Add some from the admin panel.
                  </CardContent>
                </Card>
              ) : (
                journals.map((paper) => (
                  <motion.div key={paper.id} variants={itemVariants}>
                    <Card className="gradient-card border-primary/20 hover:border-primary/40 transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">📚</div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold mb-2">
                              {paper.title}
                            </h3>
                            <p className="text-sm text-primary font-semibold mb-2">
                              {paper.journal}
                            </p>
                            <p className="text-sm text-muted-foreground mb-3">
                              {paper.description}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm mb-3">
                              <span>
                                <span className="text-muted-foreground">
                                  Authors:
                                </span>{" "}
                                {paper.authors}
                              </span>
                              <span>
                                <span className="text-muted-foreground">
                                  Year:
                                </span>{" "}
                                {paper.year}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              {paper.impact && (
                                <Badge variant="secondary">{paper.impact}</Badge>
                              )}
                              {paper.pdfUrl && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="gap-2"
                                  onClick={() => window.open(paper.pdfUrl, "_blank")}
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  View Paper
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </motion.div>
          </TabsContent>

          {/* Conferences */}
          <TabsContent value="conferences">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-4"
            >
              {conferences.length === 0 ? (
                <Card className="gradient-card border-primary/20">
                  <CardContent className="p-6 text-center text-muted-foreground">
                    No conference papers found. Add some from the admin panel.
                  </CardContent>
                </Card>
              ) : (
                conferences.map((paper) => (
                  <motion.div key={paper.id} variants={itemVariants}>
                    <Card className="gradient-card border-primary/20 hover:border-primary/40 transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">🎤</div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold mb-2">
                              {paper.title}
                            </h3>
                            <p className="text-sm text-primary font-semibold mb-2">
                              {paper.conference}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm mb-3">
                              <span>
                                <span className="text-muted-foreground">
                                  Authors:
                                </span>{" "}
                                {paper.authors}
                              </span>
                              <span>
                                <span className="text-muted-foreground">
                                  Location:
                                </span>{" "}
                                {paper.location}
                              </span>
                              <span>
                                <span className="text-muted-foreground">
                                  Year:
                                </span>{" "}
                                {paper.year}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge variant="outline">{paper.type}</Badge>
                              {paper.pdfUrl && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="gap-2"
                                  onClick={() => window.open(paper.pdfUrl, "_blank")}
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  View Paper
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
