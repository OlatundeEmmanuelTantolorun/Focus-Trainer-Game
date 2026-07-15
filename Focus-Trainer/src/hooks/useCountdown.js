import { useState, useEffect, useCallback } from "react";

export const useCountdown = (initialTime, onComplete) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onComplete]);

  const start = useCallback(
    (newTime = initialTime) => {
      setTimeLeft(newTime);
      setIsRunning(true);
    },
    [initialTime],
  );

  const reset = useCallback(
    (newTime = initialTime) => {
      setTimeLeft(newTime);
      setIsRunning(false);
    },
    [initialTime],
  );

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  return { timeLeft, start, reset, stop, isRunning };
};
