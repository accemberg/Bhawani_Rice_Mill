"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Wheat } from "lucide-react";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function BlogPreview() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => setBlogs(data.slice(0, 2)))
      .catch(() => {});
  }, []);

  return (
    <section className="blog-preview-section fade-in" id="blog-preview">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
        {/* Header row */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 700, marginBottom: "0.75rem" }}>
              From Our Blog
            </p>
            <h2 className="font-heading font-bold" style={{ fontSize: "clamp(1.8rem,4vw,3rem)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--green)" }}>
              Insights on<br />
              <em style={{ fontStyle: "italic", color: "var(--green-mid)" }}>Rice & Export</em>
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-bold"
            style={{ color: "var(--green)", borderBottom: "2px solid var(--gold)", paddingBottom: "0.25rem" }}
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {/* Blog cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="blog-preview-card">
              {/* Cover image placeholder */}
              <div className="blog-preview-img">
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0.15,
                  }}
                >
                  <Wheat size={80} color="white" strokeWidth={0.75} />
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "1rem",
                    left: "1rem",
                  }}
                >
                  <span className="blog-category-badge">{blog.category}</span>
                </div>
              </div>

              <div className="blog-preview-body">
                <h3 className="blog-preview-title">{blog.title}</h3>
                <p className="blog-preview-excerpt">{blog.excerpt}</p>
                <div className="blog-preview-meta">
                  <span>{formatDate(blog.date)}</span>
                  <Link href={`/blog/${blog.slug}`} className="blog-read-more">
                    Read More <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-bold text-sm"
            style={{ color: "var(--green)", borderBottom: "2px solid var(--gold)", paddingBottom: "0.25rem" }}
          >
            View All Posts <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
