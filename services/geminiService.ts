import { GoogleGenAI } from '@google/genai';
import type { Scene } from '../types';

// Fix: Removed conflicting global declaration for window.aistudio.
// The build environment already provides this type definition, and the local
// declaration was causing a TypeScript error.


const POLLING_INTERVAL_MS = 10000;

/**
 * Constructs a detailed prompt for the Veo model based on a scene's description.
 * @param scene - The scene object containing visual descriptions.
 * @returns A string prompt for video generation.
 */
function constructPromptForScene(scene: Scene): string {
    const baseStyle = "A short video clip for a motivational fitness video about the 'Heavy Duty' training method. The style is modern, sporty, with a dark, atmospheric background and metallic or red accents. Use fast, clean, dynamic transitions. The feel is cinematic, intense, and high-energy.";
    const visualsDescription = scene.visuals.join(' ');
    return `${baseStyle} The scene should visually represent the following script notes: ${visualsDescription}. Focus on creating a visually compelling and professional-looking clip.`;
}

/**
 * Generates a video for a single scene using the Gemini Veo model.
 * @param scene - The scene to generate a video for.
 * @returns A promise that resolves to a local object URL for the generated video blob.
 */
export async function generateVideoForScene(scene: Scene): Promise<string> {
    // Per instructions, create a new instance right before the API call to ensure the latest key is used.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = constructPromptForScene(scene);

    console.log(`Generating video for Scene ${scene.id}: "${scene.title}"`);
    console.log(`Prompt: ${prompt}`);

    let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: '16:9'
        }
    });

    console.log(`Started video generation for Scene ${scene.id}. Operation ID: ${operation.name}`);
    
    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, POLLING_INTERVAL_MS));
        console.log(`Polling for Scene ${scene.id} result...`);
        operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    if (operation.error) {
        throw new Error(`Video generation failed with error: ${operation.error.message}`);
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

    if (!downloadLink) {
        throw new Error("Video generation succeeded but no download link was provided.");
    }
    
    console.log(`Downloading video for Scene ${scene.id} from: ${downloadLink}`);
    
    // Append API key to the download link as required
    const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    
    if (!videoResponse.ok) {
        throw new Error(`Failed to download video: ${videoResponse.statusText}`);
    }

    const videoBlob = await videoResponse.blob();
    return URL.createObjectURL(videoBlob);
}
