"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CardCarousel = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  const touchStartX = useRef(0);

  // Default projects
  const defaultProjects = [
    {
      title: "Scool Drive",
      id: "KJs",
      link: "https://fahrschule-lg.scooldrive.com/",
      image: "scool-drive.png",
      technologies: ["React", "Tailwind", "MongoDb"],
      description: "Modern website for innovative driving school services.",
    },
    {
      title: "Pure Nature",
      id: "KJgs",
      link: "https://pure-nature.basharfarhat.com/",
      image: "pure-nature.png",
      technologies: ["React", "Tailwind", "Framermotion"],
      description: "Clean portfolio design with a beautiful natural focus.",
    },
    {
      title: "Hair & style",
      id: "KJ4s",
      link: "https://hair-style.basharfarhat.com/",
      image: "hair-style.png",
      technologies: ["React", "Tailwind", "Framermotion"],
      description:
        "Modern website for a creative hair salon and beauty services.",
    },
    {
      title: "Alex fitnes",
      id: "K2Js",
      link: "https://alex-fitness.basharfarhat.com/",
      image: "alex-fitness.png",
      technologies: ["React", "Tailwind", "Framermotion"],
      description: "Personal fitness studio with an engaging online presence.",
    },
    {
      title: "Café am Markt",
      id: "KJ3s",
      technologies: ["Wordpress", "Elementor", "Copy writing"],
      link: "https://demo-project-cafe.setupyourweb.com/",
      image: "cafe-am-markt.png",
      description: "Cozy café website featuring local specialties daily.",
    },
  ];

  const projectsData = projects || defaultProjects;

  // Check mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Navigation
  const nextSlide = () => {
    setDirection(1);
    if (isMobile) {
      setCurrentIndex((prev) => (prev + 1) % projectsData.length);
    } else {
      // Desktop: 3er Schritte, aber nur wenn noch Projekte vorhanden
      setCurrentIndex((prev) => {
        const nextIndex = prev + 3;
        return nextIndex < projectsData.length ? nextIndex : prev;
      });
    }
  };

  const prevSlide = () => {
    setDirection(-1);
    if (isMobile) {
      setCurrentIndex(
        (prev) => (prev - 1 + projectsData.length) % projectsData.length
      );
    } else {
      // Desktop: 3er Schritte rückwärts
      setCurrentIndex((prev) => Math.max(0, prev - 3));
    }
  };

  // Check if navigation buttons should be disabled
  const canGoNext = isMobile
    ? currentIndex < projectsData.length - 1
    : currentIndex + 3 < projectsData.length;
  const canGoPrev = currentIndex > 0;

  // Simple mobile touch handling
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!isMobile) return;

    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        nextSlide(); // Swipe left -> next
      } else {
        prevSlide(); // Swipe right -> prev
      }
    }
  };

  const getVisibleProjects = () => {
    if (isMobile) {
      return [projectsData[currentIndex]];
    }

    // Desktop: show up to 3 cards, but don't wrap around
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = currentIndex + i;
      if (index < projectsData.length) {
        visible.push(projectsData[index]);
      }
    }
    return visible;
  };

  // Mobile animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-black mb-4"
        >
          My Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 text-lg"
        >
          A selection of my latest work
        </motion.p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          disabled={!canGoPrev}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 
                     rounded-full p-3 transition-all duration-200
                     shadow-lg border border-gray-200 group ${
                       canGoPrev
                         ? "bg-white hover:bg-gray-50 hover:shadow-xl"
                         : "bg-gray-100 cursor-not-allowed opacity-50"
                     }  ${isMobile ? "hidden" : ""}`}
        >
          <svg
            className={`w-6 h-6 transition-colors ${
              canGoPrev
                ? "text-gray-700 group-hover:text-[#558C8C]"
                : "text-gray-400"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          disabled={!canGoNext}
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 
                     rounded-full p-3 transition-all duration-200
                     shadow-lg border border-gray-200 group ${
                       canGoNext
                         ? "bg-white hover:bg-gray-50 hover:shadow-xl"
                         : "bg-gray-100 cursor-not-allowed opacity-50"
                     } ${isMobile ? "hidden" : ""}`}
        >
          <svg
            className={`w-6 h-6 transition-colors ${
              canGoNext
                ? "text-gray-700 group-hover:text-[#558C8C]"
                : "text-gray-400"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Cards Container */}
        <div
          className="select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={isMobile ? slideVariants : undefined}
              initial={isMobile ? "enter" : { opacity: 0, x: 300 }}
              animate={isMobile ? "center" : { opacity: 1, x: 0 }}
              exit={isMobile ? "exit" : { opacity: 0, x: -300 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`grid gap-6 ${
                isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3"
              }`}
            >
              {getVisibleProjects().map((project, index) => (
                <motion.div
                  key={`${project.id}-${currentIndex}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#558C8C]/20 transform hover:-translate-y-2 overflow-hidden">
                    {/* Project Image */}
                    <div className="relative h-48 bg-gradient-to-br from-[#558C8C] to-[#E8DB7D]">
                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          draggable={false}
                        />
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-black mb-3 group-hover:text-[#558C8C] transition-colors duration-200">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-[#E8DB7D]/20 text-[#558C8C] text-xs font-medium rounded-full border border-[#E8DB7D]/40 hover:bg-[#E8DB7D]/30 transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => window.open(project.link, "_blank")}
                        className="w-full bg-[#CDCDCD] hover:bg-[#558C8C] text-gray-700 hover:text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
                      >
                        See Project
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {isMobile
            ? // Mobile: Ein Dot pro Projekt
              projectsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    currentIndex === index
                      ? "bg-[#558C8C] scale-125 shadow-lg"
                      : "bg-[#CDCDCD] hover:bg-[#558C8C]/50 hover:scale-110"
                  }`}
                />
              ))
            : // Desktop: Ein Dot pro 3er-Gruppe
              Array.from({ length: Math.ceil(projectsData.length / 3) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index * 3)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      Math.floor(currentIndex / 3) === index
                        ? "bg-[#558C8C] scale-125 shadow-lg"
                        : "bg-[#CDCDCD] hover:bg-[#558C8C]/50 hover:scale-110"
                    }`}
                  />
                )
              )}
        </div>

        {/* Mobile Swipe Hint */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-center mt-4"
          >
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              Swipe to navigate
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CardCarousel;
