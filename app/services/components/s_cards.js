import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Users, Clock, Award, BookOpen, Target, Briefcase, ArrowUpRight, ArrowRight, Link2 } from 'lucide-react';

const ServicesGrid1 = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [filterPosition, setFilterPosition] = useState({ left: 0, width: 0 });
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);

  const categories = [
    { 
      id: 'all', 
      label: 'All Services', 
      icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />, 
      color: '#dc2626',
      bgColor: 'bg-red-50',
      hoverBg: 'hover:bg-red-50',
      textColor: 'text-red-600',
      borderColor: 'border-red-100'
    },
    { 
      id: 'implementation', 
      label: 'Implementation', 
      icon: <Target className="w-4 h-4 sm:w-5 sm:h-5" />, 
      color: '#2563eb',
      bgColor: 'bg-blue-50',
      hoverBg: 'hover:bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-100'
    },
    { 
      id: 'support', 
      label: 'Support', 
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />, 
      color: '#059669',
      bgColor: 'bg-emerald-50',
      hoverBg: 'hover:bg-emerald-50',
      textColor: 'text-emerald-600',
      borderColor: 'border-emerald-100'
    },
    { 
      id: 'upgrade', 
      label: 'Upgrade', 
      icon: <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />, 
      color: '#9333ea',
      bgColor: 'bg-purple-50',
      hoverBg: 'hover:bg-purple-50',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-100'
    },
    { 
      id: 'integration', 
      label: 'Integration', 
      icon: <Link2 className="w-4 h-4 sm:w-5 sm:h-5" />, 
      color: '#f59e0b',
      bgColor: 'bg-amber-50',
      hoverBg: 'hover:bg-amber-50',
      textColor: 'text-amber-600',
      borderColor: 'border-amber-100'
    },
    { 
          id: 'analytics', 
          label: 'Analytics', 
          icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />, 
          color: '#dc2626',
          bgColor: 'bg-red-50',
          hoverBg: 'hover:bg-red-50',
          textColor: 'text-red-600',
          borderColor: 'border-red-100'
        }
  ];

  const extensions = [
    {
        id: 1,
        icon: { type: 'img', url: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1751005882/icons8-rocket-64_u9psqx.png' },
        name: "SAP Implementation Services",
        description: "End-to-end SAP implementation Services solutions that expertly align with your business goals and drive long-term value.",
        link: "/sap-implementation-services",
        category: "implementation",
        color: "#dc2626",
        tags: ["Implementation", "ERP", "Business"]
    },
    {
        id: 2,
        icon: { type: 'img', url: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1751005441/icons8-globe-100_v27ffj.png' },
        name: "SAP Rollout  Services",
        description: "Accelerate business expansion with structured SAP Rollout  services that deliver speed, accuracy, and continuity.",
        link: "/sap-Rollout-services",
        category: "implementation",
        color: "#dc2626",
        tags: ["Rollout ", "Global", "Deployment"]
    },
    {
        id: 3,
        icon: { type: 'img', url: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1751005368/icons8-support-100_mi1gat.png' },
        name: "SAP Support Services",
        description: "Expert-led SAP support Services to minimize downtime, optimize performance, and drive continuous improvement.",
        link: "/sap-support-services",
        category: "support",
        color: "#dc2626",
        tags: ["Support", "Maintenance", "Help"]
    },
    {
        id: 4,
        icon: { type: 'img', url: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1751005286/icons8-upgrade-96_ursgya.png' },
        name: "SAP Upgrade Services",
        description: "Secure SAP upgrades Services tailored to your business needs—enabling better insights and faster operations.",
        link: "/sap-upgrade-services",
        category: "upgrade",
        color: "#dc2626",
        tags: ["Upgrade", "Migration", "Modern"]
    },
    {
        id: 5,
        icon: { type: 'img', url: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1751005760/icons8-integration-80_c0ug69.png' },
        name: "SAP Integration Services",
        description: "Seamless SAP Integration Services and platforms to ensure unified data and optimized workflows.",
        link: "/sap-integration-services",
        category: "integration",
        color: "#dc2626",
        tags: ["Integration", "API", "Connectivity"]
    },
    {
        id: 6,
        icon: { type: 'img', url: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1751005703/icons8-migration-64_kgr8tx.png' },
        name: "SAP Migration Services",
        description: "Efficient SAP migration services to modernize your systems and unlock future-ready capabilities.",
        link: "/sap-migration-services",
        category: "integration",
        color: "#dc2626",
        tags: ["Migration", "Data", "Transfer"]
    },
    {
        id: 7,
        icon: { type: 'img', url: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1751005595/icons8-automation-80_zccrcv.png' },
        name: "SAP Automation Services",
        description: "Advanced SAP automation services that reduce costs, increase speed, and ensure process consistency.",
        link: "/sap-automation-services",
        category: "integration",
        color: "#dc2626",
        tags: ["Automation", "RPA", "Efficiency"]
    },
    {
        id: 8,
        icon: { type: 'img', url: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1751005506/icons8-testing-100_xsgqf9.png' },
        name: "SAP Testing Services",
        description: "Professional SAP testing services designed to optimize your business processes and maximize ROI.",
        link: "/sap-testing-services",
        category: "support",
        color: "#dc2626",
        tags: ["Testing", "QA", "Quality"]
    },
    {
      id: 9, 
      icon: { type: 'img', url: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1755074749/report_11925421_1_bylqsk.png' },
      name: "Data Analytics",
      description: "Data analytics transforms information into insights, driving smarter business decisions",
      link: "/data-analytics",
      category: "analytics",
      color: "#dc2626",
      tags: ["Data", "Analytics", "Insights"]
    }
];

  // Get filtered extensions based on active category
  const filteredExtensions = activeCategory === 'all' 
    ? extensions 
    : extensions.filter(ext => ext.category === activeCategory);

  const activeCount = categories.find(cat => cat.id === activeCategory)?.count || 0;
  const activeColor = categories.find(cat => cat.id === activeCategory)?.color || '#dc2626';

  useEffect(() => {
    // Animate filter appearance
    setIsFilterVisible(true);
    
    // Initialize filter indicator position for the active category
    const activeButton = document.querySelector(`.filter-btn[data-category="${activeCategory}"]`);
    if (activeButton) {
      const container = activeButton.parentElement;
      const scrollLeft = container.scrollLeft;
      const rect = activeButton.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const left = rect.left - containerRect.left + scrollLeft;
      
      setFilterPosition({
        left: left,
        width: rect.width
      });
    }
  }, [activeCategory]);

  const handleCategoryClick = (category, event) => {
    const button = event.currentTarget;
    const container = button.parentElement;
    
    // Get the scroll position of the container
    const scrollLeft = container.scrollLeft;
    const rect = button.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Calculate the position relative to the container, accounting for scroll
    const left = rect.left - containerRect.left + scrollLeft;
    
    setFilterPosition({
      left: left,
      width: rect.width
    });
    
    setActiveCategory(category.id);
    
    // Scroll the button into view if needed
    button.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  };

  return (
    <>
      <style>{`
  * {
    box-sizing: border-box;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  .extension-showcase {
    padding: 40px 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    position: relative;
  }

  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
    position: relative;
    z-index: 1;
  }

  .header-section {
    text-align: center;
    margin-bottom: 32px;
  }

  .section-title {
    font-size: 56px;
    font-weight: 800;
    margin-bottom: 20px;
    color: #0a0a0a;
    letter-spacing: -0.02em;
    line-height: 1.1;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .gradient-text {
    background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .section-subtitle {
    font-size: 20px;
    color: #64748b;
    margin-bottom: 24px;
    line-height: 1.6;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  /* TABLET VIEW ONLY - Cards Side by Side */
  @media (min-width: 768px) and (max-width: 1024px) {
    .extension-showcase {
      padding: 50px 0;
    }
    
    .container {
      padding: 0 32px;
    }
    
    .section-title {
      font-size: 48px;
      margin-bottom: 18px;
    }
    
    .section-subtitle {
      font-size: 19px;
      max-width: 700px;
      margin-bottom: 28px;
    }
    
    /* Tablet Filter Styles */
    .filter-container {
      margin-bottom: 32px;
      padding: 0 20px;
    }
    
    .category-filters {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 12px;
      padding: 12px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
      border: 1px solid #f1f5f9;
    }
    
    .filter-btn {
      padding: 12px 24px;
      border: 1px solid #e2e8f0;
      background: white;
      border-radius: 14px;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      color: #475569;
      display: flex;
      align-items: center;
      gap: 10px;
      white-space: nowrap;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
      min-height: 48px;
    }
    
    .filter-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
      border-color: #cbd5e1;
      color: #dc2626;
    }
    
    .filter-btn.active {
      font-weight: 600;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
      color: ${activeColor};
    }
    
    .filter-icon {
      font-size: 18px;
      transition: transform 0.3s ease;
    }
    
    .filter-btn:hover .filter-icon {
      transform: scale(1.2);
    }
    
    .filter-btn.active .filter-icon {
      animation: pulse 2s infinite;
    }
    
    /* Tablet Grid Layout - Side by Side Cards */
    .extensions-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 40px;
      max-width: 100%;
      align-items: stretch;
    }
    
    /* Tablet Card Styles */
    .extension-card {
      background: white;
      border-radius: 18px;
      padding: 28px;
      border: 1px solid #fecaca;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      position: relative;
      overflow: hidden;
      animation: slideIn 0.6s ease-out forwards;
      animation-delay: calc(var(--index) * 0.05s);
      opacity: 0;
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 300px;
    }
    
    .extension-card:hover {
      transform: translateY(-6px) scale(1.02);
      box-shadow: 0 25px 50px rgba(220, 38, 38, 0.15), 0 15px 25px rgba(220, 38, 38, 0.1);
      border-color: #f87171;
      background: linear-gradient(135deg, #ffffff 0%, #fef2f2 100%);
      text-decoration: none;
      color: inherit;
    }
    
    .extension-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--card-color);
      transform: scaleX(0);
      transition: transform 0.3s ease;
      transform-origin: left;
    }
    
    .extension-card:hover::before {
      transform: scaleX(1);
    }
    
    .card-header {
      display: flex;
      align-items: flex-start;
      gap: 18px;
      margin-bottom: 18px;
    }
    
    .extension-icon {
      font-size: 44px;
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fef2f2;
      border-radius: 14px;
      flex-shrink: 0;
    }
    
    .extension-info {
      flex: 1;
    }
    
    .extension-name {
      font-size: 19px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #0a0a0a;
      line-height: 1.3;
    }
    
    .extension-description {
      font-size: 15px;
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 20px;
      flex-grow: 1;
    }
    
    .extension-tags {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: auto;
    }
    
    .tag {
      font-size: 13px;
      padding: 6px 12px;
      background: #fef2f2;
      color: #dc2626;
      border-radius: 8px;
      font-weight: 500;
    }
    
    /* Tablet Footer */
    .view-all-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 16px 32px;
      background: #dc2626;
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 17px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      min-height: 56px;
    }
    
    .view-all-btn:hover {
      background: #991b1b;
      transform: translateY(-3px);
      box-shadow: 0 12px 24px rgba(220, 38, 38, 0.25);
    }
  }

  /* MOBILE VIEW - Single Column */
  @media (max-width: 767px) {
    .section-title {
      font-size: 32px;
      margin-bottom: 16px;
    }
    
    .section-subtitle {
      font-size: 16px;
      padding: 0 16px;
      margin-bottom: 20px;
    }
    
    .container {
      padding: 0 16px;
    }
    
    .extensions-grid {
      display: grid;
      grid-template-columns: 1fr !important;
      gap: 16px;
      margin-bottom: 32px;
    }
    
    .extension-card {
      background: white;
      border-radius: 16px;
      padding: 24px;
      border: 1px solid #fecaca;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      position: relative;
      overflow: hidden;
      animation: slideIn 0.6s ease-out forwards;
      animation-delay: calc(var(--index) * 0.05s);
      opacity: 0;
      text-decoration: none;
      color: inherit;
    }
    
    .extension-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 15px 30px rgba(220, 38, 38, 0.15);
      border-color: #f87171;
      text-decoration: none;
      color: inherit;
    }
    
    .card-header {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 16px;
    }
    
    .extension-icon {
      font-size: 36px;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fef2f2;
      border-radius: 12px;
      flex-shrink: 0;
    }
    
    .extension-name {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 4px;
      color: #0a0a0a;
      line-height: 1.3;
    }
    
    .extension-description {
      font-size: 14px;
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 16px;
    }
    
    .extension-tags {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }
    
    .tag {
      font-size: 12px;
      padding: 4px 10px;
      background: #fef2f2;
      color: #dc2626;
      border-radius: 6px;
      font-weight: 500;
    }
  }
  
  @media (max-width: 480px) {
    .section-title {
      font-size: 28px;
    }
    
    .section-subtitle {
      font-size: 14px;
    }
  }

  /* DESKTOP VIEW - Multiple Columns */
  @media (min-width: 1025px) {
    .extensions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }
    
    .extension-card {
      background: white;
      border-radius: 16px;
      padding: 28px;
      border: 1px solid #fecaca;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      position: relative;
      overflow: hidden;
      animation: slideIn 0.6s ease-out forwards;
      animation-delay: calc(var(--index) * 0.05s);
      opacity: 0;
      text-decoration: none;
      color: inherit;
    }
    
    .extension-card:hover {
      transform: translateY(-6px) scale(1.02);
      box-shadow: 0 20px 40px rgba(220, 38, 38, 0.15), 0 10px 20px rgba(220, 38, 38, 0.1);
      border-color: #f87171;
      background: linear-gradient(135deg, #ffffff 0%, #fef2f2 100%);
      text-decoration: none;
      color: inherit;
    }
    
    .extension-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--card-color);
      transform: scaleX(0);
      transition: transform 0.3s ease;
      transform-origin: left;
    }
    
    .extension-card:hover::before {
      transform: scaleX(1);
    }
    
    .card-header {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 16px;
    }
    
    .extension-icon {
      font-size: 40px;
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fef2f2;
      border-radius: 12px;
      flex-shrink: 0;
    }
    
    .extension-info {
      flex: 1;
    }
    
    .extension-name {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 4px;
      color: #0a0a0a;
      line-height: 1.3;
    }
    
    .extension-description {
      font-size: 14px;
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 16px;
    }
    
    .extension-tags {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }
    
    .tag {
      font-size: 12px;
      padding: 4px 10px;
      background: #fef2f2;
      color: #dc2626;
      border-radius: 6px;
      font-weight: 500;
    }
  }

  /* Filter Design - Desktop */
  .filter-container {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
    opacity: ${isFilterVisible ? '1' : '0'};
    transform: translateY(${isFilterVisible ? '0' : '20px'});
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .category-filters {
    display: flex;
    gap: 12px;
    padding: 8px;
    background: white;
    border-radius: 16px;
    position: relative;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100%;
    margin: 0 auto;
  }

  .filter-indicator {
    position: absolute;
    top: 6px;
    height: calc(100% - 12px);
    background: ${activeColor};
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    left: ${filterPosition.left}px;
    width: ${filterPosition.width}px;
    opacity: 0.1;
  }

  .filter-btn {
    padding: 10px 20px;
    border: 1px solid #e5e7eb;
    background: white;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: #4b5563;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  /* Mobile filter styles override */
  @media (max-width: 767px) {
    .filter-indicator {
      display: none;
    }

    .filter-container {
      padding: 0 16px;
      position: relative;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    
    .filter-container::-webkit-scrollbar {
      display: none;
    }
    
    .category-filters {
      width: max-content;
      min-width: 100%;
      position: relative;
      padding: 4px;
      gap: 4px;
    }
    
    .filter-btn {
      padding: 8px 16px;
      font-size: 13px;
      gap: 6px;
      border: 1px solid #e5e7eb;
      background: white;
      border-radius: 8px;
      margin: 0 2px;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
    
    .filter-btn.active {
      color: #4b5563;
      font-weight: 500;
      background: #f9fafb;
      border-color: #d1d5db;
    }
    
    .filter-btn .filter-count {
      background: #f3f4f6;
      color: #4b5563;
      border-radius: 10px;
      padding: 0 6px;
      font-size: 12px;
      height: 20px;
      min-width: 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    
    .filter-icon {
      font-size: 16px;
    }
  }

  .filter-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    color: #dc2626;
  }

  .filter-btn.active {
    color: ${activeColor};
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .filter-icon {
    font-size: 16px;
    transition: transform 0.3s ease;
  }

  .filter-btn:hover .filter-icon {
    transform: scale(1.2);
  }

  .filter-btn.active .filter-icon {
    animation: pulse 2s infinite;
  }

  .filter-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
    height: 24px;
    padding: 0 6px;
    background: rgba(220, 38, 38, 0.1);
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    transition: all 0.3s ease;
    color: #dc2626;
  }

  .filter-btn.active .filter-count {
    background: ${activeColor};
    color: white;
    transform: scale(1.1);
  }

  /* Active Category Stats */
  .active-stats {
    text-align: center;
    margin-bottom: 16px;
    opacity: 0.8;
  }

  .active-stats-text {
    font-size: 14px;
    color: #64748b;
  }

  .active-stats-number {
    font-weight: 600;
    color: ${activeColor};
    font-size: 16px;
  }

  /* Footer */
  .footer-section {
    text-align: center;
  }

  .view-all-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    background: #dc2626;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .view-all-btn:hover {
    background: #991b1b;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(220, 38, 38, 0.2);
  }

  .arrow-icon {
    transition: transform 0.2s ease;
  }

  .view-all-btn:hover .arrow-icon {
    transform: translateX(4px);
  }
`}</style>

      <section id="services" className="extension-showcase">
        <div className="relative z-10 text-center sm:mb-12 px-4 sm:px-1">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 inline-block relative">
            <span className="text-black">Our </span>
            <span className="text-red-500">Services</span>
            <svg className="mx-auto my-0" style={{marginTop: '-4px'}} width="160" height="18" viewBox="0 0 220 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 18 Q 110 8, 215 14" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" fill="none"/>
              <path d="M15 21 Q 120 15, 200 18" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
          </h1>
          <p className="text-base sm:text-lg text-black max-w-3xl mx-auto px-2 sm:px-0 pb-5 md:pb-1">
            Your Trusted SAP Partner Delivering Comprehensive Solutions and Unparalleled Expertise
          </p>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-red-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-red-300/10 rounded-full blur-2xl" />
        
        <div className="container">
          {/* Custom Tabs Implementation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 px-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? `${category.bgColor} ${category.textColor} shadow-md`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.icon}
                <span>{category.label}</span>
              </button>
            ))}
          </div>

          <div className="extensions-grid">
            {Array.isArray(filteredExtensions) && filteredExtensions.map((extension, index) => {
              // Skip rendering if extension is not valid
              if (!extension || typeof extension !== 'object') return null;
              
              return (
                <Link 
                  href={extension.link || '#'}
                  key={extension.id || `extension-${index}`}
                  className="block hover:no-underline"
                >
                  <div 
                    className="extension-card"
                    style={{
                      '--card-color': extension.color || '#dc2626',
                      '--index': index
                    }}
                    onMouseEnter={() => setHoveredCard(extension.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="card-header">
                      <div className="extension-icon">
                        {extension.icon && typeof extension.icon === 'object' && extension.icon.type === 'img' ? (
                          <img
                            src={extension.icon.url || ''}
                            alt={(extension.name || 'Service') + ' icon'}
                            className="w-8 h-8 object-contain filter brightness-0 invert-[0.3] sepia-[0.8] saturate-[2.5] hue-rotate-[340deg]"
                            onError={(e) => {
                              // Fallback if image fails to load
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          extension.icon || <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        )}
                      </div>
                      <div className="extension-info">
                        <h3 className="extension-name">{extension.name || 'Service'}</h3>
                      </div>
                    </div>
                    <p className="extension-description">{extension.description || 'No description available'}</p>
                    {Array.isArray(extension.tags) && extension.tags.length > 0 && (
                      <div className="extension-tags">
                        {extension.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        
        
      </section>
    </>
  );
};

export default ServicesGrid1;
