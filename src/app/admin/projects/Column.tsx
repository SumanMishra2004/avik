'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, ArrowUpDown, GitFork, ExternalLink, ImageOff } from 'lucide-react';

export type Project = {
    id: string;
    title: string;
    description: string;
    tech_stack: string[];
    github_url?: string | null;
    live_url?: string | null;
    image_url?: string | null;
    created_at?: string;
};

/* ── Tech chip colours (deterministic by string hash) ─────── */
const CHIP_COLOURS = [
    'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'bg-violet-500/10 text-violet-400 border-violet-500/20',
    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'bg-rose-500/10 text-rose-400 border-rose-500/20',
    'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    'bg-orange-500/10 text-orange-400 border-orange-500/20',
];

function chipColour(s: string) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return CHIP_COLOURS[h % CHIP_COLOURS.length];
}

function TechChip({ label }: { label: string }) {
    return (
        <span
            className={`inline-block text-[10px] font-medium px-1.5 py-0.5 rounded border ${chipColour(label)}`}
        >
            {label}
        </span>
    );
}

export const getColumns = (
    onEdit: (project: Project) => void,
    onDelete: (id: string) => void,
): ColumnDef<Project>[] => [
        /* ── Cover thumbnail ── */
        {
            id: 'cover',
            header: () => null,
            cell: ({ row }) => {
                const src = row.original.image_url;
                return (
                    <div className="w-14 h-10 rounded-md overflow-hidden bg-zinc-800 border border-zinc-700/50 flex items-center justify-center shrink-0">
                        {src ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={src} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <ImageOff className="h-4 w-4 text-zinc-700" />
                        )}
                    </div>
                );
            },
        },

        /* ── Title + description ── */
        {
            accessorKey: 'title',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 -ml-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 font-semibold text-xs tracking-wider uppercase"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Project
                    <ArrowUpDown className="ml-1.5 h-3 w-3 opacity-50" />
                </Button>
            ),
            cell: ({ row }) => {
                const { title, description } = row.original;
                return (
                    <div className="max-w-[300px] space-y-0.5">
                        <p className="font-semibold text-zinc-100 text-sm leading-snug line-clamp-1">{title}</p>
                        {description && (
                            <p className="text-zinc-500 text-xs leading-snug line-clamp-2">{description}</p>
                        )}
                    </div>
                );
            },
        },

        /* ── Tech Stack chips ── */
        {
            accessorKey: 'tech_stack',
            header: () => (
                <span className="text-zinc-400 font-semibold text-xs tracking-wider uppercase">Stack</span>
            ),
            cell: ({ row }) => {
                const stack: string[] = row.original.tech_stack ?? [];
                return (
                    <div className="flex flex-wrap gap-1 max-w-[220px]">
                        {stack.slice(0, 4).map((t) => (
                            <TechChip key={t} label={t} />
                        ))}
                        {stack.length > 4 && (
                            <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-600">
                                +{stack.length - 4}
                            </span>
                        )}
                    </div>
                );
            },
        },

        /* ── Links ── */
        {
            id: 'links',
            header: () => (
                <span className="text-zinc-400 font-semibold text-xs tracking-wider uppercase">Links</span>
            ),
            cell: ({ row }) => {
                const { github_url, live_url } = row.original;
                return (
                    <div className="flex items-center gap-1.5">
                        {github_url ? (
                            <a
                                href={github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded hover:bg-zinc-800 text-zinc-500 hover:text-zinc-100 transition-colors"
                                title="GitHub"
                            >
                                <GitFork className="h-3.5 w-3.5" />
                            </a>
                        ) : null}
                        {live_url ? (
                            <a
                                href={live_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded hover:bg-zinc-800 text-zinc-500 hover:text-emerald-400 transition-colors"
                                title="Live site"
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                        ) : null}
                        {!github_url && !live_url && (
                            <span className="text-zinc-700 text-xs">—</span>
                        )}
                    </div>
                );
            },
        },

        /* ── Date added ── */
        {
            accessorKey: 'created_at',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 -ml-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 font-semibold text-xs tracking-wider uppercase"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Added
                    <ArrowUpDown className="ml-1.5 h-3 w-3 opacity-50" />
                </Button>
            ),
            cell: ({ row }) => {
                const raw = row.original.created_at;
                if (!raw) return <span className="text-zinc-700 text-xs">—</span>;
                const d = new Date(raw);
                return (
                    <span className="text-zinc-500 text-xs tabular-nums whitespace-nowrap">
                        {d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                );
            },
        },

        /* ── Actions ── */
        {
            id: 'actions',
            header: () => (
                <span className="text-zinc-400 font-semibold text-xs tracking-wider uppercase">Actions</span>
            ),
            cell: ({ row }) => {
                const project = row.original;
                return (
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(project)}
                            className="h-8 w-8 p-0 rounded-lg hover:bg-blue-500/10 hover:text-blue-400 text-zinc-500 transition-all"
                            title="Edit"
                        >
                            <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(project.id)}
                            className="h-8 w-8 p-0 rounded-lg hover:bg-red-500/10 hover:text-red-400 text-zinc-500 transition-all"
                            title="Delete"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                );
            },
        },
    ];