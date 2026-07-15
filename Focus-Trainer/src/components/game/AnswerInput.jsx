import React, { useState, useEffect, useRef } from "react";
import { useGame } from "../../context/GameContext";
import { useAnimation } from "../../hooks/useAnimation";
import { FaCheck, FaKeyboard } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const AnswerInput = () => {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const { checkAnswer, isGameStarted, restartGame, currentWord } = useGame(); // Add currentWord here
  const { triggerVibration } = useAnimation();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isGameStarted && inputRef.current) {
      inputRef.current.focus();

      inputRef.current.click();
    }
  }, [isGameStarted, currentWord]);

  const handleSubmit = () => {
    if (!answer.trim()) return;

    const isCorrect = checkAnswer(answer);

    if (isCorrect) {
      setFeedback({ type: "correct", message: "✓ Correct!" });
      setTimeout(() => setFeedback(null), 500);
    } else {
      setFeedback({ type: "wrong", message: "✗ Wrong!" });
      triggerVibration();
      setTimeout(() => setFeedback(null), 500);
    }
    setAnswer("");

    // Re-focus after submitting
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 10);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === "Escape") {
      restartGame();
    }
  };

  if (!isGameStarted) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "80px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        maxWidth: "500px",
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(10px)",
          padding: "10px",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <FaKeyboard
          style={{
            alignSelf: "center",
            marginLeft: "10px",
            opacity: 0.5,
          }}
        />

        <input
          ref={inputRef}
          type="text"
          placeholder="Type the word you saw..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value.toUpperCase())}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            flex: 1,
            padding: "12px",
            background: "rgba(255,255,255,0.05)",
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontSize: "1rem",
            outline: "none",
            letterSpacing: "2px",
            textTransform: "uppercase",
            WebkitUserSelect: "text",
            userSelect: "text",
          }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          enterKeyHint="done"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            border: "none",
            background: "#4caf50",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          <FaCheck />
        </motion.button>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: "absolute",
              top: "-40px",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "8px 16px",
              borderRadius: "8px",
              background: feedback.type === "correct" ? "#4caf50" : "#f44336",
              color: "white",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          >
            {feedback.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnswerInput;
