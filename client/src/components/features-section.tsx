import { Brain, Map, Rocket, Users, GitBranch, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Planning",
      description: "Let our advanced AI analyze your app concept and generate comprehensive architectural blueprints with detailed component structures."
    },
    {
      icon: Map,
      title: "Visual Architecture",
      description: "Transform abstract ideas into clear, visual component hierarchies that your entire team can understand and build from."
    },
    {
      icon: Rocket,
      title: "Rapid Prototyping",
      description: "Generate detailed documentation, file structures, and implementation guides in minutes, not weeks."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share blueprints with stakeholders, get feedback, and iterate on your app structure before writing a single line of code."
    },
    {
      icon: GitBranch,
      title: "Version Control",
      description: "Track changes to your blueprint over time, compare versions, and maintain a clear evolution of your app architecture."
    },
    {
      icon: Download,
      title: "Export Ready",
      description: "Export your blueprints as starter code, documentation, or development roadmaps in multiple formats."
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-blueprint-500">Applifique?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stop wrestling with scattered ideas and incomplete planning. Our AI-powered blueprint system transforms chaos into clarity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl hover:border-blueprint-200 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-blueprint-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blueprint-500 transition-colors">
                <feature.icon className="text-blueprint-500 group-hover:text-white w-8 h-8 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
