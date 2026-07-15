import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "../../context/GameContext";
import { FaTrophy } from "react-icons/fa";

const Celebration = () => {
  const { showBanner } = useGame();

  // Create confetti particles
  const confettiColors = [
    "#ff6b6b",
    "#ffd93d",
    "#6bcb77",
    "#4d96ff",
    "#ff6bff",
  ];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    size: Math.random() * 8 + 4,
    rotation: Math.random() * 360,
    duration: Math.random() * 2 + 1,
    delay: Math.random() * 0.5,
  }));

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          <motion.div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 900,
              textAlign: "center",
              pointerEvents: "none",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <motion.div
              animate={{
                rotate: [0, -5, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              style={{ fontSize: "4rem", marginBottom: "10px" }}
            >
              🏆
            </motion.div>
            <motion.h1
              style={{
                fontSize: "3rem",
                fontWeight: 900,
                background: "linear-gradient(135deg, #ffcc00, #ff8800)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 30px rgba(255,204,0,0.3)",
                letterSpacing: "4px",
              }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              NEW HIGH SCORE!
            </motion.h1>
          </motion.div>

          {/* Confetti */}
          {confettiPieces.map((piece) => (
            <motion.div
              key={piece.id}
              style={{
                position: "fixed",
                width: piece.size,
                height: piece.size * 0.6,
                background: piece.color,
                borderRadius: "2px",
                zIndex: 899,
                pointerEvents: "none",
                top: `${piece.y}%`,
                left: `${piece.x}%`,
              }}
              initial={{
                y: 0,
                rotate: 0,
                opacity: 1,
                x: 0,
              }}
              animate={{
                y: ["0vh", "100vh"],
                rotate: [0, piece.rotation * 2],
                opacity: [1, 0],
                x: [0, (Math.random() - 0.5) * 200],
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  );
};

export default Celebration;
