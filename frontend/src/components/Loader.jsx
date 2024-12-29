import React from 'react';
import { motion } from 'framer-motion';

const HeartbeatLine = () => {
  return (
    <div className="flex justify-center items-center overflow-hidden">
      <svg
        className="w-[200vw]"
        height="60"
        viewBox="0 0 2000 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M0 40 H980 L990 20 L1000 60 L1010 20 L1020 40 H2000"
          stroke="#00ff00"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>
    </div>
  );
};

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-50">
      <HeartbeatLine />
    </div>
  );
};

export default Loader;
