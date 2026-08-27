import Link from "next/link";

export function EditorialTrustBar() {
  return (
    <div className="mt-3 flex flex-col gap-2 rounded-2xl border border-[#d8e7df] bg-[#edf5f2] px-4 py-3 text-xs leading-5 text-stone-600 sm:flex-row sm:items-center sm:justify-between">
      <p>
        <strong className="text-stone-800">Curadoria Infância Sem Tela.</strong>{" "}
        Seleção baseada em proposta de uso, faixa etária, informações públicas e avaliações disponíveis.
      </p>
      <Link className="shrink-0 font-bold text-teal-700 hover:text-teal-900" href="/como-avaliamos">
        Como avaliamos →
      </Link>
    </div>
  );
}
