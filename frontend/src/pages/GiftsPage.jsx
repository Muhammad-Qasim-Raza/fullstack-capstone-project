import { useEffect, useState } from "react";
import { apiFetch } from "../api";
import GiftCard from "../components/GiftCard";
export default function GiftsPage() {
  const [gifts, setGifts] = useState([]),
    [q, setQ] = useState(""),
    [category, setCategory] = useState(""),
    [error, setError] = useState("");
  async function load() {
    try {
      setError("");
      const p = new URLSearchParams();
      if (q) p.set("q", q);
      if (category) p.set("category", category);
      setGifts(await apiFetch(`/search?${p}`));
    } catch (e) {
      setError(e.message);
    }
  }
  useEffect(() => {
    load();
  }, []);
  return (
    <main className="container">
      <p className="eyebrow">GIFT CATALOG</p>
      <h1>Available items</h1>
      <div className="filters">
        <input
          placeholder="Search items..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {[
            "Furniture",
            "Appliances",
            "Books",
            "Clothing",
            "Home",
            "Sports",
            "Garden",
            "Electronics",
          ].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button className="button" onClick={load}>
          Search
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <section className="grid">
        {gifts.map((g) => (
          <GiftCard key={g._id} gift={g} />
        ))}
      </section>
    </main>
  );
}
