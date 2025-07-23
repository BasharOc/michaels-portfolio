"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RiArrowRightSLine } from "react-icons/ri";

const ProjectCard = ({
  image,
  title,
  description,
  isCenter = false,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative w-[230px] h-[230px] bg-white border-2 border-gray-200 rounded-xl overflow-hidden cursor-pointer ${
        isCenter ? "transform -translate-y-0" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Original Card Content */}
      <div className="p-4 h-full flex flex-col">
        {/* Bild */}
        <div className="w-full h-32 mb-3 rounded-lg overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDIwMCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMjgiIGZpbGw9IiNmM2Y0ZjYiLz48cGF0aCBkPSJNNzUgNDVIMTI1VjU1SDc1VjQ1WiIgZmlsbD0iIzlDQTNBRiIvPjxwYXRoIGQ9Ik04NS41IDcwSDExNC41VjgwSDg1LjVWNzBaIiBmaWxsPSIjOUNBM0FGIi8+PC9zdmc+";
            }}
          />
        </div>

        {/* Titel */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {title}
        </h3>

        {/* Beschreibung */}
        <p className="text-sm text-gray-600 line-clamp-3 flex-1">
          {description}
        </p>
      </div>

      {/* Yellow Hover Overlay */}
      <motion.div
        className="absolute inset-0 bg-[#E8DB7D] flex items-center justify-center"
        initial={{ y: "100%" }}
        animate={{ y: isHovered ? 0 : "100%" }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div
          className="text-center text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20,
          }}
          transition={{
            duration: 0.3,
            delay: isHovered ? 0.2 : 0,
            ease: "easeOut",
          }}
        >
          <p className="px-10 text-sm font-medium mb-2 underline hover:opacity-60 transition-opacity duration-200 flex items-center justify-center gap-1">
            Learn more about the project
            <RiArrowRightSLine className="w-5 h-5" />
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
