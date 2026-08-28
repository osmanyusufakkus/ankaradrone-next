import AnchorLink from "@/components/ui/AnchorLink";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "outline";
  icon?: ReactNode;
  className?: string;
};

/**
 * Either a link (`href` given) or a real button (no `href`). The old version
 * always rendered an `<a>`, which meant an href-less "button" was an anchor
 * with no destination — invisible to keyboard users and announced as a link
 * that goes nowhere.
 */
type ButtonProps =
  | (BaseProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">)
  | (BaseProps & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>);

const VARIANT_CLASSES: Record<"primary" | "outline", string> = {
  primary:
    "bg-brand-blue text-white hover:bg-brand-blue-dark hover:shadow-[0_12px_36px_rgba(33,150,243,.35)]",
  outline:
    "border-1.5 border-white/25 font-semibold text-brand-offwhite hover:border-brand-blue hover:text-brand-blue",
};

const BASE_CLASSES =
  "group relative inline-flex items-center gap-2 overflow-hidden rounded-pill px-10 py-4 text-sm font-bold tracking-wide transition-all duration-250 hover:-translate-y-0.75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";

export default function Button({
  children,
  variant = "primary",
  icon,
  className = "",
  ...rest
}: ButtonProps) {
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`;

  const content = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-20 bg-white/20 opacity-0 transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100"
      />
      {icon}
      <span className="relative">{children}</span>
    </>
  );

  if (rest.href === undefined) {
    const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button type="button" {...buttonProps} className={classes}>
        {content}
      </button>
    );
  }

  const { href, ...anchorProps } = rest as { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;

  // Site içi hedefler ("/projeler", "/#contact") AnchorLink'ten geçer: başka bir
  // sayfaya gidiyorsa client-side geçiş yapar, hedef çapa zaten bulunduğumuz
  // sayfadaysa düz <a>'ya düşer (yoksa aynı çapaya ikinci tıklama kaydırmaz).
  // Geri kalan her şey — "#hash", mailto:, tel:, dış adresler — düz anchor.
  if (href.startsWith("/")) {
    return (
      <AnchorLink href={href} {...anchorProps} className={classes}>
        {content}
      </AnchorLink>
    );
  }

  return (
    <a href={href} {...anchorProps} className={classes}>
      {content}
    </a>
  );
}
