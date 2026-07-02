import { Sun, Droplets, Leaf, Users, Package, Sprout } from "lucide-react";

export default function SustainabilitySection() {
  const initiatives = [
    {
      icon: Sun,
      title: "Renewable Energy",
      desc: "Our mills are partially powered by solar grids, reducing our carbon footprint and reliance on fossil fuels.",
    },
    {
      icon: Droplets,
      title: "Water Conservation",
      desc: "Advanced effluent treatment plants recycle processing water, ensuring zero harmful discharge into local ecosystems.",
    },
    {
      icon: Leaf,
      title: "Zero Waste Milling",
      desc: "Rice husks are repurposed for biomass energy, and bran is processed for oil, ensuring 100% utilization.",
    },
    {
      icon: Users,
      title: "Farmer Welfare",
      desc: "Fair trade practices and regular agricultural workshops empower our network of over 500 local farmers.",
    },
    {
      icon: Package,
      title: "Eco-Friendly Packaging",
      desc: "Transitioning towards biodegradable and fully recyclable packaging materials across our retail lines.",
    },
    {
      icon: Sprout,
      title: "Ethical Sourcing",
      desc: "We trace our paddy directly back to the farm, ensuring sustainable agricultural practices are followed.",
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="sustainability" style={{ background: "#eef4ec" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 fade-in">
          <div>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--green)", fontWeight: 700, marginBottom: "0.75rem" }}>
              Our Commitment
            </p>
            <h2 className="font-heading font-bold" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", lineHeight: 1.1, color: "var(--charcoal)" }}>
              Sustaining the <em style={{ fontStyle: "italic", color: "var(--green)" }}>Future</em>
            </h2>
          </div>
          <p style={{ fontSize: "0.95rem", color: "rgba(26,26,26,0.65)", lineHeight: 1.7, maxWidth: "28rem", paddingBottom: "0.5rem" }}>
            We believe that great agriculture must coexist with a healthy environment. 
            Our sustainable initiatives are integrated into every step of the milling process.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initiatives.map((item, i) => (
            <div 
              key={i}
              className="bg-white p-8 rounded-2xl fade-in transition-transform duration-300 hover:-translate-y-1"
              style={{ 
                border: "1px solid rgba(27,67,50,0.08)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                animationDelay: `${i * 0.1}s` 
              }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ background: "rgba(27,67,50,0.06)", color: "var(--green)" }}
              >
                <item.icon size={22} strokeWidth={1.75} />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3" style={{ color: "var(--charcoal)" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "rgba(26,26,26,0.6)", lineHeight: 1.65 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
