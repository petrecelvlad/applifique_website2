import { FaYoutube, FaReddit, FaDiscord } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-24 bg-elegant-black text-elegant-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex items-center mb-12 lg:mb-0">
            <div>
              <div className="relative">
                <span className="text-2xl font-light text-elegant-white tracking-[0.2em] font-serif italic">
                  Applifique
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-elegant-white/30 via-elegant-white/60 to-elegant-white/30"></div>
              </div>
              <p className="text-elegant-gray text-sm font-light tracking-wide mt-1">c'est simply... magnifique</p>
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
