"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types";

interface AuthContextType {
  user: User;
  setUserRole: (role: UserRole) => void;
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const defaultUser: User = {
  id: "usr-admin-01",
  name: "Dr. Vikramaditya Singhal",
  email: "admin@nuvertos.health",
  role: "Hospital Admin",
  avatar: "VS",
  photoUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
  department: "Executive Management",
  branchId: "branch-1",
};

const AuthContext = createContext<AuthContextType>({
  user: defaultUser,
  setUserRole: () => {},
  login: () => {},
  logout: () => {},
  isAuthenticated: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("nuvertos_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        queueMicrotask(() => {
          setUser(parsed);
        });
      }
    } catch {
      // fallback to default
    }
  }, []);

  const setUserRole = (role: UserRole) => {
    let name = "Dr. Vikramaditya Singhal";
    let department = "Executive Management";
    let photoUrl = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80";

    switch (role) {
      case "Super Admin":
        name = "Kavita R. Deshmukh (Group CIO)";
        department = "System Administration";
        photoUrl = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80";
        break;
      case "Hospital Admin":
        name = "Dr. Vikramaditya Singhal";
        department = "Executive Management";
        photoUrl = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80";
        break;
      case "Doctor":
        name = "Dr. Arvind Subramaniam";
        department = "Cardiology";
        photoUrl = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80";
        break;
      case "Receptionist":
        name = "Sneha K. Varma";
        department = "Front Desk & Registrations";
        photoUrl = "https://images.unsplash.com/photo-1594824813508-4d64319087cf?w=150&auto=format&fit=crop&q=80";
        break;
      case "Nurse":
        name = "Sister Marykutty Thomas";
        department = "Coronary ICU (CCU)";
        photoUrl = "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=150&auto=format&fit=crop&q=80";
        break;
      case "Accountant":
        name = "Ramesh P. Kulkarni";
        department = "Accounts & Billing";
        photoUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80";
        break;
      case "Pharmacist":
        name = "Deepak S. Joshi";
        department = "Central Pharmacy";
        photoUrl = "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80";
        break;
      case "Lab Technician":
        name = "Pooja V. Patil";
        department = "Clinical Pathology & Biochemistry";
        photoUrl = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80";
        break;
    }

    const updatedUser: User = {
      ...user,
      role,
      name,
      department,
      photoUrl,
      avatar: name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join(""),
    };
    setUser(updatedUser);
    localStorage.setItem("nuvertos_user", JSON.stringify(updatedUser));
  };

  const login = (email: string, role: UserRole = "Hospital Admin") => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUserRole,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
