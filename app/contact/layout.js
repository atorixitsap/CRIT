import { metadata } from './metadata';

export { metadata };

export default function ContactLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.critindia.com/contact",
        "url": "https://www.critindia.com/contact",
        "name": "Contact Us | Connecting Roots - SAP Consulting & Support",
        "description": "Get in touch with our SAP experts at Connecting Roots. Contact us for SAP implementation, support, and consulting services.",
        "isPartOf": { "@id": "https://www.critindia.com/#website" },
        "about": { "@id": "https://www.critindia.com/#organization" },
        "primaryImageOfPage": { "@id": "https://www.critindia.com/#primaryimage" },
        "image": { "@id": "https://www.critindia.com/#primaryimage" },
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
