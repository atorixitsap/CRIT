'use client';
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Globe, Rocket, Package, PenTool, Shield } from 'lucide-react';

const SAPServices3DShowcase = () => {
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef(null);
  const sectionRef = useRef(null);
  const timeoutRef = useRef(null);

  const services = useMemo(() => [
    {
      id: 0,
      icon: Globe,
      title: 'SAP RISE Offering',
      description: 'Unlock faster business value by streamlining your transition to the cloud through SAP’s bundled offering—combining tools, services, and best practices under one roof.',
      color: '#5062B9',
      glowColor: '#3A4BA2',
      features: ['Single Contract', 'Cost Optimization', 'Comprehensive Package', 'Transformation Support']
    },
    {
      id: 1,
      icon: Rocket,
      title: 'Faster Migration Deployment',
      description: 'Achieve a swift and efficient migration with well-defined methodologies, industry best practices, and expert-led execution',
      color: '#3A4BA2',
      glowColor: '#2C3978',
      features: ['Rapid Deployment', 'Expert Guidance', 'Proven Methodologies', 'Minimal Disruption']
    },
    {
      id: 2,
      icon: Package,
      title: 'Easy to Use Bundle Offering',
      description: 'Single contact for complete transformation with streamlined processes and unified support structure.',
      color: '#5062B9',
      glowColor: '#1B2859',
      features: ['Unified Support', 'Streamlined Processes', 'Single Point of Contact', 'Comprehensive Solution']
    },
    {
      id: 3,
      icon: PenTool,
      title: 'Zero Maintenance Strategy',
      description: 'Move towards a zero maintenance strategy for your SAP applications with our FutureReady approach.',
      color: '#5062B9',
      glowColor: '#5062B9',
      features: ['Future-Ready Approach', 'Minimal Maintenance', 'Proactive Management', 'Continuous Optimization']
    },
    {
      id: 4,
      icon: Shield,
      title: 'Enhanced Operational Security',
      description: 'Comprehensive security framework ensuring robust protection and compliance for your SAP landscape.',
      color: '#5062B9',
      glowColor: '#3A4BA2',
      features: ['Robust Protection', 'Compliance Assurance', 'Security Framework', 'Risk Mitigation']
    }
  ], []);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Optimized auto-rotation with user interaction handling
  const startAutoRotation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    if (!isUserInteracting) {
      intervalRef.current = setInterval(() => {
        setActiveService((prev) => (prev + 1) % services.length);
      }, 4000);
    }
  }, [isUserInteracting, services.length]);

  // Handle user interaction with debouncing
  const handleServiceInteraction = useCallback((index) => {
    setActiveService(index);
    setIsUserInteracting(true);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 500);
  }, []);

  // Effect for auto-rotation
  useEffect(() => {
    startAutoRotation();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startAutoRotation]);

  // Resume auto-rotation when user stops interacting
  useEffect(() => {
    if (!isUserInteracting) {
      startAutoRotation();
    }
  }, [isUserInteracting, startAutoRotation]);

  // Optimized Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyVisible = entry.isIntersecting;
        setIsVisible(isCurrentlyVisible);
        
        if (isCurrentlyVisible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasBeenVisible]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const currentService = services[activeService];

  // Memoized particles with responsive count
  const particles = useMemo(() => 
    Array.from({ length: isMobile ? 8 : 15 }, (_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${3 + Math.random() * 2}s`,
      }
    })), 
  [isMobile]);

  // Responsive service positions
  const servicePositions = useMemo(() => 
    services.map((_, index) => {
      const angle = (index / services.length) * 360;
      const radius = isMobile ? 80 : 140; // Smaller radius for mobile
      const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
      const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
      return { x, y };
    }), 
  [services.length, isMobile]);

  return (
    <section 
      ref={sectionRef}
      id="rise-with-sap-services"
      className="min-h-* py-10 md:py-20 relative overflow-hidden"
      
    >
      {/* Optimized animated background particles */}
      {isVisible && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <div
              key={particle.id}
              style={particle.style}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-pulse"
            />
          ))}
        </div>
      )}

      
<div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
  <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 transition-all duration-1000 inline-block relative ${
    hasBeenVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
  }`}>
    <span className="text-black"> Rise With </span>
    <span className="text-red-500">SAP</span>
    <svg className="mx-auto my-0" style={{marginTop: '-4px'}} width="160" height="18" viewBox="0 0 220 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 18 Q 110 8, 215 14" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" fill="none"/>
  <path d="M15 21 Q 120 15, 200 18" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" fill="none"/>
</svg>
     </h2>
  <p className={`text-base md:text-md text-gray-800 max-w-xl mx-auto leading-relaxed transition-all duration-1000 delay-300 px-4 ${
    hasBeenVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
    Follow your accelerated transformation path to SAP Business Suite and enable continuous innovation.
     </p>
    </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Interactive Icon Showcase */}
          <div className={``}>
            <div className="relative p-4 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-gray-500/20 to-gray-500/20 backdrop-blur-xl border border-gray-600/30">
              
              {/* Central Container - Responsive sizing */}
              <div className={`relative mx-auto ${isMobile ? 'w-64 h-64' : 'w-80 md:w-96 h-80 md:h-96'}`}>
                {/* Rotating Blue Lines - Only animate when visible */}
                <div className={`absolute inset-0 ${isVisible ? 'animate-spin' : ''}`} style={{ animationDuration: '20s' }}>
                  <div className="absolute inset-2 md:inset-4 border-2 border-red-500 rounded-full opacity-60"></div>
                  <div className="absolute inset-6 md:inset-12 border border-red-500 rounded-full opacity-40"></div>
                  
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 384 384">
                    <path
                      d="M 50 192 Q 100 100 192 50 Q 284 100 334 192 Q 284 284 192 334 Q 100 284 50 192"
                      fill="none"
                      stroke="rgb(190, 66, 66)"
                      strokeWidth="1"
                      opacity="0.5"
                    />
                    <path
                      d="M 80 192 Q 120 130 192 80 Q 264 130 304 192 Q 264 254 192 304 Q 120 254 80 192"
                      fill="none"
                      stroke="rgb(156, 50, 50)"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                  </svg>
                </div>

                {/* Service Icons - Responsive sizing */}
                <div className="absolute inset-0">
                  {services.map((service, index) => {
                    const { x, y } = servicePositions[index];
                    const IconComponent = service.icon;
                    
                    return (
                      <div
                        key={service.id}
                        className={`absolute group transition-all duration-500 ${
                          isMobile ? 'w-12 h-12' : 'w-14 md:w-16 h-14 md:h-16'
                        } ${
                          hasBeenVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                        }`}
                        style={{
                          left: `calc(50% + ${x}px - ${isMobile ? '1.5rem' : '1.75rem'})`,
                          top: `calc(50% + ${y}px - ${isMobile ? '1.5rem' : '1.75rem'})`,
                          transitionDelay: `${index * 100}ms`
                        }}
                      >
                        <button
                          onClick={() => handleServiceInteraction(index)}
                          onMouseEnter={() => !isMobile && handleServiceInteraction(index)}
                          className={`w-full h-full border-1 border-red-300 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${
                            activeService === index 
                              ? 'ring-2 md:ring-4 ring-white ring-opacity-15 shadow-2xl border-2 border-white scale-105' 
                              : 'hover:ring-2 hover:ring-gray-400'
                          }`}
                          style={{
                            backgroundColor: '#FFCDD2',
                            boxShadow: activeService === index 
                              ? `0 0 ${isMobile ? '20px' : '30px'} ${'rgba(228, 136, 136, 1)'}` 
                              : `0 4px 15px rgba(228, 136, 136, 0.2)`
                          }}
                          aria-label={service.title}
                        >
                          <IconComponent className={`text-red-600 ${isMobile ? 'w-6 h-6' : 'w-7 h-7 md:w-8 md:h-8'}`} />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Center SAP Logo - Responsive sizing */}
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
                  hasBeenVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}>
                  <div className={`rounded-full bg-gradient-to-br from-red-200 to-red-200 flex items-center justify-center shadow-2xl border-2 border-red-400 ${
                    isMobile ? 'w-20 h-20' : 'w-24 md:w-32 h-24 md:h-32'
                  }`}>
                    <span className={`text-red-700 font-bold tracking-wide ${isMobile ? 'text-lg' : 'text-xl'}`}>SAP</span>
                  </div>
                  
                  
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="flex justify-center gap-2 mt-4 md:mt-8">
                {services.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${
                      activeService === index 
                        ? 'bg-[#5062B9] scale-125' 
                        : 'bg-gray-600 hover:bg-gray-400'
                    }`}
                    onClick={() => handleServiceInteraction(index)}
                    aria-label={`Go to ${services[index].title}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Service Details Panel */}
          <div className={``}>
            <div 
              className="relative p-4 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-gray-500/20 to-gray-500/20 backdrop-blur-xl border border-gray-600/30 transition-all duration-500"
              style={{
                borderColor: 'red-50',
                boxShadow: `0 0 ${isMobile ? '20px' : '30px'} ${currentService.color}33`
              }}
            >
              {/* Service header */}
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg transition-all duration-300"
                  style={{ backgroundColor: '#FFCDD2' }}
                >
                  <currentService.icon className="text-red-600 w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-black/80 mb-1 transition-all duration-300">
                    {currentService.title}
                  </h3>
                  <div className="text-[#dc2626] font-medium text-sm md:text-base">
                    SAP Services
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-gray-700 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 transition-all duration-300">
                {currentService.description}
              </p>
              
              {/* Features grid - Responsive layout */}
              <div className={`grid gap-3 md:gap-4 mb-6 md:mb-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {currentService.features.map((feature, index) => (
                  <div 
                    key={feature}
                    className={`flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl bg-gray-600/40 border border-gray-600/20 transition-all duration-300 ${
                      hasBeenVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{
                      transitionDelay: `${800 + index * 100}ms`
                    }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: '#ffffff ' }}
                    ></div>
                    <span className="text-white text-xs md:text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* Glassmorphism overlay */}
              <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/5 to-transparent rounded-t-2xl md:rounded-t-3xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SAPServices3DShowcase;