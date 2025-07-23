"use client";

import { motion } from "framer-motion";

const SpeechBubble = ({ children, position = "left", className = "" }) => {
  // SVG Pfeil basierend auf Position
  const renderArrow = () => {
    switch (position) {
      case "left":
        return (
          <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2">
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
              <path d="M12 10L0 0V20L12 10Z" fill="#f3f4f6" />
            </svg>
          </div>
        );

      case "right":
        return (
          <div className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2">
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
              <path d="M0 10L12 0V20L0 10Z" fill="#f3f4f6" />
            </svg>
          </div>
        );

      case "top-left":
        return (
          <div className="absolute top-0 left-6 -translate-y-full">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M8 0L0 12H16L8 0Z" fill="#f3f4f6" />
            </svg>
          </div>
        );

      case "top-right":
        return (
          <div className="absolute top-0 right-6 -translate-y-full">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M8 0L0 12H16L8 0Z" fill="#f3f4f6" />
            </svg>
          </div>
        );

      case "bottom-left":
        return (
          <div className="absolute bottom-0 left-6 translate-y-full">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M8 12L0 0H16L8 12Z" fill="#f3f4f6" />
            </svg>
          </div>
        );

      case "bottom-right":
        return (
          <div className="absolute bottom-0 right-6 translate-y-full">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M8 12L0 0H16L8 12Z" fill="#f3f4f6" />
            </svg>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Sprechblase */}
      <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl shadow-lg max-w-xs whitespace-nowrap">
        <div className="text-sm font-medium">{children}</div>
      </div>

      {/* Pfeil */}
      {renderArrow()}
    </div>
  );
};

export default SpeechBubble;
