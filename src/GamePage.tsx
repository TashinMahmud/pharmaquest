import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initialCountries, Country } from "./data/countries";
import { quizzes, QuizQuestion } from "./data/quizzes";
import QuizModal from "./components/QuizModal";
import CongratModal from "./components/CongratModal";

const GamePage: React.FC = () => {
  const [playerName, setPlayerName] = useState("");
  const [countries, setCountries] = useState<Country[]>(initialCountries);
  const [lockedModal, setLockedModal] = useState<string | null>(null);
  const [quizCountry, setQuizCountry] = useState<Country | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [score, setScore] = useState(0);
  const [showCongrat, setShowCongrat] = useState(false);
  const [lastCompletedIdx, setLastCompletedIdx] = useState<number | null>(null);
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
    } else {
      setQuizCountry(country);
      setShowQuiz(true);
    }
  };

  const handleQuizComplete = (countryCode: string, correct: number, total: number) => {
    const percent = (correct / total) * 100;
    if (percent >= 80) {
      const idx = countries.findIndex(c => c.code === countryCode);
      setLastCompletedIdx(idx);
      setScore(score + correct * 5);
      setShowCongrat(true);
    } else {
      alert("You need at least 80% to complete this country. Try again!");
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

  const lockedCountries = countries.filter(c => !c.unlocked);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl mb-4">Welcome, {playerName}!</h2>
      <div className="mb-8">
        <div className="grid grid-cols-3 gap-4">
          {countries.map((country) => (
            <button
              key={country.code}
              className={`px-4 py-2 rounded ${
                country.unlocked
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={() => handleCountryClick(country)}
            >
              {country.name}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">Score: {score}</div>
      {/* Locked Modal */}
      {lockedModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow">
            <p>
              {lockedModal} is locked. You need to unlock it first by completing the current country.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setLockedModal(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Quiz Modal */}
      {showQuiz && quizCountry && (
        <QuizModal
          questions={quizzes[quizCountry.code]}
          onClose={() => setShowQuiz(false)}
          onComplete={(correct, total) => {
            handleQuizComplete(quizCountry.code, correct, total);
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
    </div>
  );
};

export default GamePage; 