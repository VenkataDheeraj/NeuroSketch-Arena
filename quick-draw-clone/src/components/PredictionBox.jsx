import React from 'react';
import { CheckCircle, Hourglass } from 'lucide-react'; // You may need to install this: npm install lucide-react

const PredictionBox = ({ label, prediction, isCorrect }) => {
  return (
    <div className={`p-4 border-2 rounded-lg shadow-md bg-white transition-all duration-300 ${isCorrect ? 'border-green-400' : 'border-gray-300'}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
        {isCorrect ? (
          <CheckCircle className="text-green-500 w-6 h-6" />
        ) : (
          <Hourglass className="text-gray-400 w-5 h-5 animate-pulse" />
        )}
      </div>
      <p className={`text-xl font-bold ${isCorrect ? 'text-green-600' : 'text-purple-600'}`}>
        {prediction || 'Thinking...'}
      </p>
    </div>
  );
};

export default PredictionBox;