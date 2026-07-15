import React, { useState, useRef, useEffect } from "react";
import { useGame } from "../../context/GameContext";
import { useAnimation } from "../../hooks/useAnimation";

const InputControls = () => {
  const [answer, setAnswer] = useState("");
  const { checkAnswer, isGameStarted, restartGame } = useGame();
  const { triggerVibration } = useAnimation();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isGameStarted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isGameStarted]);

  const handleCheck = () => {
    if (!answer.trim()) return;
    const isCorrect = checkAnswer(answer);
    if (!isCorrect) {
      triggerVibration();
    }
    setAnswer("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCheck();
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
        bottom: "20px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        padding: "0 20px",
      }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="What did you see?"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "none",
          outline: "none",
          flex: 1,
          maxWidth: "300px",
          minWidth: "150px",
        }}
      />
      <button
        onClick={handleCheck}
        style={{
          padding: "10px 16px",
          borderRadius: "999px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Check
      </button>
    </div>
  );
};

export default InputControls;
