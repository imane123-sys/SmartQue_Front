import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { login as loginApi } from "../Api/AuthService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");

    if (!token) return null;

    try {
      const decoded = jwtDecode(token);

      return {
        email: decoded.sub,
        role: decoded.role,
      };
    } catch {
      return null;
    }
  });

  const [error, setError] = useState("");

  const login = async (credentials) => {
    try {
      setError("");

      const response = await loginApi(credentials);

      const token = response.data.token;

      const decoded = jwtDecode(token);

      const userData = {
        email: decoded.sub,
        role: decoded.role,
      };

      localStorage.setItem("token", token);

      setToken(token);
      setUser(userData);

      return true;
    } catch (error) {
      setError("Email ou mot de passe incorrect");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        error,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
