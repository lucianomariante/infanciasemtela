import Link from "next/link";

export function EditorialTrustBar() {
  return (
    <div className="mt-3 flex flex-col gap-2 rounded-2xl border border-[#d8e7df] bg-[#edf5f2] px-4 py-3 text-xs leading-5 text-stone-600 sm:flex-row sm:items-center sm:justify-between">
      <div>
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
        <p>
          Seleção baseada em proposta de uso, faixa etária, informações públicas e avaliações disponíveis.
        </p>
      </div>
      <Link className="shrink-0 font-bold text-teal-700 hover:text-teal-900" href="/como-avaliamos">
        Como avaliamos →
      </Link>
    </div>
  );
}
