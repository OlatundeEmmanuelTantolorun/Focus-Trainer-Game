import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "../context/GameContext";
import Celebration from "../components/Celebration";

export default function Home() {
  const { data, update } = useGame();

  const ballRef = useRef(null);
  const animationRef = useRef();
  const timerRef = useRef();
  const audioPool = useRef([]);
  const inputRef = useRef(null);
  const appRef = useRef(null);

  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(50);
  const [answer, setAnswer] = useState("");
  const [currentWord, setCurrentWord] = useState("READY?");
  const [ballColor, setBallColor] = useState("#c9f29b");
  const [hasCelebratedThisGame, setHasCelebratedThisGame] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [showWrongPopup, setShowWrongPopup] = useState(false);

  const x = useRef(100);
  const y = useRef(100);
  const vx = useRef(4);
  const vy = useRef(4);
  const revealTime = useRef(50);
  const currentWordRef = useRef("");
  const gameStartTime = useRef(0);
  const lastBounce = useRef(0);
  const lastColor = useRef(0);

  const baseAttemptsRef = useRef(0);
  const baseCorrectRef = useRef(0);
  const sessionAttemptsRef = useRef(0);
  const sessionCorrectRef = useRef(0);

  const sessionScoreRef = useRef(0);
  const streakRef = useRef(0);
  const sessionBestStreakRef = useRef(0);
  const sessionFastestRef = useRef(null);
  const sessionBestWPMRef = useRef(0);
  const sessionTimeRef = useRef(0);
  const sessionLongestWordRef = useRef(0);

  const words = [
    "FOCUS",
    "VISION",
    "CLARITY",
    "TRACK",
    "FLOW",
    "TARGET",
    "MEMORY",
    "REACT",
    "BALANCE",
    "CALM",
    "CONTROL",
    "INSIGHT",
    "ACTIVE",
    "ALERT",
    "PROCESS",
    "RHYTHM",
    "TIMING",
    "DECISION",
    "PRECISION",
    "ENERGY",
    "SHARP",
    "TRACKING",
    "ATTENTIVE",
    "OBSERVE",
    "FILTER",
    "RESPONSE",
  ];

  const isDark = data.theme === "dark";

  useEffect(() => {
    const handleResize = () => {
      const currentHeight = window.visualViewport?.height || window.innerHeight;
      setViewportHeight(currentHeight);
      const isKeyboardOpen = currentHeight < window.innerHeight * 0.7;
      setKeyboardVisible(isKeyboardOpen);
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
      window.visualViewport.addEventListener("scroll", handleResize);
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
        window.visualViewport.removeEventListener("scroll", handleResize);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (started && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [started, currentWord]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.body.style.top = "0";
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.bottom = "0";

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.bottom = "";
    };
  }, []);

  const pageStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: isDark
      ? "radial-gradient(circle at 50% 0%, #1c1c1c 0%, #0c0c0c 100%)"
      : "radial-gradient(circle at 50% 0%, #f0f2f5 0%, #e0e5ed 100%)",
    color: isDark ? "#f0f0f0" : "#1a1a1a",
    overflow: "hidden",
    padding: "75px 16px 0",
    fontFamily: "'Inter', system-ui, sans-serif",
  };

  const topBarStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
    marginBottom: 16,
    position: "relative",
    zIndex: 20,
  };

  const statCardStyle = {
    background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.5)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)"}`,
    padding: "10px 6px",
    borderRadius: 16,
    textAlign: "center",
    boxShadow: isDark
      ? "0 8px 24px rgba(0,0,0,0.3)"
      : "0 8px 24px rgba(0,0,0,0.06)",
  };

  const statLabelStyle = {
    fontSize: "9px",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    color: isDark ? "#888" : "#777",
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
  };

  const statValueStyle = {
    fontSize: "28px",
    fontWeight: 600,
    fontFamily: "'JetBrains Mono', 'Menlo', monospace",
    letterSpacing: "-0.5px",
    marginTop: 2,
    lineHeight: 1.2,
    color: isDark ? "#fff" : "#111",
  };

  const getBallContainerHeight = () => {
    const topBarHeight = 95;
    const inputHeight = keyboardVisible ? 130 : 150;
    const bottomPadding = 80;
    return `calc(100vh - ${topBarHeight + inputHeight + bottomPadding}px)`;
  };

  const ballContainerStyle = {
    position: "relative",
    width: "100%",
    height: getBallContainerHeight(),
    overflow: "visible",
  };

  const ballWrapperStyle = {
    position: "absolute",
    left: 0,
    top: 0,
    transform: `translate(${x.current}px, ${y.current}px)`,
    width: 120,
    height: 120,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const ballStyle = {
    width: 120,
    height: 120,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 22,
    color: "#111",
    background: ballColor,
    boxShadow: `0 0 35px ${ballColor}`,
    userSelect: "none",
    position: "relative",
    zIndex: 2,
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "0.5px",
  };

  const ringStyle = {
    position: "absolute",
    top: "-6px",
    left: "-6px",
    right: "-6px",
    bottom: "-6px",
    borderRadius: "50%",
    border: `2px solid ${ballColor}`,
    opacity: 0.4,
    animation: "ringPulse 2s ease-out infinite",
    pointerEvents: "none",
  };

  const inputAreaStyle = {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 70,
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr",
    gap: 10,
    padding: "12px 16px 16px",
    zIndex: 15,
    maxWidth: 520,
    margin: "0 auto",
    background: isDark ? "rgba(16,16,16,0.8)" : "rgba(248,248,248,0.8)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderRadius: "20px 20px 0 0",
    borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}`,
  };

  const inputStyle = {
    padding: "14px 18px",
    borderRadius: 14,
    border: "none",
    outline: "none",
    fontSize: 16,
    background: isDark ? "#2a2a2a" : "#fff",
    color: isDark ? "#fff" : "#111",
    width: "100%",
    minWidth: 0,
    fontFamily: "'Inter', sans-serif",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    transition: "0.2s",
  };

  const checkStyle = {
    padding: "14px 16px",
    border: "none",
    borderRadius: 14,
    background: "#c9f29b",
    color: "#111",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: 15,
    whiteSpace: "nowrap",
    fontFamily: "'Inter', sans-serif",
    boxShadow: "0 4px 12px rgba(201, 242, 155, 0.3)",
    transition: "0.15s",
  };

  const restartStyle = {
    padding: "14px 16px",
    border: "none",
    borderRadius: 14,
    background: "#ff6363",
    color: "#fff",
    cursor: "pointer",
    fontSize: 15,
    whiteSpace: "nowrap",
    fontFamily: "'Inter', sans-serif",
    boxShadow: "0 4px 12px rgba(255, 99, 99, 0.25)",
    transition: "0.15s",
  };

  function randomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  function randomColor() {
    const r = Math.floor(Math.random() * 180) + 60;
    const g = Math.floor(Math.random() * 180) + 60;
    const b = Math.floor(Math.random() * 180) + 60;
    return `rgb(${r},${g},${b})`;
  }

  function playSound(pitch = 1) {
    if (!data.sound) return;
    const now = performance.now();
    if (now - lastBounce.current < 40) return;
    lastBounce.current = now;

    const sound = audioPool.current.shift();
    if (!sound) return;
    sound.currentTime = 0;
    sound.playbackRate = Math.min(2, pitch);
    sound.play();
    audioPool.current.push(sound);
  }

  function playBounce() {
    const speed = Math.abs(vx.current + vy.current) / 10;
    playSound(Math.min(2, speed));
  }

  function playWrongSound() {
    playSound(0.6);
  }

  function moveBall() {
    const size = 120;
    const maxX = window.innerWidth - size;

    const topBarHeight = 95;
    const inputHeight = 80;
    const maxY = window.innerHeight - size - topBarHeight - inputHeight - 20;

    x.current += vx.current;
    y.current += vy.current;

    let bounced = false;

    if (x.current <= 0) {
      x.current = 0;
      vx.current *= -1;
      bounced = true;
    }
    if (x.current >= maxX) {
      x.current = maxX;
      vx.current *= -1;
      bounced = true;
    }
    if (y.current <= 0) {
      y.current = 0;
      vy.current *= -1;
      bounced = true;
    }
    if (y.current >= maxY) {
      y.current = maxY;
      vy.current *= -1;
      bounced = true;
    }

    if (bounced) playBounce();

    if (ballRef.current) {
      const wrapper = ballRef.current.parentElement;
      if (wrapper) {
        wrapper.style.transform = `translate(${x.current}px,${y.current}px)`;
      }
    }

    const now = performance.now();
    if (now - lastColor.current > 500) {
      const c = randomColor();
      setBallColor(c);
      lastColor.current = now;
    }

    animationRef.current = requestAnimationFrame(moveBall);
  }

  function startRound() {
    clearInterval(timerRef.current);

    const word = randomWord();
    currentWordRef.current = word;
    setCurrentWord(word);

    let remaining = revealTime.current;
    setTimeLeft(remaining);

    timerRef.current = setInterval(() => {
      remaining--;
      setTimeLeft(remaining);

      sessionTimeRef.current += 1;

      if (remaining <= 0) {
        clearInterval(timerRef.current);
        setCurrentWord("TIME UP");
        cancelAnimationFrame(animationRef.current);
        finishGame();
      }
    }, 1000);
  }

  function triggerWrongPopup() {
    setShowWrongPopup(true);
    setTimeout(() => {
      setShowWrongPopup(false);
    }, 800);
  }

  function checkAnswer() {
    const value = answer.trim().toUpperCase();
    if (!value) return;

    sessionAttemptsRef.current += 1;
    update({
      totalAttempts: baseAttemptsRef.current + sessionAttemptsRef.current,
    });

    if (value === currentWordRef.current) {
      sessionCorrectRef.current += 1;
      update({
        correctAnswers: baseCorrectRef.current + sessionCorrectRef.current,
      });

      sessionScoreRef.current += 1;
      setScore(sessionScoreRef.current);

      const timeTaken = Math.max(0, revealTime.current - timeLeft);
      sessionFastestRef.current =
        sessionFastestRef.current === null
          ? timeTaken
          : Math.min(sessionFastestRef.current, timeTaken);

      const seconds = Math.max(timeTaken, 1);
      const wpm = Math.round(
        currentWordRef.current.length / 5 / (seconds / 60),
      );
      sessionBestWPMRef.current = Math.max(sessionBestWPMRef.current, wpm);

      sessionLongestWordRef.current = Math.max(
        sessionLongestWordRef.current,
        currentWordRef.current.length,
      );

      streakRef.current += 1;
      sessionBestStreakRef.current = Math.max(
        sessionBestStreakRef.current,
        streakRef.current,
      );

      if (sessionScoreRef.current > data.highScore && !hasCelebratedThisGame) {
        setHasCelebratedThisGame(true);
        update({ showBanner: true });
        setTimeout(() => {
          update({ showBanner: false });
        }, 3000);
      }

      vx.current *= 1.15;
      vy.current *= 1.15;
      revealTime.current = Math.max(6, revealTime.current - 2);
      startRound();
    } else {
      streakRef.current = 0;

      playWrongSound();
      triggerWrongPopup();

      if (ballRef.current) {
        const wrapper = ballRef.current.parentElement;
        if (wrapper) {
          wrapper.classList.add("vibrate");
          setTimeout(() => {
            wrapper?.classList.remove("vibrate");
          }, 300);
        }
      }
    }

    setAnswer("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  function finishGame() {
    clearInterval(timerRef.current);
    cancelAnimationFrame(animationRef.current);

    const sessionAccuracy =
      sessionAttemptsRef.current === 0
        ? 0
        : Math.round(
            (sessionCorrectRef.current / sessionAttemptsRef.current) * 100,
          );

    const newFastest =
      sessionFastestRef.current === null
        ? data.fastestAnswer
        : data.fastestAnswer === 0
          ? sessionFastestRef.current
          : Math.min(data.fastestAnswer, sessionFastestRef.current);

    update({
      gamesPlayed: data.gamesPlayed + 1,
      totalScore: data.totalScore + sessionScoreRef.current,
      highScore: Math.max(data.highScore, sessionScoreRef.current),
      bestAccuracy: Math.max(data.bestAccuracy, sessionAccuracy),
      fastestAnswer: newFastest,
      bestWPM: Math.max(data.bestWPM || 0, sessionBestWPMRef.current),
      longestWordAnswered: Math.max(
        data.longestWordAnswered || 0,
        sessionLongestWordRef.current,
      ),
      currentStreak: 0,
      bestStreak: Math.max(data.bestStreak || 0, sessionBestStreakRef.current),
      timePlayed: data.timePlayed + sessionTimeRef.current,
      lastPlayed: new Date().toISOString(),
    });

    setStarted(false);
    setHasCelebratedThisGame(false);
    streakRef.current = 0;
  }

  function restartGame() {
    clearInterval(timerRef.current);
    cancelAnimationFrame(animationRef.current);

    x.current = 100;
    y.current = 100;
    vx.current = 4;
    vy.current = 4;
    revealTime.current = 50;
    setScore(0);
    setAnswer("");
    setCurrentWord("READY?");
    setTimeLeft(50);
    setStarted(false);
    setHasCelebratedThisGame(false);
    setShowWrongPopup(false);

    sessionAttemptsRef.current = 0;
    sessionCorrectRef.current = 0;
    sessionScoreRef.current = 0;
    streakRef.current = 0;
    sessionBestStreakRef.current = 0;
    sessionFastestRef.current = null;
    sessionBestWPMRef.current = 0;
    sessionTimeRef.current = 0;
    sessionLongestWordRef.current = 0;

    if (data.showBanner) {
      update({
        showBanner: false,
      });
    }

    const wrapper = ballRef.current?.parentElement;
    if (wrapper) {
      wrapper.style.transform = `translate(${x.current}px,${y.current}px)`;
    }

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  }

  function startGame() {
    vx.current = 4;
    vy.current = 4;
    revealTime.current = 50;
    setScore(0);
    setHasCelebratedThisGame(false);
    setStarted(true);
    setShowWrongPopup(false);

    baseAttemptsRef.current = data.totalAttempts;
    baseCorrectRef.current = data.correctAnswers;
    sessionAttemptsRef.current = 0;
    sessionCorrectRef.current = 0;
    sessionScoreRef.current = 0;
    streakRef.current = 0;
    sessionBestStreakRef.current = 0;
    sessionFastestRef.current = null;
    sessionBestWPMRef.current = 0;
    sessionTimeRef.current = 0;
    sessionLongestWordRef.current = 0;

    gameStartTime.current = performance.now();
    startRound();
    moveBall();

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  }

  useEffect(() => {
    const pool = [];
    for (let i = 0; i < 6; i++) {
      const audio = new Audio("/pingPong.mp3");
      audio.volume = 0.25;
      pool.push(audio);
    }
    audioPool.current = pool;

    return () => {
      clearInterval(timerRef.current);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div ref={appRef} style={pageStyle}>
      <Celebration />

      {!started && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              width: 340,
              borderRadius: 40,
              background: "linear-gradient(145deg, #d9ff9c, #8fcf5a)",
              color: "#111",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: 40,
              boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(2rem, 6vw, 2.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                marginBottom: 8,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Focus Trainer
            </h1>
            <div
              style={{
                width: 60,
                height: 4,
                background: "#111",
                borderRadius: 2,
                marginBottom: 24,
                opacity: 0.3,
              }}
            />
            <p
              style={{
                fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                lineHeight: 1.7,
                opacity: 0.85,
                maxWidth: 280,
                marginBottom: 32,
                fontWeight: 500,
              }}
            >
              Remember the word, track the ball, type it fast.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={startGame}
              style={{
                padding: "14px 44px",
                border: "none",
                borderRadius: 40,
                cursor: "pointer",
                background: "#111",
                color: "#fff",
                fontWeight: 700,
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                letterSpacing: "0.5px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              }}
            >
              START
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      <div style={topBarStyle}>
        <div style={statCardStyle}>
          <div style={statLabelStyle}>Score</div>
          <div style={statValueStyle}>{score}</div>
        </div>
        <div style={statCardStyle}>
          <div style={statLabelStyle}>High Score</div>
          <div style={statValueStyle}>{Math.max(data.highScore, score)}</div>
        </div>
        <div style={statCardStyle}>
          <div style={statLabelStyle}>Timer</div>
          <div
            style={{
              ...statValueStyle,
              color: timeLeft <= 10 ? "#ff5d5d" : undefined,
            }}
          >
            {timeLeft}
          </div>
        </div>
      </div>

      <div style={ballContainerStyle}>
        <div style={ballWrapperStyle}>
          <div style={ringStyle} />
          <div ref={ballRef} style={ballStyle}>
            {currentWord}
          </div>
        </div>
      </div>

      <div style={inputAreaStyle} className="input-area">
        <AnimatePresence>
          {showWrongPopup && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: -10, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              style={{
                position: "absolute",
                bottom: "calc(100% + 8px)",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#ff5d5d",
                color: "#fff",
                padding: "8px 20px",
                borderRadius: 30,
                fontSize: "0.95rem",
                fontWeight: 700,
                letterSpacing: "0.5px",
                boxShadow: "0 8px 24px rgba(255, 99, 99, 0.4)",
                whiteSpace: "nowrap",
                zIndex: 20,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              ✗ Wrong
              <div
                style={{
                  position: "absolute",
                  bottom: -8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 0,
                  height: 0,
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderTop: `8px solid #ff5d5d`,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <input
          ref={inputRef}
          value={answer}
          placeholder="Type word…"
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              checkAnswer();
            }
            if (e.key === "Escape") {
              restartGame();
            }
          }}
          onBlur={() => {
            if (started) {
              setTimeout(() => {
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }, 10);
            }
          }}
          style={inputStyle}
          className="input-field"
          autoFocus={started}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={checkAnswer}
          style={checkStyle}
          className="check-btn"
          onMouseDown={(e) => e.preventDefault()}
        >
          Check
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={restartGame}
          style={restartStyle}
          className="restart-btn"
          onMouseDown={(e) => e.preventDefault()}
        >
          Restart
        </motion.button>
      </div>

      <style>{`
        @keyframes ringPulse {
          0% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 0; }
          100% { transform: scale(1); opacity: 0.4; }
        }
        .vibrate {
          animation: vibrate 0.15s linear 3;
        }
        @keyframes vibrate {
          0% { transform: translate(-2px, 0); }
          25% { transform: translate(2px, 0); }
          50% { transform: translate(-2px, 0); }
          75% { transform: translate(2px, 0); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </div>
  );
}
