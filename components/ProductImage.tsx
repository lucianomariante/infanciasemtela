import Image from "next/image";
import { Icon } from "@/components/ui/Icon";

type ProductImageProps = {
  alt?: string;
  className?: string;
  imageUrl?: string;
  title: string;
};

export function ProductImage({
  alt,
  className = "",
  imageUrl,
  title,
}: ProductImageProps) {
  if (!imageUrl) {
    return (
      <div
        className={`relative isolate flex aspect-[4/3] min-h-52 items-center justify-center overflow-hidden border-b border-[#eadfce] bg-[linear-gradient(145deg,#fbf5e9_0%,#f2f7f2_52%,#edf4f7_100%)] px-5 py-7 sm:min-h-56 sm:px-7 ${className}`}
        role="img"
        aria-label={`Imagem do produto ${title} em breve. Veja detalhes na Amazon.`}
      >
        <span className="absolute -left-12 -top-14 size-40 rounded-full bg-[#f5dcca]/65 blur-sm" />
        <span className="absolute -bottom-16 -right-10 size-44 rounded-full bg-[#d7e9e5]/75 blur-sm" />
        <span className="absolute left-[14%] top-[18%] size-8 -rotate-12 rounded-lg border border-white/80 bg-[#f5cdb7]/70 shadow-sm" />
        <span className="absolute bottom-[16%] right-[13%] size-10 rotate-12 rounded-full border border-white/80 bg-[#cfe2ef]/75 shadow-sm" />

        <div className="relative w-full max-w-xs rounded-[1.4rem] border border-white/90 bg-white/72 px-5 py-5 text-center shadow-[0_16px_40px_rgba(73,58,39,0.08)] backdrop-blur-sm sm:px-6 sm:py-6">
          <div className="mx-auto flex w-fit items-end gap-1.5 text-teal-700">
            <span className="grid size-11 place-items-center rounded-xl bg-[#e5f1ed] shadow-sm ring-1 ring-teal-900/5">
              <Icon className="size-6" name="blocks" />
            </span>
            <span className="grid size-8 place-items-center rounded-lg bg-[#f8e9d5] text-amber-800 shadow-sm ring-1 ring-amber-900/5">
              <Icon className="size-4" name="puzzle" />
            </span>
            <span className="grid size-9 place-items-center rounded-xl bg-[#e8eef7] text-blue-700 shadow-sm ring-1 ring-blue-900/5">
              <Icon className="size-4" name="gift" />
            </span>
          </div>

          <p className="mt-4 text-sm font-bold tracking-[-0.01em] text-stone-800 sm:text-[0.95rem]">
            Imagem do produto em breve
          </p>
          <p className="mt-1.5 text-xs leading-5 text-stone-500">
            Veja detalhes na Amazon
          </p>
          <span className="mx-auto mt-4 block h-1 w-12 rounded-full bg-teal-600/70" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative aspect-[4/3] overflow-hidden bg-stone-100 ${className}`}>
      <Image
        src={imageUrl}
        alt={alt || title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
        className="object-contain p-4 transition duration-500 ease-out group-hover:scale-[1.03]"
      />
    </div>
  );
}
