"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Github,
  BookOpen,
  Send,
  Building,
  User,
} from "lucide-react";
import { useState } from "react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "avik.das@example.com",
    href: "mailto:avik.das@example.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 XXXXX XXXXX",
    href: "tel:+91XXXXXXXXXX",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "University of Engineering and Management, Kolkata, West Bengal, India",
    href: null,
  },
  {
    icon: Building,
    label: "Research Lab",
    value: "DSP Lab, IIEST Shibpur",
    href: null,
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com",
    color: "text-blue-400",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com",
    color: "text-gray-400",
  },
  {
    icon: BookOpen,
    label: "Google Scholar",
    href: "https://scholar.google.com",
    color: "text-green-400",
  },
  {
    icon: User,
    label: "ORCID",
    href: "https://orcid.org/0000-0001-8824-703X",
    color: "text-emerald-400",
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you for your message! I will get back to you soon.");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="gradient-bg min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Let's collaborate on research, discuss opportunities, or explore new
            ideas in wireless communication and AI
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <Card className="gradient-card border-primary/20">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    {contactInfo.map((info, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-background/50">
                          <info.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">
                            {info.label}
                          </p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-sm hover:text-primary transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-sm">{info.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="gradient-card border-primary/20">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Connect Online</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((link, idx) => (
                      <motion.a
                        key={idx}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 p-4 rounded-lg bg-background/50 hover:bg-background/70 transition-all"
                      >
                        <link.icon className={`h-6 w-6 ${link.color}`} />
                        <span className="font-semibold">{link.label}</span>
                      </motion.a>
                    ))}
                  </div>
                  <div className="mt-6 p-4 rounded-lg bg-background/50">
                    <p className="text-sm text-muted-foreground mb-2">
                      ORCID ID
                    </p>
                    <p className="text-sm font-mono">0000-0001-8824-703X</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="gradient-card border-primary/20">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">
                    Office Hours
                  </h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span>10:00 AM - 5:00 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span>By Appointment</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    * Please schedule appointments in advance for research
                    discussions
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="gradient-card border-primary/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium mb-2"
                    >
                      Inquiry Type *
                    </label>
                    <select
                      id="type"
                      name="type"
                      required
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="collaboration">Research Collaboration</option>
                      <option value="phd">PhD/M.Tech Supervision</option>
                      <option value="industry">Industry Partnership</option>
                      <option value="visiting">Visiting Position</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Brief subject of your message"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Tell me about your inquiry..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" size="lg" className="w-full gap-2">
                    <Send className="h-5 w-5" />
                    Send Message
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    I typically respond within 2-3 business days
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Research Interests Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="gradient-card border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Seeking Collaborators In
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Underwater Communication",
                  "6G Research",
                  "IoT-AI Integration",
                  "OTFS Modulation",
                  "VLC Systems",
                  "Deep Learning for Comm.",
                  "Cognitive Radio",
                  "Smart Agriculture",
                ].map((topic) => (
                  <Badge key={topic} variant="secondary" className="text-sm px-4 py-2">
                    {topic}
                  </Badge>
                ))}
              </div>
              <p className="text-center text-muted-foreground mt-6">
                Open to PhD/M.Tech co-supervision, industry partnerships, and
                interdisciplinary projects
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
