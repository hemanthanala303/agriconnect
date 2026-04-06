import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MapPin, Calendar, Mail, Phone, Edit, Award, Sprout, Loader, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { userAPI } from "@/lib/api";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    showProfilePublic: true,
    showEmail: false,
  });

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      try {
        setIsLoading(true);
        const response = await userAPI.getProfile(String(user.id));
        if (response.success || response.data) {
          setProfileData(response.data || response);
        }
      } catch (err) {
        setError(err.message || "Failed to load profile");
        console.error("Profile fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user?.id]);

  const displayData = profileData || user;

  const handleEditProfile = () => {
    navigate("/settings?tab=profile");
  };

  const handlePrivacyChange = (setting) => {
    const updated = { ...privacySettings, [setting]: !privacySettings[setting] };
    setPrivacySettings(updated);
    console.log("Privacy settings updated:", updated);
    // TODO: Replace with actual API call
    // await userAPI.updatePrivacySettings(updated);
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone. All your data will be permanently deleted."
    );
    
    if (!confirmed) return;

    // Double confirmation for safety
    const finalConfirm = window.confirm(
      "This is your last chance. After this, your account and all data will be gone forever."
    );
    
    if (!finalConfirm) return;

    try {
      console.log("Deleting account...");
      // TODO: Replace with actual API call
      // await userAPI.deleteAccount();
      
      // Mock delete - just log out
      logout();
      navigate("/");
    } catch (err) {
      console.error("Failed to delete account:", err);
      alert("Failed to delete account. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <Loader className="h-8 w-8 animate-spin text-green-600" />
          <p className="text-stone-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !displayData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-800">{error}</p>
            <p className="text-sm text-red-600 mt-2">Using cached profile information</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getInitials = () => {
    const first = displayData?.firstName?.[0] || "";
    const last = displayData?.lastName?.[0] || "";
    return (first + last).toUpperCase() || "U";
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="mb-4 flex justify-center">
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                  <AvatarImage src={displayData?.profilePicture} />
                  <AvatarFallback className="text-lg font-bold bg-green-100 text-green-600">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h2 className="text-2xl font-bold text-stone-900">
                {displayData?.firstName} {displayData?.lastName}
              </h2>
              <p className="text-stone-500 capitalize">
                {displayData?.userType || "Member"}
              </p>
              <div className="mt-4 flex justify-center gap-2 flex-wrap">
                <Badge variant="secondary">Active Member</Badge>
                <Badge variant="outline">Verified</Badge>
              </div>

              <div className="mt-6 space-y-3 text-left">
                {displayData?.address && (
                  <div className="flex items-center gap-3 text-sm text-stone-600">
                    <MapPin className="h-4 w-4" />
                    {displayData.address}
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm text-stone-600">
                  <Calendar className="h-4 w-4" />
                  Joined {new Date().getFullYear()}
                </div>
                <div className="flex items-center gap-3 text-sm text-stone-600">
                  <Mail className="h-4 w-4" />
                  {displayData?.email}
                </div>
                {displayData?.phone && (
                  <div className="flex items-center gap-3 text-sm text-stone-600">
                    <Phone className="h-4 w-4" />
                    {displayData.phone}
                  </div>
                )}
              </div>

              <div className="mt-6">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleEditProfile}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-600">User ID:</span>
                  <span className="font-medium text-stone-900">{displayData?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">User Type:</span>
                  <Badge>{displayData?.userType || "Public"}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Status:</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Active
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="info">Profile Info</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-stone-600">First Name</label>
                      <p className="text-stone-900 font-medium mt-1">
                        {displayData?.firstName || "—"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-stone-600">Last Name</label>
                      <p className="text-stone-900 font-medium mt-1">
                        {displayData?.lastName || "—"}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-stone-600">Email</label>
                      <p className="text-stone-900 font-medium mt-1">{displayData?.email}</p>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-stone-600">Phone</label>
                      <p className="text-stone-900 font-medium mt-1">
                        {displayData?.phone || "Not provided"}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-stone-600">Address</label>
                      <p className="text-stone-900 font-medium mt-1">
                        {displayData?.address || "Not provided"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">0</p>
                      <p className="text-sm text-stone-600 mt-1">Crops</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">0</p>
                      <p className="text-sm text-stone-600 mt-1">Consultations</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">0</p>
                      <p className="text-sm text-stone-600 mt-1">Resources</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-stone-200 rounded-lg">
                      <div>
                        <p className="font-medium text-stone-900">Show Profile Publicly</p>
                        <p className="text-sm text-stone-500">Others can see your profile</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={privacySettings.showProfilePublic}
                        onChange={() => handlePrivacyChange("showProfilePublic")}
                        className="w-4 h-4 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 border border-stone-200 rounded-lg">
                      <div>
                        <p className="font-medium text-stone-900">Show Email</p>
                        <p className="text-sm text-stone-500">Your email is visible to others</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={privacySettings.showEmail}
                        onChange={() => handlePrivacyChange("showEmail")}
                        className="w-4 h-4 cursor-pointer"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <p className="text-sm text-red-700">This action cannot be undone. All your data will be permanently deleted.</p>
                  </div>
                  <Button
                    variant="destructive"
                    className="w-full bg-red-600 hover:bg-red-700"
                    onClick={handleDeleteAccount}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
