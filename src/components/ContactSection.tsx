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
    { icon: <Mail size={20} />, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: "from-[#60A5FA] to-[#1D4ED8]" },
    { icon: <Phone size={20} />, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}`, color: "from-[#1D4ED8] to-[#60A5FA]" },
    { icon: <MapPin size={20} />, label: "Location", value: personalInfo.location, href: "https://maps.google.com/?q=Kolkata,India", color: "from-indigo-600 to-[#60A5FA]" },
    { icon: <ExternalLink size={20} />, label: "ORCID", value: "0000-0001-8824-703X", href: personalInfo.orcid, color: "from-sky-600 to-[#60A5FA]" },
  ];

  const SOCIAL_LINKS = [
    { icon: "𝕏", label: "Twitter / X", value: personalInfo.twitter, href: personalInfo.twitterUrl },
    { icon: "in", label: "LinkedIn", value: `linkedin.com/in/${personalInfo.linkedin}`, href: personalInfo.linkedinUrl },
    { icon: "ID", label: "ORCID", value: "View Publications", href: personalInfo.orcid },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
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
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#2563EB] dark:to-[#60A5FA]" />
            <span className="text-[#2563EB] dark:text-[#60A5FA] text-sm hf-mono font-semibold tracking-widest uppercase">Contact</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#2563EB] dark:to-[#60A5FA]" />
          </div>
          <h2 className="section-heading text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Open to Research <span className="text-gradient">Collaborations</span>
          </h2>
          <p className="text-slate-600 dark:text-[#94A3B8] text-lg max-w-2xl mx-auto">
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
                className="flex items-center gap-4 rounded-xl p-4 border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[.02] shadow-lg shadow-slate-900/5 dark:shadow-none hover:border-[#60A5FA]/40 transition-all duration-300 group"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white flex-shrink-0 shadow-md transition-shadow`}>
                  {card.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-slate-500 dark:text-[#64748B] text-xs mb-0.5 font-medium">{card.label}</div>
                  <div className="text-slate-900 dark:text-[#F1F5F9] text-sm font-bold truncate group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">{card.value}</div>
                </div>
              </motion.a>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="rounded-xl p-5 border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[.02] shadow-lg shadow-slate-900/5 dark:shadow-none"
            >
              <p className="text-slate-500 dark:text-[#64748B] text-xs mb-4 uppercase tracking-widest hf-mono font-bold">Social Profiles</p>
              <div className="space-y-3">
                {SOCIAL_LINKS.map((social, i) => (
                  <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-[#2563EB] dark:text-[#60A5FA] text-xs font-bold group-hover:border-[#60A5FA] transition-all">
                      {social.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-slate-700 dark:text-[#94A3B8] text-xs font-medium group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors truncate">{social.value}</div>
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
            <div className="rounded-2xl p-8 border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[.02] shadow-xl shadow-slate-900/5 dark:shadow-none">
              <h3 className="hf-display font-bold text-xl text-slate-900 dark:text-white mb-6">Send a Message</h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                >
                  <CheckCircle size={48} className="text-emerald-500" />
                  <p className="text-slate-900 dark:text-white font-bold text-lg">Message Sent!</p>
                  <p className="text-slate-600 dark:text-[#94A3B8] text-sm">Opening your email client... I&apos;ll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-slate-700 dark:text-[#94A3B8] text-xs mb-2 font-bold uppercase tracking-wider">Your Name *</label>
                      <input id="contact-name" type="text" required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} placeholder="Dr. John Smith" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#64748B] text-sm focus:outline-none focus:border-[#60A5FA] transition-all" />
                    </div>
                    <div>
                      <label className="block text-slate-700 dark:text-[#94A3B8] text-xs mb-2 font-bold uppercase tracking-wider">Email Address *</label>
                      <input id="contact-email" type="email" required value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} placeholder="you@university.edu" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#64748B] text-sm focus:outline-none focus:border-[#60A5FA] transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-[#94A3B8] text-xs mb-2 font-bold uppercase tracking-wider">Subject</label>
                    <input id="contact-subject" type="text" value={formState.subject} onChange={(e) => setFormState({ ...formState, subject: e.target.value })} placeholder="Research Collaboration — 6G Channel Modeling" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#64748B] text-sm focus:outline-none focus:border-[#60A5FA] transition-all" />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-[#94A3B8] text-xs mb-2 font-bold uppercase tracking-wider">Message *</label>
                    <textarea id="contact-message" required rows={5} value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} placeholder="I'd like to collaborate on..." className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#64748B] text-sm focus:outline-none focus:border-[#60A5FA] transition-all resize-none" />
                  </div>
                  <motion.button
                    type="submit"
                    id="contact-submit-btn"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8] text-white font-bold text-sm shadow-md transition-all duration-300"
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
