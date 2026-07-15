import { WORDS } from "../data/words";

export const getRandomWord = () => {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
};
