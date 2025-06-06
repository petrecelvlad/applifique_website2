import { Lightbulb, Settings, Rocket } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      icon: Lightbulb,
      number: 1,
      title: "Describe Your App",
      description: "Simply tell our AI what you want to build. Describe features, target users, and your vision. No technical jargon required."
    },
    {
      icon: Settings,
      number: 2,
      title: "AI Generates Blueprint",
      description: "Our advanced AI analyzes your requirements and creates a comprehensive blueprint with file structure, documentation, and implementation guides."
    },
    {
      icon: Rocket,
      number: 3,
      title: "Start Building",
      description: "Export your blueprint as starter code, documentation, or project roadmap. Begin development with confidence and clarity."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How <span className="text-blueprint-500">Applifique</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From concept to blueprint in three simple steps. Our AI-powered process turns your app idea into a structured development plan.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection lines */}
          <div className="hidden lg:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blueprint-100 via-blueprint-500 to-blueprint-100 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-8">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-24 h-24 bg-gradient-to-br from-blueprint-500 to-blueprint-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all"
                  >
                    <step.icon className="text-white w-10 h-10" />
                  </motion.div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-technical-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">
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
