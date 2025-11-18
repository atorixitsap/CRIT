import { metadata } from './metadata';
import Script from 'next/script';

export { metadata };

export default function CareerLayout({ children }) {
  const structuredData = JSON.stringify(metadata.structuredData);
  
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredData,
        }}
      />
      {children}
    </>
  );
}
