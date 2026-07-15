import React from "react";
import { motion } from "framer-motion";
import { useGame } from "../../context/GameContext";

const Ball = ({ isVibrating }) => {
  const { position, color, shadow, currentWord } = useGame();

  const vibrateVariants = {
    idle: {
      x: position.x,
      y: position.y,
    },
    vibrate: {
      x: [
        position.x - 2,
        position.x + 2,
        position.x - 2,
        position.x + 2,
        position.x,
      ],
      y: [position.y, position.y, position.y, position.y, position.y],
      transition: {
        duration: 0.15,
        repeat: 3,
      },
    },
  };

  return (
    <motion.div
      className="ball"
      style={{
        width: "120px",
        height: "120px",
        backgroundColor: color,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.3rem",
        fontWeight: "bolder",
        color: "#000",
        boxShadow: shadow,
        userSelect: "none",
        position: "absolute",
        willChange: "transform",
      }}
      animate={isVibrating ? "vibrate" : "idle"}
      variants={vibrateVariants}
      initial="idle"
    >
      {currentWord || "READY?"}
    </motion.div>
  );
};

export default Ball;
