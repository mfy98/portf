import { notFound } from "next/navigation";
import { getAllTopics, getAllPostsMetaByTopic } from "@/lib/posts";
import { BlogTabs } from "@/components/BlogTabs";
import Link from "next/link";

type Params = { topic: string };

export async function generateStaticParams(): Promise<Array<Params>> {
  const topics = await getAllTopics();
  return topics.map(t => ({ topic: t }));
}

export default async function TopicIndex({ params }: { params: Params }) {
  const topics = await getAllTopics();
  if (!topics.includes(params.topic)) return notFound();

  const posts = await getAllPostsMetaByTopic(params.topic);

  return (
    <section>
      <h1 className="h1">Blog</h1>
      <p className="muted">Konuya göre yazılar.</p>
      <BlogTabs topics={topics} active={params.topic} />
<div className="grid" style={{ marginTop: "1rem" }}>
  {posts.map(p => (
    <Link
      key={p.slug}
      href={`/blog/${params.topic}/${p.slug}`}   // ← burada params.topic kullan
      className="card"
    >
      <h3 className="h2">{p.title}</h3>
      <p className="muted" style={{ margin: 0 }}>{p.description ?? "—"}</p>
      <div style={{ display: "flex", gap: ".5rem", marginTop: ".6rem" }}>
        <span className="tag">{new Date(p.date).toLocaleDateString("tr-TR")}</span>
        {p.tags?.slice(0, 3).map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    </Link>
  ))}
</div>
    </section>
  );
}
