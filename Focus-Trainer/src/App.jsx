import { Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import { useGame } from "../src/context/GameContext";

import Home from "../src/pages/Home";
import Stats from "../src/pages/Stats";
import Info from "../src/pages/Info";
import Settings from "../src/pages/Settings";

export default function App() {
  const { data } = useGame();
  const isDark = data.theme === "dark";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: isDark ? "#111" : "#f8f8f8",
        color: isDark ? "white" : "#111",
        paddingTop: 70,
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/info" element={<Info />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}
