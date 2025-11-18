"use client";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";
import { useRef, useEffect, useState, useCallback } from "react";

export function PointerHighlight({
  children,
  rectangleClassName,
  pointerClassName,
  containerClassName
}) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const rafId = useRef();
  const lastDimensions = useRef({ width: 0, height: 0 });

  // Throttle dimension updates with requestAnimationFrame
  const updateDimensions = useCallback((width, height) => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    rafId.current = requestAnimationFrame(() => {
      // Only update if dimensions have significantly changed
      if (Math.abs(width - lastDimensions.current.width) > 1 || 
          Math.abs(height - lastDimensions.current.height) > 1) {
        lastDimensions.current = { width, height };
        setDimensions({ width, height });
      }
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initial dimensions
    const { width, height } = containerRef.current.getBoundingClientRect();
    updateDimensions(width, height);

    // Set up resize observer with debounce
    let timeoutId;
    const resizeObserver = new ResizeObserver((entries) => {
      // Debounce resize events
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        const entry = entries[0];
        if (entry) {
          const { width, height } = entry.contentRect;
          updateDimensions(width, height);
        }
      }, 16); // ~60fps
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      resizeObserver.disconnect();
    };
  }, [updateDimensions]);

  return (
    <div className={cn("relative w-fit", containerClassName)} ref={containerRef}>
      {children}
      {dimensions.width > 10 && dimensions.height > 10 && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 0.95, originX: 0, originY: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}>
          <motion.div
            className={cn(
              "absolute inset-0 border border-neutral-800 dark:border-neutral-200",
              rectangleClassName
            )}
            initial={{
              width: 0,
              height: 0,
            }}
            whileInView={{
              width: dimensions.width,
              height: dimensions.height,
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }} />
          <motion.div
            className="pointer-events-none absolute"
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              x: dimensions.width + 4,
              y: dimensions.height + 4,
            }}
            style={{
              rotate: -90,
            }}
            transition={{
              opacity: { duration: 0.1, ease: "easeInOut" },
              duration: 1,
              ease: "easeInOut",
            }}>
            <Pointer className={cn("h-5 w-5 text-blue-500", pointerClassName)} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

const Pointer = ({
  ...props
}) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
    </svg>
  );
};
