"use client";

import { useEffect, useState } from "react";
import { getCertifications, toggleCertificationStatus } from "@/lib/firebase/certifications";

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await getCertifications();
    setCertifications(data);
    setLoading(false);
  }

  async function handleToggle(id, currentStatus) {
    setUpdatingId(id);

    // Optimistic update: turant UI change kar do
    setCertifications((prev) =>
      prev.map((cert) =>
        cert.id === id ? { ...cert, active: !currentStatus } : cert
      )
    );

    try {
      await toggleCertificationStatus(id, !currentStatus);
    } catch (err) {
      // Agar fail ho jaye, wapas purani state pe le aao
      setCertifications((prev) =>
        prev.map((cert) =>
          cert.id === id ? { ...cert, active: currentStatus } : cert
        )
      );
      alert("Update failed. Try again.");
    }

    setUpdatingId(null);
  }

  if (loading) {
    return <div style={{ padding: "40px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ marginBottom: "20px" }}>Certifications</h1>

      {certifications.length === 0 ? (
        <p>No certifications found.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "500px" }}>
          {certifications.map((cert) => (
            <div
              key={cert.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <div>
                <strong>{cert.title || "Untitled"}</strong>
                <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                  Year: {cert.year || "—"}
                </p>
              </div>

              <button
                onClick={() => handleToggle(cert.id, cert.active)}
                disabled={updatingId === cert.id}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: cert.active ? "#1B4332" : "#ccc",
                  color: cert.active ? "#fff" : "#333",
                  fontWeight: "bold",
                  minWidth: "120px",
                }}
              >
                {cert.active ? "Active" : "Coming Soon"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}