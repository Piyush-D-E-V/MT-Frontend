
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import API_URL from "../services/api";

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check existing login session
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/users/current-user`, {
          method: "GET",
          credentials: "include",
        });

        setIsAuthenticated(response.ok);
      } catch (error) {
        console.log(error);
        
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/users/logout`, {
        method: "POST",
        credentials: "include",
      });

      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
