'use client';
import React, { useState, useEffect } from 'react';
import { Phone, Mail, Facebook, MessageCircle } from 'lucide-react';

export default function ContactSection() {
  // State for client-side only components
  const [isMounted, setIsMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const text = "CONTACT US";
  const [barPos, setBarPos] = useState(0);
  const [barLeft, setBarLeft] = useState(0);
  const letterRefs = React.useRef([]);

  // Handle escape key for chat modal
  useEffect(() => {
    if (!isMounted) return;
    
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && showChat) {
        document.body.style.overflow = 'auto';
        setShowChat(false);
      }
    };
    
    if (showChat) {
      window.addEventListener('keydown', handleEscapeKey);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showChat, isMounted]);

  // Set mounted state and initialize mouse tracking
  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Add passive event listener for mousemove
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // Configure Tawk.to to use passive event listeners if it exists
    if (window.Tawk_API) {
      window.Tawk_API.onLoad = function() {
        const tawkIframe = document.querySelector('iframe[title*="Tawk"]');
        if (tawkIframe && tawkIframe.contentWindow) {
          const originalAddEventListener = tawkIframe.contentWindow.EventTarget.prototype.addEventListener;
          tawkIframe.contentWindow.EventTarget.prototype.addEventListener = function(type, listener, options) {
            if (['touchstart', 'touchmove', 'wheel', 'mousewheel'].includes(type)) {
              options = options || {};
              if (options.passive === undefined) {
                options.passive = true;
              }
            }
            return originalAddEventListener.call(this, type, listener, options);
          };
        }
      };
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Text animation effect
  useEffect(() => {
    if (!isMounted) return;
    
    let pos = 0;
    let direction = 1;
    const interval = setInterval(() => {
      setBarPos(prevPos => {
        let newPos = prevPos + direction;
        if (newPos > text.length) {
          direction = -1;
          newPos = text.length - 1;
        } else if (newPos < 0) {
          direction = 1;
          newPos = 0;
        }
        return newPos;
      });
    }, 180);
    
    return () => clearInterval(interval);
  }, [text.length, isMounted]);

  // Update bar position effect
  useEffect(() => {
    if (!isMounted) return;
    
    const updateBarPosition = () => {
      if (barPos < text.length && letterRefs.current[barPos]) {
        setBarLeft(letterRefs.current[barPos].offsetLeft);
      } else if (barPos === text.length && letterRefs.current[text.length - 1]) {
        const last = letterRefs.current[text.length - 1];
        setBarLeft(last.offsetLeft + last.offsetWidth);
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    const rafId = requestAnimationFrame(updateBarPosition);
    
    // Also update on window resize
    window.addEventListener('resize', updateBarPosition);
    
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateBarPosition);
    };
  }, [barPos, text.length, isMounted]);

  const contactIcons = [
    { icon: Facebook, id: 'facebook', action: () => window.open('https://www.facebook.com') },
    { 
      icon: MessageCircle, 
      id: 'chat', 
      action: () => {
        if (window.Tawk_API) {
          window.Tawk_API.maximize();
        } else {
          // Fallback in case Tawk.to isn't loaded yet
          window.open('https://tawk.to/chat/6890795160925719231fc7d5/1j1q5jq00', '_blank');
        }
      }
    },
    { icon: Mail, id: 'mail', action: () => window.open('mailto:info@critindia.com') },
    { icon: Phone, id: 'phone', action: () => window.open('tel:+917773954892') }
  ];

  // Only render the animated content on the client side
  const renderAnimatedText = () => {
    if (!isMounted) return null;
    
    return (
      <div className="mb-8 sm:mb-12 relative overflow-hidden">
        <h2 className="relative font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl rounded-lg tracking-wide flex items-center justify-center text-center" style={{height: '3.5rem'}}>
          {text.split("").map((char, i) => (
            <span
              key={i}
              ref={el => letterRefs.current[i] = el}
              className={`transition-colors duration-200`}
              style={{
                color: (barPos > 0 && i < barPos) ? "#ff0000" : "#000",
                position: "relative",
                zIndex: 1,
                fontWeight: "bold",
                fontSize: "2.2rem",
                letterSpacing: "0.1em"
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
          <span
            style={{
              position: "absolute",
              left: barLeft,
              top: "50%",
              height: "70%",
              width: "6px",
              background: "#ff0000",
              zIndex: 2,
              borderRadius: "3px",
              transform: "translateY(-50%)",
              transition: "left 0.18s linear"
            }}
          />
        </h2>
      </div>
    );
  };

  // Render static content on server, animated content on client
  const renderStaticText = () => (
    <div className="mb-8 sm:mb-12">
      <h2 className="font-semibold text-3xl md:text-4xl lg:text-5xl text-center text-red-600">
        {text}
      </h2>
    </div>
  );

  // Only render interactive elements on client side
  const renderInteractiveIcons = () => {
    if (!isMounted) return null;

    return (
      <div className="relative">
        {/* Central glowing area */}
        <div className="relative flex items-center justify-center w-44 h-44 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full bg-transparent border-4 border-red-600/40 shadow-2xl shadow-red-500/20">
          {/* Outer static ring for icons */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full border-4 border-red-600/40 rounded-full" style={{ position: 'absolute', left: 0, top: 0 }} />
            {/* Icons on the ring */}
            {contactIcons.map((item, index) => {
              const angle = (index / contactIcons.length) * 2 * Math.PI + Math.PI * 0.25;
              const radius = 140;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const isPhone = item.id === 'phone';
              
              return (
                <div
                  key={item.id}
                  className="absolute"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'auto',
                    zIndex: hoveredIcon === item.id ? 30 : 10
                  }}
                  onMouseEnter={() => setHoveredIcon(item.id)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  onClick={(e) => {
                    e.preventDefault();
                    item.action();
                  }}
                  aria-label={item.id}
                  tabIndex={0}
                >
                  {hoveredIcon === item.id && (
                    <div 
                      className={`absolute left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow z-50 ${
                        isPhone ? '-top-10' : '-top-8'
                      }`}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {item.id.charAt(0).toUpperCase() + item.id.slice(1).trim()}
                    </div>
                  )}
                  <div className="relative w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16">
                    <div 
                      className={`absolute inset-0 rounded-full transition-all duration-300 ${
                        hoveredIcon === item.id 
                          ? 'scale-105 shadow-[0_0_24px_8px_rgba(255,255,255,0.7)]' 
                          : 'scale-100 shadow-[0_0_16px_4px_rgba(255,255,255,0.4)]'
                      }`} 
                      style={{ background: '#ff0000', border: '2px solid #ff0000' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <item.icon 
                        className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6 transition-all duration-300 text-white ${
                          hoveredIcon === item.id ? 'scale-110' : ''
                        }`} 
                        style={{ 
                          filter: hoveredIcon === item.id 
                            ? 'drop-shadow(0 0 12px #fff)' 
                            : 'drop-shadow(0 0 6px #fff)' 
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Center device/hand illustration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-16 h-24 sm:w-20 sm:h-32 bg-gradient-to-b from-slate-700 to-slate-800 rounded-2xl border-2 border-red-600/30 shadow-xl relative overflow-hidden flex flex-col items-center justify-between py-2">
                <div className="w-6 h-1 rounded-full bg-gray-300/60 mb-2 mt-1" />
                <div className="absolute inset-2 top-6 bottom-6 bg-gradient-to-b from-red-900/50 to-slate-900/50 rounded-md">
                  <div className="absolute inset-0 bg-red-400/10 rounded-md animate-pulse" />
                </div>
                <div className="relative z-10 flex flex-col items-center w-full">
                  <div className="mx-auto mt-auto mb-3 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full border border-gray-200 bg-white/80 shadow-inner" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render static icons for server-side rendering
  const renderStaticIcons = () => (
    <div className="relative">
      <div className="relative flex items-center justify-center w-44 h-44 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full bg-transparent border-4 border-red-600/40 shadow-2xl shadow-red-500/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full border-4 border-red-600/40 rounded-full" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-24 sm:w-20 sm:h-32 bg-gradient-to-b from-slate-700 to-slate-800 rounded-2xl border-2 border-red-600/30 shadow-xl" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-* overflow-hidden pt-24 pb-10 sm:pt-32 lg:pt-40 px-4 sm:px-8 lg:px-16">
      <div className="relative z-10 flex flex-col lg:flex-row items-stretch justify-center w-full max-w-7xl mx-auto">
        {/* Left side content */}
        <div className="flex-1 w-full mb-10 lg:mb-0 text-center">
          {/* Contact Us Text */}
          {isMounted ? renderAnimatedText() : renderStaticText()}
          {/* Main text */}
          <div className="space-y-6">
            <p className="text-black text-base sm:text-lg lg:text-lg leading-relaxed font-light text-justify">
            Thank you for your interest in  
            <span className="text-red-600 font-semibold"> Connecting Roots</span>. Whether you are seeking SAP solutions, support, or insights, our experienced team is here to help drive your business forward.{' '}
              <br></br><span className="text-red-600 font-semibold">Connecting Roots, Empowering Growth</span>{' '}
              Tell us your business requirements below, and one of our SAP experts will reach out to guide you. Lets innovate, transform, and elevate your enterprise together </p>
          </div>
        </div>
        {/* Right side - Interactive contact icons */}
        <div className="flex-1 flex justify-center items-center w-full">
          {isMounted ? renderInteractiveIcons() : renderStaticIcons()}
        </div>
      </div>

      {/* Chat Modal */}
      {showChat && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]" 
          style={{pointerEvents: 'auto'}}
          onClick={(e) => {
            // Close modal when clicking on backdrop
            if (e.target === e.currentTarget) {
              document.body.style.overflow = 'auto';
              setShowChat(false);
            }
          }}
        >
          <div 
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()} // Prevent clicks from reaching the backdrop
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-red-600">Chat with Us</h3>
              <button 
                onClick={() => {
                  document.body.style.overflow = 'auto'; // Restore scrolling when modal is closed
                  setShowChat(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg mb-4 h-64 overflow-y-auto">
              <div className="flex flex-col space-y-2">
                <div className="bg-red-100 text-red-800 p-2 rounded-lg self-start max-w-[80%]">
                  Hello! How can we help you today?
                </div>
              </div>
            </div>
            <div className="flex">
              <input 
                type="text" 
                placeholder="Type your message here..." 
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button className="bg-red-600 text-white px-4 py-2 rounded-r-lg hover:bg-red-700 transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-red-600">Contact Us</h3>
              <button 
                onClick={() => setShowContactForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 h-32"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}