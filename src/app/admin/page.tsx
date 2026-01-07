"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "research",
    tags: "",
    published: false,
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let fileUrl = "";

      // Upload file if present
      if (file) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);
        uploadFormData.append("bucket", "research-files");

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (!uploadRes.ok) throw new Error("File upload failed");
        const uploadData = await uploadRes.json();
        fileUrl = uploadData.url;
      }

      // Create research work
      const res = await fetch("/api/research-work", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map((t) => t.trim()),
          fileUrl,
          publishedAt: formData.published ? new Date() : null,
        }),
      });

      if (!res.ok) throw new Error("Failed to create research work");

      setMessage("Research work created successfully!");
      setFormData({
        title: "",
        description: "",
        content: "",
        category: "research",
        tags: "",
        published: false,
      });
      setFile(null);
    } catch (error) {
      setMessage("Error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gradient-bg min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>

        <Tabs defaultValue="research-work">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="research-work">Research Work</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="research-work">
            <Card className="gradient-card border-primary/20">
              <CardHeader>
                <CardTitle>Upload Research Work</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full p-2 rounded bg-background border border-primary/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      className="w-full p-2 rounded bg-background border border-primary/20 h-24"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Content
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      className="w-full p-2 rounded bg-background border border-primary/20 h-48"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full p-2 rounded bg-background border border-primary/20"
                    >
                      <option value="research">Research</option>
                      <option value="publication">Publication</option>
                      <option value="project">Project</option>
                      <option value="tutorial">Tutorial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      className="w-full p-2 rounded bg-background border border-primary/20"
                      placeholder="AI, ML, IoT"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Upload File (PDF, DOC, etc.)
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="w-full p-2 rounded bg-background border border-primary/20"
                      accept=".pdf,.doc,.docx,.txt"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="published"
                      checked={formData.published}
                      onChange={(e) =>
                        setFormData({ ...formData, published: e.target.checked })
                      }
                      className="w-4 h-4"
                    />
                    <label htmlFor="published" className="text-sm">
                      Publish immediately
                    </label>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Uploading..." : "Upload Research Work"}
                  </Button>

                  {message && (
                    <div
                      className={`p-3 rounded ${
                        message.includes("Error")
                          ? "bg-red-500/20 text-red-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {message}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publications">
            <Card className="gradient-card border-primary/20">
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  Publication management coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card className="gradient-card border-primary/20">
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  Project management coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="gradient-card border-primary/20">
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  Profile management coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
