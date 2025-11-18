'use client';
import React, { useState, useEffect } from 'react';
import { 
  Database, 
  ShoppingCart,
  MessageSquare, 
  Users, 
  BarChart3, 
  Plane, 
  Handshake,
  FileText,
  Building2,
  TrendingUp,
  Shield,
  Award,
  Phone,
  Mail,
  Calendar,
  Download,
  ChevronRight,
  Briefcase,
  Settings,
  DollarSign,
  Clock,
  PieChart,
  Monitor
} from 'lucide-react';

const SAPProductsInfo = () => {
  const [selectedProduct, setSelectedProduct] = useState('sap-s4hana');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products data from JSON files
        const [productsResponse, products1Response] = await Promise.all([
          fetch('/json/data/products.json'),
          fetch('/json/data/products_1.json')
        ]);
        
        const productsData = await productsResponse.json();
        const products1Data = await products1Response.json();
        
        // Map the products1Data to include the icon components
        const mappedProducts = products1Data.map(product => {
          // Map string icon names to actual React components
          const iconMap = {
            'Database': <Database className="w-8 h-8 text-blue-600" />,
            'ShoppingCart': <ShoppingCart className="w-8 h-8 text-white" />,
            'Users': <Users className="w-8 h-8 text-blue-600" />,
            'BarChart3': <BarChart3 className="w-8 h-8 text-blue-600" />,
            'Plane': <Plane className="w-8 h-8 text-white" />,
            'Handshake': <Handshake className="w-8 h-8 text-white" />,
            'Building': <Building2 className="w-8 h-8 text-blue-600" />,
            'LineChart': <TrendingUp className="w-8 h-8 text-white" />,
            'PieChart': <PieChart className="w-8 h-8 text-white" />
          };
          
          return {
            ...product,
            icon: iconMap[product.icon] || <Database className="w-8 h-8 text-blue-600" /> // Default icon
          };
        });
        
        setProducts(mappedProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Custom styles for animations
  const animationStyles = `
    /* Hide scrollbar for all browsers */
    * {
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* Internet Explorer 10+ */
    }
    *::-webkit-scrollbar {
      display: none; /* WebKit */
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideInLeft {
      from { transform: translateX(-20px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideInUp {
      from { transform: translateY(50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    @keyframes fadeInUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    /* Educational animations */
    @keyframes knowledgeGlow {
      0%, 100% { box-shadow: 0 0 5px rgba(220, 38, 38, 0.3); }
      50% { box-shadow: 0 0 20px rgba(220, 38, 38, 0.6); }
    }
    
    @keyframes insightPulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes learningFlow {
      0% { transform: translateY(0) rotate(0deg); }
      25% { transform: translateY(-2px) rotate(1deg); }
      75% { transform: translateY(2px) rotate(-1deg); }
      100% { transform: translateY(0) rotate(0deg); }
    }
    
    @keyframes dataVisualization {
      0% { opacity: 0; transform: scale(0.8); }
      50% { opacity: 0.7; transform: scale(1.1); }
      100% { opacity: 1; transform: scale(1); }
    }
    
    @keyframes strategicThinking {
      0% { transform: translateX(0); }
      25% { transform: translateX(3px); }
      75% { transform: translateX(-3px); }
      100% { transform: translateX(0); }
    }
    
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out;
    }
    .animate-slide-in-left {
      animation: slideInLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .animate-slide-in-right {
      animation: slideInRight 0.8s ease-out;
    }
    .animate-slide-in-up {
      animation: slideInUp 0.6s ease-out;
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.5s ease-out forwards;
      opacity: 0;
    }
    
    
    /* Educational animation classes */
    .knowledge-glow {
      animation: knowledgeGlow 3s ease-in-out infinite;
    }
    
    .insight-pulse {
      animation: insightPulse 2s ease-in-out infinite;
    }
    
    .learning-flow {
      animation: learningFlow 4s ease-in-out infinite;
    }
    
    .data-visualization {
      animation: dataVisualization 1.5s ease-out;
    }
    
    .strategic-thinking {
      animation: strategicThinking 3s ease-in-out infinite;
    }
    
    /* Interactive learning effects */
    .learning-highlight {
      transition: all 0.3s ease;
    }
    
    .capability-item {
      transition: all 0.4s ease;
      position: relative;
    }
    
    .outcome-item {
      transition: all 0.4s ease;
      position: relative;
    }
  `;

  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = animationStyles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Products are now fetched from JSON files

  const currentProduct = products.find(p => p.id === selectedProduct);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white" >
      {/* Executive Header */}
      <div className="border-b border-red-200 bg-white" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              
              <div>
                <span>Contact Us</span>
                <h1 className="text-2xl font-bold text-gray-900">
                  SAP Enterprise Solutions Portfolio
                </h1>
                <p className="text-lg text-gray-700">
                  Strategic Technology Solutions for Digital Transformation
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
             <a href="/contact"> <button
                className="flex items-center space-x-2 border border-red-300 text-black px-6 py-3 rounded-lg transition-colors group hover:text-white hover:bg-red-600 hover:border-red-600"
               >
                <Calendar className="w-5 h-5 text-black group-hover:text-white transition-colors" />
                <span>Schedule Meeting</span>
              </button></a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 overflow-x-auto">
          {/* Mobile Product Dropdown - Only visible on mobile */}
          <div className="lg:hidden w-full mb-6">
            <div className="rounded-lg shadow-sm border border-red-200 p-4 bg-white hover:shadow-lg transition-all duration-300 ease-out">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-red-600 mb-2">Solutions Portfolio</h3>
                
                {/* Current Selected Product Button */}
                <button
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  className="w-full flex items-center justify-between p-3 rounded-lg text-left bg-red-100 text-red-600 border border-red-300 shadow-md"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-red-600">
                      {currentProduct && React.cloneElement(currentProduct.icon, { className: 'w-8 h-8', color: '#dc2626' })}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate text-gray-900">{currentProduct ? currentProduct.name : 'Select Product'}</div>
                      <div className="text-sm text-gray-700 truncate">{currentProduct ? currentProduct.category : ''}</div>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-red-500 transition-transform duration-300 ${mobileDropdownOpen ? 'rotate-90' : ''}`} />
                </button>
                
                {/* Dropdown Products List */}
                {mobileDropdownOpen && (
                  <div className="mt-2 rounded-lg border border-red-200 bg-white shadow-lg animate-fade-in-up">
                    <div className="max-h-60 overflow-y-auto py-1">
                      {products.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => {
                            setSelectedProduct(product.id);
                            setMobileDropdownOpen(false);
                          }}
                          className={`w-full flex items-center space-x-3 p-3 text-left hover:bg-red-50 ${selectedProduct === product.id ? 'bg-red-50' : ''}`}
                        >
                          <div className={`${selectedProduct === product.id ? 'text-red-600' : 'text-red-400'}`}>
                            {React.cloneElement(product.icon, { className: 'w-6 h-6', color: selectedProduct === product.id ? '#dc2626' : '#f87171' })}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate text-gray-900">{product.name}</div>
                            <div className="text-xs text-gray-700 truncate">{product.category}</div>
                          </div>
                          {selectedProduct === product.id && <ChevronRight className="w-4 h-4 text-red-500" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Desktop Product Navigation - Hidden on mobile */}
          <div className="relative lg:col-span-1 lg:sticky top-8 hidden lg:block">
            <div className="rounded-lg shadow-sm border border-red-200 p-6 bg-white hover:shadow-lg transition-all duration-300 ease-out" >
              <h3 className="text-lg font-semibold text-red-600 mb-4">Solutions Portfolio</h3>
              <nav className="space-y-2">
                {products.map((product, index) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-300 transform hover:translate-x-2 hover:shadow-md ${
                      selectedProduct === product.id
                        ? 'bg-red-100 text-red-600 border border-red-300 scale-105 shadow-md'
                        : 'hover:bg-red-50 hover:text-gray-900 text-gray-900'
                    }`}
                  >
                    <div className={`${selectedProduct === product.id ? 'text-red-600' : 'text-red-400'}`}>
                      {React.cloneElement(product.icon, { className: 'w-8 h-8', color: selectedProduct === product.id ? '#dc2626' : '#f87171' })}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-700 truncate">{product.category}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-red-300" />
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-3">
            {currentProduct && (
              <div className="space-y-6 md:space-y-8" key={selectedProduct}>
                {/* Product Header */}
                <div className="rounded-lg mt-2 lg:mt-10 mr-0 lg:mr-10 shadow-sm border border-red-200 p-4 md:p-8 bg-red-100 hover:shadow-lg transition-all duration-300 transform knowledge-glow">
                  <div className="flex items-start space-x-4">
                    <div className="text-red-600 hidden sm:block">
                      {React.cloneElement(currentProduct.icon, { className: 'w-8 h-8', color: '#dc2626' })}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-bold text-black mb-2">
                        {currentProduct.name}
                      </h2>
                      <p className="text-base md:text-lg text-gray-900 mb-4">
                        {currentProduct.subtitle}
                      </p>
                      <div className="flex flex-col items-start space-y-2 sm:flex-row sm:items-center sm:flex-wrap sm:gap-4 text-xs md:text-sm text-gray-900">
                        <span className="flex items-center space-x-1">
                          <Briefcase className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
                          <span>{currentProduct.category}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
                          <span>{currentProduct.clientProfile}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
                          <span>{currentProduct.implementationTime}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Executive Summary */}
                <div className="rounded-lg shadow-sm border border-red-200 p-4 md:p-8 bg-white hover:shadow-lg transition-all duration-300 transform ">
                  <h3 className="text-lg md:text-xl font-semibold text-red-600 mb-3 md:mb-4 flex items-center space-x-2">
                    <FileText className="w-4 h-4 md:w-5 md:h-5 text-red-500 learning-flow" />
                    <span>Executive Summary</span>
                  </h3>
                  <p className="text-gray-900 leading-tight md:leading-relaxed text-sm md:text-base lg:text-lg text-justify">
                    {currentProduct.executiveSummary}
                  </p>
                </div>

                {/* Key Capabilities & Business Outcomes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                  <div className="rounded-lg shadow-sm border border-red-200 p-4 md:p-8 bg-white hover:shadow-lg transition-all duration-300 transform ">
                    <h3 className="text-lg md:text-xl font-semibold text-red-600 mb-3 md:mb-6 flex items-center space-x-2">
                      <Settings className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                      <span>Key Capabilities</span>
                    </h3>
                    <div className="space-y-2 md:space-y-4">
                      {currentProduct.keyCapabilities.map((capability, index) => (
                        <div key={index} className="flex items-start space-x-2 md:space-x-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0 insight-pulse"></div>
                          <span className="text-sm md:text-base text-gray-900 transition-colors duration-200 capability-item">{capability}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg shadow-sm border border-red-200 p-4 md:p-8 bg-white hover:shadow-lg transition-all duration-300 transform">
                    <h3 className="text-lg md:text-xl font-semibold text-red-600 mb-3 md:mb-6 flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                      <span>Business Outcomes</span>
                    </h3>
                    <div className="space-y-2 md:space-y-4">
                      {currentProduct.businessOutcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start space-x-2 md:space-x-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0 insight-pulse"></div>
                          <span className="text-sm md:text-base text-gray-900 transition-colors duration-200 outcome-item">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Investment Metrics and Technical Specifications */}
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  {/* Investment Metrics */}
                  <div className="rounded-lg shadow-sm border border-red-200 p-4 md:p-6 bg-white hover:shadow-lg transition-all duration-300 transform data-visualization">
                    <h3 className="text-lg md:text-xl font-semibold text-red-600 mb-3 md:mb-4 flex items-center space-x-2 flex-row">
                      <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-red-500 strategic-thinking" />
                      <span>Investment Analysis</span>
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-center">
                        <div className="font-bold text-red-600 mb-1 text-xs sm:text-base">
                          {currentProduct.investmentMetrics.roi}
                        </div>
                        <div className="text-xs text-gray-700 text-center">Total ROI</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-red-600 mb-1 text-xs sm:text-base">
                          {currentProduct.investmentMetrics.paybackPeriod}
                        </div>
                        <div className="text-xs text-gray-700 text-center">Payback Period</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-red-600 mb-1 text-xs sm:text-base">
                          {currentProduct.investmentMetrics.costReduction}
                        </div>
                        <div className="text-xs text-gray-700 text-center">Cost Reduction</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-red-600 mb-1 text-xs sm:text-base">
                          {currentProduct.investmentMetrics.productivity}
                        </div>
                        <div className="text-xs text-gray-700 text-center">Productivity Gain</div>
                      </div>
                    </div>
                  </div>

                  {/* Technical Specifications */}
                  <div className="rounded-lg shadow-sm border border-red-200 p-4 md:p-6 bg-white hover:shadow-lg transition-all duration-300 transform">
                    <h3 className="text-lg md:text-xl font-semibold text-red-600 mb-3 md:mb-4 flex items-center space-x-2">
                      <Shield className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                      <span>Technical Specifications</span>
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <div className="text-xs md:text-sm font-medium text-gray-900">Deployment Options</div>
                        <div className="text-sm md:text-base text-gray-900">{currentProduct.technicalSpecs.deployment}</div>
                      </div>
                      <div>
                        <div className="text-xs md:text-sm font-medium text-gray-900">Integration Capabilities</div>
                        <div className="text-sm md:text-base text-gray-900">{currentProduct.technicalSpecs.integration}</div>
                      </div>
                      <div>
                        <div className="text-xs md:text-sm font-medium text-gray-900">Security & Compliance</div>
                        <div className="text-sm md:text-base text-gray-900">{currentProduct.technicalSpecs.security}</div>
                      </div>
                      <div>
                        <div className="text-xs md:text-sm font-medium text-gray-900"></div>
                        <div className="text-sm md:text-base text-gray-900">{currentProduct.technicalSpecs.sla}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Industries */}
                <div className="grid grid-cols-1 gap-4 md:gap-8">

                  <div className="rounded-lg shadow-sm border border-red-200 p-4 md:p-8 bg-white hover:shadow-lg transition-all duration-300 transform ">
                    <h3 className="text-lg md:text-xl font-semibold text-red-600 mb-3 md:mb-6 flex items-center space-x-2">
                      <Building2 className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                      <span>Industry Applications</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                      {currentProduct.industryFocus.map((industry, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 md:p-3 rounded-lg learning-highlight">
                          <Award className="w-3 h-3 md:w-4 md:h-4 text-red-500 insight-pulse" />
                          <span className="text-xs md:text-sm text-gray-900">{industry}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Executive Contact Section - Hidden on Mobile */}
      <div className="hidden md:block py-4 md:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-8">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 text-red-600">
              Executive Consultation Services
            </h2>
            <p className="text-base md:text-xl text-gray-700 max-w-3xl mx-auto">
              Partner with our enterprise solution architects to develop a strategic roadmap tailored to your business objectives and digital transformation goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="rounded-lg p-4 sm:p-6 md:p-6 text-center bg-white border border-red-200 shadow-sm learning-highlight">
              <div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:bg-red-600">
                  <Phone className="w-6 h-6 md:w-7 md:h-7 text-white learning-flow" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-red-600">Strategic Advisory</h3>
              </div>
              <p className="text-sm text-gray-700 leading-tight">
                One-on-one consultation with certified solution architects to assess your enterprise requirements and develop implementation strategies.
              </p>
            </div>
            
            <div className="rounded-lg p-4 sm:p-6 md:p-6 text-center bg-white border border-red-200 shadow-sm learning-highlight" >
              <div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:bg-red-600">
                  <FileText className="w-6 h-6 md:w-7 md:h-7 text-white strategic-thinking" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-red-600">Business Case Development</h3>
              </div>
              <p className="text-sm text-gray-700 leading-tight">
                Comprehensive ROI analysis, risk assessment, and business case documentation to support your technology investment decisions.
              </p>
            </div>
            
            <div className="rounded-lg p-4 sm:p-6 md:p-6 text-center bg-white border border-red-200 shadow-sm learning-highlight">
              <div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:bg-red-600">
                  <Award className="w-6 h-6 md:w-7 md:h-7 text-white insight-pulse" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-red-600">Proof of Concept</h3>
              </div>
              <p className="text-sm text-gray-700 leading-tight">
                Customized demonstration environments and pilot programs to validate solution fit and demonstrate business value.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SAPProductsInfo;