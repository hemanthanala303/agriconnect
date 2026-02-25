import { useState } from "react";
import { motion } from "motion/react";
import { Search, Filter, Briefcase, DollarSign, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { opportunities } from "@/data/mockData";

export default function Opportunities() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredOpportunities = opportunities.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || item.type.toLowerCase() === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900">Opportunities Hub</h1>
          <p className="text-stone-500">Find buyers, jobs, grants, and government schemes.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-stone-500" />
            <Input
              type="search"
              placeholder="Search opportunities..."
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
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="buyer">Buyers</TabsTrigger>
          <TabsTrigger value="job">Jobs</TabsTrigger>
          <TabsTrigger value="grant">Grants</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredOpportunities.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <Badge 
                    variant={
                      item.type === "Buyer" ? "default" : 
                      item.type === "Job" ? "secondary" : "outline"
                    }
                  >
                    {item.type}
                  </Badge>
                  <span className="text-xs text-stone-500">{item.posted || item.deadline}</span>
                </div>
                <CardTitle className="text-xl">{item.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  {item.location && (
                    <>
                      <MapPin className="h-3 w-3" /> {item.location}
                    </>
                  )}
                  {item.amount && (
                    <>
                      <DollarSign className="h-3 w-3" /> {item.amount}
                    </>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-stone-600">{item.description}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  {item.type === "Buyer" ? "Contact Buyer" : "Apply Now"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
