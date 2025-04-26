import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ResultScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isCorrect, prompt, prediction } = location.state || {};

  const handleRetry = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-800">
      <Header />

      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className={`text-4xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
            {isCorrect ? '🎉 Correct!' : '❌ Incorrect'}
          </h1>

          <div className="text-xl space-y-2">
            <p>
              <span className="font-semibold">Prompt:</span> {prompt}
            </p>
            <p>
              <span className="font-semibold">AI Prediction:</span> {prediction}
            </p>
          </div>

          <button
            onClick={handleRetry}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Play Again
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResultScreen;