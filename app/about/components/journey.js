'use client';

import { useState, useEffect ,useRef, useMemo, useCallback } from 'react';
import { SparklesIcon, ChartBarIcon, UserGroupIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const Journey = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStory, setActiveStory] = useState(0);
  const [timelineInView, setTimelineInView] = useState(false);
  const [visibleBeats, setVisibleBeats] = useState([]);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: timelineRef, inView: timelineVisible } = useInView({ 
    threshold: 0.1, // Reduced threshold for earlier detection
    triggerOnce: true,
    rootMargin: '0px 0px -100px 0px' // Start animation slightly before element is in view
  });
  
  const stats = [
    { number: 11, label: 'Years of Experience', icon: '🚀' },
    { number: 200, label: 'Clients', icon: '🏆'},
    { number: 450, label: 'Projects Under Our Belt', icon: '🛠️' },
  ];

  const storyBeats = [
    {
      year: '2013',
      title: 'The Foundation',
      description: 'Connecting Roots was founded with a vision to revolutionize enterprise software implementation and make SAP accessible to businesses of all sizes.',
      icon: <SparklesIcon className="w-6 h-6" />,
      color: 'from-red-400 to-orange-400'
    },
    {
      year: '2017',
      title: 'Strategic Growth',
      description: 'Expanded our services and expertise, establishing ourselves as a trusted SAP partner with innovative solutions and exceptional client satisfaction.',
      icon: <ChartBarIcon className="w-6 h-6" />,
      color: 'from-blue-400 to-cyan-400'
    },
    {
      year: '2020',
      title: 'Team Excellence',
      description: 'Built a world-class team of SAP consultants, developers, and project managers, focusing on delivering transformative business solutions.',
      icon: <UserGroupIcon className="w-6 h-6" />,
      color: 'from-purple-400 to-pink-400'
    },
    {
      year: '2025',
      title: 'Industry Leadership',
      description: 'Today, we lead the industry with cutting-edge SAP solutions, helping businesses achieve digital transformation and sustainable growth.',
      icon: <LightBulbIcon className="w-6 h-6" />,
      color: 'from-green-400 to-emerald-400'
    }
  ];

  // Memoize the story beats to prevent unnecessary re-renders
  const memoizedStoryBeats = useMemo(() => storyBeats, [storyBeats]);

  const teamQuotes = [
    "We don't just code, we craft experiences",
    "Turning enterprise nightmares into digital dreams",
    "Where innovation meets implementation"
  ];

  // Optimized auto-cycle effect with requestAnimationFrame
  const animationRef = useRef();
  const lastUpdateTime = useRef(0);
  const targetInterval = 4000; // 4 seconds between updates
  
  const updateActiveStory = useCallback(() => {
    const now = performance.now();
    if (now - lastUpdateTime.current >= targetInterval) {
      setActiveStory(prev => (prev + 1) % memoizedStoryBeats.length);
      lastUpdateTime.current = now;
    }
    animationRef.current = requestAnimationFrame(updateActiveStory);
  }, [memoizedStoryBeats.length]);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Start the animation loop
    animationRef.current = requestAnimationFrame(updateActiveStory);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [updateActiveStory]);

  // Optimized timeline reveal animation with requestAnimationFrame
  const animationFrameId = useRef();
  
  useEffect(() => {
    if (!timelineVisible) return;
    
    setTimelineInView(true);
    const startTime = performance.now();
    const staggerDelay = 100; // 100ms delay between items
    
    const animate = () => {
      const elapsed = performance.now() - startTime;
      const currentIndex = Math.min(
        Math.floor(elapsed / staggerDelay),
        memoizedStoryBeats.length - 1
      );
      
      setVisibleBeats(prev => {
        // Only update if we have new items to add
        return prev.length <= currentIndex 
          ? [...Array(currentIndex + 1).keys()] 
          : prev;
      });
      
      if (currentIndex < memoizedStoryBeats.length - 1) {
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };
    
    animationFrameId.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [timelineVisible, memoizedStoryBeats.length]);

  // Add a ref for the timeline container and throttle the mousemove handler
  const timelineContainerRef = useRef(null);
  const lastHoveredIndex = useRef(-1);
  const rafId = useRef();
  
  // Throttled mouse move handler for interactive timeline
  const handleTimelineMouseMove = useCallback((e) => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    rafId.current = requestAnimationFrame(() => {
      const container = timelineContainerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const beatWidth = rect.width / memoizedStoryBeats.length;
      const hoveredIndex = Math.min(
        memoizedStoryBeats.length - 1,
        Math.max(0, Math.floor(x / beatWidth))
      );
      
      // Only update if the index has changed
      if (hoveredIndex !== lastHoveredIndex.current) {
        lastHoveredIndex.current = hoveredIndex;
        setActiveStory(hoveredIndex);
      }
    });
  }, [memoizedStoryBeats.length]);

  return (
    <section className="relative min-h-* overflow-hidden pt-10">
          {/* Enhanced Professional Journey Timeline */}
          <div 
            ref={timelineRef}
            className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                A Legacy of Innovation, Celebrating the Milestones That Have Transformed Our Industry
              </p>
            </div>
            
            <div
              className="relative mb-12 max-w-6xl mx-auto"
              ref={timelineContainerRef}
              onMouseMove={handleTimelineMouseMove}
              style={{ cursor: 'pointer' }}
            >
              {/* Professional Timeline Container */}
              <div className="relative">
                {/* Animated Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-red-600 rounded-full h-full">
                  <div 
                    className={`w-full bg-gradient-to-b from-red-600 via-cyan-500 to-purple-600 rounded-full transition-all duration-200 ease-out ${
                      timelineInView ? 'h-full' : 'h-0'
                    }`}
                    style={{
                      transitionDelay: '300ms'
                    }}
                  />
                </div>
                
                {/* Timeline Items - Desktop (horizontal) */}
                <div className="hidden md:block">
                  <div className="space-y-8 md:space-y-16 py-4 md:py-8">
                    {storyBeats.map((beat, index) => (
                      <div
                        key={index}
                        className={`relative transition-all duration-400 ease-out ${
                          visibleBeats.includes(index) 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-12'
                        }`}
                        style={{
                          transitionDelay: `${index * 100 + 100}ms`
                        }}
                      >
                        {/* Timeline Node - Desktop */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 z-30">
                          <div className={`relative transition-all duration-200 ${
                            index === activeStory ? 'scale-110' : 'scale-100'
                          }`}>
                            {index === activeStory && (
                              <div className="absolute inset-0 rounded-full animate-pulse">
                                <div className={`w-16 h-16 md:w-24 md:h-24 bg-red-100 rounded-full opacity-30 blur-md`} />
                              </div>
                            )}
                            <div className={`relative w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl border-4 transition-all duration-200 ${
                              index === activeStory 
                                ? 'border-red-400 shadow-3xl' 
                                : 'border-gray-200'
                            }`}>
                              <div className="absolute inset-0 bg-white/10 rounded-full backdrop-blur-sm" />
                              <div className={`relative transition-all duration-300 ${
                                index === activeStory ? 'scale-110' : 'scale-100'
                              }`}>
                                {beat.icon}
                              </div>
                            </div>
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 md:px-3 py-1 bg-red-600 rounded-full text-white text-xs md:text-sm font-bold shadow-lg">
                              {beat.year}
                            </div>
                          </div>
                        </div>
                        {/* Content Cards - Professional Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">
                          
                          {/* Left Content */}
                          <div className={`${index % 2 === 0 ? 'md:order-1' : 'md:order-2'} ${
                            index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'
                          }`}>
                            <div className={`transition-all duration-100 ${
                              visibleBeats.includes(index) 
                                ? 'opacity-100 translate-x-0' 
                                : index % 2 === 0 ? 'opacity-0 translate-x-8' : 'opacity-0 -translate-x-8'
                            }`} style={{ transitionDelay: `${index * 50 + 100}ms` }}>
                              
                              {/* Professional Title */}
                              <h3 className="text-base md:text-2xl font-bold text-gray-900 mb-2 md:mb-4 leading-tight">
                                {beat.title}
                              </h3>
                              
                              {/* Enhanced Description */}
                              <p className="text-gray-700 text-sm md:text-md leading-relaxed mb-4 md:mb-6">
                                {beat.description}
                              </p>
                              
                              {/* Key Achievement Metrics */}
                              <div className="flex flex-wrap gap-2 md:gap-4 justify-start">
                                {index === 0 && (
                                  <>
                                    <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                      <span className="text-sm text-slate-800">Founded</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                      <span className="text-sm text-slate-800">Vision Set</span>
                                    </div>
                                  </>
                                )}
                                {index === 1 && (
                                  <>
                                    <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                      <span className="text-sm text-slate-800">50+ Clients</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                      <span className="text-sm text-slate-800">Innovation Hub</span>
                                    </div>
                                  </>
                                )}
                                {index === 2 && (
                                  <>
                                    <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                      <span className="text-sm text-slate-800">150+ Projects</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                                      <span className="text-sm text-slate-800">Team of 25+</span>
                                    </div>
                                  </>
                                )}
                                {index === 3 && (
                                  <>
                                    <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                      <span className="text-sm text-slate-800">Industry Leader</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                                                                          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                      <span className="text-sm text-slate-800">Global Reach</span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Right Content - Visual Enhancement */}
                          <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} ${
                            index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'
                          }`}>
                            <div className={`transition-all duration-700 ${
                              visibleBeats.includes(index) 
                                ? 'opacity-100 translate-x-0' 
                                : index % 2 === 0 ? 'opacity-0 -translate-x-8' : 'opacity-0 translate-x-8'
                            }`} style={{ transitionDelay: `${index * 200 + 400}ms` }}>
                              
                              {/* Professional Card */}
                              <div className="relative bg-white rounded-2xl p-4 md:p-8 border border-gray-200 shadow-md group cursor-pointer 
                                ${index === activeStory ? 'scale-105 shadow-2xl border-red-400' : 'border-gray-200'} 
                                hover:scale-105 hover:shadow-2xl"
                              >
                                
                                {/* Card Header */}
                                <div className="flex items-center gap-4 mb-6">
                                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                                    <div className="w-6 h-6 text-white">
                                      {beat.icon}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="text-lg font-semibold text-gray-900">Milestone {index + 1}</h4>
                                    <p className="text-sm text-gray-600">Transformation Phase</p>
                                  </div>
                                </div>
                                
                                {/* Key Stats */}
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 mb-1">
                                      {index === 0 ? '5' : index === 1 ? '50' : index === 2 ? '150' : '200'}+
                                    </div>
                                    <div className="text-xs text-gray-600">
                                      {index === 0 ? 'Team Members' : index === 1 ? 'Happy Clients' : index === 2 ? 'Projects' : 'Success Stories'}
                                    </div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 mb-1">
                                      {index === 0 ? '1' : index === 1 ? '3' : index === 2 ? '5' : '11'}
                                    </div>
                                    <div className="text-xs text-gray-600">
                                      {index === 0 ? 'Office' : index === 1 ? 'Offices' : index === 2 ? 'Countries' : 'Years Strong'}
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-red-50 rounded-2xl opacity-0 transition-opacity duration-300 pointer-events-none" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Timeline Items - Mobile (vertical) */}
                <div className="block md:hidden">
                  <div className="relative flex flex-col items-center py-4 space-y-8">
                    {/* Vertical line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-red-600 rounded-full" style={{ transform: 'translateX(-50%)' }} />
                    {storyBeats.map((beat, index) => (
                      <div key={index} className="relative w-full flex flex-col items-center">
                        {/* Timeline Node - Mobile */}
                        <div className="z-10 mb-2">
                          <div className="relative w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-gray-200">
                            <div className="absolute inset-0 bg-white/10 rounded-full backdrop-blur-sm" />
                            <div className="relative text-white">
                              {beat.icon}
                            </div>
                          </div>
                          <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-red-600 rounded-full text-white text-xs font-bold shadow-lg">
                            {beat.year}
                          </div>
                        </div>
                        {/* Content Card - Mobile */}
                        <div className="w-full mt-2 mb-4">
                          <div className="bg-white rounded-2xl p-4 border border-gray-200">
                            <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight text-center">{beat.title}</h3>
                            <p className="text-gray-700 text-sm leading-relaxed mb-2 text-center">{beat.description}</p>
                            {/* Key Achievement Metrics (optional, can be stacked or inline) */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Timeline End Marker */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 bottom-0 transition-all duration-700 ${
                  timelineInView ? 'opacity-100' : 'opacity-0'
                }`} style={{ transitionDelay: '1200ms' }}>
                  <div className="w-6 h-6 bg-red-600 rounded-full border-2 border-gray-200" />
                </div>
              </div>
            </div>
          
      </div>

      
    </section>
  );
};

export default Journey;