import { Phone, Mail, MapPin } from "lucide-react";

const FOOTER_LINKS = {
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Our Story", href: "#story" },
    { label: "Careers", href: "#careers" },
    { label: "Blog", href: "#blog" },
  ],
  Products: [
    { label: "Basmati Rice", href: "#basmati" },
    { label: "Non-Basmati Rice", href: "#non-basmati" },
    { label: "Organic Range", href: "#organic" },
    { label: "Custom Blends", href: "#blends" },
  ],
  Contact: [
    { label: "+91 98765 43210", href: "tel:+919876543210", icon: Phone },
    { label: "info@shrishyambhog.com", href: "mailto:info@shrishyambhog.com", icon: Mail },
    { label: "Karnal, Haryana, India", href: "#map", icon: MapPin },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-brand-green text-white/80">
      {/* Quote band */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-12 text-center">
          <p className="font-heading italic text-white/90 text-[clamp(1.1rem,2vw,1.35rem)] leading-relaxed max-w-3xl mx-auto text-center">
            <span className="text-[#D4A017]">&ldquo;</span>Forty years of craft in every grain — sorted, certified, and shipped to meet the world&apos;s most demanding standards.<span className="text-[#D4A017]">&rdquo;</span>
          </p>
        </div>
      </div>

      {/* Links grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10">
        {/* Brand column */}
          <div>
            <span className="font-heading text-white text-lg font-bold tracking-tight">
              Shri Shyam Bhog
            </span>
            <p className="mt-4 max-w-[14.375rem] text-white/60 leading-relaxed text-sm">
              Premium milled rice from India&apos;s finest paddy belts.
              Supplying wholesalers, exporters, and institutional buyers
              across 30+ countries since 1985.
            </p>
          </div>

        {/* Dynamic link columns */}
        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading}>
            <h4 className="text-[#D4A017] text-[0.6875rem] font-semibold tracking-[0.2em] uppercase mb-5">
              {heading}
            </h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-white/60 hover:text-brand-gold transition-colors text-sm flex items-start gap-2.5"
                  >
                    {l.icon && <l.icon size={16} className="mt-0.5" />}
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <span>&copy; 2025 Shri Shyam Bhog. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#privacy" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white/70 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
