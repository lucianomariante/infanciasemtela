type SectionHeaderProps = {
  description?: string;
  eyebrow: string;
  id?: string;
  title: string;
};

export function SectionHeader({
  description,
  eyebrow,
  id,
  title,
}: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-stone-950 sm:text-3xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600">
          {description}
        </p>
      ) : null}
    </div>
  );
}
