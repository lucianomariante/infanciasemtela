import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";

type InternalLinksProps = {
  links: {
    title: string;
    url: string;
  }[];
};

export function InternalLinks({ links }: InternalLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <section className="mt-14 sm:mt-20" aria-labelledby="internal-links-title">
      <div className="rounded-[1.5rem] border border-[#e7dccb] bg-[#f6eee2]/70 p-5 sm:p-8">
        <SectionHeader
          eyebrow="Continue explorando"
          id="internal-links-title"
          title="Guias relacionados"
          description="Outros caminhos para escolher por idade, interesse e momento da família."
        />
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {links.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="group flex items-center justify-between gap-3 rounded-xl border border-white bg-white px-4 py-4 text-sm font-semibold leading-6 text-stone-800 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-100 hover:text-teal-800 hover:shadow-md"
            >
              <span>{link.title}</span>
              <Icon className="size-4 shrink-0 transition group-hover:translate-x-1" name="arrow" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
