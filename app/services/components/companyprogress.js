'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Lottie with no SSR
const Lottie = dynamic(
  () => import('lottie-react').then(mod => mod.default || mod),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-48 sm:h-64 md:h-80 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-500 text-sm sm:text-base">Loading animation...</div>
      </div>
    )
  }
);

const CompanyProgressSection = () => {
    const [businessAnimation, setBusinessAnimation] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const loadAnimationData = async () => {
        try {
          setIsLoading(true);
          setError(null);
          
          const response = await fetch('https://res.cloudinary.com/dwlw1nykn/raw/upload/v1763448646/Profit_Gains_lzobwx.json');
          
          if (!response.ok) {
            throw new Error(`Failed to load animation: ${response.status} ${response.statusText}`);
          }
          
          const data = await response.json();
          
          // Basic validation of the animation data
          if (!data || typeof data !== 'object' || !data.v || !data.fr) {
            throw new Error('Invalid animation data format');
          }
          
          setBusinessAnimation(data);
        } catch (err) {
          console.error('Error loading business animation:', err);
          setError('Failed to load animation. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      };
      
      loadAnimationData();
    }, []);
  
    return (
      <div className="min-h-* bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            <div className="space-y-3 sm:space-y-4">
              <p className="text-red-500 font-medium text-sm sm:text-lg tracking-wide uppercase">
                Company progress
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                A leading IT technology
                <br className="hidden sm:block" />
                services provider, enterprise
                <br className="hidden sm:block" />
                software makers
              </h1>
            </div>
            
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-lg">
              Started in the year of 2013 SAP Partner in India for one of
              the most valuable brand in manufacturing industry, we
              chose to move up for sustainable growth using narrow
              focus on enterprise software consulting, implementation
              and maintenance support.
            </p>
            
            <a href="/about">
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-5 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg transition-colors duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto">
                Read More
              </button>
            </a>
          </div>
  
          {/* Right Side - Image with Decorative Elements */}
          <div className="relative order-1 lg:order-2">
            {/* Background decorative stroke */}
            
            {/* Lottie Animation placeholder */}
            <div className="relative">
              <div className="bg-[#fff5f5] p-4 sm:p-6 rounded-lg">
                {isLoading ? (
                  <div className="w-full h-48 sm:h-64 md:h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-gray-500 text-sm sm:text-base">Loading animation...</div>
                  </div>
                ) : error ? (
                  <div className="w-full h-48 sm:h-64 md:h-80 bg-red-50 rounded-lg flex flex-col items-center justify-center p-4 text-center">
                    <div className="text-red-500 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <p className="text-red-600 text-sm sm:text-base">{error}</p>
                    <button 
                      onClick={() => window.location.reload()} 
                      className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  <Lottie 
                    animationData={businessAnimation}
                    loop={true}
                    className="w-full h-48 sm:h-64 md:h-80 object-contain rounded-lg"
                    aria-label="Business growth animation"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default CompanyProgressSection;