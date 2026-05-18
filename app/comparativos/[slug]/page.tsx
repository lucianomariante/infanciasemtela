import { notFound } from "next/navigation";
import { ComparativeTemplate } from "@/components/templates/ComparativeTemplate";
import { getPageBySlug } from "@/lib/content";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page || page.type !== "comparative") {
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

  if (!page || page.type !== "comparative") {
    notFound();
  }

  return <ComparativeTemplate page={page} />;
}
