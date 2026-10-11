import React, { useEffect, useRef } from 'react';

export const FigmaMotionBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse parallax tracking
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Particle System
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      pulse: Math.random() * Math.PI * 2,
    }));

    // Floating Glass Geometric Shapes
    const shapes = [
      { x: width * 0.15, y: height * 0.25, size: 80, rot: 0, vRot: 0.003, scale: 1 },
      { x: width * 0.82, y: height * 0.35, size: 110, rot: 1, vRot: -0.002, scale: 1.2 },
      { x: width * 0.70, y: height * 0.75, size: 95, rot: 2, vRot: 0.004, scale: 0.9 },
      { x: width * 0.25, y: height * 0.80, size: 70, rot: 0.5, vRot: -0.003, scale: 1.1 },
    ];

    let time = 0;

    const render = () => {
      time += 0.01;

      // Smooth parallax interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.03;
      mouse.y += (mouse.targetY - mouse.y) * 0.03;

      const mouseNormX = (mouse.x / width - 0.5) * 60;
      const mouseNormY = (mouse.y / height - 0.5) * 60;

      ctx.clearRect(0, 0, width, height);

      // 1. Deep Obsidian Base Layer
      ctx.fillStyle = '#070709';
      ctx.fillRect(0, 0, width, height);

      // 2. Animated Aurora Gradient Orbs
      // Orb 1: Gold / Amber Glow
      const g1X = width * 0.3 + Math.sin(time * 0.5) * 120 + mouseNormX;
      const g1Y = height * 0.3 + Math.cos(time * 0.7) * 80 + mouseNormY;
      const grad1 = ctx.createRadialGradient(g1X, g1Y, 10, g1X, g1Y, width * 0.45);
      grad1.addColorStop(0, 'rgba(212, 175, 55, 0.18)');
      grad1.addColorStop(0.5, 'rgba(154, 123, 28, 0.06)');
      grad1.addColorStop(1, 'rgba(7, 7, 9, 0)');
      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.arc(g1X, g1Y, width * 0.45, 0, Math.PI * 2);
      ctx.fill();

      // Orb 2: Deep Cyan / Platinum Light
      const g2X = width * 0.75 + Math.cos(time * 0.6) * 140 - mouseNormX;
      const g2Y = height * 0.65 + Math.sin(time * 0.4) * 100 - mouseNormY;
      const grad2 = ctx.createRadialGradient(g2X, g2Y, 10, g2X, g2Y, width * 0.40);
      grad2.addColorStop(0, 'rgba(56, 189, 248, 0.12)');
      grad2.addColorStop(0.5, 'rgba(30, 58, 138, 0.05)');
      grad2.addColorStop(1, 'rgba(7, 7, 9, 0)');
      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(g2X, g2Y, width * 0.40, 0, Math.PI * 2);
      ctx.fill();

      // Orb 3: Charcoal Velvet Center Wave
      const g3X = width * 0.5 + Math.sin(time * 0.8) * 80;
      const g3Y = height * 0.4 + Math.sin(time * 0.3) * 60;
      const grad3 = ctx.createRadialGradient(g3X, g3Y, 0, g3X, g3Y, width * 0.35);
      grad3.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
      grad3.addColorStop(1, 'rgba(7, 7, 9, 0)');
      ctx.fillStyle = grad3;
      ctx.beginPath();
      ctx.arc(g3X, g3Y, width * 0.35, 0, Math.PI * 2);
      ctx.fill();

      // 3. Morphing Aurora Wave Ribbon
      ctx.beginPath();
      ctx.moveTo(0, height * 0.6);
      for (let x = 0; x <= width; x += 30) {
        const wave1 = Math.sin(x * 0.003 + time) * 40;
        const wave2 = Math.cos(x * 0.002 - time * 0.8) * 35;
        const y = height * 0.55 + wave1 + wave2 + (mouseNormY * 0.2);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const waveGrad = ctx.createLinearGradient(0, height * 0.4, width, height);
      waveGrad.addColorStop(0, 'rgba(212, 175, 55, 0.03)');
      waveGrad.addColorStop(0.5, 'rgba(38, 38, 48, 0.12)');
      waveGrad.addColorStop(1, 'rgba(7, 7, 9, 0.4)');
      ctx.fillStyle = waveGrad;
      ctx.fill();

      // 4. Soft Moving Light Rays
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const rayGrad = ctx.createLinearGradient(0, 0, width, height);
      rayGrad.addColorStop(0, 'rgba(255, 255, 255, 0.02)');
      rayGrad.addColorStop(0.5, 'rgba(212, 175, 55, 0.03)');
      rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = rayGrad;
      ctx.beginPath();
      ctx.moveTo(width * 0.2 + Math.sin(time * 0.3) * 50, 0);
      ctx.lineTo(width * 0.5 + Math.sin(time * 0.3) * 50, 0);
      ctx.lineTo(width * 0.8, height);
      ctx.lineTo(width * 0.3, height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 5. Floating Glowing Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.03;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = Math.max(0.1, p.alpha + Math.sin(p.pulse) * 0.25);
        ctx.fillStyle = `rgba(243, 229, 171, ₹{currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x + mouseNormX * 0.15, p.y + mouseNormY * 0.15, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 6. Floating Glassmorphism Geometric Shapes
      shapes.forEach((s) => {
        s.rot += s.vRot;
        const hoverY = Math.sin(time * 1.5 + s.size) * 12;
        const posX = s.x + mouseNormX * 0.4;
        const posY = s.y + hoverY + mouseNormY * 0.4;

        ctx.save();
        ctx.translate(posX, posY);
        ctx.rotate(s.rot);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1.5;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';

        // Rounded diamond polygon
        ctx.beginPath();
        const r = s.size * 0.5;
        ctx.moveTo(0, -r);
        ctx.lineTo(r, 0);
        ctx.lineTo(0, r);
        ctx.lineTo(-r, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Inner metallic gold accent line
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.4, 0, Math.PI * 1.5);
        ctx.stroke();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay pointer-events-none" />
      {/* Soft Vignette Overlay */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-[#070709] pointer-events-none" />
    </div>
  );
};
