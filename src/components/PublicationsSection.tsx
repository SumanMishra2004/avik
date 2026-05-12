"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FileText, Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { publicationsStats } from "@/lib/data";
import { supabase } from "@/lib/supabase";

// ─── Types ────────────────────────────────────────────────────────────────────
type SortKey = "newest" | "oldest" | "az";
type TabKey = "All" | "Journal" | "Conference" | "Patent" | "Preprint";

const TABS: TabKey[] = ["All", "Journal", "Conference", "Patent", "Preprint"];
const PER_PAGE = 6;

// ─── Badge styles ─────────────────────────────────────────────────────────────
const BADGE: Record<string, string> = {
  Journal: "bg-[#C8A558]/15 text-[#C8A558]    border border-[#C8A558]/30",
  Conference: "bg-[#63B3ED]/10 text-[#63B3ED]    border border-[#63B3ED]/25",
  Patent: "bg-[#68D391]/10 text-[#68D391]    border border-[#68D391]/25",
  Preprint: "bg-[#B794F4]/10 text-[#B794F4]    border border-[#B794F4]/25",
};

// ─── Bento grid explicit placements (3-col, for ≥ 3 cards) ───────────────────
const BENTO: Record<number, string> = {
  0: "lg:col-span-2 lg:row-span-2",
  1: "lg:col-span-1",
  2: "lg:col-span-1",
  3: "lg:col-span-1",
  4: "lg:col-span-2",
  5: "lg:col-span-3",
};

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { label: "Total", value: publicationsStats.total, sub: "Publications" },
  { label: "Patents", value: publicationsStats.patents, sub: `${publicationsStats.patentsGranted} Granted · ${publicationsStats.patentsFiled} Filed` },
  { label: "Journals", value: publicationsStats.journals, sub: `${publicationsStats.ieeeTransactions} IEEE Transactions` },
  { label: "Conferences", value: publicationsStats.conferences, sub: `${publicationsStats.bookChapters} Book Chapters` },
];

// ─── Component ────────────────────────────────────────────────────────────────
type PubItem = {
  id: string;
  type: string;
  year: string;
  title: string;
  publisher: string;
  description: string;
  keywords: string[];
  doi: string;
  pdfLink: string;
};

export default function PublicationsSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("newest");
  const [page, setPage] = useState(1);
  const [dbPublications, setDbPublications] = useState<PubItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchPubs() {
      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (!error && data) {
        // Map Supabase columns to component props
        const mapped = data.map(p => ({
          id: p.id,
          type: p.type || "Conference",
          year: String(p.year),
          title: p.title || "",
          publisher: p.publisher || "",
          description: p.description || p.authors?.join(', ') || "",
          keywords: p.keywords || [],
          doi: p.doi || p.link || "",
          pdfLink: p.pdf_url || ""
        }));
        setDbPublications(mapped);
      }
      setIsLoading(false);
    }
    fetchPubs();
  }, []);

  // Filter + sort
  const filtered = useMemo(() => {
    let r = dbPublications.slice();
    if (activeTab !== "All") r = r.filter((p) => p.type === activeTab);
    if (search) {
      const q = search.toLowerCase();
      r = r.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.publisher.toLowerCase().includes(q)
      );
    }
    if (sortBy === "newest") r.sort((a, b) => b.year.localeCompare(a.year));
    else if (sortBy === "oldest") r.sort((a, b) => a.year.localeCompare(b.year));
    else r.sort((a, b) => a.title.localeCompare(b.title));
    return r;
  }, [dbPublications, activeTab, search, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  function goPage(n: number) {
    setPage(n);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function changeTab(t: TabKey) {
    setActiveTab(t);
    setPage(1);
  }

  return (
    <section id="publications" className="py-12 relative">
      {/* Background vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0F1E]/60 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#C8A558]" />
            <span className="text-[#C8A558] text-[11px] font-mono tracking-[.18em] uppercase">
              Academic Output
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#C8A558]" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Publications &amp;{" "}
            <span className="text-[#C8A558]">Patents</span>
          </h2>
          <p className="text-[#64748B] text-[15px] mt-4 max-w-xl mx-auto">
            60+ publications across journals, conferences, and book chapters.
          </p>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className="rounded-2xl border border-white/[.07] bg-white/[.04] p-4 text-center hover:border-[#C8A558]/25 transition-colors duration-200"
            >
              <div className="font-display text-3xl font-extrabold text-white">{s.value}</div>
              <div className="text-[#94A3B8] text-[11px] font-semibold mt-1">{s.label}</div>
              <div className="text-[#475569] text-[10px] font-mono mt-1">{s.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Toolbar: tabs + search + sort ── */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {/* Tabs */}
          <div className="flex bg-white/[.04] border border-white/[.07] rounded-xl p-1 gap-1 flex-shrink-0">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => changeTab(t)}
                className={`font-mono text-[11px] tracking-wide px-3 py-1.5 rounded-[9px] transition-all duration-150 ${activeTab === t
                    ? "bg-[#C8A558]/18 text-[#C8A558] border border-[#C8A558]/35"
                    : "text-[#64748B] hover:text-[#94A3B8]"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 min-w-[180px]">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569] pointer-events-none"
            />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search title, keyword…"
              className="w-full bg-white/[.04] border border-white/[.08] rounded-xl pl-8 pr-3 py-2 text-[13px] text-[#E2E8F0] placeholder-[#475569] outline-none focus:border-[#C8A558]/40 transition-colors duration-150"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="bg-white/[.04] border border-white/[.08] rounded-xl px-3 py-2 text-[12px] font-mono text-[#94A3B8] outline-none cursor-pointer"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="az">Title A–Z</option>
          </select>
        </div>

        {/* Count line */}
        <p className="text-right text-[11px] font-mono text-[#475569] mb-3">
          {filtered.length > 0
            ? `Showing ${(safePage - 1) * PER_PAGE + 1}–${Math.min(safePage * PER_PAGE, filtered.length)} of ${filtered.length}`
            : "No results"}
        </p>

        <div ref={gridRef}>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-20 text-[#C8A558]"
              >
                <Loader2 className="w-8 h-8 animate-spin" />
              </motion.div>
            ) : paged.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 text-[#475569] font-mono text-sm"
              >
                No publications match your search.
              </motion.div>
            ) : (
              <motion.div
                key={`${activeTab}-${search}-${sortBy}-${safePage}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`grid grid-cols-1 ${paged.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"} gap-3 auto-rows-auto`}
              >
                {paged.map((pub, i) => {
                  const isFeatured = i === 0 && paged.length >= 3;
                  const showDesc = isFeatured || paged.length <= 2;
                  const bentoClass = paged.length >= 3 ? (BENTO[i] ?? "") : "";

                  return (
                    <motion.div
                      key={pub.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ y: -2 }}
                      className={`group rounded-2xl border bg-white/[.04] p-5 flex flex-col gap-3 transition-all duration-200
                        ${bentoClass}
                        ${isFeatured
                          ? "border-[#C8A558]/18 bg-[#C8A558]/[.04] hover:border-[#C8A558]/35"
                          : "border-white/[.07] hover:border-[#C8A558]/22"}`}
                    >
                      {/* Top row */}
                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full ${BADGE[pub.type] ?? BADGE.Conference}`}>
                          {pub.type}
                        </span>
                        <span className="font-mono text-[11px] text-[#475569]">{pub.year}</span>
                      </div>

                      {/* Title */}
                      <h4 className={`font-semibold leading-snug text-[#E2E8F0] ${isFeatured ? "text-[15px]" : "text-[13px]"}`}>
                        {pub.title}
                      </h4>

                      {/* Publisher */}
                      <p className="text-[11px] font-medium text-[#C8A558]">{pub.publisher}</p>

                      {/* Description (featured or single-col) */}
                      {showDesc && pub.description && (
                        <p className="text-[11px] text-[#64748B] leading-relaxed">{pub.description}</p>
                      )}

                      {/* Keywords */}
                      {pub.keywords && pub.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {pub.keywords.map((k, ki) => (
                            <span
                              key={ki}
                              className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/[.04] border border-white/[.08] text-[#94A3B8]"
                            >
                              {k}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Links */}
                      <div className="flex items-center gap-4 mt-auto pt-3 border-t border-white/[.06]">
                        {pub.doi ? (
                          <a
                            href={pub.doi}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[11px] text-[#C8A558] hover:text-[#E2C07A] transition-colors"
                          >
                            <ExternalLink size={11} />
                            View Paper
                          </a>
                        ) : (
                          <span className="text-[11px] text-[#334155]">No link available</span>
                        )}
                        {pub.pdfLink && (
                          <a
                            href={pub.pdfLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[11px] text-[#C8A558] hover:text-[#E2C07A] transition-colors"
                          >
                            <FileText size={11} />
                            PDF
                          </a>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => goPage(safePage - 1)}
              disabled={safePage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/[.08] bg-white/[.04] text-[#94A3B8] hover:border-[#C8A558]/35 hover:text-[#C8A558] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => goPage(n)}
                className={`font-mono text-[11px] px-3 h-8 rounded-lg border transition-all duration-150 ${safePage === n
                    ? "bg-[#C8A558]/15 border-[#C8A558]/35 text-[#C8A558]"
                    : "border-transparent text-[#64748B] hover:text-[#94A3B8]"
                  }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => goPage(safePage + 1)}
              disabled={safePage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/[.08] bg-white/[.04] text-[#94A3B8] hover:border-[#C8A558]/35 hover:text-[#C8A558] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}

        {/* ── ORCID CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-10"
        >
          <a
            href="https://orcid.org/0000-0001-8824-703X"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-[#C8A558]/40 text-[#C8A558] font-display font-bold text-[14px] tracking-wide hover:bg-[#C8A558]/10 hover:border-[#C8A558]/70 transition-all duration-200"
          >
            <ExternalLink size={15} />
            View All Publications on ORCID
          </a>
          <p className="text-[#475569] text-[11px] font-mono mt-2">
            ORCID: 0000-0001-8824-703X
          </p>
        </motion.div>
      </div>
    </section>
  );
}