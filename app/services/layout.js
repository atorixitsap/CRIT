import { metadata } from './metadata';

export { metadata };

export default function ServicesLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.critindia.com/services",
        "url": "https://www.critindia.com/services",
        "name": "SAP Services - critindia",
        "isPartOf": { "@id": "https://www.critindia.com/#website" },
        "about": { "@id": "https://www.critindia.com/#organization" },
        "primaryImageOfPage": { "@id": "https://www.critindia.com/#primaryimage" },
        "image": { "@id": "https://www.critindia.com/#primaryimage" },
        "thumbnailUrl": "https://www.critindia.com/critindia.png",
        "inLanguage": "en-US"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.critindia.com/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.critindia.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services"
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.critindia.com/#website",
        "url": "https://www.critindia.com/",
        "name": "critindia",
        "description": "Connecting roots of SAP",
        "publisher": { "@id": "https://www.critindia.com/#organization" },
        "inLanguage": "en-US"
      },
      {
        "@type": "Organization",
        "@id": "https://www.critindia.com/#organization",
        "name": "critindia",
        "url": "https://www.critindia.com/",
        "logo": {
          "@type": "ImageObject",
          "inLanguage": "en-US",
          "@id": "https://www.critindia.com/#/schema/logo/image/",
          "url": "https://www.critindia.com/critindia.png",
          "contentUrl": "https://www.critindia.com/critindia.png",
          "width": 150,
          "height": 40
        }
      }
    ]
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
