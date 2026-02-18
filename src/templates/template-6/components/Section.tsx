
import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  width?: string;
}

export const Section: React.FC<SectionProps> = ({ children, id, className = "", width = "auto" }) => {
  return (
    <section
      id={id}
      style={{ minWidth: width, height: 'var(--section-height, 100vh)' }}
      className={`flex flex-col items-center justify-center p-8 md:p-16 relative ${className}`}
    >
      <div className="w-full h-full flex flex-col justify-center items-center relative z-[30]">
        {children}
      </div>
    </section>
  );
};
