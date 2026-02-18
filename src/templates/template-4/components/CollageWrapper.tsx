import React from 'react';
import { motion } from 'framer-motion';

interface CollageWrapperProps {
  children: React.ReactNode;
  rotation?: string; // Tailwind class e.g. 'rotate-2'
  className?: string;
  noPadding?: boolean;
  tape?: boolean; // Adds a "scotch tape" effect
}

export const CollageWrapper: React.FC<CollageWrapperProps> = ({
  children,
  rotation = 'rotate-0',
  className = '',
  noPadding = false,
  tape = false
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 1.2,
        y: 20,
        rotate: rotation.includes('-') ? -15 : 15
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0,
        rotate: rotation === 'rotate-0' ? 0 :
          rotation === 'rotate-1' ? 1 :
            rotation === 'rotate-2' ? 2 :
              rotation === 'rotate-3' ? 3 :
                rotation === 'rotate-6' ? 6 :
                  rotation === 'rotate-12' ? 12 :
                    rotation === '-rotate-1' ? -1 :
                      rotation === '-rotate-2' ? -2 :
                        rotation === '-rotate-3' ? -3 :
                          rotation === '-rotate-6' ? -6 :
                            rotation === '-rotate-12' ? -12 : 0
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
        delay: Math.random() * 0.3 // Randomize slightly for more organic feel
      }}
      className={`relative group hover:z-20 ${className}`}
    >
      {tape && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-sm shadow-sm rotate-1 z-20 pointer-events-none origin-center"
        />
      )}
      <div className={`bg-paper-white collage-shadow border-4 border-white transition-transform duration-300 group-hover:scale-[1.03] ${noPadding ? '' : 'p-6'}`}>
        {children}
      </div>
    </motion.div>
  );
};
