export default function Card({ icon: Icon, title, description }) {
  return (
    <div className="feature-card bg-white rounded-lg p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      {Icon && (
        <div className="mb-5 text-brand-gold">
          <Icon size={32} strokeWidth={1.5} />
        </div>
      )}
      <h3 className="font-heading text-xl font-bold text-brand-green mb-3">
        {title}
      </h3>
      <p className="text-brand-charcoal/70 leading-relaxed text-[0.95rem]">
        {description}
      </p>
    </div>
  );
}
