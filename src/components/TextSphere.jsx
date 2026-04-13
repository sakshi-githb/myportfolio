import React, { useState, useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";
import "./TextSphere.css";

const COLOR_MAP = {
  red: { bg: "#ffffff", tag_bg: "#1e3a8a", tag_text: "#ffffff" },
  blue: { bg: "#ffffff", tag_bg: "#1e3a8a", tag_text: "#ffffff" },
  teal: { bg: "#ffffff", tag_bg: "#1e3a8a", tag_text: "#ffffff" },
  // Map others to these 3 for consistency
  purple: { bg: "#ffffff", tag_bg: "#1e3a8a", tag_text: "#ffffff" },
  amber: { bg: "#ffffff", tag_bg: "#1e3a8a", tag_text: "#ffffff" },
  pink: { bg: "#ffffff", tag_bg: "#1e3a8a", tag_text: "#ffffff" },
  coral: { bg: "#ffffff", tag_bg: "#1e3a8a", tag_text: "#ffffff" },
  green: { bg: "#ffffff", tag_bg: "#1e3a8a", tag_text: "#ffffff" },
  gray: { bg: "#ffffff", tag_bg: "#1e3a8a", tag_text: "#ffffff" },
};

export const DEFAULT_NODES = [
  {
    id: "1",
    label: "About Me",
    color: "red",
    info: {
      tag: "Personal Information",
      title: "About Me",
      body: "Im a Computer Science student who enjoys building interactive and creative web experiences.I like mixing logic with design to create things that actually feel alive.Always open to learning, building, and exploring new ideas.",
    },
  },
  {
    id: "2",
    label: "Education",
    color: "red",
    info: {
      tag: "Personal Information",
      title: "Education",
      body: "Currently studying at Fergusson College,Pune and building my skills in development.Most of my learning comes from hands-on projects and experimentation.I focus more on building than just theory.",
    },
  },
  {
    id: "3",
    label: "German Language",
    color: "red",
    info: {
      tag: "Personal Information",
      title: "German Language",
      body: "Iâ€™m learning German as a second language.It helps me think differently and understand new perspectives.Still learning, but consistent with it",
    },
  },
  {
    id: "4",
    label: "LinkedIn",
    color: "red",
    info: {
      tag: "Personal Information",
      title: "LinkedIn",
      body: "My professional space where I share my journey and connect with others. Open to opportunities, collaborations, and conversations. Always happy to connect with people in tech.",
      link: "https://www.linkedin.com/in/sakshi-dalvi-637558316",
      linkLabel: "View LinkedIn Profile",
    },
  },
  {
    id: "5",
    label: "Frontend Dev",
    color: "blue",
    info: {
      tag: "Technical Work",
      title: "Frontend Dev",
      body: "I build clean, responsive, and interactive user interfaces.Mostly working with React and modern web tools.I enjoy making UI feel smooth and intuitive",
    },
  },
  {
    id: "6",
    label: "Backend Dev",
    color: "blue",
    info: {
      tag: "Technical Work",
      title: "Backend Dev",
      body: "I work with APIs, databases, and server-side logic.Still learning and improving my system design skills.I like understanding how things work behind the scenes",
    },
  },
  {
    id: "7",
    label: "Problem Solving",
    color: "blue",
    info: {
      tag: "Technical Work",
      title: "Problem Solving",
      body: "I enjoy breaking down problems and finding simple solutions.Not afraid of debugging or tough logic challenges.Getting better with consistency and practice.",
    },
  },
  {
    id: "8",
    label: "Motion Design",
    color: "blue",
    info: {
      tag: "Technical Work",
      title: "Motion Design",
      body: "I like working with animations and smooth UI transitions.GSAP and interactive effects are something I enjoy exploring.It helps make websites feel more engaging",
    },
  },
  {
    id: "9",
    label: "Open Source",
    color: "blue",
    info: {
      tag: "Technical Work",
      title: "Open Source",
      body: "Iâ€™m interested in open source and real-world codebases.Learning by reading, contributing, and exploring projects.Always open to collaborate and grow.",
    },
  },
  {
    id: "10",
    label: "Creative Code",
    color: "blue",
    info: {
      tag: "Technical Work",
      title: "Creative Code",
      body: "I experiment with creative and interactive web ideas.Sometimes itâ€™s UI, sometimes itâ€™s visuals or 3D stuff.Just enjoy building things that feel different.",
    },
  },
  {
    id: "11",
    label: "GitHub",
    color: "blue",
    info: {
      tag: "Technical Work",
      title: "GitHub",
      body: "This is where I put my projects and experiments. My coding playground and portfolio space. Open to feedback and improvements.",
      link: "https://github.com/sakshi-githb",
      linkLabel: "View GitHub Profile",
    },
  },
  {
    id: "12",
    label: "Curious Mind",
    color: "teal",
    info: {
      tag: "Mindset & Personality",
      title: "Curious Mind",
      body: "I like exploring new tools and technologies all the time.If something looks interesting, I usually try it out.Curiosity is a big part of how I learn",
    },
  },
  {
    id: "13",
    label: "Clean Code",
    color: "teal",
    info: {
      tag: "Mindset & Personality",
      title: "Clean Code",
      body: "I care about readability and structure. Good code should be easy to follow by anyone â€” including future me.",
    },
  },
  {
    id: "14",
    label: "Confident Voice",
    color: "teal",
    info: {
      tag: "Mindset & Personality",
      title: "Confident Voice",
      body: "Iâ€™m comfortable sharing ideas and speaking in general.I try to communicate clearly and confidently.Good communication is something I value.",
    },
  },
  {
    id: "16",
    label: "Responsive",
    color: "blue",
    info: {
      tag: "Skill",
      title: "Responsive Design",
      body: "Every project I build works beautifully across screen sizes â€” from mobile to widescreen â€” with fluid layouts and adaptive components.",
    },
  },
];

const TextSphere = ({
  nodes = DEFAULT_NODES,
  containerSize = 520,
  sphereRadius = 175,
  dragSensitivity = 0.5,
  momentumDecay = 0.95,
  autoRotate = true,
  autoRotateSpeed = 0.25,
  className = "",
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [rotation, setRotation] = useState({ x: 15, y: 20 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  const lastMouse = useRef({ x: 0, y: 0 });
  const animFrame = useRef(null);
  const rotRef = useRef({ x: 15, y: 20 });
  const velRef = useRef({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const dragDistRef = useRef(0);

  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  const angleInc = (2 * Math.PI) / goldenRatio;
  const spherePositions = nodes.map((_, i) => {
    const t = i / nodes.length;
    const phi = (Math.acos(1 - 2 * t) * 180) / Math.PI;
    const theta = ((angleInc * i * 180) / Math.PI) % 360;
    return { theta, phi: 15 + (phi / 180) * 150 };
  });

  const toRad = (d) => (d * Math.PI) / 180;

  const getWorldPositions = useCallback(
    (rot) => {
      return spherePositions.map((pos) => {
        const tr = toRad(pos.theta),
          pr = toRad(pos.phi);
        const rx = toRad(rot.x),
          ry = toRad(rot.y);
        let x = sphereRadius * Math.sin(pr) * Math.cos(tr);
        let y = sphereRadius * Math.cos(pr);
        let z = sphereRadius * Math.sin(pr) * Math.sin(tr);

        const x1 = x * Math.cos(ry) + z * Math.sin(ry);
        const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
        x = x1;
        z = z1;

        const y2 = y * Math.cos(rx) - z * Math.sin(rx);
        const z2 = y * Math.sin(rx) + z * Math.cos(rx);
        y = y2;
        z = z2;
        return { x, y, z };
      });
    },
    [spherePositions, sphereRadius],
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const animate = () => {
      if (!draggingRef.current) {
        velRef.current.x *= momentumDecay;
        velRef.current.y *= momentumDecay;
        rotRef.current.y += autoRotateSpeed;
        rotRef.current.x += velRef.current.x;
        rotRef.current.y += velRef.current.y;
        setRotation({ ...rotRef.current });
      }
      animFrame.current = requestAnimationFrame(animate);
    };
    animFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [isMounted, momentumDecay, autoRotateSpeed]);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;

      dragDistRef.current += Math.abs(dx) + Math.abs(dy);

      rotRef.current.y += dx * dragSensitivity;
      rotRef.current.x += -dy * dragSensitivity;
      velRef.current = { x: -dy * dragSensitivity, y: dx * dragSensitivity };
      lastMouse.current = { x: e.clientX, y: e.clientY };
      setRotation({ ...rotRef.current });
    };
    const onMouseUp = () => {
      draggingRef.current = false;
      setIsDragging(false);
    };

    const onTouchMove = (e) => {
      if (!draggingRef.current) return;
      // Removed e.preventDefault() here as it breaks scrolling behavior
      const dx = e.touches[0].clientX - lastMouse.current.x;
      const dy = e.touches[0].clientY - lastMouse.current.y;

      dragDistRef.current += Math.abs(dx) + Math.abs(dy);

      rotRef.current.y += dx * dragSensitivity;
      rotRef.current.x += -dy * dragSensitivity;
      velRef.current = { x: -dy * dragSensitivity, y: dx * dragSensitivity };
      lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      setRotation({ ...rotRef.current });
    };
    const onTouchEnd = () => {
      draggingRef.current = false;
      setIsDragging(false);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [dragSensitivity]);

  const worldPositions = getWorldPositions(rotation);

  if (!isMounted)
    return (
      <div
        style={{ width: containerSize, height: containerSize }}
        className="sphere-loading"
      >
        <span className="sphere-loading-text">Loading...</span>
      </div>
    );

  return (
    <>
      <div
        className={`sphere-container ${className}`}
        style={{
          width: containerSize,
          height: containerSize,
          touchAction: "none",
        }}
        onMouseDown={(e) => {
          draggingRef.current = true;
          dragDistRef.current = 0;
          setIsDragging(true);
          velRef.current = { x: 0, y: 0 };
          lastMouse.current = { x: e.clientX, y: e.clientY };
          // e.preventDefault(); // Don't prevent default, lets clicks pass through gracefully
        }}
        onTouchStart={(e) => {
          draggingRef.current = true;
          dragDistRef.current = 0;
          setIsDragging(true);
          velRef.current = { x: 0, y: 0 };
          lastMouse.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
          };
        }}
      >
        {nodes.map((node, i) => {
          const pos = worldPositions[i];
          const depth = (pos.z + sphereRadius) / (2 * sphereRadius);
          const size = Math.round(52 + depth * 24);
          const fontSize = Math.max(9, Math.round(9 + depth * 3));
          const opacity = pos.z < -20 ? Math.max(0, (pos.z + 50) / 30) : 1;
          const zIndex = Math.round(100 + pos.z);
          const c = COLOR_MAP[node.color] ?? COLOR_MAP.gray;

          if (opacity < 0.01) return null;

          return (
            <div
              key={node.id}
              className="sphere-node"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = `translate(-50%, -50%) scale(1.25)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `translate(-50%, -50%)`;
              }}
              onPointerUp={(e) => {
                if (dragDistRef.current < 15) {
                  setSelectedNode(node);
                }
              }}
              style={{
                width: size,
                height: size,
                left: containerSize / 2 + pos.x,
                top: containerSize / 2 + pos.y,
                opacity,
                zIndex,
                transform: "translate(-50%, -50%)",
                fontSize,
              }}
            >
              {node.label}
            </div>
          );
        })}
      </div>

      {selectedNode && (
        <div
          className="sphere-modal-overlay"
          onClick={() => setSelectedNode(null)}
        >
          <div
            className="sphere-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedNode(null)}
              className="sphere-modal-close"
              title="Close"
            >
              <X size={16} />
            </button>
            <span
              className="sphere-modal-tag"
              style={{
                background: COLOR_MAP[selectedNode.color]?.tag_bg,
                color: COLOR_MAP[selectedNode.color]?.tag_text,
              }}
            >
              {selectedNode.info.tag}
            </span>
            <h3 className="sphere-modal-title">{selectedNode.info.title}</h3>
            <p className="sphere-modal-info">{selectedNode.info.body}</p>
            {selectedNode.info.link && (
              <a
                href={selectedNode.info.link}
                target="_blank"
                rel="noopener noreferrer"
                className="sphere-modal-link"
              >
                {selectedNode.info.linkLabel || selectedNode.info.link}
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TextSphere;

