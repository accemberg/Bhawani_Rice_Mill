"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import mockProducts from "../../mock/products.json";

const CATEGORIES = [
  { key: "all",        label: "All Products" },
  { key: "basmati",    label: "Basmati" },
];

export default function ProductsPage({ searchParams }) {
  const { category: catParam = "all" } = use(searchParams);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(catParam);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const url = activeCategory === "all"
      ? "/api/products"
      : `/api/products?category=${activeCategory}`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          const fallback = activeCategory === "all"
            ? mockProducts
            : mockProducts.filter((p) => p.category === activeCategory);
          setProducts(fallback);
        }
        setLoading(false);
      })
      .catch(() => {
        const fallback = activeCategory === "all"
          ? mockProducts
          : mockProducts.filter((p) => p.category === activeCategory);
        setProducts(fallback);
        setLoading(false);
      });
  }, [activeCategory]);

  const handleCategory = (key) => {
    setActiveCategory(key);
    router.push(key === "all" ? "/products" : `/products?category=${key}`, { scroll: false });
  };

  return (
    <>
      <Navbar />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <p className="page-hero-eyebrow">Our Range</p>
          <h1 className="page-hero-title">
            Premium Rice<br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Products</em>
          </h1>
          <p className="page-hero-desc">
            From aromatic long-grain basmati to GI-tagged Katarni — every variety precision-milled
            and phytosanitary-certified for domestic and global markets.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-page-section">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">

          {/* Filter Tabs */}
          <div className="filter-tabs">
            {CATEGORIES.map(({ key, label }) => (
              <button
                key={key}
                className={`filter-tab ${activeCategory === key ? "active" : ""}`}
                onClick={() => handleCategory(key)}
                id={`filter-${key}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="spinner spinner-dark" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24" style={{ color: "rgba(26,26,26,0.4)" }}>
              No products found in this category.
            </div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* CTA */}
          <div
            className="mt-16 rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: "var(--green)", border: "1px solid rgba(212,160,23,0.2)" }}
          >
            <div>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: "0.5rem" }}>
                Ready to order?
              </p>
              <h3 className="font-heading font-bold text-white" style={{ fontSize: "clamp(1.4rem,3vw,2rem)", lineHeight: 1.1 }}>
                Request a product spec sheet or quote
              </h3>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-bold text-sm px-8 py-4 rounded-full shrink-0"
              style={{ background: "var(--gold)", color: "#111", letterSpacing: "0.04em" }}
            >
              Get a Quote <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
