import { Compass, Grid3X3, Layers, Users, Zap, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      icon: Compass,
      title: "Architectural Guidance",
      description: "Transform abstract concepts into structured blueprints with precision and clarity."
    },
    {
      icon: Grid3X3,
      title: "Blueprint Precision",
      description: "Create detailed component hierarchies that serve as your development foundation."
    },
    {
      icon: Layers,
      title: "Systematic Planning",
      description: "Layer by layer construction of your application's architectural vision."
    },
    {
      icon: Users,
      title: "Collaborative Design",
      description: "Share and refine blueprints with your team before development begins."
    },
    {
      icon: Zap,
      title: "Efficient Process",
      description: "Streamline planning phases with intelligent automation and guidance."
    },
    {
      icon: FileText,
      title: "Documentation Excellence",
      description: "Generate comprehensive documentation that grows with your project."
    }
  ];

  return (
    <section id="features" className="py-32 bg-elegant-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-light text-elegant-black mb-8 tracking-wide">
            Refined Development Architecture
          </h2>
          <div className="w-24 h-px bg-elegant-black mx-auto mb-8"></div>
          <p className="text-lg text-elegant-gray max-w-2xl mx-auto font-light leading-relaxed">
            Precision-engineered tools for the discerning developer who values clarity, structure, and architectural excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              <div className="w-16 h-16 mx-auto mb-8 border border-elegant-light-gray flex items-center justify-center group-hover:border-elegant-black transition-all duration-500">
                <feature.icon className="text-elegant-gray group-hover:text-elegant-black w-7 h-7 transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-light text-elegant-black mb-4 tracking-wide">{feature.title}</h3>
              <p className="text-elegant-gray leading-relaxed font-light text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
