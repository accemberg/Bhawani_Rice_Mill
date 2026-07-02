"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import { X, Factory, Cpu, FlaskConical, Package, Truck, Warehouse, Maximize2, Drill, Boxes } from "lucide-react";

export default function InfrastructurePage() {
  const [lightboxImg, setLightboxImg] = useState(null);

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

  const infrastructureData = [
    {
      id: 1,
      title: "Factory Exterior & Campus",
      icon: Factory,
      image: "/all product.png", // Placeholder
      desc: "Our sprawling 5-acre facility designed for optimal workflow and hygiene."
    },
    {
      id: 2,
      title: "Milling & De-husking",
      icon: Drill,
      image: "/katarnirice.png", // Placeholder
      desc: "State-of-the-art pneumatic rubber roll shellers ensuring grain integrity."
    },
    {
      id: 3,
      title: "Optical Color Sorters",
      icon: Cpu,
      image: "/all product.png", // Placeholder
      desc: "High-speed multi-chromatic sorters for 99.9% pure, defect-free rice."
    },
    {
      id: 4,
      title: "Quality Lab",
      icon: FlaskConical,
      image: "/katarnirice.png", // Placeholder
      desc: "In-house laboratory equipped for moisture, length, and purity testing."
    },
    {
      id: 5,
      title: "Silos & Bulk Storage",
      icon: Warehouse,
      image: "/all product.png", // Placeholder
      desc: "Temperature-controlled steel silos preserving freshness and aroma."
    },
    {
      id: 6,
      title: "Automated Packaging",
      icon: Package,
      image: "/katarnirice.png", // Placeholder
      desc: "Touch-free weighing and vacuum sealing from 1kg up to 50kg bags."
    },
    {
      id: 7,
      title: "Finished Goods Warehouse",
      icon: Boxes,
      image: "/all product.png", // Placeholder
      desc: "Pest-controlled, raised-platform warehousing for export-ready cargo."
    },
    {
      id: 8,
      title: "Logistics & Fleet",
      icon: Truck,
      image: "/katarnirice.png", // Placeholder
      desc: "Dedicated transport fleet ensuring timely port and domestic deliveries."
    }
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 sm:px-10 lg:px-16 bg-[#1A1A1A] text-white">
        <div className="relative max-w-7xl mx-auto z-10 fade-in">
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: "1rem" }}>
            World-Class Facilities
          </p>
          <h1 className="font-heading font-bold" style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
            Our <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Infrastructure</em>
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.7)", maxWidth: "34rem", lineHeight: 1.7 }}>
            Experience the technology and scale that powers our promise of purity. Over 40 years of milling expertise, supported by modern machinery.
          </p>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-24" style={{ background: "var(--offwhite)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {infrastructureData.map((item, i) => (
              <div 
                key={item.id}
                className="group relative bg-white rounded-xl overflow-hidden cursor-pointer fade-in"
                style={{ 
                  border: "1px solid rgba(27,67,50,0.08)",
                  animationDelay: `${i * 0.1}s`,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.02)"
                }}
                onClick={() => setLightboxImg(item)}
              >
                {/* Image Wrapper */}
                <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                     <Maximize2 className="text-white drop-shadow-md" size={32} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-md" style={{ background: "rgba(212,160,23,0.1)", color: "var(--gold-dark)" }}>
                      <item.icon size={18} strokeWidth={2} />
                    </div>
                    <h3 className="font-bold text-sm text-[#1B4332]">{item.title}</h3>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-10 backdrop-blur-sm"
          onClick={() => setLightboxImg(null)}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-black/50 p-2 rounded-full"
            onClick={() => setLightboxImg(null)}
          >
            <X size={28} />
          </button>

          <div 
            className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden bg-gray-900 border border-white/10"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking on image
          >
            <Image 
              src={lightboxImg.image} 
              alt={lightboxImg.title} 
              fill 
              className="object-cover"
            />
            
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 sm:p-10 pt-20">
               <h3 className="text-white font-heading text-2xl md:text-3xl font-bold mb-2">{lightboxImg.title}</h3>
               <p className="text-white/80 max-w-2xl text-sm md:text-base">{lightboxImg.desc}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
