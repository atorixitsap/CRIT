"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import CtaForm from './CtaForm';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";

// 1. Update the slug for SAP Implementation Services
const services = [
  {
    name: "SAP Implementation Services",
    slug: "sap-implementation-services"
  },
  {
    name: "SAP Rollout Services",
    slug: "Rollout "
  },
  {
    name: "SAP Support Services",
    slug: "support"
  },
  {
    name: "SAP Upgrade Services",
    slug: "upgrade"
  },
  {
    name: "SAP Integration Services",
    slug: "integration"
  },
  {
    name: "SAP Migration Services",
    slug: "migration"
  },
  {
    name: "SAP Automation Services",
    slug: "automation"
  },
  {
    name: "SAP Testing Services",
    slug: "testing"
  },
  {
    name: "Data Analytics",
    slug: "data-analytics"
  }
];

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

const MenuItem = ({ setActive, active, item, href, pathname, children, textClass }) => {
  const isHovered = active === item;
  const normalizePathname = (path) => {
    if (!path) return '/';
    return path === '/' ? '/' : path.replace(/\/$/, '');
  };
  const normalizedPathname = normalizePathname(pathname);
  const normalizedHref = normalizePathname(href);
  const isCurrentPage = normalizedPathname === normalizedHref;
  const hasDropdown = item === "Services";

  return (
    <div 
      onMouseEnter={() => setActive(item)} 
      onMouseLeave={() => setActive(null)} 
      className="relative group"
    >
      <motion.a
        href={href}
        transition={{ duration: 0.3 }}
        className={`cursor-pointer text-lg px-2 font-mono relative transition-all duration-200
          hover:text-red-700
          ${isCurrentPage ? 'font-sans text-red-600 hover:!text-red-700' : 'text-white'}`}
      >
        <span className="inline-flex items-center gap-1 relative">
          {item}
          {hasDropdown && (
            <svg className={`w-4 h-4 ml-0.5 inline-block transition-colors duration-200 ${isCurrentPage ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          )}
          {isCurrentPage && (
            <motion.div
              layoutId="navbar-underline"
              className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-white"
              initial={false}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </span>
      </motion.a>
      {isHovered && children && (
        <>
          <div className="absolute top-full left-0 right-0 h-2 bg-transparent" />
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={transition}
            className="absolute top-full left-1/2 transform -translate-x-1/2 z-50"
            onMouseEnter={() => setActive(item)}
            onMouseLeave={() => setActive(null)}
          >
            <motion.div
              transition={transition}
              layoutId="active"
              className="bg-red-500 dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl min-w-[180px] min-h-[40px] flex items-center justify-center mt-2"
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </div>
  );
};

const Menu = ({ setActive, children }) => {
  return (
    <nav
      className="relative rounded-full border border-transparent bg-[#0c1c3c]/80 backdrop-blur-md shadow-input flex items-center justify-center space-x-8 px-8 py-3">
      {children}
    </nav>
  );
};

const ProductItem = ({ title, description, href }) => {
  return (
    <Link href={href} className="flex flex-col space-y-1 p-2 rounded-lg hover:bg-gray-800 transition-colors">
      <h4 className="text-base sm:text-lg md:text-xl font-medium text-white">
        {title}
      </h4>
    </Link>
  );
};

const ServiceItem = ({ title, description, href }) => {
  return (
    <Link href={href} className="flex flex-col space-y-1 p-2 rounded-lg hover:bg-gray-800 transition-colors">
      <h4 className="text-base sm:text-lg md:text-xl font-medium text-white">
        {title}
      </h4>
    </Link>
  );
};

const HoveredLink = ({ children, ...rest }) => {
  return (
    <Link
      {...rest}
      className="text-gray-300 hover:text-white transition-colors">
      {children}
    </Link>
  );
};

const createServiceSlug = (name) => {
  const serviceSlugs = {
    'SAP Implementation Services': 'sap-implementation-services',   
    'SAP Rollout Services': 'sap-rollout-services',
    'SAP Support Services': 'sap-support-services',
    'SAP Upgrade Services': 'sap-upgrade-services',
    'SAP Integration Services': 'sap-integration-services',
    'SAP Migration Services': 'sap-migration-services',
    'SAP Automation Services': 'sap-automation-services',
    'SAP Testing Services': 'sap-testing-services',
    'Data Analytics': 'data-analytics'
  };
  return serviceSlugs[name] || 
    name.toLowerCase()
      .replace(/services/gi, '')
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
      .replace(/-$/, '')
      + '-services';
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCtaForm, setShowCtaForm] = useState(false);
  const [active, setActive] = useState(null);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => { 
    setShowCtaForm(false); 
  }, [pathname]);

  useEffect(() => {
    const handleOpenConsultationForm = () => {
      setShowCtaForm(true);
      setIsMobileMenuOpen(false);
    };
    window.addEventListener('openConsultationForm', handleOpenConsultationForm);
    return () => {
      window.removeEventListener('openConsultationForm', handleOpenConsultationForm);
    };
  }, []);

  useEffect(() => { 
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    }; 
  }, [isMobileMenuOpen]);

  useEffect(() => { 
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const scrollToServices = (e) => { 
    e.preventDefault(); 
    setIsMobileMenuOpen(false); 
    const servicesSection = document.getElementById('services-section'); 
    if (servicesSection) { 
      servicesSection.scrollIntoView({ behavior: 'smooth' }); 
    } else { 
      window.location.href = '/services'; 
    } 
  };

  return (
    <>
      <nav className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[100vw] max-w-7xl bg-black/50 backdrop-blur-xl shadow-2xl px-6 py-3 flex items-center justify-between rounded-full">
        {/* Logo and Brand */}
        <a href="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="relative w-8 h-8">
              <Image
                src="https://res.cloudinary.com/duz9xipfm/image/upload/v1753937310/CRIT-3D_cpzr1n_1_efzl5o.avif"
                alt="CRIT INDIA Logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
            <span className="ml-2 font-bold text-lg sm:text-xl md:text-2xl text-white tracking-wide">CRIT INDIA</span>
          </div>
        </a>

        {/* Hamburger Icon (Mobile Only) */}
        <button
          className="lg:hidden flex items-center justify-center p-1 rounded-md text-black bg-black/30 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop Menu (hidden on mobile) */}
        <div className="flex-1 items-center justify-center gap-8 hidden lg:flex ">
          <MenuItem setActive={setActive} active={active} item="Home" href="/" pathname={pathname} textClass="text-black hover:text-gray-700" />
          <MenuItem setActive={setActive} active={active} item="Products" href="/products" pathname={pathname} textClass="text-black hover:text-gray-700" />
          <MenuItem setActive={setActive} active={active} item="Services" href="/services" pathname={pathname} textClass="text-black hover:text-gray-700">
            {active === "Services" && (
              <div className="backdrop-blur-xl rounded-xl p-2 min-w-[400px]">
                <div className="grid grid-cols-2 gap-2">
                  {services.map((service, idx) => (
                    <Link
                      key={idx}
                      href={`/${createServiceSlug(service.name)}`}
                      className={`block px-4 py-2 rounded-xl text-white font-light hover:text-red-400 hover:bg-white/15 transition text-left ${idx === 0 ? 'font-bold' : ''}`}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Career" href="/career" pathname={pathname} textClass="text-black hover:text-gray-700" />
          <MenuItem setActive={setActive} active={active} item="About" href="/about" pathname={pathname} textClass="text-black hover:text-gray-700" />
          <MenuItem setActive={setActive} active={active} item="Contact" href="/contact" pathname={pathname} textClass="text-black hover:text-gray-700" />
        </div>

        {/* Get Consultation Button (desktop only) */}
        <button
          onClick={() => setShowCtaForm(true)}
          className="hidden lg:block rounded-full px-5 py-2 font-semibold text-black bg-gray-100 shadow-lg border border-white/20 hover:brightness-110 hover:scale-105 transition-all duration-200 text-base relative overflow-hidden transmit-bar cursor-pointer"
        >
          <span className="relative z-10">Get Consultation</span>
        </button>
        
        {/* CTA Form Modal */}
        {showCtaForm && (
          <CtaForm onClose={() => setShowCtaForm(false)} />
        )}
      </nav>

      {/* --- MODIFIED MOBILE MENU WITH BLACK THEME --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[101] bg-black/80 backdrop-blur-sm lg:hidden"
            />
            {/* Menu Panel - BLACK THEME */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-0 right-0 h-full z-[101] w-[18rem] sm:w-[22rem] max-w-sm bg-black/95 backdrop-blur-xl shadow-2xl flex flex-col lg:hidden border-l border-gray-800"
            >
              {/* Top Bar - BLACK THEME */}
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800 bg-black/50">
                <div className="flex items-center gap-2">
                  <img src="https://res.cloudinary.com/dujw4np0d/image/upload/v1751005553/CRIT-3D_cpzr1n.png" alt="CRIT logo" className="w-8 h-8 rounded" />
                  <span className="text-white font-bold text-base sm:text-lg md:text-xl">CRIT INDIA</span>
                </div>
                <button
                  className="text-gray-300 p-2 rounded hover:bg-gray-800 hover:text-white focus:outline-none transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Menu Items - BLACK THEME */}
              <nav className="flex-1 flex flex-col min-h-0 overflow-y-auto px-4 py-4 gap-2">
                <a href="/" className="block text-white text-base sm:text-lg md:text-xl font-semibold rounded-lg px-4 py-3 hover:bg-gray-800 transition" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
                <a href="/products" className="block text-white text-base sm:text-lg md:text-xl font-semibold rounded-lg px-4 py-3 hover:bg-gray-800 transition" onClick={() => setIsMobileMenuOpen(false)}>Products</a>
                <a href="/career" className="block text-white text-base sm:text-lg md:text-xl font-semibold rounded-lg px-4 py-3 hover:bg-gray-800 transition" onClick={() => setIsMobileMenuOpen(false)}>Career</a>
                <a href="/about" className="block text-white text-base sm:text-lg md:text-xl font-semibold rounded-lg px-4 py-3 hover:bg-gray-800 transition" onClick={() => setIsMobileMenuOpen(false)}>About</a>
                <a href="/contact" className="block text-white text-base sm:text-lg md:text-xl font-semibold rounded-lg px-4 py-3 hover:bg-gray-800 transition" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
                
                <div className="my-3 border-t border-gray-800" />
                
                {/* Expandable Services - ENHANCED GRID */}
                <button
                  className="w-full flex items-center justify-between text-white text-base sm:text-lg md:text-xl font-semibold rounded-lg px-4 py-3 hover:bg-gray-800 transition focus:outline-none text-left"
                  onClick={() => setMobileServicesOpen((open) => !open)}
                  aria-expanded={mobileServicesOpen}
                >
                  <span>Services</span>
                  <svg className={`w-5 h-5 ml-2 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* ENHANCED SERVICES GRID */}
                {mobileServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-900/80 backdrop-blur-sm shadow-lg rounded-xl p-4 mx-2 border border-gray-700"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {services.map((service, idx) => (
                        <Link
                          key={idx}
                          href={`/${createServiceSlug(service.name)}`}
                          className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:scale-105"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="font-medium">{service.name}</div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {/* CTA Button at the bottom - BLACK THEME */}
                <div className="mt-auto pt-4 mb-2">
                  <button
                    onClick={() => { setShowCtaForm(true); setIsMobileMenuOpen(false); }}
                    className="w-full rounded-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-red-600 via-red-700 to-red-800 shadow-lg border border-gray-700 hover:brightness-110 hover:scale-105 transition-all duration-200 text-base"
                  >
                    Get Consultation
                  </button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
