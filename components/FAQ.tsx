import type { FAQItem } from "@/lib/content";

type FAQProps = {
  items: FAQItem[];
};

export function FAQ({ items }: FAQProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mt-14 sm:mt-20" aria-labelledby="faq-title">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
          D&uacute;vidas comuns
        </p>
        <h2
          id="faq-title"
          className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl"
        >
          Perguntas frequentes
        </h2>
      </div>

      <div className="mt-7 grid gap-4">
        {items.map((item) => (
          <article
            key={item.question}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 sm:p-6"
          >
            <h3 className="text-lg font-semibold leading-7 text-slate-950">
              {item.question}
            </h3>
            <p className="mt-3 text-base leading-7 text-slate-700">
              {item.answer}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
