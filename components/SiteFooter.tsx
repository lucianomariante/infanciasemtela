import Link from "next/link";

const editorialLinks = [
  { href: "/sobre", label: "Sobre o projeto" },
  { href: "/como-avaliamos", label: "Como avaliamos" },
  { href: "/politica-editorial", label: "Política editorial" },
  { href: "/privacidade", label: "Privacidade" },
];

export function SiteFooter() {
  return (
    <footer className="print:hidden shrink-0 border-t border-[#e7dccb] bg-[#f6eee2]">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-10 text-sm leading-6 text-stone-600 sm:px-8 md:grid-cols-[1.2fr_0.8fr] lg:px-10">
        <div>
          <p className="font-semibold text-stone-900">Infância Sem Tela</p>
          <p className="mt-2 max-w-xl">
            Curadoria independente para ajudar famílias a comparar brinquedos,
            presentes e ideias de brincadeira sem tela com mais clareza.
          </p>
          <p className="mt-4 text-xs leading-5">
            Como Associado da Amazon, podemos receber comissão por compras
            qualificadas, sem custo adicional para você.
          </p>
        </div>

        <nav aria-label="Informações editoriais">
          <p className="font-semibold text-stone-900">Transparência</p>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {editorialLinks.map((item) => (
              <li key={item.href}>
                <Link className="transition hover:text-teal-700" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
