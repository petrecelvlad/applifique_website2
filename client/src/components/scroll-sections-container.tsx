import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollNavigationProvider } from "@/hooks/use-scroll-navigation";

interface Section {
  id: string;
  component: React.ReactNode;
  label?: string;
}

interface ScrollSectionsContainerProps {
  sections: Section[];
  className?: string;
}

export default function ScrollSectionsContainer({ 
  sections, 
  className = "" 
}: ScrollSectionsContainerProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSection = useCallback((index: number) => {
    if (index < 0 || index >= sections.length) return;
    setCurrentSection(index);
  }, [sections.length]);

  const handleScroll = useCallback((event: WheelEvent) => {
    if (isScrolling) return;
    
    event.preventDefault();
    setIsScrolling(true);
    
    if (event.deltaY > 0) {
      // Scroll down
      if (currentSection < sections.length - 1) {
        updateSection(currentSection + 1);
      }
    } else {
      // Scroll up
      if (currentSection > 0) {
        updateSection(currentSection - 1);
      }
    }
    
    setTimeout(() => {
      setIsScrolling(false);
    }, 800);
  }, [currentSection, sections.length, updateSection, isScrolling]);

  // Touch events for mobile
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling) return;
      
      touchEndY = e.changedTouches[0].screenY;
      const diff = touchStartY - touchEndY;
      
      if (Math.abs(diff) > 50) {
        setIsScrolling(true);
        
        if (diff > 0 && currentSection < sections.length - 1) {
          updateSection(currentSection + 1);
        } else if (diff < 0 && currentSection > 0) {
          updateSection(currentSection - 1);
        }
        
        setTimeout(() => {
          setIsScrolling(false);
        }, 800);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: false });
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleScroll);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [handleScroll, currentSection, sections.length, updateSection, isScrolling]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentSection < sections.length - 1) {
          updateSection(currentSection + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentSection > 0) {
          updateSection(currentSection - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, sections.length, updateSection, isScrolling]);

  return (
    <ScrollNavigationProvider
      currentSection={currentSection}
      totalSections={sections.length}
      goToSection={updateSection}
      isScrolling={isScrolling}
    >
      <div 
        ref={containerRef}
        className={`fixed inset-0 overflow-hidden ${className}`}
        style={{ height: '100vh', width: '100vw' }}
      >
        {/* Section Indicator Dots */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => !isScrolling && updateSection(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentSection
                  ? 'bg-elegant-black shadow-lg shadow-elegant-black/40 scale-110'
                  : 'bg-elegant-gray/30 hover:bg-elegant-gray/60'
              }`}
              aria-label={`Go to section ${index + 1}${sections[index].label ? `: ${sections[index].label}` : ''}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 text-elegant-gray/60 text-sm font-light">
          Scroll to navigate
        </div>

        {/* Section Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-elegant-gray/10 z-50">
          <motion.div
            className="h-full bg-gradient-to-r from-elegant-black/60 to-elegant-black/80"
            initial={{ width: 0 }}
            animate={{ 
              width: `${((currentSection + 1) / sections.length) * 100}%` 
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        {/* Sections Container */}
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.1, 0.25, 1] 
              }}
              className="absolute inset-0 w-full h-full"
            >
              {sections[currentSection]?.component}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Section Counter */}
        <div className="fixed bottom-6 right-6 z-50 text-elegant-gray/60 text-sm font-light">
          {String(currentSection + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
        </div>
      </div>
    </ScrollNavigationProvider>
  );
}