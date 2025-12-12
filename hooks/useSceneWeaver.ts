
import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { InputState, ParsedStory } from "../types";
import { fileToBase64, parseStoryResponse, SCENE_WEAVER_INSTRUCTION } from "../utils";

export const useSceneWeaver = () => {
  // Input State
  const [inputs, setInputs] = useState<InputState>({
    storyIdea: "A cyberpunk courier discovers a package that contains a living plant in a city where nature is extinct.",
    imageCount: 3,
    charDesc: "",
    storyDepth: "Public",
    tone: "cinematic",
    outputLang: "English",
    webtoonMode: false
  });
  
  const [charImageFile, setCharImageFile] = useState<File | null>(null);
  const [charImagePreview, setCharImagePreview] = useState<string | null>(null);

  // App State
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedStory, setParsedStory] = useState<ParsedStory | null>(null);
  const [rawStoryText, setRawStoryText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleUpdatePrompt = (index: number, newPrompt: string) => {
    if (!parsedStory) return;
    const newScenes = [...parsedStory.scenes];
    newScenes[index] = { ...newScenes[index], prompt: newPrompt };
    setParsedStory({ ...parsedStory, scenes: newScenes });
  };

  const generateStory = async () => {
    if (!inputs.storyIdea) {
      setError("Please enter a story idea.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setParsedStory(null);
    setRawStoryText("");

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let promptText = `
--------------------------------
INPUT FROM USER
--------------------------------
1) Rough story idea:
${inputs.storyIdea}

2) Number of images to generate:
${inputs.imageCount}

3) Main character consistency:
- Character Image Provided? ${charImageFile ? "YES" : "NO"}
${inputs.charDesc ? `Character description: ${inputs.charDesc}` : ""}

4) Story detail level:
${inputs.storyDepth}

5) Overall tone:
${inputs.tone}

6) Output Language (CRITICAL):
${inputs.outputLang}

7) Output Mode:
${inputs.webtoonMode ? "WEBTOON SPEECH BUBBLE MODE (Create panels, speech bubbles, and captions)" : "STANDARD NARRATIVE MODE (Create paragraphs)"}

Generate the complete output now according to the SceneWeaver format.
      `;

      const contents: any[] = [{ text: promptText }];

      if (charImageFile) {
        const base64 = await fileToBase64(charImageFile);
        contents.unshift({
          inlineData: {
            mimeType: charImageFile.type,
            data: base64,
          },
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: SCENE_WEAVER_INSTRUCTION,
        },
        contents: contents,
      });

      const text = response.text;
      if (!text) throw new Error("No text generated.");

      setRawStoryText(text);
      const parsed = parseStoryResponse(text);
      setParsedStory(parsed);

    } catch (err: any) {
      setError(err.message || "Failed to weave story.");
    } finally {
      setIsProcessing(false);
    }
  };

  const generateSceneImage = async (sceneIndex: number) => {
    if (!parsedStory) return;
    
    const scene = parsedStory.scenes[sceneIndex];
    
    // Update state to show loading for this image
    const newScenes = [...parsedStory.scenes];
    newScenes[sceneIndex] = { ...scene, isGeneratingImage: true };
    setParsedStory({ ...parsedStory, scenes: newScenes });

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let promptText = scene.prompt;

      if (charImageFile) {
        promptText = `Use the attached image as a REFERENCE for the character's facial features and clothing style. 
        However, you MUST generate a completely new image with the following scene description: "${scene.prompt}".
        Change the pose, camera angle, lighting, and background to match this new description. 
        Do not simply copy the composition of the reference image.`;
      }

      const parts: any[] = [{ text: promptText }];
      
      if (charImageFile) {
        const base64 = await fileToBase64(charImageFile);
        parts.unshift({
          inlineData: {
            mimeType: charImageFile.type,
            data: base64,
          }
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: { parts },
        config: {}
      });

      let imageUrl = "";
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      const updatedScenes = [...parsedStory.scenes];
      updatedScenes[sceneIndex] = { 
        ...scene, 
        generatedImageUrl: imageUrl, 
        isGeneratingImage: false 
      };
      setParsedStory({ ...parsedStory, scenes: updatedScenes });

    } catch (err) {
      console.error("Image gen error", err);
      const updatedScenes = [...parsedStory.scenes];
      updatedScenes[sceneIndex] = { ...scene, isGeneratingImage: false };
      setParsedStory({ ...parsedStory, scenes: updatedScenes });
    }
  };

  return {
    inputs,
    setInputs,
    charImageFile,
    setCharImageFile,
    charImagePreview,
    setCharImagePreview,
    isProcessing,
    parsedStory,
    rawStoryText,
    error,
    handleUpdatePrompt,
    generateStory,
    generateSceneImage
  };
};
