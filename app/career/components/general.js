"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Briefcase, ExternalLink, ArrowRight, X, DollarSign, Calendar, Users, Award, Zap, Star, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const CareerPage = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const fileInputRef = useRef(null);
  const vantaRef = useRef(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger
  } = useForm({
    defaultValues: {
      fullName: '',
      position: '',
      experience: '',
      currentCtc: '',
      message: ''
    }
  });
  
  useEffect(() => {
    // Load Vanta.js scripts
    const loadVantaScripts = async () => {
      // Load Three.js
      if (!window.THREE) {
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        threeScript.onload = () => {
          // Load Vanta Birds
          const vantaScript = document.createElement('script');
          vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js';
          vantaScript.onload = () => {
            if (window.VANTA && vantaRef.current) {
              window.VANTA.BIRDS({
                el: vantaRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 2.00,
                scaleMobile: 1.00
              });
            }
          };
          document.head.appendChild(vantaScript);
        };
        document.head.appendChild(threeScript);
      } else {
        // Three.js already loaded, just load Vanta
        const vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js';
        vantaScript.onload = () => {
          if (window.VANTA && vantaRef.current) {
            window.VANTA.BIRDS({
              el: vantaRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00
            });
          }
        };
        document.head.appendChild(vantaScript);
      }
    };

    loadVantaScripts();

    // Cleanup function
    return () => {
      if (window.VANTA && window.VANTA.BIRDS) {
        // Clean up Vanta instance if needed
      }
    };
  }, []);

  const sapCareerInfo = {
    title: "SAP Career Opportunities at Connecting Roots",
    description: "Going beyond work, Life at Connecting Roots is brimming with a dynamic and fun environment; one where people not only ace at their field of expertise but also give meaning to their passion.\n\n  We provide opportunities for you to grow and excel in your career and beyond. Along with creating an impact on technology, you also have the chance to unleash your full potential at every stage of your career. Our expertise spans SAP implementation, customization, and comprehensive consulting services, ensuring our clients achieve maximum value from their SAP investments. ",
    requirements: [
      "Strong technical background in SAP technologies",
      "Excellent communication and problem-solving skills",
      "Ability to work in a fast-paced environment",
      "Willingness to travel for client projects",
      "Bachelor's degree in Computer Science or related field",
      "SAP certifications are preferred"
    ]
  };
   
  const handleLearnMore = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setSubmitError('Please upload a valid file type (PDF or Word document)');
      return;
    }
    
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setSubmitError('File size should be less than 5MB');
      return;
    }
    
    setSelectedFile(file);
    setValue('cv', file);
    await trigger('cv');
    setSubmitError('');
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');
    
    console.log('Current form data:', data);
    
    // Validate CV file
    if (!selectedFile) {
      setSubmitError('Please select a CV file');
      setIsSubmitting(false);
      return;
    }
    
    // Log each field with its value and length
    Object.entries(data).forEach(([key, value]) => {
      if (value && key !== 'cv') {
        console.log(`Field: ${key}, Value: ${value}, Length: ${String(value).length}`);
      }
    });
    
    console.log(`CV File: ${selectedFile.name}, Size: ${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`);
    
    try {
      // Create FormData object
      const formData = new FormData();
      formData.append('fullName', data.fullName?.trim() || '');
      formData.append('desiredPosition', data.position?.trim() || '');
      formData.append('experience', data.experience?.trim() || '');
      formData.append('currentCTC', data.currentCtc?.trim() || '');
      formData.append('message', data.message?.trim() || '');
      formData.append('cv', selectedFile);
      
      console.log('Data being sent to backend:', {
        fullName: data.fullName?.trim(),
        desiredPosition: data.position?.trim(),
        experience: data.experience?.trim(),
        currentCTC: data.currentCtc?.trim(),
        message: data.message?.trim(),
        hasCv: !!selectedFile,
        fileName: selectedFile?.name,
        fileSize: selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : 'N/A'
      });
      
      try {
        const apiUrl = 'https://crit-p-2.onrender.com'; // Production backend URL
        console.log('Making request to:', `${apiUrl}/api/opportunity/submit`);
        const response = await fetch(`${apiUrl}/api/opportunity/submit`, {
          method: 'POST',
          body: formData
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Server responded with error:', {
            status: response.status,
            statusText: response.statusText,
            errorData
          });
          throw new Error(`Server responded with status ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Response data:', result);
      
        console.log('Opportunity application submitted successfully:', result);
        
        // Reset form on success
        reset();
        setSelectedFile(null);
        
        // Show success message
        alert('Thank you for your application! We will get back to you soon.');
      } catch (error) {
        console.error('Error submitting career application:', {
          error: error.message,
          stack: error.stack,
          formData: {
            fullName: data.fullName?.trim(),
            position: data.position?.trim(),
            experience: data.experience?.trim(),
            currentCtc: data.currentCtc?.trim(),
            message: data.message?.trim(),
            hasCv: !!selectedFile
          }
        });
        setSubmitError(`Error submitting form: ${error.message}. Please check the console for more details.`);
      }
    } catch (error) {
      console.error('Error in opportunity form submission:', error);
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-2 sm:p-4 md:p-6">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] px-2 sm:px-4 py-6 pt-20">
        
        <div className="max-w-5xl mx-auto relative z-10 h-full flex items-center justify-center">
          <div className="bg-white/40 rounded-2xl p-6 sm:p-9 text-center relative overflow-hidden border border-red-100 w-full" ref={vantaRef}>
          <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
            
            <style jsx>{`
@keyframes moveGradient {
  0%, 100% { stop-color: #ffffff; stop-opacity: 1; }
  50% { stop-color: #ffffff; stop-opacity: 1; }
}
.burst-gradient stop {
  animation: moveGradient 2s linear infinite;
}
.linkedin-btn:hover .linkedin-logo {
  transform: rotate(360deg);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.linkedin-logo {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-overlay {
  backdrop-filter: blur(8px);
}
`}</style>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/50 bg-opacity-5 rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/50 bg-opacity-5 rounded-full blur-3xl transform -translate-x-16 translate-y-16"></div>
            
            
            <div className="relative z-10 ">
              <h1 className="text-2xl md:text-3xl text-gray font-bold mb-4">
                Looking for the Best IT Job?
              </h1>
              <p className="text-base md:text-lg mb-4 text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Join a team that thrives on innovation, creativity, and collaboration. At CRIT, we empower individuals to grow while building solutions that make an impact. Discover your next big opportunity today!
              </p>
              
            </div>
          </div>
        </div>
      </section>

      {/* SAP Career Information */}
      <section className="px-2 sm:px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main SAP Career Info */}
          <div className="bg-white rounded-2xl p-8 mb-8 border border-red-200">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {sapCareerInfo.title}
              <svg className="mx-auto my-0" style={{marginTop: '-4px'}} width="160" height="18" viewBox="0 0 220 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 18 Q 110 8, 215 14" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" fill="none"/>
                <path d="M15 21 Q 120 15, 200 18" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed text-justify mobile-justify-fix">
                {sapCareerInfo.description}
              </p>
            </div>

            {/* Requirements Section */}
            <div className="relative rounded-xl p-6 border border-gray-300 mb-6 overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://res.cloudinary.com/dwlw1nykn/image/upload/v1763445068/image_9_wjrqzh.avif" 
                  alt="Background" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-white/90"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award size={20} className="text-red-600" />
                  Requirements
                </h3>
                <div className="space-y-2">
                  {sapCareerInfo.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-2 text-gray-900">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-md">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-gray-400 to-gray-500 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-4">Ready to Join Our SAP Team?</h3>
              <p className="text-white-100 mb-6">
                Send your resume and cover letter to our HR team. We'll get back to you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                
                <a
                  href="mailto:info@critindia.com"
                  className="text-white hover:text-red-300 transition-colors duration-200 flex items-center gap-2 font-medium"
                >
                  <span>Email: info@critindia.com</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Details Modal */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay">
          <div className="absolute inset-0 bg-black/50" onClick={closeModal}></div>
          <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white rounded-t-2xl p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedJob.title}</h2>
                  <div className="flex items-center gap-4 text-gray-600 text-sm">
                    <span className="flex items-center gap-1">
                      <MapPin size={16} />
                      {selectedJob.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase size={16} />
                      {selectedJob.experience}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign size={16} />
                      {selectedJob.salary}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Company Info */}
              <div className="bg-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src="https://res.cloudinary.com/dwlw1nykn/image/upload/v1763445068/image_cabbfi.avif"
                      alt="CRIT Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">{selectedJob.company}</h3>
                    <p className="text-black text-sm pt-1">Posted on {new Date(selectedJob.postedDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <h3 className="text-xl font-semibold text-red-400 mb-3 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-lg">
                    <Zap size={20} className="text-red-400" />
                  </span>
                  Job Description
                </h3>
                <p className="text-gray-900 leading-relaxed">{selectedJob.description}</p>
              </div>

              {/* Responsibilities */}
              <div>
                <h3 className="text-xl font-semibold text-red-400 mb-3 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-lg">
                    <Users size={20} className="text-red-400" />
                  </span>
                  Key Responsibilities
                </h3>
                <ul className="space-y-2">
                  {(selectedJob.responsibilities || []).map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-900">
                      <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-xl font-semibold text-red-400 mb-3 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-lg">
                    <Award size={20} className="text-red-400" />
                  </span>
                  Requirements
                </h3>
                <ul className="space-y-2">
                  {(selectedJob.requirements || []).map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-900">
                      <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-xl font-semibold text-red-400 mb-3 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-lg">
                    <Star size={20} className="text-red-400" />
                  </span>
                  Required Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill, index) => (
                    <span key={index} className="bg-[#14213d] text-white px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              

              {/* Application Deadline */}
              <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-900">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                    <Calendar size={16} className="text-red-400" />
                  </span>
                  <span className="font-medium">Application Deadline:</span>
                  <span>{new Date(selectedJob.applicationDeadline).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Apply Button */}
              <div className="flex justify-center pt-4">
                <button
                    className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all duration-300 flex items-center gap-2 font-semibold text-sm"
                  onClick={() => router.push('/career/apply')}
                >
                  <span>Apply for this position</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stay Ahead of Opportunities Section */}
      <section className="px-2 sm:px-5 py-7 sm:py-11 opportunities-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 tablet-header">
            <h2 className="text-black text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 relative inline-block">
              Stay Ahead of Opportunities
            <svg className="mx-auto my-0" style={{marginTop: '-3px'}} width="160" height="18" viewBox="0 0 220 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 18 Q 110 8, 215 14" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" fill="none"/>
                <path d="M15 21 Q 120 15, 200 18" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
            </h2>
            <p className="text-gray-700 text-base sm:text-lg max-w-3xl mx-auto">
              Didn't find the right role? No worries! Submit your details, and we'll contact you when a matching position becomes available.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-stretch tablet-stack-layout">
            {/* Custom styles for laptop-1024px */}
            <style jsx>{`
                  @media (min-width: 1024px) and (max-width: 1279px) {
                       .opportunities-section {
                          padding: 1.5rem 1rem !important;
                       }
                      .grid {
                         gap: 1rem !important;
                        padding: 0 0.5rem;
                      }
                      .laptop-content {
                        max-width: 90% !important;
                        margin: 0 auto;
                      }
                      .left-content-box {
                        margin-left: 0 !important;
                      }
                      .right-form-box {
                         padding: 1rem !important;
                       }
                       .laptop-heading {
                          font-size: 2rem !important;
                        }
                       .laptop-paragraph {
                          font-size: 0.95rem !important;
                          line-height: 1.5 !important;
                        }
                   }
                   
                   /* Tablet-specific styles (768px to 1023px) */
                    @media (min-width: 768px) and (max-width: 1023px) {
                         .tablet-stack-layout {
                             grid-template-columns: 1fr !important;
                          }
                          .tablet-main-grid {
                              grid-template-columns: 1fr !important;
                              gap: 2rem !important;
                           }
                           .tablet-content-box {
                                max-width: 90% !important;
                                margin: 0 auto 2rem auto !important;
                                height: auto !important;
                                min-height: 400px !important;
                             }
                             .tablet-content-heading {
                                 font-size: 2.75rem !important;
                                 margin-bottom: 1.5rem !important;
                              }
                              .tablet-content-paragraph {
                                 font-size: 1.25rem !important;
                                 line-height: 1.7 !important;
                                 max-width: 90% !important;
                                 margin: 0 auto 2rem auto !important;
                              }
                       .opportunities-section {
                          padding: 2rem 1.5rem !important;
                       }
                       .grid {
                          gap: 2rem !important;
                       }
                       .laptop-content {
                          max-width: 100% !important;
                       }
                       .left-content-box {
                          justify-content: center !important;
                          margin: 0 auto !important;
                          max-width: 90% !important;
                       }
                       .right-form-box {
                          padding: 1.5rem !important;
                          max-width: 90% !important;
                          margin: 0 auto !important;
                       }
                       .laptop-heading {
                          font-size: 2.5rem !important;
                          margin-bottom: 1rem !important;
                       }
                       .laptop-paragraph {
                           font-size: 1.1rem !important;
                           line-height: 1.6 !important;
                           padding: 0 1rem !important;
                        }
                        .tablet-form-grid {
                            gap: 1rem !important;
                         }
                         .tablet-header {
                            margin-bottom: 2rem !important;
                         }
                         .tablet-header h2 {
                            font-size: 2.25rem !important;
                         }
                         .tablet-header p {
                             font-size: 1.1rem !important;
                             max-width: 90% !important;
                             margin: 0 auto !important;
                          }
                          .tablet-input {
                              font-size: 1rem !important;
                              padding: 0.75rem 1rem !important;
                           }
                           .tablet-button {
                               font-size: 1.1rem !important;
                               padding: 0.75rem 1.5rem !important;
                               min-width: 200px !important;
                            }
                            .tablet-form-container {
                                 padding: 1.5rem !important;
                                 max-width: 90% !important;
                                 margin: 0 auto !important;
                                 margin-top: 1rem !important;
                              }
                    }
                `}</style>
            {/* Left Side - Content */}
            <div className="h-full flex justify-center md:ml-10 lg:ml-40 items-start mb-8 md:mb-0 left-content-box">
              <div 
                className="rounded-2xl p-4 sm:p-6 pt-4 backdrop-blur-sm border border-gray-700 h-full max-w-md w-full flex flex-col justify-start items-center relative overflow-hidden laptop-content tablet-content-box"
                style={{
                  backgroundImage: `url('https://res.cloudinary.com/duz9xipfm/image/upload/v1754373214/hands-stack-business-people_nxnmw8.avif?fetch-priority=high&loading=lazy')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundOpacity: '0.5'
                }}
              >
                
                {/* Animated Blob Background */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 animate-blob animation-delay-2000"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-teal-500/10 animate-blob animation-delay-4000"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-purple-500/10 animate-blob"></div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-900/60 to-gray-900/80 rounded-2xl z-10"></div>
                <div className="relative z-20 text-center w-full p-4 pt-26">
                  <h3 className="text-4xl font-bold mb-6 text-white laptop-heading tablet-content-heading">
                    Discover Opportunities & Stay Connected
                  </h3>
                  <p className="text-gray-100 text-lg leading-relaxed laptop-paragraph tablet-content-paragraph">
                    We're always looking for talented individuals who share our vision. If you don't find the right opportunity today, submit your details, and we'll reach out when a suitable position opens up.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
              <div 
              className="bg-gradient-to-b from-gray-200 to-gray-100 rounded-2xl p-4 sm:p-8 border border-gray-400 h-full right-form-box tablet-form-container relative overflow-hidden"
              style={{
                backgroundImage: `url('https://res.cloudinary.com/dwlw1nykn/image/upload/v1763445068/image_cabbfi.avif')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="absolute inset-0 bg-white/90 pointer-events-none rounded-2xl z-0"></div>
              <div className="relative z-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                {submitError && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                    <p>{submitError}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 tablet-form-grid tablet-stack-layout">
                  <div>
                    <label htmlFor="fullName" className="block text-black font-medium mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      autoComplete="name"
                      className={`w-full bg-gray-200 border ${
                        errors.fullName ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors tablet-input`}
                      placeholder="Enter your full name"
                      {...register('fullName', { 
                        required: 'Full name is required',
                        minLength: { value: 2, message: 'Name is too short' } 
                      })}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="desiredPosition" className="block text-black font-medium mb-2">
                      Desired Position <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="desiredPosition"
                      type="text"
                      autoComplete="organization-title"
                      className={`w-full bg-gray-200 border ${
                        errors.desiredPosition ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors tablet-input`}
                      placeholder="e.g., React Developer"
                      {...register('position', { 
                        required: 'Position is required' 
                      })}
                    />
                    {errors.position && (
                      <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="experience" className="block text-black font-medium mb-2">
                      Experience <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="experience"
                      type="text"
                      autoComplete="off"
                      className={`w-full bg-gray-200 border ${
                        errors.experience ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors tablet-input`}
                      placeholder="e.g., 3+ years"
                      {...register('experience', { 
                        required: 'Experience is required' 
                      })}
                    />
                    {errors.experience && (
                      <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="currentCtc" className="block text-black font-medium mb-2">
                      Current CTC <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="currentCTC"
                      type="text"
                      autoComplete="off"
                      className={`w-full bg-gray-200 border ${
                        errors.currentCTC ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors tablet-input`}
                      placeholder="e.g., 10 LPA"
                      {...register('currentCtc', { 
                        required: 'Current CTC is required' 
                      })}
                    />
                    {errors.currentCtc && (
                      <p className="mt-1 text-sm text-red-600">{errors.currentCtc.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="message" className="block text-black font-medium mb-2">
                      Write a message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      className={`w-full bg-gray-200 border ${
                        errors.message ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors resize-none tablet-input`}
                      placeholder="Tell us about yourself and your interests..."
                      {...register('message', { 
                        required: 'Message is required',
                        minLength: { value: 10, message: 'Message should be at least 10 characters' } 
                      })}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-black font-medium mb-2">
                      Upload Your CV <span className="text-red-500">*</span>
                    </label>
                    <div
                      className={`border-2 border-dashed ${
                        errors.cv ? 'border-red-500' : 'border-gray-600 hover:border-purple-500'
                      } rounded-lg p-6 text-center transition-colors cursor-pointer`}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        autoComplete="off"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                      <div className="flex flex-col items-center">
                        <svg 
                          className="w-12 h-12 text-gray-400 mb-2" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="text-sm text-gray-900">
                          {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PDF or Word (MAX. 5MB)</p>
                      </div>
                      {errors.cv && (
                        <p className="mt-2 text-sm text-red-600">{errors.cv.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-red-600 text-white px-6 py-3 rounded-full ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-700'
                    } transition-all duration-300 flex items-center gap-2 font-semibold text-sm min-w-[180px] justify-center tablet-button`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerPage;