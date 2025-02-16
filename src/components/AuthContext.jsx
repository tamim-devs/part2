import React, { createContext, useContext, useState } from "react";

// Create an AuthContext to manage authentication state
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext); // Custom hook to access authentication state
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login function to set authenticated to true
  const login = () => {
    setIsAuthenticated(true);
  };

  // Logout function to set authenticated to false
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
