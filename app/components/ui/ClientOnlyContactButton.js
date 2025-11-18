'use client';

import dynamic from 'next/dynamic';

// Dynamically import the ContactButton with SSR disabled
const ContactButton = dynamic(
  () => import('./ContactButton'),
  { ssr: false }
);

export default function ClientOnlyContactButton() {
  return <ContactButton />;
}
