import { Compass } from "lucide-react";
import { FaTwitter, FaGithub, FaDiscord, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-16 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-8 lg:mb-0">
            <div className="w-12 h-12 bg-blueprint-500 rounded-lg flex items-center justify-center">
              <Compass className="text-white w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-bold">Applifique</span>
              <p className="text-gray-400 text-sm">Blueprint your app development</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaGithub className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaDiscord className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Applifique. All rights reserved. Built with passion for developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
