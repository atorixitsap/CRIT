'use client';

import { ArrowRight, Linkedin, Twitter, Youtube, Facebook, MapPin, Phone, Mail } from "lucide-react";
import Sitemap from "../Sitemap";
import { useEffect, useState } from 'react';

const ModernFooter = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    // Add animation classes after mount to prevent hydration mismatch
    const elements = document.querySelectorAll('.animate-on-mount');
    elements.forEach(el => {
      el.classList.add('opacity-100', 'translate-y-0');
    });
  }, []);
  
  const socialLinks = [
    { name: "Linkedin", icon: Linkedin, href: "https://www.linkedin.com/company/connecting-root/" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Youtube", icon: Youtube, href: "#" },
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/people/Connecting-Roots-IT-Consulting-Services/100057630001672/" }
  ];

  const footerSections = [
    {
      title: "SAP Services",  
      links: [
        { name: "SAP Implementation", href: "/sap-implementation-services" },
        { name: "SAP Rollout ", href: "/sap-rollout-services" },
        { name: "SAP Support", href: "/sap-support-services" },
        { name: "SAP Upgrade", href: "/sap-upgrade-services" },
        { name: "SAP Integration", href: "/sap-integration-services" },
        { name: "SAP Migration", href: "/sap-migration-services" },
        { name: "SAP Automation", href: "/sap-automation-services" },
        { name: "SAP Testing", href: "/sap-testing-services" },
        { name: "Data Analytics", href: "/data-analytics" }
      ]
    },
    {
      title: "Our Products",
      links: [
        { name: "SAP S/4HANA", href: "/products" },
        { name: "SAP ARIBA", href: "/products" },
        { name: "SAP SuccessFactors", href: "/products" },
        { name: "SAP HYBRIS", href: "/products" },
        { name: "SAP Business Object", href: "/products" },
        { name: "SAP Concur", href: "/products" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Team", href: "/about" },
        { name: "Careers", href: "/career" },
        { name: "Contact", href: "/contact" },
        { name: "Blogs", href: "/blog" }
      ]
    },
    {
      title: "Get in Touch",
      isContact: true,
      contactInfo: {
        address: "1st Floor, 101-B, Police, Wireless Colony, Vishal Nagar, Pimple Nilakh Pune, Pimpri-Chinchwad, Maharashtra 411027",
        phone: "+91 7773954892",
        email: "info@critindia.com"
      }
    }
  ];

  return (
    <footer className="relative bg-black min-h-* overflow-hidden pt-10">
      {/* Loading state */}
      {!isMounted && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-pulse text-white">Loading...</div>
        </div>
      )}
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main central device mockup */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-64 h-40 bg-white/30 rounded-2xl animate-float border-2 border-orange-500/50 opacity-50">
          <div className="absolute top-4 right-4 w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-6 left-6 w-8 h-8 bg-white/40 rounded-lg border border-orange-500/50 opacity-90"></div>
        </div>
        
        {/* Floating circles */}
       
        {/* Animated elements - initially hidden, then animated in with JS */}
        <div className={`absolute top-32 right-24 w-6 h-6 bg-shape-tertiary rounded-full transition-all duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute top-20 right-1/4 w-3 h-3 bg-orange-500/50 rounded-full transition-all duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-1/3 left-20 w-5 h-5 bg-shape-secondary rounded-full transition-all duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`}></div>
        
        {/* Geometric shapes */}
        <div className={`absolute top-24 left-1/3 w-6 h-6 border-2 border-orange-500/50 rotate-45 transition-all duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-1/2 right-16 w-4 h-4 border border-shape-tertiary transition-all duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute top-1/3 right-1/3 w-8 h-8 border-2 border-orange-500/50 rounded-lg transition-all duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>

      

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Company Info - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <img 
                  src="https://res.cloudinary.com/duz9xipfm/image/upload/v1753937310/CRIT-3D_cpzr1n_1_efzl5o.avif" 
                  alt="Connecting Roots IT Logo" 
                  className="w-16 h-16 object-contain flex-shrink-0"
                />
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-white">Connecting Roots</h2>
                  <p className="text-base text-gray-400">SAP Excellence Partner</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-red-500">Transforming Business Through Technology</h3>
              <p className="text-gray-400 text-base leading-relaxed">
                Empowering enterprises with comprehensive SAP implementation and support services. We deliver
                tailored solutions that drive innovation and sustainable growth.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-800 transition-all duration-300 relative 
                    before:absolute before:inset-0 before:-m-1 before:bg-red-400/20 before:rounded-lg before:blur-sm before:opacity-60"
                  style={{
                    filter: "drop-shadow(0 0 5px rgba(59, 130, 246, 0.3))",
                  }}
                >
                  <social.icon className="w-5 h-5 text-white relative z-10 " />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links Grid - Right Side - FIXED: Changed to grid-cols-3 for all screen sizes */}
          <div className="lg:col-span-3 grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-3 sm:space-y-6">
                {section.isContact ? (
                  <>
              
                  </>
                ) : (
                  <>
                    <h3 className="text-sm sm:text-base md:text-[1.15rem] font-semibold text-red-500 tracking-wider">
                      {section.title}
                    </h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <a
                            href={link.href}
                            className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-xs sm:text-sm md:text-base"
                          >
                            {link.name}
                          </a>
                        </li>
                      ))}
                      {section.title === "Company" && (
                        <li>
                          <Sitemap />
                        </li>
                      )}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal divider */}
        <div className="relative border-t border-gray-700 my-8">
  <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-700 rounded-full"></div>
</div>
           
        {/* Get in Touch title */}
        <h3 className="text-base font-semibold text-red-500 tracking-wider  mb-4">Get in Touch</h3>

        {/* Get in Touch row */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
          
            <div className="flex flex-col">
              <span className="flex items-center">
                <MapPin className="w-4 h-4 text-orange-500 mr-2" />
                <span className="text-gray-400 text-base">{footerSections.find(section => section.isContact).contactInfo.address}</span>
              </span>
              <span className="flex items-center mt-2">
                <Phone className="w-4 h-4 text-orange-500 mr-2" />
                <a href={`tel:${footerSections.find(section => section.isContact).contactInfo.phone}`} className="text-gray-400 hover:text-orange-500 transition-colors duration-100 text-base">
                  {footerSections.find(section => section.isContact).contactInfo.phone}
                </a>
              </span>
              <span className="flex items-center mt-1">
                <Mail className="w-4 h-4 text-orange-500 mr-2" />
                <a href={`mailto:${footerSections.find(section => section.isContact).contactInfo.email}`} className="text-gray-400 hover:text-orange-500 transition-colors duration-300 text-base">
                  {footerSections.find(section => section.isContact).contactInfo.email}
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/20 pt-12 text-white">
          <div className="flex flex-col items-center space-y-4">
            <p className="text-xs text-center">
              2025 Connecting Roots. All rights reserved. | Transforming Business Through SAP Excellence
            </p>
            <div className="flex space-x-6 text-white">
              <a href="#" className="text-white hover:text-footer-link-hover text-xs transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-white hover:text-footer-link-hover text-xs transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-footer-text hover:text-footer-link-hover text-xs transition-colors duration-300">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-footer-bg via-transparent to-transparent pointer-events-none"></div>
    </footer>
  );
};

export default ModernFooter;