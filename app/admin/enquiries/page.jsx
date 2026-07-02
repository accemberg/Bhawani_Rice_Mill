"use client";

import { useEffect, useState } from "react";
import { getEnquiries } from "@/lib/firebase/enquiries";

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getEnquiries();
      setEnquiries(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  function formatDate(timestamp) {
    if (!timestamp) return "—";
    return timestamp.toDate().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (loading) {
    return <div style={{ padding: "40px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ marginBottom: "20px" }}>Enquiry Submissions</h1>

      {enquiries.length === 0 ? (
        <p>No enquiries yet.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#1B4332", color: "#fff", textAlign: "left" }}>
                <th style={{ padding: "10px" }}>Name</th>
                <th style={{ padding: "10px" }}>Email</th>
                <th style={{ padding: "10px" }}>Type</th>
                <th style={{ padding: "10px" }}>Subject</th>
                <th style={{ padding: "10px" }}>Message</th>
                <th style={{ padding: "10px" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enq) => (
                <tr key={enq.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px" }}>{enq.name || "—"}</td>
                  <td style={{ padding: "10px" }}>{enq.email || "—"}</td>
                  <td style={{ padding: "10px" }}>{enq.type || "—"}</td>
                  <td style={{ padding: "10px" }}>{enq.subject || "—"}</td>
                  <td style={{ padding: "10px", maxWidth: "300px" }}>{enq.message || "—"}</td>
                  <td style={{ padding: "10px", whiteSpace: "nowrap" }}>{formatDate(enq.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}