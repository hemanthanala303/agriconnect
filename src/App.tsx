import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Learning from "@/pages/Learning";
import Opportunities from "@/pages/Opportunities";
import Community from "@/pages/Community";
import Experts from "@/pages/Experts";
import Admin from "@/pages/Admin";
import Profile from "@/pages/Profile";
import Help from "@/pages/Help";

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
                <ProtectedRoute allowedRoles={["farmer", "expert", "public"]}>
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
                <ProtectedRoute allowedRoles={["farmer", "expert", "public"]}>
                  <Community />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute allowedRoles={["farmer", "expert", "admin", "public"]}>
                  <Profile />
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
