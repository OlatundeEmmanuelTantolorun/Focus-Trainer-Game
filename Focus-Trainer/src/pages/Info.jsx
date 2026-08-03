import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTiktok,
  FaBrain,
  FaRocket,
  FaShieldAlt,
} from "react-icons/fa";
import { useGame } from "../context/GameContext";
import darkLogo from "../assets/logo-dark.png";
import lightLogo from "../assets/logo-white.png";

export default function Info() {
  const { data } = useGame();
  const isDark = data.theme === "dark";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const cardStyle = {
    background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.6)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.04)"}`,
    padding: "28px 30px",
    borderRadius: 20,
    marginBottom: 20,
    boxShadow: isDark
      ? "0 8px 32px rgba(0,0,0,0.35)"
      : "0 8px 32px rgba(0,0,0,0.06)",
    transition: "transform 0.2s, box-shadow 0.2s",
  };

  const buttonBase = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 24px",
    background: "#c9f29b",
    color: "#111",
    borderRadius: 30,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "0.95rem",
    marginRight: 10,
    marginTop: 12,
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(201, 242, 155, 0.25)",
  };

  const brandLogo = (
    <img
      src={isDark ? darkLogo : lightLogo}
      alt="Focus Trainer Logo"
      style={{
        display: "block",
        margin: "0 auto 16px",
        width: "full",
        height: 56,
        objectFit: "cover",
      }}
    />
  );

  const headingStyle = {
    fontSize: "1.4rem",
    fontWeight: 700,
    marginBottom: 12,
    color: isDark ? "#c9f29b" : "#2d5a27",
    display: "flex",
    alignItems: "center",
    gap: 10,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        height: "100vh",
        padding: "40px 20px 90px",
        background: isDark
          ? "radial-gradient(circle at 10% 20%, #1a1a1a 0%, #0d0d0d 100%)"
          : "radial-gradient(circle at 10% 20%, #f5f7fa 0%, #e9edf5 100%)",
        color: isDark ? "#f0f0f0" : "#1a1a1a",
        fontFamily: "'Inter', system-ui, sans-serif",
        overflowY: "auto",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ maxWidth: 720, margin: "0 auto" }}
      >
        <motion.div
          variants={itemVariants}
          style={{ marginBottom: 48, textAlign: "center" }}
        >
          {brandLogo}
          <h1
            style={{
              fontSize: "clamp(2.8rem, 7vw, 4rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #c9f29b, #8fcf5a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 8,
            }}
          >
            Focus Trainer
          </h1>
          <p
            style={{
              fontSize: "1.15rem",
              color: isDark ? "#aaa" : "#555",
              fontWeight: 400,
              letterSpacing: "0.3px",
            }}
          >
            Train your mind. Sharpen your focus.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} style={cardStyle}>
          <h2 style={headingStyle}>🎯 Purpose</h2>
          <p style={{ lineHeight: 1.7, fontSize: "1rem", opacity: 0.9 }}>
            Focus Trainer is a cognitive training game designed to improve
            memory, visual tracking, and concentration while remaining simple
            and enjoyable.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} style={cardStyle}>
          <h2 style={headingStyle}>🧠 Why Focus Training?</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <FaBrain
                style={{
                  fontSize: "1.6rem",
                  color: isDark ? "#c9f29b" : "#2d5a27",
                  marginTop: 2,
                  flexShrink: 0,
                }}
              />
              <div>
                <strong style={{ fontSize: "1.05rem" }}>Mental Agility</strong>
                <p
                  style={{
                    margin: "4px 0 0",
                    opacity: 0.8,
                    fontSize: "0.95rem",
                  }}
                >
                  Improves reaction time and cognitive flexibility through
                  fast‑paced word recall.
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <FaRocket
                style={{
                  fontSize: "1.6rem",
                  color: isDark ? "#c9f29b" : "#2d5a27",
                  marginTop: 2,
                  flexShrink: 0,
                }}
              />
              <div>
                <strong style={{ fontSize: "1.05rem" }}>
                  Progressive Challenge
                </strong>
                <p
                  style={{
                    margin: "4px 0 0",
                    opacity: 0.8,
                    fontSize: "0.95rem",
                  }}
                >
                  The game speeds up as you improve, keeping you in a state of
                  flow.
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <FaShieldAlt
                style={{
                  fontSize: "1.6rem",
                  color: isDark ? "#c9f29b" : "#2d5a27",
                  marginTop: 2,
                  flexShrink: 0,
                }}
              />
              <div>
                <strong style={{ fontSize: "1.05rem" }}>Focus Training</strong>
                <p
                  style={{
                    margin: "4px 0 0",
                    opacity: 0.8,
                    fontSize: "0.95rem",
                  }}
                >
                  Trains sustained attention and distraction resistance – useful
                  for work and study.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} style={cardStyle}>
          <h2 style={headingStyle}>🧩 How To Play</h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <li style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: "1.6rem" }}>👁️</span>
              <span>Watch the moving ball.</span>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: "1.6rem" }}>🧩</span>
              <span>Remember the word.</span>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: "1.6rem" }}>⌨️</span>
              <span>Type it before the timer ends.</span>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: "1.6rem" }}>⚡</span>
              <span>Every answer makes the game faster.</span>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: "1.6rem" }}>🏆</span>
              <span>Beat your high score.</span>
            </li>
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} style={cardStyle}>
          <h2 style={headingStyle}>🛠️ Technologies</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              fontSize: "0.95rem",
              opacity: 0.9,
            }}
          >
            {[
              "React",
              "React Router",
              "Framer Motion",
              "JavaScript",
              "HTML",
              "CSS",
            ].map((tech) => (
              <span
                key={tech}
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.04)",
                  padding: "6px 18px",
                  borderRadius: 30,
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"}`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} style={cardStyle}>
          <h2 style={headingStyle}>👤 Created By</h2>
          <h3
            style={{
              fontSize: "1.3rem",
              fontWeight: 600,
              margin: "6px 0 4px",
            }}
          >
            Olatunde Emmanuel Tantolorun
          </h3>
          <p style={{ opacity: 0.8, marginBottom: 16, fontSize: "0.95rem" }}>
            Building tools that sharpen the mind one project at a time.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <a
              href="https://github.com/OlatundeEmmanuelTantolorun/Focus-Trainer-Game"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...buttonBase,
                background: isDark ? "#2a2a2a" : "#e8e8e8",
                color: isDark ? "#eee" : "#111",
                boxShadow: "none",
              }}
            >
              <FaGithub /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/emmanuel-tantolorun-93244b3ab"
              style={{
                ...buttonBase,
                background: isDark ? "#2a2a2a" : "#e8e8e8",
                color: isDark ? "#eee" : "#111",
                boxShadow: "none",
              }}
            >
              <FaLinkedin /> LinkedIn
            </a>
            <a
              href="https://www.tiktok.com/@elitz_dev01?"
              style={{
                ...buttonBase,
                background: isDark ? "#2a2a2a" : "#e8e8e8",
                color: isDark ? "#eee" : "#111",
                boxShadow: "none",
              }}
            >
              <FaTiktok /> Tiktok
            </a>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          style={{
            textAlign: "center",
            marginTop: 32,
            fontSize: "0.8rem",
            color: isDark ? "#555" : "#999",
            opacity: 0.7,
            letterSpacing: "0.3px",
          }}
        >
          © {new Date().getFullYear()} Focus Trainer – v1.0.0
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
