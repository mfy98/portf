"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { topics: string[]; active?: string };

export function BlogTabs({ topics, active }: Props) {
  const pathname = usePathname();
  const isTab = (t: string) => active ? active === t : pathname.startsWith(`/blog/${t}`);
  return (
    <div className="tabs">
      {topics.map(t => (
        <Link key={t} href={`/blog/${t}`} className={`tab ${isTab(t) ? "active" : ""}`}>
          {t}
        </Link>
      ))}
    </div>
  );
}
