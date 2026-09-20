import { createContext, useContext, useState } from "react";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("giftlink_user")) || null;
    } catch {
      return null;
    }
  });
  function login(data) {
    localStorage.setItem("giftlink_token", data.token);
    localStorage.setItem("giftlink_user", JSON.stringify(data.user));
    setUser(data.user);
  }
  function logout() {
    localStorage.removeItem("giftlink_token");
    localStorage.removeItem("giftlink_user");
    setUser(null);
  }
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
