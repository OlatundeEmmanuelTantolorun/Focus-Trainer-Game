import { useRef, useCallback } from "react";
import { POOL_SIZE, BOUNCE_MIN_INTERVAL } from "../utils/constants";

export const useAudioPool = () => {
  const bounceSoundsRef = useRef([]);
  const soundIndexRef = useRef(0);
  const lastSoundTimeRef = useRef(0);

  // Initialize audio pool
  if (bounceSoundsRef.current.length === 0) {
    for (let i = 0; i < POOL_SIZE; i++) {
      const sound = new Audio("/pingPong.mp3");
      sound.volume = 0.25;
      bounceSoundsRef.current.push(sound);
    }
  }

  const playBounceSound = useCallback((vx, vy) => {
    const now = performance.now();
    if (now - lastSoundTimeRef.current < BOUNCE_MIN_INTERVAL) return;
    lastSoundTimeRef.current = now;

    const sound = bounceSoundsRef.current[soundIndexRef.current];
    soundIndexRef.current = (soundIndexRef.current + 1) % POOL_SIZE;

    sound.currentTime = 0;
    const speed = Math.abs(vx) + Math.abs(vy);
    sound.playbackRate = Math.min(2, speed / 10);
    sound.play();
  }, []);

  return playBounceSound;
};
