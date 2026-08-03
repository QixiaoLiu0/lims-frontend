"use client"; // Recommended if you are using Next.js App Router

import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "@/services/authService";

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false); // Helps prevent UI flickering

  // 1. Hydration: Recover user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("lims_user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        // Fallback: clear corrupted data
        localStorage.removeItem("lims_user");
        localStorage.removeItem("token");
      }
    }
    setIsHydrated(true); // Mark hydration as complete
  }, []);

  // 2. Login logic
  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);

      const userInfo = {
        userId: data.userId,
        email: data.email,
        role: data.role,
      };

      // Update React memory state
      setUser(userInfo);

      // Persist to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("lims_user", JSON.stringify(userInfo));

      return true; // login successful
    } catch (error) {
      console.error("Login API Error:", error);
      return false; // login failed
    }
  };

  // 3. Logout logic
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("lims_user");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        isHydrated, // Exported to use in route guards
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
