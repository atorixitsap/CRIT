import React from 'react';
import Image from 'next/image';

const MovingClientsSection = () => {
  const clients = [
    { name: 'Binstellar', logo: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753945853/Binstellar_fzcqil.avif' },
    { name: 'SFMS', logo: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753945852/SFMS_bu6too.avif' },
    { name: 'Form6', logo: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753945852/Form6_cgfpju.avif' },
    { name: 'EPN', logo: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753945852/EPN_aniiah.avif' },
    { name: 'Protergia', logo: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753945852/protergia_uwbnzm.avif' },
    { name: 'NXI', logo: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753945852/NXI_a3a0yi.avif' },
    { name: 'Brihati', logo: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753946455/Brihati_1_uoswjm.avif' },
    { name: 'VP techno labs', logo: 'https://res.cloudinary.com/duz9xipfm/image/upload/v1753945852/VPTechnoLabsFinal_fieg3m.avif' },
  ];

  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }

        .animate-marquee {
          animation: marquee 60s linear infinite;
          width: max-content;
          will-change: transform;
        }

        .group:hover .animate-marquee {
          animation-play-state: paused;
        }

        /* Lock the height so the page doesn't shift when images/text load */
        .marquee-viewport {
          min-height: 92px; /* 64px tile + 16px label + ~4px spacing + 8px padding */
        }
        @media (min-width: 768px) {
          .marquee-viewport { min-height: 112px; } /* 80 + 16 + ~4 + 8 */
        }

        /* Fix label height to avoid shifts from font loading/swap */
        .logo-label {
          height: 1rem;          /* matches Tailwind text-xs line-height */
          line-height: 1rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        @media (max-width: 640px) {
          .animate-marquee { animation-duration: 45s; }
        }
        @media (max-width: 480px) {
          .animate-marquee { animation-duration: 35s; }
        }

        /* Accessibility: reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none; }
        }
      `}</style>

      <div className="text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 inline-block relative">
          <span className="text-black">Our </span>
          <span className="text-red-500">Clients</span>
          <svg className="mx-auto my-0" style={{ marginTop: '-4px' }} width="120" height="18" viewBox="0 0 180 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 18 Q 70 8, 170 14" stroke="#FFD700" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M25 21 Q 100 15, 160 18" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </h1>
      </div>

      <div className="w-full bg-[#00203F] drop-shadow-lg rounded-lg md:p-2">
        <div className="flex gap-8 md:gap-12">
          <div className="flex-grow relative overflow-hidden group pt-2 marquee-viewport">
            <div className="flex items-center animate-marquee">
              {duplicatedClients.map((client, index) => (
                <div key={`${client.name}-${index}`} className="flex-shrink-0 mx-8 md:mx-12">
                  <div className="relative flex items-center justify-center h-16 w-32 md:h-20 md:w-40 p-2 border border-white bg-white rounded-sm">
                    <Image
                      src={client.logo}
                      alt={`${client.name} logo`}
                      fill
                      sizes="(min-width: 768px) 10rem, 8rem"
                      style={{ objectFit: 'contain' }}
                      loading={index < clients.length ? 'eager' : 'lazy'}   /* only the first row eagerly */
                      priority={index < clients.length}                     /* reserve bandwidth for above-the-fold */
                    />
                  </div>
                  <div className="logo-label w-full text-center text-xs text-white font-medium mt-1">
                    {client.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovingClientsSection;