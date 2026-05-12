'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabase';
import {
  addPublication,
  getPublications,
  deletePublication,
  updatePublication,
} from './actions';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import {
  Loader2,
  Plus,
  BookOpen,
  FileText,
  GraduationCap,
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';

import { DataTable } from './Data-tables';
import { getColumns, Publication } from './Columns';

const PUBLICATION_TYPES = [
  'Journal',
  'Conference',
  'Workshop',
  'Book Chapter',
  'Preprint',
  'Technical Report',
  'Thesis',
];

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  publisher: z.string().min(1, 'Publisher is required'),
  year: z.string().min(4, 'Year is required'),
  type: z.string().min(1, 'Type is required'),
  authors: z.string().min(1, 'Authors are required'),
  keywords: z.string().min(1, 'Keywords are required'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(150, 'Description must be less than 150 characters'),
  doi: z.string().optional(),
  link: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  title: '',
  publisher: '',
  year: new Date().getFullYear().toString(),
  type: '',
  authors: '',
  keywords: '',
  description: '',
  doi: '',
  link: '',
};

/* ── Stat card ──────────────────────────────────────────────── */
type StatCardProps = {
  label: string;
  value: number | string;
  icon: React.ElementType;
  accent: string;
  bar: string;
};

function StatCard({ label, value, icon: Icon, accent, bar }: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 p-5 flex items-center gap-4 group hover:border-zinc-700 transition-all duration-200">
      {/* Accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${bar} rounded-l-xl`} />
      <div className={`p-2.5 rounded-lg ${accent} shrink-0`}>
        <Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-zinc-50 tabular-nums leading-none">{value}</p>
        <p className="text-xs text-zinc-500 mt-1 leading-snug">{label}</p>
      </div>
    </div>
  );
}

/* ── Form field wrapper ─────────────────────────────────────── */
const fieldCls =
  'bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-amber-500/30 focus-visible:border-amber-500/40 text-sm';

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function loadPublications() {
    const res = await getPublications();
    if (res?.data) setPublications(res.data as Publication[]);
  }

  useEffect(() => { loadPublications(); }, []);

  const stats = {
    total: publications.length,
    journals: publications.filter((p) => p.type?.toLowerCase() === 'journal').length,
    conferences: publications.filter((p) => p.type?.toLowerCase() === 'conference').length,
    latestYear:
      publications.length > 0
        ? Math.max(...publications.map((p) => p.year))
        : new Date().getFullYear(),
  };

  const handleEdit = (pub: Publication) => {
    setEditingId(pub.id);
    form.reset({
      title: pub.title || '',
      publisher: pub.publisher || '',
      year: pub.year?.toString() || new Date().getFullYear().toString(),
      type: pub.type || '',
      authors: pub.authors?.join(', ') || '',
      keywords: pub.keywords?.join(', ') || '',
      description: pub.description || '',
      doi: (pub as any).doi || '',
      link: pub.link || '',
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    startTransition(async () => {
      const res = await deletePublication(deleteId);
      if (res?.error) { toast.error(res.error); return; }
      toast.success('Publication deleted');
      setDeleteId(null);
      loadPublications();
    });
  };

  const columns = getColumns(handleEdit, (id) => setDeleteId(id));

  async function onSubmit(values: FormValues) {
    const inputId = editingId ? 'edit-pdf' : 'add-pdf';
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    const file = fileInput?.files?.[0];

    startTransition(async () => {
      let fileUrl = '';
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `publications/${fileName}`;
        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filePath, file, { cacheControl: '3600', upsert: false });
        if (uploadError) { toast.error(`Upload failed: ${uploadError.message}`); return; }
        const { data: publicUrlData } = supabase.storage.from('documents').getPublicUrl(filePath);
        fileUrl = publicUrlData.publicUrl;
      }
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => formData.append(key, value as string));
      if (fileUrl) formData.append('pdfUrl', fileUrl);
      const result = editingId
        ? await updatePublication(editingId, formData)
        : await addPublication(formData);
      if (result?.error) { toast.error(result.error); return; }
      toast.success(editingId ? 'Publication updated' : 'Publication added');
      setEditingId(null);
      setIsAddOpen(false);
      form.reset(defaultValues);
      loadPublications();
      if (fileInput) fileInput.value = '';
    });
  }

  /* ── Shared form ────────────────────────────────────────────── */
  const renderFormFields = (isEdit: boolean) => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

        {/* Title */}
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
              Title <span className="text-red-400 normal-case">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Publication title" className={fieldCls} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Publisher + Year row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <FormField control={form.control} name="publisher" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                  Publisher <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Conference / Journal name" className={fieldCls} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <FormField control={form.control} name="year" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                Year <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="2024" className={fieldCls} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        {/* Type */}
        <FormField control={form.control} name="type" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
              Type <span className="text-red-400">*</span>
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className={`${fieldCls} focus:ring-amber-500/30`}>
                  <SelectValue placeholder="Select type…" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                {PUBLICATION_TYPES.map((t) => (
                  <SelectItem key={t} value={t} className="focus:bg-zinc-800 focus:text-zinc-100">
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        {/* Authors */}
        <FormField control={form.control} name="authors" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
              Authors <span className="text-red-400">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Author One, Author Two, …" className={fieldCls} {...field} />
            </FormControl>
            <p className="text-[10px] text-zinc-600 mt-0.5">Comma-separated</p>
            <FormMessage />
          </FormItem>
        )} />

        {/* Keywords */}
        <FormField control={form.control} name="keywords" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
              Keywords <span className="text-red-400">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="machine learning, NLP, …" className={fieldCls} {...field} />
            </FormControl>
            <p className="text-[10px] text-zinc-600 mt-0.5">Comma-separated</p>
            <FormMessage />
          </FormItem>
        )} />

        {/* Description */}
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
              Abstract / Description <span className="text-red-400">*</span>
            </FormLabel>
            <FormControl>
              <Textarea
                rows={4}
                placeholder="Brief description (20–150 characters)…"
                className={`${fieldCls} resize-none`}
                {...field}
              />
            </FormControl>
            <div className="flex justify-between mt-0.5">
              <FormMessage />
              <span className={`text-[10px] ml-auto tabular-nums ${(field.value?.length ?? 0) > 140 ? 'text-red-400' : 'text-zinc-600'
                }`}>
                {field.value?.length ?? 0} / 150
              </span>
            </div>
          </FormItem>
        )} />

        {/* DOI + Link row */}
        <div className="grid grid-cols-2 gap-3">
          <FormField control={form.control} name="doi" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">DOI</FormLabel>
              <FormControl>
                <Input placeholder="10.xxxx/…" className={fieldCls} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="link" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">External Link</FormLabel>
              <FormControl>
                <Input placeholder="https://…" className={fieldCls} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        {/* PDF Upload */}
        <div className="space-y-1.5">
          <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block">PDF Upload</label>
          <Input
            id={isEdit ? 'edit-pdf' : 'add-pdf'}
            type="file"
            accept="application/pdf"
            className={`${fieldCls} cursor-pointer file:text-zinc-300 file:bg-zinc-800 file:border-0 file:rounded-md file:px-3 file:py-1 file:text-xs file:mr-3`}
          />
        </div>

        <Separator className="bg-zinc-800" />

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-1">
          <Button
            type="button"
            variant="outline"
            className="border-zinc-700 bg-transparent text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 text-sm"
            onClick={() => {
              setEditingId(null);
              setIsAddOpen(false);
              form.reset(defaultValues);
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={isPending}
            className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm px-5"
          >
            {isPending && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
            {isEdit ? 'Save Changes' : 'Add Publication'}
          </Button>
        </div>
      </form>
    </Form>
  );

  /* ── Page ───────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      {/* ── Top bar ── */}
      <div className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10 px-6 md:px-10 py-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-50">Publications</h1>
          <p className="text-zinc-500 text-xs mt-0.5 hidden sm:block">Research portfolio management</p>
        </div>
        <Button
          onClick={() => { form.reset(defaultValues); setIsAddOpen(true); }}
          className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold gap-1.5 text-sm h-9 px-4"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Publication
        </Button>
      </div>

      <div className="px-6 md:px-10 py-8 space-y-8 max-w-screen-2xl mx-auto">

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Total Publications" value={stats.total} icon={BookOpen} accent="text-amber-400 bg-amber-500/10" bar="bg-amber-500" />
          <StatCard label="Journals" value={stats.journals} icon={FileText} accent="text-blue-400 bg-blue-500/10" bar="bg-blue-500" />
          <StatCard label="Conferences" value={stats.conferences} icon={GraduationCap} accent="text-emerald-400 bg-emerald-500/10" bar="bg-emerald-500" />
          <StatCard label="Latest Year" value={stats.latestYear} icon={TrendingUp} accent="text-purple-400 bg-purple-500/10" bar="bg-purple-500" />
        </div>

        {/* ── Table card ── */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
          {/* Card header */}
          <div className="px-6 py-5 flex items-center justify-between border-b border-zinc-800/80">
            <div>
              <h2 className="text-sm font-semibold text-zinc-100">All Publications</h2>
              <p className="text-xs text-zinc-600 mt-0.5">Browse, search, and manage your research output</p>
            </div>
            <span className="text-xs font-mono bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-md">
              {publications.length} total
            </span>
          </div>
          <div className="p-6">
            <DataTable columns={columns} data={publications} />
          </div>
        </div>
      </div>

      {/* ── Add Sheet ── */}
      <Sheet
        open={isAddOpen}
        onOpenChange={(open) => { if (!open) { setIsAddOpen(false); form.reset(defaultValues); } }}
      >
        <SheetContent className="w-full sm:max-w-[560px] bg-zinc-950 border-zinc-800/80 text-zinc-100 overflow-y-auto p-6">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-zinc-50 text-lg font-bold">New Publication</SheetTitle>
            <SheetDescription className="text-zinc-500 text-sm">
              Fill in the details below to add to your portfolio.
            </SheetDescription>
          </SheetHeader>
          {renderFormFields(false)}
        </SheetContent>
      </Sheet>

      {/* ── Edit Dialog ── */}
      <Dialog
        open={!!editingId}
        onOpenChange={(open) => { if (!open) { setEditingId(null); form.reset(defaultValues); } }}
      >
        <DialogContent className="sm:max-w-[620px] bg-zinc-950 border-zinc-800 text-zinc-100 max-h-[90vh] overflow-y-auto p-6">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-zinc-50 text-lg font-bold">Edit Publication</DialogTitle>
          </DialogHeader>
          {renderFormFields(true)}
        </DialogContent>
      </Dialog>

      {/* ── Delete Alert ── */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => { if (!open) setDeleteId(null); }}
      >
        <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-zinc-50">Delete this publication?</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400 text-sm leading-relaxed">
              This is permanent and cannot be undone. The publication will be removed from your portfolio immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-zinc-700 bg-transparent text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isPending}
              className="bg-red-600 hover:bg-red-500 text-white font-semibold"
            >
              {isPending && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}