import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated, isInitialized } = useAuth();
  const location = useLocation();

  // Wait for auth initialization to complete
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-stone-600">Loading...</p>
        </div>
      </div>
    );
  }

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
