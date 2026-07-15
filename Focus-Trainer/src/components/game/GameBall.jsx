import React from "react";
import { motion } from "framer-motion";
import { useGame } from "../../context/GameContext";

const GameBall = ({ isVibrating }) => {
  const { position, color, shadow, currentWord } = useGame();

  return (
    <motion.div
      className="game-ball"
      style={{
        position: "absolute",
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        backgroundColor: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.3rem",
        fontWeight: "bolder",
        color: "#000",
        boxShadow: shadow,
        userSelect: "none",
        willChange: "transform",
        left: 0,
        top: 0,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      animate={
        isVibrating
          ? {
              x: [
                position.x - 2,
                position.x + 2,
                position.x - 2,
                position.x + 2,
                position.x,
              ],
              y: [position.y, position.y, position.y, position.y, position.y],
              transition: { duration: 0.15, repeat: 3 },
            }
          : {
              x: position.x,
              y: position.y,
            }
      }
      transition={{ type: "tween" }}
    >
      {currentWord || "READY?"}
    </motion.div>
  );
};

export default GameBall;
