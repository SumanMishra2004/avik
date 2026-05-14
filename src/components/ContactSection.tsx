"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink, Send, CheckCircle } from "lucide-react";
import type { SanitySiteSettings } from "@/types/sanity";

interface ContactSectionProps {
  personalInfo: Pick<
    SanitySiteSettings,
    "email" | "phone" | "location" | "orcid" | "twitter" | "twitterUrl" | "linkedin" | "linkedinUrl"
  >;
}

export default function ContactSection({ personalInfo }: ContactSectionProps) {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      formState.subject || "Research Collaboration Inquiry"
    )}&body=${encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    )}`;
    window.open(mailtoLink, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const CONTACT_CARDS = [
    { icon: <Mail size={20} />, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: "from-[#C8A558] to-[#E2C07A]" },
    { icon: <Phone size={20} />, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}`, color: "from-[#A68541] to-[#C8A558]" },
    { icon: <MapPin size={20} />, label: "Location", value: personalInfo.location, href: "https://maps.google.com/?q=Kolkata,India", color: "from-indigo-600 to-[#C8A558]" },
    { icon: <ExternalLink size={20} />, label: "ORCID", value: "0000-0001-8824-703X", href: personalInfo.orcid, color: "from-sky-600 to-[#C8A558]" },
  ];

  const SOCIAL_LINKS = [
    { icon: "𝕏", label: "Twitter / X", value: personalInfo.twitter, href: personalInfo.twitterUrl },
    { icon: "in", label: "LinkedIn", value: `linkedin.com/in/${personalInfo.linkedin}`, href: personalInfo.linkedinUrl },
    { icon: "ID", label: "ORCID", value: "View Publications", href: personalInfo.orcid },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060D1F] to-[#0A0F1E] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8A558]/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(37,99,235,0.12),transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C8A558]" />
            <span className="text-[#C8A558] text-sm hf-mono font-medium tracking-widest uppercase">Contact</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C8A558]" />
          </div>
          <h2 className="section-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Open to Research <span className="text-gradient">Collaborations</span>
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
            Have a research idea, project collaboration, or academic partnership in mind? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-5"
          >
            {CONTACT_CARDS.map((card, i) => (
              <motion.a
                key={i}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 glass-card rounded-xl p-4 border border-white/5 hover:border-[#C8A558]/25 transition-all duration-300 group"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white flex-shrink-0 group-hover:shadow-[0_0_15px_rgba(200,165,88,0.3)] transition-shadow`}>
                  {card.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-[#64748B] text-xs mb-0.5">{card.label}</div>
                  <div className="text-[#F1F5F9] text-sm font-medium truncate group-hover:text-[#C8A558] transition-colors">{card.value}</div>
                </div>
              </motion.a>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-xl p-5 border border-white/5"
            >
              <p className="text-[#64748B] text-xs mb-4 uppercase tracking-widest hf-mono">Social Profiles</p>
              <div className="space-y-3">
                {SOCIAL_LINKS.map((social, i) => (
                  <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg glass-card border border-white/10 flex items-center justify-center text-[#C8A558] text-xs font-bold group-hover:border-[#C8A558]/40 group-hover:bg-[#C8A558]/5 transition-all">
                      {social.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[#94A3B8] text-xs group-hover:text-[#C8A558] transition-colors truncate">{social.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-8 border border-white/5" style={{ boxShadow: "0 0 60px rgba(37,99,235,0.08)" }}>
              <h3 className="hf-display font-bold text-xl text-white mb-6">Send a Message</h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                >
                  <CheckCircle size={48} className="text-green-400" />
                  <p className="text-white font-semibold text-lg">Message Sent!</p>
                  <p className="text-[#94A3B8] text-sm">Opening your email client... I&apos;ll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[#94A3B8] text-xs mb-2 font-medium uppercase tracking-wider">Your Name *</label>
                      <input id="contact-name" type="text" required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} placeholder="Dr. John Smith" className="w-full px-4 py-3 rounded-xl glass-card border border-white/10 text-white placeholder:text-[#64748B] text-sm focus:outline-none focus:border-[#C8A558]/50 focus:bg-white/5 transition-all" />
                    </div>
                    <div>
                      <label className="block text-[#94A3B8] text-xs mb-2 font-medium uppercase tracking-wider">Email Address *</label>
                      <input id="contact-email" type="email" required value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} placeholder="you@university.edu" className="w-full px-4 py-3 rounded-xl glass-card border border-white/10 text-white placeholder:text-[#64748B] text-sm focus:outline-none focus:border-[#C8A558]/50 focus:bg-white/5 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#94A3B8] text-xs mb-2 font-medium uppercase tracking-wider">Subject</label>
                    <input id="contact-subject" type="text" value={formState.subject} onChange={(e) => setFormState({ ...formState, subject: e.target.value })} placeholder="Research Collaboration — 6G Channel Modeling" className="w-full px-4 py-3 rounded-xl glass-card border border-white/10 text-white placeholder:text-[#64748B] text-sm focus:outline-none focus:border-[#C8A558]/50 focus:bg-white/5 transition-all" />
                  </div>
                  <div>
                    <label className="block text-[#94A3B8] text-xs mb-2 font-medium uppercase tracking-wider">Message *</label>
                    <textarea id="contact-message" required rows={5} value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} placeholder="I'd like to collaborate on..." className="w-full px-4 py-3 rounded-xl glass-card border border-white/10 text-white placeholder:text-[#64748B] text-sm focus:outline-none focus:border-[#C8A558]/50 focus:bg-white/5 transition-all resize-none" />
                  </div>
                  <motion.button
                    type="submit"
                    id="contact-submit-btn"
                    whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(200,165,88,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#C8A558] to-[#C8A558] text-white font-semibold text-sm transition-all duration-300"
                  >
                    <Send size={16} />
                    Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
