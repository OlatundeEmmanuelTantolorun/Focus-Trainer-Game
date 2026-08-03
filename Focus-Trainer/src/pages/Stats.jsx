import { motion } from "framer-motion";
import { useGame } from "../context/GameContext";
import {
  FaGamepad,
  FaTrophy,
  FaChartLine,
  FaBullseye,
  FaClock,
  FaHourglassHalf,
  FaFire,
  FaKeyboard,
  FaRegCalendarCheck,
  FaFont,
} from "react-icons/fa";

export default function Stats() {
  const { data } = useGame();
  const isDark = data.theme === "dark";

  const average =
    data.gamesPlayed === 0
      ? 0
      : (data.totalScore / data.gamesPlayed).toFixed(1);

  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    if (h === 0 && m === 0) return `${s}s`;
    if (h === 0) return `${m}m ${s}s`;
    return `${h}h ${m}m`;
  }

  function formatLastPlayed(iso) {
    if (!iso) return "Never";
    const date = new Date(iso);
    const now = new Date();

    if (date.toDateString() === now.toDateString()) {
      return `Today, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  }

  const pageStyle = {
    height: "100vh",
    padding: "24px 20px 90px",
    background: isDark
      ? "radial-gradient(circle at 20% 30%, #1a1a1a 0%, #0d0d0d 100%)"
      : "radial-gradient(circle at 20% 30%, #f0f2f5 0%, #e0e5ed 100%)",
    color: isDark ? "#f0f0f0" : "#1a1a1a",
    overflowY: "auto",
    fontFamily: "'Inter', system-ui, sans-serif",
  };

  const headerStyle = {
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

  const subtitleStyle = {
    fontSize: "0.9rem",
    color: isDark ? "#888" : "#666",
    fontWeight: 400,
    marginTop: 4,
  };

  const sectionLabelStyle = {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "1.6px",
    fontWeight: 700,
    color: isDark ? "#7d8177" : "#8a8f80",
    margin: "0 0 10px 2px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 14,
    marginBottom: 26,
  };

  const heroGridStyle = {
    ...gridStyle,
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  };

  const cardStyle = {
    background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.5)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)"}`,
    padding: "18px 14px",
    borderRadius: 16,
    textAlign: "center",
    boxShadow: isDark
      ? "0 8px 24px rgba(0,0,0,0.3)"
      : "0 8px 24px rgba(0,0,0,0.06)",
  };

  const iconStyle = {
    fontSize: "1.6rem",
    marginBottom: 6,
    color: isDark ? "#c9f29b" : "#3a7a2a",
    opacity: 0.85,
  };

  const labelStyle = {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    color: isDark ? "#aaa" : "#777",
    fontWeight: 600,
    marginBottom: 4,
  };

  const valueStyle = {
    fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
    fontWeight: 600,
    fontFamily: "'JetBrains Mono', 'Menlo', monospace",
    letterSpacing: "-0.5px",
    lineHeight: 1.2,
    color: isDark ? "#fff" : "#111",
  };

  const smallValueStyle = {
    ...valueStyle,
    fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
  };

  const highlightValue = {
    ...valueStyle,
    color: "#c9f29b",
  };

  const footerStyle = {
    textAlign: "center",
    marginTop: 6,
    color: isDark ? "#666" : "#999",
    fontSize: "0.85rem",
    fontWeight: 500,
  };

  const streakActive = data.currentStreak > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={pageStyle}
    >
      <div style={headerStyle}>
        <h1 style={titleStyle}>Your Stats</h1>
        <p style={subtitleStyle}>Track your focus journey</p>
      </div>

      <div style={heroGridStyle}>
        <div style={cardStyle}>
          <div style={iconStyle}>
            <FaGamepad />
          </div>
          <div style={labelStyle}>Games Played</div>
          <div style={valueStyle}>{data.gamesPlayed}</div>
        </div>
        <div style={cardStyle}>
          <div style={iconStyle}>
            <FaTrophy />
          </div>
          <div style={labelStyle}>Highest Score</div>
          <div style={highlightValue}>{data.highScore}</div>
        </div>
      </div>

      <p style={sectionLabelStyle}>Performance</p>
      <div style={gridStyle}>
        <div style={cardStyle}>
          <div style={iconStyle}>
            <FaChartLine />
          </div>
          <div style={labelStyle}>Average Score</div>
          <div style={smallValueStyle}>{average}</div>
        </div>
        <div style={cardStyle}>
          <div style={iconStyle}>
            <FaBullseye />
          </div>
          <div style={labelStyle}>Best Accuracy</div>
          <div style={smallValueStyle}>{data.bestAccuracy}%</div>
        </div>
        <div style={cardStyle}>
          <div style={iconStyle}>
            <FaFont />
          </div>
          <div style={labelStyle}>Longest Word</div>
          <div style={smallValueStyle}>
            {data.longestWordAnswered ? `${data.longestWordAnswered}` : "—"}
          </div>
        </div>
      </div>

      <p style={sectionLabelStyle}>Speed</p>
      <div style={gridStyle}>
        <div style={cardStyle}>
          <div style={iconStyle}>
            <FaClock />
          </div>
          <div style={labelStyle}>Fastest Answer</div>
          <div style={smallValueStyle}>
            {data.fastestAnswer === 0 ? "—" : `${data.fastestAnswer}s`}
          </div>
        </div>
        <div style={cardStyle}>
          <div style={iconStyle}>
            <FaKeyboard />
          </div>
          <div style={labelStyle}>Best WPM</div>
          <div style={smallValueStyle}>{data.bestWPM ? data.bestWPM : "—"}</div>
        </div>
      </div>

      <p style={sectionLabelStyle}>Streaks</p>
      <div style={gridStyle}>
        <div style={cardStyle}>
          <div
            style={{
              ...iconStyle,
              color: streakActive ? "#ff9f43" : iconStyle.color,
              opacity: streakActive ? 1 : 0.5,
            }}
          >
            <FaFire />
          </div>
          <div style={labelStyle}>Current Streak</div>
          <div style={smallValueStyle}>{data.currentStreak || 0}</div>
        </div>
        <div style={cardStyle}>
          <div style={iconStyle}>
            <FaFire />
          </div>
          <div style={labelStyle}>Best Streak</div>
          <div style={smallValueStyle}>{data.bestStreak || 0}</div>
        </div>
      </div>

      <p style={sectionLabelStyle}>Activity</p>
      <div style={gridStyle}>
        <div style={cardStyle}>
          <div style={iconStyle}>
            <FaHourglassHalf />
          </div>
          <div style={labelStyle}>Time Played</div>
          <div style={smallValueStyle}>{formatTime(data.timePlayed)}</div>
        </div>
        <div style={cardStyle}>
          <div style={iconStyle}>
            <FaRegCalendarCheck />
          </div>
          <div style={labelStyle}>Last Played</div>
          <div
            style={{
              ...smallValueStyle,
              fontSize: "clamp(0.95rem, 2.4vw, 1.15rem)",
            }}
          >
            {formatLastPlayed(data.lastPlayed)}
          </div>
        </div>
      </div>

      <p style={footerStyle}>Keep playing to improve your focus. 🎯</p>
    </motion.div>
  );
}
