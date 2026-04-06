import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Search,
  Filter,
  MessageSquare,
  Plus,
  ThumbsUp,
  Eye,
  Clock,
  Loader,
  Users,
  Flame,
  TrendingUp,
  ArrowLeft,
  CheckCircle,
  MessageCircle,
  UserPlus,
  ChevronRight,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { communityAPI } from "@/lib/api";
import { forumThreads as mockThreads } from "@/data/mockData";

const CATEGORIES = [
  { name: "Disease Control", icon: "🦠", color: "text-red-600", bg: "bg-red-50" },
  { name: "Market Trends", icon: "📈", color: "text-green-600", bg: "bg-green-50" },
  { name: "Equipment", icon: "⚙️", color: "text-blue-600", bg: "bg-blue-50" },
  { name: "Organic Farming", icon: "🌱", color: "text-emerald-600", bg: "bg-emerald-50" },
  { name: "Water Management", icon: "💧", color: "text-cyan-600", bg: "bg-cyan-50" },
  { name: "Pest Control", icon: "🐛", color: "text-yellow-600", bg: "bg-yellow-50" },
];

const TRENDING_TOPICS = [
  "Organic Farming",
  "Pest Control",
  "Market Prices",
  "Government Schemes",
  "Weather Patterns",
  "Equipment",
  "Soil Health",
  "Crop Rotation",
];

const TOP_CONTRIBUTORS = [
  { id: 1, name: "AgriMaster", contributions: 250, badge: "Expert" },
  { id: 2, name: "FarmingPro", contributions: 180, badge: "Expert" },
  { id: 3, name: "GreenThumb", contributions: 150, badge: "Contributor" },
  { id: 4, name: "SoilExpert", contributions: 130, badge: "Contributor" },
];

const COMMUNITY_STATS = [
  { label: "Active Members", value: "15K+", icon: Users },
  { label: "Forum Threads", value: "5000+", icon: MessageSquare },
  { label: "Daily Posts", value: "500+", icon: TrendingUp },
  { label: "Expert Advisors", value: "300+", icon: CheckCircle },
];

export default function Community() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState("trending");
  const [threads, setThreads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNewThreadForm, setShowNewThreadForm] = useState(false);
  const [newThreadData, setNewThreadData] = useState({
    title: "",
    category: "General",
    content: "",
  });

  // Fetch forum threads on mount
  useEffect(() => {
    const fetchThreads = async () => {
      try {
        setIsLoading(true);

        // Try to fetch from API, fallback to mock data
        try {
          const response = await communityAPI.getForumThreads();
          const data = response?.data || response || [];
          setThreads(Array.isArray(data) ? data : mockThreads);
        } catch {
          console.log("Using mock data for forum threads");
          setThreads(mockThreads);
        }
      } catch (err) {
        setError(err.message || "Failed to load threads");
        console.error("Threads fetch error:", err);
        setThreads(mockThreads);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThreads();
  }, []);

  // Filter and sort threads
  const filteredThreads = threads
    .filter((thread) => {
      const matchesSearch =
        thread.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        thread.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        thread.author?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !selectedCategory || thread.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return b.id - a.id;
      if (sortBy === "mostReplies") return (b.replies || 0) - (a.replies || 0);
      if (sortBy === "mostViews") return (b.views || 0) - (a.views || 0);
      // trending (default)
      return (b.replies || 0) + (b.views || 0) - (a.replies || 0) - (a.views || 0);
    });

  const handleCreateThread = async () => {
    if (!newThreadData.title.trim()) {
      alert("Please enter a title");
      return;
    }
    
    try {
      await communityAPI.createForumThread(newThreadData);
      // Add to local list
      const newThread = {
        id: threads.length + 1,
        ...newThreadData,
        author: "You",
        replies: 0,
        views: 0,
        lastActive: "just now",
      };
      setThreads([newThread, ...threads]);
      setNewThreadData({ title: "", category: "General", content: "" });
      setShowNewThreadForm(false);
    } catch (err) {
      console.error("Error creating thread:", err);
      alert("Failed to create thread");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-12 text-white sm:px-6 lg:px-8"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="mb-6 flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-white hover:bg-white/20"
              title="Go back to previous page"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold">Community Forum</h1>
            <p className="text-lg text-blue-100">
              Connect, share knowledge, and learn from farmers and agricultural experts worldwide
            </p>
          </div>

          {/* Search and Create Button */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search discussions, topics, or members..."
                className="border-0 bg-white pl-10 pr-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              className="gap-2 bg-white text-blue-600 hover:bg-blue-50"
              onClick={() => setShowNewThreadForm(!showNewThreadForm)}
            >
              <Plus className="h-5 w-5" />
              New Thread
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Community Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border-b bg-white px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COMMUNITY_STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="flex items-center gap-4 rounded-lg bg-gray-50 p-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* New Thread Form */}
      {showNewThreadForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b bg-blue-50 px-4 py-8 sm:px-6 lg:px-8"
        >
          <div className="container mx-auto max-w-7xl">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Create New Discussion Thread</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Title
                  </label>
                  <Input
                    placeholder="What's your question or topic?"
                    value={newThreadData.title}
                    onChange={(e) =>
                      setNewThreadData({ ...newThreadData, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Category
                  </label>
                  <select
                    value={newThreadData.category}
                    onChange={(e) =>
                      setNewThreadData({ ...newThreadData, category: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Provide details about your question or topic..."
                    value={newThreadData.content}
                    onChange={(e) =>
                      setNewThreadData({ ...newThreadData, content: e.target.value })
                    }
                    className="min-h-20 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </CardContent>
              <CardFooter className="gap-3">
                <Button
                  onClick={handleCreateThread}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Post Thread
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowNewThreadForm(false)}
                >
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Main Content Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Filters and Sorting */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-gray-900">Discussion Threads</h2>
                <p className="text-sm text-gray-600">
                  {filteredThreads.length} thread{filteredThreads.length !== 1 ? "s" : ""}
                </p>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:border-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="trending">Trending</option>
                <option value="newest">Newest First</option>
                <option value="mostReplies">Most Replies</option>
                <option value="mostViews">Most Viewed</option>
              </select>
            </div>

            {/* Category Pills */}
            {selectedCategory && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2"
              >
                <span className="text-sm font-medium text-gray-600">Filter:</span>
                <Badge className="bg-blue-100 text-blue-800">{selectedCategory}</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className="text-xs text-gray-600 hover:text-gray-900"
                >
                  Clear
                </Button>
              </motion.div>
            )}

            {/* Error State */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4"
              >
                <p className="text-sm text-yellow-800">
                  {error} - Showing mock data for demonstration
                </p>
              </motion.div>
            )}

            {/* Loading State */}
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center py-20"
              >
                <div className="flex flex-col items-center gap-3">
                  <Loader className="h-10 w-10 animate-spin text-blue-600" />
                  <p className="text-gray-600">Loading threads...</p>
                </div>
              </motion.div>
            ) : filteredThreads.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-0 shadow-sm">
                  <CardContent className="flex flex-col items-center justify-center py-20">
                    <MessageSquare className="mb-4 h-12 w-12 text-gray-400" />
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      No threads found
                    </h3>
                    <p className="mb-4 text-center text-gray-600">
                      {searchQuery
                        ? `No results for "${searchQuery}". Try a different search term.`
                        : "Be the first to start a discussion!"}
                    </p>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      {searchQuery && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSearchQuery("")}
                        >
                          Clear search
                        </Button>
                      )}
                      {!searchQuery && (
                        <Button
                          size="sm"
                          className="gap-2 bg-blue-600 text-white hover:bg-blue-700"
                          onClick={() => setShowNewThreadForm(true)}
                        >
                          <Plus className="h-4 w-4" />
                          Create Thread
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                {filteredThreads.map((thread, index) => (
                  <motion.div
                    key={thread.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="cursor-pointer border-0 shadow-sm transition-all hover:shadow-md hover:border-l-4 hover:border-l-blue-600">
                      <CardHeader className="space-y-2 pb-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 space-y-1">
                            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                              {thread.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                              <div className="flex items-center gap-1">
                                <Avatar className="h-5 w-5">
                                  <AvatarImage
                                    src={`https://picsum.photos/seed/${thread.author}/50`}
                                  />
                                  <AvatarFallback>
                                    {thread.author?.charAt(0).toUpperCase() || "U"}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{thread.author}</span>
                              </div>
                              <span>•</span>
                              <Clock className="h-3 w-3" />
                              <span>{thread.lastActive}</span>
                            </div>
                          </div>
                          <Badge className="shrink-0 bg-blue-100 text-blue-800">
                            {thread.category}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="pb-3">
                        <p className="line-clamp-2 text-sm text-gray-600">
                          {thread.content || thread.description || "No description available"}
                        </p>
                      </CardContent>

                      <CardFooter className="flex flex-wrap items-center gap-4 text-xs text-gray-600 border-t pt-3">
                        <div className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span>{thread.replies || 0} replies</span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                          <Eye className="h-4 w-4" />
                          <span>{thread.views || 0} views</span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                          <Flame className="h-4 w-4 text-orange-500" />
                          <span>{(thread.replies || 0) + (thread.views || 0)} activity</span>
                        </div>
                        <div className="ml-auto">
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Category Filter */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Tag className="h-5 w-5 text-blue-600" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <motion.button
                      key={category.name}
                      onClick={() =>
                        setSelectedCategory(
                          selectedCategory === category.name ? null : category.name
                        )
                      }
                      whileHover={{ x: 4 }}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-all ${
                        selectedCategory === category.name
                          ? "bg-blue-600 text-white"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_TOPICS.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-blue-200 transition-all"
                      onClick={() => setSearchQuery(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {TOP_CONTRIBUTORS.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3 hover:bg-gray-100 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarImage
                            src={`https://picsum.photos/seed/${user.name}/50`}
                          />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {user.contributions} posts
                          </p>
                        </div>
                      </div>
                      <Badge className="shrink-0 bg-blue-100 text-blue-800 text-xs">
                        {user.badge}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Connect CTA */}
            <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Join the Community</CardTitle>
                <CardDescription className="text-blue-100">
                  Connect with thousands of farmers and experts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-100 mb-4">
                  Share your experiences and learn from the best in agriculture.
                </p>
                <Button className="w-full gap-2 bg-white text-blue-600 hover:bg-blue-50">
                  <UserPlus className="h-4 w-4" />
                  Connect Now
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="border-t bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto max-w-7xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Have a Question?</h2>
          <p className="mb-6 text-gray-600">
            Our community of agricultural experts is ready to help you succeed
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Button
              className="gap-2 bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => setShowNewThreadForm(true)}
            >
              <MessageSquare className="h-4 w-4" />
              Start a Discussion
            </Button>
            <Button variant="outline">Browse All Threads</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
