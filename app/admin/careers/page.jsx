"use client";

import { useEffect, useState } from "react";
import { getCareersData } from "@/lib/firebase/careers";

export default function CareersPage() {
  const [applicants, setApplicants] = useState([]);
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getCareersData();
      setApplicants(data.applicants);
      setJobListings(data.jobListings);
      setLoading(false);
    }
    loadData();
  }, []);

  function formatDate(timestamp) {
    if (!timestamp) return "—";
    return timestamp.toDate().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  if (loading) {
    return <div style={{ padding: "40px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Careers</h1>

      {/* Applicants Section */}
      <h2 style={{ marginTop: "30px" }}>Applicants ({applicants.length})</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #1B4332", textAlign: "left" }}>
            <th style={{ padding: "8px" }}>Name</th>
            <th style={{ padding: "8px" }}>Email</th>
            <th style={{ padding: "8px" }}>Phone</th>
            <th style={{ padding: "8px" }}>Role Applied</th>
            <th style={{ padding: "8px" }}>Resume</th>
            <th style={{ padding: "8px" }}>Applied On</th>
            <th style={{ padding: "8px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((a) => (
            <tr key={a.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px" }}>{a.name || "—"}</td>
              <td style={{ padding: "8px" }}>{a.email || "—"}</td>
              <td style={{ padding: "8px" }}>{a.phone || "—"}</td>
              <td style={{ padding: "8px" }}>{a.role || "—"}</td>
              <td style={{ padding: "8px" }}>
                {a.resumeFileName ? `📎 ${a.resumeFileName} (sent via email)` : "—"}
              </td>
              <td style={{ padding: "8px" }}>{formatDate(a.appliedAt)}</td>
              <td style={{ padding: "8px" }}>{a.status || "—"}</td>
            </tr>
          ))}
          {applicants.length === 0 && (
            <tr>
              <td colSpan={7} style={{ padding: "20px", textAlign: "center", color: "#888" }}>
                No applicants yet
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Job Listings Section */}
      <h2 style={{ marginTop: "40px" }}>Job Openings ({jobListings.length})</h2>
      <div style={{ display: "grid", gap: "12px", marginTop: "10px" }}>
        {jobListings.map((job) => (
          <div
            key={job.id}
            style={{
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <strong>{job.title || "Untitled Role"}</strong>
            <p style={{ margin: "4px 0", color: "#555" }}>{job.description}</p>
            <p style={{ margin: "4px 0", fontSize: "14px" }}>
              📍 {job.location || "—"} · {job.type || "—"}
            </p>
          </div>
        ))}
        {jobListings.length === 0 && (
          <p style={{ color: "#888" }}>No job openings posted</p>
        )}
      </div>
    </div>
  );
}