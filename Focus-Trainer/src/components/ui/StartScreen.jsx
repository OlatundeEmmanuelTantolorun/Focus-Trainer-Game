import React from "react";
import { motion } from "framer-motion";
import { useGame } from "../../context/GameContext";
import Button from "./Button";

const StartScreen = () => {
  const { isGameStarted, startGame } = useGame();

  if (isGameStarted) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
        backdropFilter: "blur(10px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        style={{
          width: "320px",
          padding: "40px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(217,255,156,0.2), rgba(159,220,110,0.1))",
          border: "2px solid rgba(217,255,156,0.3)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{ fontSize: "4rem", marginBottom: "10px" }}
        >
          🎯
        </motion.div>

        <h1
          style={{
            fontSize: "2rem",
            marginBottom: "0.5rem",
            background: "linear-gradient(135deg, #d9ff9c, #9fdc6e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          FOCUS TRAINER
        </h1>

        <p
          style={{
            fontSize: "0.9rem",
            marginBottom: "1.5rem",
            lineHeight: "1.6",
            opacity: 0.8,
            maxWidth: "280px",
          }}
        >
          A moving signal. A vanishing word.
          <br />
          Track the motion. Hold the meaning.
          <br />
          As speed rises and time thins, only focus carries you forward.
        </p>

        <Button
          onClick={startGame}
          size="lg"
          style={{
            background: "linear-gradient(135deg, #d9ff9c, #9fdc6e)",
            color: "#111",
            fontWeight: "bold",
            fontSize: "1.1rem",
            padding: "12px 40px",
          }}
        >
          START
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default StartScreen;
