import { useEffect, useState } from "react";
import { authService } from "../services/authService";
import { AuthContext } from "./AuthContextInstance";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        // Use setTimeout to avoid setState in effect directly
        setTimeout(() => setUser(parsedUser), 0);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setTimeout(() => setLoading(false), 0);
  }, []);

  const login = async (email, password) => {
    const response = await authService.login({ email, password });
    localStorage.setItem("token", response.token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: response.email,
        fullName: response.fullName,
      }),
    );
    setUser({
      email: response.email,
      fullName: response.fullName,
    });
    return response;
  };

  const register = async (userData) => {
    const response = await authService.register(userData);
    // Chỉ lưu token nếu đã xác thực email (response có token)
    if (response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: response.email,
          fullName: response.fullName,
        }),
      );
      setUser({
        email: response.email,
        fullName: response.fullName,
      });
    }
    return response;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const value = {
    getToken,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    register,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
