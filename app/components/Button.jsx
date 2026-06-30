export default function Button({
  variant = "primary",
  children,
  className = "",
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center font-semibold tracking-wide rounded-sm transition-colors duration-200 cursor-pointer";

  const variants = {
    primary:
      "bg-brand-gold text-brand-charcoal border-2 border-brand-gold hover:bg-brand-gold-dark hover:border-brand-gold-dark",
    secondary:
      "bg-transparent text-brand-green border-2 border-brand-green hover:bg-brand-green hover:text-white",
    ghost: "bg-transparent text-brand-charcoal border-0 btn-ghost",
  };

  const sizes = {
    primary: "px-6 py-3 text-sm",
    secondary: "px-6 py-3 text-sm",
    ghost: "px-2 py-1 text-sm",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
