import React from "react";
import { motion } from "framer-motion";
import { useGame } from "../../context/GameContext";
import { useTheme } from "../../context/ThemeContext";
import { FaTrophy, FaStar } from "react-icons/fa";

const ScoreBoard = () => {
  const { score, highScore, isCelebrating } = useGame();
  const { colors } = useTheme();

  return (
    <div
      style={{
        position: "fixed",
        top: "70px",
        left: "20px",
        display: "flex",
        gap: "20px",
        zIndex: 10,
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        style={{
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(10px)",
          padding: "10px 20px",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FaStar color="#ffcc00" />
          <span style={{ opacity: 0.7, fontSize: "0.85rem" }}>Score</span>
        </div>
        <motion.div
          key={score}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          style={{ fontSize: "1.5rem", fontWeight: "bold" }}
        >
          {score}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(10px)",
          padding: "10px 20px",
          borderRadius: "12px",
          border: `1px solid ${isCelebrating ? "#ffcc00" : "rgba(255,255,255,0.1)"}`,
          boxShadow: isCelebrating ? "0 0 20px rgba(255,204,0,0.2)" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FaTrophy color={isCelebrating ? "#ffcc00" : "#aaa"} />
          <span style={{ opacity: 0.7, fontSize: "0.85rem" }}>High Score</span>
        </div>
        <motion.div
          key={highScore}
          animate={{
            scale: isCelebrating ? [1, 1.2, 1] : 1,
            color: isCelebrating ? "#ffcc00" : colors.text,
          }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: "1.5rem", fontWeight: "bold" }}
        >
          {highScore}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ScoreBoard;
