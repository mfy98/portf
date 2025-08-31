import path from "node:path";
import fs from "node:fs/promises";
import matter from "gray-matter";
import { z } from "zod";
import { markdownToHtml } from "./markdown";
import type { Post, PostMeta } from "../types";

const FRONT_MATTER = z.object({
  title: z.string().min(1),
  date: z.string().transform((s) => new Date(s).toISOString()),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

function blogRoot(): string {
  return path.join(process.cwd(), "content", "blog");
}

export async function getAllTopics(): Promise<string[]> {
  const root = blogRoot();
  const entries = await fs.readdir(root, { withFileTypes: true });
  const topics = entries.filter(e => e.isDirectory()).map(e => e.name);


  // kökte .md dosyaları varsa "general" diye bir konu oluştur
  const rootMd = (await fs.readdir(root)).filter(f => f.endsWith(".md"));
  if (rootMd.length > 0 && !topics.includes("general")) topics.unshift("general");

  // en azından bir konu olsun
  return topics.length ? topics : ["general"];
}

function topicDir(topic: string): string {
  return topic === "general" ? blogRoot() : path.join(blogRoot(), topic);
}

export async function getAllSlugsByTopic(topic: string): Promise<string[]> {
  const dir = topicDir(topic);
  try {
    const files = await fs.readdir(dir);
    return files.filter(f => f.endsWith(".md")).map(f => f.replace(/\.md$/, ""));
  } catch {
    return [];
  }
}

export async function getAllPostsMetaByTopic(topic: string): Promise<PostMeta[]> {
  const slugs = await getAllSlugsByTopic(topic);
  const entries = await Promise.all(slugs.map(async (slug) => {
    const full = path.join(topicDir(topic), `${slug}.md`);
    const raw = await fs.readFile(full, "utf8");
    const parsed = matter(raw);
    const result = FRONT_MATTER.safeParse(parsed.data);
    if (!result.success) return null;
    const fm = result.data;
    const meta: PostMeta = { topic, slug, title: fm.title, date: fm.date, description: fm.description, tags: fm.tags };
    return meta;
  }));
  return entries.filter((e): e is PostMeta => e !== null)
                .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getPostByTopicSlug(topic: string, slug: string): Promise<Post | null> {
    
  const full = path.join(topicDir(topic), `${slug}.md`);
  try {
    const raw = await fs.readFile(full, "utf8");
    const parsed = matter(raw);
    const result = FRONT_MATTER.safeParse(parsed.data);
    if (!result.success) return null;
    const fm = result.data;
    const meta: PostMeta = {
  topic,      // artık hata yok
  slug,
  title: fm.title,
  date: fm.date,
  description: fm.description,
  tags: fm.tags
};

    const html = await markdownToHtml(parsed.content);
    return {
  topic,
  slug,
  title: fm.title,
  date: fm.date,
  description: fm.description,
  tags: fm.tags,
  html
};

  } catch {
    return null;
  }
}
