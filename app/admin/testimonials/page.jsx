"use client";

import { useEffect, useState } from "react";
import { getTestimonials } from "@/lib/firebase/testimonials";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getTestimonials();
      setTestimonials(data);
      setLoading(false);
    }
    loadData();
  }, []);

  function renderStars(rating) {
    const r = rating || 0;
    return "★".repeat(r) + "☆".repeat(5 - r);
  }

  if (loading) {
    return <div style={{ padding: "40px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Testimonials ({testimonials.length})</h1>
      <p style={{ color: "#888", marginBottom: "20px" }}>
        Add / edit / delete is managed via Adrija's API — this is a view-only list.
      </p>

      <div style={{ display: "grid", gap: "12px" }}>
        {testimonials.map((t) => (
          <div
            key={t.id}
            style={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <strong>{t.name || "Unnamed"}</strong>
            <p style={{ margin: "4px 0", color: "#D4A017" }}>{renderStars(t.rating)}</p>
            <p style={{ margin: "4px 0", color: "#555" }}>"{t.review}"</p>
          </div>
        ))}
        {testimonials.length === 0 && (
          <p style={{ color: "#888" }}>No testimonials yet</p>
        )}
      </div>
    </div>
  );
}