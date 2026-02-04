import { useCallback, memo } from 'react';

interface LaunchButtonProps {
  onLaunch: (x: number, y: number) => void;
  isLaunching: boolean;
}

export const LaunchButton = memo(function LaunchButton({ onLaunch, isLaunching }: LaunchButtonProps) {
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    onLaunch(x, y);
  }, [onLaunch]);

  return (
    <div className="launch-button-container">
      <div className="button-frame">
        <button
          className={`launch-button ${isLaunching ? 'launching' : ''}`}
          onClick={handleClick}
          disabled={isLaunching}
        >
          <span className="button-inner">
            <svg className="rocket-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L12 14M12 2L8 6M12 2L16 6" />
              <path d="M5 18L12 14L19 18" />
              <path d="M5 22L5 18M19 22L19 18" />
            </svg>
            <span className="button-text">LAUNCH APP</span>
          </span>
        </button>
      </div>
      <div className="button-reflection"></div>
    </div>
  );
});
