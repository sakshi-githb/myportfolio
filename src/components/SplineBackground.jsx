import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import "./SplineBackground.css";

const LazySpline = lazy(() => import("@splinetool/react-spline"));

const SplineBackground = ({ isHome, onLoad, device }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isHome || device.isMobile || device.isTablet) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isHome, device.isMobile, device.isTablet]);

  const handleLoad = (splineApp) => {
    setIsLoaded(true);
    if (onLoad) onLoad(splineApp);
  };

  if (!isHome) return null;

  // MOBILE / TABLET — pure CSS gradient, zero 3D cost
  if (device.isMobile || device.isTablet) {
    return (
      <div
        id="spline-container"
        className="spline-wrapper spline-mobile-fallback"
        aria-hidden="true"
      />
    );
  }

  // DESKTOP — lazy-loaded Spline scene
  return (
    <div
      ref={containerRef}
      id="spline-container"
      className={`spline-wrapper ${isLoaded ? "loaded" : "loading"}`}
    >
      <div className="spline-fallback" aria-hidden="true" />

      {isVisible && (
        <Suspense fallback={<div className="spline-spinner" />}>
          <LazySpline
            scene="https://prod.spline.design/v5bcbRmFeYPx3q4I/scene.splinecode"
            onLoad={handleLoad}
          />
        </Suspense>
      )}
    </div>
  );
};

export default SplineBackground;
