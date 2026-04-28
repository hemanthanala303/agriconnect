import { useState, useEffect } from "react";
import { Plus, Bell, Calendar as CalendarIcon, Sprout, ArrowUpRight, Check } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";
import { MarketWidget } from "@/components/dashboard/MarketWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { cropAPI, farmDataAPI } from "@/lib/api";
import { useFetch } from "@/lib/hooks";

export default function Dashboard() {
  const { user } = useAuth();
  console.log("👤 [Dashboard] Current user:", user);
  const [isAddCropOpen, setIsAddCropOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [crops, setCrops] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Add Crop Form State
  const [newCrop, setNewCrop] = useState({ 
    name: "", 
    variety: "",
    area: "", 
    soilType: "",
    irrigationType: "",
    harvestDate: undefined 
  });

  // Schedule Task Form State
  const [newTask, setNewTask] = useState({ title: "", description: "", date: undefined, priority: "Medium" });

  // Fetch crops
  const { data: cropsData, isLoading: cropsLoading, error: cropsError, refetch: refetchCrops } = useFetch(
    () => {
      if (!user?.id) return Promise.resolve([]);
      return cropAPI.getUserCrops(user?.id || "");
    },
    [user?.id]
  );

  // Fetch tasks
  const { data: tasksData, isLoading: tasksLoading, error: tasksError, refetch: refetchTasks } = useFetch(
    () => {
      if (!user?.id) return Promise.resolve([]);
      return farmDataAPI.getUserTasks(user?.id || "");
    },
    [user?.id]
  );

  // Update local state when data is fetched
  useEffect(() => {
    console.log("🌾 [Dashboard] cropsData updated:", cropsData);
    if (cropsData) {
      console.log("📊 [Dashboard] cropsData type:", typeof cropsData);
      console.log("📊 [Dashboard] cropsData is array:", Array.isArray(cropsData));
      console.log("📊 [Dashboard] cropsData keys:", Object.keys(cropsData || {}));
      
      let cropsArray = [];
      if (Array.isArray(cropsData)) {
        cropsArray = cropsData;
      } else if (cropsData?.data && Array.isArray(cropsData.data)) {
        cropsArray = cropsData.data;
      } else if (cropsData?.crops && Array.isArray(cropsData.crops)) {
        cropsArray = cropsData.crops;
      } else if (cropsData?.content && Array.isArray(cropsData.content)) {
        cropsArray = cropsData.content;
      }
      
      console.log("✅ [Dashboard] Setting crops array:", cropsArray);
      setCrops(cropsArray);
    }
  }, [cropsData]);

  useEffect(() => {
    console.log("📋 [Dashboard] tasksData updated:", tasksData);
    if (tasksData) {
      let tasksArray = [];
      if (Array.isArray(tasksData)) {
        tasksArray = tasksData;
      } else if (tasksData?.data && Array.isArray(tasksData.data)) {
        tasksArray = tasksData.data;
      } else if (tasksData?.tasks && Array.isArray(tasksData.tasks)) {
        tasksArray = tasksData.tasks;
      } else if (tasksData?.content && Array.isArray(tasksData.content)) {
        tasksArray = tasksData.content;
      }
      
      console.log("✅ [Dashboard] Setting tasks array:", tasksArray);
      setTasks(tasksArray);
    }
  }, [tasksData]);

  const handleAddCrop = async () => {
    if (!newCrop.name || !newCrop.area || !newCrop.harvestDate) {
      alert("Please fill in all required fields (Name, Area, Harvest Date)");
      return;
    }

    if (!user?.id) {
      alert("User not authenticated. Please log in again.");
      return;
    }

    try {
      console.log("🌾 [Dashboard.handleAddCrop] Adding crop with data:", newCrop);
      console.log("👤 [Dashboard.handleAddCrop] User ID:", user?.id);
      
      // Call correct API method: cropAPI.addCrop
      const cropData = {
        userId: user?.id,  // 🔥 INCLUDE USER ID
        name: newCrop.name,
        area: parseFloat(newCrop.area),
        harvestDate: format(newCrop.harvestDate, "yyyy-MM-dd"),
        // Add optional fields that might be in the form
        variety: newCrop.variety || "",
        soilType: newCrop.soilType || "",
        irrigationType: newCrop.irrigationType || "",
      };

      console.log("📤 [Dashboard.handleAddCrop] Sending to API:", cropData);
      const response = await cropAPI.addCrop(cropData);
      console.log("✅ [Dashboard.handleAddCrop] Crop added successfully:", response);

      // Reset form
      setIsAddCropOpen(false);
      setNewCrop({ name: "", variety: "", area: "", soilType: "", irrigationType: "", harvestDate: undefined });
      alert("✅ Crop added successfully!");
      
      // Refresh crops list after successful add
      console.log("🔄 [Dashboard.handleAddCrop] Refetching crops...");
      setTimeout(() => {
        refetchCrops().then((data) => {
          console.log("✅ [Dashboard.handleAddCrop] Crops refetched:", data);
        }).catch((err) => {
          console.error("❌ [Dashboard.handleAddCrop] Error refetching crops:", err);
        });
      }, 500);
    } catch (err) {
      console.error("❌ [Dashboard.handleAddCrop] Error adding crop:", err);
      const errorMsg = err?.message || err?.response?.data?.message || "Failed to add crop. Please try again.";
      alert(`Failed to add crop: ${errorMsg}`);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.title || !newTask.date) {
      alert("Please fill in all required fields (Title and Due Date)");
      return;
    }

    if (!user?.id) {
      alert("User not authenticated. Please log in again.");
      return;
    }

    try {
      console.log("📋 [Dashboard.handleAddTask] Adding task with data:", newTask);
      console.log("👤 [Dashboard.handleAddTask] User ID:", user?.id);
      
      // Call farmDataAPI to create task
      const taskData = {
        userId: user?.id,  // 🔥 INCLUDE USER ID
        title: newTask.title,
        description: newTask.description || "",
        dueDate: format(newTask.date, "yyyy-MM-dd"),
        priority: newTask.priority || "Medium",
        completed: false,
      };

      console.log("📤 [Dashboard.handleAddTask] Sending to API:", taskData);
      const response = await farmDataAPI.createTask(taskData);
      console.log("✅ [Dashboard.handleAddTask] Task added successfully:", response);

      // Reset form
      setIsScheduleOpen(false);
      setNewTask({ title: "", description: "", date: undefined, priority: "Medium" });
      alert("✅ Task scheduled successfully!");
      
      // Refresh tasks list after successful add
      console.log("🔄 [Dashboard.handleAddTask] Refetching tasks...");
      setTimeout(() => {
        refetchTasks().then((data) => {
          console.log("✅ [Dashboard.handleAddTask] Tasks refetched:", data);
        }).catch((err) => {
          console.error("❌ [Dashboard.handleAddTask] Error refetching tasks:", err);
        });
      }, 500);
    } catch (err) {
      console.error("❌ [Dashboard.handleAddTask] Error scheduling task:", err);
      const errorMsg = err?.message || err?.response?.data?.message || "Failed to schedule task. Please try again.";
      alert(`Failed to schedule task: ${errorMsg}`);
    }
  };

  const toggleTaskCompletion = async (id) => {
    try {
      console.log("✓ [Dashboard.toggleTaskCompletion] Toggling task:", id);
      const task = tasks.find((t) => t.id === id);
      if (task) {
        const updateData = { completed: !task.completed };
        console.log("📤 [Dashboard.toggleTaskCompletion] Sending update:", updateData);
        await farmDataAPI.updateTask(id, updateData);
        console.log("✅ [Dashboard.toggleTaskCompletion] Task updated successfully");
        await refetchTasks();
      } else {
        console.warn("⚠️ [Dashboard.toggleTaskCompletion] Task not found:", id);
      }
    } catch (err) {
      console.error("❌ [Dashboard.toggleTaskCompletion] Error updating task:", err);
      alert(`Failed to update task: ${err?.message || "Unknown error"}`);
    }
  };

  // Mock notifications (these would ideally come from WebSocket or polling)
  // TODO: Replace with real API call to fetch user notifications
  const notifications = [
    { title: "Weather Alert", message: "Heavy rain expected tomorrow. Secure your crops.", time: "2h ago", type: "warning" },
    { title: "Market Update", message: "Wheat prices up by 5% in local mandi.", time: "5h ago", type: "info" },
    { title: "Expert Reply", message: "Dr. Singh replied to your query on pest control.", time: "1d ago", type: "success" },
  ];

  return (
    <div className="flex min-h-screen bg-stone-50">
      <Sidebar />
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
              Welcome back, {user?.firstName || "Farmer"}!
            </h1>
            <p className="text-stone-500">Here's what's happening on your farm today.</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule New Task</DialogTitle>
                  <DialogDescription>Add a new task to your farming schedule.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="task-title" className="text-right">Task</Label>
                    <Input 
                      id="task-title" 
                      className="col-span-3" 
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "col-span-3 justify-start text-left font-normal",
                            !newTask.date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newTask.date ? format(newTask.date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newTask.date}
                          onSelect={(date) => setNewTask({...newTask, date})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="task-description" className="text-right mt-2">Description</Label>
                    <textarea 
                      id="task-description" 
                      className="col-span-3 rounded-md border border-stone-300 px-3 py-2 text-sm"
                      rows="3"
                      placeholder="Add details about this task..."
                      value={newTask.description}
                      onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Priority</Label>
                    <Select 
                      value={newTask.priority} 
                      onValueChange={(val) => setNewTask({...newTask, priority: val})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddTask}>Add Task</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isAddCropOpen} onOpenChange={setIsAddCropOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Crop
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Crop</DialogTitle>
                  <DialogDescription>Enter details about the new crop you are planting.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="crop-name" className="text-right">Crop Name *</Label>
                    <Input 
                      id="crop-name" 
                      className="col-span-3" 
                      placeholder="e.g. Rice (Basmati)"
                      value={newCrop.name}
                      onChange={(e) => setNewCrop({...newCrop, name: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="crop-variety" className="text-right">Variety</Label>
                    <Input 
                      id="crop-variety" 
                      className="col-span-3"
                      placeholder="e.g. Basmati 370"
                      value={newCrop.variety}
                      onChange={(e) => setNewCrop({...newCrop, variety: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="crop-area" className="text-right">Area (Acres) *</Label>
                    <Input 
                      id="crop-area" 
                      type="number" 
                      className="col-span-3"
                      placeholder="5"
                      value={newCrop.area}
                      onChange={(e) => setNewCrop({...newCrop, area: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="crop-soil" className="text-right">Soil Type</Label>
                    <select
                      id="crop-soil"
                      className="col-span-3 rounded-md border border-stone-300 bg-white px-3 py-2"
                      value={newCrop.soilType}
                      onChange={(e) => setNewCrop({...newCrop, soilType: e.target.value})}
                    >
                      <option value="">Select soil type</option>
                      <option value="Loamy">Loamy</option>
                      <option value="Clay">Clay</option>
                      <option value="Sandy">Sandy</option>
                      <option value="Alluvial">Alluvial</option>
                      <option value="Laterite">Laterite</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="crop-irrigation" className="text-right">Irrigation</Label>
                    <select
                      id="crop-irrigation"
                      className="col-span-3 rounded-md border border-stone-300 bg-white px-3 py-2"
                      value={newCrop.irrigationType}
                      onChange={(e) => setNewCrop({...newCrop, irrigationType: e.target.value})}
                    >
                      <option value="">Select irrigation type</option>
                      <option value="Drip">Drip</option>
                      <option value="Flood">Flood</option>
                      <option value="Sprinkler">Sprinkler</option>
                      <option value="Canal">Canal</option>
                      <option value="Rainfed">Rainfed</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Est. Harvest</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "col-span-3 justify-start text-left font-normal",
                            !newCrop.harvestDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newCrop.harvestDate ? format(newCrop.harvestDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newCrop.harvestDate}
                          onSelect={(date) => setNewCrop({...newCrop, harvestDate: date})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddCrop}>Add Crop</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                  <div className="text-2xl font-bold">
                    {cropsLoading ? '-' : crops.reduce((sum, c) => sum + (parseFloat(c.area) || 0), 0).toFixed(1)} {!cropsLoading && 'Acres'}
                  </div>
                  <p className="text-xs text-stone-500">
                    {cropsLoading ? 'Loading...' : crops.length > 0 ? "Active cultivation area" : "No crops yet"}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Crops</CardTitle>
                  <Sprout className="h-4 w-4 text-stone-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{cropsLoading ? '-' : crops.length}</div>
                  <p className="text-xs text-stone-500">
                    {cropsLoading ? 'Loading...' : crops.length > 0
                      ? crops.slice(0, 2).map(c => (c.name || 'Crop').split(' ')[0]).join(', ') + (crops.length > 2 ? '...' : '')
                      : "No active crops"}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tasksLoading ? '-' : tasks.filter(t => !t.completed).length}</div>
                  <p className="text-xs text-stone-500">
                    {tasksLoading ? 'Loading...' : tasks.filter(t => t.completed).length + ' completed'}
                  </p>
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
                {crops.length === 0 ? (
                  <div className="text-center py-8">
                    <Sprout className="h-12 w-12 text-stone-300 mx-auto mb-3" />
                    <p className="text-stone-500">No crops added yet. Click "Add Crop" to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {crops.map((crop) => (
                      <div key={crop.id} className="flex items-center justify-between border-b border-stone-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <Sprout className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-stone-900">{crop.name || 'Unnamed Crop'}</p>
                            <p className="text-sm text-stone-500">
                              {crop.area} Acres • {crop.soilType || 'N/A'} Soil • Harvest: {crop.harvestDate ? format(new Date(crop.harvestDate), 'MMM d, yyyy') : 'N/A'}
                            </p>
                            {crop.variety && <p className="text-xs text-stone-400 mt-1">Variety: {crop.variety}</p>}
                            {crop.irrigationType && <p className="text-xs text-stone-400">Irrigation: {crop.irrigationType}</p>}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge variant="secondary">Active</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                      {tasks.map((task) => (
                        <div key={task.id} className="flex items-start gap-3 group">
                          <div 
                            className={`mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${
                              task.completed 
                                ? "bg-green-500 border-green-500" 
                                : "border-stone-300 hover:border-green-500"
                            }`}
                            onClick={() => toggleTaskCompletion(task.id)}
                          >
                            {task.completed && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <div className={task.completed ? "opacity-50 line-through" : ""}>
                            <p className="text-sm font-medium text-stone-900">{task.title}</p>
                            <p className="text-xs text-stone-500">
                              Due {task.due} • <span className={
                                task.priority === 'High' ? 'text-red-500' : 
                                task.priority === 'Medium' ? 'text-yellow-600' : 'text-blue-500'
                              }>{task.priority} Priority</span>
                            </p>
                          </div>
                        </div>
                      ))}
                      {tasks.length === 0 && (
                        <p className="text-sm text-stone-500 text-center py-4">No upcoming tasks.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="activity" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    {crops.length === 0 ? (
                      <p className="text-sm text-stone-500 text-center py-4">No recent activity.</p>
                    ) : (
                      <div className="space-y-4">
                        {crops.map((crop, index) => (
                          <div key={crop.id} className="flex items-start gap-3 border-l-4 border-green-400 pl-4">
                            <div className="flex-1">
                              <p className="font-medium text-stone-900">Added {crop.name}</p>
                              <p className="text-sm text-stone-500 mt-1">
                                Area: {crop.area} Acres • Soil Type: {crop.soilType || 'N/A'}
                              </p>
                              <p className="text-xs text-stone-400 mt-1">
                                Harvest Date: {crop.harvestDate ? format(new Date(crop.harvestDate), 'MMM d, yyyy') : 'N/A'}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge variant="outline">✓ Active</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-72">
                  <div className="space-y-4 pr-4">
                    {notifications.map((notification, index) => (
                      <div key={index} className="text-sm border-l-4 border-stone-200 pl-4">
                        <p className="font-medium text-stone-900">{notification.title}</p>
                        <p className="text-xs text-stone-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-stone-500 mt-2">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Weather & Market */}
            <WeatherWidget />
            <MarketWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
