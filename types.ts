
export interface Scene {
  id: number;
  prompt: string;
  // Standard Mode
  narrative?: string;
  // Webtoon Mode
  bubbleType?: string;
  bubbleText?: string;
  caption?: string;
  // Common
  mystery: string;
  generatedImageUrl?: string;
  isGeneratingImage?: boolean;
}

export interface ParsedStory {
  worldIntro: string;
  scenes: Scene[];
}

export type StoryDepth = "Public" | "Supporter" | "Full Access";
export type Tone = "cinematic" | "dark" | "restrained" | "poetic";
export type OutputLanguage = "English" | "Korean";

export interface InputState {
  storyIdea: string;
  imageCount: number;
  charDesc: string;
  storyDepth: StoryDepth;
  tone: Tone;
  outputLang: OutputLanguage;
  webtoonMode: boolean; 
}
