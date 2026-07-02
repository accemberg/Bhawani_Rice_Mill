"use client";

export default function CertificationsStrip() {
  const certs = [
    { id: 1, name: "FSSAI Certified", image: "/fssai.png", status: "active" },
    { id: 2, name: "ISO 22000:2018", image: "/iso.png", status: "active" },
    { id: 3, name: "AGMARK Certified", image: "/agmark.png", status: "active" },
  ];

  return (
    <section className="cert-section fade-in" id="certifications">
      {/* Top accent */}
      <div style={{ height: 3, background: "linear-gradient(90deg, var(--gold) 0%, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="flex flex-col lg:flex-row lg:items-center gap-10">
          {/* Label */}
          <div className="lg:w-56 shrink-0">
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: "0.6rem" }}>
              Our Certifications
            </p>
            <h2 className="font-heading font-bold" style={{ fontSize: "clamp(1.6rem,3.5vw,2.2rem)", lineHeight: 1.05, color: "var(--green)", letterSpacing: "-0.02em" }}>
              Trusted &<br />
              <em style={{ fontStyle: "italic", color: "var(--green-mid)" }}>Verified</em>
            </h2>
          </div>

          {/* Badges */}
          <div className="cert-strip flex-1">
            {certs.map((cert) => {
              const isActive = cert.status === "active";
              return (
                <div
                  key={cert.id}
                  className={`cert-badge ${isActive ? "active" : "coming-soon"}`}
                >
                  <div style={{ marginBottom: "0.5rem" }}>
                    <img src={cert.image} alt={cert.name} width={48} height={48} style={{ objectFit: 'contain' }} />
                  </div>
                  <div className="cert-name">{cert.name}</div>
                  <span className={`cert-status-pill ${isActive ? "active-pill" : "soon-pill"}`}>
                    {isActive ? "Certified" : "Coming Soon"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
