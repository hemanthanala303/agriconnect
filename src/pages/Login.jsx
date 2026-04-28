import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Sprout, User, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login, register, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRole, setSelectedRole] = useState("farmer");
  const [isSignUp, setIsSignUp] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [successEmail, setSuccessEmail] = useState("");

  // Get return url from location state or default to dashboard
  const from = location.state?.from?.pathname || "/dashboard";

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    clearError();
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setRegistrationSuccess(false);
    clearError();
  };

  const switchToLogin = () => {
    setIsSignUp(false);
    setRegistrationSuccess(false);
    clearError();
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
            {isSignUp ? "Create Account" : "Welcome back"}
          </h2>
          <p className="mt-2 text-stone-500">
            {isSignUp ? "Join AgriConnect today" : "Sign in to your AgriConnect account"}
          </p>
        </div>

        {!isSignUp ? (
          <>
            {/* Registration Success Message */}
            {registrationSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-center"
              >
                <div className="text-sm font-medium text-green-800">
                  ✅ Registration Successful!
                </div>
                <p className="mt-1 text-sm text-green-700">
                  Your account has been created. Please log in with your email to access AgriConnect.
                </p>
              </motion.div>
            )}

            <Tabs value={selectedRole || "farmer"} onValueChange={handleRoleChange} className="w-full">
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
                  isLoading={isLoading}
                  error={error}
                  onLogin={login}
                  navigate={navigate}
                  from={from}
                  defaultEmail={successEmail}
                />
              </TabsContent>

              <TabsContent value="expert">
                <LoginForm
                  role="expert"
                  icon={<GraduationCap className="h-5 w-5" />}
                  label="Expert Login"
                  description="Manage courses, content, and consultations."
                  isLoading={isLoading}
                  error={error}
                  onLogin={login}
                  navigate={navigate}
                  from={from}
                  defaultEmail={successEmail}
                />
              </TabsContent>

              <TabsContent value="admin">
                <LoginForm
                  role="admin"
                  icon={<User className="h-5 w-5" />}
                  label="Admin Login"
                  description="Manage users, content, and system settings."
                  isLoading={isLoading}
                  error={error}
                  onLogin={login}
                  navigate={navigate}
                  from={from}
                  defaultEmail={successEmail}
                />
              </TabsContent>


            </Tabs>
            
            <div className="mt-6 text-center text-sm">
              <p className="text-stone-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={toggleSignUp}
                  className="font-semibold text-green-600 hover:text-green-700"
                >
                  Create one here
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <SignUpForm
              isLoading={isLoading}
              error={error}
              onRegister={register}
              onRegistrationSuccess={(email) => {
                setSuccessEmail(email);
                setRegistrationSuccess(true);
                setIsSignUp(false);
              }}
            />
            
            <div className="mt-6 text-center text-sm">
              <p className="text-stone-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={switchToLogin}
                  className="font-semibold text-green-600 hover:text-green-700"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

function LoginForm({
  role,
  icon,
  label,
  description,
  isLoading,
  error,
  onLogin,
  navigate,
  from,
  defaultEmail = "",
}) {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!email || !password) {
      setLocalError("Please enter both email and password");
      return;
    }

    try {
      console.log("🔐 [LoginForm.handleSubmit] Starting login...");
      // Pass role as optional parameter for UI context, but login service uses email/password only
      const loginResult = await onLogin(email, password, role);
      console.log("✅ [LoginForm.handleSubmit] Login successful, result:", loginResult);
      
      // Navigate on successful login - use the from location or dashboard
      console.log("🧭 [LoginForm.handleSubmit] Navigating to:", from);
      navigate(from, { replace: true });
    } catch (err) {
      console.error("❌ [LoginForm.handleSubmit] Login failed:", err);
      const errorMsg = err?.message || err?.error || "Login failed. Please try again.";
      setLocalError(errorMsg);
    }
  };

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
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {(error || localError) && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
              {error || localError}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor={`${role}-email`}>Email</Label>
            <Input
              id={`${role}-email`}
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${role}-password`}>Password</Label>
            <Input
              id={`${role}-password`}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

function SignUpForm({
  isLoading,
  error,
  onRegister,
  onRegistrationSuccess,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "farmer",
    phone: "",
    address: "",
  });
  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    // ✅ Validation: Check all required fields
    if (!formData.firstName?.trim()) {
      setLocalError("First name is required");
      return;
    }
    if (!formData.lastName?.trim()) {
      setLocalError("Last name is required");
      return;
    }
    if (!formData.email?.trim()) {
      setLocalError("Email is required");
      return;
    }
    if (!formData.password) {
      setLocalError("Password is required");
      return;
    }
    if (!formData.userType) {
      setLocalError("Account type is required");
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setLocalError("Password must be at least 6 characters long");
      return;
    }

    // ✅ Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setLocalError("Please enter a valid email address");
      return;
    }

    try {
      // ✅ Transform payload to match backend expectations
      const submitPayload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        // ✅ Convert userType to UPPERCASE role (backend expects FARMER, EXPERT, ADMIN)
        role: formData.userType.toUpperCase(),
        // Optional fields
        ...(formData.phone && { phone: formData.phone.trim() }),
        ...(formData.address && { address: formData.address.trim() }),
      };

      // ✅ DEBUG: Log the exact payload being sent
      console.log("📤 Sending register request with payload:", submitPayload);
      console.log("Content-Type header: application/json");

      await onRegister(submitPayload);

      // ✅ Registration successful - show success message and switch to login
      console.log("✅ Registration successful!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "farmer",
        phone: "",
        address: "",
      });
      onRegistrationSuccess(formData.email);
    } catch (err) {
      console.error("❌ Registration error:", err);
      setLocalError(err.message || "Registration failed");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Your Account</CardTitle>
        <CardDescription>Join AgriConnect to access farming resources and community</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {(error || localError) && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
              {error || localError}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="userType">Account Type *</Label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-3 py-2 rounded-md border border-stone-300 bg-white text-stone-900"
            >
              <option value="farmer">Farmer</option>
              <option value="expert">Expert</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="Your address"
              value={formData.address}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
