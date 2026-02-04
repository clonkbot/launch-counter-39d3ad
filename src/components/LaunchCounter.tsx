import { useEffect, useState, memo } from 'react';

interface LaunchCounterProps {
  count: number;
}

export const LaunchCounter = memo(function LaunchCounter({ count }: LaunchCounterProps) {
  const [displayCount, setDisplayCount] = useState(count);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (count !== displayCount) {
      setIsAnimating(true);

      // Rapid number cycling effect
      const cycles = 8;
      let currentCycle = 0;

      const interval = setInterval(() => {
        if (currentCycle < cycles) {
          setDisplayCount(Math.floor(Math.random() * (count + 10)));
          currentCycle++;
        } else {
          setDisplayCount(count);
          setIsAnimating(false);
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [count, displayCount]);

  const digits = displayCount.toString().padStart(6, '0').split('');

  return (
    <div className={`launch-counter ${isAnimating ? 'animating' : ''}`}>
      {digits.map((digit, index) => (
        <div key={index} className="digit-container">
          <span className="digit" style={{ animationDelay: `${index * 0.05}s` }}>
            {digit}
          </span>
          <div className="digit-glow">{digit}</div>
        </div>
      ))}
    </div>
  );
});
