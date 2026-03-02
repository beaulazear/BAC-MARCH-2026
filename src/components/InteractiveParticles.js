import React, { useEffect, useRef, useState } from 'react';
import '../styles/InteractiveParticles.css';

const InteractiveParticles = () => {
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Particle shapes and colors
  const shapes = ['circle', 'star', 'paw', 'heart'];
  const colors = ['#667eea', '#ff6b6b', '#4ecdc4', '#95e1d3', '#a8e6cf'];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse/touch position
    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchEnd = () => {
      // Move mouse position off-screen when touch ends
      mousePosRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Create initial particles - scattered everywhere except center
    const createParticle = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const centerX = vw / 2;
      const centerY = vh / 2;

      // Adjust avoid radius based on screen size
      let avoidRadiusPercent = 0.48;
      if (vw < 480) {
        avoidRadiusPercent = 0.52; // Larger avoid zone on small phones
      } else if (vw < 768) {
        avoidRadiusPercent = 0.50; // Slightly larger on tablets
      }

      const avoidRadius = Math.min(vw, vh) * avoidRadiusPercent;

      let homeX, homeY, distFromCenter;

      // Keep generating random positions until we find one outside the avoid zone
      do {
        homeX = Math.random() * vw;
        homeY = Math.random() * vh;
        distFromCenter = Math.sqrt(
          Math.pow(homeX - centerX, 2) + Math.pow(homeY - centerY, 2)
        );
      } while (distFromCenter < avoidRadius);

      // Weighted shape selection - favor paw prints (60% paws, 40% other shapes)
      let selectedShape;
      const random = Math.random();
      if (random < 0.6) {
        selectedShape = 'paw';
      } else {
        const otherShapes = ['circle', 'star', 'heart'];
        selectedShape = otherShapes[Math.floor(Math.random() * otherShapes.length)];
      }

      // Responsive particle size
      let particleSize = Math.random() * 8 + 4;
      if (vw < 480) {
        particleSize = Math.random() * 6 + 3; // Smaller on mobile
      } else if (vw < 768) {
        particleSize = Math.random() * 7 + 3.5; // Medium on tablet
      }

      return {
        x: homeX,
        y: homeY,
        homeX: homeX, // Remember home position
        homeY: homeY,
        vx: 0,
        vy: 0,
        size: particleSize,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: selectedShape,
        opacity: Math.random() * 0.4 + 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      };
    };

    // Initialize particles - responsive count based on screen size
    const vw = window.innerWidth;
    let particleCount = 1150; // Desktop default

    if (vw < 480) {
      particleCount = 400; // Mobile phones
    } else if (vw < 768) {
      particleCount = 600; // Tablets
    } else if (vw < 1024) {
      particleCount = 800; // Small laptops
    }

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle());
    }

    // Draw star
    const drawStar = (ctx, x, y, radius, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(
          Math.cos(((18 + i * 72) * Math.PI) / 180) * radius,
          -Math.sin(((18 + i * 72) * Math.PI) / 180) * radius
        );
        ctx.lineTo(
          Math.cos(((54 + i * 72) * Math.PI) / 180) * (radius * 0.5),
          -Math.sin(((54 + i * 72) * Math.PI) / 180) * (radius * 0.5)
        );
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Draw heart
    const drawHeart = (ctx, x, y, size, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(0, size * 0.3);
      ctx.bezierCurveTo(-size * 0.5, -size * 0.3, -size, size * 0.1, 0, size);
      ctx.bezierCurveTo(size, size * 0.1, size * 0.5, -size * 0.3, 0, size * 0.3);
      ctx.fill();
      ctx.restore();
    };

    // Draw paw print
    const drawPaw = (ctx, x, y, size, rotation) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      // Main pad
      ctx.beginPath();
      ctx.ellipse(0, size * 0.2, size * 0.6, size * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      // Toes
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2 - Math.PI / 4;
        const tx = Math.cos(angle) * size * 0.6;
        const ty = Math.sin(angle) * size * 0.6 - size * 0.4;
        ctx.beginPath();
        ctx.arc(tx, ty, size * 0.25, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Responsive repel radius based on screen size
      const repelRadius = canvas.width < 480 ? 100 : canvas.width < 768 ? 120 : 150;

      particlesRef.current.forEach((particle) => {
        // Mouse REPULSION - like oil avoiding water
        const dx = mousePosRef.current.x - particle.x;
        const dy = mousePosRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < repelRadius && distance > 0) {
          // Push away from mouse
          const force = (repelRadius - distance) / repelRadius;
          particle.vx -= (dx / distance) * force * 0.8;
          particle.vy -= (dy / distance) * force * 0.8;
        }

        // Spring force - pull back to home position
        const homeDistX = particle.homeX - particle.x;
        const homeDistY = particle.homeY - particle.y;
        const springStrength = 0.05;

        particle.vx += homeDistX * springStrength;
        particle.vy += homeDistY * springStrength;

        // Apply velocity
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;

        // Friction/damping
        particle.vx *= 0.92;
        particle.vy *= 0.92;

        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;

        if (particle.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.shape === 'star') {
          drawStar(ctx, particle.x, particle.y, particle.size, particle.rotation);
        } else if (particle.shape === 'heart') {
          drawHeart(ctx, particle.x, particle.y, particle.size, particle.rotation);
        } else if (particle.shape === 'paw') {
          drawPaw(ctx, particle.x, particle.y, particle.size, particle.rotation);
        }

        ctx.globalAlpha = 1;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
};

export default InteractiveParticles;
