import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { login as loginApi } from "../Api/AuthService.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return {};
    try {
      const decoded = jwtDecode(storedToken);
      return {
        email: decoded.sub,
        role: decoded.authorities || decoded.role || decoded.roles || [],
      };
    } catch {
      return {};
    }
  });

  const [error, setError] = useState(null);

  const extractToken = (response) => {
    if (typeof response === "string") return response;
    if (typeof response === "object" && response !== null) {
      return (
        response.token ||
        response.accessToken ||
        response.access_token ||
        response.data?.token ||
        response.data?.accessToken ||
        response.data?.access_token ||
        null
      );
    }
    return null;
  };

  const extractRole = (decoded, response) => {
    const fromJwt =
      decoded.authorities ||
      decoded.authority ||
      decoded.role ||
      decoded.roles ||
      decoded.scope;
    if (fromJwt) return fromJwt;

    if (typeof response === "object" && response !== null) {
      return response.role || response.roles || response.data?.role || [];
    }
    return [];
  };

  const login = async (credentials) => {
    setError(null);
    try {
      const response = await loginApi(credentials);
      const jwtToken = extractToken(response);

      if (!jwtToken || typeof jwtToken !== "string") {
        throw new Error("Aucun jeton valide reçu du serveur.");
      }

      const decoded = jwtDecode(jwtToken);
      const userData = {
        email: decoded.sub,
        role: extractRole(decoded, response),
      };

      localStorage.setItem("token", jwtToken);

      setToken(jwtToken);
      setUser(userData);
      return true;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Identifiants incorrects.",
      );
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, error, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
