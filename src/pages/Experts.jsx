import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Search,
  Filter,
  Star,
  MessageSquare,
  Users,
  Loader,
  GraduationCap,
  Award,
  Clock,
  Zap,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  CheckCircle,
  Heart,
  Share2,
  BookOpen,
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
import { expertAPI } from "@/lib/api";

const EXPERT_SPECIALTIES = [
  { name: "Crop Management", icon: "🌾" },
  { name: "Pest Control", icon: "🐛" },
  { name: "Soil Science", icon: "🌱" },
  { name: "Water Management", icon: "💧" },
  { name: "Organic Farming", icon: "🥬" },
  { name: "Market Analysis", icon: "📊" },
  { name: "Equipment", icon: "⚙️" },
  { name: "Livestock", icon: "🐄" },
];

const EXPERT_STATS = [
  { label: "Expert Advisors", value: "300+", icon: Users },
  { label: "Specialties", value: "50+", icon: Award },
  { label: "Consultations", value: "10K+", icon: MessageSquare },
  { label: "Success Rate", value: "98%", icon: TrendingUp },
];

// Mock experts data
const MOCK_EXPERTS = [
  {
    id: 1,
    firstName: "Dr.",
    lastName: "Rajesh Kumar",
    specialty: "Crop Management",
    bio: "20+ years of experience in crop cultivation and yield optimization. Expert in organic farming practices and sustainable agriculture.",
    rating: 4.9,
    reviews: 245,
    consultations: 480,
    responseTime: "< 2 hours",
    location: "Punjab, India",
    badge: "Expert",
    languages: ["English", "Hindi", "Punjabi"],
    expertise: ["Wheat", "Rice", "Corn", "Cotton"],
    hourlyRate: "$50",
    availability: "Mon-Fri, 10 AM - 6 PM",
    image: "https://picsum.photos/seed/expert1/200",
  },
  {
    id: 2,
    firstName: "Prof.",
    lastName: "Anita Patel",
    specialty: "Soil Science",
    bio: "PhD in Soil Science. Specializes in soil testing, fertility management, and sustainable soil practices for increased productivity.",
    rating: 4.8,
    reviews: 198,
    consultations: 420,
    responseTime: "< 3 hours",
    location: "Gujarat, India",
    badge: "Expert",
    languages: ["English", "Gujarati", "Hindi"],
    expertise: ["Soil Testing", "Fertilization", "Irrigation"],
    hourlyRate: "$45",
    availability: "Daily, 9 AM - 5 PM",
    image: "https://picsum.photos/seed/expert2/200",
  },
  {
    id: 3,
    firstName: "James",
    lastName: "Thompson",
    specialty: "Water Management",
    bio: "International expert in irrigation systems and water conservation. Helped 500+ farmers reduce water usage by 40%.",
    rating: 4.7,
    reviews: 312,
    consultations: 560,
    responseTime: "< 1 hour",
    location: "California, USA",
    badge: "Expert",
    languages: ["English", "Spanish"],
    expertise: ["Drip Irrigation", "Water Conservation", "Micro-irrigation"],
    hourlyRate: "$60",
    availability: "Mon-Sat, 8 AM - 8 PM",
    image: "https://picsum.photos/seed/expert3/200",
  },
  {
    id: 4,
    firstName: "Dr.",
    lastName: "Amara Okonkwo",
    specialty: "Pest Control",
    bio: "Leading entomologist specializing in integrated pest management and organic pest control solutions for sustainable farming.",
    rating: 4.9,
    reviews: 267,
    consultations: 510,
    responseTime: "< 2 hours",
    location: "Nigeria",
    badge: "Expert",
    languages: ["English", "Yoruba"],
    expertise: ["Integrated Pest Management", "Organic Control", "Monitoring"],
    hourlyRate: "$48",
    availability: "Tue-Sun, 10 AM - 7 PM",
    image: "https://picsum.photos/seed/expert4/200",
  },
  {
    id: 5,
    firstName: "Michel",
    lastName: "Dubois",
    specialty: "Organic Farming",
    bio: "Certified organic farmer and consultant with 15 years of experience converting conventional farms to organic certification.",
    rating: 4.8,
    reviews: 156,
    consultations: 340,
    responseTime: "< 4 hours",
    location: "France",
    badge: "Advisor",
    languages: ["English", "French", "German"],
    expertise: ["Organic Certification", "Crop Rotation", "Composting"],
    hourlyRate: "$55",
    availability: "Mon-Fri, 9 AM - 6 PM",
    image: "https://picsum.photos/seed/expert5/200",
  },
  {
    id: 6,
    firstName: "Dr.",
    lastName: "Chen Wei",
    specialty: "Market Analysis",
    bio: "Agricultural economist providing market insights and crop price forecasting. Helps farmers maximize profits.",
    rating: 4.7,
    reviews: 189,
    consultations: 380,
    responseTime: "< 3 hours",
    location: "China",
    badge: "Advisor",
    languages: ["English", "Mandarin", "Cantonese"],
    expertise: ["Market Trends", "Price Forecasting", "Supply Chain"],
    hourlyRate: "$52",
    availability: "Daily, 8 AM - 10 PM",
    image: "https://picsum.photos/seed/expert6/200",
  },
];

export default function Experts() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [sortBy, setSortBy] = useState("rating");
  const [experts, setExperts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Fetch experts on mount
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        setIsLoading(true);

        // Try to fetch from API, fallback to mock data
        try {
          const response = await expertAPI.getAllExperts();
          const data = response?.data || response || [];
          setExperts(Array.isArray(data) ? data : MOCK_EXPERTS);
        } catch {
          console.log("Using mock data for experts");
          setExperts(MOCK_EXPERTS);
        }
      } catch (err) {
        setError(err.message || "Failed to load experts");
        console.error("Experts fetch error:", err);
        setExperts(MOCK_EXPERTS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperts();
  }, []);

  // Filter and sort experts
  const filteredExperts = experts
    .filter((expert) => {
      const matchesSearch =
        `${expert.firstName} ${expert.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        expert.specialty?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expert.bio?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSpecialty =
        !selectedSpecialty || expert.specialty === selectedSpecialty;

      return matchesSearch && matchesSpecialty;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "consultations") return (b.consultations || 0) - (a.consultations || 0);
      if (sortBy === "reviews") return (b.reviews || 0) - (a.reviews || 0);
      return 0;
    });

  const handleBookConsultation = async (expert) => {
    setSelectedExpert(expert);
    setShowBookingForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-12 text-white sm:px-6 lg:px-8"
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
            <h1 className="mb-2 text-4xl font-bold">Expert Advisory</h1>
            <p className="text-lg text-purple-100">
              Connect with certified agricultural experts for personalized guidance and consultation
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search experts by name or specialty..."
                className="border-0 bg-white pl-10 pr-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-300"
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

      {/* Expert Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border-b bg-white px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {EXPERT_STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="flex items-center gap-4 rounded-lg bg-gray-50 p-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <stat.icon className="h-6 w-6 text-purple-600" />
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
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-6">
              {/* Specialty Filter */}
              <Card className="border-0 shadow-sm sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Specialties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <motion.button
                      onClick={() => setSelectedSpecialty(null)}
                      whileHover={{ x: 4 }}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-all ${
                        selectedSpecialty === null
                          ? "bg-purple-600 text-white"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      All Specialties
                    </motion.button>
                    {EXPERT_SPECIALTIES.map((specialty) => (
                      <motion.button
                        key={specialty.name}
                        onClick={() => setSelectedSpecialty(specialty.name)}
                        whileHover={{ x: 4 }}
                        className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-all ${
                          selectedSpecialty === specialty.name
                            ? "bg-purple-600 text-white"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span className="mr-2">{specialty.icon}</span>
                        {specialty.name}
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Sorting */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Sort By</CardTitle>
                </CardHeader>
                <CardContent>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-100"
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="consultations">Most Consultations</option>
                    <option value="reviews">Most Reviews</option>
                  </select>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Expert Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            {/* Error State */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4"
              >
                <p className="text-sm text-yellow-800">
                  {error} - Showing demo experts
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
                  <Loader className="h-10 w-10 animate-spin text-purple-600" />
                  <p className="text-gray-600">Loading experts...</p>
                </div>
              </motion.div>
            ) : filteredExperts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-0 shadow-sm">
                  <CardContent className="flex flex-col items-center justify-center py-20">
                    <Users className="mb-4 h-12 w-12 text-gray-400" />
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      No experts found
                    </h3>
                    <p className="mb-4 text-center text-gray-600">
                      {searchQuery
                        ? `No results for "${searchQuery}". Try a different search.`
                        : "No experts available in this category."}
                    </p>
                    {(searchQuery || selectedSpecialty) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedSpecialty(null);
                        }}
                      >
                        Clear filters
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <p className="text-sm text-gray-600">
                  Showing {filteredExperts.length} expert{filteredExperts.length !== 1 ? "s" : ""}
                </p>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredExperts.map((expert, index) => (
                    <motion.div
                      key={expert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="h-full overflow-hidden border-0 shadow-sm transition-all hover:shadow-lg hover:border-l-4 hover:border-l-purple-600">
                        {/* Header Background */}
                        <div className="h-24 bg-gradient-to-r from-purple-400 to-pink-400"></div>

                        <CardHeader className="relative pt-0">
                          <div className="flex flex-col items-center text-center -mt-12 mb-3">
                            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                              <AvatarImage src={expert.image} />
                              <AvatarFallback className="bg-purple-600 text-white text-lg font-bold">
                                {expert.firstName?.[0]}{expert.lastName?.[0]}
                              </AvatarFallback>
                            </Avatar>
                          </div>

                          <div className="text-center">
                            <CardTitle className="text-lg">
                              {expert.firstName} {expert.lastName}
                            </CardTitle>
                            <CardDescription className="font-medium text-purple-600">
                              {expert.specialty}
                            </CardDescription>
                          </div>

                          {/* Rating */}
                          <div className="flex items-center justify-center gap-1 mt-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.round(expert.rating)
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-bold text-gray-900">
                              {expert.rating}
                            </span>
                            <span className="text-xs text-gray-600">
                              ({expert.reviews} reviews)
                            </span>
                          </div>

                          <Badge className="mt-2 bg-purple-100 text-purple-800">
                            {expert.badge}
                          </Badge>
                        </CardHeader>

                        <CardContent className="pb-3 space-y-3">
                          <p className="text-sm text-gray-600 line-clamp-3">
                            {expert.bio}
                          </p>

                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-2">
                            <div className="text-center rounded-lg bg-purple-50 p-2">
                              <p className="text-sm font-bold text-purple-600">
                                {expert.consultations}
                              </p>
                              <p className="text-xs text-gray-600">Consultations</p>
                            </div>
                            <div className="text-center rounded-lg bg-blue-50 p-2">
                              <p className="text-sm font-bold text-blue-600">
                                {expert.responseTime}
                              </p>
                              <p className="text-xs text-gray-600">Response</p>
                            </div>
                            <div className="text-center rounded-lg bg-green-50 p-2">
                              <p className="text-sm font-bold text-green-600">
                                {expert.hourlyRate}
                              </p>
                              <p className="text-xs text-gray-600">Hourly</p>
                            </div>
                          </div>

                          {/* Expertise */}
                          <div>
                            <p className="text-xs font-medium text-gray-600 mb-1">
                              Expertise:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {expert.expertise?.slice(0, 3).map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Info */}
                          <div className="space-y-1 pt-2 border-t">
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <MapPin className="h-3 w-3" />
                              {expert.location}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Clock className="h-3 w-3" />
                              {expert.availability}
                            </div>
                          </div>
                        </CardContent>

                        <CardFooter className="flex gap-2 pt-0">
                          <Button
                            className="flex-1 gap-2 bg-purple-600 text-white hover:bg-purple-700"
                            onClick={() => handleBookConsultation(expert)}
                          >
                            <MessageSquare className="h-4 w-4" />
                            Consult
                          </Button>
                          <Button variant="outline" size="icon" className="shrink-0">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      {filteredExperts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="border-t bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-12 sm:px-6 lg:px-8 mt-8"
        >
          <div className="container mx-auto max-w-7xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Need Help Choosing an Expert?
            </h2>
            <p className="mb-6 text-gray-600">
              Our AI-powered recommendation system can match you with the perfect expert based on your needs
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Button className="gap-2 bg-purple-600 text-white hover:bg-purple-700">
                <Zap className="h-4 w-4" />
                Get Recommendation
              </Button>
              <Button variant="outline">Browse All Experts</Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
