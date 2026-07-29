import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useLocation } from "react-router";
import api from "../api/axios";

const AuthContext = createContext(null);

const PUBLIC_PATHS = ["/", "/login", "/register"];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const fetchCurrentUser = useCallback(async () => {
    try {
      const res = await api.get("/users/me");
      setUser(res.data.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (PUBLIC_PATHS.includes(location.pathname)) {
      setLoading(false);
      return;
    }
    fetchCurrentUser();
  }, [location.pathname, fetchCurrentUser]);

  const register = async ({ username, email, password, address }) => {
    const res = await api.post("/register", {
      username,
      email,
      password,
      address,
    });
    return res.data;
  };

  const login = async ({ email, password }) => {
    const res = await api.post("/login", { email, password });
    setUser(res.data.data.user);
    return res.data;
  };

  const logout = async () => {
    await api.post("/logout");
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    refetchUser: fetchCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
