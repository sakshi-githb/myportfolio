import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/observer";
import "./SkillsMarquee.css";

gsap.registerPlugin(Observer);

const SKILLS = [
  "PYTHON",
  "SQL",
  "JAVA",
  "GSAP",
  "REACT",
  "NEXT.JS",
  "MONGODB",
  "EXPRESS",
  "NODE",
  "HTML/CSS",
  "THREE.JS",
];

const SkillsMarquee = () => {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const rowsRef = useRef([]); // store { xPos, speed, direction, el } per row
  const tickerRef = useRef(null);

  useEffect(() => {
    // Wait a frame so DOM is painted and widths are available
    const init = () => {
      rowsRef.current.forEach((row) => {
        row.halfWidth = row.el.scrollWidth / 2;
        // odd rows start mid-way so they visually scroll rightward
        row.x = row.direction === 1 ? 0 : -row.halfWidth;
      });

      tickerRef.current = gsap.ticker.add(() => {
        rowsRef.current.forEach((row) => {
          row.x -= (row.halfWidth / (25 * 60)) * row.direction * row.timeScale;
          if (row.x <= -row.halfWidth) row.x += row.halfWidth;
          if (row.x > 0) row.x -= row.halfWidth;
          gsap.set(row.el, { x: row.x });
        });
      });

      const observer = Observer.create({
        target: scrollWrapperRef.current,
        type: "wheel,touch",
        wheelSpeed: -1,
        onChangeY: (self) => {
          let force = -(self.deltaY / 5);
          let clampedForce = Math.max(-4, Math.min(4, force));

          rowsRef.current.forEach((row) => {
            const boosted = 1 + Math.abs(clampedForce);
            gsap.to(row, {
              timeScale: boosted,
              duration: 0.15,
              ease: "none",
              overwrite: "auto",
            });
            gsap.to(row, {
              timeScale: 1,
              duration: 0.6,
              ease: "power2.out",
              delay: 0.1,
            });
          });
        },
      });

      return observer;
    };

    const rafId = requestAnimationFrame(() => {
      const observer = init();
      return () => {
        observer.kill();
        if (tickerRef.current) gsap.ticker.remove(tickerRef.current);
      };
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (tickerRef.current) gsap.ticker.remove(tickerRef.current);
    };
  }, []);

  return (
    <div className="skills-marquee-container" ref={containerRef}>
      <h2 className="skills-marquee-title">Languages I work with</h2>
      <div className="skills-scroll-wrapper" ref={scrollWrapperRef}>
        {SKILLS.map((language, rowIndex) => (
          <MarqueeRow
            key={rowIndex}
            index={rowIndex}
            text={language}
            direction={rowIndex % 2 === 0 ? 1 : -1}
            rowsRef={rowsRef}
          />
        ))}
      </div>
    </div>
  );
};

const MarqueeRow = ({ index, text, direction, rowsRef }) => {
  const rowRef = useRef(null);

  useEffect(() => {
    if (!rowRef.current) return;
    rowsRef.current[index] = {
      el: rowRef.current,
      direction,
      timeScale: 1,
      x: 0,
      halfWidth: 0,
    };
    return () => {
      rowsRef.current[index] = null;
    };
  }, [direction, index, rowsRef]);

  const renderRepeats = () =>
    Array(8)
      .fill(0)
      .map((_, i) => (
        <React.Fragment key={i}>
          <span className={`marquee-item ${i === 3 ? "highlighted" : ""}`}>
            {text}
          </span>
          <span className="marquee-separator">•</span>
        </React.Fragment>
      ));

  return (
    <div className="marquee-row-wrapper">
      <div className="marquee-row" ref={rowRef}>
        <div className="marquee-part">{renderRepeats()}</div>
        <div className="marquee-part">{renderRepeats()}</div>
      </div>
    </div>
  );
};

export default SkillsMarquee;
