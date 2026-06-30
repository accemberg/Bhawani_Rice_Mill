"use client";

import { use, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Wheat, CheckCircle } from "lucide-react";

export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => {
        if (!r.ok) { setNotFound(true); setLoading(false); return null; }
        return r.json();
      })
      .then((data) => { if (data) { setProduct(data); setLoading(false); } })
      .catch(() => { setLoading(false); setNotFound(true); });
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--offwhite)" }}>
          <div className="spinner spinner-dark" style={{ width: 32, height: 32, borderWidth: 3 }} />
        </div>
        <Footer />
      </>
    );
  }

  if (notFound || !product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "var(--offwhite)" }}>
          <h2 className="font-heading font-bold text-3xl" style={{ color: "var(--green)" }}>Product not found</h2>
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: "var(--green)" }}>
            <ArrowLeft size={14} /> Back to Products
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const { name, category, description, sizes = [], applications = [], specs = {} } = product;

  return (
    <>
      <Navbar />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium mb-6"
            style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
          >
            <ArrowLeft size={14} /> All Products
          </Link>
          <p className="page-hero-eyebrow">{category}</p>
          <h1 className="page-hero-title">{name}</h1>
          <p className="page-hero-desc">{description}</p>
        </div>
      </section>

      {/* Detail Content */}
      <section style={{ background: "var(--offwhite)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Left — image placeholder */}
            <div
              className="rounded-2xl overflow-hidden flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, var(--green) 0%, var(--green-mid) 60%, #2a5940 100%)",
                minHeight: 400,
                border: "1px solid rgba(212,160,23,0.15)",
              }}
            >
              <Wheat size={120} color="white" strokeWidth={0.5} style={{ opacity: 0.2 }} />
            </div>

            {/* Right — details */}
            <div className="flex flex-col gap-8">

              {/* Sizes */}
              {sizes.length > 0 && (
                <div>
                  <p style={{ fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: "0.75rem" }}>
                    Available Sizes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <span
                        key={s}
                        className="font-bold"
                        style={{
                          padding: "0.4rem 1rem",
                          border: "1.5px solid rgba(27,67,50,0.2)",
                          borderRadius: "8px",
                          fontSize: "0.9rem",
                          color: "var(--green)",
                          background: "white",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Applications */}
              {applications.length > 0 && (
                <div>
                  <p style={{ fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: "0.75rem" }}>
                    Applications
                  </p>
                  <div className="flex flex-col gap-2">
                    {applications.map((app) => (
                      <div key={app} className="flex items-center gap-2" style={{ fontSize: "0.9rem", color: "rgba(26,26,26,0.65)" }}>
                        <CheckCircle size={15} style={{ color: "var(--green)", flexShrink: 0 }} />
                        {app}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specs Table */}
              {Object.keys(specs).length > 0 && (
                <div>
                  <p style={{ fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: "0.75rem" }}>
                    Technical Specifications
                  </p>
                  <div style={{ background: "white", borderRadius: "12px", border: "1px solid rgba(27,67,50,0.08)", overflow: "hidden" }}>
                    <table className="spec-table">
                      <tbody>
                        {specs.grainLength && (
                          <tr><td>Grain Length</td><td>{specs.grainLength}</td></tr>
                        )}
                        {specs.moisture && (
                          <tr><td>Moisture Content</td><td>{specs.moisture}</td></tr>
                        )}
                        {specs.brokenGrains && (
                          <tr><td>Broken Grains</td><td>{specs.brokenGrains}</td></tr>
                        )}
                        {specs.foreignMatter && (
                          <tr><td>Foreign Matter</td><td>{specs.foreignMatter}</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 font-bold text-sm px-8 py-4 rounded-full"
                  style={{ background: "var(--green)", color: "white", letterSpacing: "0.04em" }}
                >
                  Enquire Now <ArrowRight size={15} />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 font-bold text-sm px-8 py-4 rounded-full"
                  style={{ border: "1.5px solid rgba(27,67,50,0.2)", color: "var(--green)" }}
                >
                  <ArrowLeft size={15} /> Back to Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
