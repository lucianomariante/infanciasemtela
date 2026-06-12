type IconName =
  | "arrow"
  | "blocks"
  | "check"
  | "external"
  | "gift"
  | "heart"
  | "puzzle"
  | "search"
  | "shield"
  | "sparkles"
  | "star";

type IconProps = {
  className?: string;
  name: IconName;
};

const paths: Record<IconName, React.ReactNode> = {
  arrow: <path d="m9 18 6-6-6-6m-4 6h10" />,
  blocks: (
    <>
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="8.5" y="14" rx="1" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  external: (
    <>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </>
  ),
  gift: (
    <>
      <rect width="18" height="14" x="3" y="8" rx="2" />
      <path d="M12 8v14M3 12h18M7.5 8C6 8 5 7 5 5.5S6 3 7.5 3C10 3 12 8 12 8s2-5 4.5-5C18 3 19 4 19 5.5S18 8 16.5 8" />
    </>
  ),
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />,
  puzzle: <path d="M19 13h-2.5a2.5 2.5 0 1 0 0 5H19v3H3v-6h3a2.5 2.5 0 1 0 0-5H3V3h6v2.5a2.5 2.5 0 1 0 5 0V3h5v10Z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm-3-10 2 2 4-5" />,
  sparkles: <path d="m12 3-1.3 3.7L7 8l3.7 1.3L12 13l1.3-3.7L17 8l-3.7-1.3L12 3ZM5 15l-.8 2.2L2 18l2.2.8L5 21l.8-2.2L8 18l-2.2-.8L5 15Zm14-2-.8 2.2-2.2.8 2.2.8L19 19l.8-2.2L22 16l-2.2-.8L19 13Z" />,
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
};

export function Icon({ className = "size-5", name }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {paths[name]}
    </svg>
  );
}
