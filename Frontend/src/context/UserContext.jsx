// src/context/UserContext.jsx
import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("id");

  // Fetch profile from backend
  const fetchProfile = async () => {
    if (!token || !userid) return;
    try {
      const res = await axios.get(`http://localhost:3000/upload/${userid}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data.data?.[0] || null); // only one profile per user
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <UserContext.Provider value={{ profile, setProfile, fetchProfile }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy access
export const useUser = () => useContext(UserContext);
