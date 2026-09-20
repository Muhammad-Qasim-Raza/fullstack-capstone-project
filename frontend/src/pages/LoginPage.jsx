import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../api";
import { useAuth } from "../context/AuthContext";
export default function LoginPage() {
  const nav = useNavigate(),
    { login } = useAuth(),
    [form, setForm] = useState({ email: "", password: "" }),
    [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("giftlink_token") || "";
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
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
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="button">Login</button>
        <p className="muted">
          No account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </main>
  );
}
