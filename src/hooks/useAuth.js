
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loginComplete, setLoginComplete] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser({ id: decodedToken._id, role: decodedToken.role });
        setLoginComplete(true);
      } catch (error) {
        console.error("Token decoding failed", error);
        setUser(null);
        setLoginComplete(false);
      }
    }
  }, []);

  useEffect(() => {
    console.log("AuthProvider user state changed:", user);
  }, [user]);

  const login = async (data) => {
    try {
      const url = "https://food-easy-vp5t.onrender.com/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      const decodedToken = jwtDecode(res.data);
      const userData = { id: decodedToken._id, role: decodedToken.role };
      setUser(userData);
      setLoginComplete(true);
      console.log("User set in AuthProvider:", userData);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setLoginComplete(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loginComplete }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
