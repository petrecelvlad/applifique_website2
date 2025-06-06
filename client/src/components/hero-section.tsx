import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import applifiqueTitle from "@assets/App_Title.png";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring-animated values for smooth, elastic motion
  const springConfig = { stiffness: 150, damping: 25, mass: 0.1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // Transform values for different grid elements with varying intensities
  const x1 = useTransform(x, [-1, 1], [-20, 20]);
  const y1 = useTransform(y, [-1, 1], [-15, 15]);
  const x2 = useTransform(x, [-1, 1], [15, -15]);
  const y2 = useTransform(y, [-1, 1], [20, -20]);
  const x3 = useTransform(x, [-1, 1], [-10, 10]);
  const y3 = useTransform(y, [-1, 1], [-25, 25]);
  const x4 = useTransform(x, [-1, 1], [25, -25]);
  const y4 = useTransform(y, [-1, 1], [10, -10]);
  const x5 = useTransform(x, [-1, 1], [-30, 30]);
  const y5 = useTransform(y, [-1, 1], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize mouse position to -1 to 1 range
    const normalizedX = (event.clientX - centerX) / (rect.width / 2);
    const normalizedY = (event.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly return to center
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToDemo = () => {
    const element = document.getElementById('demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-elegant-white overflow-hidden architectural-grid cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle architectural grid overlay */}
      <div className="absolute inset-0 architectural-grid-fine opacity-30"></div>
      
      {/* Interactive geometric elements with cursor-responsive motion */}
      <div className="absolute inset-0 opacity-10">
        {/* Large rectangle - top left */}
        <motion.div 
          className="absolute top-32 left-32 w-64 h-64 border border-elegant-black"
          style={{ x: x1, y: y1 }}
          animate={{ 
            scale: isHovered ? 1.02 : 1,
            opacity: isHovered ? 0.15 : 0.1
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        
        {/* Rotated square - bottom right */}
        <motion.div 
          className="absolute bottom-32 right-32 w-48 h-48 border border-elegant-black transform rotate-45"
          style={{ x: x2, y: y2 }}
          animate={{ 
            scale: isHovered ? 1.05 : 1,
            rotate: isHovered ? 50 : 45,
            opacity: isHovered ? 0.15 : 0.1
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
        {/* Medium square - center left */}
        <motion.div 
          className="absolute top-1/2 left-1/4 w-32 h-32 border border-elegant-black"
          style={{ x: x3, y: y3 }}
          animate={{ 
            scale: isHovered ? 1.08 : 1,
            opacity: isHovered ? 0.2 : 0.1
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        
        {/* Horizontal line - top right */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-96 h-px bg-elegant-black"
          style={{ x: x4, y: y4 }}
          animate={{ 
            scaleX: isHovered ? 1.1 : 1,
            opacity: isHovered ? 0.2 : 0.1
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        
        {/* Vertical line - bottom left */}
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-px h-64 bg-elegant-black"
          style={{ x: x5, y: y5 }}
          animate={{ 
            scaleY: isHovered ? 1.15 : 1,
            opacity: isHovered ? 0.2 : 0.1
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        
        {/* Additional floating elements for depth */}
        <motion.div 
          className="absolute top-20 right-20 w-12 h-12 border border-elegant-black rounded-full"
          style={{ 
            x: useTransform(x, [-1, 1], [10, -10]), 
            y: useTransform(y, [-1, 1], [-20, 20]) 
          }}
          animate={{ 
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 0.25 : 0.1
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        
        <motion.div 
          className="absolute bottom-20 left-20 w-6 h-6 bg-elegant-black"
          style={{ 
            x: useTransform(x, [-1, 1], [-15, 15]), 
            y: useTransform(y, [-1, 1], [15, -15]) 
          }}
          animate={{ 
            scale: isHovered ? 1.5 : 1,
            rotate: isHovered ? 90 : 0,
            opacity: isHovered ? 0.3 : 0.1
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      
      {/* Custom cursor */}
      {isHovered && (
        <motion.div
          className="fixed pointer-events-none z-50 w-4 h-4 bg-elegant-black rounded-full mix-blend-difference"
          style={{
            x: useTransform(mouseX, [-1, 1], [-8, -8]),
            y: useTransform(mouseY, [-1, 1], [-8, -8]),
            left: 0,
            top: 0
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="space-y-12"
        >
          {/* Elegant title using the uploaded image */}
          <div className="flex justify-center mb-16">
            <motion.img 
              src={applifiqueTitle}
              alt="Applifique"
              className="h-24 md:h-32 object-contain"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
          
          {/* French tagline */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-2xl text-elegant-gray font-light tracking-wider italic mb-24"
          >
            c'est simply... magnifique
          </motion.p>
          
          {/* Minimal CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col items-center space-y-8"
          >
            <Button 
              onClick={scrollToDemo}
              variant="ghost"
              className="text-elegant-black hover:text-elegant-charcoal font-light tracking-wide text-lg border-b border-elegant-black border-opacity-20 hover:border-opacity-60 rounded-none px-0 pb-1 transition-all duration-300"
            >
              Discover More
            </Button>
            
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-5 h-5 text-elegant-gray" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
