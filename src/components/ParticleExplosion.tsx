import { memo } from 'react';

interface ParticleExplosionProps {
  x: number;
  y: number;
}

export const ParticleExplosion = memo(function ParticleExplosion({ x, y }: ParticleExplosionProps) {
  const particles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2;
    const velocity = 50 + Math.random() * 100;
    const size = 2 + Math.random() * 4;
    const duration = 0.8 + Math.random() * 0.7;

    return {
      id: i,
      dx: Math.cos(angle) * velocity,
      dy: Math.sin(angle) * velocity - 50,
      size,
      duration,
      delay: Math.random() * 0.1,
      color: Math.random() > 0.5 ? '#00ff88' : '#ffaa00'
    };
  });

  return (
    <div className="particle-explosion" style={{ left: x, top: y }}>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            '--dx': `${particle.dx}px`,
            '--dy': `${particle.dy}px`,
            '--size': `${particle.size}px`,
            '--duration': `${particle.duration}s`,
            '--delay': `${particle.delay}s`,
            '--color': particle.color,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
});
