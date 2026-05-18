import { notFound } from "next/navigation";
import { GiftTemplate } from "@/components/templates/GiftTemplate";
import { getPageBySlug } from "@/lib/content";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page || page.type !== "gift") {
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

  if (!page || page.type !== "gift") {
    notFound();
  }

  return <GiftTemplate page={page} />;
}
