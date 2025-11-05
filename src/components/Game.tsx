import React, { useState, useEffect } from 'react';
import { ImageData, getGameImages } from '../data/images';

interface GameProps {
  onGameEnd: (score: { correct: number; total: number }) => void;
  onBackToHome: () => void;
}

type GameState = 'playing' | 'feedback' | 'finished';

const Game: React.FC<GameProps> = ({ onGameEnd, onBackToHome }) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [gameState, setGameState] = useState<GameState>('playing');
  const [userGuess, setUserGuess] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    // Initialize game with 7 random images
    const gameImageSet = getGameImages();
    setImages(gameImageSet);
  }, []);

  const handleGuess = (isAIGuess: boolean) => {
    if (gameState !== 'playing' || showFeedback) return;

    const currentImage = images[currentImageIndex];
    const isCorrect = isAIGuess === currentImage.isAI;
    
    setUserGuess(isAIGuess);
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
    
    setShowFeedback(true);
    setGameState('feedback');
  };

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
      setGameState('playing');
      setUserGuess(null);
      setShowFeedback(false);
    } else {
      // Game finished
      setGameState('finished');
      onGameEnd({
        correct: score.correct + (userGuess === images[currentImageIndex]?.isAI ? 1 : 0),
        total: 7
      });
    }
  };

  const resetGame = () => {
    const gameImageSet = getGameImages();
    setImages(gameImageSet);
    setCurrentImageIndex(0);
    setScore({ correct: 0, total: 0 });
    setGameState('playing');
    setUserGuess(null);
    setShowFeedback(false);
  };

  if (images.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading game...</p>
        </div>
      </div>
    );
  }

  const currentImage = images[currentImageIndex];
  const progressPercentage = ((currentImageIndex + 1) / images.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBackToHome}
            className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
          >
            ← Back to Home
          </button>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {currentImageIndex + 1} of {images.length}
            </div>
            <div className="text-gray-600">Score: {score.correct}/{score.total}</div>
          </div>
          
          <div className="w-20"></div> {/* Spacer for balance */}
        </div>

        {/* Progress bar */}
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Main game area */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Image display */}
          <div className="text-center mb-8">
            <img
              src={currentImage.src}
              alt={`Image ${currentImageIndex + 1}`}
              className="max-w-full h-auto mx-auto rounded-lg shadow-md max-h-96 object-contain"
            />
          </div>

          {/* Game buttons or feedback */}
          {!showFeedback ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="text-center mb-6 sm:mb-0 sm:mr-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Is this image AI-generated or real?
                </h3>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => handleGuess(true)}
                  className="btn-game btn-ai"
                >
                  AI Generated
                </button>
                
                <button
                  onClick={() => handleGuess(false)}
                  className="btn-game btn-real"
                >
                  Real Photo
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              {/* Feedback */}
              <div className={`text-2xl font-bold mb-4 ${
                userGuess === currentImage.isAI ? 'text-green-600' : 'text-red-600'
              }`}>
                {userGuess === currentImage.isAI ? '✅ Correct!' : '❌ Incorrect!'}
              </div>
              
              <p className="text-lg text-gray-700 mb-6">
                This image was {currentImage.isAI ? 'AI-generated' : 'a real photograph'}.
              </p>
              
              <button
                onClick={handleNextImage}
                className="btn-primary"
              >
                {currentImageIndex < images.length - 1 ? 'Next Image' : 'See Results'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
