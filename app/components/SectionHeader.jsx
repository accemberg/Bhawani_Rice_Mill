export default function SectionHeader({
  eyebrow,
  heading,
  description,
  align = "center",
}) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col ${alignment} max-w-2xl mx-auto mb-12`}>
      {eyebrow && (
        <span className="text-brand-gold uppercase tracking-[0.2em] text-xs font-semibold mb-3">
          {eyebrow}
        </span>
      )}
      {heading && (
        <h2
          className="font-heading text-brand-green text-[clamp(1.5rem,5vw,3rem)] font-bold leading-tight mb-4"
          dangerouslySetInnerHTML={{ __html: heading }}
        />
      )}
      {description && (
        <p className="text-brand-charcoal/60 leading-relaxed text-[0.95rem] max-w-xl">
          {description}
        </p>
      )}
      <span className="block w-16 h-[0.1875rem] bg-brand-gold mt-6 rounded-full" />
    </div>
  );
}
