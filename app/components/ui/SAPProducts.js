// components/SAPProductsCarousel.js
'use client';

import { useState, useRef } from 'react';
import { HoverBorderGradient } from './hover-border-gradient';

const styles = {
  container: {
    background: '#0A1624',
    fontFamily: 'Roboto Slab, serif',
    overflowX: 'hidden',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: 60,
    color: 'white',
  },
  h1: {
    fontSize: '3rem',
    fontWeight: 600,
    letterSpacing: '1px',
    marginBottom: 15,
    color: 'white',
    fontFamily: 'Roboto Slab, serif',
  },
  headerP: {
    fontSize: '1.1rem',
    opacity: 0.9,
    maxWidth: 600,
    margin: '0 auto',
    lineHeight: 1.6,
    color: '#E8F4F8',
    fontFamily: 'Inter, sans-serif',
  },
  carouselContainer: {
    width: '100%',
    maxWidth: 1400,
    overflow: 'hidden',
    position: 'relative',
    padding: '40px 0',
  },
  carouselTrack: {
    display: 'flex',
    width: 'calc(380px * 12)',
    gap: 25,
    padding: '0 25px',
    animation: 'scroll 30s linear infinite',
  },
  card: {
    minWidth: 380,
    height: 280,
    background: '#102347',
    borderRadius: 12,
    padding: 30,
    border: 'none',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  },
  cardContent: {
    position: 'relative',
    zIndex: 2,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 0,
    fontFamily: 'Inter, sans-serif',
  },
  cardTitle: {
    color: 'white',
    fontSize: '1.4rem',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    position: 'relative',
    cursor: 'pointer',
    fontFamily: 'Alegreya, serif',
    margin: 0,
    flexGrow: 1,
    lineHeight: 1.2,
  },
  cardDescription: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: '0.95rem',
    lineHeight: 1.6,
    marginBottom: 18,
    flexGrow: 1,
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    minHeight: 0,
    overflow: 'hidden',
  },
  cardFooter: {
    marginTop: 8,
    textAlign: 'left',
  },
};

const SAPProductsCarousel = () => {
  const products = [
    {
      id: 1,
      title: "Lorem Ipsum",
      description: "Enterprise resource planning suite for digital business processes and real-time analytics"
    },
    {
      id: 2,
      title: "Lorem Ipsum",
      description: "Cloud-based procurement and supply chain solutions for efficient supplier management"
    },
    {
      id: 3,
      title: "Lorem Ipsum",
      description: "Human capital management solution for HR processes and employee experience"
    },
    {
      id: 4,
      title: "Lorem Ipsum",
      description: "Commerce platform for creating personalized customer experiences across all channels"
    },
    {
      id: 5,
      title: "Lorem Ipsum",
      description: "Business intelligence platform for reporting, visualization, and core analytics"
    },
    {
      id: 6,
      title: "Lorem Ipsum",
      description: "Travel and expense management solution to streamline business spending"
    }
  ];

  const carouselTrackRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const cardWidth = 380 + 25; // card min-width + gap
  const totalCards = 6;
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeout = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  const handleScroll = (direction) => {
    setIsPaused(true);
    clearTimeout(pauseTimeout.current);
    let newIndex = scrollIndex + direction;
    if (newIndex < 0) newIndex = 0;
    if (newIndex > totalCards) newIndex = totalCards;
    setScrollIndex(newIndex);
    if (carouselTrackRef.current) {
      carouselTrackRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: 'smooth',
      });
    }
    pauseTimeout.current = setTimeout(() => setIsPaused(false), 3000);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
    clearTimeout(pauseTimeout.current);
  };
  const handleMouseLeave = () => {
    pauseTimeout.current = setTimeout(() => setIsPaused(false), 3000);
  };

  const renderCard = (product, index) => (
    <div 
      key={`${product.id}-${index}`} 
      style={{
        ...styles.card,
        transform: hoveredCard === index ? 'scale(0.95)' : 'scale(1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={() => setHoveredCard(index)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div style={styles.cardContent}>
        <div>
          <h3 style={styles.cardTitle}>
            {product.title}
          </h3>
          <p style={styles.cardDescription}>{product.description}</p>
        </div>
        <div style={styles.cardFooter}>
          <span style={{ fontWeight: 'bold', color: '#fff', display: 'block' }}>John Anderson</span>
          <span style={{ color: '#b0b0b0' }}>CTO, Global Healthcare Inc.</span>
          <div style={{ marginTop: '8px' }}>
            <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g>
                <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" fill="#FFA500" />
                <polygon points="36,2 39,9 46,9 40,14 42,21 36,17 30,21 32,14 26,9 33,9" fill="#FFA500" />
                <polygon points="60,2 63,9 70,9 64,14 66,21 60,17 54,21 56,14 50,9 57,9" fill="#FFA500" />
                <polygon points="84,2 87,9 94,9 88,14 90,21 84,17 78,21 80,14 74,9 81,9" fill="#FFA500" />
                <polygon points="108,2 111,9 118,9 112,14 114,21 108,17 102,21 104,14 98,9 105,9" fill="#FFA500" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(calc(-380px * 6 - 150px));
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.h1}>REVIEWS</h1>
          <p style={styles.headerP}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div style={styles.carouselContainer}>
          <div
            style={{
              ...styles.carouselTrack,
              overflowX: 'hidden',
              scrollBehavior: 'smooth',
              animationPlayState: isCarouselHovered ? 'paused' : 'running',
            }}
            ref={carouselTrackRef}
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
          >
            {/* Original 6 cards */}
            {products.map((product, index) => renderCard(product, index))}
            {/* Duplicate cards for seamless loop */}
            {products.map((product, index) => renderCard(product, index + 6))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SAPProductsCarousel;