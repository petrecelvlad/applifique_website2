import { FaYoutube, FaReddit, FaDiscord } from "react-icons/fa";
import applifiqueTitle from "@assets/App_Title.png";

export default function Footer() {
  return (
    <footer className="py-24 bg-elegant-black text-elegant-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex items-center mb-12 lg:mb-0">
            <div>
              <img 
                src={applifiqueTitle}
                alt="Applifique"
                className="h-10 object-contain brightness-0 invert"
              />
              <p className="text-elegant-gray text-sm font-light tracking-wide mt-3">c'est simply... magnifique</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
            <a href="#" className="text-elegant-gray hover:text-elegant-white transition-colors duration-300">
              <FaYoutube className="w-4 h-4" />
            </a>
            <a href="#" className="text-elegant-gray hover:text-elegant-white transition-colors duration-300">
              <FaReddit className="w-4 h-4" />
            </a>
            <a href="#" className="text-elegant-gray hover:text-elegant-white transition-colors duration-300">
              <FaDiscord className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-elegant-charcoal mt-16 pt-12 text-center">
          <p className="text-elegant-gray text-xs font-light tracking-wider">
            © 2025 Applifique. c'est simply... magnifique
          </p>
        </div>
      </div>
    </footer>
  );
}
