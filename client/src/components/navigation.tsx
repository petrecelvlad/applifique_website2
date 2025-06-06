import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

export default function Navigation() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToContact = () => scrollToSection('contact');

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-elegant-white/95 backdrop-blur-sm border-b border-elegant-light-gray"
    >
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative">
            <span className="text-2xl font-light text-elegant-black tracking-[0.2em] font-serif italic">
              Applifique
            </span>
            <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-elegant-black/30 via-elegant-black/60 to-elegant-black/30"></div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-12">
          <button 
            onClick={() => scrollToSection('features')}
            className="text-elegant-gray hover:text-elegant-black transition-colors font-light tracking-wide"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('demo')}
            className="text-elegant-gray hover:text-elegant-black transition-colors font-light tracking-wide"
          >
            Demo
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-elegant-gray hover:text-elegant-black transition-colors font-light tracking-wide"
          >
            Contact
          </button>
          <Button 
            onClick={scrollToContact}
            className="bg-elegant-black hover:bg-elegant-charcoal text-elegant-white px-8 py-3 font-light tracking-wide transition-all border border-elegant-black"
          >
            Join Waitlist
          </Button>
        </div>
        
        <button className="md:hidden text-elegant-gray hover:text-elegant-black">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </motion.nav>
  );
}
