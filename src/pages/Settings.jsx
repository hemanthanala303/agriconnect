import { useState } from "react";
import { User, Bell, Lock, Moon, Sun, Sprout, GraduationCap, Shield, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

export default function Settings() {
  const { user } = useAuth();
  const [theme, setTheme] = useState("light");
  const [message, setMessage] = useState({ type: "", text: "" });

  // Profile Settings State
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    phone: "",
    location: "",
    bio: "",
  });

  // Notification Settings State
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
  });

  // Security Settings State
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Farm Details State
  const [farmData, setFarmData] = useState({
    farmSize: "",
    soilType: "",
    irrigation: "",
    crops: "",
  });

  // Consultation Settings State
  const [consultationData, setConsultationData] = useState({
    hourlyRate: "",
    availability: "",
    expertise: "",
  });

  // System Settings State
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    userRegistration: true,
  });

  // Show message
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  // Save Profile
  const handleSaveProfile = async () => {
    if (!profileData.name.trim()) {
      showMessage("error", "Name is required");
      return;
    }
    try {
      console.log("Saving profile:", profileData);
      // TODO: Replace with actual API call
      // await profileAPI.updateProfile(profileData);
      showMessage("success", "Profile updated successfully!");
    } catch (err) {
      showMessage("error", "Failed to update profile");
    }
  };

  // Save Notifications
  const handleSaveNotifications = async () => {
    try {
      console.log("Saving notification preferences:", notifications);
      // TODO: Replace with actual API call
      // await settingsAPI.updateNotifications(notifications);
      showMessage("success", "Notification preferences saved!");
    } catch (err) {
      showMessage("error", "Failed to save notification preferences");
    }
  };

  // Save Theme
  const handleSaveTheme = async () => {
    try {
      console.log("Saving theme:", theme);
      // TODO: Replace with actual API call
      // await settingsAPI.updateTheme(theme);
      showMessage("success", "Theme updated successfully!");
    } catch (err) {
      showMessage("error", "Failed to update theme");
    }
  };

  // Change Password
  const handleChangePassword = async () => {
    if (!security.currentPassword || !security.newPassword || !security.confirmPassword) {
      showMessage("error", "All fields are required");
      return;
    }
    if (security.newPassword !== security.confirmPassword) {
      showMessage("error", "New passwords do not match");
      return;
    }
    if (security.newPassword.length < 6) {
      showMessage("error", "Password must be at least 6 characters");
      return;
    }
    try {
      console.log("Changing password");
      // TODO: Replace with actual API call
      // await authAPI.changePassword(security.currentPassword, security.newPassword);
      setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" });
      showMessage("success", "Password changed successfully!");
    } catch (err) {
      showMessage("error", err.message || "Failed to change password");
    }
  };

  // Save Farm Details
  const handleSaveFarmDetails = async () => {
    if (!farmData.farmSize || !farmData.soilType || !farmData.crops) {
      showMessage("error", "Please fill in all required fields");
      return;
    }
    try {
      console.log("Saving farm details:", farmData);
      // TODO: Replace with actual API call
      // await farmerAPI.updateFarmDetails(farmData);
      showMessage("success", "Farm details saved successfully!");
    } catch (err) {
      showMessage("error", "Failed to save farm details");
    }
  };

  // Save Consultation Settings
  const handleSaveConsultationSettings = async () => {
    if (!consultationData.hourlyRate || !consultationData.availability) {
      showMessage("error", "Please fill in all required fields");
      return;
    }
    try {
      console.log("Saving consultation settings:", consultationData);
      // TODO: Replace with actual API call
      // await expertAPI.updateConsultationSettings(consultationData);
      showMessage("success", "Consultation settings updated!");
    } catch (err) {
      showMessage("error", "Failed to update consultation settings");
    }
  };

  // Save System Settings
  const handleSaveSystemSettings = async () => {
    try {
      console.log("Saving system settings:", systemSettings);
      // TODO: Replace with actual API call
      // await adminAPI.updateSystemSettings(systemSettings);
      showMessage("success", "System settings saved successfully!");
    } catch (err) {
      showMessage("error", "Failed to save system settings");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900">Settings</h1>
        <p className="text-stone-500">Manage your account preferences and settings.</p>
      </div>

      {/* Message Alert */}
      {message.text && (
        <div className={`mb-4 rounded-lg p-4 flex items-center gap-2 ${
          message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
        }`}>
          {message.type === "success" ? (
            <Check className="h-5 w-5" />
          ) : (
            <X className="h-5 w-5" />
          )}
          {message.text}
        </div>
      )}

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="flex w-full flex-wrap justify-start gap-2 h-auto p-1 bg-stone-100 rounded-lg">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Sun className="h-4 w-4" /> Appearance
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" /> Security
          </TabsTrigger>
          
          {user?.role === "farmer" && (
            <TabsTrigger value="farm" className="flex items-center gap-2">
              <Sprout className="h-4 w-4" /> Farm Details
            </TabsTrigger>
          )}
          {user?.role === "expert" && (
            <TabsTrigger value="consultation" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" /> Consultation
            </TabsTrigger>
          )}
          {user?.role === "admin" && (
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Shield className="h-4 w-4" /> System
            </TabsTrigger>
          )}
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details and public profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Avatar</Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user?.email} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+91 98765 43210"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleSaveProfile}
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Choose what you want to be notified about.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-stone-200 p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-stone-500">Receive daily summaries and important alerts.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle"
                    checked={notifications.email}
                    onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-stone-200 p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Push Notifications</Label>
                  <p className="text-sm text-stone-500">Receive real-time alerts on your device.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle"
                    checked={notifications.push}
                    onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-stone-200 p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Marketing Emails</Label>
                  <p className="text-sm text-stone-500">Receive news, updates, and promotional offers.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle"
                    checked={notifications.marketing}
                    onChange={(e) => setNotifications({ ...notifications, marketing: e.target.checked })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleSaveNotifications}
              >
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how the app looks on your device.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div
                    className={`cursor-pointer rounded-lg border-2 p-4 text-center hover:border-green-600 ${theme === 'light' ? 'border-green-600 bg-green-50' : 'border-stone-200'}`}
                    onClick={() => setTheme('light')}
                  >
                    <Sun className="mx-auto mb-2 h-6 w-6" />
                    <span className="text-sm font-medium">Light</span>
                  </div>
                  <div
                    className={`cursor-pointer rounded-lg border-2 p-4 text-center hover:border-green-600 ${theme === 'dark' ? 'border-green-600 bg-green-50' : 'border-stone-200'}`}
                    onClick={() => setTheme('dark')}
                  >
                    <Moon className="mx-auto mb-2 h-6 w-6" />
                    <span className="text-sm font-medium">Dark</span>
                  </div>
                  <div
                    className={`cursor-pointer rounded-lg border-2 p-4 text-center hover:border-green-600 ${theme === 'system' ? 'border-green-600 bg-green-50' : 'border-stone-200'}`}
                    onClick={() => setTheme('system')}
                  >
                    <span className="mx-auto mb-2 block h-6 w-6 text-xl font-bold">💻</span>
                    <span className="text-sm font-medium">System</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleSaveTheme}
              >
                Update Theme
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your password and account security.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={security.currentPassword}
                  onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={security.newPassword}
                  onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={security.confirmPassword}
                  onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleChangePassword}
              >
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Role Specific: Farmer */}
        <TabsContent value="farm">
          <Card>
            <CardHeader>
              <CardTitle>Farm Details</CardTitle>
              <CardDescription>Manage your farm information for better recommendations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="farm-size">Total Land Size (Acres)</Label>
                  <Input
                    id="farm-size"
                    type="number"
                    placeholder="e.g., 10"
                    value={farmData.farmSize}
                    onChange={(e) => setFarmData({ ...farmData, farmSize: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="soil-type">Soil Type</Label>
                  <Input
                    id="soil-type"
                    placeholder="e.g., Loamy, Clay"
                    value={farmData.soilType}
                    onChange={(e) => setFarmData({ ...farmData, soilType: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="irrigation">Irrigation Source</Label>
                  <Input
                    id="irrigation"
                    placeholder="e.g., Tube Well, Canal"
                    value={farmData.irrigation}
                    onChange={(e) => setFarmData({ ...farmData, irrigation: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crops">Primary Crops</Label>
                  <Input
                    id="crops"
                    placeholder="e.g., Wheat, Rice"
                    value={farmData.crops}
                    onChange={(e) => setFarmData({ ...farmData, crops: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleSaveFarmDetails}
              >
                Save Farm Details
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Role Specific: Expert */}
        <TabsContent value="consultation">
          <Card>
            <CardHeader>
              <CardTitle>Consultation Settings</CardTitle>
              <CardDescription>Manage your availability and consultation fees.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hourly-rate">Hourly Rate (₹)</Label>
                <Input
                  id="hourly-rate"
                  type="number"
                  placeholder="e.g., 500"
                  value={consultationData.hourlyRate}
                  onChange={(e) => setConsultationData({ ...consultationData, hourlyRate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Input
                  id="availability"
                  placeholder="e.g., Mon-Fri, 9AM - 5PM"
                  value={consultationData.availability}
                  onChange={(e) => setConsultationData({ ...consultationData, availability: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expertise">Areas of Expertise</Label>
                <Textarea
                  id="expertise"
                  placeholder="e.g., Organic Farming, Pest Control"
                  value={consultationData.expertise}
                  onChange={(e) => setConsultationData({ ...consultationData, expertise: e.target.value })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleSaveConsultationSettings}
              >
                Update Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Role Specific: Admin */}
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Platform-wide configurations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-stone-200 p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Maintenance Mode</Label>
                  <p className="text-sm text-stone-500">Disable platform access for users.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle"
                    checked={systemSettings.maintenanceMode}
                    onChange={(e) => setSystemSettings({ ...systemSettings, maintenanceMode: e.target.checked })}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-stone-200 p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">User Registration</Label>
                  <p className="text-sm text-stone-500">Allow new users to sign up.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="toggle"
                    checked={systemSettings.userRegistration}
                    onChange={(e) => setSystemSettings({ ...systemSettings, userRegistration: e.target.checked })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="bg-stone-900 text-white hover:bg-stone-800"
                onClick={handleSaveSystemSettings}
              >
                Save System Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
