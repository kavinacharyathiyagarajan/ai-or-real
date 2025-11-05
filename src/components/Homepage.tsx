import React from 'react';

interface HomepageProps {
  onStartGame: () => void;
  onShowInfo: () => void;
}

const Homepage: React.FC<HomepageProps> = ({ onStartGame, onShowInfo }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br flex flex-col items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main headline */}
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Can You Tell What's <span className="text-indigo-600">Real</span>?
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Test your ability to distinguish between AI-generated images and real photographs. 
          Can you spot the difference in our increasingly digital world?
        </p>
        
        {/* Call-to-action buttons */}
        <div className="flex flex-col gap-4 justify-center items-center">
          <button
            onClick={onStartGame}
            className="btn-primary"
          >
            Play Game
          </button>
          
          <button
            onClick={onShowInfo}
            className="btn-secondary"
          >
            Learn More
          </button>
        </div>
        
        {/* Quick stats preview */}
        <div className="mb-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">7</div>
            <div className="text-gray-600">Images to Guess</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">50%</div>
            <div className="text-gray-600">Average Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">2min</div>
            <div className="text-gray-600">Quick Challenge</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
