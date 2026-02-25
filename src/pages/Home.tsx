import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { features, stats, testimonials } from "@/data/mockData";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-stone-900 py-24 sm:py-32">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/farm/1920/1080?blur=2"
            alt="Farm background"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1 text-sm font-medium uppercase tracking-wide">
              The Future of Farming
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Cultivating Success <span className="text-green-500">Together</span>
            </h1>
            <p className="mb-10 text-lg leading-8 text-stone-300 sm:text-xl">
              AgriConnect empowers farmers with real-time data, expert advice, and a thriving community. Join the revolution in sustainable agriculture.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="h-12 w-full bg-green-600 px-8 text-lg hover:bg-green-700 sm:w-auto" asChild>
                <Link to="/dashboard">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 w-full border-stone-600 bg-transparent text-white hover:bg-stone-800 hover:text-white sm:w-auto" asChild>
                <Link to="/learning">
                  Explore Resources
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 rounded-2xl bg-white p-8 shadow-sm md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mb-2 text-3xl font-bold text-stone-900 sm:text-4xl">{stat.value}</div>
              <div className="text-sm font-medium text-stone-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Everything You Need to Grow
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-stone-600">
            Our platform provides comprehensive tools and resources to support every stage of your agricultural journey.
          </p>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-stone-100 bg-white shadow-sm transition-all hover:shadow-md">
                <CardHeader>
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.bg}`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-stone-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-stone-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Trusted by the Community
            </h2>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-none shadow-sm">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex items-center gap-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-stone-900">{testimonial.name}</div>
                        <div className="text-sm text-stone-500">{testimonial.role}</div>
                      </div>
                    </div>
                    <p className="italic text-stone-600">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-green-600 px-6 py-16 text-center shadow-xl sm:px-16 md:py-24">
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Transform Your Farm?
            </h2>
            <p className="mb-10 text-lg text-green-100">
              Join thousands of farmers and experts on AgriConnect today. It's free to get started.
            </p>
            <Button size="lg" variant="secondary" className="h-12 px-8 text-lg font-semibold" asChild>
              <Link to="/dashboard">Join AgriConnect Now</Link>
            </Button>
          </div>
          
          {/* Decorative circles */}
          <div className="absolute left-1/2 top-1/2 -z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/10" />
          <div className="absolute left-1/2 top-1/2 -z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/10" />
          <div className="absolute left-1/2 top-1/2 -z-0 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/10" />
        </div>
      </section>
    </div>
  );
}
