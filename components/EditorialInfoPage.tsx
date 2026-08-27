import Link from "next/link";

type Section = {
  bullets?: string[];
  paragraphs: string[];
  title: string;
};

type EditorialInfoPageProps = {
  description: string;
  eyebrow: string;
  sections: Section[];
  title: string;
};

export function EditorialInfoPage({
  description,
  eyebrow,
  sections,
  title,
}: EditorialInfoPageProps) {
  return (
    <main className="flex-1 bg-[#faf7f0] text-stone-950">
      <div className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 sm:py-16">
        <nav className="text-sm font-semibold text-stone-500" aria-label="Breadcrumb">
          <Link className="hover:text-teal-700" href="/">Início</Link>
          <span className="px-2">/</span>
          <span>{title}</span>
        </nav>

        <header className="mt-8 rounded-[2rem] border border-[#e7dccb] bg-white p-6 shadow-[0_18px_55px_rgba(73,58,39,0.08)] sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">{title}</h1>
          <p className="mt-5 text-lg leading-8 text-stone-600">{description}</p>
        </header>

        <div className="mt-8 grid gap-5">
          {sections.map((section) => (
            <section key={section.title} className="rounded-[1.5rem] border border-[#e7dccb] bg-white p-6 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.025em]">{section.title}</h2>
              <div className="mt-4 grid gap-4 text-base leading-7 text-stone-600">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets ? (
                <ul className="mt-5 grid gap-3 text-base leading-7 text-stone-700">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-3 size-1.5 shrink-0 rounded-full bg-teal-600" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
