import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetailView } from "@/components/sections/blog/BlogDetailView";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/blogContent";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.seo.description,
    keywords: post.seo.keywords,
    openGraph: {
      title: post.title,
      description: post.seo.description,
      type: "article",
      images: [{ url: post.coverImage, alt: post.coverImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.seo.description,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return <BlogDetailView post={post} />;
}
