
import React, { useState, useEffect, useRef } from 'react';
import type { GeneratedVideo } from '../types';
import { SCRIPT_SCENES } from '../constants';

interface VideoResultProps {
  videos: GeneratedVideo[];
  onRestart: () => void;
}

const VideoResult: React.FC<VideoResultProps> = ({ videos, onRestart }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentVideo = videos[currentIndex];
  const currentScene = SCRIPT_SCENES.find(s => s.id === currentVideo?.sceneId);

  const handleVideoEnd = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.play().catch(error => {
            console.error("Autoplay was prevented:", error);
        });
    }
  }, [currentIndex]);
  
  if (!currentScene) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
        <div className="w-full max-w-5xl aspect-video bg-gray-900 rounded-lg shadow-2xl shadow-red-500/20 overflow-hidden border-2 border-gray-700">
            <video
                ref={videoRef}
                key={currentVideo.videoUrl}
                src={currentVideo.videoUrl}
                onEnded={handleVideoEnd}
                controls
                autoPlay
                className="w-full h-full object-cover"
                playsInline
            >
                Your browser does not support the video tag.
            </video>
        </div>
        
        <div className="w-full max-w-5xl mt-6 p-6 bg-gray-800 rounded-lg border border-gray-700 text-center">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-red-500">SCENE {currentScene.id}: {currentScene.title}</h3>
                <span className="text-sm font-mono text-gray-400">{currentScene.duration}</span>
            </div>
            <p className="text-lg text-gray-200 italic">"{currentScene.voiceover}"</p>
        </div>

        <div className="mt-6 flex items-center space-x-4">
            <p className="text-gray-400">Scene {currentIndex + 1} of {videos.length}</p>
             <button
                onClick={onRestart}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
                Start Over
            </button>
        </div>
    </div>
  );
};

export default VideoResult;
