import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../api";
import { useAuth } from "../context/AuthContext";
export default function RegisterPage() {
  const nav = useNavigate(),
    { login } = useAuth(),
    [form, setForm] = useState({ name: "", email: "", password: "" }),
    [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      login(data);
      nav("/gifts");
    } catch (e) {
      setError(e.message);
    }
  }
  return (
    <main className="auth-page">
      <form className="form-card" onSubmit={submit}>
        <p className="eyebrow">CREATE ACCOUNT</p>
        <h1>Join GiftLink</h1>
        {error && <p className="error">{error}</p>}
        <input
          placeholder="Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          minLength="6"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="button">Register</button>
        <p className="muted">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}
