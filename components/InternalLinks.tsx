import Link from "next/link";

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
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
          Continue lendo
        </p>
        <h2
          id="internal-links-title"
          className="mt-2 text-2xl font-semibold tracking-tight text-slate-950"
        >
          Guias relacionados
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {links.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium leading-6 text-slate-800 transition duration-200 ease-out hover:border-teal-200 hover:bg-teal-50 hover:text-teal-900"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
