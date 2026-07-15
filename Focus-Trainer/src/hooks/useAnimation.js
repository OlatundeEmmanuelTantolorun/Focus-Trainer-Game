import { useState, useCallback } from "react";

export const useAnimation = () => {
  const [isVibrating, setIsVibrating] = useState(false);

  const triggerVibration = useCallback((duration = 300) => {
    setIsVibrating(true);
    setTimeout(() => {
      setIsVibrating(false);
    }, duration);
  }, []);

  return { isVibrating, triggerVibration };
};
