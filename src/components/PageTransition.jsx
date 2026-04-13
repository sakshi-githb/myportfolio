import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTransition } from '../context/TransitionContext';
import './PageTransition.css';

const PageTransition = () => {
  const { transitionText, isAnimating, fromTheme, toTheme } = useTransition();
  const containerRef = useRef(null);
  const stripsRef = useRef([]);

  // Number of horizontal strips
  const numStrips = 12;

  // Dynamic gradient based on source and destination palettes from the themes
  const gradientStyle = {
    background: `linear-gradient(90deg, ${fromTheme.palette[0]}, ${toTheme.palette[0]})`
  };

  useEffect(() => {
    if (isAnimating) {
      const tl = gsap.timeline();

      // Ensure container is visible
      gsap.set(containerRef.current, { visibility: 'visible', pointerEvents: 'all' });
      
      // Reset strips to start off-screen (Right)
      gsap.set(stripsRef.current, { 
        xPercent: 100,
        ...gradientStyle 
      });
      
      // 1. Enter: Strips sweep in from Right to Left (covering screen)
      tl.to(stripsRef.current, {
        xPercent: 0,
        duration: 0.8,
        stagger: {
          amount: 0.4,
          from: "start"
        },
        ease: "expo.inOut"
      });

    } else if (!isAnimating && containerRef.current?.style.visibility === 'visible') {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(containerRef.current, { visibility: 'hidden', pointerEvents: 'none' });
        }
      });

      // 3. Exit: Strips sweep off-screen
      tl.to(stripsRef.current, {
        xPercent: -100,
        duration: 0.8,
        stagger: {
          amount: 0.4,
          from: "start"
        },
        ease: "expo.inOut"
      });
    }
  }, [isAnimating, fromTheme, toTheme]);

  return (
    <div className="page-transition-wrapper" ref={containerRef}>
      <div className="strips-container">
        {[...Array(numStrips)].map((_, i) => (
          <div 
            key={i} 
            ref={el => stripsRef.current[i] = el}
            className="transition-strip"
            style={gradientStyle}
          />
        ))}
      </div>
    </div>
  );
};

export default PageTransition;
