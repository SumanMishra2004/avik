"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FileText, Search, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import type { SanityPublication, SanityPublicationsStats } from "@/types/sanity";

type SortKey = "newest" | "oldest" | "az";
type TabKey = "All" | "Journal" | "Conference" | "Patent" | "Preprint" | "Book Chapter";

const TABS: TabKey[] = ["All", "Journal", "Conference", "Patent", "Preprint", "Book Chapter"];
const PER_PAGE = 8;

interface PublicationsSectionProps {
  publications: SanityPublication[];
  stats?: SanityPublicationsStats;
}

export default function PublicationsSection({ publications, stats }: PublicationsSectionProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("newest");
  const [page, setPage] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);

  const computedStats = useMemo(() => {
    if (stats) return [
      { label: "Total Publications", value: stats.total },
      { label: "Patents (Filed/Granted)", value: stats.patents },
      { label: "Journals", value: stats.journals },
      { label: "Conferences", value: stats.conferences },
    ];
    const total = publications.length;
    const patents = publications.filter((p) => p.type === "Patent").length;
    const journals = publications.filter((p) => p.type === "Journal").length;
    const conferences = publications.filter((p) => p.type === "Conference").length;
    return [
      { label: "Total Publications", value: total },
      { label: "Patents", value: patents },
      { label: "Journals", value: journals },
      { label: "Conferences", value: conferences },
    ];
  }, [publications, stats]);

  const filtered = useMemo(() => {
    let r = publications.slice();
    if (activeTab !== "All") r = r.filter((p) => p.type === activeTab);
    if (search) {
      const q = search.toLowerCase();
      r = r.filter((p) =>
        p.title.toLowerCase().includes(q) || p.publisher.toLowerCase().includes(q)
      );
    }
    if (sortBy === "newest") r.sort((a, b) => b.year.localeCompare(a.year));
    else if (sortBy === "oldest") r.sort((a, b) => a.year.localeCompare(b.year));
    else r.sort((a, b) => a.title.localeCompare(b.title));
    return r;
  }, [publications, activeTab, search, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  function goPage(n: number) {
    setPage(n);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="publications" className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060D1F]/50 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-[#C8A558] to-transparent" />
            <span className="text-[#C8A558] text-xs hf-mono tracking-widest uppercase">Research Archive</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Publications & <span className="text-[#C8A558]">Patents</span>
          </h2>
          
          {/* Minimal Stats Row */}
          <div className="flex flex-wrap gap-8 text-sm border-y border-white/5 py-4 mt-8">
            {computedStats.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[#C8A558] font-mono font-bold text-lg">{s.value}</span>
                <span className="text-[#94A3B8]">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12" ref={listRef}>
          <div className="flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => { setActiveTab(t); setPage(1); }}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                  activeTab === t
                    ? "bg-[#C8A558] text-[#0A0F1E] shadow-lg shadow-[#C8A558]/20"
                    : "bg-white/5 text-[#94A3B8] hover:bg-white/10 hover:text-white border border-white/5"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search publications..."
                className="w-full bg-transparent border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#C8A558]/50 transition-colors"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="bg-transparent border border-white/10 rounded-full px-4 py-2.5 text-sm text-[#94A3B8] focus:outline-none focus:border-[#C8A558]/50 cursor-pointer appearance-none pr-8"
            >
              <option value="newest" className="bg-[#0A0F1E]">Newest</option>
              <option value="oldest" className="bg-[#0A0F1E]">Oldest</option>
              <option value="az" className="bg-[#0A0F1E]">A-Z</option>
            </select>
          </div>
        </div>

        {/* List Layout */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {paged.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24 text-[#64748B]"
              >
                <BookOpen size={48} className="mx-auto mb-4 opacity-20" />
                <p>No publications found matching your criteria.</p>
              </motion.div>
            ) : (
              <motion.div
                key={`${activeTab}-${search}-${sortBy}-${safePage}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-4"
              >
                {paged.map((pub, i) => (
                  <motion.div
                    key={pub._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group relative flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[.02] hover:bg-white/[.04] hover:border-[#C8A558]/30 transition-all duration-300"
                  >
                    {/* Left meta info */}
                    <div className="md:w-1/4 shrink-0 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-4 md:gap-2 border-b md:border-b-0 md:border-r border-white/5 pb-4 md:pb-0 md:pr-6">
                      <div className="text-2xl md:text-3xl font-display font-bold text-[#C8A558]/80 group-hover:text-[#C8A558] transition-colors">
                        {pub.year}
                      </div>
                      <div className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-mono border border-white/10 text-[#94A3B8] bg-white/5 group-hover:border-[#C8A558]/30 transition-colors">
                        {pub.type}
                      </div>
                    </div>

                    {/* Main content */}
                    <div className="md:w-3/4 flex flex-col justify-center">
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#C8A558] transition-colors leading-snug mb-3">
                        {pub.title}
                      </h3>
                      
                      <div className="mb-4">
                        <div className="text-sm text-[#E2C07A] font-medium mb-1.5">{pub.publisher}</div>
                        {pub.authors && pub.authors.length > 0 && (
                          <div className="text-sm text-[#94A3B8] opacity-90 leading-relaxed">
                            {pub.authors.join(", ")}
                          </div>
                        )}
                      </div>

                      {pub.description && (
                        <p className="text-[#64748B] text-sm line-clamp-2 mb-4 group-hover:text-[#94A3B8] transition-colors">
                          {pub.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 border-t border-white/5">
                        {/* Keywords */}
                        <div className="flex flex-wrap gap-2">
                          {pub.keywords?.slice(0, 3).map((k, ki) => (
                            <span key={ki} className="text-[10px] text-[#64748B] uppercase tracking-wider">
                              #{k}
                            </span>
                          ))}
                        </div>

                        {/* Action Links */}
                        <div className="flex items-center gap-4">
                          {pub.doi && (
                            <a href={pub.doi} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-[#C8A558] hover:text-white transition-colors">
                              <ExternalLink size={14} /> DOI / Link
                            </a>
                          )}
                          {pub.pdfUrl && (
                            <a href={pub.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-[#C8A558] hover:text-white transition-colors">
                              <FileText size={14} /> PDF
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button onClick={() => goPage(safePage - 1)} disabled={safePage === 1} className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-[#94A3B8] hover:bg-white/5 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all">
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-1 px-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => goPage(n)} className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${safePage === n ? "bg-[#C8A558] text-[#0A0F1E]" : "text-[#64748B] hover:text-white hover:bg-white/5"}`}>
                  {n}
                </button>
              ))}
            </div>
            <button onClick={() => goPage(safePage + 1)} disabled={safePage === totalPages} className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-[#94A3B8] hover:bg-white/5 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}