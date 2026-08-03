import React, { useEffect, useRef, useState } from "react";
import { useGame } from "../context/GameContext";

const WORDS = [
  "FOCUS",
  "VISION",
  "CLARITY",
  "REACT",
  "TRACK",
  "SPEED",
  "ALERT",
  "FLOW",
  "PRECISION",
  "MEMORY",
  "AWARE",
  "SHARP",
  "CALM",
  "STEADY",
  "CONTROL",
  "REFLEX",
  "TARGET",
  "SIGNAL",
  "BALANCE",
  "INTENT",
  "ENERGY",
  "TIMING",
  "RHYTHM",
  "PATTERN",
  "STABLE",
  "DIRECT",
  "INSIGHT",
  "ACTIVE",
  "ENGAGE",
  "OBSERVE",
  "FILTER",
  "PROCESS",
  "ADAPT",
  "FORESIGHT",
  "RESPONSE",
  "FOCUSSED",
  "ATTENTIVE",
  "TRACKING",
  "DECISION",
  "ACCURACY",
];

export default function Ball({
  onWordChange,
  onTimeUp,
  onBounce,
  isGameActive,
  revealTime,
  setRevealTime,
  onCorrect,
  onWrong,
  restartTrigger,
}) {
  const ballRef = useRef(null);
  const animationRef = useRef(null);
  const [currentWord, setCurrentWord] = useState("READY?");
  const [x, setX] = useState(100);
  const [y, setY] = useState(100);
  const [vx, setVx] = useState(4);
  const [vy, setVy] = useState(4);
  const [timeLeft, setTimeLeft] = useState(revealTime);
  const [isVibrating, setIsVibrating] = useState(false);
  const [color, setColor] = useState("#c9f29b");

  const { soundEnabled } = useGame();
  const soundPool = useRef([]);
  const soundIndex = useRef(0);
  const lastSoundTime = useRef(0);

  useEffect(() => {
    for (let i = 0; i < 6; i++) {
      const s = new Audio("/pingPong.mp3");
      s.volume = 0.25;
      soundPool.current.push(s);
    }
  }, []);

  const playBounceSound = () => {
    if (!soundEnabled) return;
    const now = performance.now();
    if (now - lastSoundTime.current < 40) return;
    lastSoundTime.current = now;

    const sound = soundPool.current[soundIndex.current];
    soundIndex.current = (soundIndex.current + 1) % soundPool.current.length;
    sound.currentTime = 0;
    sound.playbackRate = Math.min(2, Math.abs(vx + vy) / 10);
    sound.play();
  };

  const randomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];
  const randomColor = () => {
    const r = Math.floor(Math.random() * 210) + 45;
    const g = Math.floor(Math.random() * 210) + 45;
    const b = Math.floor(Math.random() * 210) + 45;
    return `rgb(${r}, ${g}, ${b})`;
  };

  useEffect(() => {
    if (restartTrigger) {
      setX(100);
      setY(100);
      setVx(4);
      setVy(4);
      setTimeLeft(revealTime);
      setCurrentWord("READY?");
      onWordChange("");
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [restartTrigger]);

  useEffect(() => {
    if (!isGameActive) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const size = 120;
    const maxX = window.innerWidth - size;
    const maxY = window.innerHeight - size - 140;

    let newWord = randomWord();
    setCurrentWord(newWord);
    onWordChange(newWord);
    setTimeLeft(revealTime);

    const move = () => {
      setX((prevX) => {
        let newX = prevX + vx;
        let newVx = vx;
        if (newX <= 0) {
          newX = 0;
          newVx = Math.abs(vx);
          playBounceSound();
          onBounce?.();
        }
        if (newX >= maxX) {
          newX = maxX;
          newVx = -Math.abs(vx);
          playBounceSound();
          onBounce?.();
        }
        setVx(newVx);
        return newX;
      });

      setY((prevY) => {
        let newY = prevY + vy;
        let newVy = vy;
        if (newY <= 0) {
          newY = 0;
          newVy = Math.abs(vy);
          playBounceSound();
          onBounce?.();
        }
        if (newY >= maxY) {
          newY = maxY;
          newVy = -Math.abs(vy);
          playBounceSound();
          onBounce?.();
        }
        setVy(newVy);
        return newY;
      });

      if (Math.random() < 0.005) {
        setColor(randomColor());
      }

      animationRef.current = requestAnimationFrame(move);
    };

    animationRef.current = requestAnimationFrame(move);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isGameActive, revealTime]);

  useEffect(() => {
    if (!isGameActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(interval);
          setCurrentWord("TIME UP");
          onTimeUp?.();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameActive, onTimeUp]);

  const checkAnswer = (input) => {
    const trimmed = input.trim().toUpperCase();
    if (!trimmed) return false;

    if (trimmed === currentWord) {
      setVx((prev) => prev * 1.15);
      setVy((prev) => prev * 1.15);
      onCorrect?.(timeLeft);
      return true;
    } else {
      setIsVibrating(true);
      setTimeout(() => setIsVibrating(false), 300);
      onWrong?.();
      return false;
    }
  };

  React.useImperativeHandle(ballRef, () => ({
    checkAnswer,
    getCurrentWord: () => currentWord,
    getTimeLeft: () => timeLeft,
    resetWord: (newWord) => {
      setCurrentWord(newWord);
      onWordChange(newWord);
      setTimeLeft(revealTime);
    },
  }));

  return (
    <div
      ref={ballRef}
      className={`ball ${isVibrating ? "vibrate" : ""}`}
      style={{
        transform: `translate(${x}px, ${y}px)`,
        backgroundColor: color,
        boxShadow: `0 0 45px ${color}`,
        "--x": x,
        "--y": y,
      }}
    >
      {currentWord}
    </div>
  );
}
