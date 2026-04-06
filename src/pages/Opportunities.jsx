import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Search,
  Filter,
  Briefcase,
  DollarSign,
  MapPin,
  Calendar,
  ArrowRight,
  Loader,
  TrendingUp,
  Users,
  Award,
  Building2,
  ArrowLeft,
  Heart,
  Share2,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Target,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { marketAPI } from "@/lib/api";

const OPPORTUNITY_TYPES = [
  { name: "all", label: "All", icon: Briefcase, color: "text-gray-600", bg: "bg-gray-50" },
  { name: "buyer", label: "Buyers", icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
  { name: "job", label: "Jobs", icon: Users, color: "text-green-600", bg: "bg-green-50" },
  { name: "grant", label: "Grants", icon: Award, color: "text-purple-600", bg: "bg-purple-50" },
  { name: "scheme", label: "Schemes", icon: Target, color: "text-yellow-600", bg: "bg-yellow-50" },
];

const OPPORTUNITY_STATS = [
  { label: "Active Listings", value: "2,500+", icon: Briefcase },
  { label: "Buyers", value: "1,200+", icon: Building2 },
  { label: "Job Openings", value: "500+", icon: Users },
  { label: "Total Funding", value: "$50M+", icon: DollarSign },
];

// Enhanced mock opportunities data
const MOCK_OPPORTUNITIES = [
  {
    id: 1,
    title: "Organic Wheat Buyer Wanted",
    type: "Buyer",
    quantity: "50 tons",
    price: "$500/ton",
    location: "Punjab, India",
    posted: "2 days ago",
    deadline: "Mar 31, 2026",
    description:
      "Premium buyer looking for certified organic wheat. Consistent orders guaranteed. Transportation arranged.",
    details:
      "We are a certified food processing company looking for high-quality organic wheat. Minimum order: 50 tons. Flexible payment terms.",
    company: "AgriPure Foods",
    contact: "Rajesh Malik",
    rating: 4.8,
    reviews: 52,
    verified: true,
    featured: true,
  },
  {
    id: 2,
    title: "Senior Farm Manager",
    type: "Job",
    salary: "$35K-45K/year",
    location: "California, USA",
    posted: "1 week ago",
    deadline: "Apr 15, 2026",
    description:
      "Lead management of 200-acre vineyard. Oversee operations, staff, and sustainability initiatives.",
    details:
      "Full-time position managing daily operations. Requirements: 5+ years experience, knowledge of modern farming techniques.",
    company: "Green Valley Vineyards",
    contact: "HR Department",
    experience: "5+ years",
    featured: true,
  },
  {
    id: 3,
    title: "Sustainable Farming Grant 2026",
    type: "Grant",
    amount: "$10,000",
    location: "National",
    posted: "5 days ago",
    deadline: "Apr 30, 2026",
    description:
      "Government grant for farmers adopting sustainable and organic farming practices. Easy application.",
    details:
      "Eligibility: Active farmers, 2+ acres. Focus on soil conservation, water management, or organic certification.",
    sponsor: "Ministry of Agriculture",
    funding: "Government",
    featured: true,
  },
  {
    id: 4,
    title: "Mango Pulp Producer Needed",
    type: "Buyer",
    quantity: "100 tons/month",
    price: "Negotiable",
    location: "Maharashtra, India",
    posted: "3 days ago",
    deadline: "Ongoing",
    description:
      "Seeking reliable supplier for mango pulp production. Year-round partnership opportunity.",
    company: "FoodTech Industries",
    contact: "Supply Manager",
    rating: 4.6,
    reviews: 28,
    verified: true,
  },
  {
    id: 5,
    title: "Agricultural Technician",
    type: "Job",
    salary: "$20K-25K/year",
    location: "Punjab, India",
    posted: "1 week ago",
    deadline: "May 10, 2026",
    description: "Technical support for farmers. Field visits, training, and equipment assistance.",
    company: "AgriTech Solutions",
    experience: "2+ years",
  },
  {
    id: 6,
    title: "Dairy Farmer Cooperative Scheme",
    type: "Scheme",
    amount: "Subsidized loan up to $5,000",
    location: "Tamil Nadu, India",
    posted: "1 week ago",
    deadline: "May 20, 2026",
    description:
      "Government scheme for dairy farmers to form cooperatives and get subsidized loans.",
    sponsor: "State Agriculture Department",
    funding: "Government",
  },
  {
    id: 7,
    title: "Tomato Export Buyer",
    type: "Buyer",
    quantity: "500 tons/season",
    price: "$200/ton",
    location: "Bangalore, India",
    posted: "4 days ago",
    deadline: "Ongoing",
    description: "Export quality tomato buyer. Premium prices for premium quality.",
    company: "Global Fresh Exports",
    contact: "Export Manager",
    rating: 4.9,
    reviews: 89,
    verified: true,
  },
  {
    id: 8,
    title: "Irrigation System Specialist",
    type: "Job",
    salary: "$28K-32K/year",
    location: "Gujarat, India",
    posted: "5 days ago",
    deadline: "May 5, 2026",
    description: "Design and install modern irrigation systems for farms.",
    company: "Water Solutions Inc",
    experience: "3+ years",
  },
  {
    id: 9,
    title: "Organic Certification Grant",
    type: "Grant",
    amount: "$3,000-$8,000",
    location: "National",
    posted: "2 days ago",
    deadline: "June 30, 2026",
    description:
      "Support for farms transitioning to organic certification. Cover inspection and documentation costs.",
    sponsor: "Organic Farming Board",
    funding: "Private/Government",
  },
];

export default function Opportunities() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch opportunities from backend
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setIsLoading(true);

        // Try to fetch from API, fallback to mock data
        try {
          const response = await marketAPI.getOpportunities();
          const data = response?.data || response || [];
          setOpportunities(Array.isArray(data) ? data : MOCK_OPPORTUNITIES);
        } catch {
          console.log("Using mock data for opportunities");
          setOpportunities(MOCK_OPPORTUNITIES);
        }
      } catch (err) {
        setError(err.message || "Failed to load opportunities");
        console.error("Opportunities fetch error:", err);
        setOpportunities(MOCK_OPPORTUNITIES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  // Filter and sort opportunities
  const filteredOpportunities = opportunities
    .filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTab =
        activeTab === "all" ||
        item.type?.toLowerCase() === activeTab.toLowerCase();

      return matchesSearch && matchesTab;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return b.id - a.id;
      if (sortBy === "featured") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      return 0;
    });

  const featuredOpportunities = opportunities.filter((o) => o.featured).slice(0, 3);

  const getOpportunityIcon = (type) => {
    const typeObj = OPPORTUNITY_TYPES.find(
      (t) => t.name.toLowerCase() === type?.toLowerCase()
    );
    return typeObj?.icon || Briefcase;
  };

  const getOpportunityColor = (type) => {
    const typeObj = OPPORTUNITY_TYPES.find(
      (t) => t.name.toLowerCase() === type?.toLowerCase()
    );
    return typeObj?.color || "text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-12 text-white sm:px-6 lg:px-8"
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
            <h1 className="mb-2 text-4xl font-bold">Opportunities Hub</h1>
            <p className="text-lg text-indigo-100">
              Discover buyers, job openings, grants, and government schemes for farmers
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search opportunities, companies, locations..."
                className="border-0 bg-white pl-10 pr-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-indigo-300"
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

      {/* Opportunity Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border-b bg-white px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OPPORTUNITY_STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="flex items-center gap-4 rounded-lg bg-gray-50 p-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                  <stat.icon className="h-6 w-6 text-indigo-600" />
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
        {/* Featured Opportunities */}
        {!searchQuery && activeTab === "all" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Featured Opportunities</h2>
              <p className="text-gray-600">Best opportunities right now</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {featuredOpportunities.map((opp, index) => {
                const IconComponent = getOpportunityIcon(opp.type);
                return (
                  <motion.div
                    key={opp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all relative">
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-yellow-500 text-white">Featured</Badge>
                      </div>

                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-3 mb-2">
                          <div className={`p-2 rounded-lg bg-opacity-10 `}>
                            <IconComponent className={`h-6 w-6 ${getOpportunityColor(opp.type)}`} />
                          </div>
                          <div>
                            <Badge className="mb-1" variant="secondary">
                              {opp.type}
                            </Badge>
                            {opp.verified && (
                              <div className="flex items-center gap-1 text-xs text-green-600">
                                <CheckCircle className="h-3 w-3" />
                                Verified
                              </div>
                            )}
                          </div>
                        </div>
                        <CardTitle className="text-lg">{opp.title}</CardTitle>
                      </CardHeader>

                      <CardContent className="pb-3 space-y-2">
                        <p className="text-sm text-gray-600">{opp.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <MapPin className="h-3 w-3" />
                          {opp.location}
                        </div>
                        {opp.price && (
                          <div className="flex items-center gap-2 text-xs font-medium text-indigo-600">
                            <DollarSign className="h-3 w-3" />
                            {opp.price}
                          </div>
                        )}
                        {opp.amount && (
                          <div className="flex items-center gap-2 text-xs font-medium text-purple-600">
                            <Award className="h-3 w-3" />
                            {opp.amount}
                          </div>
                        )}
                      </CardContent>

                      <CardFooter>
                        <Button className="w-full gap-2 bg-indigo-600 text-white hover:bg-indigo-700">
                          {opp.type === "Buyer" ? "Contact" : opp.type === "Job" ? "Apply" : "Learn More"}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Type Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          {OPPORTUNITY_TYPES.map((type) => (
            <motion.button
              key={type.name}
              onClick={() => setActiveTab(type.name)}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-2 rounded-full px-4 py-2 font-medium transition-all ${
                activeTab === type.name
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <type.icon className="h-4 w-4" />
              {type.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Sort and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 flex items-center justify-between"
        >
          <div>
            <h2 className="text-xl font-bold text-gray-900">Available Opportunities</h2>
            <p className="text-sm text-gray-600">
              {filteredOpportunities.length} opportunity{filteredOpportunities.length !== 1 ? "s" : ""}
            </p>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:border-gray-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <option value="newest">Newest First</option>
            <option value="featured">Featured First</option>
          </select>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4"
          >
            <p className="text-sm text-yellow-800">{error} - Showing demo data</p>
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
              <Loader className="h-10 w-10 animate-spin text-indigo-600" />
              <p className="text-gray-600">Loading opportunities...</p>
            </div>
          </motion.div>
        ) : filteredOpportunities.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-20">
                <Briefcase className="mb-4 h-12 w-12 text-gray-400" />
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  No opportunities found
                </h3>
                <p className="mb-4 text-center text-gray-600">
                  {searchQuery
                    ? `No results for "${searchQuery}". Try a different search.`
                    : "No opportunities available in this category."}
                </p>
                {(searchQuery || activeTab !== "all") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveTab("all");
                    }}
                  >
                    Clear filters
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
            className="space-y-4"
          >
            {filteredOpportunities.map((item, index) => {
              const IconComponent = getOpportunityIcon(item.type);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="cursor-pointer border-0 shadow-sm transition-all hover:shadow-md hover:border-l-4 hover:border-l-indigo-600">
                    <CardHeader className="space-y-2 pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`p-2 rounded-lg bg-opacity-10 shrink-0`}>
                            <IconComponent className={`h-6 w-6 ${getOpportunityColor(item.type)}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold text-gray-900 truncate">
                                {item.title}
                              </h3>
                              {item.verified && (
                                <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-1">
                              {item.company || item.sponsor}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <Badge className="text-xs">{item.type}</Badge>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.posted}
                          </span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pb-3 space-y-2">
                      <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {item.location}
                        </div>
                        {item.deadline && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Deadline: {item.deadline}
                          </div>
                        )}
                        {item.salary && (
                          <div className="flex items-center gap-1 font-medium text-green-600">
                            <DollarSign className="h-3 w-3" />
                            {item.salary}
                          </div>
                        )}
                        {item.price && (
                          <div className="flex items-center gap-1 font-medium text-indigo-600">
                            <DollarSign className="h-3 w-3" />
                            {item.price}
                          </div>
                        )}
                        {item.amount && (
                          <div className="flex items-center gap-1 font-medium text-purple-600">
                            <Award className="h-3 w-3" />
                            {item.amount}
                          </div>
                        )}
                        {item.quantity && (
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {item.quantity}
                          </div>
                        )}
                      </div>
                    </CardContent>

                    <CardFooter className="gap-2">
                      <Button
                        className="flex-1 gap-2 bg-indigo-600 text-white hover:bg-indigo-700"
                        onClick={() => console.log("Action clicked for", item.id)}
                      >
                        {item.type === "Buyer"
                          ? "Contact Buyer"
                          : item.type === "Job"
                          ? "Apply Now"
                          : "Learn More"}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="shrink-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="shrink-0">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* CTA Section */}
      {filteredOpportunities.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="border-t bg-gradient-to-r from-indigo-50 to-blue-50 px-4 py-12 sm:px-6 lg:px-8 mt-8"
        >
          <div className="container mx-auto max-w-7xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Can't Find What You're Looking For?
            </h2>
            <p className="mb-6 text-gray-600">
              Create an alert and we'll notify you when new opportunities matching your criteria appear
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Button className="gap-2 bg-indigo-600 text-white hover:bg-indigo-700">
                <Target className="h-4 w-4" />
                Create Alert
              </Button>
              <Button variant="outline">Contact Support</Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
