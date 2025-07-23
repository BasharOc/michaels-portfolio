"use client";

import { motion } from "framer-motion";

const Wave = () => {
  return (
    <div className="relative w-full h-32 overflow-hidden">
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hintere Welle - 1 große Welle für Desktop */}
        <motion.path
          fill="#558C8C"
          fillOpacity="0.5"
          animate={{
            d: [
              "M0,0 L0,70 C600,40 600,100 1200,70 L1200,0 Z",
              "M0,0 L0,80 C600,110 600,50 1200,80 L1200,0 Z",
              "M0,0 L0,70 C600,40 600,100 1200,70 L1200,0 Z",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Mittlere Welle - 2 sanfte Wellen für Desktop */}
        <motion.path
          fill="#558C8C"
          fillOpacity="0.7"
          animate={{
            d: [
              "M0,0 L0,50 C300,30 300,70 600,50 C900,30 900,70 1200,50 L1200,0 Z",
              "M0,0 L0,60 C300,80 300,40 600,60 C900,80 900,40 1200,60 L1200,0 Z",
              "M0,0 L0,50 C300,30 300,70 600,50 C900,30 900,70 1200,50 L1200,0 Z",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Vordere Welle - 4 kleine Wellen für Desktop */}
        <motion.path
          fill="#558C8C"
          animate={{
            d: [
              "M0,0 L0,35 C200,15 200,55 400,35 C600,15 600,55 800,35 C1000,15 1000,55 1200,35 L1200,0 Z",
              "M0,0 L0,45 C200,65 200,25 400,45 C600,65 600,25 800,45 C1000,65 1000,25 1200,45 L1200,0 Z",
              "M0,0 L0,35 C200,15 200,55 400,35 C600,15 600,55 800,35 C1000,15 1000,55 1200,35 L1200,0 Z",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </svg>
    </div>
  );
};

export default Wave;
