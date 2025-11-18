"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Rocket, RefreshCw, Link2, Lightbulb, Wrench, Book, Lock, Bot } from 'lucide-react';

const SAPHero = () => {
  // Add smooth scroll behavior for anchor links
  useEffect(() => {
    const scrollToSection = (e) => {
      // Only handle anchor links that start with '#'
      if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Calculate the header height (adjust selector if your header has a different class/ID)
          const headerHeight = document.querySelector('header')?.offsetHeight || 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20; // 20px extra spacing

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Update URL without adding to history
          if (history.pushState) {
            history.pushState(null, null, targetId);
          } else {
            window.location.hash = targetId;
          }
        }
      }
    };

    // Add event listener to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', scrollToSection);
    });

    // Handle initial page load with hash
    const handleInitialScroll = () => {
      if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
          const headerHeight = document.querySelector('header')?.offsetHeight || 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    // Wait for the page to be fully loaded
    if (document.readyState === 'complete') {
      handleInitialScroll();
    } else {
      window.addEventListener('load', handleInitialScroll);
    }

    // Cleanup
    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener('click', scrollToSection);
      });
      window.removeEventListener('load', handleInitialScroll);
    };
  }, []);
  const services = [
    { id: 1, name: 'SAP Implementation', icon: <Rocket size={24} color="red" /> },
    { id: 2, name: 'SAP Rollout ', icon: <RefreshCw size={24} color="red" /> },
    { id: 3, name: 'SAP Support', icon: <Link2 size={24} color="red" /> },
    { id: 4, name: 'SAP Upgrade', icon: <Lightbulb size={24} color="red" /> },
    { id: 5, name: 'SAP Integration', icon: <Wrench size={24} color="red" /> },
    { id: 6, name: 'SAP Migration', icon: <Book size={24} color="red" /> },
    { id: 7, name: 'SAP Automation', icon: <Bot size={24} color="red" /> },
    { id: 8, name: 'SAP Testing', icon: <Lock size={24} color="red" /> },
  ];

  return (
    <section className="relative">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-6">
            

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                Transform Your Business with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                  Expert SAP Solutions
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                From implementation to optimization, we deliver all 8 essential SAP services 
                to drive your digital transformation and unlock your business potential.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 ">
            <Link 
  href="#services"
  scroll={false} // Prevent default scroll behavior
  className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/30 transform hover:scale-105 hover:-translate-y-1"
>
  Explore Our Services
  <ArrowRight className="w-5 h-5" />
</Link>

              <button 
                onClick={() => {
                  // Dispatch event to open CTA form
                  window.dispatchEvent(new Event('openConsultationForm'));
                }}
                className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-lg font-semibold transition-all duration-200 border border-gray-300 hover:border-red-400 shadow hover:shadow-md transform hover:scale-105"
              >
                Schedule Consultation
              </button>
              
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              <div>
                <div className="text-3xl font-bold text-red-600">100+</div>
                <div className="text-sm text-gray-500">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600">10+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600">98%</div>
                <div className="text-sm text-gray-500">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Content - Services Grid */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-red-500/20 blur-3xl" />
            
            <div className="relative grid grid-cols-2 -p-10 gap-3 sm:gap-7">
              {services.map((service, index) => (
                <Link
                  key={service.id}
                  href={`/${service.name.toLowerCase().replace(/\s+/g, '-')}-services`}
                  className="block group"
                >
                  <div
                    className=" h-full bg-white border border-gray-200 rounded-xl p-5 sm:p-6 md:p-6 hover:bg-red-50 hover:border-red-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="flex items-start sm:items-center gap-5 sm:gap-5">
                      <div className="text-2xl sm:text-3xl flex-shrink-0">{service.icon}</div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-lg sm:text-md text-gray-900 group-hover:text-red-600 transition-colors break-words">
                          {service.name}
                          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-500/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-red-400/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SAPHero;