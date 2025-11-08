import React from 'react';
import { Github, Mail, Heart, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
export function Footer() {
  return <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Globe size={24} className="text-teal-400 mr-2" />
              <h2 className="text-2xl font-bold">NourishNet</h2>
            </div>
            <p className="text-gray-300 mb-4">
              A global digital platform connecting children in need with food
              providers and donors to combat childhood food insecurity
              worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <Link to="/track-donation" className="text-gray-300 hover:text-white transition-colors">
                  Track Donations
                </Link>
              </li>
              <li>
                <Link to="/verification-center" className="text-gray-300 hover:text-white transition-colors">
                  Verification Center
                </Link>
              </li>
              <li>
                <Link to="/global-hunger" className="text-gray-300 hover:text-white transition-colors">
                  Global Hunger Crisis
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/request-support" className="text-gray-300 hover:text-white transition-colors">
                  Request Food Support
                </Link>
              </li>
              <li>
                <Link to="/become-donor" className="text-gray-300 hover:text-white transition-colors">
                  Become a Donor
                </Link>
              </li>
              <li>
                <Link to="/instant-support" className="text-gray-300 hover:text-white transition-colors">
                  Instant Support
                </Link>
              </li>
              <li>
                <Link to="/social-activity" className="text-gray-300 hover:text-white transition-colors">
                  Our Social Impact
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Team</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about-us" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <Users size={16} className="mr-2" />
                  Our Founders
                </Link>
              </li>
              <li className="text-gray-300 mt-4">
                <span className="font-semibold">Americas:</span> +1 (555)
                123-4567
              </li>
              <li className="text-gray-300">
                <span className="font-semibold">Europe:</span> +44 (0) 20 7123
                4567
              </li>
              <li className="text-gray-300">
                <span className="font-semibold">Asia-Pacific:</span> +61 (0) 2
                8123 4567
              </li>
              <li className="text-gray-300">
                <span className="font-semibold">Africa:</span> +27 (0) 21 123
                4567
              </li>
              <li className="text-gray-300 mt-2">
                <span className="font-semibold">24/7 Emergency:</span> +1 (888)
                999-0000
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} NourishNet. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center">
            Made with <Heart size={16} className="mx-1 text-red-500" /> for
            children worldwide
          </p>
        </div>
      </div>
    </footer>;
}