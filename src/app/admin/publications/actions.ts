"use server";

import { supabase } from "@/lib/supabase";
import { getSession } from "@/lib/auth";
import { z } from "zod";

const pubSchema = z.object({
  title: z.string().min(1, "Title is required"),
  publisher: z.string().min(1, "Publisher is required"),
  year: z.string().min(4, "Year must be valid"),
  type: z.string().min(1, "Type is required"),
  doi: z.string().optional(),
  pdfLink: z.string().optional(),
  authors: z.array(z.string()).min(1, "Authors are required"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(150, "Description must be less than 150 characters"),
  keywords: z.array(z.string()).min(1, "Keywords are required"),
  link: z.string().optional(),
});

export async function addPublication(formData: FormData) {
  try {
    const session = await getSession();

    if (!session) {
      return { error: "Unauthorized" };
    }

    // Get form values
    const title = formData.get("title")?.toString() || "";
    const publisher = formData.get("publisher")?.toString() || "";
    const year = formData.get("year")?.toString() || "";
    const type = formData.get("type")?.toString() || "";
    const doi = formData.get("doi")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const link = formData.get("link")?.toString() || "";

    // Convert comma-separated strings into arrays
    const authors =
      formData
        .get("authors")
        ?.toString()
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean) || [];

    const keywords =
      formData
        .get("keywords")
        ?.toString()
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean) || [];

    const pdfUrl = formData.get("pdfUrl")?.toString() || "";

    // Validate
    const parsed = pubSchema.safeParse({
      title,
      publisher,
      year,
      type,
      doi,
      authors,
      description,
      keywords,
      link,
      pdfLink: pdfUrl,
    });

    if (!parsed.success) {
      return {
        error: parsed.error.issues[0].message,
      };
    }

    let fileUrl = pdfUrl;

    // Insert publication
    const { error: insertError } = await supabase.from("publications").insert([
      {
        title: parsed.data.title,
        publisher: parsed.data.publisher,
        year: Number(parsed.data.year),
        type: parsed.data.type,
        doi: parsed.data.doi || null,
        authors: parsed.data.authors,
        description: parsed.data.description,
        keywords: parsed.data.keywords,
        link: parsed.data.link || null,
        pdf_url: fileUrl || null,
      },
    ]);

    if (insertError) {
      console.error("Insert Error:", insertError);

      return {
        error: insertError.message,
      };
    }

    return {
      success: true,
      status:200,
      message:"Publication added successfully.",
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      error: "An unexpected error occurred.",
      status:500,
      success:false,
    };
  }
}

export async function getPublications() {
  try {
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .order("year", { ascending: false });

    if (error) {
      console.error(error);

      return {
        error: error.message,
      };
    }

    return {
      data,
      status:200,
      success:true,
    };
  } catch (error) {
    console.error("Error fetching publications:", error);

    return {
      error: "Failed to fetch publications.",
      status:500,
      success:false,
    };
  }
}

export async function deletePublication(id: string) {
  try {
    const session = await getSession();
    if (!session) return { error: "Unauthorized" };

    const { error } = await supabase
      .from("publications")
      .delete()
      .eq("id", id);

    if (error) throw error;
    
    return { success: true, message: "Publication deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting publication:", error);
    return { error: error.message || "Failed to delete publication" };
  }
}

export async function updatePublication(id: string, formData: FormData) {
  try {
    const session = await getSession();
    if (!session) return { error: "Unauthorized" };

    const title = formData.get("title")?.toString() || "";
    const publisher = formData.get("publisher")?.toString() || "";
    const year = formData.get("year")?.toString() || "";
    const type = formData.get("type")?.toString() || "";
    const doi = formData.get("doi")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const link = formData.get("link")?.toString() || "";
    const pdfUrl = formData.get("pdfUrl")?.toString();

    const authors = formData.get("authors")?.toString().split(",").map(a => a.trim()).filter(Boolean) || [];
    const keywords = formData.get("keywords")?.toString().split(",").map(k => k.trim()).filter(Boolean) || [];

    const parsed = pubSchema.safeParse({
      title, publisher, year, type, doi, authors, description, keywords, link, pdfLink: pdfUrl || ""
    });

    if (!parsed.success) {
      return { error: parsed.error.issues[0].message };
    }

    const updateData: any = {
      title: parsed.data.title,
      publisher: parsed.data.publisher,
      year: Number(parsed.data.year),
      type: parsed.data.type,
      doi: parsed.data.doi || null,
      authors: parsed.data.authors,
      description: parsed.data.description,
      keywords: parsed.data.keywords,
      link: parsed.data.link || null,
    };

    if (pdfUrl) {
      updateData.pdf_url = pdfUrl;
    }

    const { error } = await supabase
      .from("publications")
      .update(updateData)
      .eq("id", id);

    if (error) throw error;

    return { success: true, message: "Publication updated successfully" };
  } catch (error: any) {
    console.error("Error updating publication:", error);
    return { error: error.message || "Failed to update publication" };
  }
}
