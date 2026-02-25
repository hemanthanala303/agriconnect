import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export type UserRole = "farmer" | "expert" | "admin" | "public" | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // We can't use useNavigate here directly if AuthProvider is outside Router, 
  // but usually it's inside. Let's assume App structure handles this or we just manage state here.
  // Actually, for redirects, it's better to handle in the component or use a wrapper.
  
  // Load from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("agri_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (role: UserRole) => {
    // Mock login logic
    let mockUser: User;
    
    switch (role) {
      case "admin":
        mockUser = {
          id: "admin-1",
          name: "Admin User",
          email: "admin@agriconnect.com",
          role: "admin",
          avatar: "https://picsum.photos/seed/admin/200"
        };
        break;
      case "expert":
        mockUser = {
          id: "expert-1",
          name: "Dr. Sarah Singh",
          email: "sarah@agriconnect.com",
          role: "expert",
          avatar: "https://picsum.photos/seed/sarah/200"
        };
        break;
      case "public":
        mockUser = {
          id: "public-1",
          name: "Guest User",
          email: "guest@example.com",
          role: "public",
          avatar: "https://picsum.photos/seed/guest/200"
        };
        break;
      case "farmer":
      default:
        mockUser = {
          id: "farmer-1",
          name: "Rajesh Kumar",
          email: "rajesh@example.com",
          role: "farmer",
          avatar: "https://picsum.photos/seed/rajesh/200"
        };
        break;
    }

    setUser(mockUser);
    localStorage.setItem("agri_user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("agri_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
