// app/components/ui/capabilities.js
'use client';

import React from 'react';
import {
  Bot,
  Cloud,
  Lightbulb,
  Zap,
  Shield,
  Settings,
  TrendingUp,
  Rocket
} from 'lucide-react';

const FlipCard = ({ item, index }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);
  
  // Toggle flip state on mobile tap with better touch handling
  const handleCardTap = (e) => {
    // Only handle touch events on mobile
    if (window.innerWidth >= 768) return;
    
    // Prevent double-tap zoom
    e.preventDefault();
    
    // Toggle flip state
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`group h-48 sm:h-44 md:h-52 touch-pan-y select-none ${isFlipped ? 'flipped' : ''}`}
      onClick={handleCardTap}
      onTouchStart={(e) => e.currentTarget.classList.add('active-tap')}
      onTouchEnd={(e) => e.currentTarget.classList.remove('active-tap')}
      style={{ perspective: '1000px' }}
    >
      <div 
        className={`relative h-full w-full transition-all duration-500 sm:duration-700 transform-gpu`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped || (window.innerWidth >= 768) ? 
            (isFlipped ? 'rotateY(180deg)' : '') : '',
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Front of card */}
        <div 
          className="absolute inset-0 h-full w-full rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="h-full bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center space-y-1 sm:space-y-2 md:space-y-4 shadow-lg hover:shadow-2xl transition-all duration-300 relative">
            {/* Decorative gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-transparent to-pink-50 opacity-50"></div>
            
            {/* Mobile touch hint */}
            <div className="absolute top-2 right-2 sm:hidden text-xs text-gray-400">
              Tap to flip
            </div>
            
            {/* Icon container with animation */}
            <div className="relative z-10 p-1.5 sm:p-1.5 md:p-2 bg-red-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <div className="text-white">
                {React.cloneElement(item.icon, { className: "w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10" })}
              </div>
            </div>
            
            {/* Title with gradient text on hover */}
            <h2 className="relative z-10 text-sm sm:text-sm md:text-lg font-bold text-gray-800 text-center leading-tight px-1 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-pink-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2 w-full max-w-[200px] mx-auto break-words">
              {item.title}
            </h2>
          </div>
        </div>
        
        {/* Back of card */}
        <div 
          className="absolute inset-0 h-full w-full rounded-2xl overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="h-full bg-red-500 rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col items-center justify-start shadow-xl relative overflow-hidden">
            {/* Close button for mobile */}
            <button 
              className="absolute top-2 right-2 sm:hidden text-white text-sm bg-black/20 rounded-full w-6 h-6 flex items-center justify-center z-20"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
            >
              ✕
            </button>
            
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse delay-300"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 text-center w-full h-full flex flex-col justify-center overflow-y-auto p-1">
              <div className="mb-1 sm:mb-2 p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-lg inline-block mx-auto flex-shrink-0">
                <div className="text-white">
                  {React.cloneElement(item.icon, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4" })}
                </div>
              </div>
              <p className="text-white text-[11px] sm:text-[15.5px] leading-tight font-medium px-1 flex-grow overflow-y-auto hide-scrollbar max-w-[210px] mx-auto">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced styles for mobile compatibility */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
          -webkit-perspective: 1000px;
        }
        
        .transform-gpu {
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          will-change: transform;
        }
        
        @media (max-width: 767px) {
          .group {
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            touch-action: manipulation;
          }
          
          .group .transform-gpu {
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            -webkit-transition: -webkit-transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .flipped .transform-gpu {
            transform: rotateY(180deg) !important;
            -webkit-transform: rotateY(180deg) !important;
          }
          
          .active-tap {
            transform: scale(0.98);
            -webkit-transform: scale(0.98);
          }
          
          /* Ensure cards are visible on mobile */
          .group > div {
            opacity: 1 !important;
            visibility: visible !important;
          }
          
          /* Custom scrollbar for better mobile experience */
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          /* Prevent text selection on tap */
          * {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
        }
        
        @media (min-width: 768px) {
          .group:hover .transform-gpu {
            transform: rotateY(180deg);
            -webkit-transform: rotateY(180deg);
          }
        }
      `}</style>
    </div>
  );
};

const Capabilities = () => {
  const services = [
    {
      title: "AI-Powered Solutions",
      description: "Leverage cutting-edge artificial intelligence and machine learning to automate and enhance your business processes.",
      icon: <Bot />
    },
    {
      title: "Cloud Architecture",
      description: "Build scalable, flexible cloud infrastructure that enables digital transformation and supports your growing business needs.",
      icon: <Cloud />
    },
    {
      title: "Digital Innovation",
      description: "Create breakthrough digital experiences using emerging technologies and innovative approaches to solve complex business challenges.",
      icon: <Lightbulb />
    },
    {
      title: "Agile Delivery",
      description: "Employ modern agile methodologies to deliver solutions faster, with greater flexibility and continuous improvement cycles.",
      icon: <Rocket />
    },
    {
      title: "Cybersecurity",
      description: "Protect your digital assets with advanced security measures, threat detection, and comprehensive risk management strategies.",
      icon: <Shield />
    },
    {
      title: "Sales and Distribution",
      description: "Providing the agility to adapt to market changes and scale your sales and distribution channels for rapid growth.",
      icon: <Settings />
    },
    {
      title: "Smart Automation",
      description: "Streamline operations with intelligent process automation, RPA, and workflow optimization solutions.",
      icon: <Zap />
    },
    {
      title: "Strategic Growth",
      description: "Partner with us for long-term success with strategic planning, continuous optimization, and innovation roadmapping.",
      icon: <TrendingUp />
    }
  ];

  return (
    <div className="min-h-* py-6 sm:py-12 md:py-20 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-16 px-2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            <span className="text-black">Our </span>
            <span className="text-red-500">Capabilities</span>
            <svg className="mx-auto my-0" style={{marginTop: '4px'}} width="190" height="18" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 18 Q 70 8, 170 14" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" fill="none"/>
              <path d="M25 21 Q 100 15, 160 18" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transforming Business Through Expert SAP Implementation and Digital Solutions
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Modified grid layout: Mobile 2 columns, Tablet 2 columns, Desktop 3-4 columns */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 px-2 sm:px-0">
            {services.map((item, index) => (
              <FlipCard key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Capabilities;
