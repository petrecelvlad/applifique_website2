import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollNavigationProvider } from "@/hooks/use-scroll-navigation";
import { useMobile } from "@/hooks/use-mobile";

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
  const isMobile = useMobile();

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
    if (!container || isMobile) return; // Disable scroll-snapping on mobile

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
  }, [currentSection, sections.length, updateSection, isMobile]);

  // Responsive Design Strategy: Disable scroll-snapping on mobile
  const containerClasses = isMobile 
    ? `${className} overflow-y-auto` 
    : `fixed inset-0 overflow-hidden ${className}`;
  
  const containerStyle = isMobile 
    ? { minHeight: '100vh', width: '100%' }
    : { height: '100vh', width: '100vw' };

  return (
    <ScrollNavigationProvider
      currentSection={currentSection}
      totalSections={sections.length}
      goToSection={updateSection}
      isScrolling={isScrollingRef.current}
    >
      <div 
        ref={containerRef}
        className={containerClasses}
        style={containerStyle}
      >
        {/* Navigation & Orientation Suite - Design Principle Zone 3 */}
        {/* Only show on desktop - Mobile uses standard scroll */}
        {!isMobile && (
          <>
            {/* Side-Dot Indicator - Provides at-a-glance sense of place */}
            <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3">
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => !isScrollingRef.current && updateSection(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === currentSection
                      ? 'bg-elegant-black shadow-lg shadow-elegant-black/30 scale-125'
                      : 'bg-elegant-light-gray hover:bg-elegant-gray'
                  }`}
                  aria-label={`Go to section ${index + 1}${sections[index].label ? `: ${sections[index].label}` : ''}`}
                />
              ))}
            </div>

            {/* Scroll Cue - Explicitly teaches user interaction */}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 text-tertiary text-sm font-light">
              Scroll to navigate
            </div>
          </>
        )}

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

        {/* Sections Container - Responsive Design Strategy */}
        <div className="relative w-full h-full">
          {isMobile ? (
            /* Mobile: Standard free-scrolling stacked layout */
            <div className="w-full">
              {sections.map((section, index) => (
                <div key={section.id} className="w-full min-h-screen">
                  {section.component}
                </div>
              ))}
            </div>
          ) : (
            /* Desktop: Full-page scrolling experience */
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
          )}
        </div>

        {/* Positional Counter - Explicit progress tracking (Desktop only) */}
        {!isMobile && (
          <div className="fixed bottom-6 right-6 z-50 text-tertiary text-sm font-light">
            {String(currentSection + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
          </div>
        )}
      </div>
    </ScrollNavigationProvider>
  );
}