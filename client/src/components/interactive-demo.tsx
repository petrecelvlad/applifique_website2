import { useState, useEffect, useRef } from "react";

export default function InteractiveDemo() {
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, type: 'user' | 'ai', text: string}>>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const show = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.add('visible');
    }
  };
  
  const draw = (elementId: string) => {
    const element = document.getElementById(elementId) as SVGPathElement;
    if (element) {
      const length = element.getTotalLength();
      element.style.strokeDasharray = `${length}`;
      element.style.strokeDashoffset = `${length}`;
      // Force reflow to apply initial state before transition
      element.getBoundingClientRect();
      element.classList.add('drawn');
    }
  };

  const typeMessage = async (msgConfig: {type: 'user' | 'ai', text: string}) => {
    const messageId = `msg-${Date.now()}`;
    
    // Add message placeholder
    setChatMessages(prev => [...prev, {
      id: messageId,
      type: msgConfig.type,
      text: ''
    }]);

    // Scroll to bottom
    setTimeout(() => {
      if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
      }
    }, 100);

    // Type out the message character by character
    for (let i = 0; i <= msgConfig.text.length; i++) {
      setChatMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, text: msgConfig.text.slice(0, i) }
          : msg
      ));
      await delay(30);
    }

    // Scroll to bottom after typing
    setTimeout(() => {
      if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
      }
    }, 100);
  };

  const runAnimation = async () => {
    // Initialize all SVG lines for drawing animation
    const allLines = document.querySelectorAll('.svg-line') as NodeListOf<SVGPathElement>;
    allLines.forEach(line => {
      const length = line.getTotalLength();
      line.style.strokeDasharray = `${length}`;
      line.style.strokeDashoffset = `${length}`;
    });

    // Step 1: First Request
    await typeMessage({ type: 'user', text: "Let's build an e-commerce site." });
    await delay(500);
    show('subgraph-AppCore');
    await delay(200);
    show('node-App');
    await delay(500);
    show('subgraph-UIComponents');
    show('subgraph-BackendAPI');
    show('subgraph-Database');
    await delay(1000);

    // Step 2: First AI Response & Build
    await typeMessage({ type: 'ai', text: "Great. I've laid out the core structure. What's next?" });
    await delay(500);
    show('node-ProductGrid');
    show('node-ShoppingCart');
    show('node-AuthAPI');
    show('node-ProductsAPI');
    show('node-UsersTable');
    show('node-ProductsTable');
    await delay(500);
    draw('line-App-ProductGrid');
    draw('line-App-ShoppingCart');
    await delay(200);
    draw('line-AuthAPI-UsersTable');
    await delay(200);
    draw('line-ProductsAPI-ProductsTable');
    await delay(1500);

    // Step 3: Payment System Request
    await typeMessage({ type: 'user', text: "We need a payment system. Let's use Stripe." });
    await delay(500);
    await typeMessage({ type: 'ai', text: "Understood. Integrating Stripe." });
    await delay(500);
    show('subgraph-Services');
    await delay(300);
    show('node-StripeService');
    show('node-CheckoutForm');
    show('node-OrdersAPI');
    show('node-OrdersTable');
    await delay(500);
    draw('line-App-CheckoutForm');
    await delay(200);
    draw('line-CheckoutForm-StripeService');
    await delay(200);
    draw('line-StripeService-OrdersAPI');
    await delay(200);
    draw('line-OrdersAPI-OrdersTable');
    await delay(1500);

    // Step 4: AI Chatbot Request
    await typeMessage({ type: 'user', text: "Also, add an AI-powered chatbot for customer support." });
    await delay(500);
    await typeMessage({ type: 'ai', text: "Excellent idea. Adding the Gemini-powered chat module." });
    await delay(500);
    show('node-GeminiService');
    show('node-AIChatWidget');
    show('node-ChatAPI');
    await delay(500);
    draw('line-App-AIChatWidget');
    await delay(200);
    draw('line-AIChatWidget-GeminiService');
    await delay(200);
    draw('line-GeminiService-ChatAPI');
    await delay(1500);

    // Step 5: Finale
    await typeMessage({ type: 'ai', text: "Your initial architecture is complete." });
  };

  const startDemo = () => {
    setIsAnimationStarted(true);
    runAnimation();
  };

  return (
    <section id="demo" className="w-full h-full flex items-center justify-center bg-transparent py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl heading-primary mb-8">
            Architecture in Motion
          </h2>
          <div className="w-24 h-px bg-elegant-black mx-auto mb-8"></div>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Experience the precision of automated blueprint generation through intelligent architectural planning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Chat Panel */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-6 py-4 bg-black text-white font-bold text-center">
              Applifique AI
            </div>
            <div 
              ref={chatMessagesRef}
              className="h-96 p-6 overflow-y-auto flex flex-col gap-4"
            >
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-bubble visible ${message.type === 'user' ? 'user' : 'ai'}`}
                >
                  <div className="avatar">
                    {message.type === 'user' ? '👤' : '🤖'}
                  </div>
                  <div className="text-content">
                    {message.text}
                    {message.text.length === 0 && <span className="typing-cursor"></span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blueprint Panel */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl relative">
            {!isAnimationStarted && (
              <button
                onClick={startDemo}
                className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-4 text-xl bg-blue-600 text-white border-none rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 hover:bg-blue-700"
              >
                ▶️ Start Demo
              </button>
            )}
            
            <div className="p-4 h-96">
              <svg
                ref={svgRef}
                viewBox="0 0 800 1000"
                className="w-full h-full"
              >
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#000000" />
                  </marker>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(200, 200, 200, 0.5)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Subgraph Containers */}
                <g id="subgraph-AppCore" className="svg-anim">
                  <text x="400" y="25" className="subgraph-text">App Core</text>
                </g>
                <g id="subgraph-UIComponents" className="svg-anim">
                  <rect x="25" y="145" width="750" height="120" rx="10" className="subgraph-rect"/>
                  <text x="400" y="130" className="subgraph-text">UI Components</text>
                </g>
                <g id="subgraph-Services" className="svg-anim">
                  <rect x="195" y="345" width="410" height="100" rx="10" className="subgraph-rect"/>
                  <text x="400" y="330" className="subgraph-text">Services</text>
                </g>
                <g id="subgraph-BackendAPI" className="svg-anim">
                  <rect x="25" y="525" width="750" height="120" rx="10" className="subgraph-rect"/>
                  <text x="400" y="510" className="subgraph-text">Backend API</text>
                </g>
                <g id="subgraph-Database" className="svg-anim">
                  <rect x="25" y="745" width="750" height="100" rx="10" className="subgraph-rect"/>
                  <text x="400" y="730" className="subgraph-text">Database</text>
                </g>

                {/* Nodes */}
                <g id="node-App" className="svg-anim">
                  <rect x="350" y="50" width="100" height="40" rx="5" className="node-rect"/>
                  <text x="400" y="70" className="node-text">App</text>
                </g>
                <g id="node-ProductGrid" className="svg-anim">
                  <rect x="50" y="180" width="120" height="50" rx="5" className="node-rect"/>
                  <text x="110" y="205" className="node-text">ProductGrid</text>
                </g>
                <g id="node-ShoppingCart" className="svg-anim">
                  <rect x="220" y="180" width="120" height="50" rx="5" className="node-rect"/>
                  <text x="280" y="205" className="node-text">ShoppingCart</text>
                </g>
                <g id="node-CheckoutForm" className="svg-anim">
                  <rect x="460" y="180" width="120" height="50" rx="5" className="node-rect"/>
                  <text x="520" y="205" className="node-text">CheckoutForm</text>
                </g>
                <g id="node-AIChatWidget" className="svg-anim">
                  <rect x="630" y="180" width="120" height="50" rx="5" className="node-rect"/>
                  <text x="690" y="205" className="node-text">AIChatWidget</text>
                </g>
                <g id="node-StripeService" className="svg-anim">
                  <rect x="220" y="380" width="120" height="50" rx="5" className="node-rect"/>
                  <text x="280" y="405" className="node-text">StripeService</text>
                </g>
                <g id="node-GeminiService" className="svg-anim">
                  <rect x="460" y="380" width="120" height="50" rx="5" className="node-rect"/>
                  <text x="520" y="405" className="node-text">GeminiService</text>
                </g>
                <g id="node-AuthAPI" className="svg-anim">
                  <rect x="50" y="560" width="120" height="50" rx="5" className="node-rect"/>
                  <text x="110" y="585" className="node-text">AuthAPI</text>
                </g>
                <g id="node-ProductsAPI" className="svg-anim">
                  <rect x="260" y="560" width="120" height="50" rx="5" className="node-rect"/>
                  <text x="320" y="585" className="node-text">ProductsAPI</text>
                </g>
                <g id="node-OrdersAPI" className="svg-anim">
                  <rect x="420" y="560" width="120" height="50" rx="5" className="node-rect"/>
                  <text x="480" y="585" className="node-text">OrdersAPI</text>
                </g>
                <g id="node-ChatAPI" className="svg-anim">
                  <rect x="630" y="560" width="120" height="50" rx="5" className="node-rect"/>
                  <text x="690" y="585" className="node-text">ChatAPI</text>
                </g>
                <g id="node-UsersTable" className="svg-anim">
                  <rect x="50" y="780" width="120" height="50" rx="5" className="node-rect"/>
                  <text x="110" y="805" className="node-text">UsersTable</text>
                </g>
                <g id="node-ProductsTable" className="svg-anim">
                  <rect x="260" y="780" width="120" height="50" rx="5" className="node-rect"/>
                  <text x="320" y="805" className="node-text">ProductsTable</text>
                </g>
                <g id="node-OrdersTable" className="svg-anim">
                  <rect x="420" y="780" width="120" height="50" rx="5" className="node-rect"/>
                  <text x="480" y="805" className="node-text">OrdersTable</text>
                </g>

                {/* Connections */}
                <path id="line-App-ProductGrid" className="line-connector svg-line" d="M 370 90 L 370 120 L 110 120 L 110 170"/>
                <path id="line-App-ShoppingCart" className="line-connector svg-line" d="M 390 90 L 390 120 L 280 120 L 280 170"/>
                <path id="line-App-CheckoutForm" className="line-connector svg-line" d="M 410 90 L 410 120 L 520 120 L 520 170"/>
                <path id="line-App-AIChatWidget" className="line-connector svg-line" d="M 430 90 L 430 120 L 690 120 L 690 170"/>
                <path id="line-CheckoutForm-StripeService" className="line-connector svg-line" d="M 520 230 L 520 310 L 280 310 L 280 370"/>
                <path id="line-AIChatWidget-GeminiService" className="line-connector svg-line" d="M 690 230 L 690 310 L 520 310 L 520 370"/>
                <path id="line-StripeService-OrdersAPI" className="line-connector svg-line" d="M 280 430 L 280 490 L 480 490 L 480 550"/>
                <path id="line-GeminiService-ChatAPI" className="line-connector svg-line" d="M 520 430 L 520 490 L 690 490 L 690 550"/>
                <path id="line-AuthAPI-UsersTable" className="line-connector svg-line" d="M 110 610 L 110 770"/>
                <path id="line-ProductsAPI-ProductsTable" className="line-connector svg-line" d="M 320 610 L 320 770"/>
                <path id="line-OrdersAPI-OrdersTable" className="line-connector svg-line" d="M 480 610 L 480 770"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .chat-bubble {
          padding: 10px 15px;
          border-radius: 10px;
          max-width: 85%;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
          line-height: 1.4;
        }

        .chat-bubble.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .chat-bubble.user {
          background-color: #007BFF;
          color: white;
          align-self: flex-end;
        }

        .chat-bubble.ai {
          background-color: #D3D3D3;
          color: #333333;
          align-self: flex-start;
        }

        .chat-bubble .avatar {
          font-size: 1.5rem;
          line-height: 1;
          padding-top: 2px;
        }

        .chat-bubble .text-content {
          min-height: 1.2em;
        }

        .typing-cursor {
          display: inline-block;
          width: 8px;
          height: 1em;
          background-color: currentColor;
          animation: blink 1s step-end infinite;
          vertical-align: bottom;
        }

        @keyframes blink {
          from, to { background-color: transparent }
          50% { background-color: currentColor; }
        }

        .svg-anim {
          opacity: 0;
          transition: opacity 0.7s ease-in-out;
        }

        .svg-anim.visible {
          opacity: 1;
        }

        .svg-line {
          transition: stroke-dashoffset 1.5s ease-in-out;
        }

        .svg-line.drawn {
          stroke-dashoffset: 0 !important;
        }

        .subgraph-rect {
          stroke: #000000;
          stroke-width: 1;
          fill: rgba(0, 0, 0, 0.05);
        }

        .node-rect {
          fill: #FFFFFF;
          stroke: #000000;
          stroke-width: 1.5;
        }

        .node-text {
          fill: #000000;
          font-family: 'Helvetica', 'Arial', sans-serif;
          font-size: 12px;
          text-anchor: middle;
          dominant-baseline: middle;
        }

        .subgraph-text {
          fill: #333333;
          font-family: 'Helvetica', 'Arial', sans-serif;
          font-size: 14px;
          font-weight: bold;
          text-anchor: middle;
        }

        .line-connector {
          stroke: #000000;
          stroke-width: 1.5;
          fill: none;
          marker-end: url(#arrowhead);
        }
      `}</style>
    </section>
  );
}