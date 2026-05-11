import { ReactNode } from 'react';
import Link from 'next/link';
import { logout } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard, FileText, FolderGit2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  async function handleLogout() {
    'use server';
    await logout();
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-900 border-b md:border-r border-zinc-800 p-6 flex flex-col justify-between">
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Admin Portal
            </h2>
            <p className="text-xs text-zinc-500 mt-1">Manage your portfolio</p>
          </div>
          
          <nav className="space-y-2">
            <Link href="/admin">
              <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/publications">
              <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800">
                <FileText className="mr-2 h-4 w-4" />
                Publications
              </Button>
            </Link>
            <Link href="/admin/projects">
              <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800">
                <FolderGit2 className="mr-2 h-4 w-4" />
                Projects
              </Button>
            </Link>
          </nav>
        </div>

        <form action={handleLogout} className="mt-8 md:mt-0">
          <Button variant="destructive" className="w-full bg-red-900/20 text-red-400 hover:bg-red-900/40 hover:text-red-300 border border-red-900/50">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </form>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
