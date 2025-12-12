
import React, { useState } from "react";
import { Scene } from "../types";
import { styles } from "../styles";
import { CopyButton } from "./common";

interface SceneCardProps { 
  scene: Scene; 
  index: number; 
  onGenerateImage: (idx: number) => void; 
  onUpdatePrompt: (idx: number, prompt: string) => void;
}

export const SceneCard: React.FC<SceneCardProps> = ({ 
  scene, 
  index, 
  onGenerateImage, 
  onUpdatePrompt 
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // Helper to render bubbles
  const Bubble = ({ overlay = false }) => {
    if (!scene.bubbleType || !scene.bubbleText) return null;
    
    const type = scene.bubbleType.toLowerCase();
    let bubbleStyle = overlay ? styles.bubbleOverlay : styles.bubbleDefault;
    let label = "DIALOGUE";

    // Adjust styles based on type
    if (type.includes("inner") || type.includes("monologue")) {
      bubbleStyle = overlay ? {...styles.bubbleOverlay, ...styles.bubbleMonologueBase} : styles.bubbleMonologue;
      label = "INNER MONOLOGUE";
    } else if (type.includes("system") || type.includes("ai")) {
      bubbleStyle = overlay ? {...styles.bubbleOverlay, ...styles.bubbleSystemBase} : styles.bubbleSystem;
      label = "SYSTEM";
    } else if (type.includes("silent")) {
       return overlay ? null : <div style={styles.bubbleSilent}>(Silent Panel)</div>;
    }

    // If overlay, we might need simple positioning defaults
    const finalStyle = overlay ? { ...bubbleStyle } : bubbleStyle;

    return (
      <div style={finalStyle}>
        {!overlay && <div style={{ fontSize: '0.6rem', color: '#999', marginBottom: '4px', textTransform: 'uppercase' }}>{label}</div>}
        "{scene.bubbleText}"
      </div>
    );
  };

  const Caption = ({ overlay = false }) => {
    if (!scene.caption) return null;
    const style = overlay ? styles.captionOverlay : styles.captionBox;
    return (
      <div style={style}>
        {!overlay && <span style={{color: 'var(--accent)', fontWeight: 'bold', marginRight: '5px'}}>CAPTION:</span>} 
        {scene.caption}
      </div>
    );
  };

  const renderContentArea = () => {
    // If we have an image AND it's webtoon mode (implied by bubble existence), we DON'T render text here, 
    // it will be overlaid. 
    // UNLESS it's standard narrative.
    if (scene.generatedImageUrl && (scene.bubbleType || scene.bubbleText)) {
       return (
         <div style={{ color: '#888', fontStyle: 'italic', marginBottom: '10px' }}>
           Text content moved to image overlay below.
         </div>
       );
    }

    // Standard Narrative or No Image Yet
    if (scene.bubbleType || scene.bubbleText) {
       // Webtoon mode but no image yet -> Show text normally
       return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Bubble />
          <Caption />
        </div>
       );
    } 
    
    // Standard Narrative
    return <p style={styles.narrativeText}>{scene.narrative}</p>;
  };

  const getCopyText = () => {
    if (scene.bubbleType) {
      let text = `[${scene.bubbleType}]\n${scene.bubbleText || ''}`;
      if (scene.caption) text += `\nCaption: ${scene.caption}`;
      text += `\nMystery: ${scene.mystery}`;
      return text;
    }
    return `${scene.narrative}\n\n${scene.mystery}`;
  };

  return (
    <div style={styles.sceneCard}>
      <div style={styles.sceneHeader}>
        <span style={styles.sceneNumber}>SCENE {scene.id < 10 ? `0${scene.id}` : scene.id}</span>
        <div style={styles.sceneActions}>
          <CopyButton 
            text={getCopyText()} 
            label="Copy Text" 
            secondary 
            style={{ marginRight: '10px' }} 
          />
        </div>
      </div>

      <div style={styles.narrativeContent}>
        {renderContentArea()}
        <div style={styles.mysteryLine}>
            <span style={styles.mysteryIcon}>✦</span> {scene.mystery}
        </div>
      </div>

      <div style={styles.visualArea}>
        {scene.isGeneratingImage ? (
          <div style={{ color: '#888', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{...styles.spinner, width: '20px', height: '20px', margin: 0, borderWidth: '2px'}}></div>
              Creating visual...
          </div>
        ) : scene.generatedImageUrl ? (
          <div style={{ position: 'relative', width: '100%' }}>
              <img src={scene.generatedImageUrl} alt={`Scene ${scene.id}`} style={styles.generatedImage} />
              
              {/* Overlay Bubbles if Webtoon Mode */}
              {(scene.bubbleType || scene.bubbleText) && (
                <div style={styles.webtoonOverlayContainer}>
                   <Bubble overlay={true} />
                   <Caption overlay={true} />
                </div>
              )}

              <div style={styles.imageOverlayBtns}>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  style={{ ...styles.copyBtnSecondary, marginRight: '8px', fontSize: '0.7rem', background: 'rgba(0,0,0,0.7)', color: 'white', border: 'none' }}
                >
                  {isEditing ? "Close Edit" : "✐ Edit Prompt"}
                </button>
                <button 
                  onClick={() => onGenerateImage(index)}
                  style={{ ...styles.copyBtnSecondary, marginRight: '8px', fontSize: '0.7rem', background: 'rgba(0,0,0,0.7)', color: 'white', border: 'none' }}
                >
                  ↻ Regenerate
                </button>
                <a 
                  href={scene.generatedImageUrl} 
                  download={`scene_${scene.id}.png`}
                  style={{ ...styles.copyBtnSecondary, textDecoration: 'none', display: 'inline-block', fontSize: '0.7rem', background: 'rgba(0,0,0,0.7)', color: 'white', border: 'none' }}
                >
                  ↓ Download
                </a>
              </div>

              {isEditing && (
                <div style={styles.editDrawer}>
                  <span style={styles.promptLabel}>ADJUST VISUAL PROMPT</span>
                  <textarea
                    style={{...styles.promptInput, background: '#222'}}
                    value={scene.prompt}
                    onChange={(e) => onUpdatePrompt(index, e.target.value)}
                  />
                  <button 
                    style={{...styles.visualizeBtn, width: '100%', marginTop: '10px'}}
                    onClick={() => {
                      onGenerateImage(index);
                      setIsEditing(false);
                    }}
                  >
                    GENERATE NEW IMAGE
                  </button>
                </div>
              )}
          </div>
        ) : (
          <div style={styles.promptPreview}>
              <span style={styles.promptLabel}>VISUAL PROMPT (EDITABLE)</span>
              <textarea
                style={styles.promptInput}
                value={scene.prompt}
                onChange={(e) => onUpdatePrompt(index, e.target.value)}
              />
              <div style={{ marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button 
                  style={styles.visualizeBtn}
                  onClick={() => onGenerateImage(index)}
                >
                  Visualize
                </button>
                <CopyButton 
                  text={scene.prompt} 
                  label="Copy" 
                  secondary 
                  style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                />
              </div>
          </div>
        )}
      </div>
    </div>
  );
};
