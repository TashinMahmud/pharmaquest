import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import GamePage from './GamePage';
import './App.css';

function HomePage() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    localStorage.removeItem('playerName');
    localStorage.removeItem('countries');
    localStorage.removeItem('score');
    localStorage.removeItem('completedAnswers');
    localStorage.setItem('playerName', name);
    navigate('/game');
  };

  const handleRestart = () => {
    localStorage.removeItem('playerName');
    localStorage.removeItem('countries');
    localStorage.removeItem('score');
    localStorage.removeItem('completedAnswers');
    setName('');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-300 to-pink-300 font-sans">
      <div className="backdrop-blur-md bg-white/60 rounded-3xl shadow-2xl p-10 flex flex-col items-center w-full max-w-md border border-white/40">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg">PharmaQuest</h1>
        <p className="mb-6 text-lg text-gray-700 font-medium text-center w-full flex justify-center">Welcome to the world of medicine adventures!</p>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="mb-4 px-4 py-3 rounded-xl w-64 text-center border-2 border-blue-200 focus:border-blue-500 outline-none shadow-sm transition"
        />
        <button
          className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:from-pink-500 hover:to-blue-500 transition disabled:opacity-50 flex items-center gap-2"
          onClick={handleStart}
          disabled={!name.trim()}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          Start
        </button>
      </div>
    </div>
  );
}

function GameOverPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score ?? 0;

  const handleRestart = () => {
    localStorage.removeItem("playerName");
    localStorage.removeItem("countries");
    localStorage.removeItem("score");
    localStorage.removeItem("completedAnswers");
    navigate("/game");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-300 to-pink-300 font-sans">
      <div className="backdrop-blur-md bg-white/70 rounded-3xl shadow-2xl p-10 flex flex-col items-center w-full max-w-md border border-white/40">
        <div className="mb-4 text-6xl">🏆</div>
        <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg">Game Over</h1>
        <p className="mb-4 text-lg text-gray-700">Your final score:</p>
        <div className="mb-6 text-4xl font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 px-8 py-2 rounded-full shadow-lg">{score}</div>
        <button
          className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:from-pink-500 hover:to-blue-500 transition flex items-center gap-2"
          onClick={handleRestart}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h4l3 10 4-18 3 8h4" /></svg>
          Back to Home
        </button>
        <button
          className="mt-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg flex items-center gap-2 hover:scale-105 transition"
          onClick={handleRestart}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582M20 20v-5h-.581M5.21 17.293A9 9 0 1 1 18.79 6.707" />
          </svg>
          Restart Game
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/gameover" element={<GameOverPage />} />
      </Routes>
    </Router>
  );
}

export default App;
