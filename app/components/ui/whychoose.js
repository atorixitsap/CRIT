"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// ✅ Dynamically load only the Check icon (lighter bundle for mobile)
const Check = dynamic(() => import("lucide-react").then((mod) => mod.Check), {
  ssr: false,
});

const WhyChooseUs = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  // ✅ Detect desktop vs mobile at runtime (for priority handling)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDesktop(window.innerWidth > 768);
    }
  }, []);

  const features = [
    {
      title: "Industry Expertise",
      description:
        "Deep understanding of industry-specific requirements and best practices. Our team of SAP consultants has extensive experience in SAP implementation and projects across industries and geographies.",
    },
    {
      title: "End-to-End Support",
      description:
        "From planning and preparation to deployment and post support, we provide comprehensive assistance at every stage of the process.",
    },
    {
      title: "Customized Solutions",
      description:
        "We tailor our SAP services to meet the unique needs and challenges of your organization, ensuring a smooth and successful implementation.",
    },
    {
      title: "Proven Methodology",
      description:
        "We follow a proven methodology and best practices to ensure that your SAP project is completed on time, within budget, and to your satisfaction.",
    },
  ];

  return (
    <section className="text-black flex items-center w-full px-2 py-8 sm:px-4 sm:py-12 lg:px-10 lg:py-20">
      <div className="max-w-7xl mx-auto w-full px-0 sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left side - Optimized Office Image */}
          <div className="relative w-full mb-8 lg:mb-0">
            <div className="rounded-none sm:rounded-xl overflow-hidden">
              <div className="relative w-full aspect-[16/9] sm:aspect-[4/3] md:aspect-[3/2] min-h-[180px] sm:min-h-[240px] md:min-h-[320px]">
                <Image
                  src="https://res.cloudinary.com/duz9xipfm/image/upload/v1754038579/business-people-working-with-ipad-side-view_bd7onf.avif"
                  alt="Connecting Roots IT Office showing team collaboration and modern workspace environment"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  // ✅ Better for mobile – only priority on desktop
                  priority={isDesktop}
                  loading={isDesktop ? "eager" : "lazy"}
                  fetchPriority={isDesktop ? "high" : "low"}
                  className="object-cover"
                  // ✅ Super lightweight blur placeholder (1x1 pixel)
                  placeholder="blur"
                  blurDataURL="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEA"
                />
              </div>
            </div>
          </div>

          {/* Right side - Features Content */}
          <div className="space-y-4 px-2 sm:px-8 lg:px-0">
            <header>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Why Choose{" "}
                <span className="text-red-500">Connecting Roots IT</span>
              </h2>
            </header>

            <ul className="space-y-2" role="list">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex sm:flex-row items-start gap-1 sm:gap-4"
                >
                  {/* Red checkmark */}
                  <div className="flex-shrink-0 mt-1" aria-hidden="true">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white stroke-2" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-1 sm:space-y-2">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-black">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
