"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Button from "./Button";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`nav-accent fixed top-0 inset-x-0 z-50 transition-shadow duration-300 ${
        scrolled ? "scrolled shadow-lg" : ""
      }`}
      style={{ backgroundColor: "#1B4332" }}
    >
      {/* ── Desktop & Tablet bar ── */}
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-8 lg:px-16">

        {/* Logo — pinned LEFT */}
        <a href="#" className="flex items-center gap-3 shrink-0">
          <span
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
            style={{ backgroundColor: "#D4A017", color: "#1B4332" }}
          >
            S
          </span>
          <span className="font-heading text-white text-lg font-bold tracking-tight leading-tight">
            Shri Shyam Bhog
          </span>
        </a>

        {/* Desktop links — centered (hidden on mobile) */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="nav-link text-white/80 text-sm font-medium hover:text-white transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side — CTA + hamburger */}
        <div className="flex items-center gap-3">
          {/* Get a Quote — visible on desktop */}
          <Button
            variant="primary"
            className="hidden md:inline-flex text-sm font-semibold tracking-wide px-5 py-2.5"
          >
            Get a Quote
          </Button>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden text-white p-1.5 rounded"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div
        className={`md:hidden border-t overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-screen" : "max-h-0"
        }`}
        style={{ borderColor: "rgba(255,255,255,0.12)", backgroundColor: "#163828" }}
      >
        <ul className="flex flex-col px-5 py-5 gap-1">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="block text-white/80 text-base font-medium hover:text-white py-3 border-b transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-4">
            <Button
              variant="primary"
              className="w-full text-sm font-semibold py-3"
              onClick={() => setMobileOpen(false)}
            >
              Get a Quote
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
