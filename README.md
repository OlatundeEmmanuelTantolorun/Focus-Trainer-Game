# 🎯 Focus Trainer

A browser-based cognitive reflex game that challenges memory, concentration, and typing speed.

Track a bouncing ball, memorize the word it displays, and type it correctly before the timer expires. Every correct answer increases the ball's speed while reducing the available time, creating a progressively more demanding experience.

🔗 **Live Demo:**
https://eyefocus-trainer.netlify.app/

> Challenge your focus. Improve your reaction speed. Beat your personal best.

---

## 📸 Preview
<img width="1333" height="1999" alt="screenshot" src="https://github.com/user-attachments/assets/ea2bd9f0-499a-4521-b2fa-0ce4e288211f" />


---

# ✨ Features

### 🎮 Dynamic Gameplay

- Fast-paced memory and typing game
- Freely bouncing animated ball
- Progressive difficulty system
- Increasing movement speed after every correct answer
- Decreasing answer time (minimum 6 seconds)

### 📊 Statistics Dashboard

Automatically tracks:

- Games Played
- Highest Score
- Average Score
- Best Accuracy
- Fastest Answer
- Best WPM
- Longest Word Correctly Typed
- Current Combo Streak
- Best Combo Streak
- Total Time Played
- Last Played

### ⚙️ Customization

- Dark & Light Theme
- Sound Effects Toggle
- Reset Game Progress

### 📱 Responsive Experience

- Optimized for desktop and mobile
- Keyboard-aware layout
- Prevents unwanted scrolling
- Ball remains inside the playable viewport

### 🎉 Visual Feedback

- Confetti celebration for new high scores
- Animated success banner
- Smooth transitions powered by Framer Motion

---

# 💡 Skills Demonstrated

This project showcases practical frontend development skills, including:

- React Hooks
- React Context API
- State Management
- Local Storage Persistence
- Responsive Design
- Mobile-first UI
- Animation with Framer Motion
- Performance-conscious Rendering
- Game Loop Logic
- Progressive Difficulty Systems
- Data Visualization
- Clean Component Architecture

---

# 🛠 Tech Stack

| Technology      | Usage                  |
| --------------- | ---------------------- |
| React 18        | UI Development         |
| Vite            | Build Tool             |
| React Router    | Client-side Routing    |
| Framer Motion   | Animations             |
| React Icons     | Icons                  |
| Tailwind CSS v4 | Utility Styling        |
| Inline Styles   | Dynamic Theming        |
| localStorage    | Persistent Player Data |
| Netlify         | Deployment             |

---

# 🚀 Installation

Clone the repository.

```bash
git clone https://github.com/OlatundeEmmanuelTantolorun/Focus-Trainer-Game.git
```

Navigate into the project.

```bash
cd focus-trainer
```

Install dependencies.

```bash
npm install
```

Run the development server.

```bash
npm run dev
```

Build for production.

```bash
npm run build
```

---

# 📁 Project Structure

```
src/
│
├── assets/
│   ├── logo-dark.png
│   └── logo-white.jsx
│
├── components/
│   ├── Celebration.jsx
│   ├── Ball.jsx
│   └── Navbar.jsx
│
├── context/
│   └── GameContext.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Stats.jsx
│   ├── Settings.jsx
│   └── Info.jsx
│
├── utils/
│   └── storage.js
│
├── App.jsx
├── index.css
└── main.jsx
```

---

# 🧠 How It Works

The game maintains two categories of statistics:

### Session Statistics

During gameplay, temporary values are stored in memory, including:

- Current Score
- Current Streak
- Best Streak
- Fastest Answer
- Best WPM
- Longest Word
- Time Played

These values remain in memory until the game ends.

### Lifetime Statistics

When a session finishes, the application performs a single update to `localStorage`, merging the session results with the player's lifetime records.

The only live updates are:

- Total Attempts
- Correct Answers

These update immediately after every guess to ensure accuracy remains correct even if the browser closes unexpectedly.

---

# ⭐ Highlights

Some implementation details I'm particularly proud of:

- Progressive difficulty system
- Persistent player statistics
- Responsive mobile gameplay
- Keyboard-aware viewport handling
- Single-write storage architecture
- Animated UI with Framer Motion
- Clean React Context state management

---

# 🗺 Future Improvements

- Session history
- Daily login streaks
- Average WPM tracking
- Difficulty-based scoring
- Additional word packs
- Multiple difficulty modes
- Online leaderboard
- Achievements & badges

---

# 👨‍💻 Author

## Olatunde Emmanuel Tantolorun (Elitz)

Frontend Developer passionate about creating engaging web experiences with React.

📍 Lokoja, Nigeria

### Connect with me

- **GitHub**  
  https://github.com/OlatundeEmmanuelTantolorun/Focus-Trainer-Game

- **LinkedIn**
  https://linkedin.com/in/emmanuel-tantolorun-93244b3ab

- **TikTok**  
  https://www.tiktok.com/@elitz_dev01

---

# 📄 License

This project is licensed under the MIT License.

Feel free to fork, learn from, and build upon this project.
