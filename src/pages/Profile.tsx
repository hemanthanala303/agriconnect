import { motion } from "motion/react";
import { MapPin, Calendar, Mail, Phone, Edit, Award, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Profile() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="mb-4 flex justify-center">
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                  <AvatarImage src="https://picsum.photos/seed/rajesh/200" />
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>
              </div>
              <h2 className="text-2xl font-bold text-stone-900">Rajesh Kumar</h2>
              <p className="text-stone-500">Wheat & Mustard Farmer</p>
              <div className="mt-4 flex justify-center gap-2">
                <Badge variant="secondary">Premium Member</Badge>
                <Badge variant="outline">Verified</Badge>
              </div>
              
              <div className="mt-6 space-y-3 text-left">
                <div className="flex items-center gap-3 text-sm text-stone-600">
                  <MapPin className="h-4 w-4" />
                  Punjab, India
                </div>
                <div className="flex items-center gap-3 text-sm text-stone-600">
                  <Calendar className="h-4 w-4" />
                  Joined March 2021
                </div>
                <div className="flex items-center gap-3 text-sm text-stone-600">
                  <Mail className="h-4 w-4" />
                  rajesh.k@example.com
                </div>
                <div className="flex items-center gap-3 text-sm text-stone-600">
                  <Phone className="h-4 w-4" />
                  +91 98765 43210
                </div>
              </div>

              <div className="mt-6">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-stone-900">Top Contributor</p>
                    <p className="text-xs text-stone-500">Community Forum 2023</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Sprout className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-stone-900">Sustainable Farmer</p>
                    <p className="text-xs text-stone-500">Certified Practice</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="crops">Farm Details</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="activity" className="mt-6 space-y-6">
              <h3 className="text-lg font-semibold text-stone-900">Recent Activity</h3>
              <div className="relative border-l border-stone-200 pl-6 space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-white bg-green-500 shadow-sm" />
                    <p className="text-sm text-stone-500 mb-1">2 days ago</p>
                    <Card>
                      <CardContent className="p-4">
                        <p className="font-medium text-stone-900">Posted in Community Forum</p>
                        <p className="text-sm text-stone-600 mt-1">"Has anyone tried the new organic fertilizer for wheat? Looking for reviews."</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="crops" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Farm Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-stone-200 p-4">
                      <p className="text-sm text-stone-500">Total Land Size</p>
                      <p className="text-xl font-bold text-stone-900">12 Acres</p>
                    </div>
                    <div className="rounded-lg border border-stone-200 p-4">
                      <p className="text-sm text-stone-500">Soil Type</p>
                      <p className="text-xl font-bold text-stone-900">Loamy</p>
                    </div>
                    <div className="rounded-lg border border-stone-200 p-4">
                      <p className="text-sm text-stone-500">Irrigation Source</p>
                      <p className="text-xl font-bold text-stone-900">Tube Well</p>
                    </div>
                    <div className="rounded-lg border border-stone-200 p-4">
                      <p className="text-sm text-stone-500">Primary Crops</p>
                      <p className="text-xl font-bold text-stone-900">Wheat, Mustard</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
