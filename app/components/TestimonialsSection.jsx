"use client";

import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then(setTestimonials)
      .catch(() => {});
  }, []);

  const getInitials = (name) => {
    return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
  };

  const renderStars = () => (
    <div className="flex items-center gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={14} fill="var(--gold)" color="var(--gold)" />
      ))}
    </div>
  );

  return (
    <section className="testimonials-section fade-in" id="testimonials">
      <div className="testimonials-bg" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: "1rem" }}>
              Client Voices
            </p>
            <h2 className="font-heading font-bold" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", lineHeight: 1, letterSpacing: "-0.02em", color: "white" }}>
              Trusted by<br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>global buyers</em>
            </h2>
          </div>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: "24rem" }}>
            From Middle East importers to domestic wholesale chains — our quality speaks through every delivery.
          </p>
        </div>

        {/* Cards */}
        {testimonials.length > 0 && (
          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* Featured Left Card */}
            <div className="lg:col-span-5 testimonial-card testimonial-featured flex flex-col justify-between">
              <div>
                {renderStars()}
                <Quote size={28} color="rgba(255,255,255,0.15)" className="mb-4" />
                <p className="testimonial-text text-lg">{testimonials[0].quote}</p>
              </div>
              <div className="testimonial-author flex items-center gap-4">
                <div className="testimonial-avatar">
                  {getInitials(testimonials[0].name)}
                </div>
                <div>
                  <div className="testimonial-name">{testimonials[0].name}</div>
                  <div className="testimonial-role">
                    {testimonials[0].designation} &mdash; {testimonials[0].company}
                  </div>
                </div>
              </div>
            </div>

            {/* Stacked Right Cards */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {testimonials.slice(1, 3).map((t) => (
                <div key={t.id} className="testimonial-card flex flex-col sm:flex-row gap-6 items-start">
                  <div className="flex-1">
                    {renderStars()}
                    <p className="testimonial-text mt-0">{t.quote}</p>
                  </div>
                  <div className="sm:w-64 shrink-0 sm:border-l border-white/10 sm:pl-6 mt-4 sm:mt-0">
                    <div className="testimonial-avatar mb-3">
                      {getInitials(t.name)}
                    </div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">
                      {t.designation} <br/> {t.company}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
