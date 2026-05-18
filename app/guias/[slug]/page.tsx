import { notFound } from "next/navigation";
import { GuideTemplate } from "@/components/templates/GuideTemplate";
import { getPageBySlug } from "@/lib/content";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page || page.type !== "guide") {
    return {
      title: "Pagina nao encontrada",
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

  if (!page || page.type !== "guide") {
    notFound();
  }

  return <GuideTemplate page={page} />;
}
