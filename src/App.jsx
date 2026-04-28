import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Learning from "@/pages/Learning";
import PublicResources from "@/pages/PublicResources";
import Opportunities from "@/pages/Opportunities";
import Community from "@/pages/Community";
import Experts from "@/pages/Experts";
import Admin from "@/pages/Admin";
import Profile from "@/pages/Profile";
import Help from "@/pages/Help";
import Settings from "@/pages/Settings";



// Component to handle Resources page - redirect authenticated farmers/experts to Learning
function ResourcesRoute() {
  const { user, isAuthenticated } = useAuth();
  
  // Redirect authenticated farmers and experts to Learning page
  if (isAuthenticated && (user?.role === "farmer" || user?.role === "expert")) {
    return <Navigate to="/learning" replace />;
  }
  
  // Show public resources page for unauthenticated visitors
  return <PublicResources />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/help" element={<Help />} />
            <Route path="/resources" element={<ResourcesRoute />} />

            {/* Farmer Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute allowedRoles={["farmer"]}>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/learning" 
              element={
                <ProtectedRoute allowedRoles={["farmer", "expert"]}>
                  <Learning />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/opportunities" 
              element={
                <ProtectedRoute allowedRoles={["farmer"]}>
                  <Opportunities />
                </ProtectedRoute>
              } 
            />
            
            {/* Shared Routes */}
            <Route 
              path="/community" 
              element={
                <ProtectedRoute allowedRoles={["farmer", "expert"]}>
                  <Community />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute allowedRoles={["farmer", "expert", "admin"]}>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute allowedRoles={["farmer", "expert", "admin"]}>
                  <Settings />
                </ProtectedRoute>
              } 
            />

            {/* Expert Routes */}
            <Route 
              path="/experts" 
              element={
                <ProtectedRoute allowedRoles={["expert"]}>
                  <Experts />
                </ProtectedRoute>
              } 
            />

            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Admin />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
