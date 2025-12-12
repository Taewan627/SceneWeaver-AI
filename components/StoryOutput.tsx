
import React from "react";
import { ParsedStory } from "../types";
import { styles } from "../styles";
import { SceneCard } from "./SceneCard";
import { CopyButton } from "./common";

interface StoryOutputProps { 
  parsedStory: ParsedStory | null; 
  rawStoryText: string;
  isProcessing: boolean;
  onGenerateImage: (index: number) => void;
  onUpdatePrompt: (index: number, prompt: string) => void;
}

export const StoryOutput: React.FC<StoryOutputProps> = ({ 
  parsedStory, 
  rawStoryText, 
  isProcessing,
  onGenerateImage,
  onUpdatePrompt
}) => {
  if (!parsedStory && !isProcessing) {
    return (
      <div style={styles.outputPanel}>
        <div style={styles.emptyState}>Waiting for input stream...</div>
      </div>
    );
  }

  if (isProcessing && !parsedStory) {
    return (
      <div style={styles.outputPanel}>
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p>Structuring Kishōtenketsu...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.outputPanel}>
      {parsedStory && (
        <div style={styles.storyContainer}>
          <div style={styles.toolbar}>
              <CopyButton text={rawStoryText} label="📋 Copy Complete Output Format" style={{ width: '100%' }} />
          </div>

          <section style={styles.worldIntro}>
            <h3 style={styles.sectionTitle}>WORLD CONTEXT</h3>
            <p style={styles.introText}>{parsedStory.worldIntro}</p>
          </section>

          <div style={styles.timeline}>
            {parsedStory.scenes.map((scene, index) => (
              <SceneCard 
                key={scene.id} 
                scene={scene} 
                index={index} 
                onGenerateImage={onGenerateImage} 
                onUpdatePrompt={onUpdatePrompt}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
