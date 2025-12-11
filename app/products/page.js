'use client';
import SAPProductPage from "./components/product_hero";
import SAPProductsInfo from './components/p_info';
import { useEffect, useState } from 'react';

export default function Page() {

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
          Learn More About SAP Products
          </h1>
          <div className="h-screen w-full bg-gray-100 animate-pulse"></div>
        </div>
      );
    }

  return (
    <div className="min-h-screen bg-[#fff5f5]">
      <div className="relative pt-10">   
        <SAPProductPage />
        <SAPProductsInfo />
      </div>
    </div>
  );
}