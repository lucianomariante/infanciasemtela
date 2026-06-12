"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
    setEmail("");
  }

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
            Lista grátis: 10 brinquedos sem tela que prendem a atenção
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            Receba ideias simples de brinquedos sem tela, organizadas por idade
            e perfil da criança, para escolher com mais clareza.
          </p>
        </div>

        <form className="grid gap-3 sm:grid-cols-[1fr_auto]" onSubmit={handleSubmit}>
          <label className="min-w-0">
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Seu e-mail
            </span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="voce@exemplo.com"
              required
              className="h-12 w-full rounded-xl border border-[#ded4c5] bg-white px-4 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15"
            />
          </label>

          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center self-end rounded-xl bg-teal-700 px-5 text-sm font-bold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
          >
            Receber lista grátis
          </button>
        </form>
      </div>

      {isSubmitted ? (
        <p className="mt-4 rounded-md bg-white/70 px-4 py-3 text-sm font-medium text-teal-800">
          Pronto! Em breve você receberá a lista.
        </p>
      ) : null}
    </section>
  );
}
