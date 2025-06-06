import { FaTwitter, FaGithub, FaDiscord, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-24 bg-elegant-black text-elegant-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex items-center mb-12 lg:mb-0">
            <div>
              <span className="text-2xl font-light tracking-wide">Applifique</span>
              <p className="text-elegant-gray text-sm font-light tracking-wide mt-1">Architectural Excellence</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
            <a href="#" className="text-elegant-gray hover:text-elegant-white transition-colors duration-300">
              <FaTwitter className="w-4 h-4" />
            </a>
            <a href="#" className="text-elegant-gray hover:text-elegant-white transition-colors duration-300">
              <FaGithub className="w-4 h-4" />
            </a>
            <a href="#" className="text-elegant-gray hover:text-elegant-white transition-colors duration-300">
              <FaDiscord className="w-4 h-4" />
            </a>
            <a href="#" className="text-elegant-gray hover:text-elegant-white transition-colors duration-300">
              <FaLinkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-elegant-charcoal mt-16 pt-12 text-center">
          <p className="text-elegant-gray text-xs font-light tracking-wider">
            © 2024 Applifique. Refined development architecture.
          </p>
        </div>
      </div>
    </footer>
  );
}
