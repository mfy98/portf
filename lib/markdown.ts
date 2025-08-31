import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export async function markdownToHtml(md: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(md);
  return String(file);
}

export type CvMeta = {
  name: string;
  title?: string;
  email?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  keywords?: string[];
};

export async function readCv(): Promise<{ html: string; meta: CvMeta }> {
  const cvPath = path.join(process.cwd(), "content", "cv.md");
  try {
    const raw = await fs.readFile(cvPath, "utf8");
    const { data, content } = matter(raw);

    const meta: CvMeta = {
      name: typeof data.name === "string" ? data.name : "",
      title: typeof data.title === "string" ? data.title : undefined,
      email: typeof data.email === "string" ? data.email : undefined,
      location: typeof data.location === "string" ? data.location : undefined,
      linkedin: typeof data.linkedin === "string" ? data.linkedin : undefined,
      github: typeof data.github === "string" ? data.github : undefined,
      keywords: Array.isArray(data.keywords)
        ? data.keywords.filter((x: unknown): x is string => typeof x === "string")
        : undefined,
    };

    const html = await markdownToHtml(content);
    return { html, meta };
  } catch (err: unknown) {
    // Dosya yoksa veya başka bir hata varsa zarif fallback
    const html = await markdownToHtml(`# CV bulunamadı

\`content/cv.md\` dosyasını eklediğinizde bu sayfa otomatik güncellenecektir.
`);
    return { html, meta: { name: "CV" } };
  }
}
