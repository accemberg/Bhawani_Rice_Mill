"use client";

import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SectionHeader from "./components/SectionHeader";
import Card from "./components/Card";
import Button from "./components/Button";
import { CircleCheck, Globe, Building2 } from "lucide-react";

export default function HomePage() {
  // IntersectionObserver for fade‑in animations
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
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      {/* Hero / Intro Section */}
      <section className="pt-[4.5rem] bg-white fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-20 text-center">
          <SectionHeader
            eyebrow="Why Choose Us"
            heading="Built on decades of <br/><em>agricultural excellence</em>"
            description="From farm to freight — we control every step so our buyers never worry about consistency or supply."
          />
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Button variant="primary" className="text-xs px-5 py-2.5 w-full sm:w-auto">
              Get a Quote
            </Button>
            <Button variant="secondary" className="text-xs px-5 py-2.5 w-full sm:w-auto">
              View Products
            </Button>
            <Button variant="ghost" className="text-xs px-5 py-2.5 w-full sm:w-auto">
              Learn More →
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-offwhite fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            <Card
              icon={CircleCheck}
              title="Single-Origin, Hand-Sorted"
              description="Every batch double-sorted for moisture, grain length, and purity before it leaves our facility."
            />
            <Card
              icon={Globe}
              title="30+ Export Destinations"
              description="Phytosanitary-certified and packed to international standards — Middle East, Europe, Southeast Asia."
            />
            <Card
              icon={Building2}
              title="Precision Milling Technology"
              description="Modern colour-sorters and destoners guarantee consistent grain integrity with zero contamination."
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
