import React, { createContext, useContext, useState, useEffect } from "react";

import { authService } from "@/services/authService";

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  //login logic
  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);

      localStorage.setItem("token", data.token);

      // Store key business info in the user Context.
      setUser({
        userId: data.userId,
        email: data.email,
        role: data.role,
      });

      return true; // login successful
    } catch (error) {
      console.error("Login API Error:", error);
      return false; // login failed
    }
  };

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
