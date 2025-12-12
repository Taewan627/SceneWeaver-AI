
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { styles, injectGlobalStyles } from "./styles";
import { InputPanel } from "./components/InputPanel";
import { StoryOutput } from "./components/StoryOutput";
import { useSceneWeaver } from "./hooks/useSceneWeaver";

const App = () => {
  useEffect(() => {
    injectGlobalStyles();
  }, []);

  const {
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
  } = useSceneWeaver();

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>SceneWeaver</h1>
        <p style={styles.subtitle}>Narrative Architecture System</p>
      </header>

      <div style={styles.mainGrid}>
        <InputPanel 
          inputs={inputs} 
          setInputs={setInputs} 
          charImageFile={charImageFile}
          setCharImageFile={setCharImageFile}
          charImagePreview={charImagePreview}
          setCharImagePreview={setCharImagePreview}
          onGenerate={generateStory}
          isProcessing={isProcessing}
          error={error}
        />
        
        <StoryOutput 
          parsedStory={parsedStory}
          rawStoryText={rawStoryText}
          isProcessing={isProcessing}
          onGenerateImage={generateSceneImage}
          onUpdatePrompt={handleUpdatePrompt}
        />
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
