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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
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

  useEffect(() => {
    loadPublications();
  }, []);

  /* ── Stats ──────────────────────────────────────────────── */
  const stats = {
    total: publications.length,
    journals: publications.filter(
      (p) => p.type?.toLowerCase() === 'journal'
    ).length,
    conferences: publications.filter(
      (p) => p.type?.toLowerCase() === 'conference'
    ).length,
    latestYear:
      publications.length > 0
        ? Math.max(...publications.map((p) => p.year))
        : new Date().getFullYear(),
  };

  /* ── Handlers ───────────────────────────────────────────── */
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
      if (res?.error) {
        toast.error(res.error);
        return;
      }
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
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(7)}.${fileExt}`;
        const filePath = `publications/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filePath, file, { cacheControl: '3600', upsert: false });

        if (uploadError) {
          toast.error(`Upload failed: ${uploadError.message}`);
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from('documents')
          .getPublicUrl(filePath);

        fileUrl = publicUrlData.publicUrl;
      }

      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) =>
        formData.append(key, value as string)
      );
      if (fileUrl) formData.append('pdfUrl', fileUrl);

      const result = editingId
        ? await updatePublication(editingId, formData)
        : await addPublication(formData);

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success(editingId ? 'Publication updated' : 'Publication added');
      setEditingId(null);
      setIsAddOpen(false);
      form.reset(defaultValues);
      loadPublications();
      if (fileInput) fileInput.value = '';
    });
  }

  /* ── Shared form body ───────────────────────────────────── */
  const renderFormFields = (isEdit: boolean) => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 px-2">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-300">
                Title <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Publication title"
                  className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-amber-500/40"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Publisher + Type */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="publisher"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-300">
                  Publisher <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="IEEE, ACM, Springer…"
                    className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-amber-500/40"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-300">
                  Type <span className="text-red-400">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-zinc-900 border-zinc-700 text-zinc-100 focus:ring-amber-500/40">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                    {PUBLICATION_TYPES.map((t) => (
                      <SelectItem
                        key={t}
                        value={t}
                        className="focus:bg-zinc-800 focus:text-zinc-100"
                      >
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Year + DOI */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-300">
                  Year <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1900"
                    max="2099"
                    className="bg-zinc-900 border-zinc-700 text-zinc-100 focus-visible:ring-amber-500/40"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="doi"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-300">DOI</FormLabel>
                <FormControl>
                  <Input
                    placeholder="10.1000/xyz123"
                    className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-amber-500/40"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Authors */}
        <FormField
          control={form.control}
          name="authors"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-300">
                Authors <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe, Jane Smith, …"
                  className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-amber-500/40"
                  {...field}
                />
              </FormControl>
              <p className="text-[11px] text-zinc-600">Comma-separated</p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Keywords */}
        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-300">
                Keywords <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="AI, Machine Learning, NLP"
                  className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-amber-500/40"
                  {...field}
                />
              </FormControl>
              <p className="text-[11px] text-zinc-600">Comma-separated</p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-300">
                Description <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Brief abstract or description (20–150 chars)…"
                  className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-amber-500/40 resize-none"
                  {...field}
                />
              </FormControl>
              <p className="text-[11px] text-zinc-600">
                {field.value?.length ?? 0} / 150
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* External link */}
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-300">External Link</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://…"
                  className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-amber-500/40"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PDF upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">
            PDF Upload
          </label>
          <Input
            id={isEdit ? 'edit-pdf' : 'add-pdf'}
            type="file"
            accept="application/pdf"
            className="bg-zinc-900 border-zinc-700 text-zinc-400 file:text-zinc-300 file:bg-zinc-800 file:border-0 file:rounded file:px-3 file:py-1 cursor-pointer"
          />
        </div>

        <Separator className="bg-zinc-800" />

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-1">
          <Button
            type="button"
            variant="outline"
            className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
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
            className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEdit ? 'Save Changes' : 'Add Publication'}
          </Button>
        </div>
      </form>
    </Form>
  );

  /* ── Page layout ────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-10 space-y-8">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
            Publications
          </h1>
          <p className="text-zinc-500 mt-1 text-sm">
            Manage your research publications portfolio
          </p>
        </div>
        <Button
          onClick={() => {
            form.reset(defaultValues);
            setIsAddOpen(true);
          }}
          className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold gap-2 shrink-0"
        >
          <Plus className="h-4 w-4" />
          Add Publication
        </Button>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Publications',
            value: stats.total,
            icon: BookOpen,
            accent: 'text-amber-400 bg-amber-500/10',
          },
          {
            label: 'Journals',
            value: stats.journals,
            icon: FileText,
            accent: 'text-blue-400 bg-blue-500/10',
          },
          {
            label: 'Conferences',
            value: stats.conferences,
            icon: GraduationCap,
            accent: 'text-emerald-400 bg-emerald-500/10',
          },
          {
            label: 'Latest Year',
            value: stats.latestYear,
            icon: TrendingUp,
            accent: 'text-purple-400 bg-purple-500/10',
          },
        ].map(({ label, value, icon: Icon, accent }) => (
          <Card
            key={label}
            className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`p-2.5 rounded-lg ${accent}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-zinc-50 tabular-nums">
                  {value}
                </p>
                <p className="text-xs text-zinc-500">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Publications Table ── */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-zinc-50 text-lg">
            All Publications
          </CardTitle>
          <CardDescription className="text-zinc-500">
            Browse, search, sort, and manage your entire publication list
          </CardDescription>
        </CardHeader>
        <Separator className="bg-zinc-800" />
        <CardContent className="pt-6">
          <DataTable columns={columns} data={publications} />
        </CardContent>
      </Card>

      {/* ── Add Sheet ── */}
      <Sheet
        open={isAddOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddOpen(false);
            form.reset(defaultValues);
          }
        }}
      >
        <SheetContent className="w-full sm:max-w-[580px] bg-zinc-950 border-zinc-800 text-zinc-100 overflow-y-auto">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-zinc-50 text-xl font-bold">
              New Publication
            </SheetTitle>
            <SheetDescription className="text-zinc-500">
              Add a research publication to your portfolio.
            </SheetDescription>
          </SheetHeader>
          <Separator className="bg-zinc-800 mb-6" />
          {renderFormFields(false)}
        </SheetContent>
      </Sheet>

      {/* ── Edit Dialog ── */}
      <Dialog
        open={!!editingId}
        onOpenChange={(open) => {
          if (!open) {
            setEditingId(null);
            form.reset(defaultValues);
          }
        }}
      >
        <DialogContent className="sm:max-w-[660px] bg-zinc-950 border-zinc-800 text-zinc-100 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-zinc-50 text-xl font-bold">
              Edit Publication
            </DialogTitle>
          </DialogHeader>
          <Separator className="bg-zinc-800" />
          <div className="pt-2">{renderFormFields(true)}</div>
        </DialogContent>
      </Dialog>

      {/* ── Delete Alert ── */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
      >
        <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-zinc-50">
              Delete this publication?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              This action is permanent and cannot be undone. The publication
              will be removed from your portfolio immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isPending}
              className="bg-red-600 hover:bg-red-500 text-white"
            >
              {isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete Publication
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}