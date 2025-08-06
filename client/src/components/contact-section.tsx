import { motion } from "framer-motion";
import { useEffect } from "react";

export default function ContactSection() {
  useEffect(() => {
    // Check if MailerLite script has loaded and initialized embedded forms
    const initializeMailerLite = () => {
      if (typeof window.ml !== 'undefined') {
        // Wait a bit for MailerLite to scan and replace embedded forms
        setTimeout(() => {
          const embeddedDiv = document.querySelector('[data-form="VwNvZ7"]');
          if (embeddedDiv && embeddedDiv.innerHTML.includes('ml-email-fallback')) {
            console.log('MailerLite form not loaded, using fallback');
          }
        }, 2000);
      }
    };

    initializeMailerLite();
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
                <div 
                  dangerouslySetInnerHTML={{
                    __html: `
                      <style type="text/css">@import url("https://assets.mlcdn.com/fonts.css?version=1754385");</style>
                      <style type="text/css">
                        #mlb2-29181350.ml-form-embedContainer {
                          box-sizing: border-box;
                          display: table;
                          margin: 0 auto;
                          position: static;
                          width: 100% !important;
                        }
                        #mlb2-29181350.ml-form-embedContainer .ml-form-embedWrapper {
                          background-color: transparent;
                          border-width: 0px;
                          border-color: transparent;
                          border-radius: 4px;
                          border-style: solid;
                          box-sizing: border-box;
                          display: inline-block !important;
                          margin: 0;
                          padding: 0;
                          position: relative;
                        }
                        #mlb2-29181350.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody {
                          padding: 0;
                        }
                        #mlb2-29181350.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input {
                          background-color: transparent !important;
                          color: #ffffff !important;
                          border-color: #555555;
                          border-radius: 0 !important;
                          border-style: solid !important;
                          border-width: 0 0 1px 0 !important;
                          font-family: 'Inter', Arial, Helvetica, sans-serif;
                          font-size: 16px !important;
                          font-weight: 300;
                          height: auto;
                          line-height: 21px !important;
                          margin-bottom: 20px;
                          margin-top: 0;
                          margin-left: 0;
                          margin-right: 0;
                          padding: 12px 0 !important;
                          width: 100% !important;
                          box-sizing: border-box !important;
                        }
                        #mlb2-29181350.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input:focus {
                          border-color: #ffffff !important;
                          outline: none;
                        }
                        #mlb2-29181350.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input::placeholder {
                          color: #555555 !important;
                        }
                        #mlb2-29181350.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit {
                          margin: 20px 0 0 0;
                        }
                        #mlb2-29181350.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button {
                          background-color: #ffffff !important;
                          color: #000000 !important;
                          border: 1px solid #ffffff !important;
                          border-radius: 0 !important;
                          font-family: 'Inter', Arial, Helvetica, sans-serif !important;
                          font-size: 16px !important;
                          font-weight: 300 !important;
                          height: auto !important;
                          line-height: 21px !important;
                          padding: 12px 32px !important;
                          width: 100% !important;
                          cursor: pointer;
                          transition: all 0.3s ease;
                        }
                        #mlb2-29181350.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button:hover {
                          background-color: #f5f5f5 !important;
                        }
                      </style>
                      
                      <div id="mlb2-29181350" class="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-29181350">
                        <div class="ml-form-align-center">
                          <div class="ml-form-embedWrapper embedForm">
                            <div class="ml-form-embedBody ml-form-embedBodyDefault row-form">
                              <div class="ml-form-embedContent"></div>
                              <form class="ml-block-form" action="https://assets.mailerlite.com/jsonp/1711800/forms/109434002103779154/subscribe" data-code="" method="post" target="_blank">
                                <div class="ml-form-formContent">
                                  <div class="ml-form-fieldRow">
                                    <div class="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                                      <input type="email" class="form-control" data-inputmask="" name="fields[email]" placeholder="Enter your email address" autocomplete="email">
                                    </div>
                                  </div>
                                </div>
                                <input type="hidden" name="ml-submit" value="1">
                                <div class="ml-form-embedSubmit">
                                  <button type="submit" class="primary">Join Waitlist</button>
                                  <button disabled="disabled" style="display:none" type="submit" class="loading"> <div class="ml-form-embedSubmitLoad"></div> <span class="sr-only">Loading...</span> </button>
                                </div>
                              </form>
                            </div>
                            <div class="ml-form-successBody row-success" style="display:none">
                              <div class="ml-form-successContent">
                                <h4>Thank you!</h4>
                                <p>You have successfully joined our subscriber list.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    `
                  }}
                />
                
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
