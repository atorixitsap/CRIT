import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, Users, ShoppingCart, Calendar, Eye, Code, Award, Briefcase, Settings } from 'lucide-react';

function MetricsDesktopView() {
  const [animatedValues, setAnimatedValues] = useState({
    years: 0,
    projects: 0,
    clients: 0,
    technologies: 0
  });

  const targetValues = {
    years: 11,
    projects: 100,
    clients: 200,
    technologies: 75
  };

  const metrics = [
    {
      id: 'years',
      label: 'Years of Success',
      value: animatedValues.years,
      target: targetValues.years,
      format: (val) => `${Math.floor(val)}+`,
      change: '11+ years and counting',
      trend: 'up',
      icon: Calendar,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    },
    {
      id: 'projects',
      label: 'Projects Under Our Belt',
      value: animatedValues.projects,
      target: targetValues.projects,
      format: (val) => `${Math.floor(val)}+`,
      change: 'Growing portfolio',
      trend: 'up',
      icon: Briefcase,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    },
    {
      id: 'clients',
      label: 'Clients',
      value: animatedValues.clients,
      target: targetValues.clients,
      format: (val) => `${Math.floor(val)}+`,
      change: 'Trusted partnerships',
      trend: 'up',
      icon: Users,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    },
    {
      id: 'technologies',
      label: 'Technologies',
      value: animatedValues.technologies,
      target: targetValues.technologies,
      format: (val) => `${Math.floor(val)}+`,
      change: 'Cutting-edge stack',
      trend: 'up',
      icon: Settings,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    }
  ];

  // Track which metric is animating
  const animatingRef = useRef({ years: false, projects: false, clients: false, technologies: false });

  // Helper to animate a single metric from 0 to total
  const animateMetric = (metricId, target) => {
    if (animatedValues[metricId] === target || animatingRef.current[metricId]) return;
    animatingRef.current[metricId] = true;
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let current = 0;
    let step = 0;
    const increment = target / steps;
    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, target);
      setAnimatedValues(prev => ({ ...prev, [metricId]: current }));
      if (step >= steps) {
        clearInterval(timer);
        setAnimatedValues(prev => ({ ...prev, [metricId]: target }));
        animatingRef.current[metricId] = false;
      }
    }, interval);
  };

  // On mount, set all values to total
  useEffect(() => {
    setAnimatedValues({ ...targetValues });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto pt-2 pb-18 px-8 ">
      <div className="mb-12 text-center">
         <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 transition-all duration-1000 inline-block relative`}>
    <span className="text-black"> We are </span>
    <span className="text-red-500">Growing</span>
    <svg className="mx-auto my-0" style={{marginTop: '-4px'}} width="160" height="18" viewBox="0 0 220 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 18 Q 110 8, 215 14" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" fill="none"/>
  <path d="M15 21 Q 120 15, 200 18" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" fill="none"/>
</svg>
     </h2>
      </div>

      <div className="relative">
        {/* Connecting lines background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="w-full h-full opacity-18">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            <path
              d="M 0,100 Q 300,80 600,120 T 1200,160"
              stroke="black"
              strokeWidth="3"
              fill="none"
              className="animate-pulse"
              style={{animationDelay: '2s'}}
            />
            <path
              d="M 0,270 Q 300,280 600,240 T 1200,240"
              stroke="black"
              strokeWidth="3"
              fill='none'
            />
            <path
              d="M 0,360 Q 300,320 600,360 T 1300,390"
              stroke="black"
              strokeWidth="3"
              fill="none"
            />
            
          </svg>
        </div>

        {/* Metrics display */}
        <div className="relative z-10 space-y-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={metric.id}
                className={`flex items-center ${isEven ? 'justify-start' : 'justify-end'} w-full`}
              >
                <div
                  className={`relative group transition-all duration-700 hover:scale-105 ${
                    isEven ? 'animate-slideInLeft' : 'animate-slideInRight'
                  } w-120`}
                  style={{
                    animationDelay: `${index * 200}ms`,
                    animationFillMode: 'both'
                  }}
                  onMouseEnter={() => animateMetric(metric.id, metric.target)}
                >
                  {/* Floating background blur */}
                  <div className="absolute -inset-2 bg-white rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  
                  {/* Main container */}
                  <div className="relative flex items-center gap-6 p-3 bg-black/70 text-white backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                    {/* Icon section */}
                    <div className="flex-shrink-0 bg-red-50 p-4 rounded-2xl">
                        <div className="bg-red-600 p-3 rounded-xl">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    
                    {/* Content section */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-4 mb-2">
                        <h3 className="text-lg font-semibold text-white">{metric.label}</h3>
                        <div className="text-sm font-medium text-gray-200">
                          {metric.change}
                        </div>
                      </div>
                      
                      <div className="text-3xl font-bold text-white mb-1">
                        {metric.format(animatedValues[metric.id])}
                      </div>
                      
                      {/* Progress bar */}
                      <div className="w-full bg-red-700 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-1000 ease-out`}
                          style={{
                            width: `${(animatedValues[metric.id] / metric.target) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Mobile version with FIXED single column layout
import { Rocket, Layers, Building2, Settings2 } from 'lucide-react';

const GrowingSectionMobile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    years: 0,
    projects: 0,
    clients: 0,
    technologies: 0
  });

  const targets = {
    years: 11,
    projects: 100,
    clients: 50,
    technologies: 75
  };

  useEffect(() => {
    setIsVisible(true);
    const animateCounters = () => {
      const duration = 2000;
      const steps = 50;
      const interval = duration / steps;
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        setCounters({
          years: Math.floor(targets.years * progress),
          projects: Math.floor(targets.projects * progress),
          clients: Math.floor(targets.clients * progress),
          technologies: Math.floor(targets.technologies * progress)
        });
        if (currentStep >= steps) {
          clearInterval(timer);
          setCounters(targets);
        }
      }, interval);
    };
    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      icon: <Rocket className="w-7 h-7 text-white" />,
      key: 'years',
      label: "Years of Success",
      suffix: "+",
      sub: "11+ years and counting"
    },
    {
      icon: <Layers className="w-7 h-7 text-white" />,
      key: 'projects',
      label: "Projects Under Our Belt",
      suffix: "+",
      sub: "Growing portfolio"
    },
    {
      icon: <Building2 className="w-7 h-7 text-white" />,
      key: 'clients',
      label: "Clients",
      suffix: "+",
      sub: "Trusted partnerships"
    },
    {
      icon: <Settings2 className="w-7 h-7 text-white" />,
      key: 'technologies',
      label: "Technologies",
      suffix: "+",
      sub: "Cutting-edge stack"
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto relative overflow-hidden min-h-screen flex flex-col px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex-1 flex flex-col justify-center">
        <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="relative inline-block">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-6 relative bg-gradient-to-br from-red-600 to-red-800">
              <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              <div className="absolute inset-0 rounded-full animate-ping border-2 bg-gradient-to-r from-red-400 to-red-600" style={{ WebkitMaskImage: 'radial-gradient(white, black)', borderColor: 'transparent', boxShadow: '0 0 0 4px rgba(220, 38, 38, 0.1)', animationDuration: '2.5s' }}></div>
              <div className="absolute inset-0 rounded-full animate-ping bg-gradient-to-r from-red-400 to-red-600" style={{ animationDelay: '2s', WebkitMaskImage: 'radial-gradient(white, black)', borderColor: 'transparent', boxShadow: '0 0 0 4px rgba(220, 38, 38, 0.1)', animationDuration: '2.5s' }}></div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">WE ARE</h1>
          <h2 className="text-4xl sm:text-5xl font-black mt-2 text-red-700">GROWING</h2>
        </div>
        <div className={`mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-end justify-center h-20 sm:h-24 space-x-2">
            {[30, 50, 70, 90, 100].map((height, i) => (
              <div
                key={i}
                className="flex-1 max-w-6 rounded-t-lg animate-pulse"
                style={{
                  height: `${height}%`,
                  background: 'linear-gradient(to top, #dc2626, #ef4444)',
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '2s',
                  opacity: 0.8
                }}
              />
            ))}
          </div>
        </div>
        {/* FIXED: Changed from grid-cols-1 sm:grid-cols-2 to just grid-cols-1 to keep single column for all mobile screens */}
        <div className="grid grid-cols-1 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'} bg-white rounded-xl p-4 flex flex-col justify-between h-full shadow-md hover:shadow-lg border border-red-100`}
              style={{ transitionDelay: `${index * 200 + 500}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-red-100">
                    {React.cloneElement(stat.icon, { className: "w-5 h-5 sm:w-6 sm:h-6 text-red-700" })}
                  </div>
                  <span className="text-gray-900 text-base sm:text-lg font-semibold">{stat.label}</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-red-700">
                  {counters[stat.key]}{stat.suffix}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-red-600 to-red-500"
                  style={{ width: `${(counters[stat.key] / targets[stat.key]) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Custom hook to check screen size
const useMobileCheck = () => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    // Initial check
    setIsMobile(mediaQuery.matches);
    
    // Function to update state on change
    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches);
    };
    
    // Add listener for changes
    mediaQuery.addListener(handleMediaQueryChange);
    
    // Cleanup
    return () => mediaQuery.removeListener(handleMediaQueryChange);
  }, []);
  
  return isMobile;
};

const GrowingSection = () => {
  const isMobile = useMobileCheck();
  
  // Debug log
  useEffect(() => {
  }, [isMobile]);

  return (
    <>
      {isMobile ? <GrowingSectionMobile /> : <MetricsDesktopView />}
    </>
  );
};

export default GrowingSection;