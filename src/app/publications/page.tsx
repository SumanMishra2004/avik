"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, FileText, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const publications = {
  patents: [
    {
      title: "Smart Underground Mine Positioning System using VLC-LoRa Hybrid",
      applicationNumber: "202441XXXXX",
      status: "Application Pending",
      year: "2024",
      inventors: "Avik Kumar Das, et al.",
      description:
        "Novel positioning system for GNSS-denied underground environments",
    },
    {
      title: "IoUT-enabled Underwater Monitoring System with AI Analytics",
      applicationNumber: "202441XXXXX",
      status: "Filed",
      year: "2024",
      inventors: "Avik Kumar Das, et al.",
      description:
        "Intelligent underwater sensing platform with real-time analytics",
    },
    {
      title: "Hybrid UWA-VLC Communication System for Underwater Vehicles",
      applicationNumber: "202341XXXXX",
      status: "Under Examination",
      year: "2023",
      inventors: "Avik Kumar Das, et al.",
      description: "Dual-mode communication for enhanced UUV capabilities",
    },
    {
      title: "AI-powered GNSS-denied Positioning System",
      applicationNumber: "202341XXXXX",
      status: "Filed",
      year: "2023",
      inventors: "Avik Kumar Das, et al.",
      description: "Machine learning based indoor/underground positioning",
    },
  ],
  journals: [
    {
      title:
        "Deep Learning Approaches for Channel Estimation in OTFS Systems",
      journal: "Springer Wireless Networks",
      year: "2024",
      authors: "Das, A.K., et al.",
      doi: "10.1007/sXXXXX-XXX-XXXXX-X",
      impact: "IF: 2.5",
      description:
        "Novel CNN-based channel estimation technique for OTFS modulation",
    },
    {
      title:
        "Underwater Acoustic Communication: Challenges and AI-Enabled Solutions",
      journal: "Taylor & Francis Journal of Marine Science",
      year: "2023",
      authors: "Das, A.K., Singh, R., Kumar, P.",
      doi: "10.1080/XXXXXXXX.2023.XXXXXXX",
      impact: "IF: 2.1",
      description: "Comprehensive review of AI/ML in underwater communication",
    },
  ],
  transactions: [
    {
      title:
        "Hybrid VLC-UWA Communication Architecture for Autonomous Underwater Vehicles",
      conference: "IEEE Transactions on Vehicular Technology",
      year: "2024",
      authors: "Das, A.K., et al.",
      doi: "10.1109/TVT.2024.XXXXXXX",
      impact: "IF: 6.8",
      description:
        "Complete system design and performance analysis of dual-mode UUV communication",
    },
    {
      title:
        "CNN-based Sparse Channel Reconstruction for Underwater Acoustic OFDM Systems",
      conference: "IEEE Transactions on Communications",
      year: "2023",
      authors: "Das, A.K., Sharma, M.",
      doi: "10.1109/TCOMM.2023.XXXXXXX",
      impact: "IF: 8.3",
      description:
        "Deep learning solution for challenging underwater channel estimation",
    },
  ],
  conferences: [
    {
      title: "Real-time Visibility Enhancement using Deep Learning for UUVs",
      conference: "IEEE OCEANS 2024",
      location: "Singapore",
      year: "2024",
      authors: "Das, A.K., et al.",
      type: "Oral Presentation",
    },
    {
      title: "LoRa-based Mine Safety Monitoring with VLC Positioning",
      conference: "IEEE INDICON 2024",
      location: "Kolkata, India",
      year: "2024",
      authors: "Das, A.K., et al.",
      type: "Best Paper Nominee",
    },
    {
      title: "GNSS-AI: Machine Learning for Indoor Positioning Systems",
      conference: "IEEE TENCON 2023",
      location: "Bangkok, Thailand",
      year: "2023",
      authors: "Das, A.K., Kumar, R.",
      type: "Oral Presentation",
    },
    {
      title: "Cognitive Radio Networks: Energy-Efficient Spectrum Sensing",
      conference: "IEEE COMSNETS 2023",
      location: "Bangalore, India",
      year: "2023",
      authors: "Das, A.K., et al.",
      type: "Poster",
    },
    {
      title: "6G Channel Modeling: Terahertz Communication Challenges",
      conference: "Springer ICICCT 2023",
      location: "New Delhi, India",
      year: "2023",
      authors: "Das, A.K., Singh, P.",
      type: "Oral Presentation",
    },
    {
      title: "V2V Communication for Smart Cities: An AI Approach",
      conference: "IEEE ICCCNT 2022",
      location: "IIT Kharagpur, India",
      year: "2022",
      authors: "Das, A.K., et al.",
      type: "Oral Presentation",
    },
    {
      title: "IoT-enabled Smart Agriculture: Precision Farming Solutions",
      conference: "Springer ICDSMLA 2022",
      location: "Virtual",
      year: "2022",
      authors: "Das, A.K., Patel, M.",
      type: "Oral Presentation",
    },
    {
      title: "JANUS Protocol Implementation for Underwater Communication",
      conference: "IEEE URTEC 2022",
      location: "Mumbai, India",
      year: "2022",
      authors: "Das, A.K., et al.",
      type: "Poster",
    },
  ],
  books: [
    {
      title:
        "Underwater Acoustic Communication Systems: Design and Implementation",
      type: "Book Chapter",
      publisher: "Springer Nature",
      year: "2024",
      authors: "Das, A.K.",
      isbn: "978-3-XXX-XXXXX-X",
      description:
        "Comprehensive chapter on UWA modem design and JANUS protocol",
    },
    {
      title: "AI/ML Applications in Wireless Communication",
      type: "Book Chapter",
      publisher: "CRC Press",
      year: "2023",
      authors: "Das, A.K., Kumar, P.",
      isbn: "978-1-XXX-XXXXX-X",
      description:
        "Machine learning techniques for next-generation wireless systems",
    },
  ],
};

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
              <Award className="h-4 w-4 mr-2" />4 Patents
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <FileText className="h-4 w-4 mr-2" />2 Journal Papers
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <FileText className="h-4 w-4 mr-2" />2 IEEE Transactions
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <FileText className="h-4 w-4 mr-2" />
              10+ Conference Papers
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <FileText className="h-4 w-4 mr-2" />2 Book Chapters
            </Badge>
          </div>
        </motion.div>

        <Tabs defaultValue="patents" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
            <TabsTrigger value="patents">Patents</TabsTrigger>
            <TabsTrigger value="journals">Journals</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="conferences">Conferences</TabsTrigger>
            <TabsTrigger value="books">Books</TabsTrigger>
          </TabsList>

          {/* Patents */}
          <TabsContent value="patents">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-4"
            >
              {publications.patents.map((patent, idx) => (
                <motion.div key={idx} variants={itemVariants}>
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
              ))}
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
              {publications.journals.map((paper, idx) => (
                <motion.div key={idx} variants={itemVariants}>
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
                            <Badge variant="secondary">{paper.impact}</Badge>
                            <Button size="sm" variant="outline" className="gap-2">
                              <ExternalLink className="h-3 w-3" />
                              View Paper
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Transactions */}
          <TabsContent value="transactions">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-4"
            >
              {publications.transactions.map((paper, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <Card className="gradient-card border-primary/20 hover:border-primary/40 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">🏆</div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold mb-2">
                            {paper.title}
                          </h3>
                          <p className="text-sm text-primary font-semibold mb-2">
                            {paper.conference}
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
                            <Badge variant="secondary">{paper.impact}</Badge>
                            <Button size="sm" variant="outline" className="gap-2">
                              <ExternalLink className="h-3 w-3" />
                              View Paper
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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
              {publications.conferences.map((paper, idx) => (
                <motion.div key={idx} variants={itemVariants}>
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
                          <Badge variant="outline">{paper.type}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Books */}
          <TabsContent value="books">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-4"
            >
              {publications.books.map((book, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <Card className="gradient-card border-primary/20 hover:border-primary/40 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">📖</div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold mb-2">
                            {book.title}
                          </h3>
                          <p className="text-sm text-primary font-semibold mb-2">
                            {book.publisher}
                          </p>
                          <p className="text-sm text-muted-foreground mb-3">
                            {book.description}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm mb-3">
                            <span>
                              <span className="text-muted-foreground">
                                Authors:
                              </span>{" "}
                              {book.authors}
                            </span>
                            <span>
                              <span className="text-muted-foreground">
                                Year:
                              </span>{" "}
                              {book.year}
                            </span>
                            <span>
                              <span className="text-muted-foreground">
                                ISBN:
                              </span>{" "}
                              {book.isbn}
                            </span>
                          </div>
                          <Badge variant="secondary">{book.type}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
