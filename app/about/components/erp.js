'use client';
import React, { useState, useEffect, useRef } from "react";

// Add custom CSS for animations
const customStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @keyframes erp-float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes erp-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.3); }
    50% { box-shadow: 0 0 30px rgba(239, 68, 68, 0.5); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.6s ease-out;
  }
  
  .animate-pulse-slow {
    animation: pulse 3s ease-in-out infinite;
  }
  
  .erp-animate-float {
    animation: erp-float 6s ease-in-out infinite;
  }
  
  .erp-animate-glow {
    animation: erp-glow 2s ease-in-out infinite;
  }
  
  .glow-effect {
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
  }
`;

const SEGMENTS = [
  {
    label: "Ongoing Improvement & Feedback",
    info: [
      "Collect user feedback regularly from all departments using surveys, interviews, and suggestion boxes.",
      "Implement system improvements based on prioritized feedback and business needs. Track the impact of changes and communicate updates to all users.",
      "Establish a continuous improvement committee to review feedback trends and plan future enhancements. Schedule quarterly review meetings to assess system performance and identify areas for optimization."
    ]
  },
  {
    label: "Planning & Organization",
    info: [
      "Define project scope, goals, and success criteria in collaboration with leadership and key stakeholders.",
      "Assemble a cross-functional implementation team with representatives from IT, operations, finance, and other relevant departments. Assign clear roles and responsibilities to ensure accountability.",
      "Create a detailed project timeline with milestones and allocate resources accordingly. Include contingency plans for potential delays and budget considerations for unexpected costs."
    ]
  },
  {
    label: "System Selection",
    info: [
      "Assess detailed business and technical requirements by engaging with end users and department heads.",
      "Research and shortlist potential ERP solutions based on functionality, scalability, and vendor reputation. Conduct product demos and gather feedback from stakeholders.",
      "Evaluate total cost of ownership including licensing, implementation, training, and maintenance costs. Compare vendor support quality and assess long-term scalability requirements."
    ]
  },
  {
    label: "Installation",
    info: [
      "Install ERP software on designated servers or cloud infrastructure, following vendor best practices.",
      "Set up required hardware, network, and security infrastructure to support the ERP system. Ensure all components are tested and optimized for performance.",
      "Configure system parameters and establish backup and disaster recovery procedures. Implement security protocols and access controls to protect sensitive business data."
    ]
  },
  {
    label: "Data Migration",
    info: [
      "Prepare and clean legacy data for migration by removing duplicates, correcting errors, and standardizing formats. Involve data owners in validation and ensure all sensitive information is handled securely.",
      "Map and transfer data to the new ERP system using automated tools where possible. Validate migrated data for accuracy and completeness.",
      "Create data migration rollback plans and conduct multiple test migrations before final cutover."
    ]
  },
  {
    label: "Training",
    info: [
      "Develop comprehensive training materials tailored to different user roles and business processes. Use a mix of documentation, videos, and hands-on exercises to accommodate various learning styles.",
      "Conduct user training sessions for all roles. Provide ongoing support and refresher courses as needed to ensure user proficiency.",
      "Establish a help desk and create user guides for common tasks and troubleshooting procedures. Develop a knowledge base with frequently asked questions and best practices for system usage."
    ]
  },
  {
    label: "Testing & Validation",
    info: [
      "Perform thorough system and integration testing to ensure all modules work as expected. Use test scripts and real-world scenarios for validation, and involve end users in the process.",
      "Validate business processes and workflows by involving end users in testing. Document issues found and ensure they are resolved before go-live.",
      "Conduct performance testing under various load conditions to ensure system stability and responsiveness. Test system recovery procedures and validate data integrity across all modules."
    ]
  },
  {
    label: "Go Live",
    info: [
      "Prepare for system launch with a comprehensive go-live checklist. Communicate the launch plan and schedule to all stakeholders in advance.",
      "Monitor initial operations and user activity closely during the first days after launch. Set up real-time alerts for critical issues and provide immediate support for users.",
      "Schedule post-go-live review meetings to assess system performance and address any immediate concerns. Plan for system optimization and additional training based on user feedback and performance metrics."
    ]
  }
];

export default function ERPImplementationDiagram() {
  const [hovered, setHovered] = useState(null);
  const [size, setSize] = useState(300);
  const [leftInfo, setLeftInfo] = useState(SEGMENTS[7]);
  const [rightInfo, setRightInfo] = useState(SEGMENTS[0]);
  const [panelWidth, setPanelWidth] = useState(280);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [robotActive, setRobotActive] = useState(true);
  const [rayAnim, setRayAnim] = useState(0);
  const animRef = useRef(null);
  const [typedInfo, setTypedInfo] = useState([]);
  const typingTimeout = useRef(null);

  // Enhanced responsive sizing with better transitions
  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      let s;
      if (w <= 480) { // Mobile phones
        s = Math.max(220, Math.min(300, Math.min(w, h) * 0.85));
      } else if (w <= 768) { // Tablets and small screens
        s = Math.max(280, Math.min(380, Math.min(w, h) * 0.75));
      } else { // Desktop - above 768px
        s = Math.max(350, Math.min(450, Math.min(w, h) * 0.6));
      }
      setSize(s);
    }
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    function handlePanelResize() {
      const w = window.innerWidth;
      let pw;
      if (w <= 480) {
        pw = Math.max(200, Math.min(280, w * 0.85));
      } else if (w <= 768) {
        pw = Math.max(250, Math.min(320, w * 0.8));
      } else {
        pw = Math.max(280, Math.min(340, w * 0.7));
      }
      setPanelWidth(pw);
    }
    handlePanelResize();
    window.addEventListener('resize', handlePanelResize);
    return () => window.removeEventListener('resize', handlePanelResize);
  }, []);

  // Improved device detection with smoother transitions
  useEffect(() => {
    const mobileMediaQuery = window.matchMedia('(max-width: 768px)');
    const desktopMediaQuery = window.matchMedia('(min-width: 769px)');

    const updateDeviceState = () => {
      const isMobileView = mobileMediaQuery.matches;
      setIsMobile(isMobileView);
      setIsDesktop(!isMobileView);
    };

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateDeviceState, 150);
    };

    updateDeviceState();

    if (mobileMediaQuery.addEventListener) {
      mobileMediaQuery.addEventListener('change', handleResize);
      desktopMediaQuery.addEventListener('change', handleResize);
      window.addEventListener('resize', handleResize);
    } else {
      mobileMediaQuery.addListener(handleResize);
      desktopMediaQuery.addListener(handleResize);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (mobileMediaQuery.removeEventListener) {
        mobileMediaQuery.removeEventListener('change', handleResize);
        desktopMediaQuery.removeEventListener('change', handleResize);
        window.removeEventListener('resize', handleResize);
      } else {
        mobileMediaQuery.removeListener(handleResize);
        desktopMediaQuery.removeListener(handleResize);
        window.removeEventListener('resize', handleResize);
      }
      clearTimeout(resizeTimer);
    };
  }, []);

  useEffect(() => {
    if (robotActive) {
      let last = performance.now();
      const animate = (now) => {
        const elapsed = now - last;
        last = now;
        setRayAnim((prev) => (prev + elapsed * 0.0015) % 1);
        animRef.current = requestAnimationFrame(animate);
      };
      animRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animRef.current);
    } else {
      setRayAnim(0);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    }
  }, [robotActive]);

  useEffect(() => {
    let active = true;
    const infoArr = hovered !== null ? SEGMENTS[hovered].info : SEGMENTS[7].info;
    setTypedInfo(Array(infoArr.length).fill(''));
    let bulletIdx = 0;
    let charIdx = 0;

    function typeNext() {
      if (!active) return;
      if (bulletIdx >= infoArr.length) return;
      const current = infoArr[bulletIdx];
      if (charIdx <= current.length) {
        setTypedInfo((prev) => {
          const updated = [...prev];
          updated[bulletIdx] = current.slice(0, charIdx);
          return updated;
        });
        charIdx++;
        const typingSpeed = isMobile ? 6 : 5;
        typingTimeout.current = setTimeout(typeNext, typingSpeed);
      } else {
        bulletIdx++;
        charIdx = 0;
        const pauseTime = isMobile ? 200 : 250;
        typingTimeout.current = setTimeout(typeNext, pauseTime);
      }
    }
    typeNext();
    return () => {
      active = false;
      clearTimeout(typingTimeout.current);
    };
  }, [hovered, isMobile]);

  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size * 0.3;
  const rInner = size * 0.18;
  const cardDistance = size < 500 ? size * 0.43 : size * 0.5;

  // Responsive card sizing
  const cardWidth = isMobile ? Math.max(80, Math.min(100, size * 0.16)) : Math.max(90, Math.min(120, size * 0.18));
  const cardHeight = isMobile ? Math.max(40, Math.min(50, size * 0.12)) : Math.max(50, Math.min(70, size * 0.15));

  const polarToCartesian = (angle, radius) => [
    cx + radius * Math.cos((angle - 90) * (Math.PI / 180)),
    cy + radius * Math.sin((angle - 90) * (Math.PI / 180))
  ];

  // Calculate responsive dimensions for mobile circle
  const getMobileCircleDimensions = () => {
    const baseRadius = isMobile ? 
      (size <= 250 ? 110 : size <= 330 ? 130 : 120) : 
      (size <= 350 ? 160 : 180);
    
    return {
      containerSize: baseRadius * 2 + 90, // Add padding for cards
      radius: baseRadius,
      cardSize: isMobile ? (size <= 330 ? 14 : 16) : 18
    };
  };

  return (
    <div className="erp-implementation-diagram transition-all duration-500 ease-in-out">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <div className={`w-full min-h-[600px] flex flex-col items-center justify-center p-4 sm:p-6 lg:px-4 lg:py-8 transition-all duration-500 ${isMobile ? 'scale-95' : 'scale-105'}`}>
        {isMobile ? (
          // MOBILE VIEW - Fixed positioning and smoother transitions (≤768px)
          <div className="w-full mx-auto transition-all duration-500 max-w-md">
            <div className="px-4 py-6 transition-all duration-500">
              <div className="text-center mb-6 -mt-8">
                <h2 className="font-bold text-gray-900 mb-3 text-2xl transition-all duration-500">
                  ERP Implementation
                </h2>
              </div>
              
              {/* Fixed Mobile Circular Container */}
              <div 
                className="relative flex items-center justify-center mx-auto transition-all duration-500"
                style={{ 
                  width: `${getMobileCircleDimensions().containerSize}px`,
                  height: `${getMobileCircleDimensions().containerSize}px`,
                  maxWidth: '100vw',
                  margin: '2rem auto'
                }}
              >
                
                {/* Fixed Central Octagon - Always centered */}
                <div 
                  className="absolute z-30 transition-all duration-500"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className={`
                    bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl border-2
                    border-gray-300 flex items-center justify-center backdrop-blur-sm 
                    transition-all duration-500
                    ${isMobile ? 'w-26 h-22' : 'w-24 h-24'}
                    `}>
                    <div className="text-center px-2">
                      <h3 className={`font-bold text-gray-900 leading-tight ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        ERP Implementation
                      </h3>
                    </div>
                  </div>
                </div>
                
                {/* Circular Stages with Fixed Positioning */}
                {SEGMENTS.map((segment, index) => {
                  const { radius } = getMobileCircleDimensions();
                  const baseAngle = (index * 45) - 90;
                  const x = Math.cos(baseAngle * Math.PI / 180) * radius;
                  const y = Math.sin(baseAngle * Math.PI / 180) * radius;
                  
                  const colors = [
                    hovered === index ? 'bg-white' : 'bg-gradient-to-br from-gray-400 to-gray-300',
                    hovered === index ? 'bg-white' : 'bg-gradient-to-br from-gray-400 to-gray-300',
                    hovered === index ? 'bg-white' : 'bg-gradient-to-br from-gray-400 to-gray-300',
                    hovered === index ? 'bg-white' : 'bg-gradient-to-br from-gray-400 to-gray-300',
                    hovered === index ? 'bg-white' : 'bg-gradient-to-br from-gray-400 to-gray-300',
                    hovered === index ? 'bg-white' : 'bg-gradient-to-br from-gray-400 to-gray-300',
                    hovered === index ? 'bg-white' : 'bg-gradient-to-br from-gray-300 to-gray-400',
                    hovered === index ? 'bg-white' : 'bg-gradient-to-br from-gray-300 to-gray-400'
                  ];

                  return (
                    <div
                      key={index}
                      className={`absolute ${isMobile ? 'w-18 h-16' : 'w-20 h-20'} ${
                        colors[index]
                      } rounded-xl shadow-xl border-2 ${
                        hovered === index ? 'border-gray-600' : 'border-white'
                      } flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                        hovered === index ? 'ring-4 ring-gray-400 ring-opacity-50 shadow-2xl scale-110' : 'hover:scale-105'
                      }`}
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        zIndex: hovered === index ? 40 : 20,
                      }}
                      onClick={() => setHovered(index)}
                      onMouseEnter={() => !isMobile && setHovered(index)}
                      onMouseLeave={() => !isMobile && hovered === index && setHovered(null)}
                    >
                      <div className={`text-gray-900 font-bold text-center leading-tight drop-shadow-sm px-1 ${
                        isMobile ? 'text-[10px]' : 'text-xs'
                      }`}>
                        {segment.label.split(' ').map((word, i) => (
                          <div key={i} className="leading-none">{word}</div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                
                {/* Connection Circle - Always centered */}
                <svg 
                  className="absolute top-0 left-0 w-full h-full pointer-events-none transition-all duration-500" 
                  style={{ zIndex: 1 }}
                >
                  <defs>
                    <linearGradient id="lineGradientMobile" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#9CA3AF" stopOpacity="0.6" />
                      <stop offset="50%" stopColor="#6B7280" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#9CA3AF" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="50%"
                    cy="50%"
                    r={getMobileCircleDimensions().radius}
                    fill="none"
                    stroke="url(#lineGradientMobile)"
                    strokeWidth="2"
                    opacity="0.7"
                  />
                </svg>
              </div>
              
              {/* Info Panel */}
              {hovered !== null && (
                <div className="bg-white p-4 rounded-lg shadow-lg mt-4 animate-fadeIn">
                  <h3 className="font-bold text-gray-900 mb-2">
                    {SEGMENTS[hovered].label}
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {SEGMENTS[hovered].info.map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setHovered(null);
                    }}
                    className="mt-3 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          // DESKTOP VIEW - Unchanged for screens > 768px
          <div className="flex flex-col lg:flex-row items-center justify-start w-full max-w-7xl mx-auto space-y-8 lg:space-y-0 lg:space-x-4 lg:pr-4">
            {/* Desktop/Tablet Pie Chart */}
            <div className="relative flex-shrink-0 lg:ml-0">
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '1 / 1',
                  width: size,
                  height: size,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <svg
                  width={size}
                  height={size}
                  viewBox={`0 0 ${size} ${size}`}
                  className="z-10 absolute left-0 top-0"
                  style={{ filter: 'drop-shadow(0 8px 24px #1e293b88)' }}
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <radialGradient id="pie3d" cx="60%" cy="40%" r="80%">
                      <stop offset="0%" stopColor="#e5e7eb" stopOpacity="0.95" />
                      <stop offset="60%" stopColor="#a3a3a3" stopOpacity="0.98" />
                      <stop offset="100%" stopColor="#52525b" stopOpacity="1" />
                    </radialGradient>
                    <linearGradient id="pieBevel" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#fff" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#000" stopOpacity="0.18" />
                    </linearGradient>
                    <radialGradient id="center3d" cx="50%" cy="40%" r="80%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
                      <stop offset="60%" stopColor="#1a202c" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="1" />
                    </radialGradient>
                  </defs>
                  {SEGMENTS.map((segment, i) => {
                    const startAngle = i * 45;
                    const endAngle = (i + 1) * 45;
                    const [x1, y1] = polarToCartesian(startAngle, rOuter);
                    const [x2, y2] = polarToCartesian(endAngle, rOuter);
                    const [x3, y3] = polarToCartesian(endAngle, rInner);
                    const [x4, y4] = polarToCartesian(startAngle, rInner);
                    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
                    const pathData = [
                      `M${x1},${y1}`,
                      `A${rOuter},${rOuter} 0 ${largeArc} 1 ${x2},${y2}`,
                      `L${x3},${y3}`,
                      `A${rInner},${rInner} 0 ${largeArc} 0 ${x4},${y4}`,
                      "Z"
                    ].join(" ");
                    const midAngle = startAngle + 22.5;
                    const rad = (midAngle - 90) * (Math.PI / 180);
                    const cardCenterX = cx + cardDistance * Math.cos(rad);
                    const cardCenterY = cy + cardDistance * Math.sin(rad);
                    const [arrowStartX, arrowStartY] = polarToCartesian(midAngle, rOuter + 5);
                    const arrowEndX = cardCenterX;
                    const arrowEndY = cardCenterY;
                    const isHovered = hovered === i;
                    return (
                      <g key={i}>
                        <path
                          d={pathData}
                          fill={isHovered ? 'url(#pie3d)' : 'url(#pie3d)'}
                          stroke="#111827"
                          strokeWidth={isHovered ? 5 : 3}
                          opacity={isHovered ? 1 : 0.95}
                          style={{
                            filter: isHovered ? "drop-shadow(0 0 16px #e53e3e)" : undefined,
                            cursor: "pointer",
                            transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
                          }}
                          onMouseEnter={() => {
                            setHovered(i);
                            if (i >= 4) setLeftInfo(segment);
                            if (i < 4) setRightInfo(segment);
                            setRobotActive(true);
                          }}
                          onMouseLeave={() => {
                            setHovered(null);
                            if (i >= 4) setLeftInfo(SEGMENTS[7]);
                            if (i < 4) setRightInfo(SEGMENTS[0]);
                            setRobotActive(true);
                          }}
                        />
                        <path
                          d={pathData}
                          fill="none"
                          stroke="url(#pieBevel)"
                          strokeWidth={isHovered ? 7 : 4}
                          opacity={isHovered ? 0.7 : 0.5}
                          style={{ pointerEvents: 'none' }}
                        />
                        <line
                          x1={arrowStartX}
                          y1={arrowStartY}
                          x2={arrowEndX}
                          y2={arrowEndY}
                          stroke="#6B7280"
                          strokeWidth="2"
                          strokeDasharray="6,6"
                          markerEnd="url(#arrowhead)"
                          opacity="0.7"
                        />
                      </g>
                    );
                  })}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={rInner}
                    fill="url(#center3d)"
                    stroke="#111827"
                    strokeWidth={size * 0.025}
                    filter="url(#glow)"
                  />
                  <text
                    x={cx}
                    y={cy - size * 0.015}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize={size * 0.07}
                    fontWeight="bold"
                    fontFamily="'Segoe UI', Arial, sans-serif"
                    style={{ letterSpacing: 2 }}
                  >
                    ERP
                  </text>
                  <text
                    x={cx}
                    y={cy + size * 0.035}
                    textAnchor="middle"
                    fill="#c7dafe"
                    fontSize={size * 0.025}
                    fontWeight="bold"
                    fontFamily="'Segoe UI', Arial, sans-serif"
                    style={{ letterSpacing: 3 }}
                  >
                    IMPLEMENTATION
                  </text>
                  <defs>
                    <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="60%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0C1C3C" />
                    </radialGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="0" stdDeviation={size * 0.012} floodColor="#e53e3e" floodOpacity="0.12" />
                    </filter>
                    <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L8,4 L0,8" fill="#a0aec0" />
                    </marker>
                  </defs>
                </svg>
                
                {/* Desktop Cards */}
                {SEGMENTS.map((segment, i) => {
                  const startAngle = i * 45;
                  const midAngle = startAngle + 22.5;
                  const rad = (midAngle - 90) * (Math.PI / 180);
                  const cardCenterX = cx + cardDistance * Math.cos(rad);
                  const cardCenterY = cy + cardDistance * Math.sin(rad);
                  const isHovered = hovered === i;

                  return (
                    <div
                      key={i}
                      className={`absolute px-2 md:px-3 py-1 md:py-2 rounded-lg text-white font-bold text-xs md:text-sm shadow border border-[#222c3c] flex flex-col items-center justify-center whitespace-pre-line text-center transition-all duration-200 ${isHovered ? 'scale-110 z-50 bg-red-600 shadow-2xl' : 'bg-gray-700'}`}
                      style={{
                        left: cardCenterX,
                        top: cardCenterY,
                        width: cardWidth,
                        height: cardHeight,
                        textAlign: 'center',
                        zIndex: isHovered ? 50 : 30,
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.5em 0.7em',
                        fontSize: '0.7em',
                      }}
                      onMouseEnter={() => {
                        setHovered(i);
                        if (i >= 4) setLeftInfo(segment);
                        if (i < 4) setRightInfo(segment);
                        setRobotActive(true);
                      }}
                      onMouseLeave={() => {
                        setHovered(null);
                        if (i >= 4) setLeftInfo(SEGMENTS[7]);
                        if (i < 4) setRightInfo(SEGMENTS[0]);
                        setRobotActive(true);
                      }}
                    >
                      {segment.label}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop Robot and Info Section */}
            <div className="relative flex items-center justify-center lg:ml-[-40px]">
              <img
                src="https://res.cloudinary.com/dwlw1nykn/image/upload/v1763443310/vecteezy_3d-cute-robot-consultant-with-friendly-expression-pointing_52259583_hdsacd.avif"
                alt="Robot"
                className="h-auto pt-23 max-h-96 lg:max-h-[500px] rounded-lg transition-transform duration-300 hover:scale-105"
                style={{
                  height: size * 0.9,
                  zIndex: 2,
                  position: 'relative',
                }}
              />
              {robotActive && (
                <>
                  <svg
                    width={size * 0.9}
                    height={size * 0.8}
                    style={{
                      position: 'absolute',
                      left: size * 0.35,
                      top: size * 0.01,
                      pointerEvents: 'none',
                      zIndex: 2,
                    }}
                    viewBox={`0 0 ${size * 0.9} ${size * 0.8}`}
                  >
                    <defs>
                      <radialGradient id="projectorBeam" cx="0%" cy="50%" r="100%">
                        <stop offset="100%" stopColor="#dc2626" stopOpacity="0.3" />
                        <stop offset="30%" stopColor="#dc2626" stopOpacity="0.3" />
                        <stop offset="60%" stopColor="#dc2626" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#dc2626" stopOpacity="0.3" />
                      </radialGradient>
                      <filter id="projectorGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#ffffff" floodOpacity="0.8" />
                        <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#e53e3e" floodOpacity="0.8" />
                        <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#c53030" floodOpacity="0.6" />
                      </filter>
                    </defs>
                    <polygon
                      points={`
                        0,${size*0.34}
                        ${size*0.85},${size*0.01}
                        ${size*0.85},${size*0.81}
                        0,${size*0.40}
                      `}
                      fill="url(#projectorBeam)"
                      filter="url(#projectorGlow)"
                      opacity="0.4"
                    />
                    <g opacity="0.6">
                      {(() => {
                        const beamWidth = size * 0.85;
                        const beamLeft = 0;
                        const beamTopStart = size * 0.34;
                        const beamTopEnd = size * 0.08;
                        const t = rayAnim;
                        const lineLen = size * 0.18;
                        const t2 = Math.min(1, (t * beamWidth + lineLen) / beamWidth);
                        const x1 = beamLeft + t * beamWidth;
                        const y1 = beamTopStart - t * (beamTopStart - beamTopEnd);
                        const x2 = x1 + lineLen;
                        const y2 = beamTopStart - t2 * (beamTopStart - beamTopEnd);
                        return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ef4444" strokeWidth="2" opacity="0.3" />;
                      })()}
                      {(() => {
                        const beamWidth = size * 0.85;
                        const beamLeft = 0;
                        const beamBottomStart = size * 0.40;
                        const beamBottomEnd = size * 0.72;
                        const t = rayAnim;
                        const lineLen = size * 0.18;
                        const t2 = Math.min(1, (t * beamWidth + lineLen) / beamWidth);
                        const x1 = beamLeft + t * beamWidth;
                        const y1 = beamBottomStart + t * (beamBottomEnd - beamBottomStart);
                        const x2 = x1 + lineLen;
                        const y2 = beamBottomStart + t2 * (beamBottomEnd - beamBottomStart);
                        return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ef4444" strokeWidth="2" opacity="0.3" />;
                      })()}
                    </g>
                  </svg>
                  <div
                    className="absolute bg-[rgba(12,28,60,0.7)] text-white font-bold rounded-lg p-4 border-1 border-red-500 shadow-lg"
                    style={{
                      left: size * 0.35 + size * 0.85,
                      top: size * 0.01,
                      minWidth: size * 0.92,
                      height: size * 0.8,
                      fontSize: size * 0.04,
                      zIndex: 10,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-400/10 rounded-lg" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="text-red-400 font-semibold mb-3 text-center underline">
                        {hovered !== null ? SEGMENTS[hovered].label : SEGMENTS[7].label}
                      </div>
                      <div
                        className="info-scroll-container"
                        style={{
                          flex: 1,
                          overflowY: 'auto',
                          maxHeight: '78%',
                        }}
                      >
                        <ul className="text-sm space-y-2 text-left">
                          {(hovered !== null ? SEGMENTS[hovered].info : SEGMENTS[7].info).map((point, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {typedInfo[idx] || ''}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
