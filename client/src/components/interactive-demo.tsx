import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Folder, FileText, X, Maximize, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InteractiveDemo() {
  const [foundationExpanded, setFoundationExpanded] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, type: 'user' | 'ai', content: string, typing?: boolean}>>([]);
  const [showStructurePreview, setShowStructurePreview] = useState(false);

  const fileContents = {
    'master-design': {
      title: 'Master Design Doc',
      content: `# Master Design Document - Applifique Landing Page

## 1. Project Overview
Applifique transforms complex app ideas into structured blueprints, simplifying the development planning process through AI-powered architecture generation.

## 2. Core Features
- AI-powered blueprint generation
- Visual component hierarchies  
- Team collaboration tools
- Export capabilities

## 3. Technical Architecture
- React-based frontend
- TypeScript for type safety
- Tailwind CSS for styling
- Modern component patterns`
    },
    'layout': {
      title: 'Page Layout Doc',
      content: `# Page Layout Document

## 1. Layout Philosophy
Clean, spacious design that reflects architectural blueprint concepts through structured visual hierarchy.

## 2. Section Structure
- Hero: Value proposition and CTA
- Features: Key benefits showcase
- Demo: Interactive preview
- Contact: Waitlist signup

## 3. Responsive Design
- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px
- Fluid typography scaling`
    },
    'style': {
      title: 'UI/UX Style Doc',
      content: `# UI/UX Style Guide

## 1. Color Palette
- Primary: Blueprint Blue (#0066CC)
- Secondary: Clean White (#FFFFFF)
- Accent: Technical Orange (#FF6B35)
- Neutrals: Gray scale

## 2. Typography
- Primary: Inter (clean, technical)
- Code: JetBrains Mono
- Scale: 14px to 48px

## 3. Components
- Cards with subtle shadows
- Rounded corners (8px, 12px, 16px)
- Hover states with gentle transforms`
    }
  };

  useEffect(() => {
    // Initialize chat conversation
    const initChat = async () => {
      setChatMessages([
        {
          id: '1',
          type: 'user',
          content: 'I need help planning a landing page for my blueprint builder app called "Applifique".'
        }
      ]);

      // AI response
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          id: '2',
          type: 'ai',
          content: "Sounds magnifique! I've created a foundation structure with design documents, layout specifications, and style guides.",
          typing: true
        }]);

        setTimeout(() => {
          setChatMessages(prev => prev.map(msg => 
            msg.id === '2' ? { ...msg, typing: false } : msg
          ));
          setShowStructurePreview(true);
        }, 3000);
      }, 2000);
    };

    initChat();
  }, []);

  const TypingIndicator = () => (
    <motion.div
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1, repeat: Infinity }}
      className="text-xs text-gray-400 mt-1"
    >
      ●●●
    </motion.div>
  );

  return (
    <section id="demo" className="w-full h-full flex items-center justify-center bg-transparent py-16">
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
            Experience the precision of automated blueprint generation through intelligent architectural planning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* File Tree Demo */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-elegant-charcoal rounded-none border border-elegant-gray overflow-hidden"
          >
            <div className="bg-elegant-black text-elegant-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="font-mono text-sm">Applifique Explorer</span>
              </div>
              <Maximize className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
            </div>
            
            <div className="p-6">
              <div className="font-mono text-sm space-y-2">
                {/* Root folder */}
                <div className="flex items-center space-x-2 py-1">
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                  <Folder className="w-4 h-4 text-blueprint-500" />
                  <span className="font-semibold text-gray-900">Applifique Landing Page</span>
                </div>
                
                {/* Foundation folder */}
                <div className="ml-4 space-y-2">
                  <div className="flex items-center space-x-2 py-1">
                    <button 
                      onClick={() => setFoundationExpanded(!foundationExpanded)}
                      className="text-gray-400 hover:text-blueprint-500 transition-colors"
                    >
                      {foundationExpanded ? (
                        <ChevronDown className="w-3 h-3" />
                      ) : (
                        <ChevronRight className="w-3 h-3" />
                      )}
                    </button>
                    <Folder className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-700 hover:text-blueprint-500 cursor-pointer">Foundation</span>
                  </div>
                  
                  {/* Foundation files */}
                  <AnimatePresence>
                    {foundationExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-6 space-y-1 overflow-hidden"
                      >
                        {Object.entries(fileContents).map(([key, file]) => (
                          <div
                            key={key}
                            onClick={() => setSelectedFile(key)}
                            className="flex items-center space-x-2 py-1 hover:bg-blueprint-50 rounded px-2 cursor-pointer"
                          >
                            <FileText className="w-3 h-3 text-green-500" />
                            <span className="text-gray-600 hover:text-blueprint-500">{file.title}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Other folders */}
                  <div className="flex items-center space-x-2 py-1">
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                    <Folder className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-700 hover:text-blueprint-500 cursor-pointer">Code_Files</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 py-1">
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                    <Folder className="w-4 h-4 text-purple-500" />
                    <span className="text-gray-700 hover:text-blueprint-500 cursor-pointer">Design_Docs</span>
                  </div>
                </div>
              </div>
              
              {/* File Preview Area */}
              <AnimatePresence>
                {selectedFile && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-gray-900">
                        {fileContents[selectedFile as keyof typeof fileContents].title}
                      </span>
                      <button 
                        onClick={() => setSelectedFile(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <pre className="text-sm text-gray-600 font-mono leading-relaxed max-h-64 overflow-y-auto whitespace-pre-wrap">
                      {fileContents[selectedFile as keyof typeof fileContents].content}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* AI Chat Demo */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="bg-white border-b border-gray-100 text-gray-900 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blueprint-100 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-blueprint-500" />
                </div>
                <div>
                  <span className="font-semibold">Applifique Assistant</span>
                  <div className="text-xs text-gray-600">Online • Generating blueprint...</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 bg-green-400 rounded-full"
                />
              </div>
            </div>
            
            <div className="h-80 p-4 flex flex-col justify-start overflow-hidden">
              <div className="space-y-3">
                <AnimatePresence>
                  {chatMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {message.type === 'user' ? (
                        <div className="flex justify-end">
                          <div className="bg-white border-2 border-blueprint-500 text-blueprint-700 px-4 py-3 rounded-2xl rounded-br-lg max-w-xs">
                            <p className="text-sm font-medium">{message.content}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blueprint-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <Bot className="text-blueprint-500 w-4 h-4" />
                          </div>
                          <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-lg max-w-md">
                            <p className="text-sm text-gray-800">{message.content}</p>
                            {message.typing && <TypingIndicator />}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Generated structure preview */}
                <AnimatePresence>
                  {showStructurePreview && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-8 h-8 bg-blueprint-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="text-blueprint-500 w-4 h-4" />
                      </div>
                      <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-lg max-w-md">
                        <p className="text-sm text-gray-800 mb-2">Here's the generated project structure:</p>
                        <div className="bg-white p-3 rounded border text-xs font-mono">
                          <div className="text-blueprint-500">📁 Foundation/</div>
                          <div className="ml-3 text-gray-600">📄 Master Design Doc</div>
                          <div className="ml-3 text-gray-600">📄 Page Layout Doc</div>
                          <div className="ml-3 text-gray-600">📄 UI/UX Style Doc</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Chat input */}
            <div className="border-t border-gray-100 p-4">
              <div className="flex items-center space-x-3">
                <input 
                  type="text" 
                  placeholder="Try: 'Add a pricing section to my landing page'" 
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blueprint-500 focus:border-transparent"
                  disabled
                />
                <button className="bg-blueprint-500 hover:bg-blueprint-600 text-white p-2 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
