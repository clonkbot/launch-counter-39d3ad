import { useState, useEffect, useCallback } from 'react';
import { LaunchCounter } from './components/LaunchCounter';
import { LaunchButton } from './components/LaunchButton';
import { ParticleExplosion } from './components/ParticleExplosion';
import { Scanlines } from './components/Scanlines';
import { TerminalHeader } from './components/TerminalHeader';
import './styles.css';

function App() {
  const [launchCount, setLaunchCount] = useState(() => {
    const saved = localStorage.getItem('launchCount');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    localStorage.setItem('launchCount', launchCount.toString());
  }, [launchCount]);

  // Real-time sync across tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'launchCount' && e.newValue) {
        setLaunchCount(parseInt(e.newValue, 10));
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleLaunch = useCallback((x: number, y: number) => {
    if (isLaunching) return;

    setIsLaunching(true);
    setLaunchCount(prev => prev + 1);

    const newParticle = { id: Date.now(), x, y };
    setParticles(prev => [...prev, newParticle]);

    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 1500);

    setTimeout(() => setIsLaunching(false), 300);
  }, [isLaunching]);

  const handleReset = useCallback(() => {
    setLaunchCount(0);
  }, []);

  return (
    <div className="app-container">
      <Scanlines />
      <div className="crt-effect">
        <div className="terminal-frame">
          <TerminalHeader />

          <main className="main-content">
            <div className="counter-section">
              <div className="counter-label">TOTAL LAUNCHES</div>
              <LaunchCounter count={launchCount} />
              <div className="counter-sublabel">APPLICATIONS DEPLOYED</div>
            </div>

            <LaunchButton onLaunch={handleLaunch} isLaunching={isLaunching} />

            <button onClick={handleReset} className="reset-button">
              [RESET COUNTER]
            </button>
          </main>

          <footer className="terminal-footer">
            <div className="status-bar">
              <span className="status-item blink">
                <span className="status-dot"></span>
                SYSTEM ONLINE
              </span>
              <span className="status-item">MEM: 64K</span>
              <span className="status-item">UPTIME: {Math.floor(Date.now() / 1000) % 99999}</span>
            </div>
            <div className="credits">
              Requested by @KienNguyen · Built by @clonkbot
            </div>
          </footer>
        </div>
      </div>

      {particles.map(particle => (
        <ParticleExplosion key={particle.id} x={particle.x} y={particle.y} />
      ))}
    </div>
  );
}

export default App;
