# 🎯 Focus Trainer Game

> Train your mind. Sharpen your focus.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?logo=vite)](https://vitejs.dev/)

## 📖 Overview

**Focus Trainer** is a cognitive training game designed to improve visual attention, memory, and reaction time. By tracking a moving ball and remembering words that appear, you exercise multiple cognitive functions simultaneously in an engaging, fast-paced experience.

## 📜 Origin Story

This project was originally built with vanilla JavaScript, HTML, and CSS, inspired by the power of CSS transition animations. The core concept came from exploring how visual motion tracking combined with memory recall could create an effective cognitive training tool. The original version featured a bouncing ball with dynamic color transitions and word displays, all powered by CSS animations and JavaScript game logic.

The React migration transformed this into a full-featured web application while preserving the original's charm and adding modern capabilities like theming, routing, and state management.

## ✨ Features

### 🎮 Core Gameplay

- **Dynamic Ball Movement** — Realistic physics with increasing speed
- **Word Memory Challenge** — 40+ words to test your recall
- **Adaptive Difficulty** — Speed increases with each correct answer
- **Time Pressure** — Countdown timer adds urgency
- **Score Tracking** — Persistent high scores with localStorage

### 🎨 Visual Experience

- **Dark/Light Theme** — Toggle between modes
- **Glassmorphism UI** — Modern, sleek design language
- **Smooth Animations** — Framer Motion powered transitions
- **Color Transitions** — Dynamic ball color changes inspired by CSS animations
- **Celebration Effects** — Confetti and banners for achievements

### 📊 User Features

- **Stats Dashboard** — Track your performance metrics
- **About Section** — Learn about the game and creator
- **Settings Modal** — Theme, sound, and reset options
- **Mobile Optimized** — Full touch support with persistent keyboard
- **Keyboard Shortcuts** — Quick input and navigation

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/OlatundeEmmanuelTantolorun/Focus-Trainer-Game.git

# Navigate to project directory
cd Focus-Trainer-Game/Focus-Trainer

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment

#### Netlify (Recommended)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

#### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## 🛠️ Technology Stack

### Frontend

- **[React 18](https://reactjs.org/)** — UI library
- **[Vite](https://vitejs.dev/)** — Build tool and development server
- **[React Router v6](https://reactrouter.com/)** — Navigation
- **[Framer Motion](https://www.framer.com/motion/)** — Animations
- **[React Icons](https://react-icons.github.io/react-icons/)** — Icon library

### Architecture

- **Context API** — State management (Theme, Game, Sound)
- **Custom Hooks** — Reusable logic (useBallMovement, useAudioPool, etc.)
- **Component-Based** — Modular, maintainable structure

### Development Tools

- **ESLint** — Code quality
- **Vite** — Fast HMR and builds

## 📁 Project Structure

```
Focus-Trainer/
├── src/
│   ├── assets/              # Static assets
│   ├── components/          # Reusable components
│   │   ├── game/           # Game-specific components
│   │   ├── layout/         # Layout components
│   │   └── ui/             # UI primitives
│   ├── context/            # Context providers
│   │   ├── GameContext.jsx
│   │   └── ThemeContext.jsx
│   ├── data/               # Game data
│   │   └── words.js       # Word list
│   ├── hooks/              # Custom React hooks
│   │   ├── useAnimation.js
│   │   ├── useAudioPool.js
│   │   ├── useBallMovement.js
│   │   ├── useCountdown.js
│   │   └── useLocalStorage.js
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Stats.jsx
│   │   └── About.jsx
│   ├── utils/              # Utility functions
│   │   ├── constants.js
│   │   ├── randomColor.js
│   │   ├── randomWord.js
│   │   └── storage.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   └── pingPong.mp3       # Sound effects
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Game Mechanics

### How to Play

1. **Watch** — A word appears on the moving ball
2. **Remember** — Focus on the word as the ball bounces
3. **Type** — Enter the word before time runs out
4. **Repeat** — Each correct answer increases speed and reduces time
5. **Achieve** — Track your progress and beat your high score!

### Scoring System

- **+1 Point** — Each correct answer
- **Speed Increase** — 15% faster after each correct answer
- **Time Decrease** — 2 seconds less per correct answer
- **Minimum Time** — 6 seconds (maximum difficulty)

### High Score

- Persisted in browser localStorage
- Celebrated with confetti animation when broken
- Displayed on both game and stats pages

## 📊 Stats Page

Track your gaming performance:

| Metric             | Description                           |
| ------------------ | ------------------------------------- |
| Games Played       | Total number of games started         |
| Highest Score      | Your all-time best performance        |
| Average Score      | Average points per game               |
| Best Accuracy      | Highest percentage of correct answers |
| Fastest Completion | Quickest game completion time         |
| Time Played        | Total time spent playing              |

## 🎨 Theme Customization

### Dark Mode (Default)

- Deep black backgrounds
- White text with high contrast
- Subtle glass effects

### Light Mode

- Clean white backgrounds
- Dark text for readability
- Soft shadow effects

Toggle between themes in the Settings modal.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Update documentation as needed
- Test your changes thoroughly

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Creator

**Olatunde Emmanuel Tantolorun**

- 🐙 [GitHub](https://github.com/OlatundeEmmanuelTantolorun)

_Building tools that sharpen the mind, one game at a time._

## 🙏 Acknowledgments

- Word list inspired by cognitive psychology research
- Icons provided by React Icons
- CSS transition animations that inspired the original concept
- The open source community for providing amazing tools and libraries

## 📈 Roadmap

- [ ] Multiplayer mode
- [ ] Daily challenges
- [ ] Achievement system
- [ ] More word categories
- [ ] Custom word lists
- [ ] Statistics export
- [ ] Leaderboard

---

**Built with ❤️ and React**

_Originally crafted with vanilla JavaScript, HTML, and CSS — powered by CSS transition animations._
