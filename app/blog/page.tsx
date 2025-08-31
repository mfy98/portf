import { redirect } from "next/navigation";
import { getAllTopics } from "@/lib/posts";

export const dynamic = "force-static";

export default async function BlogRoot() {
  const topics = await getAllTopics();
  redirect(`/blog/${topics[0] ?? "general"}`);
}
