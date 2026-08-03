import { motion } from "framer-motion";
import { useGame } from "../context/GameContext";
import {
  FaMoon,
  FaSun,
  FaVolumeUp,
  FaVolumeMute,
  FaTrash,
  FaInfoCircle,
} from "react-icons/fa";

export default function Settings() {
  const { data, update, resetAll } = useGame();
  const isDark = data.theme === "dark";

  const pageStyle = {
    minHeight: "100vh",
    padding: "24px 20px 90px",
    background: isDark
      ? "radial-gradient(circle at 20% 30%, #1a1a1a 0%, #0d0d0d 100%)"
      : "radial-gradient(circle at 20% 30%, #f0f2f5 0%, #e0e5ed 100%)",
    color: isDark ? "#f0f0f0" : "#1a1a1a",
    overflowY: "auto",
    fontFamily: "'Inter', system-ui, sans-serif",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
    paddingBottom: 16,
    borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
  };

  const titleStyle = {
    fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    background: "linear-gradient(135deg, #c9f29b, #8fcf5a)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: 0,
  };

  const cardStyle = {
    background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.5)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)"}`,
    padding: "20px 24px",
    borderRadius: 16,
    marginBottom: 16,
    boxShadow: isDark
      ? "0 8px 24px rgba(0,0,0,0.3)"
      : "0 8px 24px rgba(0,0,0,0.06)",
    transition: "0.2s",
  };

  const settingRow = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  };

  const settingLabel = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontSize: "1rem",
    fontWeight: 500,
  };

  const iconStyle = {
    fontSize: "1.2rem",
    color: isDark ? "#c9f29b" : "#3a7a2a",
  };

  const buttonStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: 30,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.9rem",
    transition: "0.15s",
    background: isDark ? "#333" : "#e0e0e0",
    color: isDark ? "#fff" : "#111",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  };

  const dangerButton = {
    ...buttonStyle,
    background: "#ff6363",
    color: "#fff",
    boxShadow: "0 4px 12px rgba(255, 99, 99, 0.25)",
  };

  const versionStyle = {
    textAlign: "center",
    fontSize: "0.8rem",
    color: isDark ? "#666" : "#999",
    marginTop: 24,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={pageStyle}
    >
      <div style={headerStyle}>
        <h1 style={titleStyle}>Settings</h1>
        <FaInfoCircle style={{ fontSize: "1.4rem", opacity: 0.5 }} />
      </div>

    
      <div style={cardStyle}>
        <div style={settingRow}>
          <span style={settingLabel}>
            {isDark ? (
              <FaMoon style={iconStyle} />
            ) : (
              <FaSun style={iconStyle} />
            )}
            Theme
          </span>
          <button
            style={buttonStyle}
            onClick={() => update({ theme: isDark ? "light" : "dark" })}
          >
            {isDark ? "Switch to Light" : "Switch to Dark"}
          </button>
        </div>
      </div>

     
      <div style={cardStyle}>
        <div style={settingRow}>
          <span style={settingLabel}>
            {data.sound ? (
              <FaVolumeUp style={iconStyle} />
            ) : (
              <FaVolumeMute style={iconStyle} />
            )}
            Sound
          </span>
          <button
            style={buttonStyle}
            onClick={() => update({ sound: !data.sound })}
          >
            {data.sound ? "Turn Off" : "Turn On"}
          </button>
        </div>
      </div>

     
      <div style={cardStyle}>
        <div style={settingRow}>
          <span style={settingLabel}>
            <FaTrash style={{ ...iconStyle, color: "#ff6363" }} />
            Reset Progress
          </span>
          <button
            style={dangerButton}
            onClick={() => {
              if (
                window.confirm("Are you sure? This will delete all your stats.")
              ) {
                resetAll();
              }
            }}
          >
            Reset Everything
          </button>
        </div>
      </div>

      
      <div style={versionStyle}>Version 1.0.0</div>
    </motion.div>
  );
}
