import React from 'react';

interface GameResultsProps {
  score: { correct: number; total: number };
  onPlayAgain: () => void;
  onBackToHome: () => void;
}

const GameResults: React.FC<GameResultsProps> = ({ score, onPlayAgain, onBackToHome }) => {
  const percentage = Math.round((score.correct / score.total) * 100);
  
  const getResultMessage = () => {
    if (percentage >= 90) return "Outstanding! You have an exceptional eye for detail.";
    if (percentage >= 70) return "Great job! You're quite good at spotting AI images.";
    if (percentage >= 50) return "Not bad! You're getting the hang of it.";
    return "Keep practicing! AI images are getting more convincing every day.";
  };

  const getResultEmoji = () => {
    if (percentage >= 90) return "🎯";
    if (percentage >= 70) return "🎉";
    if (percentage >= 50) return "👍";
    return "🧐";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Results header */}
        <div className="mb-8">
          <div className="text-6xl mb-4">{getResultEmoji()}</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Game Complete!</h2>
          <p className="text-gray-600 text-lg">{getResultMessage()}</p>
        </div>

        {/* Score display */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl p-6 mb-8 text-white">
          <div className="text-5xl font-bold mb-2">{score.correct}/{score.total}</div>
          <div className="text-xl opacity-90 mb-2">Correct Answers</div>
          <div className="text-3xl font-semibold">{percentage}%</div>
        </div>

        {/* Performance breakdown */}
        <div className="grid grid-cols-2 gap-4 mb-8 text-center">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{score.correct}</div>
            <div className="text-green-700">Correct</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-600">{score.total - score.correct}</div>
            <div className="text-red-700">Incorrect</div>
          </div>
        </div>

        {/* Fun fact */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <p className="text-sm text-gray-600">
            <strong>Did you know?</strong> Studies show that humans can only identify AI-generated images 
            correctly about 50-60% of the time. AI image quality has improved dramatically in recent years!
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-4 justify-center">
          <button
            onClick={onPlayAgain}
            className="btn-primary"
          >
            Play Again
          </button>
          
          <button
            onClick={onBackToHome}
            className="btn-secondary"
          >
            Back to Home
          </button>
        </div>

        {/* Share section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600 mb-4">Share your result:</p>
          <p className="text-sm text-gray-500 bg-gray-100 rounded px-3 py-2 inline-block">
            I scored {percentage}% on the "AI or Real?" challenge! Can you beat my score?
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameResults;
