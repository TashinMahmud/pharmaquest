import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initialCountries, Country } from "./data/countries";
import { quizzes, QuizQuestion } from "./data/quizzes";
import QuizModal from "./components/QuizModal";
import CongratModal from "./components/CongratModal";
import { ReactComponent as WorldMapSVG } from './assets/world_map.svg';
import ReviewModal from "./components/ReviewModal";

const countryPins = [
  { name: 'Bangladesh', code: 'BD', x: 609, y: 353 },
  { name: 'Japan', code: 'JP', x: 770, y: 312 },
  { name: 'Australia', code: 'AU', x: 778, y: 537 },
  { name: 'Sweden', code: 'SE', x: 328, y: 163 },
  { name: 'Spain', code: 'ES', x: 271, y: 272 },
  { name: 'England', code: 'GB', x: 282, y: 225 },
];

const GamePage: React.FC = () => {
  const [playerName, setPlayerName] = useState("");
  const [countries, setCountries] = useState<Country[]>(initialCountries);
  const [lockedModal, setLockedModal] = useState<string | null>(null);
  const [quizCountry, setQuizCountry] = useState<Country | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [score, setScore] = useState(0);
  const [showCongrat, setShowCongrat] = useState(false);
  const [lastCompletedIdx, setLastCompletedIdx] = useState<number | null>(null);
  const [showTryAgainModal, setShowTryAgainModal] = useState(false);
  const [completedAnswers, setCompletedAnswers] = useState<{ [countryCode: string]: number[] }>(() => {
    const saved = localStorage.getItem("completedAnswers");
    return saved ? JSON.parse(saved) : {};
  });
  const [showReview, setShowReview] = useState<{ country: Country; answers: number[] } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("playerName") || "";
    setPlayerName(name);
    const savedCountries = localStorage.getItem("countries");
    const savedScore = localStorage.getItem("score");
    if (savedCountries) setCountries(JSON.parse(savedCountries));
    if (savedScore) setScore(Number(savedScore));
  }, []);

  useEffect(() => {
    localStorage.setItem("countries", JSON.stringify(countries));
    localStorage.setItem("score", String(score));
  }, [countries, score]);

  useEffect(() => {
    if (countries.every(c => c.unlocked)) {
      setTimeout(() => {
        navigate("/gameover", { state: { score } });
      }, 1000);
    }
  }, [countries, navigate, score]);

  const handleCountryClick = (country: Country) => {
    if (!country.unlocked) {
      setLockedModal(country.name);
    } else if (completedAnswers[country.code]) {
      setShowReview({ country, answers: completedAnswers[country.code] });
    } else {
      setQuizCountry(country);
      setShowQuiz(true);
    }
  };

  const handleQuizComplete = (countryCode: string, correct: number, total: number, answers: number[]) => {
    const percent = (correct / total) * 100;
    if (percent >= 80) {
      const idx = countries.findIndex(c => c.code === countryCode);
      setLastCompletedIdx(idx);
      setScore(score + correct * 5);
      setShowCongrat(true);
      const updated = { ...completedAnswers, [countryCode]: answers };
      setCompletedAnswers(updated);
      localStorage.setItem("completedAnswers", JSON.stringify(updated));
    } else {
      setShowTryAgainModal(true);
    }
  };

  const handleUnlockCountry = (countryCode: string) => {
    setCountries(countries =>
      countries.map(c =>
        c.code === countryCode ? { ...c, unlocked: true } : c
      )
    );
    setShowCongrat(false);
  };

  const handleReset = () => {
    localStorage.removeItem('countries');
    localStorage.removeItem('score');
    localStorage.removeItem('completedAnswers');
    setCountries(initialCountries);
    setScore(0);
    setShowCongrat(false);
    setLastCompletedIdx(null);
    setLockedModal(null);
    setQuizCountry(null);
    setShowQuiz(false);
    setShowTryAgainModal(false);
    setCompletedAnswers({});
    setShowReview(null);
  };

  const lockedCountries = countries.filter(c => !c.unlocked);
  const unlockedCount = countries.filter(c => c.unlocked).length;
  const progress = (unlockedCount / countries.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-purple-300 to-pink-300 font-sans py-8">
      <div className="backdrop-blur-md bg-white/70 rounded-3xl shadow-2xl px-8 py-6 flex flex-col items-center w-full max-w-2xl border border-white/40 mb-6">
        <h2 className="text-2xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg">Welcome, {playerName}!</h2>
        <div className="flex items-center gap-4 mb-2">
          <span className="text-lg text-gray-700 font-medium">Score:</span>
          <span className="text-2xl font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 px-6 py-1 rounded-full shadow">{score}</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div className="h-full bg-gradient-to-r from-blue-400 to-pink-400 transition-all" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="text-xs text-gray-500 mb-2">Countries unlocked: {unlockedCount} / {countries.length}</div>
        <div className="text-base text-blue-700 font-semibold mb-2 animate-bounce-slow">🌍 Pick a country on the map to start your adventure!</div>
        <button
          className="mt-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          onClick={handleReset}
        >
          Reset Game
        </button>
      </div>
      <div className="relative w-full max-w-4xl mx-auto rounded-2xl shadow-xl border border-white/40 overflow-hidden bg-white/60 backdrop-blur-md" style={{ height: 700 }}>
        <WorldMapSVG className="w-full h-full object-contain" style={{ transform: 'translate(-200px, -50px) scale(1.3)' }} />
        {countryPins.map(pin => {
          const country = countries.find(c => c.code === pin.code);
          return (
            <button
              key={pin.code}
              className={`absolute rounded-full w-24 h-10 flex items-center justify-center group
                ${country && country.unlocked ? 'bg-green-500' : 'bg-gray-400 cursor-not-allowed'}
                shadow-lg border-2 border-white hover:scale-105 hover:z-20 transition-transform duration-200 animate-pulse`}
              style={{ left: pin.x, top: pin.y, transform: 'translate(-50%, -50%)' }}
              onClick={() => handleCountryClick(country!)}
              title={pin.name}
            >
              <span className="text-white text-xs font-bold drop-shadow text-center px-2 truncate w-20">{pin.name}</span>
              <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-black/80 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-30 shadow-lg">
                {pin.name}
              </span>
            </button>
          );
        })}
      </div>
      {/* Locked Modal */}
      {lockedModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full border border-blue-200 flex flex-col items-center">
            <div className="text-4xl mb-2">🔒</div>
            <p className="mb-4 text-gray-700 font-medium text-center">
              {lockedModal} is locked. You need to unlock it first by completing the current country.
            </p>
            <button
              className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-xl font-semibold shadow hover:scale-105 transition"
              onClick={() => setLockedModal(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Review Modal */}
      {showReview && (
        <ReviewModal
          country={showReview.country}
          userAnswers={showReview.answers}
          questions={quizzes[showReview.country.code]}
          onClose={() => setShowReview(null)}
        />
      )}
      {/* Quiz Modal */}
      {showQuiz && quizCountry && (
        <QuizModal
          questions={quizzes[quizCountry.code]}
          onClose={() => setShowQuiz(false)}
          onComplete={(correct, total, answers) => {
            handleQuizComplete(quizCountry.code, correct, total, answers);
            setShowQuiz(false);
          }}
        />
      )}
      {/* Congratulatory Modal */}
      {showCongrat && lastCompletedIdx !== null && (
        <CongratModal
          lockedCountries={lockedCountries}
          onUnlock={handleUnlockCountry}
          onClose={() => setShowCongrat(false)}
        />
      )}
      {/* Try Again Modal */}
      {showTryAgainModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full border border-pink-300 flex flex-col items-center">
            <div className="text-5xl mb-2 text-pink-500">❗</div>
            <h3 className="text-xl font-bold mb-2 text-pink-700">Almost there!</h3>
            <p className="mb-4 text-gray-700 font-medium text-center">
              You need at least <span className='font-bold text-pink-600'>80%</span> to complete this country.<br/>Try again!
            </p>
            <button
              className="mt-2 px-6 py-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-xl font-semibold shadow hover:scale-105 transition"
              onClick={() => setShowTryAgainModal(false)}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage; 