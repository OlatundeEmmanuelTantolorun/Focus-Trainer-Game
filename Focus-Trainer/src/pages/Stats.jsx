import React from "react";
import { GameProvider } from "../context/GameContext";
import Navbar from "../components/layout/Navbar";
import Card from "../components/ui/Card";
import { useTheme } from "../context/ThemeContext";
import { useGame } from "../context/GameContext";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaGamepad,
  FaClock,
  FaStar,
  FaChartLine,
} from "react-icons/fa";

import { FiTarget } from "react-icons/fi";

const StatsContent = () => {
  const { colors } = useTheme();
  const { highScore } = useGame();

  const stats = {
    gamesPlayed: 42,
    highestScore: highScore,
    averageScore: 15,
    bestAccuracy: 87,
    fastestCompletion: 3.2,
    timePlayed: 126,
  };

  const statItems = [
    { icon: FaGamepad, label: "Games Played", value: stats.gamesPlayed },
    { icon: FaTrophy, label: "Highest Score", value: stats.highestScore },
    { icon: FaChartLine, label: "Average Score", value: stats.averageScore },
    { icon: FiTarget, label: "Best Accuracy", value: `${stats.bestAccuracy}%` },
    {
      icon: FaClock,
      label: "Fastest Completion",
      value: `${stats.fastestCompletion}s`,
    },
    { icon: FaStar, label: "Time Played", value: `${stats.timePlayed}m` },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        height: "auto",
        overflowY: "auto",
        background: colors.background,
        color: colors.text,
      }}
    >
      <Navbar />
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "80px 20px 40px",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: "2.5rem",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Your Stats
        </motion.h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {statItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    padding: "10px",
                  }}
                >
                  <item.icon size={32} color={colors.highlight || "#ffcc00"} />
                  <div>
                    <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ textAlign: "center", marginTop: "40px" }}
        >
          <Card>
            <p style={{ fontSize: "1.1rem", padding: "20px" }}>
              Keep playing to improve your stats! Every game makes you sharper.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

const Stats = () => {
  return (
    <GameProvider>
      <StatsContent />
    </GameProvider>
  );
};

export default Stats;
