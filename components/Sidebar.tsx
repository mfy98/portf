"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { topics: string[] };

export function Sidebar({ topics }: Props) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="sidebar">
      {/* İSTEK ÜZERİNE MARKA GÖRÜNMEZ */}
      {/* <div className="brand"><Link href="/">/portfolio</Link></div> */}

      <nav className="side-group">
        <Link href="/" className={`side-link ${isActive("/") ? "active" : ""}`}>Ana Sayfa</Link>
        <Link href="/blog" className={`side-link ${pathname.startsWith("/blog") ? "active" : ""}`}>Blog</Link>
        <Link href="/cv" className={`side-link ${isActive("/cv") ? "active" : ""}`}>CV</Link>
      </nav>

      <div className="side-heading">Konular</div>
      <nav className="side-group">
        {topics.map((t) => (
          <Link
            key={t}
            href={`/blog/${t}`}
            className={`side-link sm ${pathname.startsWith(`/blog/${t}`) ? "active" : ""}`}
          >
            {t}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
