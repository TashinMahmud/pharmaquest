# 🗺️ PharmaQuest — Interactive Medical World Map Game

[![React](https://img.shields.io/badge/React-19.1.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React%20Router-7.6.3-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)

**PharmaQuest** is an interactive, gamified web application built to test users on international medicine-related trivia and medical standards. Set on a beautifully designed interactive world map, players travel between country pins, unlock quizzes, and compete to earn high scores.

* **Progressive Unlocks**: Score 80% or above on country quizzes to unlock access to subsequent destinations.
* **Persistent Saves**: Locally caches player state, names, and scores utilizing the browser's storage engine.

---

## 🎮 Game Engine Flow

The game follows a simple yet engaging progression cycle powered by local react states and persistent caches.

```
                      [ Name Entry / Start ]
                                │
                      [ Interactive Map UI ]
                                │
                   [ Select Country Pin / Quiz ]
                                │
                     [ Score Evaluation ]
                   ┌────────────┴────────────┐
                   ▼ (Score >= 80%)          ▼ (Score < 80%)
           [ Unlock Next Country ]    [ Review Answers / Retry ]
                   │
           [ Save Progress (LocalStorage) ]
```

### Game Play Mechanics
1. **Explore**: Navigate an interactive map utilizing custom coordinate pins.
2. **Challenge**: Answer 10 country-specific pharmaceutical questions.
3. **Persist**: Scores and unlocked nodes are saved directly using browser `localStorage` variables.

---

## ⚡ Tech Stack & Core Libraries

* **Frontend Library**: [React 19](https://react.dev/) — declarative components and state management.
* **Typing**: [TypeScript](https://www.typescriptlang.org/) — strict type check constraints for state, routes, and questions.
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) — utility-first CSS configurations for map views and responsive grids.
* **Router**: [React Router DOM v7](https://reactrouter.com/) — client-side route handlers.
* **Build Scripts**: React-Scripts (Create-React-App environment).

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install the development packages:
```bash
# Clone the repository
git clone https://github.com/TashinMahmud/pharmaquest.git
cd pharmaquest

# Install packages
npm install
```

### 2. Running Locally
Run the local dev server using:
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser to start playing.

---

## 🧭 Project Layout

```
pharmaquest/
├── public/                  # Static assets (favicons, manifest.json)
├── quizzes/                 # Local quiz datasets for countries
├── src/                     # React source files
│   ├── components/          # Game components (Map, Quiz, Results, Entry)
│   ├── utils/               # LocalStorage wrappers, progress managers
│   ├── App.tsx              # Main application root
│   └── index.tsx            # Main renderer entry point
├── bangladesh_quiz.txt      # Reference quiz text definitions
├── tailwind.config.js       # Tailwind configuration file
├── tsconfig.json            # TypeScript build configurations
└── README.md                # Project documentation
```

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for complete details.
