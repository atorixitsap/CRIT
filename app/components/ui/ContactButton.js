'use client';

import dynamic from 'next/dynamic';
import { MessageCircle, Mail } from 'lucide-react';
import Link from 'next/link';

// This component will only be rendered on the client side
function ContactButtonClient() {
  return (
    <div className={`fixed bottom-4 left-5 z-500`}>
      <Link
        href="/contact"
        className="
          flex items-center justify-center 
          w-15 h-15 rounded-full 
          bg-red-500 hover:bg-red-600 
          transition-all duration-300
          animate-fadeInUp
        "
        aria-label="Contact Us"
      >
        <Mail className="w-7 h-7 text-white" />
       </Link>
    </div>
  );
}

// Export a dynamic version that doesn't use SSR
export default dynamic(() => Promise.resolve(ContactButtonClient), {
  ssr: false,
});
