
import { motion } from "motion/react";
import { cn } from "../../lib/utils";
import { useRef, useEffect, useState } from "react";
import CtaForm from "./CtaForm";

export const ThreeDMarquee = ({ className }) => {
  const images = [
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677689/image1_bbzq2l.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677687/image2_c40kmk.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677687/image9_rewxiz.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677686/image10_dyxctm.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677686/image5_xoxy2g.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677686/image4_kldmkq.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677686/image7_bpq7lg.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677686/image8_p02tqp.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677686/image6_vm27bv.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677689/image1_bbzq2l.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677687/image2_c40kmk.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677687/image9_rewxiz.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677686/image10_dyxctm.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677686/image5_xoxy2g.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677686/image4_kldmkq.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677686/image7_bpq7lg.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677686/image8_p02tqp.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677686/image6_vm27bv.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677689/image1_bbzq2l.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677687/image2_c40kmk.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677687/image9_rewxiz.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677686/image10_dyxctm.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677686/image5_xoxy2g.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677686/image4_kldmkq.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677686/image7_bpq7lg.png",
    "https://res.cloudinary.com/duz9xipfm/image/upload/v1750677686/image8_p02tqp.png",
  ];

  // Split the images array into 4 equal parts
  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });

  // For seamless loop: measure stack height
  const stackRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [stackHeights, setStackHeights] = useState([0, 0, 0, 0]);
  const [showCtaForm, setShowCtaForm] = useState(false);

  useEffect(() => {
    setStackHeights(stackRefs.map(ref => ref.current ? ref.current.scrollHeight / 2 : 0));
  }, [images.length]);

  return (
    <>
    <div className="relative w-full h-* m-auto min-h-[500px] sm:min-h-[100px] md:min-h-[700px] overflow-hidden max-w-[1800px] mb-10 ">
      {/* Overlayed Content */}
      <div className="flex items-center m-auto justify-start min-h-* max-w-[1800px] z-9 relative px-4">
        <div
          className="w-full max-w-lg md:max-w-xl lg:max-w-2xl px-4 ml-2 sm:ml-8 md:ml-12 lg:ml-24 flex flex-col items-start justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1
            className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-black/80 leading-tight mb-1 md:mb-6 text-left opacity-100 pt-50"
          >
            Transforming<br />
            Business Through<br />
            <span className="text-red-500">SAP Excellence</span>
          </h1>
          <p
            className="text-base md:text-lg text-black mb-6 md:mb-8 max-w-xl text-left"
          >
            Empower your enterprise with Connecting Roots comprehensive SAP implementation and support services. We deliver tailored solutions that drive innovation and growth.
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4 justify-start">
            <a
              href="#"
              onClick={e => { e.preventDefault(); setShowCtaForm(true); }}
              className="flex items-center gap-2 px-3 sm:px-4 md:px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg hover:scale-105 hover:from-red-600 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 text-sm md:text-base active:scale-95"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="13" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              Schedule a Demo
            </a>
            <a
              href="/services"
              className="flex items-center gap-2 px-3 sm:px-4 md:px-6 py-2 hover:scale-105 rounded-full font-semibold bg-white/10 border border-gray-400/30 text-black/80 backdrop-blur-md hover:bg-white/20 hover:border-gray-200/50 transition-all duration-200 text-sm md:text-base active:scale-95 shadow-md"
              style={{ pointerEvents: 'auto' }}
            >
              View Services
              <svg xmlns="http://www.w3.org/2000/svg" fill="black" width="20" height="20" className="w-4 h-4 md:w-5 md:h-5"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg>
            </a>
            
            
          </div>
          
        </div>
        
      </div>
      {/* Marquee Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <div
          style={{
            transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
          }}
          className="w-full h-full grid origin-top-left grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-8 transform-3d">
          {chunks.map((subarray, colIndex) => {
            // Unique duration and direction for each column
            const durations = [84, 196, 88, 90];
            let direction = colIndex % 2 === 0 ? -1 : 1;
            let animateY, initialY;
            if (colIndex === 1) {
              // Make 2nd row seamless by reversing and offsetting
              initialY = -stackHeights[colIndex];
              animateY = [initialY, 0];
            } else {
              initialY = 0;
              animateY = [0, direction * stackHeights[colIndex]];
            }
            return (
              <motion.div
                key={colIndex + "marquee"}
                className="flex flex-col items-start gap-3 sm:gap-8 lg:gap-16 w-full"
                ref={stackRefs[colIndex]}
                animate={{
                  y: animateY,
                }}
                transition={{
                  duration: durations[colIndex % durations.length],
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear"
                }}
                style={{ willChange: "transform", y: initialY }}
              >
                <GridLineVertical className="-left-4" offset="80px" />
                {[...subarray, ...subarray].map((image, imageIndex) => (
                  <div className="relative w-full" key={imageIndex + image}>
                    <GridLineHorizontal className="-top-4" offset="20px" />
                    <motion.img
                      whileHover={{
                        y: -10,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      key={imageIndex + image}
                      src={image}
                      alt={`Image ${imageIndex + 1}`}
                      className="aspect-[970/700] object-cover opacity-40 w-full h-auto rounded-xl shadow-md max-h-[80px] sm:max-h-[120px] md:max-h-[180px]"
                      width={970}
                      height={700} />
                  </div>
                ))}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
    {showCtaForm && <CtaForm onClose={() => setShowCtaForm(false)} />}
    </>
  );
};

const GridLineHorizontal = ({
  className,
  offset
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",

          //-100px if you want to keep the line inside
          "--offset": offset || "200px",

          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude"
        }
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}></div>
  );
};

const GridLineVertical = ({
  className,
  offset
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",

          //-100px if you want to keep the line inside
          "--offset": offset || "150px",

          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude"
        }
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}></div>
  );
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.35,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 40,
      damping: 12,
      duration: 2.2,
    },
  },
};
