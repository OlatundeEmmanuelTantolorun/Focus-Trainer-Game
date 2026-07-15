import React from "react";
import { useGame } from "../../context/GameContext";
import { useTheme } from "../../context/ThemeContext";

const TimerDisplay = () => {
  const { timeLeft } = useGame();
  const { colors } = useTheme();

  const isWarning = timeLeft <= 10;

  return (
    <div
      style={{
        position: "fixed",
        top: "15px",
        right: "15px",
        fontSize: "1rem",
      }}
    >
      Time:{" "}
      <span style={{ color: isWarning ? colors.timerWarning : colors.text }}>
        {timeLeft}
      </span>
      s
    </div>
  );
};

export default TimerDisplay;
