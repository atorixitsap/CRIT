'use client';
import React, { useEffect, useState } from 'react';
import SapHero from './components/service_hero';
import ServicesGrid1 from './components/s_cards';
import FaqSection1 from './components/faq';

export default function Services() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Clean up any duplicate modals
    const existingModals = document.querySelectorAll('[data-modal="cta"]');
    existingModals.forEach(modal => modal.remove());
  }, []);

  if (!isClient) {
    return (
      <div className="relative overflow-hidden max-w-[1800px] w-full mx-auto bg-[#fff5f5] min-h-screen">
        {/* SEO H1 - Only for search engines */}
        <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        Transform Your Business with Expert SAP Solutions
        </h1>
        <div className="h-screen w-full bg-gray-100 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#fff5f5]">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-red-500/[0.05] bg-[size:50px_50px]" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-red-50" />

      <div className="relative flex-1 w-full text-white pt-15 pb-10 sm:pb-18 sm:pb-22 md:pb-26">
        <div className="max-w-[90rem] mx-auto">
          <SapHero />
          <ServicesGrid1 />
        </div>
      </div>
    </div>
  );
}
