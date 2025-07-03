import React, { useState } from "react";
import { QuizQuestion } from "../data/quizzes";

type Props = {
  questions: QuizQuestion[];
  onClose: () => void;
  onComplete: (score: number, total: number, answers: number[]) => void;
};

const QuizModal: React.FC<Props> = ({ questions, onClose, onComplete }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleNext = () => {
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }
    setAnswers(prev => [...prev, selected ?? -1]);
    setSelected(null);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      onComplete(score + (selected === questions[current].answer ? 1 : 0), questions.length, [...answers, selected ?? -1]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-blue-200 flex flex-col items-center animate-scale-in">
        <div className="w-full bg-gradient-to-r from-blue-500 to-pink-400 rounded-xl px-6 py-3 mb-4 flex items-center justify-between">
          <h3 className="font-bold text-white text-lg">Question {current + 1} / {questions.length}</h3>
          <div className="text-white text-xl">🧠</div>
        </div>
        <p className="mb-6 text-gray-800 text-center text-lg font-medium">{questions[current].question}</p>
        <div className="flex flex-col gap-3 mb-6 w-full">
          {questions[current].options.map((opt, idx) => (
            <button
              key={idx}
              className={`px-4 py-3 rounded-xl border-2 font-semibold text-base transition-all shadow-sm flex items-center gap-2
                ${selected === idx ? (idx === questions[current].answer ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700') : 'bg-white border-gray-200 hover:bg-blue-100 hover:border-blue-400'}
              `}
              onClick={() => setSelected(idx)}
              disabled={selected !== null}
            >
              {selected === idx && idx === questions[current].answer && <span>✅</span>}
              {selected === idx && idx !== questions[current].answer && <span>❌</span>}
              {opt}
            </button>
          ))}
        </div>
        <div className="flex w-full justify-between items-center">
          <button className="text-gray-500 hover:underline" onClick={onClose}>Cancel</button>
          <button
            className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-6 py-2 rounded-xl font-semibold shadow hover:scale-105 transition disabled:opacity-50"
            onClick={handleNext}
            disabled={selected === null}
          >
            {current === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal; 