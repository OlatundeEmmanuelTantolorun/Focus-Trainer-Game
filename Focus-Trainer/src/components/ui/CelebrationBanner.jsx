import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "../../context/GameContext";

const CelebrationBanner = () => {
  const { showBanner } = useGame();

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          style={{
            position: "fixed",
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            background:
              "linear-gradient(90deg, transparent, rgba(255, 204, 0, 0.2), transparent)",
            color: "#ffcc00",
            fontWeight: 900,
            fontSize: "2rem",
            letterSpacing: "4px",
            padding: "10px 40px",
            pointerEvents: "none",
            zIndex: 900,
            textShadow: "0 0 15px rgba(255, 204, 0, 0.6)",
            whiteSpace: "nowrap",
          }}
          initial={{ opacity: 0, scale: 0.5, y: "-50%" }}
          animate={{ opacity: 1, scale: 1, y: "-50%" }}
          exit={{ opacity: 0, scale: 0.5, y: "-50%" }}
          transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
        >
          NEW HIGH SCORE!
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CelebrationBanner;
