'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { CheckCircle, ChevronRight, Clock, Users, Settings, Play, Pause } from 'lucide-react';

// Dynamically import Lottie with no SSR and loading component
const Lottie = dynamic(
  () => import('lottie-react').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
        <div className="animate-pulse text-gray-400">Loading animation...</div>
      </div>
    )
  }
);

// Memoized implementation steps data
const implementationSteps = [
  {
    id: 'assessment',
    title: 'Assessment & Planning',
    description: 'Assessment & Planning involves a thorough analysis of your current infrastructure and business needs. We identify key challenges and opportunities to tailor a strategic implementation plan. This plan outlines clear goals, timelines, and resource allocation to ensure a smooth project execution. Close collaboration with stakeholders ensures minimizing risks throughout the process.',
    icon: CheckCircle,
    iconColor: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    animationUrl: 'https://res.cloudinary.com/dwlw1nykn/raw/upload/v1763448934/Auditing_be7kkg.json',
    deliverables: ['Infrastructure Assessment', 'Implementation Roadmap', 'Resource Planning']
  },
  {
    id: 'design',
    title: 'Solution Design',
    description: 'Our experts craft a solution architecture tailored to your unique business goals and technical needs. This design ensures scalability, efficiency, and seamless integration with existing systems. By aligning technology with your strategic objectives, we create a robust foundation that supports your long-term growth and innovation.',
    icon: Settings,
    iconColor: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    animationUrl: 'https://res.cloudinary.com/dwlw1nykn/raw/upload/v1763449191/UIUX_Designer_ptbcot.json',
    deliverables: ['System Architecture', 'Technical Specifications', 'Integration Plan']
  },
  {
    id: 'implementation',
    title: 'Implementation',
    description: 'We execute the implementation carefully to ensure minimal disruption to your day-to-day business operations. Our team follows a structured approach with thorough testing and phased rollouts, maintaining system stability throughout. This ensures a smooth transition while keeping your business productive and uninterrupted.',
    icon: Clock,
    iconColor: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    animationUrl: 'https://res.cloudinary.com/dwlw1nykn/raw/upload/v1763453448/done_sbvvev.json',
    deliverables: ['System Deployment', 'Testing & QA', 'Performance Optimization']
  },
  {
    id: 'training',
    title: 'Training & Handover',
    description: 'We offer comprehensive training programs designed to equip your team with the knowledge and skills needed to effectively use the new system. Our hands-on sessions and tailored materials ensure a smooth adoption process, empowering your staff to maximize the system\'s benefits and enhance overall productivity.',
    icon: Users,
    iconColor: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    animationUrl: 'https://res.cloudinary.com/dwlw1nykn/raw/upload/v1763453759/referral_ngk1z8.json',
    deliverables: ['User Training', 'Documentation', 'Ongoing Support Setup']
  }
];

// Animation loading hook
const useAnimationLoader = () => {
  const [animations, setAnimations] = useState({});
  const [loadingStates, setLoadingStates] = useState({});
  const [errors, setErrors] = useState({});

  const loadAnimation = useCallback(async (step) => {
    if (animations[step.id] || loadingStates[step.id]) return;

    setLoadingStates(prev => ({ ...prev, [step.id]: true }));
    
    try {
      const response = await fetch(step.animationUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      setAnimations(prev => ({ ...prev, [step.id]: data }));
      setErrors(prev => ({ ...prev, [step.id]: null }));
    } catch (error) {
      console.error(`Error loading animation for ${step.id}:`, error);
      setErrors(prev => ({ ...prev, [step.id]: error.message }));
    } finally {
      setLoadingStates(prev => ({ ...prev, [step.id]: false }));
    }
  }, [animations, loadingStates]);

  return { animations, loadingStates, errors, loadAnimation };
};

const ImplementationProcess = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState(null);
  const { animations, loadingStates, errors, loadAnimation } = useAnimationLoader();

  // Memoized active step data
  const activeStepData = useMemo(() => implementationSteps[activeStep], [activeStep]);

  // Load animation for active step
  useEffect(() => {
    loadAnimation(activeStepData);
  }, [activeStepData, loadAnimation]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setActiveStep(prev => (prev + 1) % implementationSteps.length);
      }, 5000);
      setAutoPlayInterval(interval);
      return () => clearInterval(interval);
    } else {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        setAutoPlayInterval(null);
      }
    }
  }, [isAutoPlay, autoPlayInterval]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        setActiveStep(prev => prev > 0 ? prev - 1 : implementationSteps.length - 1);
      } else if (e.key === 'ArrowRight') {
        setActiveStep(prev => (prev + 1) % implementationSteps.length);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsAutoPlay(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleStepChange = useCallback((index) => {
    setActiveStep(index);
    setIsAutoPlay(false);
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlay(prev => !prev);
  }, []);

  const nextStep = useCallback(() => {
    setActiveStep(prev => (prev + 1) % implementationSteps.length);
  }, []);

  const prevStep = useCallback(() => {
    setActiveStep(prev => prev > 0 ? prev - 1 : implementationSteps.length - 1);
  }, []);

  return (
    <section className="py-8 bg-white pb-20" role="region" aria-labelledby="implementation-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
        <h1 className="text-4xl md:text-4xl lg:text-4xl font-extrabold mb-3 sm:mb-4">
            <span className="text-black">Our Implementation Process</span>
            <svg className="mx-auto my-0" style={{marginTop: '-4px'}} width="290" height="18" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 18 Q 70 8, 170 14" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" fill="none"/>
              <path d="M25 21 Q 100 15, 160 18" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A structured approach to ensure successful deployment and adoption of your solution
          </p>
        </div>

        {/* Step Navigation - responsive grid */}
        <div className="w-full px-2 sm:px-4 mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-5xl mx-auto min-w-[300px]" role="tablist" aria-label="Implementation steps">
            {implementationSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <button
                  key={step.id}
                  onClick={() => handleStepChange(index)}
                  role="tab"
                  aria-selected={activeStep === index}
                  aria-controls={`step-panel-${step.id}`}
                  className={`flex flex-col items-center py-2 sm:py-3 px-2 sm:px-4 rounded-md transition-all duration-150 transform hover:scale-[1.02] w-full
                    ${activeStep === index
                      ? `${step.bgColor} border-2 ${step.borderColor} shadow-md`
                      : 'hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md bg-white'
                    }`}
                >
                  <div 
                    className={`p-2 sm:p-3 rounded-full mb-1 transition-colors ${activeStep === index 
                      ? `bg-white ${step.iconColor} shadow-xs` 
                      : 'bg-gray-50 text-gray-500'}`}
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <h3 className="font-medium text-xs sm:text-sm md:text-base pt-1 sm:pt-2 text-gray-900 text-center leading-tight px-1 line-clamp-2">
                    {step.title}
                  </h3>
                  <span className="text-[8px] xs:text-[10px] sm:text-xs text-gray-500 mt-0.5">
                    Step {index + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl shadow-t-lg p-6 md:p-8" style={{ boxShadow: '0 -1px 5px -1px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05), 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div role="tabpanel" id={`step-panel-${activeStepData.id}`} aria-labelledby={`step-${activeStepData.id}`}>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  activeStepData.bgColor
                } ${activeStepData.iconColor}`}>
                  Step {activeStep + 1} of {implementationSteps.length}
                </span>
               
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {activeStepData.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {activeStepData.description}
              </p>

              {/* Deliverables */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Key Deliverables:</h4>
                <ul className="space-y-1">
                  {activeStepData.deliverables.map((deliverable, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between">
                <button
                  onClick={prevStep}
                  disabled={activeStep === 0}
                  className="inline-flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-lg"
                >
                  <ChevronRight className="mr-1 w-4 h-4 rotate-180" />
                  Previous
                </button>
                
                <button
                  onClick={nextStep}
                  className="inline-flex items-center px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors "
                >
                  Next: {implementationSteps[(activeStep + 1) % implementationSteps.length].title}
                  <ChevronRight className="ml-1 w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Animation Panel */}
            <div className="h-64 md:h-80 rounded-xl overflow-hidden relative">
              {errors[activeStepData.id] ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                  <div className="text-4xl mb-2">⚠️</div>
                  <div className="text-sm">Animation failed to load</div>
                  <button 
                    onClick={() => loadAnimation(activeStepData)}
                    className="mt-2 text-blue-600 hover:text-blue-800 text-sm underline"
                  >
                    Retry
                  </button>
                </div>
              ) : animations[activeStepData.id] ? (
                <Lottie
                  animationData={animations[activeStepData.id]}
                  loop={true}
                  style={{ height: '100%', width: '100%' }}
                  className="transition-opacity duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                    <div className="text-gray-400 text-sm">Loading animation...</div>
                  </div>
                </div>
              )}
              
              {/* Loading overlay */}
              {loadingStates[activeStepData.id] && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImplementationProcess;
