import { useState, useEffect } from "react";
import {
  getHighScore,
  setHighScore as setStorageHighScore,
} from "../utils/storage";

export const useLocalStorage = () => {
  const [highScore, setHighScoreState] = useState(0);

  useEffect(() => {
    setHighScoreState(getHighScore());
  }, []);

  const updateHighScore = (newScore) => {
    setHighScoreState(newScore);
    setStorageHighScore(newScore);
  };

  return { highScore, updateHighScore };
};
