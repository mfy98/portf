import Link from "next/link";

export default function HomePage() {
  return (
    <section>
      <h1 className="h1">Merhaba 👋</h1>
      <p className="muted" style={{maxWidth: 700}}>
        Burası portfolyo sitem. Projeler, yazılar ve özgeçmişim burada.
      </p>

      <div className="grid" style={{marginTop: "1.25rem"}}>
        <Link href="/blog" className="card">
          <h3 className="h2">Blog</h3>
          <p className="muted">Araştırma notları, teknik yazılar ve denemeler.</p>
        </Link>
        <Link href="/cv" className="card">
          <h3 className="h2">CV</h3>
          <p className="muted">Özgeçmişimi hızlıca görüntüleyin.</p>
        </Link>
      </div>
    </section>
  );
}
