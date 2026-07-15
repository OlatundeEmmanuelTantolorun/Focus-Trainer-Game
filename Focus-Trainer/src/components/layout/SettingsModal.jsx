import React, { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Toggle from "../ui/Toggle";
import { useTheme } from "../../context/ThemeContext";
import { useGame } from "../../context/GameContext";
import {
  FaMoon,
  FaSun,
  FaVolumeUp,
  FaVolumeMute,
  FaTrash,
} from "react-icons/fa";

const SettingsModal = ({ isOpen, onClose }) => {
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const { restartGame } = useGame();
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset all progress?")) {
      localStorage.removeItem("focus_high_score");
      restartGame();
      onClose();
    }
  };

  const settings = [
    {
      icon: isDarkMode ? FaMoon : FaSun,
      label: "Theme",
      description: isDarkMode ? "Dark Mode" : "Light Mode",
      action: toggleTheme,
      isToggled: isDarkMode,
    },
    {
      icon: isSoundEnabled ? FaVolumeUp : FaVolumeMute,
      label: "Sound",
      description: isSoundEnabled ? "On" : "Off",
      action: () => setIsSoundEnabled(!isSoundEnabled),
      isToggled: isSoundEnabled,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings">
      <div style={{ padding: "20px" }}>
        {settings.map((setting, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "15px 0",
              borderBottom:
                index < settings.length - 1
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <setting.icon size={20} color={colors.highlight || "#ffcc00"} />
              <div>
                <div style={{ fontWeight: "500" }}>{setting.label}</div>
                <div style={{ fontSize: "0.85rem", opacity: 0.6 }}>
                  {setting.description}
                </div>
              </div>
            </div>
            <Toggle
              isOn={setting.isToggled}
              onToggle={setting.action}
              disabled={setting.disabled}
            />
          </div>
        ))}

        <div style={{ marginTop: "30px" }}>
          <Button
            onClick={handleResetProgress}
            variant="danger"
            fullWidth
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <FaTrash /> Reset All Progress
          </Button>
        </div>

        <div
          style={{
            marginTop: "15px",
            textAlign: "center",
            opacity: 0.5,
            fontSize: "0.8rem",
          }}
        >
          Version 1.0.0
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
