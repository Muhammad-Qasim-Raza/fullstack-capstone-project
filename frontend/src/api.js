const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("giftlink_token");
  const headers = {...(options.body ? {"Content-Type":"application/json"} : {}), ...(options.headers || {})};
  if (token) headers.Authorization = `Bearer ${token}`;
  const r = await fetch(`${API_URL}${path}`, {...options, headers});
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.message || "Request failed");
  return data;
}
export { API_URL };
