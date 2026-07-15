import React from "react";
import { useTheme } from "../../context/ThemeContext";

const GameLayout = ({ children }) => {
  const { colors } = useTheme();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.background,
        color: colors.text,
        paddingTop: "60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};

export default GameLayout;
