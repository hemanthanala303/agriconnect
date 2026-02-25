import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Sprout, User, ShieldCheck, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth, UserRole } from "@/context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // Get return url from location state or default to dashboard
  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const handleLogin = async (role: UserRole) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    login(role);
    setIsLoading(false);
    
    // Redirect based on role if no specific return url
    if ((location.state as any)?.from) {
      navigate(from, { replace: true });
    } else {
      switch (role) {
        case "admin":
          navigate("/admin");
          break;
        case "expert":
          navigate("/experts");
          break;
        case "farmer":
        default:
          navigate("/dashboard");
          break;
      }
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-stone-50 px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white">
            <Sprout className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-stone-900">
            Welcome back
          </h2>
          <p className="mt-2 text-stone-500">
            Sign in to your AgriConnect account
          </p>
        </div>

        <Tabs defaultValue="farmer" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="farmer">Farmer</TabsTrigger>
            <TabsTrigger value="expert">Expert</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="farmer">
            <LoginForm 
              role="farmer" 
              icon={<User className="h-5 w-5" />} 
              label="Farmer Login"
              description="Access your dashboard, crops, and community."
              onLogin={() => handleLogin("farmer")}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="expert">
            <LoginForm 
              role="expert" 
              icon={<GraduationCap className="h-5 w-5" />} 
              label="Expert Login"
              description="Manage courses, content, and consultations."
              onLogin={() => handleLogin("expert")}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="admin">
            <LoginForm 
              role="admin" 
              icon={<ShieldCheck className="h-5 w-5" />} 
              label="Admin Login"
              description="Platform management and analytics."
              onLogin={() => handleLogin("admin")}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

interface LoginFormProps {
  role: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  onLogin: () => void;
  isLoading: boolean;
}

function LoginForm({ role, icon, label, description, onLogin, isLoading }: LoginFormProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-stone-600">
            {icon}
          </div>
          <CardTitle>{label}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`${role}-email`}>Email</Label>
          <Input 
            id={`${role}-email`} 
            type="email" 
            placeholder="name@example.com" 
            defaultValue={role === 'admin' ? 'admin@agriconnect.com' : role === 'expert' ? 'sarah@agriconnect.com' : 'rajesh@example.com'}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${role}-password`}>Password</Label>
          <Input id={`${role}-password`} type="password" defaultValue="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-green-600 hover:bg-green-700" onClick={onLogin} disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </CardFooter>
    </Card>
  );
}
