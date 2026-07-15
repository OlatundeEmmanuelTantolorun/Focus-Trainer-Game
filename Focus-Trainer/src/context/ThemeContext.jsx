import React, { createContext, useContext, useState, useMemo } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = useMemo(
    () => ({
      isDarkMode,
      toggleTheme,
      colors: isDarkMode
        ? {
            background: "#000000",
            text: "#ffffff",
            ballDefault: "#c9f29b",
            highlight: "#ffcc00",
            timerWarning: "#ff4d4d",
            input: "#ffffff",
            inputBackground: "rgba(255,255,255,0.1)",
            buttonBackground: "#ffffff",
            buttonText: "#000000",
          }
        : {
            background: "#ffffff",
            text: "#000000",
            ballDefault: "#c9f29b",
            highlight: "#ffcc00",
            timerWarning: "#ff4d4d",
            input: "#000000",
            inputBackground: "rgba(0,0,0,0.1)",
            buttonBackground: "#000000",
            buttonText: "#ffffff",
          },
    }),
    [isDarkMode],
  );

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
