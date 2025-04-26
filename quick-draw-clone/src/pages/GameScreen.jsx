import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Prompt from '../components/Prompt';
import Timer from '../components/Timer';
import Canvas from '../components/Canvas';
import PredictionBox from '../components/PredictionBox';
import { getRandomPrompt } from '../utils/prompts';
import {
  mockCnnPredict,
  mockVitPredict,
  mockHybridPredict,
} from '../utils/mockModel';
import { useNavigate } from 'react-router-dom';

const GameScreen = () => {
  const [prompt, setPrompt] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [cnnPrediction, setCnnPrediction] = useState('');
  const [vitPrediction, setVitPrediction] = useState('');
  const [hybridPrediction, setHybridPrediction] = useState('');

  const [cnnCorrect, setCnnCorrect] = useState(false);
  const [vitCorrect, setVitCorrect] = useState(false);
  const [hybridCorrect, setHybridCorrect] = useState(false);

  useEffect(() => {
    setPrompt(getRandomPrompt());
  }, []);

  useEffect(() => {
    const correctModels = [];
    if (cnnCorrect) correctModels.push('CNN');
    if (vitCorrect) correctModels.push('ViT');
    if (hybridCorrect) correctModels.push('Hybrid');
  
    if (correctModels.length >= 2) {
      navigate('/result', {
        state: {
          isCorrect: true,
          prompt,
          prediction: `Correct! ${correctModels.join(', ')} guessed it right.`,
        },
      });
    }
  }, [cnnCorrect, vitCorrect, hybridCorrect, prompt, navigate]);

  useEffect(() => {
    if (timeLeft === 0) {
      const isCorrect = cnnCorrect && vitCorrect && hybridCorrect;
      navigate('/result', {
        state: {
          isCorrect,
          prompt,
          prediction: `CNN: ${cnnPrediction}, ViT: ${vitPrediction}, Hybrid: ${hybridPrediction}`,
        },
      });
    }
  }, [timeLeft, cnnCorrect, vitCorrect, hybridCorrect, cnnPrediction, vitPrediction, hybridPrediction, prompt, navigate]);

  const handleStroke = async (drawingData) => {
    if (!cnnCorrect) {
      const guess = await mockCnnPredict(drawingData);
      setCnnPrediction(guess);
      if (guess.toLowerCase() === prompt.toLowerCase()) {
        setCnnCorrect(true);
      }
    }
  
    if (!vitCorrect) {
      const guess = await mockVitPredict(drawingData);
      setVitPrediction(guess);
      if (guess.toLowerCase() === prompt.toLowerCase()) {
        setVitCorrect(true);
      }
    }
  
    if (!hybridCorrect) {
      const guess = await mockHybridPredict(drawingData);
      setHybridPrediction(guess);
      if (guess.toLowerCase() === prompt.toLowerCase()) {
        setHybridCorrect(true);
      }
    }
  };

  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-800">
      <Header />

      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Prompt & Timer */}
          <div className="text-center">
            <Prompt word={prompt} />
            <Timer seconds={30} onEnd={() => setTimeLeft(0)} setTimeLeft={setTimeLeft} />
          </div>

          {/* Canvas + Predictions */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Canvas ref={canvasRef} onStroke={handleStroke} setIsDrawing={setIsDrawing} />

            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 w-full md:w-1/2">
              <PredictionBox label="CNN" prediction={cnnPrediction} isCorrect={cnnCorrect} />
              <PredictionBox label="ViT" prediction={vitPrediction} isCorrect={vitCorrect} />
              <PredictionBox label="Hybrid" prediction={hybridPrediction} isCorrect={hybridCorrect} />
            </div>
          </div>

          {/* Clear Button */}
          <div className="text-center pt-4">
            <button
              onClick={handleClear}
              className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600 transition"
            >
              Clear Drawing
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GameScreen;