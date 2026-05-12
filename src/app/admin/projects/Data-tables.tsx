'use client';

import { useState } from 'react';
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
} from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Search,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { globalFilter, sorting },
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        initialState: { pagination: { pageSize: 8 } },
    });

    const { pageIndex, pageSize } = table.getState().pagination;
    const totalRows = table.getFilteredRowModel().rows.length;
    const from = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
    const to = Math.min((pageIndex + 1) * pageSize, totalRows);

    return (
        <div className="space-y-4">
            {/* ── Toolbar ── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="relative flex-1 min-w-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
                    <Input
                        placeholder="Search projects…"
                        value={globalFilter ?? ''}
                        onChange={(e) => setGlobalFilter(String(e.target.value))}
                        className="pl-9 h-9 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600
                       focus-visible:ring-amber-500/30 focus-visible:border-amber-500/40 text-sm w-full sm:max-w-xs"
                    />
                </div>
                <span className="text-xs text-zinc-600 whitespace-nowrap ml-auto sm:ml-0">
                    {totalRows} result{totalRows !== 1 ? 's' : ''}
                </span>
            </div>

            {/* ── Table ── */}
            <div className="rounded-xl border border-zinc-800 overflow-hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="border-zinc-800 bg-zinc-900/80 hover:bg-zinc-900/80"
                            >
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="h-10 px-4 text-zinc-500">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, i) => (
                                <TableRow
                                    key={row.id}
                                    className={`
                    border-zinc-800/60 transition-colors duration-100
                    hover:bg-amber-500/[0.04]
                    ${i % 2 === 0 ? 'bg-zinc-950' : 'bg-zinc-900/30'}
                  `}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="px-4 py-3.5 align-top">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={columns.length} className="h-36 text-center">
                                    <div className="flex flex-col items-center gap-2 text-zinc-600">
                                        <Search className="h-8 w-8 opacity-30" />
                                        <p className="text-sm">No projects found.</p>
                                        {globalFilter && (
                                            <button
                                                onClick={() => setGlobalFilter('')}
                                                className="text-xs text-amber-500/70 hover:text-amber-400 underline underline-offset-2"
                                            >
                                                Clear search
                                            </button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* ── Pagination ── */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-zinc-600 order-2 sm:order-1">
                    {totalRows > 0 ? (
                        <>
                            Showing <span className="text-zinc-400">{from}–{to}</span> of{' '}
                            <span className="text-zinc-400">{totalRows}</span>
                        </>
                    ) : 'No results'}
                </p>

                <div className="flex items-center gap-1 order-1 sm:order-2">
                    <Button
                        variant="ghost" size="sm"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        className="h-8 w-8 p-0 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 disabled:opacity-25"
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost" size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="h-8 w-8 p-0 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 disabled:opacity-25"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-1 mx-1">
                        {Array.from({ length: table.getPageCount() }, (_, i) => i)
                            .filter((i) => {
                                const cur = table.getState().pagination.pageIndex;
                                return i === 0 || i === table.getPageCount() - 1 || Math.abs(i - cur) <= 1;
                            })
                            .reduce<(number | 'ellipsis')[]>((acc, page, idx, arr) => {
                                if (idx > 0 && (page as number) - (arr[idx - 1] as number) > 1)
                                    acc.push('ellipsis');
                                acc.push(page);
                                return acc;
                            }, [])
                            .map((item, idx) =>
                                item === 'ellipsis' ? (
                                    <span key={`e-${idx}`} className="text-zinc-700 text-xs px-1">…</span>
                                ) : (
                                    <Button
                                        key={item}
                                        variant="ghost" size="sm"
                                        onClick={() => table.setPageIndex(item as number)}
                                        className={`h-8 w-8 p-0 text-xs font-medium transition-all ${table.getState().pagination.pageIndex === item
                                                ? 'bg-amber-500 text-zinc-950 hover:bg-amber-400 font-bold'
                                                : 'text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800'
                                            }`}
                                    >
                                        {(item as number) + 1}
                                    </Button>
                                ),
                            )}
                    </div>

                    <Button
                        variant="ghost" size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="h-8 w-8 p-0 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 disabled:opacity-25"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost" size="sm"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                        className="h-8 w-8 p-0 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 disabled:opacity-25"
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>

                <Select
                    value={String(pageSize)}
                    onValueChange={(v) => table.setPageSize(Number(v))}
                >
                    <SelectTrigger className="h-8 w-28 bg-zinc-900 border-zinc-800 text-zinc-400 text-xs order-3 focus:ring-amber-500/30">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-300">
                        {[5, 8, 10, 20].map((n) => (
                            <SelectItem key={n} value={String(n)} className="text-xs focus:bg-zinc-800">
                                {n} / page
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}