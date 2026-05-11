'use server';

import { login as setSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function loginAction(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const parsed = loginSchema.safeParse({ email, password });

  if (!parsed.success) {
    return { error: 'Invalid input' };
  }

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('Admin credentials not set in environment variables.');
    return { error: 'Server configuration error' };
  }

  if (parsed.data.email === ADMIN_EMAIL && parsed.data.password === ADMIN_PASSWORD) {
    await setSession(parsed.data.email);
    redirect('/admin');
  } else {
    return { error: 'Invalid credentials' };
  }
}
