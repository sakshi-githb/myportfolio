import React, { useEffect, useRef } from "react";

export default function TubesCursor() {
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  // User-provided color palette
  const tubesColors = ["#FFD4D9", "#240208", "#ff8e80", "#ff734a", "#450011"];

  const randomColors = (count) => {
    // Pick random colors from our defined palette rather than fully random hexes
    return new Array(count)
      .fill(0)
      .map(() => tubesColors[Math.floor(Math.random() * tubesColors.length)]);
  };

  useEffect(() => {
    // Delay visualization slightly to allow layout and UI elements to paint
    const initTimer = setTimeout(() => {
      import("https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js")
        .then((module) => {
          const TubesCursorLogic = module.default;

          if (canvasRef.current) {
            // Apply cursor styling and color palette
            const app = TubesCursorLogic(canvasRef.current, {
              tubes: {
                length: 8, // Make the trail shorter (default is typically longer)
                sleepTimeCoef: 0.1, // Make the trail fade away quicker
                colors: ["#FFD4D9", "#ff8e80", "#ff734a"], // Red, Coral, Neon Orange
                lights: {
                  intensity: 200,
                  colors: ["#450011", "#240208", "#FFD4D9", "#ff8e80"], // White, Burgundy, Red, Coral
                },
              },
            });
            appRef.current = app;
          }
        })
        .catch((err) =>
          console.error("Failed to load TubesCursor module:", err),
        );
    }, 100);

    return () => {
      clearTimeout(initTimer);
      if (appRef.current && typeof appRef.current.dispose === "function") {
        appRef.current.dispose();
      }
    };
  }, []);

  // Handle click to randomize colors dynamically, pulling from new palette
  const handleClick = () => {
    if (appRef.current) {
      // Pass a random combination of user brand colors to the current instance
      appRef.current.tubes.setColors(randomColors(3));
      appRef.current.tubes.setLightsColors(randomColors(4));
    }
  };

  // Important: Styling replaces Tailwind's 'fixed inset-0 z-0' with standard CSS properties.
  // pointerEvents: 'none' ensures the canvas doesn't block users from hovering buttons/links.
  return (
    <div
      className="tubes-cursor-wrapper"
      onClick={handleClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 3 /* Sits above spline z:1, below UI z:2+ */,
        pointerEvents: "none" /* Pass through cursor so hover states work */,
        overflow: "hidden",
        mixBlendMode:
          "screen" /* Turns the black 3D canvas background totally transparent! */,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}
