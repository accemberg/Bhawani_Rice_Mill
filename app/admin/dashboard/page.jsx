"use client";

import Link from "next/link";
import { logoutAdmin } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  async function handleLogout() {
    await logoutAdmin();
    router.push("/admin/login");
  }

  const sections = [
    { name: "Stats", href: "/admin/stats" },
    { name: "Products", href: "/admin/products" },
    { name: "Gallery", href: "/admin/gallery" },
    { name: "Testimonials", href: "/admin/testimonials" },
    { name: "Certifications", href: "/admin/certifications" },
    { name: "Enquiries", href: "/admin/enquiries" },
    { name: "Careers", href: "/admin/careers" },
  ];

  return (
    <div style={{ padding: "40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1>Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{ padding: "8px 16px", backgroundColor: "#1A1A1A", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Logout
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            style={{
              padding: "24px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              textAlign: "center",
              textDecoration: "none",
              color: "#1B4332",
              fontWeight: "bold",
            }}
          >
            {section.name}
          </Link>
        ))}
      </div>
    </div>
  );
}