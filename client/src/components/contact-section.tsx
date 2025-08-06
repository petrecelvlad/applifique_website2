import { motion } from "framer-motion";
import { useEffect } from "react";

// Declare global MailerLite
declare global {
  interface Window {
    ml: (action: string, ...args: any[]) => void;
  }
}

export default function ContactSection() {
  useEffect(() => {
    // Initialize MailerLite when component mounts
    const initializeMailerLite = () => {
      if (typeof window.ml !== 'undefined') {
        try {
          window.ml('account', '1711800');
        } catch (error) {
          console.log('MailerLite initialization:', error);
        }
      }
    };

    // Check if MailerLite is loaded, if not wait for it
    if (typeof window.ml !== 'undefined') {
      initializeMailerLite();
    } else {
      const checkForML = setInterval(() => {
        if (typeof window.ml !== 'undefined') {
          clearInterval(checkForML);
          initializeMailerLite();
        }
      }, 100);
      
      setTimeout(() => clearInterval(checkForML), 10000);
      return () => clearInterval(checkForML);
    }
  }, []);

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
                
                {/* MailerLite Form */}
                <div className="space-y-6">
                  <form 
                    action="https://app.mailerlite.com/webforms/submit/7cN6Mh" 
                    method="POST"
                    className="space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target as HTMLFormElement);
                      const email = formData.get('email') as string;
                      
                      if (email && email.includes('@')) {
                        // Submit to MailerLite
                        fetch('https://app.mailerlite.com/webforms/submit/7cN6Mh', {
                          method: 'POST',
                          body: formData,
                          mode: 'no-cors'
                        }).then(() => {
                          alert('Thank you for joining our waitlist!');
                          (e.target as HTMLFormElement).reset();
                        }).catch(() => {
                          // Fallback: Open MailerLite form in new tab
                          window.open(`https://app.mailerlite.com/webforms/landing/7cN6Mh?email=${encodeURIComponent(email)}`, '_blank');
                        });
                      }
                    }}
                  >
                    <div>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="Enter your email address"
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-elegant-gray text-elegant-white placeholder-elegant-gray focus:outline-none focus:border-elegant-white transition-colors font-light"
                        required
                      />
                    </div>
                    <input type="hidden" name="ml-submit" value="1" />
                    <button 
                      type="submit"
                      className="w-full bg-elegant-white text-elegant-black px-8 py-3 font-light tracking-wide hover:bg-elegant-light-gray transition-all border border-elegant-white"
                    >
                      Join Waitlist
                    </button>
                  </form>
                </div>
                
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
