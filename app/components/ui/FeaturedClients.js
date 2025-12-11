'use client';


import React from 'react';
import { Building, Factory, Hospital } from 'lucide-react';

const FeaturedClients = () => {
  return (
    <div className="font-sans py-12 min-h-*">
      <div className="absolute top-0 left-0 w-full h-full opacity-10"></div>
      <div className="container mx-auto px-4 max-w-7xl text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 inline-block relative">
    <span className="text-black">Featured </span>
    <span style={{color: '#C8102E'}}>Clients</span>
   <svg className="mx-auto my-0" style={{marginTop: '-4px'}} width="160" height="18" viewBox="0 0 220 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5 18 Q 110 8, 215 14" stroke="#C8102E" strokeWidth="4" strokeLinecap="round" fill="none"/>
  <path d="M15 21 Q 120 15, 200 18" stroke="#A50034" strokeWidth="2" strokeLinecap="round" fill="none"/>
</svg>
  </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            { icon: Building, title: "Fortune 500", description: "Leading global technology corporation with successful SAP implementation across 25+ countries" },
            { icon: Factory, title: "Manufacturing Giant", description: "Major industrial manufacturer with seamless SAP Rollout  across European operations" },
            { icon: Hospital, title: "Healthcare Leader", description: "International healthcare provider with integrated SAP solutions across 100+ facilities" }
          ].map((client, index) => (
            <div 
              key={index} 
              className="group bg-[#ffffff] shadow-lg p-6 sm:p-8 rounded-lg transform-gpu transition-all duration-500 hover:translate-y-[-10px] hover:shadow-xl hover:shadow-[#F8BABA] cursor-pointer"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#fff0f0] flex items-center justify-center mb-4 sm:mb-6 transform-gpu transition-transform duration-500 ">
                <client.icon className="text-[#A50034] w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl mb-3 text-black">
                {client.title}
              </h3>
              <p className="text-[#4A4A4A] group-hover:text-black transition-colors text-sm sm:text-base">
                {client.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedClients;