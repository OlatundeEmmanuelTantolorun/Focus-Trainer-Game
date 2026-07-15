import React from "react";
import { motion } from "framer-motion";
import { useGame } from "../../context/GameContext";
import { useTheme } from "../../context/ThemeContext";
import { FaClock } from "react-icons/fa";

const Timer = () => {
  const { timeLeft } = useGame();
  const { colors } = useTheme();

  const isWarning = timeLeft <= 10;
  const percentage = (timeLeft / 50) * 100;

  return (
    <div
      style={{
        position: "fixed",
        top: "70px",
        right: "20px",
        zIndex: 10,
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        style={{
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(10px)",
          padding: "10px 20px",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.1)",
          minWidth: "100px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FaClock color={isWarning ? "#ff4d4d" : "inherit"} />
          <span style={{ opacity: 0.7, fontSize: "0.85rem" }}>Time</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <motion.span
            key={timeLeft}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: isWarning ? "#ff4d4d" : colors.text,
            }}
          >
            {timeLeft}s
          </motion.span>
          <div
            style={{
              width: "60px",
              height: "4px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                background: isWarning ? "#ff4d4d" : "#4caf50",
                width: `${percentage}%`,
              }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Timer;
