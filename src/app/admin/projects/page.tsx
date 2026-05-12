'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabase';
import {
  addProject,
  getProjects,
  deleteProject,
  updateProject,
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
  FolderGit2,
  GitForkIcon,
  Globe,
  ImageIcon,
} from 'lucide-react';
import { toast } from 'sonner';

import { DataTable } from './Data-tables';
import { getColumns, Project } from './Column';

/* ── Form schema ────────────────────────────────────────────── */
const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  techStack: z.string().min(1, 'Provide at least one technology'),
  githubUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  liveUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  title: '',
  description: '',
  techStack: '',
  githubUrl: '',
  liveUrl: '',
};

/* ── Shared field class ─────────────────────────────────────── */
const fieldCls =
  'bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-amber-500/30 focus-visible:border-amber-500/40 text-sm';

/* ── Stat card ──────────────────────────────────────────────── */
function StatCard({
  label,
  value,
  icon: Icon,
  accent,
  bar,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  accent: string;
  bar: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 p-5 flex items-center gap-4 hover:border-zinc-700 transition-all duration-200">
      <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${bar} rounded-l-xl`} />
      <div className={`p-2.5 rounded-lg ${accent} shrink-0`}>
        <Icon className="h-[18px] w-[18px]" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-zinc-50 tabular-nums leading-none">{value}</p>
        <p className="text-xs text-zinc-500 mt-1 leading-snug">{label}</p>
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  /* ── Data loading ── */
  async function loadProjects() {
    const res = await getProjects();
    if (res?.data) setProjects(res.data as Project[]);
  }

  useEffect(() => { loadProjects(); }, []);

  /* ── Stats ── */
  const stats = {
    total: projects.length,
    withGithub: projects.filter((p) => !!p.github_url).length,
    withLive: projects.filter((p) => !!p.live_url).length,
    withImage: projects.filter((p) => !!p.image_url).length,
  };

  /* ── Edit handler ── */
  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    form.reset({
      title: project.title || '',
      description: project.description || '',
      techStack: (project.tech_stack ?? []).join(', '),
      githubUrl: project.github_url || '',
      liveUrl: project.live_url || '',
    });
  };

  /* ── Delete ── */
  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    startTransition(async () => {
      const res = await deleteProject(deleteId);
      if (res?.error) { toast.error(res.error); return; }
      toast.success('Project deleted');
      setDeleteId(null);
      loadProjects();
    });
  };

  const columns = getColumns(handleEdit, (id) => setDeleteId(id));

  /* ── Submit (add / update) ── */
  async function onSubmit(values: FormValues) {
    const inputId = editingId ? 'edit-image' : 'add-image';
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    const file = fileInput?.files?.[0];

    startTransition(async () => {
      const formData = new FormData();
      Object.entries(values).forEach(([k, v]) => formData.append(k, v as string));
      if (file) formData.append('file', file);

      const result = editingId
        ? await updateProject(editingId, formData)
        : await addProject(formData);

      if (result?.error) { toast.error(result.error); return; }

      toast.success(editingId ? 'Project updated' : 'Project added');
      setEditingId(null);
      setIsAddOpen(false);
      form.reset(defaultValues);
      loadProjects();
      if (fileInput) fileInput.value = '';
    });
  }

  /* ── Shared form fields ── */
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
              <Input placeholder="e.g. Next.js Portfolio" className={fieldCls} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Description */}
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
              Description <span className="text-red-400">*</span>
            </FormLabel>
            <FormControl>
              <Textarea
                rows={4}
                placeholder="Describe the project…"
                className={`${fieldCls} resize-none`}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Tech stack */}
        <FormField control={form.control} name="techStack" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
              Tech Stack <span className="text-red-400">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="React, Next.js, Tailwind CSS, …" className={fieldCls} {...field} />
            </FormControl>
            <p className="text-[10px] text-zinc-600 mt-0.5">Comma-separated</p>
            <FormMessage />
          </FormItem>
        )} />

        {/* GitHub + Live URL */}
        <div className="grid grid-cols-2 gap-3">
          <FormField control={form.control} name="githubUrl" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <GitForkIcon className="h-3 w-3" /> GitHub
              </FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/…" className={fieldCls} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="liveUrl" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="h-3 w-3" /> Live URL
              </FormLabel>
              <FormControl>
                <Input placeholder="https://…" className={fieldCls} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        {/* Cover image */}
        <div className="space-y-1.5">
          <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <ImageIcon className="h-3 w-3" /> Cover Image
          </label>
          <Input
            id={isEdit ? 'edit-image' : 'add-image'}
            type="file"
            accept="image/*"
            className={`${fieldCls} cursor-pointer file:text-zinc-300 file:bg-zinc-800 file:border-0 file:rounded-md file:px-3 file:py-1 file:text-xs file:mr-3`}
          />
          <p className="text-[10px] text-zinc-600">Max 5 MB · Image formats only</p>
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
            {isEdit ? 'Save Changes' : 'Add Project'}
          </Button>
        </div>
      </form>
    </Form>
  );

  /* ── Render ── */
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      {/* ── Sticky top bar ── */}
      <div className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10 px-6 md:px-10 py-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-50">Projects</h1>
          <p className="text-zinc-500 text-xs mt-0.5 hidden sm:block">Portfolio project management</p>
        </div>
        <Button
          onClick={() => { form.reset(defaultValues); setIsAddOpen(true); }}
          className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold gap-1.5 text-sm h-9 px-4"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Project
        </Button>
      </div>

      <div className="px-6 md:px-10 py-8 space-y-8 max-w-screen-2xl mx-auto">

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Total Projects" value={stats.total} icon={FolderGit2} accent="text-amber-400 bg-amber-500/10" bar="bg-amber-500" />
          <StatCard label="With GitHub" value={stats.withGithub} icon={GitForkIcon} accent="text-blue-400 bg-blue-500/10" bar="bg-blue-500" />
          <StatCard label="Live / Deployed" value={stats.withLive} icon={Globe} accent="text-emerald-400 bg-emerald-500/10" bar="bg-emerald-500" />
          <StatCard label="With Cover Image" value={stats.withImage} icon={ImageIcon} accent="text-purple-400 bg-purple-500/10" bar="bg-purple-500" />
        </div>

        {/* ── Table card ── */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
          <div className="px-6 py-5 flex items-center justify-between border-b border-zinc-800/80">
            <div>
              <h2 className="text-sm font-semibold text-zinc-100">All Projects</h2>
              <p className="text-xs text-zinc-600 mt-0.5">Browse, search, and manage your work</p>
            </div>
            <span className="text-xs font-mono bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-md">
              {projects.length} total
            </span>
          </div>
          <div className="p-6">
            <DataTable columns={columns} data={projects} />
          </div>
        </div>
      </div>

      {/* ── Add Sheet ── */}
      <Sheet
        open={isAddOpen}
        onOpenChange={(open) => { if (!open) { setIsAddOpen(false); form.reset(defaultValues); } }}
      >
        <SheetContent className="w-full sm:max-w-[520px] bg-zinc-950 border-zinc-800/80 text-zinc-100 overflow-y-auto p-6">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-zinc-50 text-lg font-bold">New Project</SheetTitle>
            <SheetDescription className="text-zinc-500 text-sm">
              Fill in the details to add a project to your portfolio.
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
        <DialogContent className="sm:max-w-[580px] bg-zinc-950 border-zinc-800 text-zinc-100 max-h-[90vh] overflow-y-auto p-6">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-zinc-50 text-lg font-bold">Edit Project</DialogTitle>
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
            <AlertDialogTitle className="text-zinc-50">Delete this project?</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400 text-sm leading-relaxed">
              This is permanent and cannot be undone. The project will be removed from your portfolio immediately.
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