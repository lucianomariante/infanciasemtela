import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

type EditorialTrustBarProps = {
  /**
   * Exibe o aviso de afiliado. Use somente em páginas que realmente contêm
   * links de afiliado — o aviso precisa ficar visível antes deles.
   */
  showAffiliateNotice?: boolean;
};

export function EditorialTrustBar({
  showAffiliateNotice = false,
}: EditorialTrustBarProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-[#d8e7df] bg-[#edf5f2] px-4 py-2.5 text-xs leading-5 text-stone-600 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
      <div className="min-w-0">
        <p>
          Por{" "}
          <Link
            className="font-bold text-stone-800 underline decoration-stone-300 underline-offset-2 hover:text-teal-800"
            href="/autores/ana-maria-mariante"
          >
            Ana Maria Mariante
          </Link>{" "}
          · Psicopedagoga
        </p>
        {showAffiliateNotice ? (
          <p className="mt-0.5 flex items-center gap-1.5 text-stone-500">
            <Icon className="size-3.5 shrink-0 text-amber-700" name="shield" />
            <span>
              Contém links de afiliado, sem custo adicional para você.{" "}
              <Link
                className="underline decoration-stone-300 underline-offset-2 hover:text-teal-800"
                href="/politica-editorial"
              >
                Como isso funciona
              </Link>
            </span>
          </p>
        ) : (
          <p className="mt-0.5">
            Seleção baseada em proposta de uso, faixa etária, informações
            públicas e avaliações disponíveis.
          </p>
        )}
      </div>
      <Link
        className="shrink-0 font-bold text-teal-700 hover:text-teal-900"
        href="/como-avaliamos"
      >
        Como avaliamos →
      </Link>
    </div>
  );
}
