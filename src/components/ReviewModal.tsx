import React from "react";
import { QuizQuestion } from "../data/quizzes";
import { Country } from "../data/countries";

type Props = {
  country: Country;
  userAnswers: number[];
  questions: QuizQuestion[];
  onClose: () => void;
};

const ReviewModal: React.FC<Props> = ({ country, userAnswers, questions, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 animate-fade-in">
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-blue-200 flex flex-col items-center animate-scale-in">
      <div className="w-full bg-gradient-to-r from-blue-500 to-pink-400 rounded-xl px-6 py-3 mb-4 flex items-center justify-between">
        <h3 className="font-bold text-white text-lg">{country.name} Quiz Review</h3>
        <div className="text-white text-xl">🔍</div>
      </div>
      <div className="w-full flex flex-col gap-6 mb-4">
        {questions.map((q, idx) => (
          <div key={idx} className="bg-gray-50 rounded-xl p-4 shadow-sm">
            <div className="font-semibold mb-2 text-gray-800">Q{idx + 1}: {q.question}</div>
            <div className="flex flex-col gap-2">
              {q.options.map((opt, oidx) => {
                const isUser = userAnswers[idx] === oidx;
                const isCorrect = q.answer === oidx;
                return (
                  <div
                    key={oidx}
                    className={`px-3 py-2 rounded-lg border-2 flex items-center gap-2 text-sm
                      ${isCorrect ? 'border-green-400 bg-green-50 text-green-700' :
                        isUser ? 'border-pink-400 bg-pink-50 text-pink-700' :
                        'border-gray-200 bg-white text-gray-700'}
                    `}
                  >
                    {isCorrect && <span>✅</span>}
                    {isUser && !isCorrect && <span>❌</span>}
                    {opt}
                    {isUser && <span className="ml-auto text-xs italic">Your answer</span>}
                    {isCorrect && <span className="ml-auto text-xs italic">Correct</span>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <button
        className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-xl font-semibold shadow hover:scale-105 transition"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);

export default ReviewModal; 