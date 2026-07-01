"use client";

import { use, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Wheat, CheckCircle,
  Download, FileText, SendHorizonal, PackageCheck,
} from "lucide-react";
import mockProducts from "../../../mock/products.json";

export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setLoading(true);
    setActiveImg(0);
    fetch(`/api/products/${id}`)
      .then((r) => {
        if (!r.ok) { throw new Error("Not found"); }
        return r.json();
      })
      .then((data) => {
        const name = data && (data.name || data.Name || data['Name ']);
        if (data && name) {
          setProduct(data);
          setNotFound(false);
        } else {
          throw new Error("Empty data");
        }
        setLoading(false);
      })
      .catch(() => {
        // Fallback to mock data
        const mockProduct = mockProducts.find(p => p.id === id);
        if (mockProduct) {
          setProduct(mockProduct);
          setNotFound(false);
        } else {
          setNotFound(true);
        }
        setLoading(false);
      });
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

  const name = product.name || product.Name || product['Name '];
  const category = product.category || product.Category;
  const description = product.description || product.Description;
  const sizes = product.sizes || product.Sizes || [];
  const applications = product.applications || product.Applications || [];
  const specs = product.specs || product.Specs || {};
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

  let rawImages = product.images || product.Images || product[' images'] || [];
  if (!Array.isArray(rawImages)) rawImages = [rawImages];
  
  const images = rawImages.map(img => {
    if (typeof img === 'string' && (img.startsWith('http') || img.startsWith('/'))) {
      return img;
    }
    return getImageForCategory(category);
  });
  
  if (images.length === 0) images.push(getImageForCategory(category));
  const specPdfUrl = product.specPdfUrl || product.SpecPdfUrl || product[' specPdfUrl'];
  
  const specEntries = Object.entries(specs);
  const hasImage = images.length > 0 && images[0] && images[0] !== "/placeholder.jpg";

  return (
    <>
      <Navbar />

      {/* ─── Page Hero ─── */}
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

      {/* ─── Detail Content ─── */}
      <section style={{ background: "var(--offwhite)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* ── Left: Image panel ── */}
            <div className="flex flex-col gap-3">
              {/* Main image */}
              <div
                className="rounded-2xl overflow-hidden relative"
                style={{
                  minHeight: 420,
                  border: "1px solid rgba(27,67,50,0.1)",
                  background: "linear-gradient(135deg, var(--green) 0%, var(--green-mid) 60%, #2a5940 100%)",
                }}
              >
                {hasImage ? (
                  <Image
                    src={images[activeImg]}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Wheat size={120} color="white" strokeWidth={0.5} style={{ opacity: 0.2 }} />
                  </div>
                )}

                {/* Category badge */}
                <span
                  className="absolute top-4 left-4 font-bold"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    background: "var(--gold)",
                    color: "#111",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "999px",
                  }}
                >
                  {category}
                </span>
              </div>

              {/* Thumbnail strip — only if multiple images */}
              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      id={`thumb-${i}`}
                      onClick={() => setActiveImg(i)}
                      className="rounded-lg overflow-hidden relative shrink-0"
                      style={{
                        width: 72,
                        height: 72,
                        border: i === activeImg
                          ? "2px solid var(--gold)"
                          : "2px solid rgba(27,67,50,0.12)",
                        background: "var(--green)",
                        transition: "border-color 0.2s",
                        padding: 0,
                        cursor: "pointer",
                      }}
                    >
                      <Image src={img} alt={`${name} view ${i + 1}`} fill sizes="72px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Download Spec Sheet */}
              <div
                className="rounded-xl p-5 flex items-center gap-4"
                style={{ background: "white", border: "1px solid rgba(27,67,50,0.08)" }}
              >
                <div
                  className="shrink-0 rounded-xl flex items-center justify-center"
                  style={{ width: 44, height: 44, background: "rgba(27,67,50,0.07)", color: "var(--green)" }}
                >
                  <FileText size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm" style={{ color: "var(--green)" }}>Product Spec Sheet</p>
                  <p style={{ fontSize: "0.75rem", color: "rgba(26,26,26,0.45)", marginTop: "0.15rem" }}>
                    {specPdfUrl ? "PDF ready to download" : "Available upon request — contact us"}
                  </p>
                </div>
                {specPdfUrl ? (
                  <a
                    href={specPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="download-spec-btn"
                    className="inline-flex items-center gap-2 font-bold text-sm px-4 py-2 rounded-full shrink-0"
                    style={{ background: "var(--green)", color: "white", letterSpacing: "0.03em" }}
                  >
                    <Download size={14} /> Download
                  </a>
                ) : (
                  <button
                    id="download-spec-btn-disabled"
                    disabled
                    className="inline-flex items-center gap-2 font-bold text-sm px-4 py-2 rounded-full shrink-0"
                    style={{
                      background: "rgba(27,67,50,0.06)",
                      color: "rgba(27,67,50,0.35)",
                      cursor: "not-allowed",
                      letterSpacing: "0.03em",
                    }}
                    title="Spec sheet not yet uploaded — contact us for details"
                  >
                    <Download size={14} /> Download
                  </button>
                )}
              </div>
            </div>

            {/* ── Right: Details ── */}
            <div className="flex flex-col gap-8">

              {/* Sizes */}
              {sizes.length > 0 && (
                <div>
                  <p className="prod-detail-label">Available Sizes</p>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <span key={s} className="prod-size-pill">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Applications */}
              {applications.length > 0 && (
                <div>
                  <p className="prod-detail-label">Applications</p>
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

              {/* Specs Table — fully dynamic */}
              {specEntries.length > 0 && (
                <div>
                  <p className="prod-detail-label">Technical Specifications</p>
                  <div style={{ background: "white", borderRadius: "12px", border: "1px solid rgba(27,67,50,0.08)", overflow: "hidden" }}>
                    <table className="spec-table">
                      <tbody>
                        {specEntries.map(([key, val]) => (
                          <tr key={key}>
                            <td>{key}</td>
                            <td>{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/contact"
                  id="request-quotation-cta"
                  className="inline-flex items-center justify-center gap-2 font-bold text-sm px-8 py-4 rounded-full"
                  style={{ background: "var(--gold)", color: "#111", letterSpacing: "0.04em" }}
                >
                  <SendHorizonal size={15} /> Request Quotation
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 font-bold text-sm px-8 py-4 rounded-full"
                  style={{ background: "var(--green)", color: "white", letterSpacing: "0.04em" }}
                >
                  <PackageCheck size={15} /> Enquire Now
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 font-bold text-sm px-6 py-4 rounded-full"
                  style={{ border: "1.5px solid rgba(27,67,50,0.2)", color: "var(--green)" }}
                >
                  <ArrowLeft size={15} /> All Products
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
