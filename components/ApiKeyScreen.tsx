
import React from 'react';
import { InfoIcon } from '../constants';

interface ApiKeyScreenProps {
  onSelectKey: () => void;
  error?: string | null;
}

const ApiKeyScreen: React.FC<ApiKeyScreenProps> = ({ onSelectKey, error }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-lg p-8 space-y-6 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">Welcome to the Video Generator</h2>
          <p className="mt-2 text-gray-400">To generate videos, please select a Google AI API Key.</p>
        </div>
        
        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600">
            <p className="text-sm text-gray-300">
                <InfoIcon />
                This application uses the Gemini API, which may require billing to be enabled on your Google Cloud project. 
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 font-semibold underline ml-1">
                    Learn more about billing.
                </a>
            </p>
        </div>

        {error && (
          <div className="bg-red-900 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm" role="alert">
            <p><span className="font-bold">Error:</span> {error}</p>
          </div>
        )}

        <button
          onClick={onSelectKey}
          className="w-full px-5 py-3 text-lg font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-500/50 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Select API Key
        </button>
      </div>
    </div>
  );
};

export default ApiKeyScreen;
