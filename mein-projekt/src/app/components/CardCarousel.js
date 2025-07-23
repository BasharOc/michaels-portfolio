"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CardCarousel = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);

  // Default projects
  const defaultProjects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Eine moderne E-Commerce-Lösung mit React und Node.js entwickelt.",
      image: "/images/project1.jpg",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "#",
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "Responsive Portfolio-Website mit Next.js und Tailwind CSS.",
      image: "/images/project2.jpg",
      technologies: ["Next.js", "Tailwind", "Framer Motion"],
      link: "#",
    },
    {
      id: 3,
      title: "Task Manager App",
      description: "Produktivitäts-App mit Drag & Drop Funktionalität.",
      image: "/images/project3.jpg",
      technologies: ["React", "TypeScript", "Firebase"],
      link: "#",
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "Interaktives Wetter-Dashboard mit API-Integration.",
      image: "/images/project4.jpg",
      technologies: ["Vue.js", "Chart.js", "OpenWeather API"],
      link: "#",
    },
    {
      id: 5,
      title: "Social Media App",
      description: "Social Media Plattform mit Echtzeit-Chat Funktionalität.",
      image: "/images/project5.jpg",
      technologies: ["React Native", "Socket.io", "Express"],
      link: "#",
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
          Meine Projekte
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 text-lg"
        >
          Eine Auswahl meiner neuesten Arbeiten
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
                     }`}
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
                     }`}
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
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
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
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#558C8C]/20 transform hover:-translate-y-2">
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
                        Projekt ansehen
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
              Wischen zum Navigieren
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
