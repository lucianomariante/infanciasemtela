import { notFound } from "next/navigation";
import { BestOfTemplate } from "@/components/templates/BestOfTemplate";
import { getPageBySlug } from "@/lib/content";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    return {
      title: "P\u00e1gina n\u00e3o encontrada",
    };
  }

  return {
    title: page.title,
    description: page.intro,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <BestOfTemplate page={page} />;
}
