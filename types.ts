
export interface Scene {
  id: number;
  title: string;
  duration: string;
  voiceover: string;
  visuals: string[];
}

export interface GeneratedVideo {
  sceneId: number;
  videoUrl: string;
}
