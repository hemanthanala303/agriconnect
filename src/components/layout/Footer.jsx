import { Link } from "react-router-dom";
import { Sprout, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-200">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white">
                <Sprout className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                AgriConnect
              </span>
            </div>
            <p className="text-sm text-stone-400">
              Empowering farmers with technology, knowledge, and community support for a sustainable future.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-stone-800 hover:text-white">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-stone-800 hover:text-white">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-stone-800 hover:text-white">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-stone-800 hover:text-white">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Platform
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/dashboard" className="hover:text-green-400 transition-colors">
                  Farmer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/learning" className="hover:text-green-400 transition-colors">
                  Learning Center
                </Link>
              </li>
              <li>
                <Link to="/opportunities" className="hover:text-green-400 transition-colors">
                  Opportunities
                </Link>
              </li>
              <li>
                <Link to="/experts" className="hover:text-green-400 transition-colors">
                  Expert Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="hover:text-green-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-green-400 transition-colors">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-green-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-green-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Subscribe
            </h3>
            <p className="mb-4 text-sm text-stone-400">
              Get the latest agricultural news and updates delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Your email" className="bg-stone-800 border-stone-700" />
              <Button className="bg-green-600 hover:bg-green-700">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-stone-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-stone-400 md:text-left">
              © 2024 AgriConnect. All rights reserved. | Empowering farmers worldwide.
            </p>
            <div className="flex gap-6 text-sm text-stone-400">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
