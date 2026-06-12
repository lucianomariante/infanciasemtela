import { Icon } from "@/components/ui/Icon";

type RecommendationBadgeProps = {
  children: React.ReactNode;
  tone?: "blue" | "caramel" | "rose" | "teal";
};

const tones = {
  blue: "bg-blue-50 text-blue-800 ring-blue-100",
  caramel: "bg-amber-50 text-amber-800 ring-amber-100",
  rose: "bg-rose-50 text-rose-800 ring-rose-100",
  teal: "bg-teal-50 text-teal-800 ring-teal-100",
};

export function RecommendationBadge({
  children,
  tone = "teal",
}: RecommendationBadgeProps) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] ring-1 ${tones[tone]}`}
    >
      <Icon className="size-3.5" name="sparkles" />
      {children}
    </span>
  );
}
