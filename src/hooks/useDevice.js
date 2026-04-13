import { useState, useEffect } from "react";

const getSnapshot = () => {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isTouch: false,
      width: 1200,
    };
  }
  const width = window.innerWidth;
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  return {
    isMobile: width <= 768,
    isTablet: width > 768 && width <= 1024,
    isDesktop: width > 1024,
    isTouch,
    width,
  };
};

export const useDevice = () => {
  const [device, setDevice] = useState(getSnapshot);

  useEffect(() => {
    let timer = null;
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setDevice(getSnapshot()), 150);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return device;
};
