'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { addProject } from './actions';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  description: z.string().min(10, { message: 'Description should be at least 10 characters.' }),
  techStack: z.string().min(1, { message: 'Provide at least one technology.' }),
  githubUrl: z.string().url({ message: 'Must be a valid URL' }).optional().or(z.literal('')),
  liveUrl: z.string().url({ message: 'Must be a valid URL' }).optional().or(z.literal('')),
  file: z.any().optional(),
});

export default function ProjectsAdminPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      techStack: '',
      githubUrl: '',
      liveUrl: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    setError(null);
    setSuccess(false);
    
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('techStack', values.techStack);
    if (values.githubUrl) formData.append('githubUrl', values.githubUrl);
    if (values.liveUrl) formData.append('liveUrl', values.liveUrl);
    
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      formData.append('file', fileInput.files[0]);
    }
    
    try {
      const result = await addProject(formData);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(true);
        form.reset();
        if (fileInput) fileInput.value = '';
      }
    } catch (e) {
      setError('An unexpected error occurred.');
      console.error(e);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Projects</h1>
          <p className="text-zinc-400 mt-1">Add new projects to your portfolio.</p>
        </div>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-xl text-zinc-100">Add Project</CardTitle>
          <CardDescription className="text-zinc-400">
            Fill in the details below. You can upload a cover image for the project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success && (
            <div className="mb-6 p-4 rounded-md bg-green-500/10 border border-green-500/20 text-green-400 flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Project added successfully!
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-zinc-300">Project Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Next.js Portfolio" className="bg-zinc-800/50 border-zinc-700 text-zinc-100" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-zinc-300">Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the project..." 
                          className="bg-zinc-800/50 border-zinc-700 text-zinc-100 min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="techStack"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-zinc-300">Tech Stack (comma separated)</FormLabel>
                      <FormControl>
                        <Input placeholder="React, Next.js, Tailwind CSS" className="bg-zinc-800/50 border-zinc-700 text-zinc-100" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="githubUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">GitHub URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://github.com/..." className="bg-zinc-800/50 border-zinc-700 text-zinc-100" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="liveUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-300">Live URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." className="bg-zinc-800/50 border-zinc-700 text-zinc-100" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <div className="space-y-2 md:col-span-2">
                  <FormLabel className="text-zinc-300">Cover Image (Optional)</FormLabel>
                  <Input 
                    type="file" 
                    accept="image/*"
                    className="bg-zinc-800/50 border-zinc-700 text-zinc-100 file:bg-zinc-700 file:text-zinc-100 file:border-0 file:mr-4 file:px-4 file:py-2 file:rounded-md cursor-pointer h-12" 
                  />
                  <p className="text-xs text-zinc-500">Max file size: 5MB. Image formats only.</p>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Project"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
