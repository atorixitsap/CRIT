"use client";
import React, { useState } from "react";
import { Linkedin, Twitter, Youtube, Facebook, Instagram } from "lucide-react";

const ConnectWithUs = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const socialLinks = [
    {
      platform: "linkedin",
      Icon: Linkedin,
      iconName: "LinkedIn",
      brandColor: "#0077b5",
      href: "#", // Add your actual LinkedIn URL here
    },
    {
      platform: "twitter",
      Icon: Twitter,
      iconName: "Twitter",
      brandColor: "#1da1f2",
      href: "#", // Add your actual Twitter/X URL here
    },
    {
      platform: "youtube",
      Icon: Youtube,
      iconName: "YouTube",
      brandColor: "#ff0000",
      href: "#", // Add your actual YouTube URL here
    },
    {
      platform: "facebook",
      Icon: Facebook,
      iconName: "Facebook",
      brandColor: "#1877f3",
      href: "#", // Add your actual Facebook URL here
    },
    {
      platform: "instagram",
      Icon: Instagram,
      iconName: "Instagram",
      brandColor: "#fd5d47",
      href: "#", // Add your actual Instagram URL here
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 pt-6 sm:pt-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 inline-block relative">
            <span className="text-black">Follow </span>
            <span className="text-red-500">Our Socials</span>
            <svg
              className="mx-auto my-0"
              style={{ marginTop: "-4px" }}
              width="160"
              height="18"
              viewBox="0 0 220 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 18 Q 110 8, 215 14"
                stroke="#ffd700"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M15 21 Q 120 15, 200 18"
                stroke="#ffd700"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </h1>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image (desktop only) */}
          <div className="hidden lg:flex lg:justify-start lg:items-center lg:mb-0">
            <div className="relative w-full">
              <img
                srcSet="https://res.cloudinary.com/duz9xipfm/image/upload/v1752815690/pexels-fauxels-3183171_chppt6.jpg 800w,
                    https://res.cloudinary.com/duz9xipfm/image/upload/v1752815690/pexels-fauxels-3183171_chppt6.jpg 1200w"
                sizes="(max-width: 768px) 100vw, 50vw"
                src="https://res.cloudinary.com/duz9xipfm/image/upload/v1752815690/pexels-fauxels-3183171_chppt6.jpg"
                alt="Technology workspace with digital interfaces"
                width={800}
                height={600}
                className="w-full h-48 sm:h-64 lg:h-76 object-cover rounded-lg shadow-2xl"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-800/20 to-transparent rounded-lg"></div>
            </div>
          </div>

          {/* Right Side - Social Media Links */}
          <div className="w-full flex justify-center lg:block">
            {/* Icons centered on mobile/tablet, grid with labels on desktop */}
            <div className="flex justify-center gap-4 sm:gap-6 lg:grid lg:grid-cols-2 lg:gap-5 mt-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.Icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`flex items-center lg:justify-start gap-2 p-2 sm:p-3 lg:p-4 rounded-lg bg-black/5 hover:bg-black/15 transition-colors ${
                      hoveredIndex === index
                        ? "ring-1 ring-offset-1 ring-offset-white ring-opacity-50"
                        : ""
                    }`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    aria-label={`Follow us on ${social.iconName}`}
                  >
                    {/* Icon */}
                    <IconComponent
                      className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
                      strokeWidth={1.5}
                      style={{
                        color: hoveredIndex === index ? social.brandColor : "currentColor",
                        transition: "color 0.2s ease-in-out",
                      }}
                    />

                    {/* Text (desktop only) */}
                    <span className="hidden lg:inline-block text-sm lg:text-md text-gray-800">
                      {social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWithUs;
