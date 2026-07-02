import { 
  Utensils, 
  ShoppingCart, 
  Store, 
  ChefHat, 
  Truck, 
  PlaneTakeoff, 
  Building2, 
  Package, 
  Factory, 
  Globe 
} from "lucide-react";

export default function IndustriesSection() {
  const industries = [
    {
      icon: Utensils,
      title: "Hotels & Resorts",
      desc: "Premium long-grain basmati for fine dining and luxury hospitality.",
    },
    {
      icon: ShoppingCart,
      title: "Hypermarkets",
      desc: "Retail-ready branded packaging for large-scale consumer markets.",
    },
    {
      icon: Store,
      title: "Supermarkets",
      desc: "Consistent quality supply for regional and national retail chains.",
    },
    {
      icon: ChefHat,
      title: "Catering Services",
      desc: "High-yield rice varieties specifically processed for bulk cooking.",
    },
    {
      icon: Truck,
      title: "Wholesalers",
      desc: "Bulk quantities in 25kg and 50kg bags at competitive market rates.",
    },
    {
      icon: Building2,
      title: "Distributors",
      desc: "Reliable partner network ensuring steady regional product availability.",
    },
    {
      icon: PlaneTakeoff,
      title: "Exporters",
      desc: "Export-grade rice meeting strict international phytosanitary standards.",
    },
    {
      icon: Globe,
      title: "Importers",
      desc: "End-to-end documentation and shipping support for global buyers.",
    },
    {
      icon: Factory,
      title: "Food Processors",
      desc: "Clean, consistent raw materials for ready-to-eat and snack manufacturing.",
    },
    {
      icon: Package,
      title: "Institutional Buyers",
      desc: "Customized procurement solutions for hospitals, schools, and canteens.",
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="industries" style={{ background: "var(--offwhite)" }}>
      {/* Decorative top border */}
      <div style={{ height: 4, background: "linear-gradient(90deg, var(--gold) 0%, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mt-16">
        <div className="text-center mb-16 fade-in">
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: "0.75rem" }}>
            Global Reach
          </p>
          <h2 className="font-heading font-bold" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", lineHeight: 1.1, color: "var(--green)", marginBottom: "1rem" }}>
            Industries <em style={{ fontStyle: "italic", color: "var(--green-mid)" }}>We Serve</em>
          </h2>
          <p className="mx-auto" style={{ fontSize: "0.95rem", color: "rgba(26,26,26,0.6)", lineHeight: 1.7, maxWidth: "36rem" }}>
            Delivering consistency and excellence across diverse B2B segments globally. 
            Our stringent quality control ensures every sector gets exactly what they need.
          </p>
        </div>

        {/* 10 Icon Tiles Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {industries.map((ind, i) => (
            <div 
              key={i} 
              className="group relative bg-white p-6 rounded-2xl flex flex-col items-center text-center fade-in transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(27,67,50,0.08)]"
              style={{ border: "1px solid rgba(27,67,50,0.06)", animationDelay: `${i * 0.05}s` }}
            >
              {/* Icon Container */}
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors duration-500 ease-out group-hover:bg-[#1B4332] group-hover:text-white"
                style={{ background: "rgba(212,160,23,0.1)", color: "var(--gold)" }}
              >
                <ind.icon size={24} strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h3 className="font-bold text-sm mb-2 transition-colors duration-500 ease-out group-hover:text-[#1B4332]" style={{ color: "var(--charcoal)" }}>
                {ind.title}
              </h3>
              
              {/* Hover Description (Hidden on mobile, appears on hover desktop) */}
              <div className="lg:absolute lg:inset-0 lg:bg-[#1B4332]/95 lg:backdrop-blur-sm lg:text-white lg:rounded-2xl lg:p-6 lg:flex lg:items-center lg:justify-center lg:opacity-0 lg:pointer-events-none group-hover:lg:opacity-100 group-hover:lg:pointer-events-auto transition-all duration-700 ease-out z-10 hidden lg:flex">
                <p className="text-[0.82rem] leading-[1.8] font-medium text-white/90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out delay-75">
                  {ind.desc}
                </p>
              </div>
              
              {/* Always visible description for mobile/tablet */}
              <p className="lg:hidden text-xs text-gray-500 leading-relaxed mt-1">
                {ind.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
