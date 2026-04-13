import React from "react";
import "../index.css";
import "./About.css";
import TextSphere from "../components/TextSphere";
import SkillsMarquee from "../components/SkillsMarquee";
import { useDevice } from "../hooks/useDevice";

const About = () => {
  const { isMobile, isTablet } = useDevice();

  const sphereContainerSize = isMobile ? 300 : isTablet ? 380 : 460;
  const sphereRadius = isMobile ? 100 : isTablet ? 128 : 155;

  return (
    <main className="about-page">
      <div className="about-container">
        <div className="about-left">
          <SkillsMarquee />
        </div>

        <div className="about-right">
          <div className="globe-container">
            <TextSphere
              containerSize={sphereContainerSize}
              sphereRadius={sphereRadius}
              autoRotate={true}
              autoRotateSpeed={0.25}
              dragSensitivity={0.5}
              momentumDecay={0.95}
            />
          </div>

          <div className="about-text-section">
            <p className="about-highlight-text">
              I'm a Student who enjoys building things,figuring things out,and
              turning ideas into reality.Always learning,always
              experimenting,and always growing. Let's build something amazing
              together.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
