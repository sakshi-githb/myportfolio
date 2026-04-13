import { useRef, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import TubesCursor from "./components/TubesCursor";
import PageTransition from "./components/PageTransition";
import SplineBackground from "./components/SplineBackground";
import { useDevice } from "./hooks/useDevice";
import { TransitionProvider } from "./context/TransitionContext";
import { THEMES } from "./constants/themes";

const hexToRgb = (hex) => {
  if (!hex || hex.length < 7) return "255, 255, 255";
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
};

const AppContent = () => {
  const location = useLocation();
  const device = useDevice();
  const isHome = location.pathname === "/";
  const splineRef = useRef(null);

  useEffect(() => {
    const theme = THEMES[location.pathname] || THEMES["/"];
    document.documentElement.style.setProperty("--bg-color", theme.bg);
    document.documentElement.style.setProperty(
      "--bg-color-rgb",
      hexToRgb(theme.bg),
    );
    document.documentElement.style.setProperty("--text-color", theme.text);
    document.documentElement.style.setProperty(
      "--text-color-rgb",
      hexToRgb(theme.text),
    );
    document.documentElement.style.setProperty("--accent-color", theme.accent);
    document.documentElement.style.setProperty(
      "--accent-color-rgb",
      hexToRgb(theme.accent),
    );
  }, [location]);

  function handleSplineLoad(splineApp) {
    splineRef.current = splineApp;
  }

  function triggerRobotEyes() {
    if (splineRef.current && device.isDesktop && !device.isTouch) {
      splineRef.current.emitEvent("mouseHover", "App");
    }
  }

  function untriggerRobotEyes() {
    if (splineRef.current && device.isDesktop && !device.isTouch) {
      splineRef.current.emitEvent("mouseUp", "App");
    }
  }

  const isContact = location.pathname === "/contact";

  return (
    <>
      <PageTransition />

      <SplineBackground
        isHome={isHome}
        onLoad={handleSplineLoad}
        device={device}
      />

      {isHome && device.isDesktop && !device.isTouch && <TubesCursor />}

      <div className="page-wrapper">
        {isHome && device.isDesktop && (
          <div className="bg-typography" aria-hidden="true">
            I BELIVE
          </div>
        )}

        <Navbar
          onLinkHover={triggerRobotEyes}
          onLinkLeave={untriggerRobotEyes}
          isContact={isContact}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => (
  <TransitionProvider>
    <Router>
      <AppContent />
    </Router>
  </TransitionProvider>
);

export default App;
