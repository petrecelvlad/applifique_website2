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
  
  // Transform values with much more pronounced motion for dramatic effect
  const x1 = useTransform(x, [-1, 1], [-60, 60]);
  const y1 = useTransform(y, [-1, 1], [-45, 45]);
  const x2 = useTransform(x, [-1, 1], [50, -50]);
  const y2 = useTransform(y, [-1, 1], [70, -70]);
  const x3 = useTransform(x, [-1, 1], [-40, 40]);
  const y3 = useTransform(y, [-1, 1], [-80, 80]);
  const x4 = useTransform(x, [-1, 1], [80, -80]);
  const y4 = useTransform(y, [-1, 1], [35, -35]);
  const x5 = useTransform(x, [-1, 1], [-70, 70]);
  const y5 = useTransform(y, [-1, 1], [-25, 25]);
  
  // Additional geometric elements with varied motion
  const x6 = useTransform(x, [-1, 1], [30, -30]);
  const y6 = useTransform(y, [-1, 1], [-60, 60]);
  const x7 = useTransform(x, [-1, 1], [-45, 45]);
  const y7 = useTransform(y, [-1, 1], [45, -45]);
  const x8 = useTransform(x, [-1, 1], [65, -65]);
  const y8 = useTransform(y, [-1, 1], [-30, 30]);
  const x9 = useTransform(x, [-1, 1], [-55, 55]);
  const y9 = useTransform(y, [-1, 1], [55, -55]);
  
  // Cursor transforms
  const cursorX = useTransform(mouseX, [-1, 1], [-8, -8]);
  const cursorY = useTransform(mouseY, [-1, 1], [-8, -8]);

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
      
      {/* Interactive UI components with dramatic cursor-responsive motion */}
      <div className="absolute inset-0">
        {/* Card Component - top left */}
        <motion.div 
          className="absolute top-32 left-32 w-64 h-40 border border-elegant-black bg-white/5 rounded-lg shadow-sm"
          style={{ x: x1, y: y1 }}
          animate={{ 
            scale: isHovered ? 1.15 : 1,
            opacity: isHovered ? 0.6 : 0.2,
            backgroundColor: isHovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="p-4 space-y-2">
            <div className="w-3/4 h-3 bg-elegant-black/30 rounded"></div>
            <div className="w-1/2 h-2 bg-elegant-black/20 rounded"></div>
            <div className="w-full h-2 bg-elegant-black/20 rounded"></div>
          </div>
        </motion.div>
        
        {/* Button Component - bottom right */}
        <motion.div 
          className="absolute bottom-32 right-32 w-32 h-12 border border-elegant-black bg-elegant-black/10 rounded-md flex items-center justify-center"
          style={{ x: x2, y: y2 }}
          animate={{ 
            scale: isHovered ? 1.25 : 1,
            opacity: isHovered ? 0.7 : 0.25,
            backgroundColor: isHovered ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.1)"
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-16 h-2 bg-elegant-black/50 rounded"></div>
        </motion.div>
        
        {/* Input Field - center left */}
        <motion.div 
          className="absolute top-1/2 left-1/4 w-48 h-10 border border-elegant-black bg-white/5 rounded"
          style={{ x: x3, y: y3 }}
          animate={{ 
            scale: isHovered ? 1.3 : 1,
            opacity: isHovered ? 0.6 : 0.2,
            backgroundColor: isHovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="p-2">
            <div className="w-20 h-2 bg-elegant-black/30 rounded"></div>
          </div>
        </motion.div>
        
        {/* Navigation Bar - top center */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-80 h-8 bg-elegant-black/10 rounded-full flex items-center justify-around px-4"
          style={{ x: x4, y: y4 }}
          animate={{ 
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 0.6 : 0.2,
            backgroundColor: isHovered ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.1)"
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="w-8 h-2 bg-elegant-black/40 rounded"></div>
          <div className="w-8 h-2 bg-elegant-black/40 rounded"></div>
          <div className="w-8 h-2 bg-elegant-black/40 rounded"></div>
          <div className="w-8 h-2 bg-elegant-black/40 rounded"></div>
        </motion.div>
        
        {/* Sidebar - bottom left */}
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-6 h-48 bg-elegant-black/10 rounded-sm"
          style={{ x: x5, y: y5 }}
          animate={{ 
            scale: isHovered ? 1.3 : 1,
            opacity: isHovered ? 0.6 : 0.2,
            backgroundColor: isHovered ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.1)"
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="p-1 space-y-2">
            <div className="w-full h-1 bg-elegant-black/40 rounded"></div>
            <div className="w-full h-1 bg-elegant-black/40 rounded"></div>
            <div className="w-full h-1 bg-elegant-black/40 rounded"></div>
          </div>
        </motion.div>
        
        {/* Profile Avatar - top right */}
        <motion.div 
          className="absolute top-20 right-20 w-16 h-16 border border-elegant-black rounded-full bg-white/5 flex items-center justify-center"
          style={{ x: x6, y: y6 }}
          animate={{ 
            scale: isHovered ? 1.8 : 1,
            opacity: isHovered ? 0.7 : 0.2,
            backgroundColor: isHovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="w-8 h-8 bg-elegant-black/40 rounded-full"></div>
        </motion.div>
        
        {/* Loading Spinner - bottom left */}
        <motion.div 
          className="absolute bottom-20 left-20 w-8 h-8 border-2 border-elegant-black/20 border-t-elegant-black/60 rounded-full"
          style={{ x: x7, y: y7 }}
          animate={{ 
            scale: isHovered ? 2.5 : 1,
            rotate: isHovered ? 360 : 0,
            opacity: isHovered ? 0.8 : 0.25,
            borderTopColor: isHovered ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.6)"
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        
        {/* Message Notification - center top */}
        <motion.div 
          className="absolute top-16 left-1/2 w-24 h-8 bg-elegant-black/10 rounded-full transform -translate-x-1/2 flex items-center justify-center"
          style={{ x: x8, y: y8 }}
          animate={{ 
            scale: isHovered ? 2 : 1,
            opacity: isHovered ? 0.7 : 0.2,
            backgroundColor: isHovered ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.1)"
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-12 h-1.5 bg-elegant-black/50 rounded"></div>
        </motion.div>
        
        {/* Toggle Switch - center right */}
        <motion.div 
          className="absolute top-1/3 right-16 w-12 h-6 bg-elegant-black/20 rounded-full flex items-center px-1"
          style={{ x: x9, y: y9 }}
          animate={{ 
            scale: isHovered ? 2.5 : 1,
            opacity: isHovered ? 0.8 : 0.2,
            backgroundColor: isHovered ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.2)"
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="w-4 h-4 bg-elegant-black/60 rounded-full"></div>
        </motion.div>
      </div>
      
      {/* Custom cursor */}
      {isHovered && (
        <motion.div
          className="fixed pointer-events-none z-50 w-4 h-4 bg-elegant-black rounded-full mix-blend-difference"
          style={{
            x: cursorX,
            y: cursorY,
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
