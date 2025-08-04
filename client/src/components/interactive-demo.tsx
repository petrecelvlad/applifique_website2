import { motion } from "framer-motion";
import AnimatedBlueprint from "./sections/AnimatedBlueprint";

export default function InteractiveDemo() {

  return (
    <section id="demo" className="py-32 bg-elegant-black">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-light text-elegant-white mb-8 tracking-wide">
            Architecture in Motion
          </h2>
          <div className="w-24 h-px bg-elegant-white mx-auto mb-8"></div>
          <p className="text-lg text-elegant-light-gray max-w-2xl mx-auto font-light leading-relaxed">
            Experience the precision of automated blueprint generation through intelligent architectural planning.
          </p>
        </motion.div>

        {/* Animated Blueprint Demo */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-elegant-charcoal rounded-none border border-elegant-gray p-8 overflow-hidden"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-light text-elegant-white mb-4">Application Architecture</h3>
            <p className="text-sm text-elegant-light-gray font-light">
              Watch as the Applifique blueprint takes shape through intelligent component mapping
            </p>
          </div>
          <AnimatedBlueprint />
        </motion.div>
      </div>
    </section>
  );
}
