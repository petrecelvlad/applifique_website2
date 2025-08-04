import { motion } from "framer-motion";

interface ScrollSectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  background?: 'dark' | 'light' | 'gradient';
}

export default function ScrollSectionWrapper({ 
  children, 
  className = "",
  background = 'light'
}: ScrollSectionWrapperProps) {
  const backgroundClasses = {
    dark: 'bg-gradient-to-br from-gray-900 via-gray-800 to-black',
    light: 'bg-elegant-white',
    gradient: 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
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