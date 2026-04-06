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
  const [isAddCropOpen, setIsAddCropOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [crops, setCrops] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Add Crop Form State
  const [newCrop, setNewCrop] = useState({ name: "", area: "", harvestDate: undefined });

  // Schedule Task Form State
  const [newTask, setNewTask] = useState({ title: "", date: undefined, priority: "Medium" });

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
    if (cropsData) {
      setCrops(Array.isArray(cropsData) ? cropsData : cropsData.crops || []);
    }
  }, [cropsData]);

  useEffect(() => {
    if (tasksData) {
      setTasks(Array.isArray(tasksData) ? tasksData : tasksData.tasks || []);
    }
  }, [tasksData]);

  const handleAddCrop = async () => {
    if (!newCrop.name || !newCrop.area || !newCrop.harvestDate) return;

    try {
      await cropAPI.createCrop({
        name: newCrop.name,
        area: parseFloat(newCrop.area),
        harvestDate: format(newCrop.harvestDate, "yyyy-MM-dd"),
      });

      // Refresh crops list
      refetchCrops();
      setIsAddCropOpen(false);
      setNewCrop({ name: "", area: "", harvestDate: undefined });
    } catch (err) {
      console.error("Error adding crop:", err);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.title || !newTask.date) return;

    try {
      await farmDataAPI.createTask({
        title: newTask.title,
        dueDate: format(newTask.date, "yyyy-MM-dd"),
        priority: newTask.priority,
      });

      // Refresh tasks list
      refetchTasks();
      setIsScheduleOpen(false);
      setNewTask({ title: "", date: undefined, priority: "Medium" });
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const toggleTaskCompletion = async (id) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (task) {
        await farmDataAPI.updateTask(id, { completed: !task.completed });
        refetchTasks();
      }
    } catch (err) {
      console.error("Error updating task:", err);
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
                    <Label htmlFor="crop-name" className="text-right">Crop Name</Label>
                    <Input 
                      id="crop-name" 
                      className="col-span-3" 
                      placeholder="e.g. Rice (Basmati)"
                      value={newCrop.name}
                      onChange={(e) => setNewCrop({...newCrop, name: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="crop-area" className="text-right">Area (Acres)</Label>
                    <Input 
                      id="crop-area" 
                      type="number" 
                      className="col-span-3"
                      value={newCrop.area}
                      onChange={(e) => setNewCrop({...newCrop, area: e.target.value})}
                    />
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
                    {crops.reduce((sum, c) => sum + (parseFloat(c.area) || 0), 0).toFixed(1)} Acres
                  </div>
                  <p className="text-xs text-stone-500">
                    {crops.length > 0 ? "Active cultivation area" : "No crops yet"}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Crops</CardTitle>
                  <Sprout className="h-4 w-4 text-stone-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{crops.length}</div>
                  <p className="text-xs text-stone-500">
                    {crops.length > 0
                      ? crops.slice(0, 2).map(c => c.name.split(' ')[0]).join(', ') + (crops.length > 2 ? '...' : '')
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
                  <div className="text-2xl font-bold">{tasks.filter(t => !t.completed).length}</div>
                  <p className="text-xs text-stone-500">
                    {tasks.filter(t => t.completed).length} completed
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
                <div className="space-y-6">
                  {crops.map((crop) => (
                    <div key={crop.id} className="flex items-center justify-between border-b border-stone-100 pb-4 last:border-0 last:pb-0">
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
                    <p className="text-sm text-stone-500">No recent activity.</p>
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
