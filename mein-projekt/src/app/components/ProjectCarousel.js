"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import ProjectCard from "./ProjectCard";

const ProjectCarousel = ({ projects = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);

  // Navigation Funktionen
  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, projects.length - 3) : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= projects.length - 3 ? 0 : prev + 1));
  };

  // Touch/Drag Handlers
  const handleDragStart = (e) => {
    setDragStartX(e.clientX || e.touches?.[0]?.clientX || 0);
  };

  const handleDragEnd = (e) => {
    const dragEndX = e.clientX || e.changedTouches?.[0]?.clientX || 0;
    const difference = dragStartX - dragEndX;

    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  // Sichtbare Cards (3 zur Zeit)
  const visibleProjects = projects.slice(currentIndex, currentIndex + 3);

  // Falls weniger als 3 Projekte, fülle mit leeren Plätzen
  while (visibleProjects.length < 3) {
    visibleProjects.push(null);
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto py-8">
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        {/* Cards Container */}
        <motion.div
          className="flex items-end justify-center gap-6 px-4"
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          style={{ cursor: "grab" }}
          whileTap={{ cursor: "grabbing" }}
        >
          <AnimatePresence mode="wait">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={`${currentIndex}-${index}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {project ? (
                  <ProjectCard
                    image={project.image}
                    title={project.title}
                    description={project.description}
                    isCenter={index === 1} // Mittlere Card ist erhöht
                    onClick={() => project.onClick?.(project)}
                  />
                ) : (
                  // Platzhalter für leere Slots
                  <div className="w-[230px] h-[230px]" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Navigation Pfeile */}
        {projects.length > 3 && (
          <>
            {/* Linker Pfeil */}
            <motion.button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#E8DB7D] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl z-10"
              onClick={goToPrevious}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={currentIndex === 0}
            >
              <RiArrowLeftSLine className="w-6 h-6 text-gray-800" />
            </motion.button>

            {/* Rechter Pfeil */}
            <motion.button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#E8DB7D] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl z-10"
              onClick={goToNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={currentIndex >= projects.length - 3}
            >
              <RiArrowRightSLine className="w-6 h-6 text-gray-800" />
            </motion.button>
          </>
        )}
      </div>

      {/* Pagination Dots */}
      {projects.length > 3 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: Math.max(1, projects.length - 2) }).map(
            (_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? "bg-[#E8DB7D]" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCarousel;
