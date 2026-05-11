export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Dashboard</h1>
        <p className="text-zinc-400 mt-2">
          Welcome to the admin portal. Manage your portfolio content here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-medium text-zinc-100">Publications</h3>
          <p className="text-zinc-400 text-sm mt-2 mb-4">
            Add new research papers, journals, and conference proceedings along with their PDF files.
          </p>
          <a href="/admin/publications" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
            Manage Publications &rarr;
          </a>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-medium text-zinc-100">Projects</h3>
          <p className="text-zinc-400 text-sm mt-2 mb-4">
            Showcase your latest development work, github links, and project descriptions.
          </p>
          <a href="/admin/projects" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
            Manage Projects &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
