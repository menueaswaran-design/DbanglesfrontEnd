import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isAuthenticated = () => {
    return user !== null;
  };

  const getUserId = () => {
    return user?.uid || null;
  };

  const getUserEmail = () => {
    return user?.email || null;
  };

  const getUserPhone = () => {
    return user?.phoneNumber || null;
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, getUserId, getUserEmail, getUserPhone }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
