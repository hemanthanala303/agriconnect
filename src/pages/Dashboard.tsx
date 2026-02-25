import { motion } from "motion/react";
import { Plus, Bell, Calendar, Sprout, ArrowUpRight } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";
import { MarketWidget } from "@/components/dashboard/MarketWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const crops = [
  { name: "Wheat (HD-2967)", area: "5 Acres", status: "Growing", progress: 65, harvest: "April 15, 2024" },
  { name: "Mustard", area: "2 Acres", status: "Flowering", progress: 40, harvest: "March 10, 2024" },
  { name: "Potato", area: "3 Acres", status: "Ready", progress: 95, harvest: "Feb 28, 2024" },
];

const notifications = [
  { title: "Weather Alert", message: "Heavy rain expected tomorrow. Secure your crops.", time: "2h ago", type: "warning" },
  { title: "Market Update", message: "Wheat prices up by 5% in local mandi.", time: "5h ago", type: "info" },
  { title: "Expert Reply", message: "Dr. Singh replied to your query on pest control.", time: "1d ago", type: "success" },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-stone-50">
      <Sidebar />
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
              Welcome back, Rajesh!
            </h1>
            <p className="text-stone-500">Here's what's happening on your farm today.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Crop
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Stats Overview */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Area</CardTitle>
                  <Sprout className="h-4 w-4 text-stone-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12 Acres</div>
                  <p className="text-xs text-stone-500">+2 acres from last year</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Crops</CardTitle>
                  <Sprout className="h-4 w-4 text-stone-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-stone-500">Wheat, Mustard, Potato</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Est. Revenue</CardTitle>
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹4.5L</div>
                  <p className="text-xs text-stone-500">+12% projected</p>
                </CardContent>
              </Card>
            </div>

            {/* My Crops */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>My Crops</CardTitle>
                <CardDescription>Monitor the health and progress of your current crops.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {crops.map((crop, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-stone-100 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                          <Sprout className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-stone-900">{crop.name}</p>
                          <p className="text-sm text-stone-500">{crop.area} • Harvest: {crop.harvest}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge variant={crop.status === 'Ready' ? 'success' : 'secondary'}>
                          {crop.status}
                        </Badge>
                        <div className="h-2 w-24 rounded-full bg-stone-100">
                          <div 
                            className="h-full rounded-full bg-green-500" 
                            style={{ width: `${crop.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tasks & Activities */}
            <Tabs defaultValue="tasks" className="w-full">
              <TabsList>
                <TabsTrigger value="tasks">Upcoming Tasks</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="tasks" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="mt-1 h-2 w-2 rounded-full bg-yellow-400" />
                          <div>
                            <p className="text-sm font-medium text-stone-900">Apply fertilizer to Wheat field</p>
                            <p className="text-xs text-stone-500">Due tomorrow • High Priority</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="activity" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-stone-500">No recent activity.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <WeatherWidget />
            <MarketWidget />
            
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {notifications.map((notif, index) => (
                      <div key={index} className="flex gap-3">
                        <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                          notif.type === 'warning' ? 'bg-red-500' : 
                          notif.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                        }`} />
                        <div>
                          <p className="text-sm font-medium text-stone-900">{notif.title}</p>
                          <p className="text-xs text-stone-500">{notif.message}</p>
                          <p className="mt-1 text-[10px] text-stone-400">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
