"use client";

import { track } from "@vercel/analytics";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => {
        track("free_list_print");
        window.print();
      }}
      className="print:hidden inline-flex min-h-12 items-center justify-center rounded-xl bg-teal-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
    >
      Imprimir ou salvar em PDF
    </button>
  );
}
