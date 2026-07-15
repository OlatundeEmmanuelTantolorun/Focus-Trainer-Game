import React from "react";
import GameBall from "./GameBall";
import { useGame } from "../../context/GameContext";
import { useAnimation } from "../../hooks/useAnimation";

const Arena = () => {
  const { isGameStarted } = useGame();
  const { isVibrating } = useAnimation();

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "calc(100vh - 200px)",
        minHeight: "400px",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)",
      }}
    >
      {isGameStarted && <GameBall isVibrating={isVibrating} />}
    </div>
  );
};

export default Arena;
