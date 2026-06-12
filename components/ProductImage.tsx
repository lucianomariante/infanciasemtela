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
        className={`relative isolate flex aspect-[4/3] items-center justify-center overflow-hidden bg-[linear-gradient(145deg,#f7ead8,#eef5ef)] ${className}`}
        role="img"
        aria-label={`Imagem do produto ${title} ainda não disponível`}
      >
        <span className="absolute -left-8 -top-8 size-28 rounded-full bg-[#fde2d1]/80" />
        <span className="absolute -bottom-10 -right-6 size-32 rounded-full bg-[#dbeafe]/70" />
        <span className="absolute right-8 top-8 size-10 rotate-12 rounded-lg bg-[#eadcc8]" />
        <div className="relative flex flex-col items-center gap-3 text-center text-teal-800">
          <span className="grid size-16 place-items-center rounded-2xl bg-white/80 shadow-sm ring-1 ring-white">
            <Icon className="size-8" name="blocks" />
          </span>
          <span className="rounded-full bg-white/75 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-stone-600">
            Imagem do produto em breve
          </span>
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
