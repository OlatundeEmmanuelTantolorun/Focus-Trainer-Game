const STORAGE_KEY = "focusTrainer";

const DEFAULT_DATA = {
  highScore: 0,
  gamesPlayed: 0,
  totalScore: 0,

  totalAttempts: 0,
  correctAnswers: 0,
  bestAccuracy: 0,

  fastestAnswer: 0,
  totalCompletionTime: 0,
  bestWPM: 0,

  longestWordAnswered: 0,

  timePlayed: 0,

  currentStreak: 0,
  bestStreak: 0,

  lastPlayed: null,

  sound: true,
  theme: "dark",
  showBanner: false,
};

export function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return { ...DEFAULT_DATA };
    }

    const parsed = JSON.parse(saved);

    const merged = {
      ...DEFAULT_DATA,
      ...parsed,
    };

    if (
      parsed.fastestCompletion !== undefined &&
      parsed.fastestAnswer === undefined
    ) {
      merged.fastestAnswer = parsed.fastestCompletion;
    }

    return merged;
  } catch (error) {
    console.error("Failed to load game data:", error);
    return { ...DEFAULT_DATA };
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save game data:", error);
  }
}

export function resetData() {
  localStorage.removeItem(STORAGE_KEY);
  return { ...DEFAULT_DATA };
}
