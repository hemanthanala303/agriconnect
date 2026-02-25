import { useState } from "react";
import { motion } from "motion/react";
import { Search, Filter, PlayCircle, BookOpen, GraduationCap, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { learningResources } from "@/data/mockData";

export default function Learning() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredResources = learningResources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || resource.type.toLowerCase() === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900">Learning Center</h1>
          <p className="text-stone-500">Expand your knowledge with expert-curated resources.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-stone-500" />
            <Input
              type="search"
              placeholder="Search topics..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="article">Articles</TabsTrigger>
          <TabsTrigger value="course">Courses</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredResources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="h-full overflow-hidden transition-all hover:shadow-md">
              <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
                <img
                  src={resource.thumbnail}
                  alt={resource.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute right-2 top-2">
                  <Badge variant="secondary" className="bg-white/90 text-stone-900 backdrop-blur-sm">
                    {resource.category}
                  </Badge>
                </div>
                {resource.type === "Video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity hover:opacity-100">
                    <PlayCircle className="h-12 w-12 text-white drop-shadow-lg" />
                  </div>
                )}
              </div>
              <CardHeader className="p-4">
                <div className="mb-2 flex items-center gap-2 text-xs text-stone-500">
                  {resource.type === "Video" ? <PlayCircle className="h-3 w-3" /> : 
                   resource.type === "Article" ? <BookOpen className="h-3 w-3" /> : 
                   <GraduationCap className="h-3 w-3" />}
                  <span>{resource.type}</span>
                  <span>•</span>
                  <Clock className="h-3 w-3" />
                  <span>{resource.duration || resource.readTime || `${resource.modules} Modules`}</span>
                </div>
                <CardTitle className="line-clamp-2 text-lg">{resource.title}</CardTitle>
              </CardHeader>
              <CardFooter className="p-4 pt-0">
                <Button variant="ghost" className="w-full justify-between text-green-600 hover:bg-green-50 hover:text-green-700">
                  {resource.type === "Course" ? "Start Course" : "Read More"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
