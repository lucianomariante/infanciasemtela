import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { ExpertNote as ExpertNoteData } from "@/lib/content";
import { EDITORIAL_AUTHOR } from "@/lib/site";

type ExpertNoteProps = {
  note?: ExpertNoteData;
};

export function ExpertNote({ note }: ExpertNoteProps) {
  if (!note || note.status !== "aprovado" || note.paragraphs.length === 0) {
    return null;
  }

  return (
    <section
      className="mt-10 rounded-[1.5rem] border border-teal-200 bg-[#edf5f2]/70 p-6 sm:mt-14 sm:p-8"
      aria-labelledby="expert-note-title"
    >
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-teal-700 shadow-sm">
          <Icon name="shield" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-800">
            Palavra da especialista
          </p>
          <h2
            id="expert-note-title"
            className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-stone-950"
          >
            O que eu observo antes de indicar
          </h2>
          <div className="mt-4 grid gap-3 text-base leading-7 text-stone-700">
            {note.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-5 text-sm text-stone-600">
            <Link
              href="/autores/ana-maria-mariante"
              className="font-semibold text-teal-800 underline-offset-4 hover:underline"
            >
              {EDITORIAL_AUTHOR.name}
            </Link>
            , {EDITORIAL_AUTHOR.role.toLocaleLowerCase("pt-BR")}
          </p>
        </div>
      </div>
    </section>
  );
}
