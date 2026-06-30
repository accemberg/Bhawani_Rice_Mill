import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ background: "#0d1f14", color: "rgba(255,255,255,0.55)" }}>
      {/* Top strip — quote */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "3rem 1.5rem" }}>
        <div className="max-w-7xl mx-auto" style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, whiteSpace: "nowrap" }}>
            Our Promise
          </span>
          <div style={{ width: 40, height: 1, background: "rgba(212,160,23,0.3)", flexShrink: 0 }} />
          <p className="font-heading" style={{ fontStyle: "italic", fontSize: "clamp(1rem,2vw,1.2rem)", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, maxWidth: "50rem" }}>
            &ldquo;Forty years of craft in every grain; sorted, certified, and shipped to meet the world&apos;s most demanding standards.&rdquo;
          </p>
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
        {/* Brand */}
        <div>
          <a href="#" className="flex items-center gap-3 mb-5">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0" style={{ border: "1px solid rgba(212,160,23,0.35)" }}>
              <Image src="/logo.png" alt="Shri Shyam Bhog" fill sizes="36px" className="object-cover" />
            </div>
            <span className="font-heading text-white font-bold" style={{ fontSize: "0.95rem" }}>
              Shri Shyam Bhog
            </span>
          </a>
          <p style={{ fontSize: "0.85rem", lineHeight: 1.8, maxWidth: "15rem", color: "rgba(255,255,255,0.4)" }}>
            Premium milled rice from India&apos;s finest paddy belts. Supplying wholesalers,
            exporters, and institutional buyers across 30+ countries since 1985.
          </p>
        </div>

        {/* Company */}
        <div>
          <h4 style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: "1.25rem" }}>
            Company
          </h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {["About Us", "Our Story", "Careers", "Blog"].map((label) => (
              <li key={label}>
                <a
                  href={`#${label.toLowerCase().replace(" ", "-")}`}
                  style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", display: "inline-flex", alignItems: "center", gap: "0.35rem", transition: "color 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--gold)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: "1.25rem" }}>
            Products
          </h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {["Basmati Rice", "Non-Basmati Rice", "Katarni Rice", "Custom Blends"].map((label) => (
              <li key={label}>
                <a
                  href="#products"
                  style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", display: "inline-flex", alignItems: "center", gap: "0.35rem", transition: "color 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--gold)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: "1.25rem" }}>
            Get in Touch
          </h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { icon: Phone, label: "+91 98765 43210", href: "tel:+919876543210" },
              { icon: Mail, label: "info@bhawanirice.com", href: "mailto:info@bhawanirice.com" },
              { icon: MapPin, label: "Bihar, India", href: "#" },
            ].map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="flex items-start gap-2.5"
                  style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", transition: "color 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--gold)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
                >
                  <Icon size={15} style={{ marginTop: "2px", flexShrink: 0 }} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.2)" }}
        >
          <span>&copy; 2025 Shri Shyam Bhog. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#privacy" style={{ color: "rgba(255,255,255,0.2)", transition: "color 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.2)"}
            >Privacy Policy</a>
            <a href="#terms" style={{ color: "rgba(255,255,255,0.2)", transition: "color 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.2)"}
            >Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
