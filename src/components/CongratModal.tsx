import React from "react";
import { Country } from "../data/countries";

type Props = {
  lockedCountries: Country[];
  onUnlock: (countryCode: string) => void;
  onClose: () => void;
};

const CongratModal: React.FC<Props> = ({ lockedCountries, onUnlock, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded shadow w-96">
      <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
      <p className="mb-4">You completed this country! Choose a country to unlock next:</p>
      <div className="flex flex-col gap-2 mb-4">
        {lockedCountries.map((country) => (
          <button
            key={country.code}
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => onUnlock(country.code)}
          >
            {country.name}
          </button>
        ))}
      </div>
      <button className="mt-2 text-gray-500" onClick={onClose}>Close</button>
    </div>
  </div>
);

export default CongratModal; 