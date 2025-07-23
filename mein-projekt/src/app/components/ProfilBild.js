"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpeechBubble from "./SprachBlase";

const ProfilBild = ({ imageSrc = "/ich.png", name = "Bashar" }) => {
  const [currentBubble, setCurrentBubble] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Automatische Begrüßungssequenz
  useEffect(() => {
    // Erste Blase nach 1 Sekunde
    const timer1 = setTimeout(() => {
      setCurrentBubble("first");
    }, 1000);

    // Zweite Blase nach 3.5 Sekunden (erste verschwindet automatisch)
    const timer2 = setTimeout(() => {
      setCurrentBubble("second");
    }, 3500);

    // Alle Blasen nach 7 Sekunden ausblenden
    const timer3 = setTimeout(() => {
      setCurrentBubble(null);
    }, 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [animationKey]);

  // Klick-Handler für Wiederholung
  const handleProfileClick = () => {
    setCurrentBubble(null);
    setTimeout(() => {
      setAnimationKey((prev) => prev + 1);
    }, 200);
  };

  return (
    <div className="flex flex-col items-center justify-center py-4 relative">
      {/* Horizontales Layout: Bild + Info */}
      <div className="flex items-center gap-6 mb-4 relative">
        {/* Profilbild */}
        <motion.div
          className="relative cursor-pointer group flex-shrink-0"
          onClick={handleProfileClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-lg border-4 border-white group-hover:shadow-xl transition-shadow duration-300">
            <img
              src={imageSrc}
              alt={`${name} Profilbild`}
              className="w-full h-full object-cover object-center rounded-full"
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDE2MCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxNjAiIGZpbGw9IiM1NThDOEMiLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjYwIiByPSIyNCIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNNDAgMTIwQzQwIDEwMC41IDU2LjUgODUgODAgODVTMTIwIDEwMC41IDEyMCAxMjBWMTYwSDQwVjEyMFoiIGZpbGw9IndoaXRlIi8+PC9zdmc+";
              }}
            />
          </div>

          {/* Hover Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[#558C8C] opacity-0 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
        </motion.div>

        {/* Name und Profession rechts vom Bild */}
        <div className="flex flex-col justify-center">
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-gray-800"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            {name}
          </motion.h2>

          <motion.p
            className="mt-1 text-gray-600 text-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.4 }}
          >
            Frontend Developer & UI/UX Designer
          </motion.p>
        </div>
      </div>

      {/* Sprechblasen - absolute positioniert, Dreieck zeigt auf Bildmitte */}
      <div className="absolute top-full left-0 mt-4 w-full">
        <AnimatePresence mode="wait">
          {currentBubble === "first" && (
            <motion.div
              key="first"
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute left-16 md:left-20"
              style={{
                transform: "translateX(-50%)",
              }}
            >
              <SpeechBubble position="top-left">
                Hi, mein Name ist {name}! 👋
              </SpeechBubble>
            </motion.div>
          )}

          {currentBubble === "second" && (
            <motion.div
              key="second"
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute left-16 md:left-20"
              style={{
                transform: "translateX(-50%)",
              }}
            >
              <SpeechBubble position="top-left">
                Schön, dass du hier bist! ✨
              </SpeechBubble>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfilBild;
