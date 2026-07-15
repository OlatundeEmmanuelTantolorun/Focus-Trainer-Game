import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { FaHome, FaChartBar, FaInfoCircle, FaCog } from "react-icons/fa";
import { motion } from "framer-motion";
import SettingsModal from "./SettingsModal";
import IconButton from "../ui/IconButton";

const Navbar = () => {
  const { colors, isDarkMode } = useTheme();
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const navItems = [
    { path: "/", icon: FaHome, label: "Home" },
    { path: "/stats", icon: FaChartBar, label: "Stats" },
    { path: "/about", icon: FaInfoCircle, label: "About" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "60px",
          background: isDarkMode
            ? "rgba(0, 0, 0, 0.8)"
            : "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          borderBottom: isDarkMode
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          zIndex: 100,
          color: colors.text,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              color: colors.text,
            }}
          >
            🎯 Focus Trainer
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                textDecoration: "none",
                color: isActive(item.path) ? "#ffcc00" : colors.text,
                padding: "8px 12px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s",
                background: isActive(item.path)
                  ? isDarkMode
                    ? "rgba(255,204,0,0.1)"
                    : "rgba(255,204,0,0.15)"
                  : "transparent",
                fontSize: "0.9rem",
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.background = isDarkMode
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <item.icon size={18} />
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}

          <IconButton
            icon={FaCog}
            onClick={() => setIsSettingsOpen(true)}
            label="Settings"
            variant="ghost"
            style={{
              color: colors.text,
            }}
          />
        </div>
      </motion.nav>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};

export default Navbar;
