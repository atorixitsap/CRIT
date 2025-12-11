'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import CareerPage from './components/general'

export default function Career() {
  const pathname = usePathname();

  useEffect(() => {
    // Client-side specific code can go here
    // For example, analytics tracking, etc.
  }, [pathname]);

  return (
    <main className="relative bg-[#fff5f5]">
      
      <CareerPage />
    </main>
  );
}
