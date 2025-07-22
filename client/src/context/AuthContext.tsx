import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContextContext";
import { toast } from "react-toastify";

type LoginFunction = (userData: unknown) => void;
type LogoutFunction = () => void;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize from localStorage
    if (typeof window !== "undefined") {
      return localStorage.getItem("user") !== null;
    }
    return false;
  });

  useEffect(() => {
    // Sync isLoggedIn state with localStorage changes (optional)
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("user") !== null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login: LoginFunction = (userData) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData));
    }
    setIsLoggedIn(true);
    toast.success("Login successful.");
  };

  const logout: LogoutFunction = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      localStorage.removeItem("wishlist");
    }
    setIsLoggedIn(false);
    toast.info("You have been logged out.");
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

