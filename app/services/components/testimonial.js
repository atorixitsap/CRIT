'use client';

import React, { useState, useEffect, useRef } from 'react';

const TestimonialCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);
  const mobileScrollRef = useRef(null);
  const animationRef = useRef(null);
  const mobileAnimationRef = useRef(null);

  // SAP-focused testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      shortQuote: "Transformed our entire supply chain with SAP S/4HANA",
      fullTestimonial: "The SAP S/4HANA implementation revolutionized our operations. Real-time analytics and streamlined processes reduced costs by 35% while improving visibility across all business units. Their expertise made the complex migration seamless.",
      jobTitle: "Chief Digital Officer",
      company: "Global Manufacturing Corp",
      metric: "35%",
      metricLabel: "Cost Reduction",
      module: "S/4HANA"
    },
    {
      id: 2,
      name: "Robert Chen",
      shortQuote: "Unified our enterprise with seamless SAP integration",
      fullTestimonial: "Their SAP integration expertise connected our finance, HR, and procurement systems flawlessly. The unified platform eliminated data silos and improved decision-making speed by 50%. ROI was evident within the first quarter.",
      jobTitle: "VP of IT",
      company: "Fortune 500 Retailer",
      metric: "50%",
      metricLabel: "Faster Decisions",
      module: "Integration"
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      shortQuote: "SuccessFactors revolutionized our talent management",
      fullTestimonial: "SAP SuccessFactors transformed how we manage talent. From recruitment to performance reviews, everything is streamlined. We achieved 98% user adoption in just two months thanks to their change management expertise.",
      jobTitle: "CHRO",
      company: "TechVentures Inc",
      metric: "98%",
      metricLabel: "User Adoption",
      module: "SuccessFactors"
    },
    {
      id: 4,
      name: "James Thompson",
      shortQuote: "Analytics Cloud delivered game-changing insights",
      fullTestimonial: "SAP Analytics Cloud gave us predictive capabilities we never had before. Real-time dashboards and AI-driven insights improved forecast accuracy by 40%. The implementation team's data modeling expertise was exceptional.",
      jobTitle: "CFO",
      company: "Financial Services Group",
      metric: "40%",
      metricLabel: "Better Forecasting",
      module: "Analytics Cloud"
    },
    {
      id: 5,
      name: "Lisa Anderson",
      shortQuote: "Ariba streamlined our procurement processes",
      fullTestimonial: "SAP Ariba implementation cut procurement cycle time by 60%. Supplier collaboration improved dramatically, and we've achieved significant cost savings. The team's post-implementation support ensures continuous optimization.",
      jobTitle: "Head of Procurement",
      company: "Healthcare Solutions Ltd",
      metric: "60%",
      metricLabel: "Faster Procurement",
      module: "Ariba"
    },
    {
      id: 6,
      name: "David Kim",
      shortQuote: "BTP unlocked innovation across our organization",
      fullTestimonial: "SAP Business Technology Platform enabled us to build custom solutions that perfectly complement our core SAP systems. We've launched 15 new applications that drive innovation while maintaining system integrity.",
      jobTitle: "CTO",
      company: "Digital Innovations Co",
      metric: "15+",
      metricLabel: "Custom Apps Built",
      module: "BTP"
    },
    {
      id: 7,
      name: "Emma Wilson",
      shortQuote: "CRM gave us a true 360-degree customer view",
      fullTestimonial: "SAP CRM implementation unified our customer data across all touchpoints. Customer satisfaction scores improved by 45%, and our sales team's productivity increased dramatically with better insights and automation.",
      jobTitle: "VP of Sales",
      company: "Consumer Goods Giant",
      metric: "45%",
      metricLabel: "Higher CSAT",
      module: "CRM"
    },
    {
      id: 8,
      name: "Michael Brown",
      shortQuote: "EWM optimized our warehouse operations completely",
      fullTestimonial: "SAP Extended Warehouse Management brought our inventory accuracy to 99.8%. Order fulfillment time dropped by 40%, and the real-time visibility helps us make better operational decisions every day.",
      jobTitle: "Supply Chain Director",
      company: "Logistics International",
      metric: "99.8%",
      metricLabel: "Inventory Accuracy",
      module: "EWM"
    }
  ];

  // Triple testimonials for smoother infinite scroll
  const tripleTestimonials = [...testimonials, ...testimonials, ...testimonials];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop auto-scroll
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isMobile) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.8;
    
    const animate = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += scrollSpeed;
        
        const maxScroll = scrollContainer.scrollWidth / 3;
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
        }
        
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, isMobile]);

  // Mobile auto-scroll
  useEffect(() => {
    const scrollContainer = mobileScrollRef.current;
    if (!scrollContainer || !isMobile) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5;
    
    const animate = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += scrollSpeed;
        
        const cardWidth = window.innerWidth * 0.85 + 16;
        const maxScroll = cardWidth * testimonials.length;
        
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
        }
        
        scrollContainer.scrollLeft = scrollPosition;
      }
      mobileAnimationRef.current = requestAnimationFrame(animate);
    };

    mobileAnimationRef.current = requestAnimationFrame(animate);

    return () => {
      if (mobileAnimationRef.current) {
        cancelAnimationFrame(mobileAnimationRef.current);
      }
    };
  }, [isPaused, isMobile, testimonials.length]);

  // Fixed interaction handlers - this was the main issue
  const handleCardEnter = (index) => {
    setHoveredIndex(index);
    setIsPaused(true);
  };

  const handleCardLeave = () => {
    setHoveredIndex(null);
  };

  const handleContainerLeave = () => {
    setIsPaused(false);
    setHoveredIndex(null);
  };

  return (
    <div className="w-full bg-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-7">
          <h2 className="text-4xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Client Success Stories
            <svg className="mx-auto my-0" style={{marginTop: '-4px'}} width="160" height="18" viewBox="0 0 220 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 18 Q 110 8, 215 14" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" fill="none"/>
              <path d="M15 21 Q 120 15, 200 18" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how leading enterprises transformed their operations with our SAP expertise
          </p>
        </div>

        {/* Desktop Carousel */}
        <div className="hidden md:block relative">
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-hidden py-8"
            onMouseLeave={handleContainerLeave}
          >
            {tripleTestimonials.map((testimonial, index) => {
              const isHovered = hoveredIndex === index;
              
              return (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="flex-shrink-0 w-[380px]"
                  onMouseEnter={() => handleCardEnter(index)}
                  onMouseLeave={handleCardLeave}
                >
                  <div className="pt-2">
                    <div
                      className={`relative bg-white rounded-2xl p-6 h-full transition-all duration-300 ease-in-out border ${
                        isHovered
                          ? 'border-red-500 shadow-md transform -translate-y-1 scale-[1.01] ring-1 ring-red-100'
                          : 'border-gray-200 shadow-sm hover:shadow-md'
                      }`}
                    >
                      {/* SAP Module Badge */}
                      <div className={`absolute -top-3 left-6 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-[11px] font-bold shadow-sm transition-all duration-200 ${
                        isHovered ? 'scale-105' : ''
                      }`}>
                        SAP {testimonial.module}
                      </div>

                      {/* Quote Icon */}
                      <div className="absolute top-8 right-8 text-red-100">
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 mt-4">
                        <p className="text-gray-700 font-medium mb-4 text-md leading-relaxed">
                          "{testimonial.fullTestimonial}"
                        </p>

                        {/* Metric Display */}
                        <div className={`mb-1 transition-all duration-500 ${
                          isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
                        }`}>
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-4xl font-bold text-red-500">{testimonial.metric}</span>
                            <span className="text-gray-600 font-medium">{testimonial.metricLabel}</span>
                          </div>
                        </div>

                        {/* Author Info */}
                        <div className="border-t border-gray-100 pt-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                              <p className="text-gray-600">{testimonial.jobTitle}</p>
                              <p className="text-red-600 font-medium">{testimonial.company}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="flex text-red-500 mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-xs text-gray-500 font-medium">Verified Client</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden relative">
          <div 
            ref={mobileScrollRef}
            className="flex overflow-x-hidden py-6 -mx-4 px-4 gap-4 no-scrollbar"
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
          >
            {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => {
              const isHovered = hoveredIndex === index;
              
              return (
                <div 
                  key={`mobile-${testimonial.id}-${index}`}
                  className="flex-shrink-0 w-[85vw] px-1"
                  onTouchStart={() => handleCardEnter(index)}
                  onTouchEnd={handleCardLeave}
                >
                  <div 
                    className={`relative bg-white rounded-2xl p-6 h-full transition-all duration-300 ease-in-out border ${
                      isHovered
                        ? 'border-red-500 shadow-md transform -translate-y-1 scale-[1.01] ring-1 ring-red-100'
                        : 'border-gray-200 shadow-sm hover:shadow-md'
                    }`}
                  >
                    {/* SAP Module Badge */}
                    <div className={`absolute -top-3 left-6 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-[11px] font-bold shadow-sm transition-all duration-200 ${
                      isHovered ? 'scale-105' : ''
                    }`}>
                      SAP {testimonial.module}
                    </div>

                    {/* Quote Icon */}
                    <div className="absolute top-4 right-4 text-red-100">
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 mt-4">
                      <p className="text-gray-700 font-medium mb-4 text-sm leading-relaxed">
                        "{testimonial.fullTestimonial}"
                      </p>

                      {/* Metric Display */}
                      <div className={`mb-1 transition-all duration-500 ${
                        isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
                      }`}>
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-2xl font-bold text-red-500">{testimonial.metric}</span>
                          <span className="text-gray-600 text-xs">{testimonial.metricLabel}</span>
                        </div>
                      </div>

                      {/* Author Info */}
                      <div className="border-t border-gray-100 pt-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                            <p className="text-xs text-gray-600">{testimonial.jobTitle}</p>
                            <p className="text-xs text-red-600 font-medium">{testimonial.company}</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="flex text-red-400">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">Verified</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <style jsx>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            @media (prefers-reduced-motion: reduce) {
              [style*="scroll-behavior:"] {
                scroll-behavior: auto !important;
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
