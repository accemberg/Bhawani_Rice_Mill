export default function Card({ icon: Icon, title, description }) {
  return (
    <div className="feature-card-new">
      {Icon && (
        <div style={{ color: "var(--green)", marginBottom: "1rem" }}>
          <Icon size={28} strokeWidth={1.5} />
        </div>
      )}
      <h3
        className="font-heading font-bold"
        style={{ fontSize: "1.1rem", color: "var(--green)", marginBottom: "0.75rem" }}
      >
        {title}
      </h3>
      <p style={{ fontSize: "0.9rem", color: "rgba(26,26,26,0.6)", lineHeight: 1.7 }}>
        {description}
      </p>
    </div>
  );
}
