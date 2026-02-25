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
  {
    id: 1,
    title: "Modern Irrigation Techniques",
    type: "Video",
    duration: "15 min",
    category: "Water Management",
    thumbnail: "https://picsum.photos/seed/irrigation/400/300",
  },
  {
    id: 2,
    title: "Organic Pest Control",
    type: "Article",
    readTime: "8 min",
    category: "Pest Management",
    thumbnail: "https://picsum.photos/seed/pest/400/300",
  },
  {
    id: 3,
    title: "Soil Health Basics",
    type: "Course",
    modules: 5,
    category: "Soil Science",
    thumbnail: "https://picsum.photos/seed/soil/400/300",
  },
  {
    id: 4,
    title: "Vertical Farming Guide",
    type: "Article",
    readTime: "12 min",
    category: "Innovation",
    thumbnail: "https://picsum.photos/seed/vertical/400/300",
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
