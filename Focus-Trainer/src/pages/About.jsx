import React from "react";
import { GameProvider } from "../context/GameContext";
import Navbar from "../components/layout/Navbar";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import {
  FaReact,
  FaGithub,
  FaBrain,
  FaEye,
  FaRocket,
  FaCss3Alt,
  FaJsSquare,
  FaUser,
  FaCode,
  FaHeart,
} from "react-icons/fa";
import { SiTailwindcss, SiFramer } from "react-icons/si";

const AboutContent = () => {
  const { colors, isDarkMode } = useTheme();

  const technologies = [
    { icon: FaReact, name: "React", color: "#61dafb" },
    { icon: SiTailwindcss, name: "Tailwind", color: "#38b2ac" },
    { icon: SiFramer, name: "Framer Motion", color: "#bb2bff" },
    { icon: FaJsSquare, name: "JavaScript", color: "#f7df1e" },
    { icon: FaCss3Alt, name: "CSS3", color: "#2965f1" },
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
          maxWidth: "900px",
          margin: "0 auto",
          padding: "80px 20px 40px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Focus Trainer
          </h1>
          <p style={{ fontSize: "1.2rem", opacity: 0.8 }}>
            Train your mind. Sharpen your focus.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div style={{ padding: "20px" }}>
              <h2
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "1rem",
                }}
              >
                <FaEye /> Purpose
              </h2>
              <p style={{ lineHeight: "1.8", marginBottom: "1.5rem" }}>
                Focus Trainer is a cognitive training game designed to improve
                your visual attention, memory, and reaction time. By tracking a
                moving ball and remembering words that appear, you exercise
                multiple cognitive functions simultaneously.
              </p>

              <h2
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "1rem",
                }}
              >
                <FaBrain /> How to Play
              </h2>
              <ol
                style={{
                  lineHeight: "2",
                  paddingLeft: "20px",
                  marginBottom: "1.5rem",
                }}
              >
                <li>A word appears on the moving ball</li>
                <li>Remember the word as the ball bounces</li>
                <li>Type the word before time runs out</li>
                <li>Each correct answer increases speed and reduces time</li>
                <li>Track your progress and beat your high score!</li>
              </ol>

              <h2
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "1rem",
                }}
              >
                <FaRocket /> Technologies
              </h2>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "15px",
                  marginBottom: "2rem",
                }}
              >
                {technologies.map((tech) => (
                  <div
                    key={tech.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 16px",
                      background: isDarkMode
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.05)",
                      borderRadius: "20px",
                      border: isDarkMode
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "1px solid rgba(0,0,0,0.1)",
                    }}
                  >
                    <tech.icon size={20} color={tech.color} />
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>

              {/* Creator Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  marginTop: "2rem",
                  marginBottom: "2rem",
                  padding: "20px",
                  borderRadius: "16px",
                  background: isDarkMode
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(0,0,0,0.03)",
                  border: isDarkMode
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid rgba(0,0,0,0.08)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    marginBottom: "8px",
                  }}
                >
                  <FaUser size={24} color={colors.highlight || "#ffcc00"} />
                  <h3
                    style={{
                      fontSize: "1.3rem",
                      margin: 0,
                      color: colors.text,
                    }}
                  >
                    Created by
                  </h3>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      background: "linear-gradient(135deg, #ffcc00, #ff8800)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Olatunde Emmanuel Tantolorun
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "0.9rem",
                      opacity: 0.7,
                    }}
                  >
                    <FaCode size={14} /> Developer
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "0.9rem",
                      opacity: 0.7,
                    }}
                  >
                    <FaHeart size={14} color="#ff6b6b" /> Maker
                  </span>
                </div>
                <p
                  style={{
                    marginTop: "8px",
                    fontSize: "0.9rem",
                    opacity: 0.6,
                    fontStyle: "italic",
                  }}
                >
                  Building tools that sharpen the mind, one game at a time.
                </p>
              </motion.div>

              <div style={{ textAlign: "center" }}>
                <Button
                  onClick={() =>
                    window.open(
                      "https://github.com/OlatundeEmmanuelTantolorun/Focus-Trainer-Game.git",
                      "_blank",
                    )
                  }
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 30px",
                  }}
                >
                  <FaGithub /> View on GitHub
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <GameProvider>
      <AboutContent />
    </GameProvider>
  );
};

export default About;
