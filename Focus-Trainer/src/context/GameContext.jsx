import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAudioPool } from "../hooks/useAudioPool";
import { useBallMovement } from "../hooks/useBallMovement";
import { useCountdown } from "../hooks/useCountdown";
import { getRandomWord } from "../utils/randomWord";
import {
  INITIAL_REVEAL_TIME,
  MIN_REVEAL_TIME,
  TIME_DECREMENT,
} from "../utils/constants";

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [revealTime, setRevealTime] = useState(INITIAL_REVEAL_TIME);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const { highScore, updateHighScore } = useLocalStorage();
  const playBounceSound = useAudioPool();
  const { position, color, shadow, increaseSpeed, resetBall, setVelocity } =
    useBallMovement(isGameStarted);

  const onTimeComplete = useCallback(() => {
    restartGame();
  }, []);

  const {
    timeLeft,
    start: startTimer,
    reset: resetTimer,
    stop: stopTimer,
  } = useCountdown(revealTime, onTimeComplete);

  const startRound = useCallback(() => {
    const word = getRandomWord();
    setCurrentWord(word);
    startTimer(revealTime);
  }, [revealTime, startTimer]);

  const checkAnswer = useCallback(
    (answer) => {
      const trimmedAnswer = answer.trim().toUpperCase();
      if (!trimmedAnswer) return false;

      if (trimmedAnswer === currentWord) {
        const newScore = score + 1;
        setScore(newScore);

        if (newScore > highScore) {
          updateHighScore(newScore);
          if (!isCelebrating) {
            setIsCelebrating(true);
            setShowBanner(true);
            setTimeout(() => {
              setShowBanner(false);
              setIsCelebrating(false);
            }, 2000);
          }
        }

        increaseSpeed();
        const newRevealTime = Math.max(
          MIN_REVEAL_TIME,
          revealTime - TIME_DECREMENT,
        );
        setRevealTime(newRevealTime);
        startRound();
        return true;
      } else {
        return false;
      }
    },
    [
      currentWord,
      score,
      highScore,
      updateHighScore,
      isCelebrating,
      increaseSpeed,
      revealTime,
      startRound,
    ],
  );

  const startGame = useCallback(() => {
    setIsGameStarted(true);
    setScore(0);
    setRevealTime(INITIAL_REVEAL_TIME);
    setVelocity({ vx: 4, vy: 4 });
    resetBall();
    startRound();
  }, [resetBall, startRound, setVelocity]);

  const restartGame = useCallback(() => {
    setIsGameStarted(false);
    setScore(0);
    setCurrentWord("");
    setRevealTime(INITIAL_REVEAL_TIME);
    resetBall();
    resetTimer(INITIAL_REVEAL_TIME);
    stopTimer();
    setIsCelebrating(false);
    setShowBanner(false);
  }, [resetBall, resetTimer, stopTimer]);

  const contextValue = useMemo(
    () => ({
      // Game state
      score,
      highScore,
      currentWord,
      timeLeft,
      isGameStarted,
      revealTime,
      position,
      color,
      shadow,
      isCelebrating,
      showBanner,
      // Game actions
      startGame,
      restartGame,
      checkAnswer,
      startRound,
      playBounceSound,
    }),
    [
      score,
      highScore,
      currentWord,
      timeLeft,
      isGameStarted,
      revealTime,
      position,
      color,
      shadow,
      isCelebrating,
      showBanner,
      startGame,
      restartGame,
      checkAnswer,
      startRound,
      playBounceSound,
    ],
  );

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};
