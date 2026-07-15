import React from "react";
import { motion } from "framer-motion";
import { useGame } from "../../context/GameContext";

const ScoreDisplay = () => {
  const { score, highScore, isCelebrating } = useGame();

  return (
    <div style={{ position: "fixed", top: "15px", left: "15px" }}>
      <div
        className="score"
        style={{ fontSize: "1rem", transition: "all 0.3s ease" }}
      >
        Score: <span>{score}</span>
      </div>
      <motion.div
        className="high-score"
        style={{
          fontSize: "0.9rem",
          color: isCelebrating ? "#ffcc00" : "#aaa",
          transition: "all 0.3s ease",
        }}
        animate={{
          color: isCelebrating ? "#ffcc00" : "#aaa",
          scale: isCelebrating ? 1.1 : 1,
          textShadow: isCelebrating ? "0 0 10px #ffcc00" : "none",
          fontWeight: isCelebrating ? "bold" : "normal",
        }}
        transition={{ duration: 0.3 }}
      >
        High Score: <span>{highScore}</span>
      </motion.div>
    </div>
  );
};

export default ScoreDisplay;
