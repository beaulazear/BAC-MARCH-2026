import { useState, useEffect, memo } from "react";
import { PawPrint, PersonStanding, MessageCircleHeart } from "lucide-react";

export const ArtCanvas = memo(function ArtCanvas({ onOpenServices, onOpenAbout, onOpenContact }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="art-canvas">
      {/* Mobile Navigation - only visible on small screens */}
      <div
        className="mobile-nav"
        style={{
          opacity: entered ? 1 : 0,
          transform: entered ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity 700ms ease 300ms, transform 700ms ease 300ms",
        }}
      >
        <button
          className="mobile-nav-button"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            onOpenServices({
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
            });
          }}
          style={{ borderColor: "#5B4E8C", color: "#5B4E8C" }}
        >
          <PawPrint className="mobile-nav-icon" />
          <span>services</span>
        </button>

        <button
          className="mobile-nav-button"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            onOpenContact({
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
            });
          }}
          style={{ borderColor: "#7A8E6E", color: "#7A8E6E" }}
        >
          <MessageCircleHeart className="mobile-nav-icon" />
          <span>contact</span>
        </button>

        <button
          className="mobile-nav-button"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            onOpenAbout({
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
            });
          }}
          style={{ borderColor: "#C85A4A", color: "#C85A4A" }}
        >
          <PersonStanding className="mobile-nav-icon" />
          <span>about me</span>
        </button>
      </div>

      <div className="art-canvas-inner">
        {/* Logo -- dominates the viewport */}
        <div
          className="logo-container"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? "scale(1)" : "scale(0.95)",
          }}
        >
          <img
            src={require('../images/GraphicTwo.png')}
            alt="Beau's Animal Care - hand-drawn illustration of a person walking three dogs"
            className="main-logo"
          />
        </div>

        {/* Services link -- upper left */}
        <SketchLink
          label="services"
          onClick={(origin) => onOpenServices(origin)}
          entered={entered}
          delay={500}
          className="sketch-link-services"
          color="#5B4E8C"
          rotation={-8}
          icon={<PawPrint className="sketch-icon" />}
        />

        {/* About link -- upper right */}
        <SketchLink
          label="about me"
          onClick={(origin) => onOpenAbout(origin)}
          entered={entered}
          delay={650}
          className="sketch-link-about"
          color="#C85A4A"
          rotation={6}
          icon={<PersonStanding className="sketch-icon" />}
        />

        {/* Contact link -- top center */}
        <SketchLink
          label="contact"
          onClick={(origin) => onOpenContact(origin)}
          entered={entered}
          delay={575}
          className="sketch-link-contact"
          color="#7A8E6E"
          rotation={0}
          icon={<MessageCircleHeart className="sketch-icon" />}
        />
      </div>

      {/* NYC mark */}
      <span
        className="nyc-mark"
        style={{
          opacity: entered ? 1 : 0,
          transition: "opacity 1s ease 1000ms",
        }}
      >
        Brooklyn, NYC
      </span>
    </main>
  );
});

/* ——— Sketch-style Link with icon ——— */

function SketchLink({
  label,
  onClick,
  entered,
  delay,
  className,
  color,
  rotation,
  icon,
}) {
  const [hovered, setHovered] = useState(false);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onClick({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  const isContact = className && className.includes('contact');
  const transformValue = isContact
    ? `translateX(-50%) rotate(${rotation}deg) ${entered ? "translateY(0)" : "translateY(12px)"}`
    : `rotate(${rotation}deg) ${entered ? "translateY(0)" : "translateY(12px)"}`;

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`sketch-link ${className}`}
      style={{
        opacity: entered ? 1 : 0,
        transform: transformValue,
        transition: `opacity 700ms ease ${delay}ms, transform 700ms ease ${delay}ms`,
      }}
    >
      <span className="sketch-link-content">
        {/* Icon + label row */}
        <span
          className="sketch-link-text"
          style={{ color }}
        >
          <span
            className="sketch-icon-wrapper"
            style={{
              transform: hovered ? "rotate(-12deg) scale(1.2)" : "rotate(0deg) scale(1)",
              transition: "transform 400ms cubic-bezier(0.34, 1.5, 0.64, 1)",
            }}
          >
            {icon}
          </span>
          <span
            className="sketch-label"
            style={{
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 300ms ease",
            }}
          >
            {label}
          </span>
        </span>

        {/* Hand-drawn circle on hover */}
        <svg
          className="sketch-circle"
          viewBox="0 0 220 80"
          fill="none"
          aria-hidden="true"
        >
          <ellipse
            cx="110"
            cy="40"
            rx="102"
            ry="34"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: 460,
              strokeDashoffset: hovered ? 0 : 460,
              opacity: hovered ? 0.5 : 0,
              transition: "stroke-dashoffset 500ms ease-out, opacity 500ms ease-out",
            }}
            transform="rotate(-2 110 40)"
          />
          <ellipse
            cx="110"
            cy="40"
            rx="98"
            ry="30"
            stroke={color}
            strokeWidth="1"
            strokeLinecap="round"
            style={{
              strokeDasharray: 430,
              strokeDashoffset: hovered ? 0 : 430,
              opacity: hovered ? 0.3 : 0,
              transition: "stroke-dashoffset 700ms ease-out 100ms, opacity 700ms ease-out 100ms",
            }}
            transform="rotate(1 110 40)"
          />
        </svg>
      </span>
    </button>
  );
}