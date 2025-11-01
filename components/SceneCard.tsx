
import React from 'react';
import type { Scene } from '../types';

interface SceneCardProps {
  scene: Scene;
}

const SceneCard: React.FC<SceneCardProps> = ({ scene }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 flex flex-col h-full transform transition-all duration-300 hover:scale-105 hover:border-red-500/50 hover:shadow-xl hover:shadow-red-900/20">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-red-500 uppercase tracking-wider">
          Scene {scene.id}
        </h3>
        <span className="text-xs font-mono bg-gray-700 text-gray-300 px-2 py-1 rounded">
          {scene.duration}
        </span>
      </div>
      <h4 className="text-xl font-semibold text-white mb-2">{scene.title}</h4>
      <p className="text-gray-400 italic text-sm mb-4 flex-grow">
        "{scene.voiceover}"
      </p>
      <div>
        <h5 className="font-semibold text-gray-200 mb-2 text-sm">Visuals:</h5>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
          {scene.visuals.map((visual, index) => (
            <li key={index}>{visual}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SceneCard;
