'use client';

import { useState, useEffect } from 'react';
import { SparklesIcon, ChartBarIcon, UserGroupIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { PointerHighlight } from './pointer-highlighter';

const AboutUsHero = () => {
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


  useEffect(() => {
    setIsVisible(true);
    
    // Auto-cycle through story beats
    const interval = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % storyBeats.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  // Optimized timeline reveal animation
  useEffect(() => {
    if (!timelineVisible) return;
    
    setTimelineInView(true);
    let timeouts = [];
    
    // Use requestAnimationFrame for better performance
    const startTime = performance.now();
    const staggerDelay = 300; // Reduced from 800ms to 300ms
    
    const animate = () => {
      const elapsed = performance.now() - startTime;
      const currentIndex = Math.min(
        Math.floor(elapsed / staggerDelay),
        storyBeats.length - 1
      );
      
      setVisibleBeats(prev => {
        // Only update if we have new items to add
        return prev.length <= currentIndex 
          ? [...Array(currentIndex + 1).keys()] 
          : prev;
      });
      
      if (currentIndex < storyBeats.length - 1) {
        timeouts.push(requestAnimationFrame(animate));
      }
    };
    
    timeouts.push(requestAnimationFrame(animate));
    
    // Cleanup function
    return () => {
      timeouts.forEach(id => cancelAnimationFrame(id));
    };
  }, [timelineVisible]);

  return (
    <div className="relative w-full min-h-[100vh] md:min-h-[100vh] lg:min-h-[70vh] xl:min-h-[60vh] overflow-hidden pt-20">
      {/* Optimized Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ zIndex: 0 }}
          onLoadStart={(e) => {
            // Lower the video quality on slower connections
            if (navigator.connection && 
                (navigator.connection.saveData || 
                 navigator.connection.effectiveType === 'slow-2g' || 
                 navigator.connection.effectiveType === '2g')) {
              e.target.playbackRate = 0.8;
            }
          }}
        >
          <source 
            src="https://res.cloudinary.com/duz9xipfm/video/upload/c_scale,w_1280/v1752208306/Office_Stock_Footage_-_People_Working_As_A_Team___Group_Meeting___Business_Footage_Free_Download_vkppj8.webm" 
            type="video/webm" 
          />
        </video>
      </div>
      
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"
        style={{ zIndex: 1 }}
      ></div>

      <section className="relative min-h-[100vh] lg:min-h-[70vh] xl:min-h-[60vh] flex items-center justify-center overflow-hidden px-4" style={{ zIndex: 2 }}>
        <div className="relative z-10 container mx-auto py-8 md:py-10 lg:py-12">
          <div className="text-center max-w-6xl mx-auto">
            
          
            {/* Unique About Us Header */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-3 mb-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white">
                  About The{' '}
                  
                  <PointerHighlight
        rectangleClassName="dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
        pointerClassName="text-yellow-500"
      >

                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-gradient-x">
                      Connecting Roots
                    </span>
                  </PointerHighlight>
                  
                </h1>
              </div>
              
              </div>

            {/* Mission Statement */}
            <div className={`transition-all pt-10 duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-black/15 backdrop-blur-lg rounded-2xl md:rounded-2xl p-6 md:p-8 mb-8 md:mb-12 border border-cyan-400/30 max-w-4xl mx-auto">
                <div className="flex items-center justify-center mb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                
                <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed">
                &quot;We're not just {' '}
                  <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 font-bold">
                    Implementing SAP 
                  </span>{' '}
                  , we're creating business value. We believe that your SAP system should be a strategic asset that drives efficiency, innovation, and growth.
                  &quot;
                </p>
              </div>
            </div>
            </div>
          </div>
        
      </section>
    </div>
  );
};

export default AboutUsHero;