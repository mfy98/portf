import Link from "next/link";
import type { PostMeta } from "../types";

type Props = { post: PostMeta };

export function PostCard({ post }: Props) {
  return (
    <Link href={`/blog/${post.slug}`} className="card">
      <h3 className="h2">{post.title}</h3>
      <p className="muted" style={{margin: 0}}>{post.description ?? "—"}</p>
      <div style={{display:"flex", gap:".5rem", marginTop:".6rem"}}>
        <span className="tag">{new Date(post.date).toLocaleDateString("tr-TR")}</span>
        {post.tags?.slice(0,3).map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    </Link>
  );
}
