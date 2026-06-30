"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { key: "yearsExperience",    label: "Years of Experience",   suffix: "+",  format: false },
  { key: "dailyCapacityMT",    label: "Daily Milling Capacity",suffix: " MT", format: false },
  { key: "storageCapacityMT",  label: "Storage Capacity",      suffix: " MT", format: true  },
  { key: "distributionNetwork",label: "Distribution Network",  suffix: "+",  format: false },
  { key: "exportCountries",    label: "Countries Served",      suffix: "+",  format: false },
  { key: "totalProducts",      label: "Products in Range",     suffix: "+",  format: false },
];

function useCountUp(target, duration = 1800, started) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started || target === 0) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, started, duration]);
  return count;
}

function Counter({ value, suffix, label, format, started }) {
  const count = useCountUp(value, 1800, started);
  const display = format ? count.toLocaleString("en-IN") : count;
  return (
    <div className="counter-card">
      <div className="counter-value">
        {display}
        <span className="counter-suffix">{suffix}</span>
      </div>
      <div className="counter-label">{label}</div>
    </div>
  );
}

export default function StatsBar() {
  const [stats, setStats] = useState(null);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-bar" id="stats" ref={ref}>
      <div className="stats-grid">
        {STATS.map(({ key, label, suffix, format }) => (
          <Counter
            key={key}
            value={stats ? stats[key] : 0}
            label={label}
            suffix={suffix}
            format={format}
            started={started && !!stats}
          />
        ))}
      </div>
    </section>
  );
}
