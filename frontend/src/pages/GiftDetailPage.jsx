import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiFetch } from "../api";
import { useAuth } from "../context/AuthContext";
export default function GiftDetailPage() {
  const { id } = useParams(),
    { user } = useAuth();
  const [gift, setGift] = useState(),
    [text, setText] = useState(""),
    [error, setError] = useState("");
  async function load() {
    try {
      setGift(await apiFetch(`/gifts/${id}`));
    } catch (e) {
      setError(e.message);
    }
  }
  useEffect(() => {
    load();
  }, [id]);
  async function comment(e) {
    e.preventDefault();
    try {
      await apiFetch(`/gifts/${id}/comments`, {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      setText("");
      load();
    } catch (e) {
      setError(e.message);
    }
  }
  if (error)
    return (
      <main className="container">
        <p className="error">{error}</p>
      </main>
    );
  if (!gift) return <main className="container">Loading...</main>;
  return (
    <main className="container narrow">
      <Link to="/gifts" className="back">
        ← Back
      </Link>
      <article className="detail">
        <span className="badge">{gift.category}</span>
        <h1>{gift.title}</h1>
        <p>{gift.description}</p>
        <p>
          <b>Location:</b> {gift.location}
        </p>
        <p>
          <b>Status:</b> {gift.available ? "Available" : "Unavailable"}
        </p>
      </article>
      <section className="comments">
        <h2>Comments</h2>
        {(gift.comments || []).map((c, i) => (
          <div className="comment" key={i}>
            <b>{c.name}</b>
            <p>{c.text}</p>
          </div>
        ))}
        {user ? (
          <form onSubmit={comment}>
            <textarea
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a comment..."
            />
            <button className="button">Post Comment</button>
          </form>
        ) : (
          <p className="muted">Log in to comment.</p>
        )}
      </section>
    </main>
  );
}
