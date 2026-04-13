import React, { useState } from "react";
import { Code, ExternalLink } from "lucide-react";
import "./Projects.css";
import { useDevice } from "../hooks/useDevice";
import portfolioss from "../assets/portfolioss.png";

const PROJECTS = [
  {
    id: 1,
    name: "Portfolio Website",
    short:
      "A cinematic personal portfolio built with React, GSAP animations, and Spline 3D.",
    tags: ["React", "GSAP", "Spline", "CSS"],
    github: "#",
    live: "#",
    image: portfolioss,
  },
  {
    id: 2,
    name: "AI Chatbot",
    short:
      "A conversational AI chatbot with local RAG support, built with Python and a React frontend.",
    tags: ["Python", "React", "RAG", "Node"],
    github: "#",
    live: "#",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Data Dashboard",
    short:
      "An interactive data visualization dashboard with real-time charts and filtering capabilities.",
    tags: ["React", "D3.js", "MongoDB", "Express"],
    github: "#",
    live: "#",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  },
  /* {
    id: 4,
    name: "E-Commerce UI",
    short:
      "A modern e-commerce frontend with product filtering, cart, and smooth page transitions.",
    tags: ["React", "Tailwind", "JavaScript", "CSS"],
    github: "#",
    live: "#",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Weather App",
    short:
      "A clean weather application pulling live data from an API with animated condition icons.",
    tags: ["JavaScript", "API", "CSS", "HTML"],
    github: "#",
    live: "#",
    image:
      "https://images.unsplash.com/photo-1504608524841-42584120d693?q=80&w=2065&auto=format&fit=crop",
  },*/
];

const ProjectCard = ({ project, isActive, onMouseEnter, onTap, isTouch }) => {
  return (
    <div
      className={`project-card ${isActive ? "project-card--active" : ""}`}
      onMouseEnter={!isTouch ? onMouseEnter : undefined}
      onClick={isTouch ? onTap : undefined}
      role={isTouch ? "button" : undefined}
      aria-pressed={isTouch ? isActive : undefined}
      tabIndex={isTouch ? 0 : undefined}
      onKeyDown={isTouch ? (e) => e.key === "Enter" && onTap() : undefined}
    >
      <img
        src={project.image}
        alt={project.name}
        className="project-card__image"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/400x500/1a1a1a/ffffff?text=Project";
        }}
      />

      <div className="project-card__overlay" />

      <span
        className={`project-card__label ${isActive ? "project-card__label--hidden" : ""}`}
      >
        {project.name}
      </span>

      <div
        className={`project-card__content ${isActive ? "project-card__content--visible" : ""}`}
      >
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="project-card__name">{project.name}</h3>
        <p className="project-card__desc">{project.short}</p>

        <div className="project-card__actions">
          <a href={project.github} className="project-btn" title="GitHub">
            <Code size={16} />
            <span>GitHub</span>
          </a>
          <a href={project.live} className="project-btn" title="Live">
            <ExternalLink size={16} />
            <span>Live</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { isTouch } = useDevice();

  return (
    <main className="projects-page">
      <div className="projects-container">
        <div className="projects-left">
          <p className="projects-eyebrow">What I've built</p>
          <h1 className="projects-title">
            Here Are My
            <br />
            Projects
          </h1>
          <p className="projects-subtitle">
            Here are a few things I've built while figuring stuff out,breaking
            things, and making tehm work better!.
          </p>

          <div className="projects-socials">
            <a href="https://github.com/sakshi-githb" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
              <Code size={20} />
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/sakshi-dalvi-637558316" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
              <ExternalLink size={20} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        <div className="projects-right">
          <div className="projects-accordion">
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                isActive={index === activeIndex}
                isTouch={isTouch}
                onMouseEnter={() => setActiveIndex(index)}
                onTap={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Projects;
