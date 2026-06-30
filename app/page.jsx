"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StatsBar from "./components/StatsBar";
import CertificationsStrip from "./components/CertificationsStrip";
import TestimonialsSection from "./components/TestimonialsSection";
import BlogPreview from "./components/BlogPreview";
import Image from "next/image";
import {
  CircleCheck, Globe, Building2, VolumeX, Volume2,
  Award, Leaf, Star, ArrowRight, MapPin
} from "lucide-react";

export default function HomePage() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <>
      <Navbar />

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="hero-section relative w-full overflow-hidden" id="home">
        {/* Video BG */}
        <video
          ref={videoRef}
          src="/vid.mp4"
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="grain-overlay absolute inset-0 pointer-events-none" />

        {/* Year watermark background */}
        <div
          className="hero-year-watermark absolute select-none pointer-events-none"
          style={{ bottom: "-2rem", right: "-1rem", zIndex: 3 }}
          aria-hidden="true"
        >
          1985
        </div>

        {/* Main content — left-aligned, not centered */}
        <div
          className="relative flex flex-col justify-end pb-20 px-6 sm:px-12 lg:px-20 min-h-screen"
          style={{ zIndex: 10 }}
        >
          {/* Eyebrow tag */}
          <div className="hero-tag mb-6">
            <span style={{ width: 40, height: 2, background: "var(--gold)", display: "inline-block" }} />
            Est. 1985 &mdash; Bihar, India
          </div>

          {/* Heading */}
          <h1 className="hero-heading font-heading text-white font-bold mb-6 max-w-3xl">
            <span style={{ display: "block" }}>Shri</span>
            <span style={{ display: "block", color: "var(--gold)" }}>Shyam</span>
            <span style={{ display: "block", fontStyle: "italic", fontSize: "0.65em", opacity: 0.85, fontWeight: 400 }}>Bhog</span>
          </h1>

          {/* Desc + stats row */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-20">
            <p className="hero-desc text-white/65 max-w-sm">
              From India&apos;s paddy fields to 30+ countries precision-milled,
              phytosanitary-certified, packed to international standards.
            </p>

            {/* Stats — horizontal bar */}
            <div className="flex gap-10 sm:gap-14">
              {[
                { value: "40+", label: "Years" },
                { value: "30+", label: "Countries" },
                { value: "100%", label: "Certified" },
              ].map((s) => (
                <div key={s.label} className="stat-item">
                  <div className="stat-value font-heading text-white font-black">{s.value}</div>
                  <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginTop: "0.25rem" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-full"
              style={{ background: "var(--gold)", color: "#111", letterSpacing: "0.04em" }}
            >
              Get a Quote <ArrowRight size={15} />
            </a>
            <a
              href="#products"
              className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-full"
              style={{ border: "1.5px solid rgba(255,255,255,0.3)", color: "white" }}
            >
              View Products
            </a>
          </div>

          
        </div>

        {/* Mute toggle */}
        <button onClick={toggleMute} id="hero-mute-btn" className="mute-btn" aria-label={muted ? "Unmute" : "Mute"}>
          {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      </section>

      {/* ═══════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════ */}
      <StatsBar />

      {/* ═══════════════════════════════════════
          ABOUT — asymmetric, editorial
      ═══════════════════════════════════════ */}
      <section className="about-section" id="about">
        {/* Top accent strip */}
        <div style={{ height: 4, background: "linear-gradient(90deg, var(--gold) 0%, transparent 60%)" }} />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
          {/* Header row — two columns, not centered */}
          <div className="grid lg:grid-cols-2 gap-12 items-end mb-20 fade-in">
            <div>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: "1rem" }}>
                Why Choose Us
              </p>
              <h2 className="font-heading font-bold" style={{ fontSize: "clamp(2.2rem,6vw,4.5rem)", lineHeight: 1, letterSpacing: "-0.03em", color: "var(--green)" }}>
                Decades of<br />
                <em style={{ fontStyle: "italic", color: "var(--green-mid)" }}>agricultural</em><br />
                excellence
              </h2>
            </div>
            <div style={{ paddingBottom: "0.5rem" }}>
              <p style={{ color: "rgba(26,26,26,0.6)", lineHeight: 1.8, fontSize: "0.95rem", maxWidth: "28rem" }}>
                From farm to freight — we control every step so our buyers never worry about
                consistency or supply. Forty years of craft in every grain.
              </p>
              {/* Decorative number */}
              <div className="about-num" style={{ marginTop: "1.5rem" }}>40</div>
            </div>
          </div>

          {/* Feature cards — staggered, not equal grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: CircleCheck,
                num: "01",
                title: "Hand-Sorted, Single-Origin",
                body: "Every batch double-sorted for moisture, grain length, and purity before it leaves our facility.",
              },
              {
                icon: Globe,
                num: "02",
                title: "30+ Export Destinations",
                body: "Phytosanitary-certified and packed to international standards : Middle East, Europe, Southeast Asia.",
                offset: true,
              },
              {
                icon: Building2,
                num: "03",
                title: "Precision Milling",
                body: "Modern colour-sorters and destoners guarantee consistent grain integrity with zero contamination.",
              },
            ].map(({ icon: Icon, num, title, body, offset }) => (
              <div
                key={num}
                className="feature-card-new fade-in"
                style={{ marginTop: offset ? "3rem" : 0 }}
              >
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "var(--gold)", fontWeight: 700, marginBottom: "1.25rem" }}>
                  {num}
                </div>
                <div style={{ color: "var(--green)", marginBottom: "1rem" }}>
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-heading font-bold" style={{ fontSize: "1.15rem", color: "var(--green)", marginBottom: "0.75rem" }}>
                  {title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "rgba(26,26,26,0.6)", lineHeight: 1.7 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CERTIFICATIONS
      ═══════════════════════════════════════ */}
      <CertificationsStrip />

      {/* ═══════════════════════════════════════
          PRODUCTS
      ═══════════════════════════════════════ */}
      <section className="products-section" id="products">
        <div style={{ background: "var(--offwhite)", paddingBottom: "1px" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-4 pb-24">
            {/* Section label row */}
            <div className="flex items-center justify-between mb-16 fade-in">
              <div>
                <p style={{ fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: "0.75rem" }}>
                  Our Products
                </p>
                <h2 className="font-heading font-bold" style={{ fontSize: "clamp(2rem,5.5vw,4rem)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--green)" }}>
                  Crafted for the<br />
                  <em style={{ fontStyle: "italic" }}>World&apos;s Finest Tables</em>
                </h2>
              </div>
              <a
                href="#contact"
                className="hidden lg:inline-flex items-center gap-2 text-sm font-bold"
                style={{ color: "var(--green)", borderBottom: "2px solid var(--gold)", paddingBottom: "0.25rem" }}
              >
                Enquire <ArrowRight size={14} />
              </a>
            </div>

            {/* Product 1 — Full Range */}
            <div className="product-card fade-in mb-10 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(212,160,23,0.12)" }}>
              <div className="grid lg:grid-cols-2">
                {/* Image */}
                <div className="relative overflow-hidden" style={{ minHeight: 420 }}>
                  <Image
                    src="/all product.png"
                    alt="All Shri Shyam Bhog Products"
                    fill
                    priority
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover"
                    style={{ transition: "transform 0.7s ease" }}
                  />
                  <div className="product-img-overlay absolute inset-0" />
                  <span
                    className="product-badge absolute bottom-5 left-5 px-3 py-1 rounded-sm"
                  >
                    Full Range
                  </span>
                </div>

                {/* Content — left aligned, no center */}
                <div className="p-10 lg:p-14 flex flex-col justify-between" style={{ background: "var(--offwhite)" }}>
                  <div>
                    <p style={{ fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: "0.75rem" }}>
                      Complete Collection
                    </p>
                    <h3 className="font-heading font-bold" style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", lineHeight: 1.1, color: "var(--green)", marginBottom: "1.25rem" }}>
                      Our Full<br />Product Range
                    </h3>
                    <p style={{ fontSize: "0.9rem", color: "rgba(26,26,26,0.6)", lineHeight: 1.8, maxWidth: "28rem" }}>
                      From aromatic long-grain basmati to export-grade non-basmati varieties
                      every product in our portfolio is sourced from India&apos;s finest paddy belts
                      and processed with precision milling technology.
                    </p>
                  </div>

                  {/* Badges — horizontal, not grid */}
                  <div className="flex flex-wrap gap-2 mt-8 mb-8">
                    {[
                      { icon: Award, text: "FSSAI" },
                      { icon: Leaf, text: "Farm-to-Pack" },
                      { icon: Star, text: "Export Grade" },
                      { icon: CircleCheck, text: "ISO" },
                    ].map(({ icon: Icon, text }) => (
                      <span
                        key={text}
                        className="flex items-center gap-1.5 text-xs font-semibold"
                        style={{ border: "1px solid rgba(27,67,50,0.18)", borderRadius: "999px", padding: "0.3rem 0.75rem", color: "var(--green)" }}
                      >
                        <Icon size={12} style={{ color: "var(--gold)" }} />
                        {text}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 self-start font-bold text-sm px-6 py-3 rounded-full"
                    style={{ background: "var(--green)", color: "white", letterSpacing: "0.03em" }}
                  >
                    Enquire Now <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Product 2 — Katarni (reversed, dark bg) */}
            <div className="product-card fade-in rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(212,160,23,0.12)" }}>
              <div className="grid lg:grid-cols-2">
                {/* Content left on desktop */}
                <div
                  className="p-10 lg:p-14 flex flex-col justify-between order-2 lg:order-1"
                  style={{ background: "var(--green)" }}
                >
                  <div>
                    <p style={{ fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: "0.75rem" }}>
                      Signature Variety
                    </p>
                    <h3 className="font-heading font-bold" style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", lineHeight: 1.05, color: "white", marginBottom: "0.5rem" }}>
                      Katarni Rice
                    </h3>
                    <p className="font-heading" style={{ fontSize: "1rem", fontStyle: "italic", color: "var(--gold)", marginBottom: "1.25rem", fontWeight: 400 }}>
                      Bihar&apos;s Pride — GI Tagged
                    </p>
                    <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: "28rem" }}>
                      Katarni rice is Bihar&apos;s most treasured short-grain aromatic variety.
                      GI-tagged, hand-harvested in the Bhagalpur region for centuries. Minimally
                      processed to preserve its natural character.
                    </p>
                  </div>

                  {/* Specs — two column list, not card grid */}
                  <div
                    style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "2rem", paddingTop: "1.5rem" }}
                  >
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {[
                        { label: "Origin", value: "Bhagalpur, Bihar" },
                        { label: "Type", value: "Short Grain Aromatic" },
                        { label: "Certification", value: "GI Tagged" },
                        { label: "Process", value: "Hand-Harvested" },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.3rem" }}>
                            {label}
                          </div>
                          <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "white" }}>{value}</div>
                        </div>
                      ))}
                    </div>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-full"
                      style={{ background: "var(--gold)", color: "#111", letterSpacing: "0.03em" }}
                    >
                      Order Katarni <ArrowRight size={14} />
                    </a>
                  </div>
                </div>

                {/* Image right */}
                <div className="relative overflow-hidden order-1 lg:order-2" style={{ minHeight: 420 }}>
                  <Image
                    src="/katarnirice.png"
                    alt="Katarni Rice — GI Tagged"
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="product-img-overlay absolute inset-0" />
                  <span
                    className="gi-badge absolute top-5 right-5 px-3 py-1 rounded-sm flex items-center gap-1.5"
                  >
                    <Star size={10} fill="currentColor" /> GI Tagged
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MILL / PROCESS — dark section
      ═══════════════════════════════════════ */}
      <section className="mill-section" id="mill">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
          {/* Header — inline with "Inside Our Mill" rotated label */}
          <div className="flex gap-8 items-start mb-16 fade-in">
            <div className="side-label mt-4 hidden md:block" style={{ color: "rgba(212,160,23,0.6)" }}>
              Bhawani Rice Mill
            </div>
            <div>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: "1rem" }}>
                Inside Our Mill
              </p>
              <h2 className="font-heading font-bold" style={{ fontSize: "clamp(2rem,6vw,4rem)", lineHeight: 1, letterSpacing: "-0.02em", color: "white" }}>
                Witness the<br />
                <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Art of Milling</em>
              </h2>
            </div>
          </div>

          {/* Video */}
          <div
            className="rounded-2xl overflow-hidden relative fade-in mb-16"
            style={{ border: "1px solid rgba(212,160,23,0.15)" }}
          >
            <video
              src="/vid.mp4"
              autoPlay muted loop playsInline
              className="w-full"
              style={{ maxHeight: 560, objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Process steps — horizontal scrollable strip */}
          <div className="process-strip fade-in rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            {[
              { step: "01", title: "Paddy Sourcing", desc: "Direct from farm, hand-picked from select belts across Bihar" },
              { step: "02", title: "Cleaning & Drying", desc: "Moisture-controlled drying to optimal levels" },
              { step: "03", title: "Precision Milling", desc: "Colour-sorters for zero contamination guaranteed" },
              { step: "04", title: "Export Packing", desc: "Phytosanitary certified, vacuum-sealed for global markets" },
            ].map(({ step, title, desc }) => (
              <div key={step} className="process-item">
                <div className="process-num">{step}</div>
                <h4 className="font-heading font-bold" style={{ color: "white", fontSize: "1rem", marginBottom: "0.6rem" }}>
                  {title}
                </h4>
                <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════ */}
      <TestimonialsSection />

      {/* ═══════════════════════════════════════
          BLOG PREVIEW
      ═══════════════════════════════════════ */}
      <BlogPreview />

      {/* ═══════════════════════════════════════
          CTA BAND — dark, big type
      ═══════════════════════════════════════ */}
      <section className="cta-band fade-in" id="contact">
        <div className="cta-band-bg" aria-hidden="true" />
        {/* Giant background text */}
        <div
          className="cta-big-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
          aria-hidden="true"
        >
          RICE
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — headline */}
            <div>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: "1.25rem" }}>
                Ready to Source?
              </p>
              <h2 className="font-heading font-bold" style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)", lineHeight: 0.95, letterSpacing: "-0.03em", color: "white" }}>
                Premium<br />
                Rice,<br />
                <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Delivered.</em>
              </h2>
            </div>

            {/* Right — copy + buttons */}
            <div>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "28rem" }}>
                Join 200+ importers and wholesalers who trust Shri Shyam Bhog for consistent
                quality and on-time delivery across the globe.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:info@bhawanirice.com"
                  className="inline-flex items-center gap-2 font-bold text-sm px-8 py-4 rounded-full"
                  style={{ background: "var(--gold)", color: "#111", letterSpacing: "0.04em" }}
                >
                  Get a Quote Now <ArrowRight size={15} />
                </a>
                <a
                  href="mailto:info@bhawanirice.com"
                  className="inline-flex items-center gap-2 font-bold text-sm px-8 py-4 rounded-full"
                  style={{ border: "1.5px solid rgba(255,255,255,0.2)", color: "white" }}
                >
                  Email Us
                </a>
              </div>

              {/* Contact details */}
              <div className="flex flex-wrap gap-6 mt-10">
                {[
                  { icon: MapPin, text: "Bihar, India" },
                  { icon: Globe, text: "30+ countries served" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2" style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)" }}>
                    <Icon size={14} style={{ color: "var(--gold)" }} />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
