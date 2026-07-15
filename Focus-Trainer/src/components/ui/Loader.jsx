import React from "react";
import { motion } from "framer-motion";

const Loader = ({ size = 40, color = "#4caf50" }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <motion.div
        style={{
          width: size,
          height: size,
          border: `3px solid rgba(255,255,255,0.1)`,
          borderTop: `3px solid ${color}`,
          borderRadius: "50%",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default Loader;
