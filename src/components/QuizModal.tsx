import React, { useState } from "react";
import { QuizQuestion } from "../data/quizzes";

type Props = {
  questions: QuizQuestion[];
  onClose: () => void;
  onComplete: (score: number, total: number) => void;
};

const QuizModal: React.FC<Props> = ({ questions, onClose, onComplete }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    if (selected === questions[current].answer) {
      setScore(score + 1);
    }
    setSelected(null);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      onComplete(score + (selected === questions[current].answer ? 1 : 0), questions.length);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h3 className="font-bold mb-2">Question {current + 1}</h3>
        <p className="mb-4">{questions[current].question}</p>
        <div className="flex flex-col gap-2 mb-4">
          {questions[current].options.map((opt, idx) => (
            <button
              key={idx}
              className={`px-3 py-2 rounded border ${selected === idx ? "bg-blue-200" : ""}`}
              onClick={() => setSelected(idx)}
            >
              {opt}
            </button>
          ))}
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleNext}
          disabled={selected === null}
        >
          {current === questions.length - 1 ? "Finish" : "Next"}
        </button>
        <button className="ml-4 text-gray-500" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default QuizModal; 