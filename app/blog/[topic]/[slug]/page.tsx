import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogTabs } from "@/components/BlogTabs";

type Params = { topic: string; slug: string };

export async function generateStaticParams(): Promise<Array<Params>> {
  const topics = await getAllTopics();
  const params: Array<Params> = [];
  for (const t of topics) {
    const slugs = await getAllSlugsByTopic(t);
    slugs.forEach(s => params.push({ topic: t, slug: s }));
  }
  return params;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = await getPostByTopicSlug(params.topic, params.slug);
  if (!post) return { title: "Bulunamadı" };
  return { title: post.title, description: post.description ?? undefined };
}

export default async function BlogPost({ params }: { params: Params }) {
  const topics = await getAllTopics();
  const post = await getPostByTopicSlug(params.topic, params.slug);
  if (!post) return notFound();

  return (
    <article className="prose">
      <BlogTabs topics={topics} active={params.topic} />
      <h1 className="h1">{post.title}</h1>
      <p className="muted" style={{ marginTop: "-.4rem" }}>
        {new Date(post.date).toLocaleDateString("tr-TR")}
        {post.tags?.length ? <> • {post.tags.join(", ")}</> : null}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
