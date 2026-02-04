import { memo } from 'react';

export const Scanlines = memo(function Scanlines() {
  return (
    <>
      <div className="scanlines" />
      <div className="screen-flicker" />
      <div className="vignette" />
    </>
  );
});
