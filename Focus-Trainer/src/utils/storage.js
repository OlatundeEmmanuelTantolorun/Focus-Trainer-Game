import { HIGH_SCORE_KEY } from "./constants";

export const getHighScore = () => {
  const stored = localStorage.getItem(HIGH_SCORE_KEY);
  return stored ? parseInt(stored) : 0;
};

export const setHighScore = (score) => {
  localStorage.setItem(HIGH_SCORE_KEY, score.toString());
};
