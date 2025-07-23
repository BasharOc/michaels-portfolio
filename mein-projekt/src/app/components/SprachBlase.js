"use client";

import { motion } from "framer-motion";

const SpeechBubble = ({
  children,
  position = "bottom-left",
  className = "",
  animate = true,
  delay = 0,
}) => {
  const getArrowClasses = () => {
    switch (position) {
      case "bottom-left":
        return "bottom-0 left-6 translate-y-full";
      case "bottom-right":
        return "bottom-0 right-6 translate-y-full";
      case "top-left":
        return "top-0 left-6 -translate-y-full rotate-180";
      case "top-right":
        return "top-0 right-6 -translate-y-full rotate-180";
      case "left":
        return "left-0 top-1/2 -translate-y-1/2 -translate-x-full -rotate-90";
      case "right":
        return "right-0 top-1/2 -translate-y-1/2 translate-x-full rotate-90";
      default:
        return "bottom-0 left-6 translate-y-full";
    }
  };

  const bubbleVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: delay,
      },
    },
  };

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      variants={animate ? bubbleVariants : {}}
      initial={animate ? "hidden" : {}}
      animate={animate ? "visible" : {}}
    >
      {/* Hauptblase */}
      <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl shadow-lg max-w-xs sm:max-w-sm relative">
        <div className="text-sm leading-relaxed">{children}</div>
      </div>

      {/* Pfeil/Tail */}
      <div className={`absolute w-0 h-0 ${getArrowClasses()}`}>
        <svg
          width="16"
          height="8"
          viewBox="0 0 16 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          <path d="M8 8L0 0H16L8 8Z" fill="#f3f4f6" />
        </svg>
      </div>
    </motion.div>
  );
};

export default SpeechBubble;
