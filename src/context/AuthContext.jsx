import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/auth.service";
import { StorageUtil } from "../utils/storage.util";

const AuthContext = React.createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = () => {
    const token = StorageUtil.getToken();
    const userData = StorageUtil.getUserData();

    if (token && userData) {
      setUser(userData);
      setIsAuthenticated(true);
    }

    setLoading(false);
  };

  const login = async (credentials) => {
    try {
      const result = await authService.login(credentials);

      if (result.success) {
        const userData = result.data.user || { email: credentials.email };
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true };
      }
      // Always return a proper failure object

      if (!result.success) {
        return {
          success: false,
          message: result.message,
        };
      }
      return {
        success: false,
        message: result.message,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Login failed",
      };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
export { AuthProvider, useAuth };
