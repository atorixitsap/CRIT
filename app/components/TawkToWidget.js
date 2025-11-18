'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import '@fortawesome/fontawesome-free/css/all.css';

const TAWK_TO_KEY = '6890795160925719231fc7d5';
const TAWK_TO_WIDGET_ID = '1j1q5jq00'; // Replace with your actual widget ID
const TAWK_TO_SRC = `https://embed.tawk.to/${TAWK_TO_KEY}/${TAWK_TO_WIDGET_ID}`;

export default function TawkToWidget({ hideButtons = false }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Set custom z-index and error handling BEFORE widget loads
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_API.customStyle = {
      zIndex: 20  // Set your desired z-index here
    };

    // Handle socket callback errors
    window.Tawk_API.onError = function(error) {
      if (error && error.message && error.message.includes('visitorChatDismiss')) {
        // Ignore visitorChatDismiss callback errors as they don't affect functionality
        return false;
      }
      console.error('Tawk.to error:', error);
      return true;
    };

    setMounted(true);

    // Strong CSS override for Tawk.to widget sizing & position
    const style = document.createElement('style');
    style.textContent = `
      /* Font Awesome icon override for Tawk.to */
      .tawk-icon,
      .tawk-icon:before,
      .tawk-icon:after {
        font-family: 'Font Awesome 5 Free' !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      .tawk-icon-chat:before {
        content: '\\f075' !important; /* Font Awesome chat icon */
      }
      /* Restrict widget iframe size and keep fixed position */
      iframe[title*="Tawk"] {
        max-width: 400px !important;
        max-height: 600px !important;
        min-width: 320px !important;
        min-height: 400px !important;
        width: 100% !important;
        height: 100% !important;
        border-radius: 12px !important;
        box-shadow: 0 4px 32px rgba(0,0,0,0.18);
        right: 16px !important;
        bottom: 24px !important;
        position: fixed !important;
      }
      @media (max-width: 480px) {
        iframe[title*="Tawk"] {
          max-width: 98vw !important;
          max-height: 60vh !important;
          width: 98vw !important;
        }
      }
      .tawk-button-container {
        transition: opacity 0.3s !important;
      }
      .hide-tawk-widget .tawk-button-container {
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);

    // Minimize widget if URL hash is #max-widget
    const minimizeIfMaximized = () => {
      if (window.Tawk_API && window.location.hash === '#max-widget') {
        window.Tawk_API.minimize();
        history.replaceState(null, document.title, window.location.pathname + window.location.search);
      }
    };

    let intervalId;
    if (window.Tawk_API) {
      window.Tawk_API.onLoad = () => {
        minimizeIfMaximized();
      };
    } else {
      intervalId = setInterval(() => {
        if (window.Tawk_API) {
          window.Tawk_API.onLoad = () => {
            minimizeIfMaximized();
          };
          minimizeIfMaximized();
          clearInterval(intervalId);
        }
      }, 500);
    }

    // Cleanup on component unmount
    return () => {
      try {
        if (style && style.parentNode) {
          document.head.removeChild(style);
        }
      } catch (e) {
        console.warn('Error cleaning up Tawk.to styles:', e);
      }
      
      if (intervalId) {
        clearInterval(intervalId);
      }
      
      // Clean up global Tawk_API if no other instances are using it
      if (window.Tawk_API) {
        try {
          window.Tawk_API = undefined;
        } catch (e) {
          console.warn('Error cleaning up Tawk_API:', e);
        }
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={[
        'fixed bottom-24 right-8 z-20 transition-opacity duration-300',
        hideButtons ? 'opacity-0 pointer-events-none' : 'opacity-100',
      ].join(' ')}
    >
      <Script
        id="tawk-to-script"
        strategy="afterInteractive"
        src={TAWK_TO_SRC}
        crossOrigin="anonymous"
        onError={e => console.error('Tawk.to script failed to load', e)}
      />
    </div>
  );
}
