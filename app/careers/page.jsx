"use client";

import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowRight, CheckCircle, Upload, Briefcase, GraduationCap, Users, Heart } from "lucide-react";

const OPENINGS = [
  { id: "qa", title: "Quality Analyst", type: "Full-time", location: "Patna, Bihar" },
  { id: "operator", title: "Mill Operator", type: "Full-time", location: "Patna, Bihar" },
  { id: "sales", title: "Sales Executive", type: "Full-time", location: "Multiple Locations" },
  { id: "logistics", title: "Logistics Coordinator", type: "Full-time", location: "Patna, Bihar" }
];

const PERKS = [
  { icon: GraduationCap, label: "Growth & Learning", desc: "Continuous training and skill development programs." },
  { icon: Briefcase, label: "Competitive Pay", desc: "Industry-leading compensation and performance bonuses." },
  { icon: Heart, label: "Health & Well-being", desc: "Comprehensive health coverage for you and your family." },
  { icon: Users, label: "Great Culture", desc: "Inclusive, supportive, and driven team environment." }
];

function validate(fields, resumeFile) {
  const errors = {};
  if (!fields.name?.trim()) errors.name = "Name is required";
  if (!fields.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = "Valid email is required";
  if (!fields.phone?.trim() || !/^[+]?[\d\s\-()]{7,15}$/.test(fields.phone)) errors.phone = "Valid phone is required";
  if (!fields.role?.trim()) errors.role = "Role is required";
  if (!resumeFile) errors.resumeFile = "Resume (PDF) is required";
  return errors;
}

export default function CareersPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", role: "", message: "" });
  const [resumeFile, setResumeFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setErrors(prev => ({ ...prev, resumeFile: "Only PDF files are allowed" }));
        e.target.value = null;
        setResumeFile(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, resumeFile: "File size must be under 5MB" }));
        e.target.value = null;
        setResumeFile(null);
        return;
      }
      setErrors(prev => ({ ...prev, resumeFile: null }));
      setResumeFile(file);
    }
  };

  // Step 1 — convert file to base64
  const toBase64 = (file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });

  // Step 2 — on form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errs = validate(formData, resumeFile);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    
    setErrors({});
    setStatus("loading");

    try {
      const resumeBase64 = await toBase64(resumeFile);
      
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          resumeBase64,
          resumeFileName: resumeFile.name
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", role: "", message: "" });
        setResumeFile(null);
        if (fileInputRef.current) fileInputRef.current.value = null;
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  return (
    <>
      <Navbar />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <p className="page-hero-eyebrow">We're Hiring</p>
          <h1 className="page-hero-title">
            Join the<br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Team</em>
          </h1>
          <p className="page-hero-desc">
            Be part of a 40-year legacy of excellence. We are always looking for passionate individuals to join our growing family.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-offwhite py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Left Column — Openings & Form */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              
              {/* Openings */}
              <div className="mb-12">
                <h2 className="text-xl font-bold text-green-900 mb-6 font-heading">Current Openings</h2>
                <div className="flex flex-col gap-4">
                  {OPENINGS.map((job) => (
                    <div 
                      key={job.id} 
                      className={`careers-openings-card ${formData.role === job.title ? 'selected' : ''}`}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, role: job.title }));
                        setErrors(prev => ({ ...prev, role: null }));
                      }}
                    >
                      <div>
                        <h3 className="font-bold text-[var(--green)] mb-1">{job.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-black/50 font-medium">
                          <span>{job.type}</span>
                          <span className="w-1 h-1 rounded-full bg-black/20"></span>
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <div className="text-[var(--gold)] shrink-0">
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="bg-white rounded-xl p-8 border border-[rgba(27,67,50,0.08)]">
                <h2 className="text-xl font-bold text-green-900 mb-6 font-heading">Submit Your Application</h2>
                
                {status === "success" ? (
                  <div className="form-success-banner mb-6">
                    <CheckCircle size={20} />
                    Your application has been submitted successfully! We'll be in touch soon.
                  </div>
                ) : (
                  <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
                    <div className="form-row">
                      <div className="field-group">
                        <label className="field-label">Full Name *</label>
                        <input 
                          type="text" 
                          name="name"
                          className={`field-input ${errors.name ? "error" : ""}`} 
                          placeholder="John Doe" 
                          value={formData.name} 
                          onChange={handleInputChange} 
                        />
                        {errors.name && <span className="field-error">{errors.name}</span>}
                      </div>
                      <div className="field-group">
                        <label className="field-label">Email *</label>
                        <input 
                          type="email" 
                          name="email"
                          className={`field-input ${errors.email ? "error" : ""}`} 
                          placeholder="john@example.com" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                        />
                        {errors.email && <span className="field-error">{errors.email}</span>}
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="field-group">
                        <label className="field-label">Phone *</label>
                        <input 
                          type="tel" 
                          name="phone"
                          className={`field-input ${errors.phone ? "error" : ""}`} 
                          placeholder="+91 98765 43210" 
                          value={formData.phone} 
                          onChange={handleInputChange} 
                        />
                        {errors.phone && <span className="field-error">{errors.phone}</span>}
                      </div>
                      <div className="field-group">
                        <label className="field-label">Role Applying For *</label>
                        <input 
                          type="text" 
                          name="role"
                          className={`field-input ${errors.role ? "error" : ""}`} 
                          placeholder="e.g. Quality Analyst" 
                          value={formData.role} 
                          onChange={handleInputChange} 
                        />
                        {errors.role && <span className="field-error">{errors.role}</span>}
                      </div>
                    </div>

                    <div className="field-group">
                      <label className="field-label">Cover Letter / Message</label>
                      <textarea 
                        name="message"
                        className="field-textarea" 
                        placeholder="Tell us why you'd be a great fit for this role..." 
                        value={formData.message} 
                        onChange={handleInputChange} 
                      />
                    </div>

                    <div className="field-group">
                      <label className="field-label">Resume (PDF only, max 5MB) *</label>
                      <div className={`relative flex items-center justify-between p-3 border-2 border-dashed rounded-lg bg-black/5 transition-colors ${errors.resumeFile ? 'border-red-400' : 'border-[rgba(27,67,50,0.15)] hover:border-[var(--green)]'}`}>
                        <input 
                          type="file" 
                          accept=".pdf,application/pdf"
                          onChange={handleFileChange}
                          ref={fileInputRef}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex items-center gap-3 px-2">
                          <Upload size={18} className="text-black/40" />
                          <span className="text-sm font-medium text-black/70">
                            {resumeFile ? resumeFile.name : "Choose a file or drag & drop"}
                          </span>
                        </div>
                        <div className="px-4 py-1.5 bg-[var(--gold)] text-black text-xs font-bold rounded-md uppercase tracking-wider">
                          Browse
                        </div>
                      </div>
                      {errors.resumeFile && <span className="field-error">{errors.resumeFile}</span>}
                    </div>

                    {status === "error" && (
                      <div className="form-error-banner mt-2">
                        Something went wrong during submission. Please try again.
                      </div>
                    )}

                    <button type="submit" className="submit-btn mt-4" disabled={status === "loading"}>
                      {status === "loading" ? (
                        <><span className="spinner spinner-dark border-black/30 !border-t-black" /> Submitting...</>
                      ) : (
                        <>Submit Application <ArrowRight size={15} /></>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column — Perks */}
            <div className="flex flex-col gap-6 order-1 lg:order-2">
              <div>
                <p style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: "1rem" }}>
                  Why Join Us
                </p>
                <div className="flex flex-col gap-4">
                  {PERKS.map(({ icon: Icon, label, desc }) => (
                    <div key={label} className="contact-info-card">
                      <div className="contact-info-icon">
                        <Icon size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--charcoal)", marginBottom: "0.25rem" }}>
                          {label}
                        </div>
                        <div style={{ fontSize: "0.75rem", lineHeight: 1.5, color: "rgba(26,26,26,0.6)" }}>
                          {desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 p-6 bg-white border border-[rgba(27,67,50,0.08)] rounded-xl">
                <h3 className="font-bold text-sm mb-2 text-[var(--green)]">Don't see your role?</h3>
                <p className="text-xs text-black/60 leading-relaxed mb-4">
                  We are always on the lookout for great talent. Send your open application directly to our HR team.
                </p>
                <a href="mailto:careers@bhawanirice.com" className="text-xs font-bold text-[var(--gold)] uppercase tracking-wider hover:underline">
                  careers@bhawanirice.com
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
