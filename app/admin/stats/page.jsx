"use client";

import { useEffect, useState } from "react";
import { getStats, updateStats } from "@/lib/firebase/stats";

export default function StatsPage() {
  const [form, setForm] = useState({
    dailyCapacityMT: "",
    storageCapacityMT: "",
    distributionNetwork: "",
    yearsExperience: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await getStats();
      if (data) {
        setForm({
          dailyCapacityMT: data.dailyCapacityMT ?? "",
          storageCapacityMT: data.storageCapacityMT ?? "",
          distributionNetwork: data.distributionNetwork ?? "",
          yearsExperience: data.yearsExperience ?? "",
        });
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await updateStats({
        dailyCapacityMT: Number(form.dailyCapacityMT),
        storageCapacityMT: Number(form.storageCapacityMT),
        distributionNetwork: Number(form.distributionNetwork),
        yearsExperience: Number(form.yearsExperience),
      });
      setMessage("✅ Stats updated successfully!");
    } catch (err) {
      setMessage("❌ Something went wrong. Try again.");
    }

    setSaving(false);
  }

  if (loading) {
    return <div style={{ padding: "40px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "40px", maxWidth: "500px" }}>
      <h1 style={{ marginBottom: "20px" }}>Edit Company Stats</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <label>
          Daily Capacity (MT)
          <input
            type="number"
            name="dailyCapacityMT"
            value={form.dailyCapacityMT}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </label>

        <label>
          Storage Capacity (MT)
          <input
            type="number"
            name="storageCapacityMT"
            value={form.storageCapacityMT}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </label>

        <label>
          Distribution Network
          <input
            type="number"
            name="distributionNetwork"
            value={form.distributionNetwork}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </label>

        <label>
          Years of Experience
          <input
            type="number"
            name="yearsExperience"
            value={form.yearsExperience}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </label>

        <button
          type="submit"
          disabled={saving}
          style={{ padding: "10px", backgroundColor: "#D4A017", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}