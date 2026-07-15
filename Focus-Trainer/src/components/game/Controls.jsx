import React from "react";
import { useGame } from "../../context/GameContext";
import { useTheme } from "../../context/ThemeContext";
import Button from "../ui/Button";
import { FaRedo } from "react-icons/fa";
import { motion } from "framer-motion";

const Controls = () => {
  const { isGameStarted, restartGame } = useGame();
  const { colors, isDarkMode } = useTheme();

  if (!isGameStarted) return null;

  const handleRestart = () => {
    if (window.confirm("Are you sure you want to restart?")) {
      restartGame();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "10px",
        zIndex: 10,
      }}
    >
      <Button
        onClick={handleRestart}
        variant="secondary"
        size="sm"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
          color: colors.text,
          border: isDarkMode
            ? "1px solid rgba(255,255,255,0.2)"
            : "1px solid rgba(0,0,0,0.2)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = isDarkMode
            ? "rgba(255,255,255,0.2)"
            : "rgba(0,0,0,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = isDarkMode
            ? "rgba(255,255,255,0.1)"
            : "rgba(0,0,0,0.1)";
        }}
      >
        <FaRedo /> Restart Game
      </Button>
    </motion.div>
  );
};

export default Controls;
