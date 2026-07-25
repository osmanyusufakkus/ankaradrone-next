import { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "outline";
  icon?: ReactNode;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const VARIANT_CLASSES: Record<"primary" | "outline", string> = {
  primary:
    "bg-brand-blue text-white hover:bg-brand-blue-dark hover:shadow-[0_12px_36px_rgba(33,150,243,.35)]",
  outline:
    "border-1.5 border-white/25 font-semibold text-brand-offwhite hover:border-brand-blue hover:text-brand-blue",
};

export default function Button({
  children,
  variant = "primary",
  icon,
  className = "",
  ...anchorProps
}: ButtonProps) {
  return (
    <a
      {...anchorProps}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-pill px-10 py-4 text-sm font-bold tracking-wide transition-all duration-250 hover:-translate-y-0.75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${VARIANT_CLASSES[variant]} ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-20 bg-white/20 opacity-0 transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100"
      />
      {icon}
      <span className="relative">{children}</span>
    </a>
  );
}
