import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Search,
  Filter,
  PlayCircle,
  BookOpen,
  GraduationCap,
  Clock,
  ArrowRight,
  Loader,
  Star,
  Trophy,
  Zap,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { learningAPI } from "@/lib/api";
import { learningResources as mockResources } from "@/data/mockData";

const CATEGORIES = [
  { name: "Water Management", icon: Zap, color: "text-blue-600", bg: "bg-blue-50" },
  { name: "Pest Management", icon: BookOpen, color: "text-red-600", bg: "bg-red-50" },
  { name: "Soil Science", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
  { name: "Innovation", icon: Zap, color: "text-purple-600", bg: "bg-purple-50" },
  { name: "Crop Management", icon: GraduationCap, color: "text-yellow-600", bg: "bg-yellow-50" },
];

const LEARNING_STATS = [
  { label: "Total Resources", value: "500+", icon: BookOpen },
  { label: "Expert Instructors", value: "150+", icon: GraduationCap },
  { label: "Hours of Content", value: "2000+", icon: Clock },
  { label: "Community Members", value: "10K+", icon: Trophy },
];

export default function PublicResources() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState("popular");
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch learning resources on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Try to fetch from API, fallback to mock data
        try {
          const response = await learningAPI.getResources();
          const data = response?.data || response || [];
          setResources(Array.isArray(data) ? data : mockResources);
        } catch {
          console.log("Using mock data for learning resources");
          setResources(mockResources);
        }
      } catch (err) {
        setError(err.message || "Failed to load resources");
        console.error("Resources fetch error:", err);
        setResources(mockResources);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort resources
  const filteredResources = resources
    .filter((resource) => {
      const matchesSearch =
        resource.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTab = activeTab === "all" || 
        (activeTab === "video" && resource.type === "Video") ||
        (activeTab === "article" && resource.type === "Article") ||
        (activeTab === "course" && resource.type === "Course");

      const matchesCategory = !selectedCategory || resource.category === selectedCategory;

      return matchesSearch && matchesTab && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return b.id - a.id;
      if (sortBy === "duration") {
        const aDur = parseInt(a.duration) || 0;
        const bDur = parseInt(b.duration) || 0;
        return aDur - bDur;
      }
      return 0; // popular (default)
    });

  // Get featured resources (first 3)
  const featuredResources = resources.slice(0, 3);

  // Get category-specific resources
  const getCategoryResources = (category) => {
    return resources.filter((r) => r.category === category).slice(0, 3);
  };

  const handleResourceClick = (resource) => {
    console.log("Opening resource:", resource);
    navigate("/login", { 
      state: { from: { pathname: `/resource/${resource.id}` } },
      replace: true 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-12 text-white sm:px-6 lg:px-8"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="mb-6 flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="text-white hover:bg-white/20"
              title="Go back to home page"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold">Learning Center</h1>
            <p className="text-lg text-green-100">
              Explore our agricultural knowledge base with expert-curated content designed for modern farming
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search topics, resources, or experts..."
                className="border-0 bg-white pl-10 pr-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="secondary" size="icon" className="shrink-0">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Public Access Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border-b bg-blue-50 px-4 py-3 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto max-w-7xl">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">📖 Free Preview:</span> You can browse these resources freely. 
            <Button
              variant="link"
              className="ml-2 p-0 h-auto text-blue-600 hover:text-blue-700 font-semibold"
              onClick={() => navigate("/login")}
            >
              Sign in or create an account
            </Button>
            to unlock interactive features and save your progress.
          </p>
        </div>
      </motion.div>

      {/* Learning Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border-b bg-white px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LEARNING_STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="flex items-center gap-4 rounded-lg bg-gray-50 p-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <stat.icon className="h-6 w-6 text-green-600" />
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

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Featured Resources */}
        {!searchQuery && !selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Featured Resources</h2>
                <p className="text-gray-600">Start with our most popular learning materials</p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Card className="overflow-hidden border-0 shadow-md transition-all hover:shadow-lg">
                    <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
                      <img
                        src={resource.thumbnail || "https://via.placeholder.com/400x225"}
                        alt={resource.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all hover:bg-black/20">
                        {resource.type === "Video" && (
                          <PlayCircle className="h-16 w-16 text-white opacity-0 transition-opacity hover:opacity-100 drop-shadow-lg" />
                        )}
                      </div>
                      <Badge className="absolute right-3 top-3 bg-green-600">
                        {resource.type}
                      </Badge>
                      {index === 0 && (
                        <Badge className="absolute left-3 top-3 bg-yellow-500 flex gap-1">
                          <Star className="h-3 w-3" />
                          Featured
                        </Badge>
                      )}
                    </div>

                    <CardHeader className="pb-3">
                      <div className="mb-2 flex items-center gap-2 text-xs text-gray-600">
                        {resource.type === "Video" ? (
                          <>
                            <PlayCircle className="h-4 w-4" />
                            <span>{resource.duration}</span>
                          </>
                        ) : resource.type === "Article" ? (
                          <>
                            <BookOpen className="h-4 w-4" />
                            <span>{resource.readTime}</span>
                          </>
                        ) : (
                          <>
                            <GraduationCap className="h-4 w-4" />
                            <span>{resource.modules} modules</span>
                          </>
                        )}
                      </div>
                      <CardTitle className="line-clamp-2 text-lg">{resource.title}</CardTitle>
                    </CardHeader>

                    <CardFooter>
                      <Button 
                        className="w-full bg-green-600 text-white hover:bg-green-700"
                        onClick={() => handleResourceClick(resource)}
                      >
                        {resource.type === "Course" ? "Start Course" : "Learn More"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Learning Paths by Category */}
        {!searchQuery && !selectedCategory && activeTab === "all" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Learning Paths</h2>
              <p className="text-gray-600">Explore resources by topic</p>
            </div>

            <div className="space-y-6">
              {CATEGORIES.map((category, index) => {
                const categoryResources = getCategoryResources(category.name);
                return (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <Card className="border-0 shadow-sm hover:shadow-md transition-all">
                      <CardHeader className={`${category.bg} border-b-2 border-gray-200 pb-4`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${category.bg}`}>
                              <category.icon className={`h-6 w-6 ${category.color}`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{category.name}</h3>
                              <p className="text-sm text-gray-600">{categoryResources.length} resources</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedCategory(category.name)}
                          >
                            View All
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-4">
                        <div className="grid gap-4 sm:grid-cols-3">
                          {categoryResources.map((resource) => (
                            <motion.div
                              key={resource.id}
                              className="cursor-pointer rounded-lg border border-gray-200 p-3 transition-all hover:border-green-600 hover:shadow-md"
                              onClick={() => handleResourceClick(resource)}
                              whileHover={{ y: -2 }}
                            >
                              <div className="mb-2 flex items-start justify-between">
                                {resource.type === "Video" ? (
                                  <PlayCircle className="h-5 w-5 text-blue-600" />
                                ) : resource.type === "Article" ? (
                                  <BookOpen className="h-5 w-5 text-purple-600" />
                                ) : (
                                  <GraduationCap className="h-5 w-5 text-green-600" />
                                )}
                              </div>
                              <h4 className="line-clamp-2 font-medium text-gray-900">{resource.title}</h4>
                              <p className="mt-1 text-xs text-gray-600">
                                {resource.duration || resource.readTime || `${resource.modules} modules`}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Filters and Sorting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="grid w-full grid-cols-4 sm:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
              <TabsTrigger value="article">Articles</TabsTrigger>
              <TabsTrigger value="course">Courses</TabsTrigger>
            </TabsList>
          </Tabs>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:border-gray-400 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100"
          >
            <option value="popular">Most Popular</option>
            <option value="newest">Newest First</option>
            <option value="duration">Shortest First</option>
          </select>
        </motion.div>

        {/* Category Pills */}
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2"
          >
            <span className="text-sm font-medium text-gray-600">Category:</span>
            <Badge className="bg-green-100 text-green-800">{selectedCategory}</Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="text-xs text-gray-600 hover:text-gray-900"
            >
              Clear filter
            </Button>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4"
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
              <Loader className="h-10 w-10 animate-spin text-green-600" />
              <p className="text-gray-600">Loading resources...</p>
            </div>
          </motion.div>
        ) : filteredResources.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-20">
                <BookOpen className="mb-4 h-12 w-12 text-gray-400" />
                <h3 className="mb-2 text-lg font-semibold text-gray-900">No resources found</h3>
                <p className="text-gray-600">
                  {searchQuery
                    ? `No results for "${searchQuery}". Try a different search term.`
                    : "Check back soon for more content!"}
                </p>
                {searchQuery && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear search
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredResources.length} resource{filteredResources.length !== 1 ? "s" : ""}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full overflow-hidden border-0 shadow-sm transition-all hover:shadow-md">
                    <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
                      <img
                        src={resource.thumbnail || "https://via.placeholder.com/400x225"}
                        alt={resource.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      {resource.type === "Video" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all hover:bg-black/20 hover:opacity-100">
                          <PlayCircle className="h-16 w-16 text-white drop-shadow-lg" />
                        </div>
                      )}
                      <Badge className="absolute right-3 top-3 bg-green-600">
                        {resource.category || "General"}
                      </Badge>
                    </div>

                    <CardHeader className="pb-2">
                      <div className="mb-2 flex items-center gap-2 text-xs text-gray-600">
                        {resource.type === "Video" ? (
                          <>
                            <PlayCircle className="h-4 w-4" />
                            <span>{resource.duration}</span>
                          </>
                        ) : resource.type === "Article" ? (
                          <>
                            <BookOpen className="h-4 w-4" />
                            <span>{resource.readTime}</span>
                          </>
                        ) : (
                          <>
                            <GraduationCap className="h-4 w-4" />
                            <span>{resource.modules} modules</span>
                          </>
                        )}
                      </div>
                      <CardTitle className="line-clamp-2 text-base">{resource.title}</CardTitle>
                    </CardHeader>

                    <CardFooter className="flex gap-2">
                      <Button
                        className="flex-1 bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400"
                        onClick={() => handleResourceClick(resource)}
                      >
                        View Resource
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* CTA Section */}
      {filteredResources.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="border-t bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-12 sm:px-6 lg:px-8"
        >
          <div className="container mx-auto max-w-7xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Ready to Level Up Your Farming Skills?</h2>
            <p className="mb-6 text-gray-600">
              Join thousands of farmers learning from agriculture experts worldwide. Create an account to unlock interactive features, track your progress, and access exclusive content.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Button 
                className="bg-green-600 text-white hover:bg-green-700"
                onClick={() => navigate("/login")}
              >
                Sign in or Create Account
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate("/community")}
              >
                Ask an Expert
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
