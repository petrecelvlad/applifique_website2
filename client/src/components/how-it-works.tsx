import { Pencil, Grid, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      icon: Pencil,
      number: "01",
      title: "Conceptualize",
      description: "Articulate your vision with precision and clarity through our guided framework."
    },
    {
      icon: Grid,
      number: "02", 
      title: "Architect",
      description: "Transform concepts into structured blueprints with systematic planning methodology."
    },
    {
      icon: ArrowRight,
      number: "03",
      title: "Execute",
      description: "Implement with confidence using comprehensive documentation and clear guidance."
    }
  ];

  return (
    <section className="py-32 bg-elegant-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-light text-elegant-black mb-8 tracking-wide">
            Methodology
          </h2>
          <div className="w-24 h-px bg-elegant-black mx-auto mb-8"></div>
          <p className="text-lg text-elegant-gray max-w-2xl mx-auto font-light leading-relaxed">
            A systematic approach to architectural planning that transforms ideas into executable blueprints.
          </p>
        </motion.div>

        <div className="relative">
          {/* Elegant connection line */}
          <div className="hidden lg:block absolute top-1/2 left-1/4 right-1/4 h-px bg-elegant-light-gray transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center group relative"
              >
                <div className="relative mb-12">
                  <div className="w-20 h-20 border border-elegant-light-gray flex items-center justify-center mx-auto group-hover:border-elegant-black transition-all duration-500">
                    <step.icon className="text-elegant-gray group-hover:text-elegant-black w-8 h-8 transition-colors duration-300" />
                  </div>
                  <div className="absolute -top-3 -right-3 text-xs font-mono text-elegant-gray tracking-wider">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-light text-elegant-black mb-6 tracking-wide">{step.title}</h3>
                <p className="text-elegant-gray leading-relaxed font-light">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
