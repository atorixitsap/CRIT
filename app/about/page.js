'use client';

import { useEffect, useState, Suspense, lazy, useCallback } from 'react';
import { usePathname } from 'next/navigation';

// Lazy load heavy components
const OurMissionSection = lazy(() => import("./components/expertise"));
const ERPImplementationDiagram = lazy(() => import("./components/erp"));
const TechHero = lazy(() => import("./components/hero"));
const Journey = lazy(() => import("./components/journey"));

// Loading component
const LoadingPlaceholder = () => (
  <div className="relative overflow-hidden max-w-[1800px] w-full mx-auto bg-[#fff5f5] min-h-screen">
    <h1 className="sr-only">
      About the Connecting Roots
    </h1>
    <div className="h-screen w-full bg-gray-100 animate-pulse"></div>
  </div>
);

// Component for client-side only rendering
function ClientOnly({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Use requestIdleCallback to avoid blocking the main thread
    const idleId = requestIdleCallback(() => {
      setIsClient(true);
    });

    return () => cancelIdleCallback(idleId);
  }, []);

  if (!isClient) {
    return <LoadingPlaceholder />;
  }

  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      {children}
    </Suspense>
  );
}

export default function AboutPage() {
  const pathname = usePathname();

  // Wrap analytics in a useCallback to prevent unnecessary re-renders
  const trackPageView = useCallback(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'YOUR_GA_MEASUREMENT_ID', {
        page_path: pathname,
      });
    }
  }, [pathname]);

  useEffect(() => {
    // Defer non-critical work
    const timer = setTimeout(trackPageView, 0);
    return () => clearTimeout(timer);
  }, [trackPageView]);

  return (
    <ClientOnly>
      <main className="min-h-* bg-[#fff5f5]">
        <TechHero />
        <div className="relative min-h-*">
          <Journey />
        </div>
        <div className="relative min-w-* min-h-*">
          <ERPImplementationDiagram />
        </div>
        <div className="relative">
          <OurMissionSection />
        </div>
      </main>
    </ClientOnly>
  );
}