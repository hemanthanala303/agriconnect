import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard if role doesn't match
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "expert") return <Navigate to="/experts" replace />;
    if (user.role === "public") return <Navigate to="/learning" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
