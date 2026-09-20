import { useState } from "react";
import { apiFetch } from "../api";
import { useAuth } from "../context/AuthContext";
export default function ProfilePage() {
  const { user, login } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [msg, setMsg] = useState("");
  async function save(e) {
    e.preventDefault();
    try {
      const d = await apiFetch("/auth/profile", {
        method: "PUT",
        body: JSON.stringify({ name }),
      });
      login(d);
      setMsg("Profile updated.");
    } catch (e) {
      setMsg(e.message);
    }
  }
  return (
    <main className="auth-page">
      <form className="form-card" onSubmit={save}>
        <p className="eyebrow">YOUR ACCOUNT</p>
        <h1>Profile</h1>
        <p className="muted">{user?.email}</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="button">Save Changes</button>
        {msg && <p>{msg}</p>}
      </form>
    </main>
  );
}
