"use client";

import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShieldCheck, Search, FlaskConical, Scale, ThermometerSun, LeafyGreen, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function QualityPage() {
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

  const qualityChecks = [
    {
      icon: ThermometerSun,
      title: "Moisture Control",
      desc: "Optimal moisture levels (12-13%) are strictly maintained to ensure perfect cooking texture and prolonged shelf life."
    },
    {
      icon: Search,
      title: "Purity Inspection",
      desc: "Advanced optical color sorters eliminate discolored, chalky, and foreign grains with 99.9% accuracy."
    },
    {
      icon: Scale,
      title: "Length & Grading",
      desc: "Precision length graders separate out broken grains, guaranteeing uniformity in size for premium presentation."
    },
    {
      icon: FlaskConical,
      title: "Laboratory Testing",
      desc: "In-house lab tests every batch for cooking characteristics, elongation ratio, and aroma profile."
    },
    {
      icon: LeafyGreen,
      title: "Aged to Perfection",
      desc: "Basmati varieties are carefully aged in controlled environments to enhance their natural aroma and non-sticky texture."
    },
    {
      icon: ShieldCheck,
      title: "Phytosanitary Standards",
      desc: "Compliant with strict international phytosanitary standards for zero pest infestation and safe export."
    },
    {
      icon: CheckCircle2,
      title: "Final Clearance",
      desc: "A rigorous 5-point final inspection before vacuum sealing and dispatch to ensure absolute perfection."
    }
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="page-hero">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 fade-in">
          <p className="page-hero-eyebrow">Uncompromising Standards</p>
          <h1 className="page-hero-title">
            Quality <br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Assurance</em>
          </h1>
          <p className="page-hero-desc">
            We believe that quality is never an accident; it is always the result of high intention, sincere effort, and skillful execution.
          </p>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-8" style={{ background: "var(--gold)" }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <ShieldCheck size={28} />
            Every batch is strictly inspected before dispatch.
          </h2>
        </div>
      </section>

      {/* 7 Checkpoints Section */}
      <section className="py-24" style={{ background: "var(--offwhite)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          
          <div className="mb-16 text-center fade-in">
             <h2 className="font-heading font-bold" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: "var(--green)" }}>
               Our 7-Step <br/><em style={{ fontStyle: "italic", color: "var(--green-mid)" }}>Quality Process</em>
             </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {qualityChecks.map((check, i) => (
              <div 
                key={i}
                className="bg-white rounded-xl p-8 fade-in flex flex-col items-start transition-all duration-300 hover:shadow-xl"
                style={{ 
                  border: "1px solid rgba(27,67,50,0.1)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                  animationDelay: `${i * 0.1}s` 
                }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                  style={{ background: "rgba(27,67,50,0.06)", color: "var(--green)" }}
                >
                  <check.icon size={24} strokeWidth={1.5} />
                </div>
                
                <h3 className="font-heading font-bold text-xl mb-3" style={{ color: "var(--charcoal)" }}>
                  {check.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm">
                  {check.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
