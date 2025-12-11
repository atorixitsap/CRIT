'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Users, Clock, Award, BookOpen, Target, Briefcase, ArrowUpRight, ArrowRight } from 'lucide-react';

// CSS Animations and Utilities
const styles = `
  @keyframes fill-up {
    0% {
      transform: translateY(100%);
      opacity: 0.8;
    }
    25% {
      transform: translateY(50%);
      opacity: 1;
    }
    50% {
      transform: translateY(0%);
      opacity: 1;
    }
    75% {
      transform: translateY(50%);
      opacity: 1;
    }
    100% {
      transform: translateY(100%);
      opacity: 0.8;
    }
  }
  
  .animate-fill-up {
    animation: fill-up 4s ease-in-out infinite;
    transform-origin: bottom;
  }
  
  /* Text color animation */
  @keyframes text-change {
    0%, 100% {
      color: #111827; /* gray-900 */
    }
    25%, 75% {
      color: #000000; /* black */
    }
  }
  
  .animate-text-change {
    animation: text-change 4s ease-in-out infinite;
  }
  
  /* Line clamp utilities */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-none {
    display: block;
    -webkit-line-clamp: unset;
    -webkit-box-orient: unset;
    overflow: visible;
  }
`;

const DesignClassesSection = () => {
  // Add state for tracking screen width
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if window is available (client-side) and set initial mobile state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const classesData = [
    {
      id: 1,
      title: "SAP S/4 HANA",
      subtitle: "Intelligent ERP for Digital Transformation",
      description: "SAP S/4HANA is an integrated ERP suite that helps companies run their business processes in real time, enabling digital transformation and operational efficiency.",
      icon: <BookOpen className="w-8 h-8" />,
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "SAP SuccessFactors",
      subtitle: "Cloud-Based Human Experience Management",
      description: "SAP SuccessFactors provides comprehensive cloud solutions for core HR, payroll, talent management, and employee experience, helping organizations attract and retain top talent.",
      icon: <Award className="w-8 h-8" />,
      color: "bg-orange-500",
    },
    {
      id: 3,
      title: "SAP Ariba",
      subtitle: "Business Intelligence & Procurement",
      description: "SAP Ariba streamlines procurement processes, connecting businesses with a vast network of suppliers. This enables smarter supply chain collaboration and more informed business decisions.",
      icon: <Briefcase className="w-8 h-8" />,
      color: "bg-green-500",
    },
    {
      id: 4,
      title: "SAP Concur",
      subtitle: "Automation Travel and Expense Management",
      description: "SAP Concur automates travel, expense, and invoice management, providing visibility and control over spending for businesses of all sizes.",
      icon: <Clock className="w-8 h-8" />,
      color: "bg-purple-500",
    },
    {
      id: 5,
      title: "SAP BTP",
      subtitle: "Integrates SAP Business Technology Platform",
      description: "SAP BTP (Business Technology Platform) integrates data management, analytics, AI, and application development to accelerate innovation and business growth.",
      icon: <Users className="w-8 h-8" />,
      color: "bg-pink-500",
    },
    {
      id: 6,
      title: "SAP Fiori",
      subtitle: "Modern User Experience Design",
      description: "SAP Fiori is a design system that delivers a consistent, role-based, and intuitive user experience across all SAP applications, improving productivity and satisfaction.",
      icon: <Target className="w-8 h-8" />,
      color: "bg-yellow-500",
    },
  ];

  // Auto-rotate through all 6 cards in 1st box
  const [currentCard, setCurrentCard] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return; // Don't auto-rotate when paused
    
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentCard((prev) => (prev + 1) % classesData.length);
        setIsFading(false);
      }, 300); // match fade duration
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Show all 6 cards in 2nd box
  const cardGroup = Math.floor(currentCard / 3);
  const visibleCards = classesData; // Show all cards instead of slicing

  const nextCard = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentCard((prev) => (prev + 1) % classesData.length);
      setIsFading(false);
    }, 300);
  };

  const prevCard = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentCard((prev) => (prev - 1 + classesData.length) % classesData.length);
      setIsFading(false);
    }, 300);
  };

  // Handle card selection
  const handleCardClick = (index) => {
    setCurrentCard(index);
    setIsPaused(true);
    
    // Resume auto-rotation after 8 seconds
    setTimeout(() => {
      setIsPaused(false);
    }, 6000); // 8 seconds
  };

  return (
    <div className="min-h-* text-white p-8">
      <style jsx global>{styles}</style>
      {/* Header */}
      <div className="text-center mb-8 md:mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 inline-block relative">
          <span className="text-black">Our </span>
          <span className="text-red-500">Products</span>
          <svg className="mx-auto my-0" style={{marginTop: '-4px'}} width="160" height="18" viewBox="0 0 220 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 18 Q 110 8, 215 14" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" fill="none"/>
            <path d="M15 21 Q 120 15, 200 18" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" fill="none"/>
          </svg>
        </h1>
      </div>
      {/* Featured Card Display */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="relative bg-white rounded-2xl p-4 md:p-16 border flex flex-col md:flex-row items-center justify-center md:justify-start min-h-[200px] md:min-h-[420px]">
          

          {/* Small card on the left */}
          <div className="relative flex-shrink-0 mb-4 md:mb-0 mr-0 md:mr-10 block" style={{ width: '200px', height: '250px' }}>
            {/* Notch background circle for cut-out effect */}
            <div className="absolute -top-4 -right-4 z-20 pointer-events-none">
              <div className="bg-white w-16 h-16 rounded-full" />
                </div>
            {/* Card */}
            <div key={currentCard} className="relative p-6 shadow-md bg-gray-100 text-gray-900 rounded-tl-2xl rounded-tr-none rounded-br-xl rounded-bl-2xl w-full h-full flex flex-col items-center justify-center transition-all duration-300 ease-in-out group overflow-hidden">
              {/* Orange fill overlay */}
              <div className="absolute inset-0 bg-red-700 animate-fill-up"></div>
              {/* Orange Arrow Circle */}
              <div className="absolute -top-1.5 -right-1.5 z-30">
                <div className="bg-red-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-4 border-red-500">
                  <ArrowUpRight className="w-4 h-4 text-black" />
                </div>
              </div>
              <div className={`relative z-10 transition-opacity duration-300 flex flex-col items-center justify-between h-full animate-text-change ${isFading ? 'opacity-0' : 'opacity-100'}`}>
              {/* Title (small) */}
              <div className={`text-center leading-tight mb-4 font-bold transition-all duration-300 ${['SAP SuccessFactors', 'SAP Ariba'].includes(classesData[currentCard].title) ? 'text-base' : classesData[currentCard].title === 'SAP S/4 HANA' ? 'text-sm md:text-sm' : 'text-lg'}`}>
                {classesData[currentCard].title === 'SAP Analytics & Ariba' ? (
                  <>SAP Ariba</>
                ) : (
                  classesData[currentCard].title
                )}
              </div>
              {/* Large Image (fills card) */}
                {classesData[currentCard].title === 'SAP S/4 HANA' ? (
                  <div className="w-full flex-1 rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center transition-all duration-300">
                    <img src="https://res.cloudinary.com/duz9xipfm/image/upload/v1753859298/Project_69-08_qjqkub_1_ywnfmb.avif" alt="SAP S/4 HANA img" className="object-cover w-full h-full rounded-2xl transition-all duration-300" />
                  </div>
                ) : classesData[currentCard].title === 'SAP SuccessFactors' ? (
                  <div className="w-full flex-1 rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center transition-all duration-300">
                    <img src="https://res.cloudinary.com/duz9xipfm/image/upload/v1753859452/Project_74-21_vjuhcv_1_jfw7d7.avif" alt="SAP SuccessFactors img" className="object-contain w-full h-full rounded-2xl transition-all duration-300" />
                  </div>
                ) : classesData[currentCard].title === 'SAP Ariba' ? (
                  <div className="w-full flex-1 rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center transition-all duration-300">
                    <img src="https://res.cloudinary.com/duz9xipfm/image/upload/v1753859453/Project_70-07_gzkqsu_1_gl8pwj.avif" alt="SAP Ariba img" className="object-cover w-full h-full rounded-2xl transition-all duration-300" />
                  </div>
                ) : classesData[currentCard].title === 'SAP Concur' ? (
                  <div className="w-full flex-1 rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center transition-all duration-300">
                    <img src="https://res.cloudinary.com/duz9xipfm/image/upload/v1753859563/Project_44-08_e3kgy4_1_akiyx7.avif" alt="SAP Concur img" className="object-cover w-full h-full rounded-2xl transition-all duration-300" />
                  </div>
                ) : classesData[currentCard].title === 'SAP BTP' ? (
                  <div className="w-full flex-1 rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center transition-all duration-300">
                    <img src="https://res.cloudinary.com/duz9xipfm/image/upload/v1753859890/vecteezy_teamwork-or-team-building-office-business-meeting-vector_4154417_wmtzvy_1_xxqcfd.avif" alt="SAP BTP img" className="object-cover w-full h-full rounded-2xl transition-all duration-300" />
                  </div>
                ) : classesData[currentCard].title === 'SAP Fiori' ? (
                  <div className="w-full flex-1 rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center transition-all duration-300">
                    <img src="https://res.cloudinary.com/duz9xipfm/image/upload/v1753859786/387_generated_eyibjv_1_ilzuep.avif" alt="SAP Fiori img" className="object-cover w-full h-full rounded-2xl transition-all duration-300" />
                  </div>
                ) : null}
              </div>
            </div>
              </div>

          {/* Info on the right */}
          <div className="flex-1 flex flex-col justify-center md:ml-0 text-center md:text-left px-3 md:px-0" style={{ minHeight: '200px', height: 'auto' }}>
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-2 md:mb-4">{classesData[currentCard].title}</h2>
            <p className="text-sm md:text-base lg:text-lg font-semibold text-[#dc2626] mb-2 md:mb-4 tracking-normal leading-tight whitespace-normal">{classesData[currentCard].subtitle}</p>
            <p className="text-gray-800 text-xs md:text-sm lg:text-base leading-tight md:leading-relaxed mb-3 md:mb-6 text-left tracking-normal whitespace-normal">
              {classesData[currentCard].description}
            </p>
            
            {/* Additional descriptive content - hidden on mobile */}
            <div className="hidden md:block mb-6">
              <p className="text-gray-800 text-sm leading-relaxed">
                Built on modern web standards, SAP provides a seamless experience across desktop, tablet, and mobile devices, ensuring users can work efficiently from anywhere.
              </p>
            </div>
            
            {/* Additional information to fill the height */}
            <div className="mt-2 md:mt-auto space-y-1 md:space-y-3">
              {classesData[currentCard].title === 'SAP S/4 HANA' && (
                <>
                  <div className="flex items-center mb-1 md:mb-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-xs md:text-sm tracking-normal">In-memory database technology</span>
                  </div>
                  <div className="flex items-center mb-1 md:mb-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-xs md:text-sm tracking-normal">Simplified data model</span>
                  </div>
                  <div className="hidden md:flex items-center mb-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-sm tracking-normal">Advanced analytics & AI capabilities</span>
                  </div>
                  <div className="hidden md:flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-sm tracking-normal">Real-time business processes</span>
                  </div>
                </>
              )}
              {classesData[currentCard].title === 'SAP SuccessFactors' && (
                <>
                  <div className="flex items-center mb-1 md:mb-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-xs md:text-sm tracking-normal">Performance & goals management</span>
                  </div>
                  <div className="flex items-center mb-1 md:mb-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-xs md:text-sm tracking-normal">Learning & development tools</span>
                  </div>
                  <div className="hidden md:flex items-center mb-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-sm tracking-normal">Employee engagement analytics</span>
                  </div>
                  <div className="hidden md:flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-sm tracking-normal">Recruitment & onboarding</span>
                  </div>
                </>
              )}
              {classesData[currentCard].title === 'SAP Ariba' && (
                <>
                  <div className="flex items-center mb-2 md:mb-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-xs md:text-sm tracking-normal">Predictive analytics & planning</span>
                  </div>
                  <div className="flex items-center mb-2 md:mb-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-xs md:text-sm tracking-normal">Supply chain collaboration</span>
                  </div>
                  <div className="flex items-center mb-2 md:mb-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-xs md:text-sm tracking-normal">Spend management & procurement</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-xs md:text-sm tracking-normal">Business intelligence dashboards</span>
                  </div>
                </>
              )}
              {classesData[currentCard].title === 'SAP Concur' && (
                <>
                  <div className="flex items-center mb-2 md:mb-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-xs md:text-sm tracking-normal">Automated expense processing</span>
                  </div>
                  <div className="flex items-center mb-2 md:mb-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-xs md:text-sm tracking-normal">Travel booking & management</span>
                  </div>
                  <div className="flex items-center mb-2 md:mb-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-xs md:text-sm tracking-normal">Invoice automation & approval</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-xs md:text-sm tracking-normal">Policy compliance & reporting</span>
                  </div>
                </>
              )}
              {classesData[currentCard].title === 'SAP BTP' && (
                <>
                  <div className="flex items-center mb-2 md:mb-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-xs md:text-sm tracking-normal">Database & data management</span>
                  </div>
                  <div className="flex items-center mb-2 md:mb-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-xs md:text-sm tracking-normal">Application development tools</span>
                  </div>
                  <div className="flex items-center mb-2 md:mb-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-xs md:text-sm tracking-normal">Integration & automation services</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-xs md:text-sm tracking-normal">AI & machine learning services</span>
                  </div>
                </>
              )}
              {classesData[currentCard].title === 'SAP Fiori' && (
                <>
                  <div className="flex items-center mb-2 md:mb-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-xs md:text-sm tracking-normal">Role-based user experience</span>
                  </div>
                  <div className="flex items-center mb-2 md:mb-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-xs md:text-sm tracking-normal">Responsive design principles</span>
                  </div>
                  <div className="flex items-center mb-2 md:mb-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-xs md:text-sm tracking-normal">Consistent design language</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 text-xs md:text-sm tracking-normal">Cross-platform compatibility</span>
                  </div>
                </>
              )}
            </div>
            </div>

          {/* Dots (pagination) */}
          <div className="absolute right-8 top-8 space-x-2 hidden md:flex">
            {classesData.map((_, idx) => (
                              <span
                  key={idx}
                  className={`inline-block w-3 h-3 rounded-full ${idx === currentCard ? 'bg-orange-500' : 'bg-gray-500 opacity-50'}`}
                />
            ))}
          </div>
        </div>
      </div>

      {/* Main Classes Section - Hidden on mobile */}
      <div className="max-w-6xl mx-auto hidden md:block">
        <div className="bg-white rounded-2xl p-4 border ">
          {/* Remove the small card/info row from here; start with heading */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold mb-2 text-black">Our products</h2>
            <p className="text-gray-800 hidden md:block">Unlock the Power of SAP Solutions for a Smarter, More Efficient Business</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 lg:gap-4 mb-4">
            {visibleCards.map((classItem, index) => (
              <div key={classItem.id} className="relative w-full h-48 md:h-64 lg:h-56">
                {/* Notch background circle for cut-out effect (all cards) */}
                <div className="absolute -top-3 -right-3 z-20 pointer-events-none">
                  <div className="bg-white w-16 h-16 rounded-full" />
                </div>
                {/* Card */}
                <div
                  className={`relative p-2 transition-all cursor-pointer shadow-md
                    rounded-tl-[2.5rem] rounded-tr-none rounded-br-2xl rounded-bl-2xl
                    ${index === currentCard ? 'ring-2 ring-red-500 bg-red-600 text-black' : 'bg-gray-200 text-gray-900'}`}
                  onClick={() => handleCardClick(index)}
                  style={{ width: '100%', height: '100%' }}
                >
                  {/* Orange Arrow Circle (all cards) */}
                  <div className="absolute top-0 right-0 z-30">
                    <div className="bg-red-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-4 border-red-600">
                      <ArrowUpRight className="w-4 h-4 text-black" />
                    </div>
                  </div>
                  {/* Title */}
                  {classItem.title === 'SAP SuccessFactors' ? (
                    <h3 className="text-xs md:text-xs lg:text-sm font-bold mb-1 mt-2">SAP Success<br/>Factors</h3>
                  ) : classItem.title === 'SAP S/4 HANA' ? (
                    <h3 className="text-xs md:text-xs lg:text-sm font-bold mb-1 mt-2">{classItem.title}</h3>
                  ) : classItem.title === 'SAP Analytics & Ariba' ? (
                    <h3 className="text-xs md:text-xs lg:text-sm font-bold mb-1 mt-2">SAP Ariba</h3>
                  ) : (
                    <h3 className="text-xs md:text-xs lg:text-sm font-bold mb-1 mt-2">{classItem.title}</h3>
                  )}
                  {/* Subtitle (keep a little info) */}
                  <p className="text-xs font-light mb-2 text-black md:text-gray-800 hidden md:block md:text-[10px] lg:text-xs">{classItem.subtitle}</p>
                  {/* Image container filling remaining space */}
                  {classItem.title === 'SAP S/4 HANA' ? (
                    <div className="w-full h-24 md:h-36 lg:h-32 rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center mt-2">
                      <img src="https://res.cloudinary.com/duz9xipfm/image/upload/v1753859298/Project_69-08_qjqkub_1_ywnfmb.avif" alt="SAP S/4 HANA img" className="object-cover w-full h-full rounded-2xl" />
                    </div>
                  ) : classItem.title === 'SAP SuccessFactors' ? (
                    <div className="w-full h-20 md:h-36 lg:h-27 rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center mt-2">
                      <img src="https://res.cloudinary.com/duz9xipfm/image/upload/v1753859452/Project_74-21_vjuhcv_1_jfw7d7.avif" alt="SAP SuccessFactors img" className="object-contain w-full h-full rounded-2xl" />
                    </div>
                  ) : classItem.title === 'SAP Ariba' ? (
                    <div className="w-full h-24 md:h-36 lg:h-28 rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center mt-2">
                      <img src="https://res.cloudinary.com/duz9xipfm/image/upload/v1753859453/Project_70-07_gzkqsu_1_gl8pwj.avif" alt="SAP Analytics & Ariba img" className="object-cover w-full h-full rounded-2xl" />
                    </div>
                  ) : classItem.title === 'SAP Concur' ? (
                    <div className="w-full h-24 md:h-36 lg:h-32 rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center mt-2">
                      <img src="https://res.cloudinary.com/duz9xipfm/image/upload/v1753859563/Project_44-08_e3kgy4_1_akiyx7.avif" alt="SAP Concur img " className="object-cover w-full h-full rounded-2xl" />
                    </div>
                  ) : classItem.title === 'SAP BTP' ? (
                    <div className="w-full h-24 md:h-36 lg:h-32 rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center mt-2">
                      <img src="https://res.cloudinary.com/duz9xipfm/image/upload/v1753859890/vecteezy_teamwork-or-team-building-office-business-meeting-vector_4154417_wmtzvy_1_xxqcfd.avif" alt="SAP BTP img" className="object-cover w-full h-full rounded-2xl" />
                    </div>
                  ) : classItem.title === 'SAP Fiori' ? (
                    <div className="w-full h-24 md:h-36 lg:h-32 rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center mt-2">
                      <img src="https://res.cloudinary.com/duz9xipfm/image/upload/v1753859786/387_generated_eyibjv_1_ilzuep.avif" alt="SAP Fiori" className="object-cover w-full h-full rounded-2xl" />
                    </div>
                  ) : (
                    <div className="flex-grow w-full rounded-2xl mt-auto overflow-hidden bg-gray-200 flex items-center justify-center">

                    </div>
                  )}
                </div>
              </div>
          ))}
          </div>
          
          {/* View All Products Button */}
          
          
        </div>
      </div>
      <div className="flex justify-center mt-12">
            <Link 
              href="/products" 
              className="flex items-center justify-center px-4 py-3 bg-black text-white rounded-full text-md font-medium hover:scale-105 transition-all duration-300 group"
            >
              View All Products
              <ArrowRight className="ml-1 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
    </div>
  );
};

export default DesignClassesSection;