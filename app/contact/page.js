'use client';
import ContactForm from "./components/contactform-c";
import ConnectWithUs from "./components/connect";
import ContactSection from "./components/contactus";
import "./contactus.css";
import { useEffect, useState } from 'react';

export default function ContactPage() {

const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render components on the client side
  if (!isClient) {
    return (
      <div className="relative overflow-hidden max-w-[1800px] w-full mx-auto bg-[#fff5f5] min-h-screen">
        {/* SEO H1 - Only for search engines */}
        <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        Contact Us
        </h1>
        <div className="h-screen w-full bg-gray-100 animate-pulse"></div>
      </div>
    );
  }

  return (
    <section className="bg-[#fff5f5]">
        
        <ContactSection />
        <div>
          <ContactForm />
          <ConnectWithUs />
        </div>
      </section>
  );
}