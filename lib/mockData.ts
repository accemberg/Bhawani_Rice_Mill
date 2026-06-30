export const mockProducts = [
  {
    id: "p1",
    name: "Premium Basmati Rice",
    category: "basmati",
    images: ["/placeholder.jpg"],
    specPdfUrl: "",
    sizes: ["5kg", "25kg", "50kg"],
    applications: ["Hotels", "Export", "Retail"],
    description: "Long grain premium basmati with rich aroma.",
    specs: {
      grainLength: "8.3mm",
      moisture: "< 13%",
      brokenGrains: "< 1%",
      foreignMatter: "Nil"
    }
  },
  {
    id: "p2",
    name: "Golden Sella Basmati",
    category: "basmati",
    images: ["/placeholder.jpg"],
    specPdfUrl: "",
    sizes: ["5kg", "25kg"],
    applications: ["Export", "Industrial"],
    description: "Parboiled golden sella basmati rice.",
    specs: {
      grainLength: "7.9mm",
      moisture: "< 13%",
      brokenGrains: "< 2%",
      foreignMatter: "Nil"
    }
  },
  {
    id: "p3",
    name: "Steam Basmati Rice",
    category: "basmati",
    images: ["/placeholder.jpg"],
    specPdfUrl: "",
    sizes: ["5kg", "25kg", "50kg"],
    applications: ["Hotels", "Catering", "Export"],
    description: "Steam processed basmati rice.",
    specs: {
      grainLength: "8.1mm",
      moisture: "< 13%",
      brokenGrains: "< 1%",
      foreignMatter: "Nil"
    }
  },
  {
    id: "p4",
    name: "Non-Basmati White Rice",
    category: "non-basmati",
    images: ["/placeholder.jpg"],
    specPdfUrl: "",
    sizes: ["10kg", "25kg"],
    applications: ["Retail", "OEM"],
    description: "High quality non-basmati white rice.",
    specs: {
      grainLength: "6.2mm",
      moisture: "< 14%",
      brokenGrains: "< 5%",
      foreignMatter: "Nil"
    }
  },
  {
    id: "p5",
    name: "Value Rice",
    category: "value",
    images: ["/placeholder.jpg"],
    specPdfUrl: "",
    sizes: ["10kg", "25kg", "50kg"],
    applications: ["Retail", "Wholesale"],
    description: "Affordable quality rice for everyday use.",
    specs: {
      grainLength: "5.8mm",
      moisture: "< 14%",
      brokenGrains: "< 10%",
      foreignMatter: "< 0.1%"
    }
  },
  {
    id: "p6",
    name: "Export Grade Basmati",
    category: "export",
    images: ["/placeholder.jpg"],
    specPdfUrl: "",
    sizes: ["25kg", "50kg"],
    applications: ["Middle East Export", "Europe Export"],
    description: "Premium export grade basmati meeting international standards.",
    specs: {
      grainLength: "8.5mm",
      moisture: "< 12%",
      brokenGrains: "< 0.5%",
      foreignMatter: "Nil"
    }
  }
];

export const mockStats = {
  yearsExperience: 25,
  dailyCapacityMT: 500,
  storageCapacityMT: 10000,
  distributionNetwork: 200,
  exportCountries: 15,
  totalProducts: 12
};

export const mockTestimonials = [
  {
    id: "t1",
    quote: "Bhawani Rice Mill delivers consistent quality across every shipment. Our export clients trust this brand completely.",
    name: "Rajesh Agarwal",
    designation: "Procurement Head",
    company: "Global Foods Ltd"
  },
  {
    id: "t2",
    quote: "The basmati rice quality is unmatched. Long grains, perfect aroma, and always on-spec.",
    name: "Sunita Mehta",
    designation: "Director",
    company: "Mehta Distributors"
  },
  {
    id: "t3",
    quote: "Reliable supplier for 5 years. Never had a quality complaint from our retail chain.",
    name: "Ahmed Al-Farsi",
    designation: "Import Manager",
    company: "Al-Farsi Trading, UAE"
  }
];

export const mockCertifications = [
  { id: "c1", name: "FSSAI", status: "active", logoUrl: "" },
  { id: "c2", name: "ISO 9001", status: "active", logoUrl: "" },
  { id: "c3", name: "APEDA", status: "coming_soon", logoUrl: "" },
  { id: "c4", name: "MSME", status: "coming_soon", logoUrl: "" }
];

export const mockGallery = [
  { id: "g1", imageUrl: "/placeholder.jpg", category: "factory", caption: "Main processing unit" },
  { id: "g2", imageUrl: "/placeholder.jpg", category: "machines", caption: "Sorting machines" },
  { id: "g3", imageUrl: "/placeholder.jpg", category: "packaging", caption: "Packaging line" },
  { id: "g4", imageUrl: "/placeholder.jpg", category: "warehouse", caption: "Storage warehouse" },
  { id: "g5", imageUrl: "/placeholder.jpg", category: "lab", caption: "Quality testing lab" },
  { id: "g6", imageUrl: "/placeholder.jpg", category: "loading", caption: "Loading area" }
];

export const mockBlogs = [
  {
    id: "b1",
    title: "Why Basmati Rice is India's Export Pride",
    slug: "why-basmati-rice-indias-export-pride",
    excerpt: "India accounts for over 65% of global basmati exports. Here's what makes it special.",
    date: "2026-06-20",
    category: "export",
    coverImageUrl: "/placeholder.jpg",
    content: "<p>Full article content goes here...</p>"
  },
  {
    id: "b2",
    title: "7 Quality Checkpoints That Define Premium Rice",
    slug: "7-quality-checkpoints-premium-rice",
    excerpt: "How we ensure every batch that leaves our mill meets international standards.",
    date: "2026-06-15",
    category: "quality",
    coverImageUrl: "/placeholder.jpg",
    content: "<p>Full article content goes here...</p>"
  }
];