import { Button } from "@/components/ui/button";
import { Compass, Menu } from "lucide-react";
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
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blueprint-500 rounded-lg flex items-center justify-center">
            <Compass className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-bold text-gray-900">Applifique</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('features')}
            className="text-gray-600 hover:text-blueprint-500 transition-colors font-medium"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('demo')}
            className="text-gray-600 hover:text-blueprint-500 transition-colors font-medium"
          >
            Demo
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-gray-600 hover:text-blueprint-500 transition-colors font-medium"
          >
            Contact
          </button>
          <Button 
            onClick={scrollToContact}
            className="bg-blueprint-500 hover:bg-blueprint-600 text-white px-6 py-2.5 rounded-lg font-medium transition-all transform hover:scale-105"
          >
            Join Waitlist
          </Button>
        </div>
        
        <button className="md:hidden text-gray-600 hover:text-blueprint-500">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </motion.nav>
  );
}
