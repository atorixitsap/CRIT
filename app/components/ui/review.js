import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Quote, X, Star, Upload, Check } from 'lucide-react';

const CustomerTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    company: '',
    review: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const testimonials = [
    {
      id: 1,
      text: "The team helped us automate several manual processes, reducing our operational workload by over 50%. Their consultants were both knowledgeable and professional, and project management was seamless from start to finish.",
      author: "John Doe",
      position: "Customer",
      avatar: "/avatars/jack-william.jpg",
      rating: 5.0
    },
    {
      id: 2,
      text: "Always responsive and ready to work with us on new ideas. The technical team understood our requirements well and proposed cost-effective solutions that worked within our budget.",
      author: "Sarah Johnson",
      position: "Customer",
      avatar: "/avatars/sarah-johnson.jpg",
      rating: 5.0
    },
    {
      id: 3,
      text: "SAP service from the company exceeded our expectations. Data integration and reporting improved, and we noticed a significant increase in efficiency across critical departments.",
      author: "Mike Chen",
      position: "Customer",
      avatar: "/avatars/mike-chen.jpg",
      rating: 5.0
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  // Auto-advance testimonials every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(timer);
  }, [currentTestimonial]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <motion.span 
        key={index}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className={`text-xl ${index < rating ? 'text-red-500' : 'text-gray-300'}`}
      >
        ★
      </motion.span>
    ));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (PNG, JPG, JPEG, GIF, etc.)');
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove uploaded file
  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    // Reset the file input
    const fileInput = document.getElementById('file-upload');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // Trigger file input click
  const triggerFileUpload = () => {
    document.getElementById('file-upload').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('=== REVIEW FORM SUBMISSION START ===');
    console.log('Current formData:', formData);
    console.log('Current rating:', rating);
    console.log('Selected file:', selectedFile);
    
    // Log each field with its value and length
    Object.entries(formData).forEach(([key, value]) => {
      console.log(`Field: ${key}, Value: ${value}, Length: ${String(value).length}`);
    });
    
    // Validate required fields
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    if (!formData.name || !formData.email || !formData.position || 
        !formData.company || !formData.review) {
      alert('Please fill in all required fields');
      return;
    }

    console.log('Client-side validation passed, preparing to send to backend');
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('email', formData.email.trim().toLowerCase());
      formDataToSend.append('position', formData.position.trim());
      formDataToSend.append('company', formData.company.trim());
      formDataToSend.append('review', formData.review.trim());
      formDataToSend.append('rating', rating.toString());
      
      if (selectedFile) {
        formDataToSend.append('profilePicture', selectedFile);
      }
      
      console.log('Data being sent to backend:', {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        position: formData.position.trim(),
        company: formData.company.trim(),
        review: formData.review.trim(),
        rating: rating.toString(),
        hasFile: !!selectedFile,
        fileName: selectedFile?.name,
        fileSize: selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : 'N/A'
      });
      
      try {
        const apiUrl = 'https://crit-p-2.onrender.com'; // Production backend URL
        console.log('Making request to:', `${apiUrl}/api/review/submit`);
        const response = await fetch(`${apiUrl}/api/review/submit`, {
          method: 'POST',
          body: formDataToSend
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
      
        console.log('Review submitted successfully:', result);
        setShowSuccess(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          position: '',
          company: '',
          review: ''
        });
        setRating(0);
        setSelectedFile(null);
        setFilePreview(null);
        
        // Close form after 3 seconds
        setTimeout(() => {
          setShowReviewForm(false);
          setShowSuccess(false);
        }, 3000);
      } catch (error) {
        console.error('Error submitting review form:', {
          error: error.message,
          stack: error.stack,
          formData: {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            position: formData.position.trim(),
            company: formData.company.trim(),
            review: formData.review.trim(),
            rating: rating.toString(),
            hasFile: !!selectedFile
          }
        });
        alert(`Error submitting form: ${error.message}. Please check the console for more details.`);
      }
    } catch (error) {
      console.error('Error in review form submission:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-gray-900 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-gray-900">
              Proven Results,
                <br />
                <span className="text-red-600"> Real Feedback</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
              We're proud to be recognized as a leading SAP provider. Our commitment to excellence has earned us numerous awards and accolades, and we're dedicated to delivering the same level of success to every client. 
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowReviewForm(true)}
                className="bg-white hover:bg-red-600 hover:text-white text-red-600 border-2 border-red-600 px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Add Review
              </motion.button>
            </div>
          </motion.div>

          {/* Right Side - Testimonial with top spacing */}
          <div className="relative mt-24 lg:mt-46">
            {/* Navigation Arrows */}
            <div className="absolute -top-12 right-0 flex gap-4">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="text-gray-400 hover:text-red-600 transition-colors duration-300 p-2 rounded-full hover:bg-red-50"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="text-gray-400 hover:text-red-600 transition-colors duration-300 p-2 rounded-full hover:bg-red-50"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>

            {/* Testimonial Card with Animation */}
            <motion.div 
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-8 relative shadow-lg transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-6 h-6 text-red-400 opacity-60 mt-1 flex-shrink-0 mb-12" />
              
              {/* Testimonial Content with Animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                >
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    {testimonials[currentTestimonial].text}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center overflow-hidden"
                      >
                        <span className="text-white font-semibold">
                          {testimonials[currentTestimonial].author.charAt(0)}
                        </span>
                      </motion.div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {testimonials[currentTestimonial].author}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {testimonials[currentTestimonial].position}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {renderStars(testimonials[currentTestimonial].rating)}
                      </div>
                      <span className="text-gray-900 font-semibold">
                        {testimonials[currentTestimonial].rating + ".0"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-red-600' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowReviewForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Form Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Share Your Experience</h3>
                  <p className="text-gray-600 mt-1">Your feedback helps us improve our services</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowReviewForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </motion.button>
              </div>

              {/* Success Message */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute inset-0 bg-white z-10 flex items-center justify-center rounded-2xl"
                  >
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 15 }}
                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <Check className="w-10 h-10 text-green-600" />
                      </motion.div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h4>
                      <p className="text-gray-600">Your review has been submitted successfully.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Rating Section */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    How would you rate your experience?
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= (hoveredRating || rating)
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-300'
                          } transition-colors`}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="position" className="block text-sm font-semibold text-gray-700 mb-2">
                      Position *
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      autoComplete="organization-title"
                      required
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="CEO, Manager, etc."
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      autoComplete="organization"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label htmlFor="review" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Review *
                  </label>
                  <textarea
                    id="review"
                    name="review"
                    required
                    rows={5}
                    value={formData.review}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Share your experience working with us..."
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {formData.review.length}/500 characters
                  </p>
                </div>

                {/* Profile Picture Upload */}
               

                {/* Privacy Notice */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Privacy Notice:</span> Your review may be published on our website. 
                    We will only display your name and position. Your email will remain confidential.
                  </p>
                </div>

                {/* Form Actions */}
                <div className="flex gap-4 pt-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || rating === 0}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                      isSubmitting || rating === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Submit Review'
                    )}
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowReviewForm(false)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerTestimonials;