import Link from "next/link";
import { GuideCard } from "@/components/GuideCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getAllPages, isPageIndexable, type PageType } from "@/lib/content";
import { getPagePath } from "@/lib/schema";

type ContentHubProps = {
  description: string;
  eyebrow: string;
  title: string;
  type: PageType;
};

const icons: Record<PageType, "blocks" | "gift" | "puzzle" | "sparkles"> = {
  bestof: "blocks",
  gift: "gift",
  guide: "sparkles",
  comparative: "puzzle",
};

export function ContentHub({ description, eyebrow, title, type }: ContentHubProps) {
  const pages = getAllPages()
    .filter((page) => page.type === type && isPageIndexable(page))
    .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));

  return (
    <main className="flex-1 bg-[#faf7f0] text-stone-950">
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-16 lg:px-10">
        <nav className="text-sm font-semibold text-stone-500" aria-label="Breadcrumb">
          <Link className="hover:text-teal-700" href="/">Início</Link>
          <span className="px-2">/</span>
          <span>{title}</span>
        </nav>

        <section className="mt-8 rounded-[2rem] border border-[#e7dccb] bg-white p-6 shadow-[0_18px_55px_rgba(73,58,39,0.08)] sm:p-10">
          <SectionHeader
            eyebrow={eyebrow}
            id={`${type}-hub-title`}
            title={title}
            description={description}
          />
        </section>

        <section className="mt-10" aria-label={`Conteúdos de ${title}`}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => (
              <GuideCard
                key={page.slug}
                href={getPagePath(page)}
                title={page.title}
                description={page.intro}
                icon={icons[type]}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
