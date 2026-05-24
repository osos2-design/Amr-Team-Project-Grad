import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function NeonHeroDecoration() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas floating star particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      pulseSpeed: number;
      pulseDirection: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 8000));
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.2 + 0.3,
          opacity: Math.random() * 0.8 + 0.1,
          pulseSpeed: Math.random() * 0.005 + 0.001,
          pulseDirection: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Opacity pulsing for a twinkling star effect
        p.opacity += p.pulseSpeed * p.pulseDirection;
        if (p.opacity >= 0.9) {
          p.pulseDirection = -1;
        } else if (p.opacity <= 0.1) {
          p.pulseDirection = 1;
        }

        // Draw particle
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#020203] overflow-hidden pointer-events-none">
      
      {/* 1. Canvas Stars Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      {/* 2. Vertical Volumetric Light Ray (Spotlight) — behind text */}
      <motion.div 
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.5, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "top center" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[450px] md:w-[600px] h-[85%] bg-gradient-to-b from-cyan-400/35 via-cyan-500/12 to-transparent blur-[60px] sm:blur-[70px] z-[5]"
      />

      {/* Additional intense core for the light ray */}
      <motion.div 
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.2, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "top center" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] sm:w-[160px] h-[75%] bg-gradient-to-b from-cyan-300/50 via-cyan-400/15 to-transparent blur-[35px] sm:blur-[45px] z-[5]"
      />

      {/* 3. The Curved Planet Horizon */}

      {/* Static Base Layer (The black planet surface that hides stars) */}
      <div 
        className="absolute bottom-[-600px] sm:bottom-[-800px] left-1/2 -translate-x-1/2 w-[200vw] sm:w-[150vw] h-[800px] sm:h-[1200px] rounded-[50%] bg-[#020203] z-10"
      />

      {/* Animated Light/Glow Layers (Reveals from left to right) */}
      <motion.div
        initial={{ clipPath: 'inset(0% 100% 0% 0%)' }} // Hidden (clipped from right to left)
        animate={{ clipPath: 'inset(0% -20% 0% -20%)' }} // Fully revealed to the right
        transition={{ duration: 2.5, ease: "easeInOut" }}
        className="absolute inset-0 z-20 pointer-events-none"
      >
        {/* Glow Layer (Transparent background, just the shadow) */}
        <div 
          className="absolute bottom-[-600px] sm:bottom-[-800px] left-1/2 -translate-x-1/2 w-[200vw] sm:w-[150vw] h-[800px] sm:h-[1200px] rounded-[50%]"
          style={{
            boxShadow: '0 -40px 150px rgba(6,182,212,0.4), inset 0 40px 100px rgba(6,182,212,0.05)'
          }}
        />

        {/* Sharp Laser Border Layer */}
        <div 
          className="absolute bottom-[-600px] sm:bottom-[-800px] left-1/2 -translate-x-1/2 w-[200vw] sm:w-[150vw] h-[800px] sm:h-[1200px] rounded-[50%] border-t-[2px] border-cyan-300"
          style={{
            filter: 'drop-shadow(0 0 10px rgba(34,211,238,1))'
          }}
        />
        
        {/* Soft overlay glow sitting exactly on the horizon line */}
        <motion.div
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[100px] sm:bottom-[300px] left-1/2 -translate-x-1/2 w-[80vw] sm:w-[60vw] h-[150px] bg-cyan-500/30 blur-[80px] rounded-[100%] z-10"
        />
      </motion.div>
      
    </div>
  );
}
