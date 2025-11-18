'use client';

import { useState } from 'react';

export default function ContactForm() {
  const countryPhoneCodes = [
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'United Kingdom' },
    { code: '+91', country: 'India' },
    { code: '+61', country: 'Australia' },
    { code: '+86', country: 'China' },
    { code: '+81', country: 'Japan' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+39', country: 'Italy' },
    { code: '+7', country: 'Russia' },
    { code: '+82', country: 'South Korea' },
    { code: '+55', country: 'Brazil' },
    { code: '+52', country: 'Mexico' },
    { code: '+34', country: 'Spain' },
    { code: '+31', country: 'Netherlands' },
    { code: '+46', country: 'Sweden' },
    { code: '+65', country: 'Singapore' },
    { code: '+971', country: 'UAE' },
    { code: '+27', country: 'South Africa' },
    { code: '+64', country: 'New Zealand' }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    countryCode: '+91',
    phoneNumber: '',
    message: '',
    service: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    companyName: '',
    phoneNumber: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Phone validation rules for different countries
  const phoneValidationRules = {
    '+91': { // India
      pattern: /^[6-9]\d{9}$/,
      minLength: 10,
      maxLength: 10,
      placeholder: "Enter 10 digits starting with 6-9"
    },
    '+1': { // USA/Canada
      pattern: /^[2-9]\d{9}$/,
      minLength: 10,
      maxLength: 10,
      placeholder: "Enter 10 digits starting with 2-9"
    },
    '+44': { // UK
      pattern: /^[1-9]\d{8,9}$/,
      minLength: 9,
      maxLength: 10,
      placeholder: "Enter 9-10 digits starting with 1-9"
    },
    '+61': { // Australia
      pattern: /^4\d{8}$/,
      minLength: 9,
      maxLength: 9,
      placeholder: "Enter 9 digits starting with 4"
    },
    '+86': { // China
      pattern: /^1[3-9]\d{9}$/,
      minLength: 11,
      maxLength: 11,
      placeholder: "Enter 11 digits starting with 1"
    },
    '+81': { // Japan
      pattern: /^[0-9]\d{8,9}$/,
      minLength: 9,
      maxLength: 10,
      placeholder: "Enter 9-10 digits"
    },
    '+49': { // Germany
      pattern: /^1[5-7]\d{8}$/,
      minLength: 10,
      maxLength: 11,
      placeholder: "Enter 10-11 digits starting with 15-17"
    },
    '+33': { // France
      pattern: /^[6-7]\d{8}$/,
      minLength: 9,
      maxLength: 9,
      placeholder: "Enter 9 digits starting with 6-7"
    },
    '+39': { // Italy
      pattern: /^3\d{9}$/,
      minLength: 10,
      maxLength: 10,
      placeholder: "Enter 10 digits starting with 3"
    },
    '+7': { // Russia
      pattern: /^9\d{9}$/,
      minLength: 10,
      maxLength: 10,
      placeholder: "Enter 10 digits starting with 9"
    },
    '+82': { // South Korea
      pattern: /^1[0-9]\d{7,8}$/,
      minLength: 9,
      maxLength: 10,
      placeholder: "Enter 9-10 digits starting with 1"
    },
    '+55': { // Brazil
      pattern: /^[1-9]{2}9\d{8}$/,
      minLength: 11,
      maxLength: 11,
      placeholder: "Enter 11 digits starting with area code"
    },
    '+52': { // Mexico
      pattern: /^[1-9]\d{9}$/,
      minLength: 10,
      maxLength: 10,
      placeholder: "Enter 10 digits starting with 1-9"
    },
    '+34': { // Spain
      pattern: /^[6-7]\d{8}$/,
      minLength: 9,
      maxLength: 9,
      placeholder: "Enter 9 digits starting with 6-7"
    },
    '+31': { // Netherlands
      pattern: /^6\d{8}$/,
      minLength: 9,
      maxLength: 9,
      placeholder: "Enter 9 digits starting with 6"
    },
    '+46': { // Sweden
      pattern: /^7\d{8}$/,
      minLength: 9,
      maxLength: 9,
      placeholder: "Enter 9 digits starting with 7"
    },
    '+65': { // Singapore
      pattern: /^[689]\d{7}$/,
      minLength: 8,
      maxLength: 8,
      placeholder: "Enter 8 digits starting with 6,8,9"
    },
    '+971': { // UAE
      pattern: /^5\d{8}$/,
      minLength: 9,
      maxLength: 9,
      placeholder: "Enter 9 digits starting with 5"
    },
    '+27': { // South Africa
      pattern: /^[6-8]\d{8}$/,
      minLength: 9,
      maxLength: 9,
      placeholder: "Enter 9 digits starting with 6-8"
    },
    '+64': { // New Zealand
      pattern: /^2\d{8}$/,
      minLength: 9,
      maxLength: 9,
      placeholder: "Enter 9 digits starting with 2"
    }
  };

  // Comprehensive field validation
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) {
          return 'Name is required';
        }
        if (value.trim().length < 2) {
          return 'Name must be at least 2 characters long';
        }
        if (value.trim().length > 50) {
          return 'Name must not exceed 50 characters';
        }
        if (!/^[a-zA-Z\s-]+$/.test(value.trim())) {
          return 'Name can only contain letters, spaces, and hyphens';
        }
        if (/^[\s-]|[\s-]$/.test(value.trim())) {
          return 'Name cannot start or end with a space or hyphen';
        }
        return '';

      case 'email':
        if (!value.trim()) {
          return 'Email is required';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Please enter a valid email address';
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value.trim())) {
          return 'Please enter a valid email address format';
        }
        if (value.length > 254) {
          return 'Email address is too long';
        }
        const localPart = value.split('@')[0];
        if (localPart.length > 64) {
          return 'The part before @ is too long';
        }
        if (/(\.{2,}|@{2,}|_{2,}|-{2,})/.test(value)) {
          return 'Email cannot contain consecutive dots, @, underscores, or hyphens';
        }
        if (/^[.-]|[.-]@|@[.-]|[.-]$/.test(value)) {
          return 'Email cannot start or end with a dot or hyphen';
        }
        return '';

      case 'companyName':
        if (!value.trim()) {
          return 'Company name is required';
        }
        return value.length < 2 ? 'Company name must be at least 2 characters long' : '';

      case 'phoneNumber':
        const cleanNumber = value.replace(/[\s()-]/g, '');
        const countryValidation = phoneValidationRules[formData.countryCode];

        if (!cleanNumber) {
          return 'Phone number is required';
        }

        if (!countryValidation) {
          return 'Please select a valid country code';
        }

        const numberLength = cleanNumber.length;
        if (numberLength < countryValidation.minLength || numberLength > countryValidation.maxLength) {
          return `Phone number must be ${
            countryValidation.minLength === countryValidation.maxLength
              ? `${countryValidation.minLength} digits`
              : `between ${countryValidation.minLength} and ${countryValidation.maxLength} digits`
          } for ${formData.countryCode}`;
        }

        if (!countryValidation.pattern.test(cleanNumber)) {
          return countryValidation.message;
        }

        return '';

      case 'message':
        if (!value.trim()) {
          return 'Message is required';
        }
        return value.length < 10 ? 'Message must be at least 10 characters long' : '';

      default:
        return '';
    }
  };

  // Phone number formatting and change handler
  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const sanitizedValue = value.replace(/[^\d]/g, '');

    let formattedValue = sanitizedValue;
    if (formData.countryCode) {
      switch (formData.countryCode) {
        case '+1': // USA/Canada
          formattedValue = sanitizedValue.replace(/(\d{3})(\d{3})(\d{1,4})/, '($1) $2-$3');
          break;
        case '+44': // UK
          formattedValue = sanitizedValue.replace(/(\d{4})(\d{3})(\d{1,4})/, '$1 $2 $3');
          break;
        case '+91': // India
          formattedValue = sanitizedValue.replace(/(\d{5})(\d{1,5})/, '$1 $2');
          break;
        case '+86': // China
          formattedValue = sanitizedValue.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1 $2 $3');
          break;
        case '+81': // Japan
          formattedValue = sanitizedValue.replace(/(\d{2})(\d{4})(\d{1,4})/, '$1 $2 $3');
          break;
        case '+49': // Germany
          formattedValue = sanitizedValue.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1 $2 $3');
          break;
        case '+33': // France
          formattedValue = sanitizedValue.replace(/(\d{1})(\d{2})(\d{2})(\d{2})(\d{1,2})/, '$1 $2 $3 $4 $5');
          break;
        case '+61': // Australia
          formattedValue = sanitizedValue.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1 $2 $3');
          break;
        default:
          formattedValue = sanitizedValue.replace(/(\d{3})(\d{3})(\d{1,4})/, '$1 $2 $3');
      }
    }

    setFormData(prevState => ({
      ...prevState,
      phoneNumber: formattedValue
    }));

    const error = validateField('phoneNumber', sanitizedValue);
    setErrors(prevErrors => ({
      ...prevErrors,
      phoneNumber: error
    }));
  };

  // General form field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber') {
      handlePhoneChange(e);
      return;
    }

    const trimmedValue = ['name', 'email'].includes(name) ? value.trim() : value;

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'countryCode') {
      setErrors(prevErrors => ({
        ...prevErrors,
        phoneNumber: ''
      }));
      return;
    }

    const error = validateField(name, trimmedValue);
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  };

  // Form submission handler with backend connectivity
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('=== CONTACT FORM SUBMISSION START ===');
    console.log('Current formData:', formData);

    // Log each field with its value and length
    Object.entries(formData).forEach(([key, value]) => {
      console.log(`Field: ${key}, Value: ${value}, Length: ${String(value).length}`);
    });

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'countryCode') {
        newErrors[key] = validateField(key, formData[key]);
      }
    });

    console.log('Validation errors:', newErrors);

    if (Object.values(newErrors).some(error => error !== '')) {
      console.log('Validation failed, not submitting to backend');
      console.log('Failed fields:', Object.keys(newErrors).filter(key => newErrors[key] !== ''));
      setErrors(newErrors);
      return;
    }

    console.log('Client-side validation passed, preparing to send to backend');

    try {
      const submitData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        companyName: formData.companyName.trim(),
        countryCode: formData.countryCode,
        phoneNumber: formData.phoneNumber.trim(),
        message: formData.message.trim(),
        service: formData.service
      };

      console.log('Data being sent to backend:', submitData);

      try {
        const apiUrl = 'https://crit-p-2.onrender.com'; // Production backend URL
        console.log('Making request to:', `${apiUrl}/api/contact/submit`);
        const response = await fetch(`${apiUrl}/api/contact/submit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include', // Include cookies and HTTP authentication data
          mode: 'cors', // Enable CORS mode
          body: JSON.stringify(submitData)
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

        console.log('Contact form submitted successfully:', result);
        setIsSubmitted(true);
        alert('Form submitted successfully!');

        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            companyName: '',
            countryCode: '+91',
            phoneNumber: '',
            message: '',
            service: ''
          });
        }, 3000);
      } catch (error) {
        console.error('Error submitting contact form:', {
          error: error.message,
          stack: error.stack,
          formData: submitData
        });
        alert(`Error submitting form: ${error.message}. Please check the console for more details.`);
      }
    } catch (error) {
      console.error('Error in contact form submission:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const serviceOptions = [
    'SAP Implementation',
    'SAP Rollout  Services',
    'SAP Support Services',
    'SAP Upgrade Services',
    'SAP Migration Services',
    'SAP Integration Services',
    'SAP Automation Services'
  ];
  return (
    <div>
      <div className="min-h-* bg-no-repeat bg-cover bg-center relative m-auto max-w-full">
        <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
          {/* Main Heading */}
          <div className="text-center mb-6 sm:mb-8 pt-6 sm:pt-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 inline-block relative">
              <span className="text-black">Get In Touch With </span>
              <span className="text-red-500">Connecting Roots</span>
              <svg
                className="mx-auto my-0"
                style={{ marginTop: '-4px' }}
                width="160"
                height="18"
                viewBox="0 0 220 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 18 Q 110 8, 215 14"
                  stroke="#ffd700"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M15 21 Q 120 15, 200 18"
                  stroke="#ffd700"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </h1>
          </div>
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start relative z-10 w-full">
            {/* Left Side - Contact Information */}
            <div className="w-full lg:w-5/12 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 lg:space-y-4 lg:grid lg:grid-cols-1 lg:gap-0">
              {/* Call Us Section */}
              <div className="backdrop-blur-md border border-black/10 bg-black/10 rounded-md p-3 sm:p-4 lg:p-5 shadow-sm transition-all duration-300 hover:border-white/20 hover:shadow-md hover:scale-[1.02] hover:bg-black/15">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 flex items-center gap-2 text-black">
                  <span className="bg-black/10 p-1.5 rounded-md transition-colors duration-300 group-hover:bg-white/20">
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </span>
                  CALL US
                </h3>
                <div className="pl-6 lg:pl-8">
                  <p className="text-gray-800 text-sm">+91 7773954892</p>
                </div>
              </div>
              {/* Location Section */}
              <div className="backdrop-blur-md border border-black/10 bg-black/10 rounded-md p-3 sm:p-4 lg:p-5 shadow-sm transition-all duration-300 hover:border-white/20 hover:shadow-md hover:scale-[1.02] hover:bg-black/15">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 flex items-center gap-2 text-black">
                  <span className="bg-black/10 p-1.5 rounded-md transition-colors duration-300 group-hover:bg-white/20">
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </span>
                  LOCATION
                </h3>
                <div className="pl-6 lg:pl-8">
                  <p className="text-black text-sm">
                    1st Floor,101, Police, Wireless Colony,<br/>
                    Vishal Nagar, Pimple Nilakh,<br/>
                    Pune, Pimpri-Chinchwad,<br/>
                    Maharashtra 411027
                  </p>
                </div>
              </div>
              {/* Working Hours Section */}
              <div className="backdrop-blur-md border border-black/10 bg-black/10 rounded-md p-3 sm:p-4 lg:p-5 shadow-sm transition-all duration-300 hover:border-white/20 hover:shadow-md hover:scale-[1.02] hover:bg-black/15">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 flex items-center gap-2 text-black">
                  <span className="bg-black/10 p-1.5 rounded-md transition-colors duration-300 group-hover:bg-white/20">
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"/>
                    </svg>
                  </span>
                  Working Hours
                </h3>
                <div className="pl-6 lg:pl-8">
                  <p className="text-black text-sm">
                    Monday - Saturday: 9:00 AM - 6:00 PM<br/>
                    Sunday: Closed
                  </p>
                </div>
              </div>
              {/* Email Us Section */}
              <div className="backdrop-blur-md border border-black/10 bg-black/10 rounded-md p-3 sm:p-4 lg:p-5 shadow-sm transition-all duration-300 hover:border-white/20 hover:shadow-md hover:scale-[1.02] hover:bg-black/15">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 flex items-center gap-2 text-black">
                  <span className="bg-black/10 p-1.5 rounded-md transition-colors duration-300 group-hover:bg-white/20">
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </span>
                  Email Us
                </h3>
                <div className="pl-6 lg:pl-8">
                  <p className="text-black text-sm">info@critindia.com</p>
                </div>
              </div>
            </div>

            {/* Right Side - Form Section */}
            <div className="w-full lg:w-7/12 backdrop-blur-3xl bg-black/10 border border-black/10 rounded-md p-4 sm:p-6 lg:p-8">
              <h2 className="text-[#428CFF] text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4">GET IN TOUCH</h2>
              <p className="text-black mb-3 sm:mb-4 lg:mb-5 text-sm">Hey! We are looking forward to start a project with you!</p>
              <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3 lg:space-y-4 p-1 sm:p-2 lg:p-3">
                {/* Name Input */}
                <div>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your Name"
                    className={`w-full p-2 sm:p-2.5 lg:p-3 bg-gray-50 border border-transparent rounded-md focus:outline-none focus:border-[#428CFF] text-xs sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name}</p>}
                </div>
                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter a valid email address"
                    className={`w-full p-2 sm:p-2.5 lg:p-3 bg-gray-50 border border-transparent rounded-md focus:outline-none focus:border-[#428CFF] text-xs sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-0.5">{errors.email}</p>}
                </div>
                {/* Company Name Input */}
                <div>
                  <input
                    type="text"
                    name="companyName"
                    autoComplete="organization"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter your Company Name"
                    className={`w-full p-2 sm:p-2.5 lg:p-3 bg-gray-50 border border-transparent rounded-md focus:outline-none focus:border-[#428CFF] text-xs sm:text-sm ${errors.companyName ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.companyName && <p className="text-red-500 text-xs mt-0.5">{errors.companyName}</p>}
                </div>
                {/* Phone Input */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="w-full sm:w-28 lg:w-32 p-2 sm:p-2.5 lg:p-3 bg-gray-50 border border-transparent rounded-md focus:outline-none focus:border-[#428CFF] text-xs sm:text-sm"
                  >
                    {countryPhoneCodes.map(country => (
                      <option key={country.code} value={country.code}>
                        {formData.countryCode === country.code ? country.code : `${country.country} (${country.code})`}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phoneNumber"
                    autoComplete="tel"
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder={phoneValidationRules[formData.countryCode]?.placeholder || "Enter your phone number"}
                    className={`w-full sm:flex-1 p-2 sm:p-2.5 lg:p-3 bg-gray-50 border border-transparent rounded-md focus:outline-none focus:border-[#428CFF] text-xs sm:text-sm ${errors.phoneNumber ? 'border-red-500' : ''}`}
                    required
                  />
                </div>
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-0.5">{errors.phoneNumber}</p>}
                {/* Service Dropdown */}
                <div>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full p-2 sm:p-2.5 lg:p-3 bg-gray-50 border border-transparent rounded-md focus:outline-none focus:border-[#428CFF] text-xs sm:text-sm"
                    required
                  >
                    <option value="" disabled>Select Service</option>
                    {serviceOptions.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Message Input */}
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    rows="3"
                    className={`w-full p-2 sm:p-2.5 lg:p-3 bg-gray-50 border border-transparent rounded-md focus:outline-none focus:border-[#428CFF] text-xs sm:text-sm ${errors.message ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-0.5">{errors.message}</p>
                  )}
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className={`w-full sm:w-auto ${isSubmitted ? 'bg-green-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-800'} text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-md transition-colors text-xs sm:text-sm flex items-center justify-center gap-2`}
                >
                  {isSubmitted ? (
                    <>
                      <span>Submitted</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Map Section below the form, landscape orientation */}
          <div className="max-w-4xl mx-auto w-full mt-8">
            <div className="backdrop-blur-md border border-black/10 bg-black/10 rounded-md p-3 sm:p-4 lg:p-5 shadow-sm transition-all duration-300 hover:border-white/20 hover:shadow-md">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 flex items-center gap-2 text-black">
                <span className="bg-black/10 p-1.5 rounded-md transition-colors duration-300 group-hover:bg-white/20">
                  <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM10 5.47l4 1.4v11.66l-4-1.4V5.47zm-5 .99l3-1.01v11.7l-3 1.16V6.46zm14 11.08l-3 1.01V6.86l3-1.16v11.84z"/>
                  </svg>
                </span>
                MAP
              </h3>
              <a
                href="https://maps.app.goo.gl/dxLiKtiB9nabyipT9"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Pune location in Google Maps"
                className="w-full h-full block relative"
                tabIndex={-1}
              >
                <div
                  className="w-full h-64 sm:h-80 lg:h-96 rounded-md overflow-hidden relative flex items-center justify-center bg-gray-200 group"
                  tabIndex={0}
                  aria-label="Interactive map of our location"
                >
                  {/* Embedded iframe map */}
                  <iframe
                    title="Pune Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '100%', minWidth: '100%' }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=18.5865085,73.7814042&z=19&output=embed"
                    className="w-full h-full object-cover rounded-md max-w-full pointer-events-none"
                  ></iframe>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}