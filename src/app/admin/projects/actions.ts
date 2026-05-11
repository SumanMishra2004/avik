'use server';

import { supabase } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import { z } from 'zod';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  techStack: z.string().min(1, 'Tech stack is required'),
  githubUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  liveUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

export async function addProject(formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { error: 'Unauthorized' };
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const techStack = formData.get('techStack') as string;
  const githubUrl = formData.get('githubUrl') as string;
  const liveUrl = formData.get('liveUrl') as string;
  const file = formData.get('file') as File | null;

  const parsed = projectSchema.safeParse({ title, description, techStack, githubUrl, liveUrl });
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  let imageUrl = '';

  try {
    // If an image file is provided, upload it to Supabase Storage
    if (file && file.size > 0) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images') // Assuming a bucket named 'images'
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload Error:', uploadError);
        return { error: 'Failed to upload image. Ensure "images" bucket exists.' };
      }

      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
        
      imageUrl = publicUrlData.publicUrl;
    }

    // Insert into database
    const { data: insertData, error: insertError } = await supabase
      .from('projects')
      .insert([
        {
          title: parsed.data.title,
          description: parsed.data.description,
          tech_stack: parsed.data.techStack.split(',').map(s => s.trim()),
          github_url: parsed.data.githubUrl || null,
          live_url: parsed.data.liveUrl || null,
          image_url: imageUrl || null,
        }
      ]);

    if (insertError) {
      console.error('Insert Error:', insertError);
      return { error: 'Failed to save project to database.' };
    }

    return { success: true };

  } catch (error) {
    console.error('Server Action Error:', error);
    return { error: 'An unexpected error occurred.' };
  }
}
