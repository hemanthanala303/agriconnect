import { useState } from "react";
import { motion } from "motion/react";
import { HelpCircle, MessageCircle, Phone, Mail, ChevronDown, ChevronUp, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I register as a farmer?",
    answer: "Click on the 'Sign Up' button on the homepage, select 'Farmer' as your role, and fill in your details including your land size and location."
  },
  {
    question: "Is the expert advice free?",
    answer: "Basic community advice is free. Personalized consultations with certified experts may have a fee, which is clearly displayed before booking."
  },
  {
    question: "How can I sell my crops on AgriConnect?",
    answer: "Go to the 'Opportunities' section and look for 'Buyers'. You can also list your produce in the marketplace section once verified."
  },
  {
    question: "What if I forget my password?",
    answer: "Click on 'Forgot Password' on the login screen and follow the instructions sent to your registered email or phone number."
  },
];

export default function Help() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setMessage({ type: "error", text: "Name is required" });
      return;
    }
    if (!formData.email.trim()) {
      setMessage({ type: "error", text: "Email is required" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ type: "error", text: "Please enter a valid email address" });
      return;
    }
    if (!formData.subject.trim()) {
      setMessage({ type: "error", text: "Subject is required" });
      return;
    }
    if (!formData.message.trim()) {
      setMessage({ type: "error", text: "Message is required" });
      return;
    }

    try {
      setIsLoading(true);
      console.log("Sending support message:", formData);
      
      // TODO: Replace with actual API call
      // const response = await supportAPI.sendContactForm(formData);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
      setMessage({ type: "success", text: "Thank you! We'll get back to you soon." });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to send message. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          How can we help you?
        </h1>
        <p className="mt-4 text-lg text-stone-500">
          Find answers to common questions or get in touch with our support team.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* FAQs */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-stone-900">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-stone-900 hover:text-green-600 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-stone-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>We usually respond within 24 hours.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Message Alert */}
              {message.text && (
                <div className={`mb-4 rounded-lg p-3 flex items-center gap-2 text-sm ${
                  message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                }`}>
                  {message.type === "success" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                  {message.text}
                </div>
              )}
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Subject</label>
                  <Input
                    id="subject"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Message</label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue..."
                    className="min-h-[120px]"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border border-stone-200 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-stone-900">Call Us</p>
                <p className="text-sm text-stone-500">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-stone-200 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-stone-900">Email Us</p>
                <p className="text-sm text-stone-500">support@agriconnect.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
