import React from "react";
import { motion } from "framer-motion";

const Toggle = ({ isOn, onToggle, disabled = false }) => {
  return (
    <motion.div
      style={{
        width: "48px",
        height: "28px",
        background: isOn ? "#4caf50" : "rgba(255,255,255,0.2)",
        borderRadius: "14px",
        cursor: disabled ? "not-allowed" : "pointer",
        position: "relative",
        transition: "background 0.2s",
        opacity: disabled ? 0.5 : 1,
      }}
      onClick={() => !disabled && onToggle()}
    >
      <motion.div
        style={{
          width: "22px",
          height: "22px",
          background: "white",
          borderRadius: "50%",
          position: "absolute",
          top: "3px",
          left: "3px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
        animate={{
          x: isOn ? 20 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </motion.div>
  );
};

export default Toggle;
