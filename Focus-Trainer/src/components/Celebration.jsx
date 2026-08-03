import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "../context/GameContext";

const Celebration = () => {
  const { data } = useGame();
  const { showBanner } = data;

  const confettiColors = [
    "#ff6b6b",
    "#ffd93d",
    "#6bcb77",
    "#4d96ff",
    "#ff6bff",
    "#ff9f43",
    "#00d2d3",
    "#f368e0",
    "#54a0ff",
    "#5f27cd",
  ];

  const confettiPieces = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    size: Math.random() * 10 + 4,
    rotation: Math.random() * 360,
    duration: Math.random() * 2 + 1.5,
    delay: Math.random() * 0.5,
    xDrift: (Math.random() - 0.5) * 300,
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
              style={{
                fontSize: "clamp(3rem, 10vw, 5rem)",
                marginBottom: "10px",
              }}
            >
              🏆
            </motion.div>
            <motion.h1
              style={{
                fontSize: "clamp(1.8rem, 6vw, 3.5rem)",
                fontWeight: 900,
                background:
                  "linear-gradient(135deg, #ffcc00, #ff8800, #ff4400)",
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
              NEW HIGH SCORE! 🎉
            </motion.h1>
            <motion.p
              style={{
                color: "#fff",
                fontSize: "clamp(1rem, 3vw, 1.5rem)",
                marginTop: 10,
                opacity: 0.8,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Amazing! You're getting sharper!
            </motion.p>
          </motion.div>

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
                rotate: [0, piece.rotation * 3],
                opacity: [1, 0],
                x: [0, piece.xDrift],
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
