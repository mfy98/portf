export type PostMeta = {
  slug: string;
  title: string;
  date: string;          // ISO
  description?: string;
  tags?: string[];
};

export type Post = PostMeta & {
  html: string;
};
