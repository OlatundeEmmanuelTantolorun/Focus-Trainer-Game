import { useRef, useCallback } from "react";
import { POOL_SIZE, BOUNCE_MIN_INTERVAL } from "../utils/constants";

export const useAudioPool = () => {
  const bounceSoundsRef = useRef([]);
  const soundIndexRef = useRef(0);
  const lastSoundTimeRef = useRef(0);
  const isInitializedRef = useRef(false);

  // Initialize audio pool
  if (!isInitializedRef.current) {
    try {
      for (let i = 0; i < POOL_SIZE; i++) {
        const sound = new Audio("/pingPong.mp3");
        sound.volume = 0.25;
        sound.preload = "auto";
        // Add error handling for each sound
        sound.addEventListener("error", (e) => {
          console.warn("Sound failed to load:", e);
        });
        bounceSoundsRef.current.push(sound);
      }
      isInitializedRef.current = true;
      console.log("Audio pool initialized with", POOL_SIZE, "sounds");
    } catch (error) {
      console.error("Failed to initialize audio pool:", error);
    }
  }

  const playBounceSound = useCallback((vx, vy) => {
    try {
      const now = performance.now();
      if (now - lastSoundTimeRef.current < BOUNCE_MIN_INTERVAL) return;
      lastSoundTimeRef.current = now;

      const sound = bounceSoundsRef.current[soundIndexRef.current];
      if (!sound) {
        console.warn("No sound available");
        return;
      }

      soundIndexRef.current = (soundIndexRef.current + 1) % POOL_SIZE;

      // Reset and play
      sound.currentTime = 0;
      const speed = Math.abs(vx) + Math.abs(vy);
      sound.playbackRate = Math.min(2, speed / 10);

      // Play with error handling
      const playPromise = sound.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Auto-play was prevented or sound failed
          console.debug("Sound play prevented:", error);
        });
      }
    } catch (error) {
      console.debug("Sound playback error:", error);
    }
  }, []);

  return playBounceSound;
};
