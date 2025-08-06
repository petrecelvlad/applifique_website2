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
  const isScrollingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSection = useCallback((index: number) => {
    if (index < 0 || index >= sections.length || isScrollingRef.current) return;
    
    isScrollingRef.current = true;
    setCurrentSection(index);
    
    // Reset scrolling state after animation completes
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 700);
  }, [sections.length]);

  // Single effect for all event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartY = 0;
    let touchEndY = 0;
    const SCROLL_THRESHOLD = 50; // Minimum time between scrolls (ms)
    const TOUCH_THRESHOLD = 30;   // Minimum touch distance

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      
      const now = Date.now();
      if (now - lastScrollTimeRef.current < SCROLL_THRESHOLD || isScrollingRef.current) {
        return;
      }
      
      // Only respond to significant scroll movements
      if (Math.abs(event.deltaY) < 10) return;
      
      lastScrollTimeRef.current = now;
      
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
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].screenY;
      const diff = touchStartY - touchEndY;
      
      if (Math.abs(diff) > TOUCH_THRESHOLD && !isScrollingRef.current) {
        if (diff > 0 && currentSection < sections.length - 1) {
          updateSection(currentSection + 1);
        } else if (diff < 0 && currentSection > 0) {
          updateSection(currentSection - 1);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrollingRef.current) return;
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        if (currentSection < sections.length - 1) {
          updateSection(currentSection + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentSection > 0) {
          updateSection(currentSection - 1);
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        updateSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        updateSection(sections.length - 1);
      }
    };

    // Add event listeners
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection, sections.length, updateSection]);

  return (
    <ScrollNavigationProvider
      currentSection={currentSection}
      totalSections={sections.length}
      goToSection={updateSection}
      isScrolling={isScrollingRef.current}
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
              onClick={() => !isScrollingRef.current && updateSection(index)}
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
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.4, 0.0, 0.2, 1] 
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