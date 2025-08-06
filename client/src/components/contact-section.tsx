import { motion } from "framer-motion";

export default function ContactSection() {

  const benefits = [
    "Early access to all premium features",
    "Direct feedback channel to our development team", 
    "Lifetime discount on future premium plans"
  ];

  return (
    <section id="contact" className="w-full h-full flex items-center justify-center bg-transparent">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-elegant-white border border-elegant-light-gray overflow-hidden"
        >
          <div className="lg:flex">
            {/* Content side */}
            <div className="lg:w-1/2 p-16">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl heading-primary mb-8">
                  Join the Architecture
                </h2>
                <div className="w-16 h-px bg-elegant-black mb-8"></div>
                <p className="text-lg text-secondary">
                  Be among the first to experience precision-engineered development planning.
                </p>
              </div>

              <div className="space-y-8 mb-12">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-2 h-2 bg-elegant-black mt-3 flex-shrink-0"></div>
                    <p className="text-secondary">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* MailerLite Form side */}
            <div className="lg:w-1/2 bg-elegant-black p-16 text-elegant-white">
              <div className="space-y-8">
                <div className="mb-8">
                  <h3 className="text-xl heading-primary text-elegant-white mb-4">
                    Join the Waitlist
                  </h3>
                  <p className="text-elegant-light-gray font-light">
                    Be the first to experience precision development planning.
                  </p>
                </div>
                
                {/* MailerLite Embedded Form */}
                <div className="ml-embedded" data-form="VwNvZ7"></div>
                
                <p className="text-xs text-elegant-gray text-center font-light tracking-wide mt-8">
                  Confidential and secure. No unsolicited communications.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
