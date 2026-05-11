'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

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
    pdf_url?: string;
};

export const getColumns = (
    onEdit: (pub: Publication) => void,
    onDelete: (id: string) => void
): ColumnDef<Publication>[] => [
    {
        accessorKey: 'title',
        header: 'Title',
    },
    {
        accessorKey: 'publisher',
        header: 'Publisher',
    },
    {
        accessorKey: 'year',
        header: 'Year',
    },
    {
        accessorKey: 'type',
        header: 'Type',
    },
    {
        accessorKey: 'authors',
        header: 'Authors',
        cell: ({ row }) => {
            return row.original.authors.join(', ');
        },
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const pub = row.original;
            return (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(pub)} className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4 text-blue-500" />
                        <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(pub.id)} className="h-8 w-8 p-0">
                        <Trash2 className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
            );
        },
    },
];