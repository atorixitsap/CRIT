'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FaqSection1({ serviceName }) {
    const [activeId, setActiveId] = useState(null);
    const [hoveredId, setHoveredId] = useState(null);
    const [isAutoCycling, setIsAutoCycling] = useState(true);
    const [userInteracted, setUserInteracted] = useState(false);
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [serviceImage, setServiceImage] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile/tablet view
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Fetch FAQ data from JSON file - Only for specific service
    useEffect(() => {
        const fetchFaqs = async () => {
            if (!serviceName) {
                setError('No service specified');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('/json/data/faq.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch FAQ data');
                }
                const data = await response.json();
                
                // Convert service name to match JSON key format (lowercase with hyphens)
                const serviceKey = serviceName.toLowerCase().replace(/\s+/g, '-');
                
                // Check if the specific service exists in the data
                if (!data[serviceKey]) {
                    console.warn(`No FAQ data found for service: ${serviceName} (looked for key: ${serviceKey})`);
                    setFaqs([]);
                    setLoading(false);
                    return;
                }

                const transformedFaqs = [];
                const serviceData = data[serviceKey];

                // Extract serviceImage if present
                if (serviceData.serviceImage) {
                    setServiceImage(serviceData.serviceImage);
                }

                let questionIndex = 1;

                // Process questions directly from serviceData (Q1, Q2, Q3, etc.)
                Object.entries(serviceData)
                    .filter(([key]) => key !== 'logo' && key !== 'serviceImage') // Skip metadata
                    .forEach(([qKey, qData]) => {
                        if (qData && qData.question && qData.answer) {
                            const id = `${serviceName}-faq-${questionIndex}`;
                            const answer = Array.isArray(qData.answer) 
                                ? qData.answer.map((item, i) => (
                                    <React.Fragment key={i}>
                                        {i > 0 && <br />}
                                        • {item}
                                    </React.Fragment>
                                ))
                                : qData.answer;
                                
                            transformedFaqs.push({
                                id,
                                category: serviceName, // Use serviceName as category
                                serviceName,
                                q: qData.question,
                                a: answer
                            });
                            questionIndex++;
                        }
                    });
                
                setFaqs(transformedFaqs);
                
                // Set first FAQ as active by default if FAQs exist
                if (transformedFaqs.length > 0) {
                    setActiveId(transformedFaqs[0].id);
                }
                
            } catch (err) {
                console.error('Error loading FAQ data:', err);
                setError('Failed to load FAQ data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchFaqs();
    }, [serviceName]);

    // Memoize the FAQ IDs to prevent unnecessary effect re-runs
    const faqIds = useMemo(() => faqs.map(faq => faq.id), [faqs]);

    // Auto-cycling effect
    useEffect(() => {
        if (!isAutoCycling || userInteracted || faqIds.length === 0) return;

        const interval = setInterval(() => {
            setActiveId(prevId => {
                const currentIndex = faqIds.indexOf(prevId);
                const nextIndex = (currentIndex + 1) % faqIds.length;
                return faqIds[nextIndex];
            });
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoCycling, userInteracted, faqIds]);

    // Reset user interaction after delay
    useEffect(() => {
        if (!userInteracted) return;
        
        const timeout = setTimeout(() => {
            setUserInteracted(false);
            setIsAutoCycling(true);
        }, 5000);

        return () => clearTimeout(timeout);
    }, [userInteracted]);

    const handleFaqClick = (faqId) => {
        setActiveId(prevId => {
            if (isMobile && prevId === faqId) {
                return null;
            }
            return faqId;
        });
        setIsAutoCycling(false);
        setUserInteracted(true);
    };
  
    const handleMouseEnter = (faqId) => {
        if (!isMobile) {
            setHoveredId(faqId);
        }
    };
  
    const handleMouseLeave = () => {
        if (!isMobile) {
            setHoveredId(null);
        }
    };

    // Animation variants
    const cardVariants = {
        initial: { 
            opacity: 0, 
            x: -30,
            scale: 0.98 
        },
        animate: { 
            opacity: 1, 
            x: 0,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        },
        hover: {
            scale: 1.02,
            y: -2,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        active: {
            scale: 1.03,
            y: -4,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const answerVariants = {
        initial: { 
            opacity: 0, 
            height: 0,
            y: -10
        },
        animate: { 
            opacity: 1, 
            height: "auto",
            y: 0,
            transition: {
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        },
        exit: { 
            opacity: 0, 
            height: 0,
            y: -10,
            transition: {
                duration: 0.3,
                ease: "easeIn"
            }
        }
    };

    const arrowVariants = {
        initial: { rotate: 0 },
        hover: { 
            rotate: 15,
            x: 2,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        active: { 
            rotate: 90,
            x: 4,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    // Loading state
    if (loading) {
        return (
            <section className="relative min-h-* py-16 md:py-20 overflow-hidden pb-20 bg-[#fff5f5]">
                <div className="relative mx-auto max-w-6xl px-4 sm:px-5 lg:px-7">
                    <div className="flex items-center justify-center min-h-[200px]">
                        <div className="text-lg text-gray-600 flex items-center gap-3">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
                            Loading {serviceName} FAQs...
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Error state
    if (error) {
        return (
            <section className="relative min-h-* py-16 md:py-20 overflow-hidden pb-20 bg-[#fff5f5]">
                <div className="relative mx-auto max-w-6xl px-4 sm:px-5 lg:px-7">
                    <div className="flex items-center justify-center min-h-[200px]">
                        <div className="text-center">
                            <div className="text-lg text-red-600 mb-2">{error}</div>
                            <div className="text-sm text-gray-500">
                                Service: {serviceName}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // No FAQs found for this service
    if (faqs.length === 0) {
        return (
            <section className="relative min-h-* py-16 md:py-20 overflow-hidden pb-20 bg-[#fff5f5]">
                <div className="relative mx-auto max-w-6xl px-4 sm:px-5 lg:px-7">
                    <div className="flex items-center justify-center min-h-[200px]">
                        <div className="text-center">
                            <div className="text-lg text-gray-600 mb-2">
                                No FAQs available for {serviceName}
                            </div>
                            <div className="text-sm text-gray-500">
                                Please check back later or contact support for more information.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
  
    return (
        <section className="relative min-h-* py-16 md:py-20 overflow-hidden pb-20 bg-[#fff5f5]">
            <div className="relative mx-auto max-w-6xl px-4 sm:px-5 lg:px-7">
                {/* Header */}
                <div className="mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-1">
                            <span className="text-black">
                                Frequently Asked Questions
                            </span>
                        </h2>
                        <div className="flex justify-center">
                            <svg className="mx-auto" width="160" height="18" viewBox="0 0 220 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 18 Q 110 8, 215 14" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" fill="none"/>
                                <path d="M15 21 Q 120 15, 200 18" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" fill="none"/>
                            </svg>
                        </div>
                        
                        {/* Service Info */}
                        <div className="text-center mt-6">
                            <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span className="text-sm font-medium text-red-700">
                                    {faqs.length} Question{faqs.length !== 1 ? 's' : ''} Available
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* FAQ Container */}
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
                    {/* Left Side - Questions */}
                    <div className="max-w-4xl mx-auto space-y-4 lg:max-w-none">
                        {faqs.map((faq, index) => {
                            const isActive = activeId === faq.id;
                            const isHovered = hoveredId === faq.id;
                            
                            return (
                                <motion.div
                                    key={faq.id}
                                    variants={cardVariants}
                                    initial="initial"
                                    animate="animate"
                                    whileHover={!isActive ? "hover" : "active"}
                                    transition={{ delay: index * 0.1 }}
                                    onMouseEnter={() => handleMouseEnter(faq.id)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleFaqClick(faq.id)}
                                    className="relative cursor-pointer group"
                                >
                                    <motion.div
                                        className={`relative p-5 rounded-2xl border-2 transition-all duration-500 ease-out ${
                                            isActive
                                                ? 'bg-red-500 border-red-500 shadow-2xl shadow-red-500/25'
                                                : isHovered
                                                ? 'bg-white border-red-200 shadow-xl shadow-gray-200/50'
                                                : 'bg-white border-gray-200 shadow-md hover:shadow-lg'
                                        }`}
                                    >
                                        <div className="relative flex items-start gap-3">
                                            {/* Number */}
                                            <motion.div
                                                className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base transition-all duration-400 ease-out ${
                                                    isActive
                                                        ? 'bg-white text-red-500 shadow-lg'
                                                        : isHovered
                                                        ? 'bg-red-100 text-red-600'
                                                        : 'bg-red-50 text-red-600'
                                                }`}
                                                animate={{
                                                    scale: isActive ? 1.1 : isHovered ? 1.05 : 1,
                                                }}
                                                transition={{ duration: 0.3, ease: "easeOut" }}
                                            >
                                                {index + 1}
                                            </motion.div>

                                            {/* Question */}
                                            <div className="flex-1">
                                                <motion.p
                                                    className={`text-xs font-semibold tracking-wider mb-1 transition-all duration-400 ${
                                                        isActive 
                                                            ? 'text-red-100' 
                                                            : isHovered
                                                            ? 'text-red-500'
                                                            : 'text-red-400'
                                                    }`}
                                                >
                                                    {serviceName ? serviceName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Service'}
                                                </motion.p>
                                                <motion.h3
                                                    className={`text-base font-semibold transition-all duration-400 ${
                                                        isActive
                                                            ? 'text-white'
                                                            : isHovered
                                                            ? 'text-gray-800'
                                                            : 'text-gray-900'
                                                    }`}
                                                >
                                                    {faq.q}
                                                </motion.h3>
                                            </div>

                                            {/* Arrow */}
                                            <motion.svg
                                                variants={arrowVariants}
                                                initial="initial"
                                                animate={isActive ? "active" : isHovered ? "hover" : "initial"}
                                                className={`w-5 h-5 flex-shrink-0 transition-colors duration-400 ${
                                                    isActive
                                                        ? 'text-white'
                                                        : isHovered
                                                        ? 'text-red-500'
                                                        : 'text-red-400'
                                                }`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d={isMobile ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
                                                />
                                            </motion.svg>
                                        </div>
                                    </motion.div>

                                    {/* Mobile Answer */}
                                    <AnimatePresence>
                                        {isMobile && isActive && (
                                            <motion.div
                                                variants={answerVariants}
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                                className="overflow-hidden"
                                            >
                                                <div className="mt-4 bg-white rounded-2xl p-6 shadow-xl border-2 border-red-100">
                                                    <div className="inline-flex items-center gap-1.5 mb-4 bg-red-50 px-3 py-1.5 rounded-full">
                                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                                        <span className="text-xs font-semibold tracking-wider text-red-700">
                                                            {serviceName ? serviceName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Service'}
                                                        </span>
                                                    </div>
                                                    <div className="text-gray-600 leading-relaxed text-sm">
                                                        {faq.a}
                                                    </div>
                                                    {/* Service image removed from mobile view as per requirements */}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right Side - Desktop Answer */}
                    <div className="hidden lg:block lg:sticky lg:top-6 mt-8 lg:mt-1">
                        {faqs.map((faq) => (
                            activeId === faq.id && (
                                <div key={faq.id} className="relative">
                                    <motion.div 
                                        className="absolute -inset-3 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl opacity-50 blur-2xl"
                                        animate={{
                                            scale: [1, 1.05, 1],
                                            opacity: [0.3, 0.5, 0.3]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                    
                                    <motion.div 
                                        className="relative bg-white rounded-2xl p-7 shadow-2xl border-2 border-red-100"
                                        initial={{ scale: 0.95 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                    >
                                        <motion.div 
                                            className="inline-flex items-center gap-1.5 mb-5 bg-red-50 px-4 py-2 rounded-full"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1, duration: 0.4 }}
                                        >
                                            <motion.div 
                                                className="w-1.5 h-1.5 bg-red-500 rounded-full"
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ 
                                                    duration: 2, 
                                                    repeat: Infinity,
                                                    ease: "easeInOut" 
                                                }}
                                            />
                                            <span className="text-xs font-semibold tracking-wider text-red-700">
                                                {serviceName ? serviceName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Service'}
                                            </span>
                                        </motion.div>

                                        <motion.h3 
                                            className="text-xl font-bold text-gray-900 mb-3"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2, duration: 0.4 }}
                                        >
                                            {faq.q}
                                        </motion.h3>

                                        <motion.div 
                                            className="text-gray-600 leading-relaxed text-base"
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3, duration: 0.5 }}
                                        >
                                            {faq.a}
                                        </motion.div>
                                    </motion.div>
                                    
                                    {serviceImage && (
                                        <motion.div 
                                            className="mt-4"
                                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                                        >
                                            <div className="relative bg-white rounded-3xl p-8 shadow-2xl border-2 border-red-100 overflow-hidden">
                                                {/* Animated background elements */}
                                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-red-100 to-pink-100 rounded-full opacity-20 animate-pulse"></div>
                                                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-tr from-red-200 to-pink-200 rounded-full opacity-15"></div>
                                                
                                                {/* Header with icon */}
                                                <div className="relative mb-6">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="w-8 h-8 bg-[#dc2626] rounded-xl flex items-center justify-center shadow-lg">
                                                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                        <h4 className="text-xl font-bold bg-black bg-clip-text text-transparent">
                                                            {serviceName ? serviceName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Service'} Overview
                                                        </h4>
                                                    </div>
                                                    <p className="text-sm text-gray-600 font-medium">
                                                        Visual representation of our service capabilities
                                                    </p>
                                                </div>

                                                {/* Image container with enhanced styling */}
                                                <div className="relative group">
                                                    {/* Decorative frame */}
                                                    <div className="absolute -inset-2 rounded-2xl opacity-20 blur-sm group-hover:opacity-30 transition-opacity duration-300"></div>
                                                    
                                                    {/* Image with overlay effects */}
                                                    <div className="relative bg-white rounded-2xl shadow-xl border border-red-100">
                                                        <motion.div className="relative w-full h-44 overflow-hidden rounded-xl">
                                                            <motion.img
                                                                src={serviceImage}
                                                                alt={`${serviceName} service visualization`}
                                                                className="w-full h-full object-contain rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-105"
                                                                loading="lazy"
                                                                whileHover={{ scale: 1.02 }}
                                                                transition={{ duration: 0.3, ease: "easeOut" }}
                                                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                                                            />
                                                        </motion.div>
                                                        
                                                         </div>

                                                    {/* Info badge */}
                                                    <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg border border-red-100">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                            <span className="text-xs font-semibold text-gray-700">Live Service</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}