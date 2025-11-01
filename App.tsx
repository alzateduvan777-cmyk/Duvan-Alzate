
import React, { useState, useEffect, useCallback } from 'react';
import type { GeneratedVideo } from './types';
import { SCRIPT_SCENES } from './constants';
import { generateVideoForScene } from './services/geminiService';
import ApiKeyScreen from './components/ApiKeyScreen';
import LoadingScreen from './components/LoadingScreen';
import VideoResult from './components/VideoResult';
import SceneCard from './components/SceneCard';

type ApiKeyStatus = 'checking' | 'ok' | 'needed';

const App: React.FC = () => {
  const [apiKeyStatus, setApiKeyStatus] = useState<ApiKeyStatus>('checking');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progress, setProgress] = useState({ current: 0, total: SCRIPT_SCENES.length });
  const [generatedVideos, setGeneratedVideos] = useState<GeneratedVideo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const checkApiKey = useCallback(async () => {
    try {
      if (await window.aistudio.hasSelectedApiKey()) {
        setApiKeyStatus('ok');
      } else {
        setApiKeyStatus('needed');
      }
    } catch (e) {
      console.error("aistudio not available", e);
      setApiKeyStatus('needed'); // Fallback if aistudio is not available
    }
  }, []);

  useEffect(() => {
    checkApiKey();
  }, [checkApiKey]);

  const handleSelectKey = useCallback(async () => {
    try {
      await window.aistudio.openSelectKey();
      setApiKeyStatus('ok');
      setError(null);
    } catch (e) {
      console.error("Failed to open select key dialog", e);
      setError("Could not open the API Key selection dialog. Please try again.");
    }
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedVideos([]);
    setError(null);
    const videos: GeneratedVideo[] = [];

    for (const scene of SCRIPT_SCENES) {
      setProgress({ current: scene.id, total: SCRIPT_SCENES.length });
      try {
        const url = await generateVideoForScene(scene);
        videos.push({ sceneId: scene.id, videoUrl: url });
        setGeneratedVideos([...videos]); // Update state as videos come in
      } catch (e: any) {
        console.error(e);
        let errorMessage = `Failed to generate video for scene ${scene.id}.`;
        if (typeof e.message === 'string' && e.message.includes('Requested entity was not found')) {
            errorMessage = 'Your API Key is invalid or not authorized for this model. Please select a valid key.';
            setApiKeyStatus('needed');
        } else if (e.message) {
            errorMessage += ` Reason: ${e.message}`;
        }
        setError(errorMessage);
        setIsGenerating(false);
        return;
      }
    }
    setIsGenerating(false);
  };

  const renderContent = () => {
    if (apiKeyStatus === 'checking') {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg">Checking API Key status...</p>
        </div>
      );
    }

    if (apiKeyStatus === 'needed') {
      return <ApiKeyScreen onSelectKey={handleSelectKey} error={error} />;
    }

    if (isGenerating) {
      return <LoadingScreen progress={progress} />;
    }

    if (generatedVideos.length > 0) {
      return <VideoResult videos={generatedVideos} onRestart={() => setGeneratedVideos([])} />;
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Heavy Duty: <span className="text-red-500">AI Video Generator</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Review the video script below, then click "Generate Video" to create a motivational masterpiece with AI.
          </p>
        </header>

        {error && (
            <div className="bg-red-900 border border-red-500 text-red-200 px-4 py-3 rounded-lg relative mb-6" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {SCRIPT_SCENES.map((scene) => (
            <SceneCard key={scene.id} scene={scene} />
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleGenerate}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-lg text-xl transition-transform transform hover:scale-105 shadow-lg shadow-red-600/30"
          >
            Generate Video
          </button>
        </div>
      </div>
    );
  };

  return <div className="min-h-screen bg-gray-900">{renderContent()}</div>;
};

export default App;
