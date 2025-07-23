"use client";

import { motion } from "framer-motion";

const WaveMobile = () => {
  return (
    <div className="relative w-full h-32 overflow-hidden">
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hintere Welle - nur 1 große Welle */}
        <motion.path
          fill="#558C8C"
          fillOpacity="0.5"
          animate={{
            d: [
              "M0,0 L0,70 C200,40 200,100 400,70 L400,0 Z",
              "M0,0 L0,80 C200,110 200,50 400,80 L400,0 Z",
              "M0,0 L0,70 C200,40 200,100 400,70 L400,0 Z",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Mittlere Welle - 2 sanfte Wellen */}
        <motion.path
          fill="#558C8C"
          fillOpacity="0.7"
          animate={{
            d: [
              "M0,0 L0,50 C100,30 100,70 200,50 C300,30 300,70 400,50 L400,0 Z",
              "M0,0 L0,60 C100,80 100,40 200,60 C300,80 300,40 400,60 L400,0 Z",
              "M0,0 L0,50 C100,30 100,70 200,50 C300,30 300,70 400,50 L400,0 Z",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Vordere Welle - 3 kleine Wellen */}
        <motion.path
          fill="#558C8C"
          animate={{
            d: [
              "M0,0 L0,35 C80,15 80,55 160,35 C240,15 240,55 320,35 C360,15 360,55 400,35 L400,0 Z",
              "M0,0 L0,45 C80,65 80,25 160,45 C240,65 240,25 320,45 C360,65 360,25 400,45 L400,0 Z",
              "M0,0 L0,35 C80,15 80,55 160,35 C240,15 240,55 320,35 C360,15 360,55 400,35 L400,0 Z",
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

export default WaveMobile;
