"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Mill", href: "#mill" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "nav-scrolled" : "nav-top"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-10 lg:px-16 h-[68px]">

        {/* Logo */}
        <a href="#" className="flex items-center gap-3 shrink-0" id="nav-logo">
          <div
            className="relative w-9 h-9 overflow-hidden shrink-0"
            style={{ borderRadius: "8px", border: "1px solid rgba(212,160,23,0.4)" }}
          >
            <Image src="/logo.png" alt="Shri Shyam Bhog" fill sizes="36px" className="object-cover" priority />
          </div>
          <div style={{ lineHeight: 1 }}>
            <span
              className="font-heading text-white font-bold block"
              style={{ fontSize: "0.95rem", letterSpacing: "0.01em" }}
            >
              Shri Shyam Bhog
            </span>
            <span
              style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(212,160,23,0.7)", display: "block", marginTop: "2px" }}
            >
              Est. 1985
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-0">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={() => setActive(l.label)}
                className="relative block px-4 py-2 text-sm font-medium transition-colors duration-200"
                style={{
                  color: active === l.label ? "white" : "rgba(255,255,255,0.5)",
                }}
              >
                {l.label}
                {active === l.label && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "4px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "var(--gold)",
                      display: "block",
                    }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-1.5 text-xs font-medium"
            style={{ color: "rgba(255,255,255,0.45)", transition: "color 0.2s" }}
          >
            <Phone size={12} />
            +91 98765 43210
          </a>
          <a
            href="#contact"
            id="nav-cta-btn"
            className="nav-cta-btn px-5 py-2 text-xs rounded-full"
          >
            Get a Quote
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-md"
          style={{ background: "rgba(255,255,255,0.07)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`hamburger-line ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`hamburger-line ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[380px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ background: "#0d2218", borderTop: "1px solid rgba(212,160,23,0.12)" }}
      >
        <ul className="px-6 pt-4 pb-2 flex flex-col gap-0.5">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={() => { setActive(l.label); setMobileOpen(false); }}
                className="flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all"
                style={{
                  color: active === l.label ? "white" : "rgba(255,255,255,0.55)",
                  background: active === l.label ? "rgba(255,255,255,0.06)" : "transparent",
                  borderLeft: active === l.label ? "2px solid var(--gold)" : "2px solid transparent",
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="px-6 pb-5 pt-1">
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="nav-cta-btn block text-center w-full px-5 py-3 text-sm rounded-full"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </header>
  );
}
