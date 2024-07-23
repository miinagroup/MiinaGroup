import React, { useEffect, useRef, useState } from 'react';

const Particleground = ({ dotColor = '#69aaca', lineColor = '#133b88', density = 7000, particleRadius = 4, proximity = 70, parallaxMultiplier = 5 }) => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 }); // Initialize outside of view

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      let numberOfParticles = Math.round((canvas.width * canvas.height) / density);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(ctx, canvas.width, canvas.height, dotColor, lineColor, particleRadius, proximity, parallaxMultiplier));
      }
    };

    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update(mousePosition);
        particle.draw();
      });
      connectParticles(particles, ctx, proximity, lineColor);
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dotColor, lineColor, density, particleRadius, proximity, parallaxMultiplier]);

  return <canvas ref={canvasRef} className="pg-canvas"></canvas>;
};

class Particle {
  constructor(ctx, canvasWidth, canvasHeight, dotColor, lineColor, radius, proximity, parallaxMultiplier) {
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.dotColor = dotColor;
    this.lineColor = lineColor;
    this.radius = radius;
    this.proximity = proximity;
    this.parallaxMultiplier = parallaxMultiplier;

    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.speedX = (Math.random() - 0.5) * 0.7;
    this.speedY = (Math.random() - 0.5) * 0.7;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.dotColor;
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  update(mousePosition) {
    let dx = mousePosition.x - this.x;
    let dy = mousePosition.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    // Move particle towards the mouse by a fraction of the distance
    if (distance < this.proximity) {
      this.x += dx / distance * this.parallaxMultiplier;
      this.y += dy / distance * this.parallaxMultiplier;
    }

    // Boundary check
    if (this.x + this.radius > this.canvasWidth || this.x - this.radius < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y + this.radius > this.canvasHeight || this.y - this.radius < 0) {
      this.speedY = -this.speedY;
    }

    // Apply speed
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

function connectParticles(particles, ctx, proximity, lineColor) {
  particles.forEach((particle, index) => {
    for (let i = index + 1; i < particles.length; i++) {
      const distance = Math.sqrt(Math.pow(particle.x - particles[i].x, 2) + Math.pow(particle.y - particles[i].y, 2));
      if (distance < proximity) {
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particles[i].x, particles[i].y);
        ctx.stroke();
      }
    }
  });
}

export default Particleground;
