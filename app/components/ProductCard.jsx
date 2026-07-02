"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function ProductCard({ product }) {
  const name = product.name || product.Name || product['Name '];
  const category = product.category || product.Category;
  const description = product.description || product.Description;
  const sizes = product.sizes || product.Sizes || [];
  const applications = product.applications || product.Applications || [];
  const id = product.id;

  const getImageForCategory = (cat) => {
    if (!cat) return "/products/basmati.png";
    const c = cat.toLowerCase();
    if (c.includes("sella")) return "/products/sella.png";
    if (c.includes("steam")) return "/products/steam.png";
    if (c.includes("non-basmati")) return "/products/non_basmati.png";
    if (c.includes("value")) return "/products/value.png";
    if (c.includes("export")) return "/products/export.png";
    return "/products/basmati.png";
  };

  const getColorForCategory = (cat) => {
    if (!cat) return "var(--green-mid)";
    const c = cat.toLowerCase();
    if (c.includes("basmati") && !c.includes("non")) return "var(--gold)";
    if (c.includes("non-basmati")) return "var(--green)";
    if (c.includes("export")) return "#3b82f6";
    if (c.includes("value")) return "#f59e0b";
    return "var(--green-mid)";
  };

  const accentColor = getColorForCategory(category);
  const imagePath = getImageForCategory(category);

  return (
    <div className="product-grid-card relative group" style={{ borderLeft: `4px solid ${accentColor}` }}>
      {/* Real Image */}
      <div className="product-grid-img overflow-hidden relative" style={{ height: "200px" }}>
        <Image
          src={imagePath}
          alt={name || "Product image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Hover tint */}
        <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-[#d4a017]/20 mix-blend-overlay" />
        
        {/* Category tag overlay */}
        <span
          className="product-category-tag absolute bottom-3 right-3 shadow-sm bg-white/90 backdrop-blur-sm"
          style={{ margin: 0, border: "none", color: "var(--charcoal)" }}
        >
          {category}
        </span>
      </div>

      <div className="product-grid-body">
        <h3 className="product-grid-name">{name}</h3>
        <p className="product-grid-desc">{description}</p>

        {/* Sizes */}
        {sizes.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            {sizes.map((s) => (
              <span key={s} className="product-size-badge">{s}</span>
            ))}
          </div>
        )}

        <div className="product-grid-footer mt-auto pt-4 border-t border-black/5 flex items-center justify-between">
          <span style={{ fontSize: "0.72rem", color: "rgba(26,26,26,0.35)", letterSpacing: "0.05em" }}>
            {applications.slice(0, 2).join(" · ")}
          </span>
          <Link
            href={`/products/${id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors"
            style={{ color: "var(--green)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--green)")}
          >
            Details <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}

