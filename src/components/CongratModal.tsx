import React from "react";
import { Country } from "../data/countries";

type Props = {
  lockedCountries: Country[];
  onUnlock: (countryCode: string) => void;
  onClose: () => void;
};

const CongratModal: React.FC<Props> = ({ lockedCountries, onUnlock, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 animate-fade-in">
    <div className="bg-gradient-to-br from-green-300 via-blue-200 to-pink-200 rounded-2xl shadow-2xl p-10 max-w-md w-full border border-white/40 flex flex-col items-center animate-scale-in">
      <div className="text-5xl mb-2">🎉</div>
      <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg">Congratulations!</h2>
      <p className="mb-6 text-gray-700 font-medium text-center">You completed this country! Choose a country to unlock next:</p>
      <div className="flex flex-col gap-3 mb-4 w-full">
        {lockedCountries.map((country) => (
          <button
            key={country.code}
            className="px-4 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl font-semibold shadow hover:scale-105 transition"
            onClick={() => onUnlock(country.code)}
          >
            {country.name}
          </button>
        ))}
      </div>
      <button className="mt-2 text-gray-500 hover:underline" onClick={onClose}>Close</button>
    </div>
  </div>
);

export default CongratModal; 