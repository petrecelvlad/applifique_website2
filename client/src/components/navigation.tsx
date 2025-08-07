import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import applifiqueTitle from "@assets/App_Title.png";
import { useScrollNavigation } from "@/hooks/use-scroll-navigation";
import { useState } from "react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      setIsMobileMenuOpen(false); // Close mobile menu on navigation
    }
  };

  return (
    <>
      {/* Persistent Global Header - Design Principle Zone 1 */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-elegant-white border-b border-elegant-light-gray"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo - Left aligned */}
          <div className="flex items-center">
            <img 
              src={applifiqueTitle}
              alt="Applifique"
              className="h-8 md:h-10 object-contain"
              style={{ 
                imageRendering: 'auto',
                filter: 'none'
              }}
            />
          </div>
          
          {/* Primary Navigation Links - Center (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigateToSection(2)}
              className="nav-link"
            >
              Features
            </button>
            <button 
              onClick={() => navigateToSection(1)}
              className="nav-link"
            >
              Demo
            </button>
            <button 
              onClick={() => navigateToSection(4)}
              className="nav-link"
            >
              Contact
            </button>
          </div>

          {/* Primary Conversion Path - Right aligned */}
          <div className="hidden md:flex items-center">
            <Button 
              onClick={() => navigateToSection(4)}
              className="cta-primary"
            >
              Join Waitlist
            </Button>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden nav-link"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu - Responsive Design Strategy */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-elegant-white border-b border-elegant-light-gray md:hidden"
          >
            <div className="max-w-6xl mx-auto px-6 py-4 space-y-4">
              <button 
                onClick={() => navigateToSection(2)}
                className="block w-full text-left nav-link py-2"
              >
                Features
              </button>
              <button 
                onClick={() => navigateToSection(1)}
                className="block w-full text-left nav-link py-2"
              >
                Demo
              </button>
              <button 
                onClick={() => navigateToSection(4)}
                className="block w-full text-left nav-link py-2"
              >
                Contact
              </button>
              <Button 
                onClick={() => navigateToSection(4)}
                className="w-full cta-primary mt-4"
              >
                Join Waitlist
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
