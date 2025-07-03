import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import GamePage from './GamePage';
import './App.css';

function HomePage() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    localStorage.setItem('playerName', name);
    navigate('/game');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">PharmaQuest</h1>
      <p className="mb-4">Welcome to the game!</p>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="mb-4 px-3 py-2 border rounded w-64 text-center"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleStart}
        disabled={!name.trim()}
      >
        Start
      </button>
    </div>
  );
}

function GameOverPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score ?? 0;

  const handleRestart = () => {
    localStorage.removeItem("playerName");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Game Over</h1>
      <p className="mb-4">Your final score: <span className="font-bold">{score}</span></p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleRestart}
      >
        Back to Home
      </button>
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
