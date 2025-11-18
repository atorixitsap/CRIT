import { metadata } from './metadata';

export { metadata };

export default function AboutLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.critindia.com/about",
        "url": "https://www.critindia.com/about",
        "name": "About Us - critindia",
        "isPartOf": { "@id": "https://www.critindia.com/#website" },
        "about": { "@id": "https://www.critindia.com/#organization" },
        "primaryImageOfPage": { "@id": "https://www.critindia.com/#primaryimage" },
        "image": { "@id": "https://www.critindia.com/#primaryimage" },
        "thumbnailUrl": "https://www.critindia.com/critindia.png",
        "inLanguage": "en-US"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.critindia.com/about#breadcrumb",
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
            "name": "About Us"
          }
        ]
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
