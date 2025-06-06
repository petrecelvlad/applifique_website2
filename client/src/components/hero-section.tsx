import { Button } from "@/components/ui/button";
import { Rocket, Play, Code } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
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
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blueprint-50 to-white overflow-hidden">
      {/* Blueprint-inspired background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 border border-blueprint-500 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 border border-blueprint-500 rounded-lg transform rotate-45"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 border border-blueprint-500 rounded-lg"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Blueprint Your<br/>
            <span className="text-blueprint-500">App Development</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Transform complex app ideas into structured blueprints. Applifique simplifies development planning with AI-powered architecture generation, making your vision buildable.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Button 
              onClick={scrollToContact}
              className="bg-blueprint-500 hover:bg-blueprint-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 hover:shadow-xl"
            >
              <Rocket className="mr-3 w-5 h-5" />
              Get Early Access
            </Button>
            <Button 
              variant="outline"
              onClick={scrollToDemo}
              className="border-2 border-gray-300 hover:border-blueprint-500 text-gray-700 hover:text-blueprint-500 px-8 py-4 rounded-xl font-semibold text-lg transition-all"
            >
              <Play className="mr-3 w-5 h-5" />
              Watch Demo
            </Button>
          </div>
          
          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blueprint-500">10x</div>
              <div className="text-gray-600 font-medium">Faster Planning</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blueprint-500">500+</div>
              <div className="text-gray-600 font-medium">Projects Blueprinted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blueprint-500">50+</div>
              <div className="text-gray-600 font-medium">Beta Developers</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating illustration */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-32 h-32 hidden lg:block"
      >
        <div className="w-full h-full bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center">
          <Code className="text-blueprint-500 w-12 h-12" />
        </div>
      </motion.div>
    </section>
  );
}
