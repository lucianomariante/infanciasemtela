import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

type GuideCardProps = {
  description: string;
  href: string;
  icon?: "blocks" | "gift" | "heart" | "puzzle" | "sparkles";
  title: string;
};

export function GuideCard({
  description,
  href,
  icon = "sparkles",
  title,
}: GuideCardProps) {
  return (
    <Link
      href={href}
      className="group flex min-h-56 flex-col rounded-[1.35rem] border border-[#e7dccb] bg-white p-6 shadow-[0_12px_35px_rgba(73,58,39,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#d4b98f] hover:shadow-[0_18px_45px_rgba(73,58,39,0.12)] focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-4 focus:ring-offset-[#faf7f0]"
    >
      <span className="grid size-11 place-items-center rounded-2xl bg-[#f6eee2] text-amber-800 transition group-hover:bg-amber-100">
        <Icon name={icon} />
      </span>
      <h3 className="mt-6 text-xl font-semibold leading-7 tracking-[-0.02em] text-stone-950">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-stone-600">
        {description}
      </p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-teal-700">
        Ver guia
        <Icon className="size-4 transition group-hover:translate-x-1" name="arrow" />
      </span>
    </Link>
  );
}
