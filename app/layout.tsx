import type { Metadata } from "next";
import "./globals.css";
import { getAllTopics } from "../lib/posts";
import { Sidebar } from "../components/Sidebar";

export const metadata: Metadata = {
  title: "Portfolio | Blog | CV",
  description: "Kişisel portfolyo, blog ve CV",
  icons: { icon: "/favicon.ico" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const topics = await getAllTopics();
  return (
    <html lang="tr">
      <body>
        <div className="shell">
          <Sidebar topics={topics} />
          <main className="main">{children}</main>
        </div>
        <footer className="footer container">
          <span className="muted">© {new Date().getFullYear()} • Mehmet Furkan Yiğit | NextJS</span>
        </footer>
      </body>
    </html>
  );
}
