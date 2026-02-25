import { useState } from "react";
import { motion } from "motion/react";
import { HelpCircle, MessageCircle, Phone, Mail, ChevronDown, ChevronUp } from "lucide-react";
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
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Subject</label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Message</label>
                  <Textarea id="message" placeholder="Describe your issue..." className="min-h-[120px]" />
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">Send Message</Button>
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
