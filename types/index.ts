export type PostMeta = {
  topic: string;   // 👈 ekledik
  slug: string;
  title: string;
  date: string;          // ISO string
  description?: string;
  tags?: string[];
};

export type Post = PostMeta & {
  html: string;
};
