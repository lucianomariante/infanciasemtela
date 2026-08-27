import { TrackedLink } from "@/components/TrackedLink";
import { Icon } from "@/components/ui/Icon";

export function LeadMagnet() {
  return (
    <section
      className="mt-14 overflow-hidden rounded-[1.5rem] border border-[#d8e7df] bg-[linear-gradient(135deg,#e8f4ef,#fffaf0_55%,#f7e7d8)] p-6 shadow-[0_16px_45px_rgba(73,58,39,0.08)] sm:mt-20 sm:p-8"
      aria-labelledby="lead-magnet-title"
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <span className="grid size-11 place-items-center rounded-2xl bg-white/75 text-teal-700 shadow-sm">
            <Icon name="gift" />
          </span>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
            Lista gratuita
          </p>
          <h2
            id="lead-magnet-title"
            className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-stone-950 sm:text-3xl"
          >
            10 ideias de brinquedos sem tela para consultar e imprimir
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            Uma lista prática organizada por tipo de brincadeira, com pontos de
            atenção e perguntas para escolher melhor. Acesso direto, sem cadastro.
          </p>
        </div>

        <div>
          <TrackedLink
            href="/lista-brinquedos-sem-tela"
            eventName="free_list_open"
            eventProperties={{ placement: "article" }}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
          >
            Acessar lista grátis
            <Icon className="size-4" name="arrow" />
          </TrackedLink>
          <p className="mt-2 text-center text-xs leading-5 text-stone-500">
            Sem formulário e sem coleta de e-mail.
          </p>
        </div>
      </div>
    </section>
  );
}
