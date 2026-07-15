import React from "react";
import { GameProvider } from "../context/GameContext";
import GameLayout from "../components/layout/GameLayout";
import Arena from "../components/game/Arena";
import ScoreBoard from "../components/game/ScoreBoard";
import Timer from "../components/game/Timer";
import AnswerInput from "../components/game/AnswerInput";
import Controls from "../components/game/Controls";
import Celebration from "../components/game/Celebration";
import StartScreen from "../components/ui/StartScreen";
import Navbar from "../components/layout/Navbar";

const HomeContent = () => {
  return (
    <div className="home-page">
      <Navbar />
      <GameLayout>
        <ScoreBoard />
        <Timer />
        <Arena />
        <AnswerInput />
        <Controls />
        <Celebration />
        <StartScreen />
      </GameLayout>
    </div>
  );
};

const Home = () => {
  return (
    <GameProvider>
      <HomeContent />
    </GameProvider>
  );
};

export default Home;
