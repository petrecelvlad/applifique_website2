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
  
  // Transform values with subtle wobble motion when extended
  const x1 = useTransform(x, [-1, 1], [-15, 15]);
  const y1 = useTransform(y, [-1, 1], [-12, 12]);
  const x2 = useTransform(x, [-1, 1], [12, -12]);
  const y2 = useTransform(y, [-1, 1], [15, -15]);
  const x3 = useTransform(x, [-1, 1], [-10, 10]);
  const y3 = useTransform(y, [-1, 1], [-18, 18]);
  const x4 = useTransform(x, [-1, 1], [18, -18]);
  const y4 = useTransform(y, [-1, 1], [10, -10]);
  const x5 = useTransform(x, [-1, 1], [-12, 12]);
  const y5 = useTransform(y, [-1, 1], [-8, 8]);
  
  // Additional transforms for satellite elements
  const x6 = useTransform(x, [-1, 1], [8, -8]);
  const y6 = useTransform(y, [-1, 1], [-15, 15]);
  const x7 = useTransform(x, [-1, 1], [-12, 12]);
  const y7 = useTransform(y, [-1, 1], [12, -12]);
  const x8 = useTransform(x, [-1, 1], [14, -14]);
  const y8 = useTransform(y, [-1, 1], [-8, 8]);
  const x9 = useTransform(x, [-1, 1], [-10, 10]);
  const y9 = useTransform(y, [-1, 1], [14, -14]);
  const x10 = useTransform(x, [-1, 1], [16, -16]);
  const y10 = useTransform(y, [-1, 1], [-12, 12]);
  const x11 = useTransform(x, [-1, 1], [-14, 14]);
  const y11 = useTransform(y, [-1, 1], [16, -16]);
  
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
      className="relative min-h-screen flex items-center justify-center bg-elegant-white overflow-hidden architectural-grid"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle architectural grid overlay */}
      <div className="absolute inset-0 architectural-grid-fine opacity-30"></div>
      
      {/* Interactive diverse UI elements orbiting around the title image specifically */}
      <div className="absolute inset-0">
        {/* Primary Action Button - far top left */}
        <motion.div 
          className="absolute w-36 h-12 bg-elegant-black/15 rounded-lg border border-elegant-black/30 flex items-center justify-center hover:shadow-lg"
          style={{ x: x1, y: y1 }}
          animate={{ 
            top: isHovered ? '15%' : '38%',
            left: isHovered ? '8%' : '28%',
            scale: isHovered ? 1.15 : 1,
            opacity: isHovered ? 0.8 : 0.25,
            backgroundColor: isHovered ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.15)"
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut"
          }}
        >
          <motion.div 
            className="flex items-center space-x-2"
            animate={{ y: [0, -3, 0, 3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-4 h-4 bg-white/60 rounded"></div>
            <div className="w-16 h-2 bg-white/70 rounded"></div>
          </motion.div>
        </motion.div>
        
        {/* Circular Loading Spinner - far bottom right */}
        <motion.div 
          className="absolute w-14 h-14 rounded-full border-4 border-elegant-black/20 border-t-elegant-black/60"
          style={{ x: x2, y: y2 }}
          animate={{ 
            bottom: isHovered ? '12%' : '35%',
            right: isHovered ? '10%' : '25%',
            scale: isHovered ? 1.3 : 1,
            opacity: isHovered ? 0.9 : 0.3,
            borderTopColor: isHovered ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.6)",
            rotate: 360
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            rotate: { duration: 1.5, repeat: Infinity, ease: "linear" }
          }}
        />
        
        {/* Range Slider - mid left */}
        <motion.div 
          className="absolute w-44 h-6 flex items-center"
          style={{ x: x3, y: y3 }}
          animate={{ 
            top: isHovered ? '48%' : '49%',
            left: isHovered ? '6%' : '32%',
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 0.8 : 0.25
          }}
          transition={{ 
            duration: 0.7, 
            ease: "easeOut"
          }}
        >
          <motion.div 
            className="w-full h-2 bg-elegant-black/20 rounded-full relative"
            animate={{ x: [0, 2, 0, -2, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-2/5 h-full bg-elegant-black/50 rounded-full"></div>
            <div className="absolute w-4 h-4 bg-elegant-black/70 rounded-full border-2 border-white/80 shadow transform -translate-y-1/2 top-1/2" style={{ left: '40%' }}></div>
          </motion.div>
        </motion.div>
        
        {/* Icon Grid - far top right */}
        <motion.div 
          className="absolute grid grid-cols-3 gap-2"
          style={{ x: x4, y: y4 }}
          animate={{ 
            top: isHovered ? '18%' : '40%',
            right: isHovered ? '8%' : '28%',
            scale: isHovered ? 1.25 : 1,
            opacity: isHovered ? 0.8 : 0.25,
            rotate: [0, 2, 0, -2, 0]
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-7 h-7 bg-elegant-black/30 rounded"></div>
          <div className="w-7 h-7 bg-elegant-black/30 rounded-full"></div>
          <div className="w-7 h-7 bg-elegant-black/30 rounded transform rotate-45"></div>
          <div className="w-7 h-7 bg-elegant-black/30 rounded-full"></div>
          <div className="w-7 h-7 bg-elegant-black/40 rounded"></div>
          <div className="w-7 h-7 bg-elegant-black/30 rounded-full"></div>
        </motion.div>
        
        {/* Vertical Progress Bar - far bottom left */}
        <motion.div 
          className="absolute w-5 h-28 bg-elegant-black/15 rounded-full overflow-hidden"
          style={{ x: x5, y: y5 }}
          animate={{ 
            bottom: isHovered ? '15%' : '38%',
            left: isHovered ? '12%' : '30%',
            scale: isHovered ? 1.3 : 1,
            opacity: isHovered ? 0.8 : 0.25,
            backgroundColor: isHovered ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.15)"
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut"
          }}
        >
          <motion.div 
            className="w-full h-3/4 bg-elegant-black/50 absolute bottom-0"
            animate={{ x: [0, -2, 0, 2, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        
        {/* Avatar with Status Dot - mid top right */}
        <motion.div 
          className="absolute w-14 h-14"
          style={{ x: x6, y: y6 }}
          animate={{ 
            top: isHovered ? '35%' : '46%',
            right: isHovered ? '12%' : '30%',
            scale: isHovered ? 1.4 : 1,
            opacity: isHovered ? 0.9 : 0.3,
            rotate: [0, 3, 0, -3, 0]
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-full h-full bg-elegant-black/30 rounded-full border-2 border-elegant-black/40 relative">
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-elegant-black/60 rounded-full border-2 border-white/80"></div>
          </div>
        </motion.div>
        
        {/* Checkbox Group - mid bottom left */}
        <motion.div 
          className="absolute space-y-2"
          style={{ x: x7, y: y7 }}
          animate={{ 
            bottom: isHovered ? '35%' : '43%',
            left: isHovered ? '10%' : '35%',
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.9 : 0.25
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut"
          }}
        >
          <motion.div
            className="space-y-2"
            animate={{ y: [0, -2, 0, 2, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-4 h-4 bg-elegant-black/50 rounded border border-elegant-black/60 flex items-center justify-center">
              <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
            </div>
            <div className="w-4 h-4 bg-white/10 rounded border border-elegant-black/60"></div>
            <div className="w-4 h-4 bg-elegant-black/50 rounded border border-elegant-black/60 flex items-center justify-center">
              <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Badge with Counter - top center */}
        <motion.div 
          className="absolute"
          style={{ x: x8, y: y8 }}
          animate={{ 
            top: isHovered ? '8%' : '36%',
            left: isHovered ? '48%' : '49%',
            scale: isHovered ? 1.4 : 1,
            opacity: isHovered ? 0.9 : 0.3
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut"
          }}
        >
          <motion.div
            className="w-12 h-12 bg-elegant-black/25 rounded-lg flex items-center justify-center relative"
            animate={{ y: [0, -4, 0, 4, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-6 h-6 bg-elegant-black/50 rounded"></div>
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-elegant-black/70 rounded-full flex items-center justify-center border-2 border-white/80">
              <div className="w-2 h-1 bg-white/90 rounded"></div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Multi-Toggle Switch - mid right */}
        <motion.div 
          className="absolute flex items-center space-x-2"
          style={{ x: x9, y: y9 }}
          animate={{ 
            top: isHovered ? '55%' : '51%',
            right: isHovered ? '8%' : '36%',
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.9 : 0.25
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut"
          }}
        >
          <motion.div
            className="flex items-center space-x-2"
            animate={{ x: [0, 3, 0, -3, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-8 h-5 bg-elegant-black/50 rounded-full relative">
              <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white/90 rounded-full shadow"></div>
            </div>
            <div className="w-8 h-5 bg-elegant-black/20 rounded-full relative">
              <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-elegant-black/60 rounded-full"></div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Text Input Field - new element */}
        <motion.div 
          className="absolute w-40 h-10 bg-white/5 border border-elegant-black/30 rounded flex items-center px-3"
          style={{ x: x10, y: y10 }}
          animate={{ 
            bottom: isHovered ? '8%' : '42%',
            right: isHovered ? '15%' : '38%',
            scale: isHovered ? 1.3 : 1,
            opacity: isHovered ? 0.8 : 0.25,
            backgroundColor: isHovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut"
          }}
        >
          <motion.div
            className="flex items-center"
            animate={{ y: [0, 2, 0, -2, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-2 h-4 bg-elegant-black/60 animate-pulse"></div>
            <div className="ml-2 w-20 h-1.5 bg-elegant-black/30 rounded"></div>
          </motion.div>
        </motion.div>
        
        {/* Radio Button Group - new element */}
        <motion.div 
          className="absolute space-y-1"
          style={{ x: x11, y: y11 }}
          animate={{ 
            top: isHovered ? '25%' : '44%',
            left: isHovered ? '15%' : '38%',
            scale: isHovered ? 1.4 : 1,
            opacity: isHovered ? 0.9 : 0.25
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut"
          }}
        >
          <motion.div
            className="space-y-1"
            animate={{ x: [0, -2, 0, 2, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-4 h-4 bg-elegant-black/30 rounded-full border-2 border-elegant-black/50 relative">
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-elegant-black/70 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <div className="w-4 h-4 bg-white/10 rounded-full border-2 border-elegant-black/50"></div>
            <div className="w-4 h-4 bg-white/10 rounded-full border-2 border-elegant-black/50"></div>
          </motion.div>
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
