
import React from 'react';

export const FoliageOverlay: React.FC<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({ position }) => {
  const classes = {
    'top-left': 'top-0 left-0 -translate-x-1/4 -translate-y-1/4',
    'top-right': 'top-0 right-0 translate-x-1/4 -translate-y-1/4 rotate-90',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/4 translate-y-1/4 -rotate-90',
    'bottom-right': 'bottom-0 right-0 translate-x-1/4 translate-y-1/4 rotate-180',
  };

  return (
    <div className={`absolute pointer-events-none opacity-20 z-0 w-64 h-64 ${classes[position]}`}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#4A5D4E" d="M45.7,-77.6C58.2,-71.4,66.6,-57.4,72.4,-43.3C78.2,-29.2,81.4,-14.6,81.5,0.1C81.6,14.8,78.5,29.6,71.2,41.9C63.8,54.2,52.2,64.1,39.1,70.9C26,77.7,13,81.5,-0.6,82.5C-14.2,83.5,-28.4,81.7,-40.8,74.7C-53.1,67.6,-63.6,55.3,-71.3,41.7C-79,28.1,-83.8,14.1,-83.8,-0C-83.8,-14.1,-79,-28.2,-71,-41.2C-63.1,-54.2,-52,-66.1,-38.9,-72.1C-25.7,-78.1,-12.9,-78.2,1.4,-80.7C15.7,-83.1,33.1,-83.8,45.7,-77.6Z" transform="translate(100 100)" />
      </svg>
    </div>
  );
};
