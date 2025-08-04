import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function NewInteractiveDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return;

    // Create master timeline
    const masterTL = gsap.timeline({ paused: true });

    // Initial state: hide all elements
    gsap.set([
      ".chat-message",
      ".subgraph-box",
      ".component-box", 
      ".connector-line",
      ".node-text"
    ], { opacity: 0 });

    // Set initial state for connector lines
    gsap.set(".connector-line", { strokeDashoffset: 100 });

    // STEP 1: First Request & Core Structure
    masterTL
      .to("#chat-user-1", { opacity: 1, duration: 0.5 })
      .to("#chat-user-1 .typing-text", { 
        text: "Let's build an e-commerce site.",
        duration: 1.5,
        ease: "none"
      }, ">")
      .to([
        "#subgraph-app-core", 
        "#subgraph-ui-components", 
        "#subgraph-backend-api", 
        "#subgraph-database"
      ], {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
      }, ">+0.5")
      .to("#box-App", { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }, ">")

    // STEP 2: First AI Response & Initial Connections
    masterTL
      .to("#chat-ai-1", { opacity: 1, duration: 0.5 }, ">+0.5")
      .to("#chat-ai-1 .typing-text", {
        text: "Great. I've laid out the core structure. What's next?",
        duration: 2,
        ease: "none"
      }, ">")
      .to([
        "#line-App-UI",
        "#line-App-Backend", 
        "#line-App-Database"
      ], {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out"
      }, ">+0.3")

    // STEP 3: Payment System Request & Implementation
    masterTL
      .to("#chat-user-2", { opacity: 1, duration: 0.5 }, ">+1")
      .to("#chat-user-2 .typing-text", {
        text: "We need a payment system. Let's use Stripe.",
        duration: 2,
        ease: "none"
      }, ">")
      .to("#chat-ai-2", { opacity: 1, duration: 0.5 }, ">+0.5")
      .to("#chat-ai-2 .typing-text", {
        text: "Understood. Integrating Stripe.",
        duration: 1.5,
        ease: "none"
      }, ">")
      .to([
        "#subgraph-services",
        "#box-StripeService",
        "#box-CheckoutForm",
        "#box-OrdersAPI"
      ], {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
      }, ">+0.3")
      .to([
        "#line-CheckoutForm-StripeService",
        "#line-StripeService-OrdersAPI"
      ], {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out"
      }, ">")

    // STEP 4: AI Chatbot Request & Implementation
    masterTL
      .to("#chat-user-3", { opacity: 1, duration: 0.5 }, ">+1")
      .to("#chat-user-3 .typing-text", {
        text: "Also, add an AI-powered chatbot for customer support.",
        duration: 2.5,
        ease: "none"
      }, ">")
      .to("#chat-ai-3", { opacity: 1, duration: 0.5 }, ">+0.5")
      .to("#chat-ai-3 .typing-text", {
        text: "Excellent idea. Adding the Gemini-powered chat module.",
        duration: 2,
        ease: "none"
      }, ">")
      .to([
        "#box-GeminiService",
        "#box-AIChatWidget",
        "#box-ChatAPI"
      ], {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
      }, ">+0.3")
      .to([
        "#line-AIChatWidget-GeminiService",
        "#line-GeminiService-ChatAPI"
      ], {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out"
      }, ">")

    // STEP 5: Remaining Components & Finale
    masterTL
      .to([
        "#box-ProductGrid",
        "#box-ShoppingCart",
        "#box-AuthAPI",
        "#box-ProductsAPI",
        "#box-UsersTable",
        "#box-ProductsTable",
        "#box-OrdersTable"
      ], {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, ">+0.5")
      .to([
        "#line-App-ProductGrid",
        "#line-App-ShoppingCart",
        "#line-ProductsAPI-ProductsTable",
        "#line-OrdersAPI-OrdersTable",
        "#line-AuthAPI-UsersTable"
      ], {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      }, ">")
      .to("#chat-ai-4", { opacity: 1, duration: 0.5 }, ">+1")
      .to("#chat-ai-4 .typing-text", {
        text: "Your initial architecture is complete.",
        duration: 1.5,
        ease: "none"
      }, ">")

    // ScrollTrigger
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "restart pause resume pause",
      onEnter: () => masterTL.restart(),
      onEnterBack: () => masterTL.restart(),
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

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
            Watch as an e-commerce application takes shape through intelligent architectural planning.
          </p>
        </motion.div>

        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Chat Panel */}
          <div className="bg-elegant-charcoal rounded-none border border-elegant-gray overflow-hidden">
            <div className="bg-elegant-black text-elegant-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold">Applifique AI Assistant</span>
                  <div className="text-xs opacity-90">Online • Building architecture...</div>
                </div>
              </div>
            </div>
            
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              
              {/* User Message 1 */}
              <div id="chat-user-1" className="chat-message flex justify-end">
                <div className="bg-blueprint-500 text-white px-4 py-3 rounded-2xl rounded-br-lg max-w-xs">
                  <p className="text-sm typing-text"></p>
                </div>
              </div>

              {/* AI Message 1 */}
              <div id="chat-ai-1" className="chat-message flex items-start space-x-3">
                <div className="w-8 h-8 bg-blueprint-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="text-blueprint-500 w-4 h-4" />
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-lg max-w-md">
                  <p className="text-sm text-gray-800 typing-text"></p>
                </div>
              </div>

              {/* User Message 2 */}
              <div id="chat-user-2" className="chat-message flex justify-end">
                <div className="bg-blueprint-500 text-white px-4 py-3 rounded-2xl rounded-br-lg max-w-xs">
                  <p className="text-sm typing-text"></p>
                </div>
              </div>

              {/* AI Message 2 */}
              <div id="chat-ai-2" className="chat-message flex items-start space-x-3">
                <div className="w-8 h-8 bg-blueprint-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="text-blueprint-500 w-4 h-4" />
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-lg max-w-md">
                  <p className="text-sm text-gray-800 typing-text"></p>
                </div>
              </div>

              {/* User Message 3 */}
              <div id="chat-user-3" className="chat-message flex justify-end">
                <div className="bg-blueprint-500 text-white px-4 py-3 rounded-2xl rounded-br-lg max-w-xs">
                  <p className="text-sm typing-text"></p>
                </div>
              </div>

              {/* AI Message 3 */}
              <div id="chat-ai-3" className="chat-message flex items-start space-x-3">
                <div className="w-8 h-8 bg-blueprint-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="text-blueprint-500 w-4 h-4" />
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-lg max-w-md">
                  <p className="text-sm text-gray-800 typing-text"></p>
                </div>
              </div>

              {/* Final AI Message */}
              <div id="chat-ai-4" className="chat-message flex items-start space-x-3">
                <div className="w-8 h-8 bg-blueprint-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="text-blueprint-500 w-4 h-4" />
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-lg max-w-md">
                  <p className="text-sm text-gray-800 typing-text"></p>
                </div>
              </div>

            </div>
          </div>

          {/* Blueprint Panel */}
          <div className="bg-elegant-charcoal rounded-none border border-elegant-gray p-8 overflow-hidden">
            <div className="text-center mb-8">
              <h3 className="text-xl font-light text-elegant-white mb-4">E-commerce Architecture</h3>
              <p className="text-sm text-elegant-light-gray font-light">
                Real-time blueprint generation in progress
              </p>
            </div>
            
            <svg
              ref={svgRef}
              viewBox="0 0 900 700"
              className="w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Definitions */}
              <defs>
                <linearGradient id="subgraphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0066CC" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#0066CC" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="componentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#F8FAFC" stopOpacity="1" />
                </linearGradient>
              </defs>

              {/* App Core Subgraph */}
              <rect
                id="subgraph-app-core"
                className="subgraph-box"
                x="50"
                y="50"
                width="120"
                height="100"
                rx="12"
                fill="url(#subgraphGradient)"
                stroke="#0066CC"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0"
                transform="scale(0.8)"
              />
              <text className="node-text" x="110" y="75" textAnchor="middle" fontSize="12" fontWeight="600" fill="#FFFFFF" opacity="0">
                App Core
              </text>
              <rect id="box-App" className="component-box" x="70" y="90" width="60" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" opacity="0" transform="scale(0.8)" />
              <text className="node-text" x="100" y="109" textAnchor="middle" fontSize="10" fill="#333" opacity="0">App</text>

              {/* UI Components Subgraph */}
              <rect
                id="subgraph-ui-components"
                className="subgraph-box"
                x="220"
                y="50"
                width="200"
                height="180"
                rx="12"
                fill="url(#subgraphGradient)"
                stroke="#0066CC"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0"
                transform="scale(0.8)"
              />
              <text className="node-text" x="320" y="75" textAnchor="middle" fontSize="12" fontWeight="600" fill="#FFFFFF" opacity="0">
                UI Components
              </text>
              <rect id="box-ProductGrid" className="component-box" x="240" y="90" width="70" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" opacity="0" transform="scale(0.8)" />
              <text className="node-text" x="275" y="109" textAnchor="middle" fontSize="9" fill="#333" opacity="0">ProductGrid</text>
              
              <rect id="box-ShoppingCart" className="component-box" x="240" y="130" width="70" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" opacity="0" transform="scale(0.8)" />
              <text className="node-text" x="275" y="149" textAnchor="middle" fontSize="9" fill="#333" opacity="0">ShoppingCart</text>
              
              <rect id="box-CheckoutForm" className="component-box" x="320" y="90" width="80" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" opacity="0" transform="scale(0.8)" />
              <text className="node-text" x="360" y="109" textAnchor="middle" fontSize="9" fill="#333" opacity="0">CheckoutForm</text>
              
              <rect id="box-AIChatWidget" className="component-box" x="320" y="130" width="80" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" opacity="0" transform="scale(0.8)" />
              <text className="node-text" x="360" y="149" textAnchor="middle" fontSize="9" fill="#333" opacity="0">AIChatWidget</text>

              {/* Services Subgraph */}
              <rect
                id="subgraph-services"
                className="subgraph-box"
                x="480"
                y="50"
                width="160"
                height="120"
                rx="12"
                fill="url(#subgraphGradient)"
                stroke="#0066CC"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0"
                transform="scale(0.8)"
              />
              <text className="node-text" x="560" y="75" textAnchor="middle" fontSize="12" fontWeight="600" fill="#FFFFFF" opacity="0">
                Services
              </text>
              <rect id="box-StripeService" className="component-box" x="500" y="90" width="70" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" opacity="0" transform="scale(0.8)" />
              <text className="node-text" x="535" y="109" textAnchor="middle" fontSize="9" fill="#333" opacity="0">StripeService</text>
              
              <rect id="box-GeminiService" className="component-box" x="500" y="130" width="70" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" opacity="0" transform="scale(0.8)" />
              <text className="node-text" x="535" y="149" textAnchor="middle" fontSize="9" fill="#333" opacity="0">GeminiService</text>

              {/* Backend API Subgraph */}
              <rect
                id="subgraph-backend-api"
                className="subgraph-box"
                x="50"
                y="280"
                width="240"
                height="140"
                rx="12"
                fill="url(#subgraphGradient)"
                stroke="#0066CC"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0"
                transform="scale(0.8)"
              />
              <text className="node-text" x="170" y="305" textAnchor="middle" fontSize="12" fontWeight="600" fill="#FFFFFF" opacity="0">
                Backend API
              </text>
              <rect id="box-AuthAPI" className="component-box" x="70" y="320" width="60" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" opacity="0" transform="scale(0.8)" />
              <text className="node-text" x="100" y="339" textAnchor="middle" fontSize="9" fill="#333" opacity="0">AuthAPI</text>
              
              <rect id="box-ProductsAPI" className="component-box" x="140" y="320" width="70" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" opacity="0" transform="scale(0.8)" />
              <text className="node-text" x="175" y="339" textAnchor="middle" fontSize="9" fill="#333" opacity="0">ProductsAPI</text>
              
              <rect id="box-OrdersAPI" className="component-box" x="220" y="320" width="60" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" opacity="0" transform="scale(0.8)" />
              <text className="node-text" x="250" y="339" textAnchor="middle" fontSize="9" fill="#333" opacity="0">OrdersAPI</text>
              
              <rect id="box-ChatAPI" className="component-box" x="140" y="360" width="60" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" opacity="0" transform="scale(0.8)" />
              <text className="node-text" x="170" y="379" textAnchor="middle" fontSize="9" fill="#333" opacity="0">ChatAPI</text>

              {/* Database Subgraph */}
              <rect
                id="subgraph-database"
                className="subgraph-box"
                x="350"
                y="480"
                width="240"
                height="140"
                rx="12"
                fill="url(#subgraphGradient)"
                stroke="#0066CC"
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0"
                transform="scale(0.8)"
              />
              <text className="node-text" x="470" y="505" textAnchor="middle" fontSize="12" fontWeight="600" fill="#FFFFFF" opacity="0">
                Database
              </text>
              <rect id="box-UsersTable" className="component-box" x="370" y="520" width="70" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" opacity="0" transform="scale(0.8)" />
              <text className="node-text" x="405" y="539" textAnchor="middle" fontSize="9" fill="#333" opacity="0">UsersTable</text>
              
              <rect id="box-ProductsTable" className="component-box" x="450" y="520" width="70" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" opacity="0" transform="scale(0.8)" />
              <text className="node-text" x="485" y="539" textAnchor="middle" fontSize="9" fill="#333" opacity="0">ProductsTable</text>
              
              <rect id="box-OrdersTable" className="component-box" x="370" y="560" width="70" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" opacity="0" transform="scale(0.8)" />
              <text className="node-text" x="405" y="579" textAnchor="middle" fontSize="9" fill="#333" opacity="0">OrdersTable</text>

              {/* Connector Lines */}
              <line id="line-App-UI" className="connector-line" x1="130" y1="105" x2="220" y2="140" stroke="#0066CC" strokeWidth="3" opacity="0" strokeDasharray="10 5" strokeLinejoin="round" strokeLinecap="round" />
              <line id="line-App-Backend" className="connector-line" x1="100" y1="120" x2="170" y2="280" stroke="#0066CC" strokeWidth="3" opacity="0" strokeDasharray="10 5" strokeLinejoin="round" strokeLinecap="round" />
              <line id="line-App-Database" className="connector-line" x1="130" y1="120" x2="470" y2="480" stroke="#0066CC" strokeWidth="3" opacity="0" strokeDasharray="10 5" strokeLinejoin="round" strokeLinecap="round" />
              
              <line id="line-CheckoutForm-StripeService" className="connector-line" x1="400" y1="105" x2="500" y2="105" stroke="#0066CC" strokeWidth="3" opacity="0" strokeDasharray="10 5" strokeLinejoin="round" strokeLinecap="round" />
              <line id="line-StripeService-OrdersAPI" className="connector-line" x1="535" y1="120" x2="250" y2="320" stroke="#0066CC" strokeWidth="3" opacity="0" strokeDasharray="10 5" strokeLinejoin="round" strokeLinecap="round" />
              
              <line id="line-AIChatWidget-GeminiService" className="connector-line" x1="400" y1="145" x2="500" y2="145" stroke="#0066CC" strokeWidth="3" opacity="0" strokeDasharray="10 5" strokeLinejoin="round" strokeLinecap="round" />
              <line id="line-GeminiService-ChatAPI" className="connector-line" x1="535" y1="160" x2="170" y2="360" stroke="#0066CC" strokeWidth="3" opacity="0" strokeDasharray="10 5" strokeLinejoin="round" strokeLinecap="round" />
              
              <line id="line-App-ProductGrid" className="connector-line" x1="130" y1="105" x2="240" y2="105" stroke="#0066CC" strokeWidth="3" opacity="0" strokeDasharray="10 5" strokeLinejoin="round" strokeLinecap="round" />
              <line id="line-App-ShoppingCart" className="connector-line" x1="130" y1="105" x2="240" y2="145" stroke="#0066CC" strokeWidth="3" opacity="0" strokeDasharray="10 5" strokeLinejoin="round" strokeLinecap="round" />
              
              <line id="line-ProductsAPI-ProductsTable" className="connector-line" x1="175" y1="350" x2="485" y2="520" stroke="#0066CC" strokeWidth="3" opacity="0" strokeDasharray="10 5" strokeLinejoin="round" strokeLinecap="round" />
              <line id="line-OrdersAPI-OrdersTable" className="connector-line" x1="250" y1="350" x2="405" y2="560" stroke="#0066CC" strokeWidth="3" opacity="0" strokeDasharray="10 5" strokeLinejoin="round" strokeLinecap="round" />
              <line id="line-AuthAPI-UsersTable" className="connector-line" x1="100" y1="350" x2="405" y2="520" stroke="#0066CC" strokeWidth="3" opacity="0" strokeDasharray="10 5" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}