import { readCv } from "@/lib/markdown";

export const dynamic = "force-static";

function colorIndex(label: string): number {
  // deterministik ve 1..8 arası
  let sum = 0;
  for (let i = 0; i < label.length; i++) sum = (sum + label.charCodeAt(i)) % 997;
  return (sum % 8) + 1;
}

export default async function CvPage() {
  const { html, meta } = await readCv();
  const name = meta.name || "CV";
  const subtitle = meta.title;

  const chips: Array<{ label: string; href?: string }> = [];
  if (meta.email) chips.push({ label: `📧 ${meta.email}`, href: `mailto:${meta.email}` });
  if (meta.location) chips.push({ label: `📍 ${meta.location}` });
  if (meta.linkedin) chips.push({ label: "in/ " + new URL(meta.linkedin).pathname.replace(/\//g, ""), href: meta.linkedin });
  if (meta.github) chips.push({ label: "GitHub", href: meta.github });

  const keywords = meta.keywords ?? [];

  return (
    <section className="space-y-6">
      {/* HERO */}
      <div className="cv-hero">
        <h1 className="cv-name">{name}</h1>
        {subtitle ? <p className="cv-subtitle">{subtitle}</p> : null}

        <div className="cv-row">
          {chips.map((c) =>
            c.href ? (
              <a key={c.label} className="chip" href={c.href} target="_blank" rel="noreferrer">
                {c.label}
              </a>
            ) : (
              <span key={c.label} className="chip">{c.label}</span>
            )
          )}
        </div>

        {keywords.length > 0 && (
          <div className="cv-row" style={{ marginTop: ".7rem" }}>
            {keywords.map((k) => {
              const idx = colorIndex(k);
              return <span key={k} className={`badge badge-var--${idx}`}>{k}</span>;
            })}
          </div>
        )}
      </div>

      {/* İçerik */}
      <article className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </section>
  );
}
