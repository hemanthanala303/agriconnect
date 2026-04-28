import { Users, BookOpen, Briefcase, Sprout, TrendingUp, ShieldCheck } from "lucide-react";

export const features = [
  {
    title: "Expert Guidance",
    description: "Connect with agricultural experts for personalized advice and solutions.",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    title: "Learning Resources",
    description: "Access a vast library of articles, videos, and courses on modern farming.",
    icon: BookOpen,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "Market Opportunities",
    description: "Find buyers, jobs, grants, and government schemes tailored for you.",
    icon: Briefcase,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },
  {
    title: "Crop Management",
    description: "Track crop health, weather patterns, and get timely alerts.",
    icon: Sprout,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    title: "Market Trends",
    description: "Stay updated with real-time market prices and demand analysis.",
    icon: TrendingUp,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    title: "Secure Community",
    description: "Join a verified community of farmers and stakeholders.",
    icon: ShieldCheck,
    color: "text-red-600",
    bg: "bg-red-100",
  },
];

export const stats = [
  { label: "Active Farmers", value: "50,000+" },
  { label: "Expert Advisors", value: "1,200+" },
  { label: "Resources Available", value: "5,000+" },
  { label: "Successful Connections", value: "100k+" },
];

export const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Wheat Farmer",
    content: "AgriConnect has transformed how I manage my farm. The expert advice saved my crop last season.",
    avatar: "https://picsum.photos/seed/rajesh/200",
  },
  {
    name: "Sarah Jenkins",
    role: "Agricultural Scientist",
    content: "A fantastic platform to share knowledge and reach farmers who genuinely need support.",
    avatar: "https://picsum.photos/seed/sarah/200",
  },
  {
    name: "David Chen",
    role: "Organic Farmer",
    content: "The market insights helped me sell my produce at 20% higher rates. Highly recommended!",
    avatar: "https://picsum.photos/seed/david/200",
  },
];

export const learningResources = [
  // Water Management Resources
  {
    id: 1,
    title: "Modern Irrigation Techniques",
    type: "Video",
    duration: "15 min",
    category: "Water Management",
    thumbnail: "https://picsum.photos/seed/irrigation/400/300",
    description: "Learn advanced irrigation methods to maximize crop yield while conserving water.",
  },
  {
    id: 2,
    title: "Drip Irrigation System Setup",
    type: "Course",
    modules: 4,
    category: "Water Management",
    thumbnail: "https://picsum.photos/seed/drip/400/300",
    description: "Complete guide to installing and maintaining drip irrigation systems.",
  },
  {
    id: 3,
    title: "Water Conservation in Agriculture",
    type: "Article",
    readTime: "12 min",
    category: "Water Management",
    thumbnail: "https://picsum.photos/seed/water/400/300",
    description: "Practical strategies to reduce water usage and improve sustainability.",
  },

  // Pest Management Resources
  {
    id: 4,
    title: "Organic Pest Control",
    type: "Article",
    readTime: "8 min",
    category: "Pest Management",
    thumbnail: "https://picsum.photos/seed/pest/400/300",
    description: "Natural methods to protect your crops from common pests without chemicals.",
  },
  {
    id: 5,
    title: "Integrated Pest Management",
    type: "Video",
    duration: "22 min",
    category: "Pest Management",
    thumbnail: "https://picsum.photos/seed/ipm/400/300",
    description: "Comprehensive approach to managing pests using multiple methods.",
  },
  {
    id: 6,
    title: "Disease Identification Guide",
    type: "Course",
    modules: 6,
    category: "Pest Management",
    thumbnail: "https://picsum.photos/seed/disease/400/300",
    description: "Learn to identify and treat common plant diseases effectively.",
  },

  // Soil Science Resources
  {
    id: 7,
    title: "Soil Health Basics",
    type: "Course",
    modules: 5,
    category: "Soil Science",
    thumbnail: "https://picsum.photos/seed/soil/400/300",
    description: "Understand soil composition and how to maintain healthy soil for better yields.",
  },
  {
    id: 8,
    title: "Erosion Control Methods",
    type: "Video",
    duration: "18 min",
    category: "Soil Science",
    thumbnail: "https://picsum.photos/seed/erosion/400/300",
    description: "Proven techniques to prevent soil erosion and maintain land quality.",
  },
  {
    id: 9,
    title: "Soil Testing and Amendment",
    type: "Article",
    readTime: "10 min",
    category: "Soil Science",
    thumbnail: "https://picsum.photos/seed/amendment/400/300",
    description: "How to test your soil and apply the right amendments for crop success.",
  },

  // Innovation Resources
  {
    id: 10,
    title: "Vertical Farming Guide",
    type: "Article",
    readTime: "12 min",
    category: "Innovation",
    thumbnail: "https://picsum.photos/seed/vertical/400/300",
    description: "Explore vertical farming techniques for urban and space-limited agriculture.",
  },
  {
    id: 11,
    title: "Smart Agriculture Technology",
    type: "Video",
    duration: "25 min",
    category: "Innovation",
    thumbnail: "https://picsum.photos/seed/smarttech/400/300",
    description: "Introduction to IoT, sensors, and data analytics in modern farming.",
  },
  {
    id: 12,
    title: "Precision Farming Course",
    type: "Course",
    modules: 8,
    category: "Innovation",
    thumbnail: "https://picsum.photos/seed/precision/400/300",
    description: "Master precision farming tools and techniques to optimize your operations.",
  },

  // Crop Management Resources
  {
    id: 13,
    title: "Crop Rotation Strategies",
    type: "Article",
    readTime: "9 min",
    category: "Crop Management",
    thumbnail: "https://picsum.photos/seed/rotation/400/300",
    description: "Learn effective crop rotation patterns to maintain soil fertility.",
  },
  {
    id: 14,
    title: "Pest-Resistant Varieties",
    type: "Video",
    duration: "16 min",
    category: "Crop Management",
    thumbnail: "https://picsum.photos/seed/varieties/400/300",
    description: "Guide to selecting crop varieties with natural pest resistance.",
  },
  {
    id: 15,
    title: "Seasonal Planting Guide",
    type: "Course",
    modules: 7,
    category: "Crop Management",
    thumbnail: "https://picsum.photos/seed/seasonal/400/300",
    description: "Complete planting calendar and seasonal management best practices.",
  },
  {
    id: 16,
    title: "Seed Selection and Storage",
    type: "Article",
    readTime: "11 min",
    category: "Crop Management",
    thumbnail: "https://picsum.photos/seed/seeds/400/300",
    description: "How to choose quality seeds and store them properly for next season.",
  },
  {
    id: 17,
    title: "Fertilizer Management",
    type: "Video",
    duration: "20 min",
    category: "Crop Management",
    thumbnail: "https://picsum.photos/seed/fertilizer/400/300",
    description: "Optimal fertilization strategies for different crop types.",
  },
  {
    id: 18,
    title: "Organic Fertilizers Guide",
    type: "Article",
    readTime: "13 min",
    category: "Crop Management",
    thumbnail: "https://picsum.photos/seed/organic/400/300",
    description: "Complete guide to making and using organic fertilizers.",
  },
];

export const opportunities = [
  {
    id: 1,
    title: "Organic Wheat Buyer",
    type: "Buyer",
    location: "Punjab, India",
    posted: "2 days ago",
    description: "Looking for 50 tons of certified organic wheat.",
  },
  {
    id: 2,
    title: "Farm Manager",
    type: "Job",
    location: "California, USA",
    posted: "1 week ago",
    description: "Experienced manager needed for a 200-acre vineyard.",
  },
  {
    id: 3,
    title: "Sustainable Farming Grant",
    type: "Grant",
    amount: "$10,000",
    deadline: "Oct 30, 2023",
    description: "Grant for farmers adopting sustainable practices.",
  },
];

export const forumThreads = [
  {
    id: 1,
    title: "Best practices for tomato blight?",
    author: "FarmerJoe",
    replies: 12,
    views: 340,
    category: "Disease Control",
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    title: "Market price predictions for Corn 2024",
    author: "AgriAnalyst",
    replies: 45,
    views: 1200,
    category: "Market Trends",
    lastActive: "1 day ago",
  },
  {
    id: 3,
    title: "Experience with solar pumps?",
    author: "GreenAcres",
    replies: 8,
    views: 210,
    category: "Equipment",
    lastActive: "3 days ago",
  },
];
