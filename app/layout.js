'use client';

import "./globals.css";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import ContactButton from "./components/ui/ContactButton";
import { Toaster } from "sonner";
import Script from "next/script";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import TawkToWidget from "./components/TawkToWidget";
import { patchThreeDeprecation } from "../lib/patchThreeDeprecation";

// Apply THREE.js deprecation patch
if (typeof window !== 'undefined') {
  patchThreeDeprecation();
}


export default function RootLayout({ children }) {
  const [hideButtons, setHideButtons] = useState(false);

  // Handle scroll behavior for Tawk.to widget
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;
      
      const footerTop = footer.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Toggle widget visibility based on scroll position
      if (window.Tawk_API && typeof window.Tawk_API.showWidget === 'function') {
        try {
          if (footerTop < windowHeight - 100) {
            window.Tawk_API.hideWidget();
          } else {
            window.Tawk_API.showWidget();
          }
        } catch (error) {
          console.error('Error toggling Tawk.to widget:', error);
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle scroll events for Tawk.to widget
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    let lastScrollTop = 0;
    let scrollTimeout;
    
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;
      
      const footerTop = footer.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Only update state if we've scrolled more than 10px
      if (Math.abs(scrollTop - lastScrollTop) < 10) return;
      lastScrollTop = scrollTop;
      
      // Hide buttons when footer is within 100px of viewport bottom
      const shouldHide = footerTop < windowHeight - 100;
      setHideButtons(shouldHide);
      
      // Clear any existing timeout
      if (scrollTimeout) clearTimeout(scrollTimeout);
      
      // Safely handle Tawk API with proper null checks
      if (typeof window !== 'undefined' && window.Tawk_API && typeof window.Tawk_API.hideWidget === 'function' && 
          typeof window.Tawk_API.showWidget === 'function') {
        try {
          if (shouldHide) {
            window.Tawk_API.hideWidget();
          } else {
            window.Tawk_API.showWidget();
          }
        } catch (error) {
          console.error('Error toggling Tawk.to widget:', error);
        }
      }
      
      // Use requestAnimationFrame for smoother animations and batch style updates
      if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
      }
      
      scrollTimeout = requestAnimationFrame(() => {
        try {
          const tawkIframe = document.querySelector('iframe[title*=Tawk]');
          if (tawkIframe) {
            // Batch style updates using requestAnimationFrame
            requestAnimationFrame(() => {
              tawkIframe.style.transition = 'opacity 0.3s, transform 0.3s';
              // Batch all style changes together
              tawkIframe.style.cssText += `
                opacity: ${shouldHide ? '0' : '1'};
                pointer-events: ${shouldHide ? 'none' : 'auto'};
                transform: ${shouldHide ? 'translateY(100%)' : 'translateY(0)'};
              `;
            });
          }
        } catch (err) {
          console.error('Error updating Tawk iframe styles:', err);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
      }
    };
  }, []);
  return (
    <html lang="en" className="h-screen" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://res.cloudinary.com/duz9xipfm/image/upload/v1753937310/CRIT-3D_cpzr1n_1_efzl5o.avif" type="image/png" />
      </head>
      <body
        className={`antialiased min-h-screen flex flex-col bg-[#fff5f5]`}
      >
        {/* GTM noscript */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WB25D87H"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `
          }}
        />
        {/* End Google Tag Manager (noscript) */}

        <div className="relative">
          <Navbar />
        </div>
        
        <div className="flex-1 flex flex-col max-w-[1800px] w-full mx-auto">
          {children}
          
        </div>
        <Footer />
        
        {/* Global Contact Button - Fixed Position */}
        <div className={`fixed bottom-8 right-8 z-50 transition-opacity duration-300 ${hideButtons ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <ContactButton variant="default" className="shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200" />
        </div>
        
        {/* Tawk.to Chat Widget - Positioned above contact button */}
        <TawkToWidget hideButtons={hideButtons} />        
      </body>
    </html>
  );
}
