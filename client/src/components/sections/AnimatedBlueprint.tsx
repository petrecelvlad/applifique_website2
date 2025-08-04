import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedBlueprint() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    // Create timeline but keep it paused initially
    const tl = gsap.timeline({ paused: true });

    // Initial state: hide all elements
    gsap.set(".subgraph-box", { opacity: 0, scale: 0.8 });
    gsap.set(".component-box", { opacity: 0, scale: 0.8 });
    gsap.set(".connector-line", { strokeDashoffset: 100, opacity: 0 });
    gsap.set(".node-text", { opacity: 0 });

    // 1. Animate subgraph containers
    tl.to(".subgraph-box", {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)"
    })
    // 2. Animate component boxes inside subgraphs
    .to(".component-box", {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)"
    }, "-=0.3")
    // 3. Draw connector lines
    .to(".connector-line", {
      opacity: 1,
      strokeDashoffset: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.2")
    // 4. Fade in text labels
    .to(".node-text", {
      opacity: 1,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.out"
    }, "-=0.4");

    // ScrollTrigger logic
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "restart pause resume pause",
      onEnter: () => tl.restart(),
      onEnterBack: () => tl.restart(),
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto">
      <svg
        ref={svgRef}
        viewBox="0 0 800 600"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Definitions for gradients and patterns */}
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
          className="subgraph-box"
          x="50"
          y="50"
          width="200"
          height="180"
          rx="12"
          fill="url(#subgraphGradient)"
          stroke="#0066CC"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        <text className="node-text" x="150" y="75" textAnchor="middle" fontSize="14" fontWeight="600" fill="#0066CC">
          App Core
        </text>

        {/* App Core Components */}
        <rect className="component-box" x="70" y="90" width="60" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" />
        <text className="node-text" x="100" y="109" textAnchor="middle" fontSize="10" fill="#333">App</text>

        <rect className="component-box" x="70" y="130" width="80" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" />
        <text className="node-text" x="110" y="149" textAnchor="middle" fontSize="10" fill="#333">GeminiService</text>

        <rect className="component-box" x="70" y="170" width="100" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" />
        <text className="node-text" x="120" y="189" textAnchor="middle" fontSize="10" fill="#333">BlueprintGenerator</text>

        <rect className="component-box" x="180" y="170" width="50" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" />
        <text className="node-text" x="205" y="189" textAnchor="middle" fontSize="10" fill="#333">types</text>

        {/* UI Components Subgraph */}
        <rect
          className="subgraph-box"
          x="300"
          y="50"
          width="220"
          height="180"
          rx="12"
          fill="url(#subgraphGradient)"
          stroke="#0066CC"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        <text className="node-text" x="410" y="75" textAnchor="middle" fontSize="14" fontWeight="600" fill="#0066CC">
          UI Components
        </text>

        {/* UI Components */}
        <rect className="component-box" x="320" y="90" width="100" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" />
        <text className="node-text" x="370" y="109" textAnchor="middle" fontSize="10" fill="#333">ConversationPanel</text>

        <rect className="component-box" x="320" y="130" width="80" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" />
        <text className="node-text" x="360" y="149" textAnchor="middle" fontSize="10" fill="#333">InspectorPanel</text>

        <rect className="component-box" x="320" y="170" width="60" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" />
        <text className="node-text" x="350" y="189" textAnchor="middle" fontSize="10" fill="#333">Canvas</text>

        {/* Canvas Subgraph */}
        <rect
          className="subgraph-box"
          x="550"
          y="50"
          width="200"
          height="180"
          rx="12"
          fill="url(#subgraphGradient)"
          stroke="#0066CC"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        <text className="node-text" x="650" y="75" textAnchor="middle" fontSize="14" fontWeight="600" fill="#0066CC">
          Canvas
        </text>

        {/* Canvas Components */}
        <rect className="component-box" x="570" y="90" width="80" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" />
        <text className="node-text" x="610" y="109" textAnchor="middle" fontSize="10" fill="#333">BlueprintPanel</text>

        <rect className="component-box" x="570" y="130" width="80" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" />
        <text className="node-text" x="610" y="149" textAnchor="middle" fontSize="10" fill="#333">MindMapPanel</text>

        <rect className="component-box" x="570" y="170" width="80" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" />
        <text className="node-text" x="610" y="189" textAnchor="middle" fontSize="10" fill="#333">PreviewPanel</text>

        {/* Services Subgraph */}
        <rect
          className="subgraph-box"
          x="120"
          y="280"
          width="160"
          height="100"
          rx="12"
          fill="url(#subgraphGradient)"
          stroke="#0066CC"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        <text className="node-text" x="200" y="305" textAnchor="middle" fontSize="14" fontWeight="600" fill="#0066CC">
          Services
        </text>

        <rect className="component-box" x="140" y="320" width="80" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" />
        <text className="node-text" x="180" y="339" textAnchor="middle" fontSize="10" fill="#333">GeminiService</text>

        {/* Internal Libraries Subgraph */}
        <rect
          className="subgraph-box"
          x="350"
          y="280"
          width="180"
          height="150"
          rx="12"
          fill="url(#subgraphGradient)"
          stroke="#0066CC"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        <text className="node-text" x="440" y="305" textAnchor="middle" fontSize="14" fontWeight="600" fill="#0066CC">
          Internal Libraries
        </text>

        <rect className="component-box" x="370" y="320" width="80" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" />
        <text className="node-text" x="410" y="339" textAnchor="middle" fontSize="10" fill="#333">BlueprintData</text>

        <rect className="component-box" x="370" y="360" width="100" height="30" rx="6" fill="url(#componentGradient)" stroke="#0066CC" strokeWidth="1" />
        <text className="node-text" x="420" y="379" textAnchor="middle" fontSize="10" fill="#333">MindMapGenerator</text>

        {/* Connector Lines */}
        {/* App to Services */}
        <line className="connector-line" x1="100" y1="120" x2="150" y2="320" stroke="#0066CC" strokeWidth="3" opacity="0.7" strokeDasharray="10 5" strokeLinejoin="round" strokeLinecap="round" />
        
        {/* App to UI Components */}
        <line className="connector-line" x1="130" y1="105" x2="320" y2="105" stroke="#0066CC" strokeWidth="3" opacity="0.7" strokeDasharray="10 5" strokeLinejoin="round" strokeLinecap="round" />
        
        {/* Canvas connections */}
        <line className="connector-line" x1="380" y1="185" x2="570" y2="105" stroke="#0066CC" strokeWidth="3" opacity="0.7" strokeDasharray="10 5" strokeLinejoin="round" strokeLinecap="round" />
        
        {/* BlueprintPanel to MindMapPanel */}
        <line className="connector-line" x1="610" y1="120" x2="610" y2="130" stroke="#0066CC" strokeWidth="3" opacity="0.7" strokeDasharray="10 5" strokeLinejoin="round" strokeLinecap="round" />
        
        {/* MindMapPanel to PreviewPanel */}
        <line className="connector-line" x1="610" y1="160" x2="610" y2="170" stroke="#0066CC" strokeWidth="3" opacity="0.7" strokeDasharray="10 5" strokeLinejoin="round" strokeLinecap="round" />
        
        {/* BlueprintGenerator connections */}
        <line className="connector-line" x1="170" y1="185" x2="370" y2="335" stroke="#0066CC" strokeWidth="3" opacity="0.7" strokeDasharray="10 5" strokeLinejoin="round" strokeLinecap="round" />
        
        {/* MindMapPanel to MindMapGenerator */}
        <line className="connector-line" x1="610" y1="160" x2="420" y2="360" stroke="#0066CC" strokeWidth="3" opacity="0.7" strokeDasharray="10 5" strokeLinejoin="round" strokeLinecap="round" />
        
        {/* GeminiService to types */}
        <line className="connector-line" x1="150" y1="145" x2="180" y2="185" stroke="#0066CC" strokeWidth="3" opacity="0.7" strokeDasharray="10 5" strokeLinejoin="round" strokeLinecap="round" />
        
        {/* Services GeminiService to types */}
        <line className="connector-line" x1="220" y1="335" x2="205" y2="200" stroke="#0066CC" strokeWidth="3" opacity="0.7" strokeDasharray="10 5" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  );
}