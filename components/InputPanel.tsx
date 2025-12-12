
import React, { ChangeEvent } from "react";
import { InputState } from "../types";
import { styles } from "../styles";

interface InputPanelProps {
  inputs: InputState;
  setInputs: React.Dispatch<React.SetStateAction<InputState>>;
  charImageFile: File | null;
  setCharImageFile: (f: File | null) => void;
  charImagePreview: string | null;
  setCharImagePreview: (s: string | null) => void;
  onGenerate: () => void;
  isProcessing: boolean;
  error: string | null;
}

export const InputPanel: React.FC<InputPanelProps> = ({ 
  inputs, 
  setInputs, 
  charImageFile, 
  setCharImageFile, 
  charImagePreview, 
  setCharImagePreview,
  onGenerate, 
  isProcessing, 
  error 
}) => {
  
  const handleChange = (field: keyof InputState, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCharImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCharImagePreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={styles.panel}>
      <div style={styles.formGroup}>
        <label style={styles.label}>Story Core</label>
        <textarea
          style={styles.textarea}
          placeholder="Describe your fragment, dream, or concept..."
          value={inputs.storyIdea}
          onChange={(e) => handleChange('storyIdea', e.target.value)}
          disabled={isProcessing}
        />
      </div>

      <div style={styles.row}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Scenes</label>
          <input
            type="number"
            min={1}
            max={8}
            style={styles.input}
            value={inputs.imageCount}
            onChange={(e) => handleChange('imageCount', parseInt(e.target.value))}
            disabled={isProcessing}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Depth</label>
          <select
            style={styles.select}
            value={inputs.storyDepth}
            onChange={(e) => handleChange('storyDepth', e.target.value)}
            disabled={isProcessing}
          >
            <option value="Public">Public (Teaser)</option>
            <option value="Supporter">Supporter (Context)</option>
            <option value="Full Access">Full Access (Reveal)</option>
          </select>
        </div>
      </div>

      <div style={styles.row}>
        <div style={{...styles.formGroup, flex: 1}}>
          <label style={styles.label}>Tone</label>
          <select
            style={styles.select}
            value={inputs.tone}
            onChange={(e) => handleChange('tone', e.target.value)}
            disabled={isProcessing}
          >
            <option value="cinematic">Cinematic</option>
            <option value="dark">Dark / Noir</option>
            <option value="restrained">Restrained</option>
            <option value="poetic">Poetic</option>
          </select>
        </div>
        <div style={{...styles.formGroup, flex: 1}}>
          <label style={styles.label}>Language</label>
          <select
            style={styles.select}
            value={inputs.outputLang}
            onChange={(e) => handleChange('outputLang', e.target.value)}
            disabled={isProcessing}
          >
            <option value="English">English</option>
            <option value="Korean">Korean (한국어)</option>
          </select>
        </div>
      </div>
      
      {/* Webtoon Mode Toggle */}
      <div style={{...styles.formGroup, background: '#252525', padding: '15px', borderRadius: '4px', border: inputs.webtoonMode ? '1px solid var(--accent)' : '1px solid #333'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div>
            <label style={{...styles.label, marginBottom: '4px', color: inputs.webtoonMode ? 'var(--accent)' : '#888'}}>Webtoon Bubble Mode</label>
            <div style={{fontSize: '0.75rem', color: '#bbb'}}>Generate dialogue bubbles & panels instead of paragraphs</div>
          </div>
          <label style={styles.switch}>
            <input 
              type="checkbox" 
              checked={inputs.webtoonMode}
              onChange={(e) => handleChange('webtoonMode', e.target.checked)}
              disabled={isProcessing}
            />
            <span style={styles.slider}></span>
          </label>
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Character Anchor (Optional)</label>
        <input
          type="file"
          accept="image/*"
          style={styles.fileInput}
          onChange={handleImageUpload}
          disabled={isProcessing}
        />
        {charImagePreview && (
          <div style={styles.previewContainer}>
             <img src={charImagePreview} alt="Anchor" style={styles.previewImage} />
             <button 
               style={styles.removeBtn}
               onClick={() => { setCharImageFile(null); setCharImagePreview(null); }}
             >✕</button>
          </div>
        )}
        <input
          type="text"
          style={{...styles.input, marginTop: '10px'}}
          placeholder="Character description (e.g. 'A worn detective in a trench coat')"
          value={inputs.charDesc}
          onChange={(e) => handleChange('charDesc', e.target.value)}
          disabled={isProcessing}
        />
      </div>

      <button 
        style={isProcessing ? styles.buttonDisabled : styles.button}
        onClick={onGenerate}
        disabled={isProcessing}
      >
        {isProcessing ? "Weaving Narrative..." : "Initialize SceneWeaver"}
      </button>
      
      {error && <div style={styles.error}>{error}</div>}
    </div>
  );
};
