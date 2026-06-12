import type { FAQItem } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";

type FAQProps = {
  items: FAQItem[];
};

export function FAQ({ items }: FAQProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mt-14 sm:mt-20" aria-labelledby="faq-title">
      <SectionHeader
        eyebrow="Dúvidas comuns"
        id="faq-title"
        title="Perguntas frequentes"
        description="Respostas diretas para escolher com mais segurança e menos dúvida."
      />

      <div className="mt-7 grid gap-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-[#e7dccb] bg-white shadow-[0_8px_25px_rgba(73,58,39,0.05)] open:shadow-[0_12px_30px_rgba(73,58,39,0.08)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-base font-semibold leading-7 text-stone-950 marker:hidden sm:px-6">
              {item.question}
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#f6eee2] text-amber-800 transition group-open:rotate-90">
                <Icon className="size-4" name="arrow" />
              </span>
            </summary>
            <p className="border-t border-[#eee5d8] px-5 py-5 text-base leading-7 text-stone-600 sm:px-6">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
