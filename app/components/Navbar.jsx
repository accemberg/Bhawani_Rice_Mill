"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home",           href: "/" },
  { label: "Products",       href: "/products" },
  { label: "Quality",        href: "/quality" },
  { label: "Gallery",        href: "/gallery" },
  { label: "Careers",        href: "/careers" },
  { label: "Contact",        href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "nav-scrolled" : "nav-top"
      }`}
    >
      <nav className="w-full relative flex items-center justify-between px-4 sm:px-6 lg:px-8 h-[68px]">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" id="nav-logo">
          {/* Circular Logo Emblem */}
          <div
            className="relative shrink-0 transition-transform duration-300 hover:scale-105"
            style={{ width: 56, height: 56 }}
          >
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ borderRadius: "50%", border: "1.5px solid var(--gold)" }}
            >
              <Image src="/logo.png" alt="Shri Shyam Bhog" fill sizes="56px" className="object-cover" priority />
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-0 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className="relative block px-4 py-2 text-sm font-medium transition-colors duration-200"
                style={{
                  color: isActive(l.href) ? "white" : "rgba(255,255,255,0.5)",
                }}
              >
                {l.label}
                {isActive(l.href) && (
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
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="tel:+917320834390"
            className="flex items-center gap-1.5 text-xs font-medium"
            style={{ color: "rgba(255,255,255,0.45)", transition: "color 0.2s" }}
          >
            <Phone size={12} />
            +91 73208 34390
          </a>
          <Link
            href="/contact"
            id="nav-cta-btn"
            className="nav-cta-btn px-5 py-2 text-xs rounded-full"
          >
            Get a Quote
          </Link>
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
          mobileOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ background: "#0d2218", borderTop: "1px solid rgba(212,160,23,0.12)" }}
      >
        <ul className="px-6 pt-4 pb-2 flex flex-col gap-0.5">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className="flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all"
                style={{
                  color: isActive(l.href) ? "white" : "rgba(255,255,255,0.55)",
                  background: isActive(l.href) ? "rgba(255,255,255,0.06)" : "transparent",
                  borderLeft: isActive(l.href) ? "2px solid var(--gold)" : "2px solid transparent",
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-6 pb-5 pt-1">
          <Link
            href="/contact"
            className="nav-cta-btn block text-center w-full px-5 py-3 text-sm rounded-full"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
