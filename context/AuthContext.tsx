"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  name: string;
  email: string;
  avatar: string;
  role: "customer" | "admin";
  joinedAt: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (user: Omit<User, "role" | "joinedAt"> & { role?: User["role"]; joinedAt?: string }) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("pixelden_user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser({
          role: "customer",
          joinedAt: new Date().toISOString(),
          ...parsed,
        });
      } catch {}
    }
  }, []);

  const signIn = (userData: Omit<User, "role" | "joinedAt"> & { role?: User["role"]; joinedAt?: string }) => {
    const fullUser: User = {
      ...userData,
      role: userData.role || "customer",
      joinedAt: userData.joinedAt || new Date().toISOString(),
    };
    setUser(fullUser);
    localStorage.setItem("pixelden_user", JSON.stringify(fullUser));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("pixelden_user");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
