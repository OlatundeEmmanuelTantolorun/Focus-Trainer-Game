import React from "react";
import { GameProvider } from "../context/GameContext";
import { ThemeProvider } from "../context/ThemeContext";
import Ball from "../components/ui/Ball";
import ScoreDisplay from "../components/ui/ScoreDisplay";
import TimerDisplay from "../components/ui/TimerDisplay";
import CelebrationBanner from "../components/ui/CelebrationBanner";
import StartScreen from "../components/ui/StartScreen";
import InputControls from "../components/ui/InputControls";
import { useAnimation } from "../hooks/useAnimation";

const HomeContent = () => {
  const { isVibrating } = useAnimation();

  return (
    <>
      <ScoreDisplay />
      <TimerDisplay />
      <CelebrationBanner />
      <Ball isVibrating={isVibrating} />
      <InputControls />
      <StartScreen />
    </>
  );
};

const Home = () => {
  return (
    <ThemeProvider>
      <GameProvider>
        <HomeContent />
      </GameProvider>
    </ThemeProvider>
  );
};

export default Home;
