import React from 'react';
import { TrendingUp } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-6 w-6 text-green-400" />
              <span className="text-xl font-bold">FundVision</span>
            </div>
            <p className="text-gray-400 mb-4">
              Making mutual fund investments easy and accessible.
              Get personalized recommendations based on your goals.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition">Home</a></li>
              <li><a href="/profile" className="text-gray-400 hover:text-white transition">Profile</a></li>
              <li><a href="/recommendations" className="text-gray-400 hover:text-white transition">Recommendations</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Learn About MFs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Investment Calculator</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Tax Benefits</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: support@fundvision.com</li>
              <li>Phone: +91 123 456 7890</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} FundVision. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-400 text-sm">
              Disclaimer: Mutual Fund investments are subject to market risks. Read all scheme related documents carefully.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;