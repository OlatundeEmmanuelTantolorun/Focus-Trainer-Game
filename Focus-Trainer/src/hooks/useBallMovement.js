import { useState, useRef, useCallback, useEffect } from "react";
import {
  BALL_SIZE,
  INITIAL_X,
  INITIAL_Y,
  INITIAL_VX,
  INITIAL_VY,
  COLOR_CHANGE_INTERVAL,
} from "../utils/constants";
import { randomRGB } from "../utils/randomColor";

export const useBallMovement = (isGameStarted) => {
  const [position, setPosition] = useState({ x: INITIAL_X, y: INITIAL_Y });
  const [velocity, setVelocity] = useState({ vx: INITIAL_VX, vy: INITIAL_VY });
  const [color, setColor] = useState("rgb(201, 242, 155)");
  const [shadow, setShadow] = useState("0 0 30px rgba(201, 242, 155, 0.6)");
  const animationRef = useRef(null);
  const lastColorChangeRef = useRef(0);

  const moveBall = useCallback(() => {
    if (!isGameStarted) return;

    setPosition((prev) => {
      let newX = prev.x + velocity.vx;
      let newY = prev.y + velocity.vy;
      let newVx = velocity.vx;
      let newVy = velocity.vy;
      let bounced = false;

      const maxX = window.innerWidth - BALL_SIZE;
      const maxY = window.innerHeight - BALL_SIZE;

      if (newX <= 0) {
        newX = 0;
        newVx *= -1;
        bounced = true;
      }
      if (newX >= maxX) {
        newX = maxX;
        newVx *= -1;
        bounced = true;
      }
      if (newY <= 0) {
        newY = 0;
        newVy *= -1;
        bounced = true;
      }
      if (newY >= maxY) {
        newY = maxY;
        newVy *= -1;
        bounced = true;
      }

      if (bounced) {
        setVelocity({ vx: newVx, vy: newVy });
      }

      const now = performance.now();
      if (now - lastColorChangeRef.current > COLOR_CHANGE_INTERVAL) {
        const newColor = randomRGB();
        setColor(newColor);
        setShadow(`0 0 45px ${newColor}`);
        lastColorChangeRef.current = now;
      }

      return { x: newX, y: newY };
    });

    animationRef.current = requestAnimationFrame(moveBall);
  }, [isGameStarted, velocity]);

  useEffect(() => {
    if (isGameStarted) {
      moveBall();
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isGameStarted, moveBall]);

  const resetBall = useCallback(() => {
    setPosition({ x: INITIAL_X, y: INITIAL_Y });
    setVelocity({ vx: INITIAL_VX, vy: INITIAL_VY });
    setColor("rgb(201, 242, 155)");
    setShadow("0 0 30px rgba(201, 242, 155, 0.6)");
  }, []);

  const increaseSpeed = useCallback(() => {
    setVelocity((prev) => ({
      vx: prev.vx * 1.15,
      vy: prev.vy * 1.15,
    }));
  }, []);

  return {
    position,
    velocity,
    color,
    shadow,
    increaseSpeed,
    resetBall,
    setVelocity,
  };
};
