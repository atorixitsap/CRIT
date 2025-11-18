'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Layout({ children }) {
  const { service } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [serviceName, setServiceName] = useState(service);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await fetch('/json/data/masterdata.json');
        const data = await response.json();
        
        // Find the service data based on the URL parameter
        const foundService = data.services.find(s => s.id === service || s.slug === `${service}-services`);
        
        if (foundService) {
          setServiceData(foundService);
          setServiceName(foundService.fullTitle || foundService.title);
        } else {
          // Fallback to service name from URL if not found
          setServiceName(service.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' '));
        }
      } catch (error) {
        console.error('Error loading service data:', error);
        setServiceName(service.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '));
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceData();
  }, [service]);

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }
  const serviceUrl = `https://critindia.com/${service}`;

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': serviceUrl,
        url: serviceUrl,
        name: `${serviceName} | CRIT-P`,
        description: `Professional ${serviceName} to help your business implement and optimize SAP solutions.`,
        keywords: serviceData?.keywords || `${serviceName}, SAP Services, CRIT India`,
        inLanguage: 'en-US',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://crit-p.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: 'https://crit-p.com/services',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: serviceName,
            item: serviceUrl,
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://crit-p.com/#website',
        url: 'https://crit-p.com',
        name: 'CRIT-P',
        description: 'SAP Consulting & Implementation Services',
        publisher: {
          '@type': 'Organization',
          name: 'CRIT-P',
          logo: {
            '@type': 'ImageObject',
            url: 'https://crit-p.com/logo.png',
          },
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'Organization',
        '@id': 'https://crit-p.com/#organization',
        name: 'CRIT-P',
        url: 'https://crit-p.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://crit-p.com/logo.png',
          width: 180,
          height: 60,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-234-567-8900',
          contactType: 'customer service',
          email: 'info@crit-p.com',
          areaServed: 'US',
          availableLanguage: ['English'],
        },
        sameAs: [
          'https://www.facebook.com/critp',
          'https://www.twitter.com/critp',
          'https://www.linkedin.com/company/critp',
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}