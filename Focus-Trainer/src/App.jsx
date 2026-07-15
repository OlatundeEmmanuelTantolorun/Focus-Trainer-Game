import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import About from "./pages/About";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
