# 🧪 PharmaQuest — Interactive Medical Trivia Game

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live-Demo-2C8EAD?style=for-the-badge&logo=google-chrome&logoColor=white)](https://TashinMahmud.github.io/pharmaquest)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

PharmaQuest is an interactive, gamified web application designed to test and expand knowledge of pharmacology and medicine. Players choose from multiple global region datasets, compete against active timers, build multipliers through correct streaks, and review their score cards.

</div>

---

## 🎮 Game Engine Flow & Routing

The application utilizes declarative React states and React Router to guide the player through the quiz journey:

```
                  +----------------------------------+
                  |         LANDING SCREEN           |
                  |  - Country Quiz Selection        |
                  |  - High Score Ledger Board       |
                  +----------------+-----------------+
                                   | (Start Quiz)
                                   v
                  +----------------------------------+
                  |           GAME RUNTIME           |
                  |  - Question Deck Controller      |
                  |  - Countdown Timer Loop          |
                  |  - Streak Multipliers            |
                  +----------------+-----------------+
                                   | (Complete/Fail)
                                   v
                  +----------------------------------+
                  |         RESULTS DISPLAY          |
                  |  - Performance Breakdown Metrics |
                  |  - Restart Option Anchor         |
                  +----------------------------------+
```

---

## 📂 Code Module Architecture

*   **`src/App.tsx`**: Sets up global state context, sets base dark/light theme, and configures path routing.
*   **`src/GamePage.tsx`**: The core game engine. Operates the interval timers, processes choice selections, tallies immediate points, and updates correct answer streaks.
*   **`src/data/`**:
    *   `quizzes.ts`: The static dataset containing questions, options, correct indexes, and detailed post-question explanations.
    *   `countries.ts`: Metadata definitions for available global question packs (e.g. Bangladesh, United Kingdom, Japan).
*   **`quizzes/`**: Reference text files (`quiz_bd.txt`, `quiz_jp.txt`) used for authoring and updates.

---

## 🚀 Running Locally

### 1. Installation
Install project dependencies using npm:
```bash
npm install
```

### 2. Development Run
Boot up the local React development server:
```bash
npm start
```
The game will open automatically at: `http://localhost:3000`.

### 3. Production Build
Generate a static compilation for hosting:
```bash
npm run build
```

---

## 📜 License

Licensed under the MIT License.
