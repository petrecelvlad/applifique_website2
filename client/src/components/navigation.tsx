import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import applifiqueTitle from "@assets/App_Title.png";
import { useScrollNavigation } from "@/hooks/use-scroll-navigation";

export default function Navigation() {
  let goToSection: (index: number) => void;
  let isScrolling = false;
  
  try {
    const navigation = useScrollNavigation();
    goToSection = navigation.goToSection;
    isScrolling = navigation.isScrolling;
  } catch {
    // Fallback for when not in scroll context
    goToSection = () => {};
  }

  const navigateToSection = (sectionIndex: number) => {
    if (!isScrolling) {
      goToSection(sectionIndex);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-elegant-white border-b border-elegant-light-gray"
    >
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={applifiqueTitle}
            alt="Applifique"
            className="h-10 object-contain"
          />
        </div>
        
        <div className="hidden md:flex items-center space-x-12">
          <button 
            onClick={() => navigateToSection(2)}
            className="text-elegant-gray hover:text-elegant-black transition-colors font-light tracking-wide"
          >
            Features
          </button>
          <button 
            onClick={() => navigateToSection(1)}
            className="text-elegant-gray hover:text-elegant-black transition-colors font-light tracking-wide"
          >
            Demo
          </button>
          <button 
            onClick={() => navigateToSection(4)}
            className="text-elegant-gray hover:text-elegant-black transition-colors font-light tracking-wide"
          >
            Contact
          </button>
          <Button 
            onClick={() => navigateToSection(4)}
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
