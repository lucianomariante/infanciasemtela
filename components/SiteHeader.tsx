import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

const navigation = [
  { href: "/guias", label: "Guias" },
  { href: "/melhores", label: "Melhores brinquedos" },
  { href: "/presentes", label: "Presentes" },
  { href: "/lista-brinquedos-sem-tela", label: "Lista grátis" },
];

export function SiteHeader() {
  return (
    <header className="print:hidden border-b border-[#e7dccb] bg-[#faf7f0]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold tracking-[-0.02em] text-stone-950"
          aria-label="Infância Sem Tela — início"
        >
          <span className="grid size-10 place-items-center rounded-2xl bg-[#e7f3ee] text-teal-700">
            <Icon className="size-5" name="heart" />
          </span>
          <span>Infância Sem Tela</span>
        </Link>

        <nav aria-label="Navegação principal">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-stone-600">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link className="transition hover:text-teal-700" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
