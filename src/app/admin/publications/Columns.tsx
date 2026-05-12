'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, ArrowUpDown, ExternalLink, FileText } from 'lucide-react';

export type Publication = {
    id: string;
    title: string;
    publisher: string;
    year: number;
    type: string;
    authors: string[];
    keywords: string[];
    description?: string;
    link?: string;
    doi?: string;
    pdf_url?: string;
};

const TYPE_STYLES: Record<string, string> = {
    journal: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    conference: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    workshop: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    'book chapter': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    preprint: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    'technical report': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    thesis: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
};

function TypeBadge({ type }: { type: string }) {
    const cls = TYPE_STYLES[type?.toLowerCase()] ?? 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    return (
        <Badge
            variant="outline"
            className={`text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 border ${cls}`}
        >
            {type}
        </Badge>
    );
}

export const getColumns = (
    onEdit: (pub: Publication) => void,
    onDelete: (id: string) => void
): ColumnDef<Publication>[] => [
        {
            accessorKey: 'title',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 -ml-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 font-semibold text-xs tracking-wider uppercase"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Title
                    <ArrowUpDown className="ml-1.5 h-3 w-3 opacity-50" />
                </Button>
            ),
            cell: ({ row }) => {
                const pub = row.original;
                return (
                    <div className="max-w-[340px] space-y-1">
                        <p className="font-semibold text-zinc-100 leading-snug line-clamp-2 text-sm">
                            {pub.title}
                        </p>
                        {pub.keywords?.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {pub.keywords.slice(0, 3).map((kw) => (
                                    <span
                                        key={kw}
                                        className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 border border-zinc-700/60"
                                    >
                                        {kw}
                                    </span>
                                ))}
                                {pub.keywords.length > 3 && (
                                    <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-600">
                                        +{pub.keywords.length - 3}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                );
            },
        },
        {
            accessorKey: 'publisher',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 -ml-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 font-semibold text-xs tracking-wider uppercase"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Publisher
                    <ArrowUpDown className="ml-1.5 h-3 w-3 opacity-50" />
                </Button>
            ),
            cell: ({ row }) => (
                <span className="text-zinc-300 text-sm max-w-[180px] line-clamp-2 block">
                    {row.original.publisher}
                </span>
            ),
        },
        {
            accessorKey: 'year',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 -ml-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 font-semibold text-xs tracking-wider uppercase"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Year
                    <ArrowUpDown className="ml-1.5 h-3 w-3 opacity-50" />
                </Button>
            ),
            cell: ({ row }) => (
                <span className="text-zinc-300 font-mono text-sm tabular-nums">
                    {row.original.year}
                </span>
            ),
        },
        {
            accessorKey: 'type',
            header: () => (
                <span className="text-zinc-400 font-semibold text-xs tracking-wider uppercase">Type</span>
            ),
            cell: ({ row }) => <TypeBadge type={row.original.type} />,
            filterFn: (row, _id, value) =>
                value === 'all' || row.original.type?.toLowerCase() === value?.toLowerCase(),
        },
        {
            accessorKey: 'authors',
            header: () => (
                <span className="text-zinc-400 font-semibold text-xs tracking-wider uppercase">Authors</span>
            ),
            cell: ({ row }) => {
                const authors = row.original.authors ?? [];
                return (
                    <div className="flex flex-col gap-0.5 max-w-[180px]">
                        {authors.slice(0, 2).map((a) => (
                            <span key={a} className="text-zinc-400 text-xs leading-snug truncate">
                                {a}
                            </span>
                        ))}
                        {authors.length > 2 && (
                            <span className="text-zinc-600 text-xs">+{authors.length - 2} more</span>
                        )}
                    </div>
                );
            },
        },
        {
            id: 'links',
            header: () => (
                <span className="text-zinc-400 font-semibold text-xs tracking-wider uppercase">Links</span>
            ),
            cell: ({ row }) => {
                const pub = row.original;
                return (
                    <div className="flex items-center gap-1.5">
                        {pub.link && (
                            <a
                                href={pub.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded hover:bg-zinc-800 text-zinc-500 hover:text-blue-400 transition-colors"
                                title="External link"
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                        )}
                        {pub.pdf_url && (
                            <a
                                href={pub.pdf_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded hover:bg-zinc-800 text-zinc-500 hover:text-amber-400 transition-colors"
                                title="PDF"
                            >
                                <FileText className="h-3.5 w-3.5" />
                            </a>
                        )}
                        {!pub.link && !pub.pdf_url && (
                            <span className="text-zinc-700 text-xs">—</span>
                        )}
                    </div>
                );
            },
        },
        {
            id: 'actions',
            header: () => (
                <span className="text-zinc-400 font-semibold text-xs tracking-wider uppercase">Actions</span>
            ),
            cell: ({ row }) => {
                const pub = row.original;
                return (
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(pub)}
                            className="h-8 w-8 p-0 rounded-lg hover:bg-blue-500/10 hover:text-blue-400 text-zinc-500 transition-all"
                            title="Edit"
                        >
                            <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(pub.id)}
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