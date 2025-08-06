import { motion } from "framer-motion";

interface ScrollSectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  background?: 'dark' | 'light' | 'primary';
}

export default function ScrollSectionWrapper({ 
  children, 
  className = "",
  background = 'light'
}: ScrollSectionWrapperProps) {
  // Design Principles: Light Theme with White Background (#FFFFFF)
  // Architectural grid as persistent element within main content viewport
  const backgroundClasses = {
    dark: 'bg-elegant-charcoal text-elegant-white',
    light: 'bg-elegant-white architectural-grid',
    primary: 'bg-elegant-white architectural-grid'
  };

  return (
    <div className={`w-full h-full ${backgroundClasses[background]} ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.2,
          ease: [0.25, 0.1, 0.25, 1] 
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}