import { useState, useEffect, memo } from 'react';

export const TerminalHeader = memo(function TerminalHeader() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    }).toUpperCase();
  };

  return (
    <header className="terminal-header">
      <div className="header-left">
        <div className="terminal-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <span className="terminal-title">LAUNCH_CONTROL.exe</span>
      </div>
      <div className="header-center">
        <span className="header-logo">
          {'< MISSION CONTROL />'}
        </span>
      </div>
      <div className="header-right">
        <span className="header-date">{formatDate(time)}</span>
        <span className="header-time">{formatTime(time)}</span>
      </div>
    </header>
  );
});
