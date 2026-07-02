"use client";

import { useEffect, useState } from "react";
import { getGalleryImages, addGalleryImage, deleteGalleryImage } from "@/lib/firebase/gallery";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadData() {
    const data = await getGalleryImages();
    setImages(data);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!category || !imageurl) return;
    setSaving(true);
    await addGalleryImage(category, imageurl);
    setCategory("");
    setImageurl("");
    setSaving(false);
    loadData();
  }

  async function handleDelete(id) {
    if (!confirm("Remove this image?")) return;
    await deleteGalleryImage(id);
    loadData();
  }

  if (loading) {
    return <div style={{ padding: "40px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Gallery ({images.length})</h1>

      {/* Add form */}
      <form
        onSubmit={handleAdd}
        style={{ display: "flex", gap: "10px", margin: "20px 0", flexWrap: "wrap" }}
      >
        <input
          type="text"
          placeholder="Category (e.g. products, packaging)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <input
          type="text"
          placeholder="Image URL / filename"
          value={imageurl}
          onChange={(e) => setImageurl(e.target.value)}
          style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", flex: 1, minWidth: "200px" }}
        />
        <button
          type="submit"
          disabled={saving}
          style={{ padding: "8px 16px", backgroundColor: "#1B4332", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          {saving ? "Adding..." : "Add Image"}
        </button>
      </form>

      {/* List */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "12px" }}>
        {images.map((img) => (
          <div key={img.id} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "12px" }}>
            <p style={{ fontSize: "13px", color: "#555", margin: "0 0 4px" }}>{img.category || "—"}</p>
            <p style={{ fontSize: "13px", wordBreak: "break-all", margin: "0 0 8px" }}>{img.imageurl}</p>
            <button
              onClick={() => handleDelete(img.id)}
              style={{ padding: "4px 10px", backgroundColor: "#c0392b", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}
            >
              Remove
            </button>
          </div>
        ))}
        {images.length === 0 && <p style={{ color: "#888" }}>No images yet</p>}
      </div>
    </div>
  );
}