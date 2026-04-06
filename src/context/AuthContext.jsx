import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "@/lib/api";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("agri_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user:", e);
        localStorage.removeItem("agri_user");
      }
    }
  }, []);

  const login = async (email, password, role) => {
    setIsLoading(true);
    setError(null);
    try {
      // API returns directly from response interceptor
      const response = await authAPI.login(email, password);

      // Backend returns: { success: true, data: { id, email, firstName, lastName, userType, token } }
      // OR { token, data: { ... } } depending on implementation
      const data = response?.data || response;
      
      if (!data) {
        throw new Error("Invalid response from server");
      }

      // Map backend response to User object
      const userData = {
        id: data?.id,
        firstName: data?.firstName,
        lastName: data?.lastName,
        name: `${data?.firstName || ""} ${data?.lastName || ""}`,
        email: data?.email || email,
        role: (data?.userType || role || "farmer").toLowerCase(),
        userType: data?.userType,
        phone: data?.phone,
        address: data?.address,
        avatar: data?.profilePicture,
      };

      const token = data?.token;
      if (!token) {
        throw new Error("No token received from server");
      }

      setUser(userData);
      localStorage.setItem("agri_user", JSON.stringify(userData));
      localStorage.setItem("authToken", token);

      return userData;
    } catch (err) {
      const errorMessage =
        err?.message || err?.error || "Login failed. Please check your credentials.";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("📝 [AuthContext.register] Registering user with data:", userData);
      const response = await authAPI.register(userData);

      // Auto-login after registration
      // Backend returns: { success: true, data: { id, email, firstName, lastName, userType, token } }
      const data = response?.data || response;

      if (!data) {
        throw new Error("Invalid response from server");
      }

      const user = {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        name: `${data.firstName || ""} ${data.lastName || ""}`,
        email: data.email,
        role: (data.userType || "farmer").toLowerCase(),
        userType: data.userType,
        phone: data.phone,
        address: data.address,
        avatar: data.profilePicture,
      };

      const token = data.token;
      if (!token) {
        throw new Error("No token received from server");
      }

      setUser(user);
      localStorage.setItem("agri_user", JSON.stringify(user));
      localStorage.setItem("authToken", token);

      console.log("✅ [AuthContext.register] Registration successful!");
      return user;
    } catch (err) {
      // Extract error message from different possible formats
      let errorMessage = "Registration failed.";
      
      if (err?.error) {
        // If error is from API interceptor
        errorMessage = typeof err.error === "string" ? err.error : err.error.message || "Registration failed.";
      } else if (err?.message) {
        // If error is standard Error object
        errorMessage = err.message;
      } else if (err?.response?.data?.message) {
        // If error has nested message
        errorMessage = err.response.data.message;
      } else if (err?.response?.data?.error) {
        // If error has error field
        errorMessage = err.response.data.error;
      }

      console.error("❌ [AuthContext.register] Registration error:", errorMessage);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Optional: call logout endpoint if backend supports it
      // await authAPI.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      // Clear all auth-related localStorage items
      localStorage.removeItem("authToken");
      localStorage.removeItem("agri_user");
      localStorage.removeItem("user");
      localStorage.removeItem("userType");
      localStorage.removeItem("userId");
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
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
