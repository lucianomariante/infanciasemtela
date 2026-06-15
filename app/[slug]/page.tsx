import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BestOfTemplate } from "@/components/templates/BestOfTemplate";
import { getAllPages, getPageBySlug } from "@/lib/content";
import { getPagePath } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

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
    return {
      title: "Página não encontrada",
    };
  }

  const pageUrl = `${SITE_URL}${getPagePath(page)}`;

  return {
    title: page.title,
    description: page.intro,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: page.title,
      description: page.intro,
      url: pageUrl,
      siteName: "Infância Sem Tela",
      type: "article",
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page || page.type !== "bestof") {
    notFound();
  }

  return <BestOfTemplate page={page} />;
}
