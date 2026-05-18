import Link from "next/link";
import { getAllPages, type ContentPage, type PageType } from "@/lib/content";

const PAGE_TYPES: PageType[] = ["bestof", "gift", "guide", "comparative"];

const TYPE_LABELS: Record<PageType, string> = {
  bestof: "Bestof",
  gift: "Gift",
  guide: "Guide",
  comparative: "Comparative",
};

function getPublicPath(page: ContentPage): string {
  switch (page.type) {
    case "bestof":
      return `/melhores/${page.slug}`;
    case "gift":
      return `/presentes/${page.slug}`;
    case "guide":
      return `/guias/${page.slug}`;
    case "comparative":
      return `/comparativos/${page.slug}`;
  }
}

export default function AdminPage() {
  const pages = getAllPages().sort((a, b) => {
    const typeOrder = PAGE_TYPES.indexOf(a.type) - PAGE_TYPES.indexOf(b.type);

    if (typeOrder !== 0) {
      return typeOrder;
    }

    return a.title.localeCompare(b.title, "pt-BR");
  });

  const totalsByType = PAGE_TYPES.reduce<Record<PageType, number>>(
    (acc, type) => {
      acc[type] = pages.filter((page) => page.type === type).length;
      return acc;
    },
    {
      bestof: 0,
      gift: 0,
      guide: 0,
      comparative: 0,
    },
  );

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8 text-zinc-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Admin
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Diagnostico editorial
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-zinc-600 sm:text-base">
            Visao geral das paginas publicadas no conteudo do projeto.
          </p>
        </header>

        <section
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
          aria-label="Resumo de paginas"
        >
          <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-zinc-500">Total</p>
            <p className="mt-2 text-3xl font-semibold">{pages.length}</p>
          </div>

          {PAGE_TYPES.map((type) => (
            <div
              key={type}
              className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-medium text-zinc-500">
                {TYPE_LABELS[type]}
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {totalsByType[type]}
              </p>
            </div>
          ))}
        </section>

        <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
          <div className="border-b border-zinc-200 px-5 py-4">
            <h2 className="text-lg font-semibold">Paginas</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
              <thead className="bg-zinc-100 text-xs font-semibold uppercase tracking-wide text-zinc-600">
                <tr>
                  <th className="whitespace-nowrap px-5 py-3">Title</th>
                  <th className="whitespace-nowrap px-5 py-3">Slug</th>
                  <th className="whitespace-nowrap px-5 py-3">Type</th>
                  <th className="whitespace-nowrap px-5 py-3 text-right">
                    Product IDs
                  </th>
                  <th className="whitespace-nowrap px-5 py-3 text-right">
                    FAQ
                  </th>
                  <th className="whitespace-nowrap px-5 py-3">Link publico</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {pages.map((page) => {
                  const publicPath = getPublicPath(page);

                  return (
                    <tr key={`${page.type}-${page.slug}`}>
                      <td className="max-w-sm px-5 py-4 font-medium text-zinc-950">
                        {page.title}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 font-mono text-xs text-zinc-600">
                        {page.slug}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700">
                          {page.type}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-right tabular-nums text-zinc-700">
                        {page.product_ids.length}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-right tabular-nums text-zinc-700">
                        {page.faq.length}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <Link
                          href={publicPath}
                          className="font-medium text-zinc-950 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-950"
                        >
                          {publicPath}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
