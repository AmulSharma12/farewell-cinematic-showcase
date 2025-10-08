import { useEffect, useState, useRef } from "react";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
  intensity?: number;
}

export const Particles = ({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
  intensity = 1,
}: ParticlesProps) => {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; vx: number; vy: number; size: number; color: string; opacity: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    // Apply intensity to quantity
    const adjustedQuantity = Math.floor(quantity * intensity);
    
    const handleResize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      
      const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#1dd1a1', '#f368e0'];
      
      const newParticles = Array.from({ length: adjustedQuantity }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1,
        size: Math.random() * 3 + 1 * intensity,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.3
      }));
      
      setParticles(newParticles);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [quantity, refresh, intensity]);

  useEffect(() => {
    const animateParticles = () => {
      if (!containerRef.current) return;
      
      const { width, height } = containerRef.current.getBoundingClientRect();
      
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          const { x, y, vx, vy } = particle;
          
          // Apply staticity - higher values make particles move less
          const nx = x + vx * (1 - staticity / 100);
          const ny = y + vy * (1 - staticity / 100);
          
          // Bounce off edges with ease factor
          const nextVx = nx <= 0 || nx >= width ? vx * -1 * (ease / 100) : vx;
          const nextVy = ny <= 0 || ny >= height ? vy * -1 * (ease / 100) : vy;
          
          return {
            ...particle,
            x: nx <= 0 ? 0 : nx >= width ? width : nx,
            y: ny <= 0 ? 0 : ny >= height ? height : ny,
            vx: nextVx,
            vy: nextVy
          };
        })
      );
      
      frameRef.current = requestAnimationFrame(animateParticles);
    };
    
    frameRef.current = requestAnimationFrame(animateParticles);
    
    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, [staticity, ease]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            transform: `scale(${1 + intensity * 0.2})`,
            transition: "transform 0.3s ease"
          }}
        />
      ))}
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};
