import { Icon } from "@/components/ui/Icon";
import type { EditorialSection } from "@/lib/content";

type PageEditorialSectionsProps = {
  sections?: EditorialSection[];
};

export function PageEditorialSections({ sections }: PageEditorialSectionsProps) {
  if (!sections?.length) {
    return null;
  }

  return (
    <section className="mt-10 grid gap-5 sm:mt-14" aria-label="Orientações do guia">
      {sections.map((section, index) => (
        <article
          key={section.title}
          className="rounded-[1.5rem] border border-[#e7dccb] bg-white p-6 shadow-[0_10px_30px_rgba(73,58,39,0.05)] sm:p-8"
        >
          <div className="flex items-start gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#edf5f2] text-teal-700">
              <Icon name={index % 2 === 0 ? "sparkles" : "check"} />
            </span>
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.025em] text-stone-950">
                {section.title}
              </h2>
              <div className="mt-4 grid gap-3 text-base leading-7 text-stone-600">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets ? (
                <ul className="mt-5 grid gap-3 text-sm leading-6 text-stone-700 sm:grid-cols-2">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5">
                      <Icon className="mt-1 size-4 shrink-0 text-teal-700" name="check" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
