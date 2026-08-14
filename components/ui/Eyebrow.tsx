type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

// A restrained section label: small accent dot + tracked text, no filled
// pill/border. Used instead of a badge on every section so the big display
// type carries more of the visual weight.
export default function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <div className={`mb-4 inline-flex items-center gap-2.5 ${className}`}>
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
      <span className="text-[11px] font-bold tracking-[4px] text-brand-blue uppercase">
        {children}
      </span>
    </div>
  );
}
