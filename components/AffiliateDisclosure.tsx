import { Icon } from "@/components/ui/Icon";

export function AffiliateDisclosure() {
  return (
    <aside className="flex items-start gap-3 rounded-2xl border border-[#e6d5b8] bg-[#fffaf0] px-4 py-3.5 text-sm leading-6 text-stone-700 shadow-sm">
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-amber-100 text-amber-800">
        <Icon className="size-4" name="shield" />
      </span>
      <p>
        Alguns links desta página podem gerar comissão para o Infância Sem
        Tela, sem custo adicional para você. A comissão não altera nossos
        critérios de seleção.
      </p>
    </aside>
  );
}
