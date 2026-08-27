import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BestOfTemplate } from "@/components/templates/BestOfTemplate";
import { getAllPages, getPageBySlug } from "@/lib/content";
import { buildPageMetadata, notFoundMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllPages()
    .filter((page) => page.type === "bestof")
    .map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page || page.type !== "bestof") {
    return notFoundMetadata;
  }

  return buildPageMetadata(page);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page || page.type !== "bestof") {
    notFound();
  }

  return <BestOfTemplate page={page} />;
}
