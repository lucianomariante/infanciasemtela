"use client";

import type { FormEvent } from "react";
import { useState } from "react";

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
      className="mt-14 overflow-hidden rounded-lg border border-teal-100 bg-gradient-to-br from-teal-50 via-white to-amber-50 p-6 shadow-sm shadow-slate-200/70 sm:mt-20 sm:p-8"
      aria-labelledby="lead-magnet-title"
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            Lista gratuita
          </p>
          <h2
            id="lead-magnet-title"
            className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl"
          >
            Lista grátis: 10 brinquedos sem tela que prendem a atenção
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-700">
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
              className="h-12 w-full rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            />
          </label>

          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center self-end rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition duration-200 ease-out hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
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
