"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Phone, Mail, MapPin, ArrowRight, CheckCircle } from "lucide-react";

/* ── Form configs ── */
const FORM_TYPES = [
  { key: "business", label: "Business Enquiry" },
  { key: "export",   label: "Export Enquiry" },
  { key: "dealer",   label: "Dealer Registration" },
];

const PRODUCTS = [
  "Premium Basmati Rice", "Golden Sella Basmati", "Steam Basmati Rice",
  "Katarni Rice (GI Tagged)", "Non-Basmati White Rice", "Export Grade Basmati",
  "Value Rice", "Custom Blend",
];

function validate(fields, rules) {
  const errors = {};
  rules.forEach(({ name, label, required, email, phone }) => {
    const val = (fields[name] || "").trim();
    if (required && !val) { errors[name] = `${label} is required`; return; }
    if (email && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { errors[name] = "Enter a valid email address"; return; }
    if (phone && val && !/^[+]?[\d\s\-()]{7,15}$/.test(val)) { errors[name] = "Enter a valid phone number"; }
  });
  return errors;
}

/* ── Business Enquiry Form ── */
function BusinessForm() {
  const [fields, setFields] = useState({ name: "", email: "", phone: "", company: "", product: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"

  const rules = [
    { name: "name",    label: "Name",    required: true },
    { name: "email",   label: "Email",   required: true, email: true },
    { name: "phone",   label: "Phone",   required: true, phone: true },
    { name: "company", label: "Company", required: true },
    { name: "message", label: "Message", required: true },
  ];

  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate(fields, rules);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "business", ...fields }),
      });
      if (res.ok) { setStatus("success"); }
      else { setStatus("error"); }
    } catch { setStatus("error"); }
  };

  if (status === "success") return (
    <div className="form-success-banner">
      <CheckCircle size={20} />
      Thank you! We've received your enquiry and will contact you within 24 hours.
    </div>
  );

  return (
    <form className="enquiry-form" onSubmit={submit} noValidate>
      <div className="form-row">
        <div className="field-group">
          <label className="field-label">Full Name *</label>
          <input id="b-name" className={`field-input ${errors.name ? "error" : ""}`} placeholder="Rajesh Kumar" value={fields.name} onChange={set("name")} />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>
        <div className="field-group">
          <label className="field-label">Company *</label>
          <input id="b-company" className={`field-input ${errors.company ? "error" : ""}`} placeholder="Acme Traders Ltd" value={fields.company} onChange={set("company")} />
          {errors.company && <span className="field-error">{errors.company}</span>}
        </div>
      </div>
      <div className="form-row">
        <div className="field-group">
          <label className="field-label">Email *</label>
          <input id="b-email" type="email" className={`field-input ${errors.email ? "error" : ""}`} placeholder="you@company.com" value={fields.email} onChange={set("email")} />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
        <div className="field-group">
          <label className="field-label">Phone *</label>
          <input id="b-phone" type="tel" className={`field-input ${errors.phone ? "error" : ""}`} placeholder="+91 73208 34390" value={fields.phone} onChange={set("phone")} />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>
      </div>
      <div className="field-group">
        <label className="field-label">Product of Interest</label>
        <select id="b-product" className="field-select" value={fields.product} onChange={set("product")}>
          <option value="">Select a product (optional)</option>
          {PRODUCTS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div className="field-group">
        <label className="field-label">Message *</label>
        <textarea id="b-message" className={`field-textarea ${errors.message ? "error" : ""}`} placeholder="Tell us about your requirement — quantity, packaging, destination..." value={fields.message} onChange={set("message")} />
        {errors.message && <span className="field-error">{errors.message}</span>}
      </div>

      {status === "error" && (
        <div className="form-error-banner">
          Something went wrong on our end. Please email us directly at{" "}
          <a href="mailto:bhawaniricemillbuxar@gmail.com">bhawaniricemillbuxar@gmail.com</a>
        </div>
      )}

      <button id="b-submit" type="submit" className="submit-btn" disabled={status === "loading"}>
        {status === "loading" ? <><span className="spinner" /> Sending...</> : <>Send Enquiry <ArrowRight size={15} /></>}
      </button>
    </form>
  );
}

/* ── Export Enquiry Form ── */
function ExportForm() {
  const [fields, setFields] = useState({ name: "", email: "", phone: "", country: "", company: "", volume: "", product: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const rules = [
    { name: "name",    label: "Name",    required: true },
    { name: "email",   label: "Email",   required: true, email: true },
    { name: "phone",   label: "Phone",   required: true, phone: true },
    { name: "country", label: "Country", required: true },
    { name: "company", label: "Company", required: true },
    { name: "message", label: "Message", required: true },
  ];

  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate(fields, rules);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "export", ...fields }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  };

  if (status === "success") return (
    <div className="form-success-banner">
      <CheckCircle size={20} />
      Export enquiry received! Our export team will reach out within 24 hours.
    </div>
  );

  return (
    <form className="enquiry-form" onSubmit={submit} noValidate>
      <div className="form-row">
        <div className="field-group">
          <label className="field-label">Full Name *</label>
          <input id="e-name" className={`field-input ${errors.name ? "error" : ""}`} placeholder="Ahmed Al-Farsi" value={fields.name} onChange={set("name")} />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>
        <div className="field-group">
          <label className="field-label">Company *</label>
          <input id="e-company" className={`field-input ${errors.company ? "error" : ""}`} placeholder="Al-Farsi Trading LLC" value={fields.company} onChange={set("company")} />
          {errors.company && <span className="field-error">{errors.company}</span>}
        </div>
      </div>
      <div className="form-row">
        <div className="field-group">
          <label className="field-label">Email *</label>
          <input id="e-email" type="email" className={`field-input ${errors.email ? "error" : ""}`} placeholder="you@company.com" value={fields.email} onChange={set("email")} />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
        <div className="field-group">
          <label className="field-label">Phone *</label>
          <input id="e-phone" type="tel" className={`field-input ${errors.phone ? "error" : ""}`} placeholder="+971 50 000 0000" value={fields.phone} onChange={set("phone")} />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>
      </div>
      <div className="form-row">
        <div className="field-group">
          <label className="field-label">Country *</label>
          <input id="e-country" className={`field-input ${errors.country ? "error" : ""}`} placeholder="UAE, Saudi Arabia, UK..." value={fields.country} onChange={set("country")} />
          {errors.country && <span className="field-error">{errors.country}</span>}
        </div>
        <div className="field-group">
          <label className="field-label">Required Volume (MT)</label>
          <input id="e-volume" className="field-input" placeholder="e.g. 50 MT per month" value={fields.volume} onChange={set("volume")} />
        </div>
      </div>
      <div className="field-group">
        <label className="field-label">Product Required</label>
        <select id="e-product" className="field-select" value={fields.product} onChange={set("product")}>
          <option value="">Select a product</option>
          {PRODUCTS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div className="field-group">
        <label className="field-label">Additional Details *</label>
        <textarea id="e-message" className={`field-textarea ${errors.message ? "error" : ""}`} placeholder="Packaging requirements, port of destination, certifications needed..." value={fields.message} onChange={set("message")} />
        {errors.message && <span className="field-error">{errors.message}</span>}
      </div>

      {status === "error" && (
        <div className="form-error-banner">
          Something went wrong. Please email <a href="mailto:bhawaniricemillbuxar@gmail.com">bhawaniricemillbuxar@gmail.com</a> directly.
        </div>
      )}

      <button id="e-submit" type="submit" className="submit-btn" disabled={status === "loading"}>
        {status === "loading" ? <><span className="spinner" /> Sending...</> : <>Send Export Enquiry <ArrowRight size={15} /></>}
      </button>
    </form>
  );
}

/* ── Dealer Registration Form ── */
function DealerForm() {
  const [fields, setFields] = useState({ name: "", email: "", phone: "", company: "", city: "", territory: "", volume: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const rules = [
    { name: "name",      label: "Name",      required: true },
    { name: "email",     label: "Email",     required: true, email: true },
    { name: "phone",     label: "Phone",     required: true, phone: true },
    { name: "company",   label: "Company",   required: true },
    { name: "city",      label: "City/State",required: true },
    { name: "territory", label: "Territory", required: true },
  ];

  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate(fields, rules);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("loading");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "dealer", ...fields }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  };

  if (status === "success") return (
    <div className="form-success-banner">
      <CheckCircle size={20} />
      Dealer application received! Our sales team will contact you within 48 hours.
    </div>
  );

  return (
    <form className="enquiry-form" onSubmit={submit} noValidate>
      <div className="form-row">
        <div className="field-group">
          <label className="field-label">Full Name *</label>
          <input id="d-name" className={`field-input ${errors.name ? "error" : ""}`} placeholder="Your name" value={fields.name} onChange={set("name")} />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>
        <div className="field-group">
          <label className="field-label">Company / Firm *</label>
          <input id="d-company" className={`field-input ${errors.company ? "error" : ""}`} placeholder="Sharma Traders" value={fields.company} onChange={set("company")} />
          {errors.company && <span className="field-error">{errors.company}</span>}
        </div>
      </div>
      <div className="form-row">
        <div className="field-group">
          <label className="field-label">Email *</label>
          <input id="d-email" type="email" className={`field-input ${errors.email ? "error" : ""}`} placeholder="you@company.com" value={fields.email} onChange={set("email")} />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
        <div className="field-group">
          <label className="field-label">Phone *</label>
          <input id="d-phone" type="tel" className={`field-input ${errors.phone ? "error" : ""}`} placeholder="+91 73208 34390" value={fields.phone} onChange={set("phone")} />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>
      </div>
      <div className="form-row">
        <div className="field-group">
          <label className="field-label">City / State *</label>
          <input id="d-city" className={`field-input ${errors.city ? "error" : ""}`} placeholder="Patna, Bihar" value={fields.city} onChange={set("city")} />
          {errors.city && <span className="field-error">{errors.city}</span>}
        </div>
        <div className="field-group">
          <label className="field-label">Target Territory *</label>
          <input id="d-territory" className={`field-input ${errors.territory ? "error" : ""}`} placeholder="North Bihar / Eastern UP" value={fields.territory} onChange={set("territory")} />
          {errors.territory && <span className="field-error">{errors.territory}</span>}
        </div>
      </div>
      <div className="field-group">
        <label className="field-label">Expected Annual Volume (MT)</label>
        <input id="d-volume" className="field-input" placeholder="e.g. 500 MT/year" value={fields.volume} onChange={set("volume")} />
      </div>

      {status === "error" && (
        <div className="form-error-banner">
          Something went wrong. Please email <a href="mailto:bhawaniricemillbuxar@gmail.com">bhawaniricemillbuxar@gmail.com</a> directly.
        </div>
      )}

      <button id="d-submit" type="submit" className="submit-btn" disabled={status === "loading"}>
        {status === "loading" ? <><span className="spinner" /> Submitting...</> : <>Submit Application <ArrowRight size={15} /></>}
      </button>
    </form>
  );
}

/* ── Contact Info Cards ── */
const CONTACT_INFO = [
  { icon: Phone, label: "Phone", value: "+91 73208 34390", href: "tel:+917320834390" },
  { icon: Mail,  label: "Email", value: "bhawaniricemillbuxar@gmail.com", href: "mailto:bhawaniricemillbuxar@gmail.com" },
  { icon: MapPin,label: "Address", value: "Bhawani Rice Mill, Bihar, India", href: "https://maps.app.goo.gl/DjAtAJzwtSr1UDFE8" },
];

/* ── Main Page ── */
export default function ContactPage() {
  const [activeForm, setActiveForm] = useState("business");

  return (
    <>
      <Navbar />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <p className="page-hero-eyebrow">Get In Touch</p>
          <h1 className="page-hero-title">
            Let&apos;s Build a<br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Partnership</em>
          </h1>
          <p className="page-hero-desc">
            Whether you&apos;re a domestic wholesaler, export buyer, or looking for a dealer arrangement —
            reach out and our team will respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-page">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Left — Form */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              {/* Form type switcher */}
              <div className="form-type-tabs" role="tablist">
                {FORM_TYPES.map(({ key, label }) => (
                  <button
                    key={key}
                    id={`tab-${key}`}
                    role="tab"
                    aria-selected={activeForm === key}
                    className={`form-type-tab ${activeForm === key ? "active" : ""}`}
                    onClick={() => setActiveForm(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Active form */}
              {activeForm === "business" && <BusinessForm />}
              {activeForm === "export"   && <ExportForm />}
              {activeForm === "dealer"   && <DealerForm />}
            </div>

            {/* Right — Contact info + map */}
            <div className="flex flex-col gap-6 order-1 lg:order-2">
              <div>
                <p style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: "1rem" }}>
                  Direct Contact
                </p>
                <div className="flex flex-col gap-4">
                  {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                    <a key={label} href={href} className="contact-info-card" style={{ textDecoration: "none" }}>
                      <div className="contact-info-icon">
                        <Icon size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,26,26,0.35)", marginBottom: "0.25rem" }}>
                          {label}
                        </div>
                        <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--charcoal)" }}>
                          {value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Map embed */}
              <div style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(27,67,50,0.1)", flex: 1, minHeight: 280 }}>
                <iframe
                  src="https://maps.google.com/maps?q=Bhawani+Rice+Mill+Buxar&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block", minHeight: 280 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bhawani Rice Mill location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
