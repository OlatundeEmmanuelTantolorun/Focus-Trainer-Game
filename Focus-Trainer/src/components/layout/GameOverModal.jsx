import React from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { useGame } from "../../context/GameContext";
import { FaTrophy, FaRedo, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GameOverModal = ({ isOpen, onClose }) => {
  const { score, highScore, restartGame } = useGame();
  const navigate = useNavigate();

  const isNewRecord = score >= highScore && score > 0;

  const handleRestart = () => {
    restartGame();
    onClose();
  };

  const handleHome = () => {
    restartGame();
    onClose();
    navigate("/");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Game Over">
      <div style={{ textAlign: "center", padding: "20px" }}>
        {isNewRecord && (
          <div
            style={{
              fontSize: "3rem",
              marginBottom: "10px",
              animation: "bounce 1s infinite",
            }}
          >
            🏆
          </div>
        )}

        <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>
          {isNewRecord ? "New Record!" : "Time's Up!"}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            margin: "30px 0",
          }}
        >
          <div>
            <div style={{ fontSize: "0.9rem", opacity: 0.6 }}>Score</div>
            <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{score}</div>
          </div>
          <div>
            <div style={{ fontSize: "0.9rem", opacity: 0.6 }}>High Score</div>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: isNewRecord ? "#ffcc00" : "inherit",
              }}
            >
              {highScore}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <Button onClick={handleRestart}>
            <FaRedo /> Play Again
          </Button>
          <Button onClick={handleHome} variant="secondary">
            <FaHome /> Home
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default GameOverModal;
