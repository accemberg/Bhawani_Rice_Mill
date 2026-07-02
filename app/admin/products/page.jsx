"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/firebase/products";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return <div style={{ padding: "40px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Products ({products.length})</h1>
      <p style={{ color: "#888", marginBottom: "20px" }}>
        Add / edit / delete is managed via Adrija's API — this is a view-only list.
      </p>

      <div style={{ display: "grid", gap: "12px" }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{ padding: "16px", border: "1px solid #ccc", borderRadius: "8px" }}
          >
            <strong>{p.Name || "Unnamed Product"}</strong>
            <p style={{ margin: "4px 0", fontSize: "14px", color: "#555" }}>
              Category: {p.Category || "—"} · Price: {p.Price != null ? `₹${p.Price}` : "—"} · In stock: {p.instock ? "Yes" : "No"}
            </p>
            <p style={{ margin: "4px 0", color: "#555" }}>{p.description}</p>
            <p style={{ margin: "4px 0", fontSize: "13px", color: "#888" }}>
              Spec PDF: {p.specPdfUrl || "—"}
            </p>
          </div>
        ))}
        {products.length === 0 && <p style={{ color: "#888" }}>No products yet</p>}
      </div>
    </div>
  );
}