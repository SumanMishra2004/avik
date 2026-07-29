"use client";

import { motion } from "framer-motion";
import { Mail, ExternalLink, BookOpen, GraduationCap, XIcon, LinkIcon, GitCommitHorizontal } from "lucide-react";
import type { SanityTeamMember } from "@/types/sanity";
import Image from "next/image";

interface TeamGridProps {
  members: SanityTeamMember[];
}

function SocialButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.15, y: -1 }}
      className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-[#94A3B8] hover:text-[#9E7B28] dark:hover:text-[#C8A558] hover:border-[#C8A558] transition-all duration-200"
    >
      {icon}
    </motion.a>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-24 col-span-full"
    >
      <div className="text-5xl mb-4">🎓</div>
      <p className="text-slate-900 dark:text-white font-bold text-lg mb-2">Team members coming soon</p>
      <p className="text-slate-500 dark:text-[#64748B] text-sm max-w-md mx-auto">
        Research scholars and collaborators will be listed here. Add team members via the{" "}
        <a href="/studio" className="text-[#9E7B28] dark:text-[#C8A558] underline font-medium">Content CMS</a>.
      </p>
    </motion.div>
  );
}

function MemberCard({ member, index }: { member: SanityTeamMember; index: number }) {
  const photoUrl = member.photo?.asset?.url;
  const initials = member.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-2xl border bg-white dark:bg-white/[.04] p-6 flex flex-col gap-4 shadow-xl shadow-slate-900/5 dark:shadow-none transition-all duration-300 ${
        member.isFeatured
          ? "border-[#C8A558] bg-amber-500/5 dark:bg-[#C8A558]/[.03]"
          : "border-slate-200 dark:border-white/[.07] hover:border-[#C8A558]/50"
      }`}
    >
      {/* Featured badge */}
      {member.isFeatured && (
        <div className="absolute top-4 right-4">
          <span className="text-[10px] hf-mono px-2 py-0.5 rounded-full bg-[#C8A558]/20 text-[#9E7B28] dark:text-[#C8A558] border border-[#C8A558]/40 tracking-widest font-semibold uppercase">
            Featured
          </span>
        </div>
      )}

      {/* Photo + Name */}
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-slate-200 dark:border-white/10 group-hover:border-[#C8A558] transition-colors duration-300">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={member.photo?.alt ?? member.name}
                width={64}
                height={64}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#C8A558] to-[#A68541] flex items-center justify-center text-white font-bold text-lg hf-display">
                {initials}
              </div>
            )}
          </div>
          {/* Active dot */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-white dark:bg-[#0C0E13] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight group-hover:text-[#9E7B28] dark:group-hover:text-[#C8A558] transition-colors truncate">
            {member.name}
          </h3>
          <p className="text-[#9E7B28] dark:text-[#C8A558] text-xs font-semibold mt-0.5">{member.role}</p>
          <span className="inline-block mt-1 text-[10px] hf-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[.05] border border-slate-200 dark:border-white/[.08] text-slate-600 dark:text-[#94A3B8]">
            {member.department}
          </span>
        </div>
      </div>

      {/* Bio */}
      <p className="text-slate-600 dark:text-[#94A3B8] text-xs leading-relaxed line-clamp-3 flex-1">
        {member.bio}
      </p>

      {/* Meta chips */}
      <div className="flex flex-col gap-1.5">
        {member.researchArea && (
          <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-[#94A3B8]">
            <BookOpen size={13} className="text-[#9E7B28] dark:text-[#C8A558] flex-shrink-0" />
            <span className="truncate">{member.researchArea}</span>
          </div>
        )}
        {member.institution && (
          <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-[#94A3B8]">
            <GraduationCap size={13} className="text-[#9E7B28] dark:text-[#C8A558] flex-shrink-0" />
            <span className="truncate">{member.institution}</span>
          </div>
        )}
        {member.year && (
          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-[#64748B] hf-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A558] flex-shrink-0" />
            {member.year}
          </div>
        )}
      </div>

      {/* Social links */}
      {member.socials && (
        <div className="flex items-center gap-2 pt-3 border-t border-slate-200 dark:border-white/[.06]">
          {member.socials.twitter && (
            <SocialButton href={member.socials.twitter} icon={<XIcon size={13} />} label="Twitter" />
          )}
          {member.socials.linkedin && (
            <SocialButton href={member.socials.linkedin} icon={<LinkIcon size={13} />} label="LinkedIn" />
          )}
          {member.socials.github && (
            <SocialButton href={member.socials.github} icon={<GitCommitHorizontal size={13} />} label="GitHub" />
          )}
          {member.socials.scholar && (
            <SocialButton href={member.socials.scholar} icon={<ExternalLink size={13} />} label="Google Scholar" />
          )}
          {member.socials.email && (
            <SocialButton href={`mailto:${member.socials.email}`} icon={<Mail size={13} />} label="Email" />
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function TeamGrid({ members }: TeamGridProps) {
  const featured = members.filter((m) => m.isFeatured);
  const rest = members.filter((m) => !m.isFeatured);

  return (
    <section id="team" className="py-12 relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#9E7B28] dark:to-[#C8A558]" />
            <span className="text-[#9E7B28] dark:text-[#C8A558] text-[11px] hf-mono font-semibold tracking-[.18em] uppercase">
              Research Group
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#9E7B28] dark:to-[#C8A558]" />
          </div>
          <h1 className="hf-display text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Meet the <span className="text-[#9E7B28] dark:text-[#C8A558]">Team</span>
          </h1>
          <p className="text-slate-600 dark:text-[#94A3B8] text-[15px] mt-4 max-w-xl mx-auto">
            PhD scholars, research assistants, and collaborators advancing next-generation communication and AI research.
          </p>
        </motion.div>

        {members.length === 0 ? (
          <div className="grid">
            <EmptyState />
          </div>
        ) : (
          <>
            {/* Featured members — larger cards */}
            {featured.length > 0 && (
              <div className="mb-8">
                <p className="text-[11px] hf-mono text-[#9E7B28] dark:text-[#C8A558] font-bold tracking-widest uppercase mb-4">
                  Featured Researchers
                </p>
                <div className={`grid gap-5 ${featured.length === 1 ? "grid-cols-1 max-w-sm" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
                  {featured.map((m, i) => (
                    <MemberCard key={m._id} member={m} index={i} />
                  ))}
                </div>
              </div>
            )}

            {/* Rest of the team */}
            {rest.length > 0 && (
              <div>
                {featured.length > 0 && (
                  <p className="text-[11px] hf-mono text-slate-500 dark:text-[#64748B] font-bold tracking-widest uppercase mb-4">
                    Research Scholars & Collaborators
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {rest.map((m, i) => (
                    <MemberCard key={m._id} member={m} index={featured.length + i} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-14"
        >
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-[#C8A558] text-slate-900 dark:text-[#C8A558] bg-white dark:bg-transparent hf-display font-bold text-[14px] tracking-wide hover:bg-[#C8A558] hover:text-white dark:hover:bg-[#C8A558] dark:hover:text-slate-950 transition-all duration-200 shadow-md"
          >
            <Mail size={15} />
            Interested in joining? Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
