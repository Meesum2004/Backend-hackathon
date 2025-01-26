
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"

export const AuthContext = createContext("");
const token = Cookies.get('token');
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => ({
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
  }));

  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfile(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  useEffect(() => {
    if (user.userId) {
      localStorage.setItem("userId", user.userId);
    }
  }, [user.userId]);

  return (
    <AuthContext.Provider value={{ user, setUser, profile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthentication = () => useContext(AuthContext);
