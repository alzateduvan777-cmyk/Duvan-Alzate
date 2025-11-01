
import React, { useState, useEffect } from 'react';
import { LOADING_MESSAGES } from '../constants';

interface LoadingScreenProps {
  progress: {
    current: number;
    total: number;
  };
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  const [message, setMessage] = useState(LOADING_MESSAGES[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessage(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const percentage = progress.total > 0 ? Math.round(((progress.current -1) / progress.total) * 100) : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 text-center">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle className="text-gray-700" strokeWidth="10" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
          <circle
            className="text-red-500"
            strokeWidth="10"
            strokeDasharray="283"
            strokeDashoffset={283 - (percentage / 100) * 283}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">{percentage}%</span>
      </div>
      <h2 className="mt-8 text-2xl md:text-3xl font-bold text-white">Generating Your Video...</h2>
      <p className="mt-2 text-gray-400">
        Generating scene {progress.current} of {progress.total}
      </p>
      <p className="mt-4 text-lg text-red-400 font-mono animate-pulse">{message}</p>
      <p className="mt-12 text-sm text-gray-500 max-w-md">
        AI video generation can take a few minutes. Please keep this window open. The stronger the stimulus, the greater the growth!
      </p>
    </div>
  );
};

export default LoadingScreen;
