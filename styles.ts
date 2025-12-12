
import React from "react";

export const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "20px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    marginBottom: "40px",
    textAlign: "center",
    borderBottom: "1px solid #333",
    paddingBottom: "20px",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "300",
    letterSpacing: "4px",
    margin: "0",
    color: "#e0e0e0",
    fontFamily: "var(--font-serif)",
  },
  subtitle: {
    fontSize: "0.9rem",
    color: "var(--accent)",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginTop: "10px",
  },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: "40px",
    flex: 1,
  },
  panel: {
    background: "var(--card-bg)",
    padding: "30px",
    borderRadius: "4px",
    height: "fit-content",
    border: "1px solid #333",
  },
  outputPanel: {
    padding: "0 20px",
  },
  formGroup: {
    marginBottom: "25px",
  },
  row: {
    display: "flex",
    gap: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "0.8rem",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  input: {
    width: "100%",
    background: "#121212",
    border: "1px solid #333",
    color: "#fff",
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "2px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    background: "#121212",
    border: "1px solid #333",
    color: "#fff",
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "2px",
    minHeight: "120px",
    resize: "vertical",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    background: "#121212",
    border: "1px solid #333",
    color: "#fff",
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "2px",
    cursor: "pointer",
    boxSizing: "border-box",
  },
  fileInput: {
    width: "100%",
    color: "#888",
    fontSize: "0.9rem",
  },
  previewContainer: {
    marginTop: "10px",
    position: "relative",
    display: "inline-block",
  },
  previewImage: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "4px",
    border: "1px solid var(--accent)",
  },
  removeBtn: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    cursor: "pointer",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
    background: "var(--accent)",
    color: "#121212",
    border: "none",
    padding: "16px",
    fontSize: "1rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "2px",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  buttonDisabled: {
    width: "100%",
    background: "#444",
    color: "#888",
    border: "none",
    padding: "16px",
    fontSize: "1rem",
    textTransform: "uppercase",
    letterSpacing: "2px",
    cursor: "not-allowed",
  },
  copyBtn: {
    background: "#333",
    color: "#e0e0e0",
    border: "1px solid #555",
    padding: "10px 20px",
    fontSize: "0.9rem",
    cursor: "pointer",
    borderRadius: "4px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    transition: "all 0.2s",
  },
  copyBtnSecondary: {
    background: "transparent",
    color: "#888",
    border: "1px solid #444",
    padding: "6px 12px",
    fontSize: "0.8rem",
    cursor: "pointer",
    borderRadius: "2px",
    transition: "all 0.2s",
  },
  copyBtnSuccess: {
    background: "#2e7d32",
    borderColor: "#2e7d32",
    color: "#fff",
  },
  toolbar: {
    marginBottom: "30px",
    display: "flex",
    justifyContent: "flex-end",
  },
  emptyState: {
    color: "#444",
    textAlign: "center",
    marginTop: "100px",
    fontSize: "1.2rem",
    letterSpacing: "1px",
  },
  loading: {
    color: "var(--accent)",
    textAlign: "center",
    marginTop: "100px",
  },
  storyContainer: {
    animation: "fadeIn 1s ease",
  },
  worldIntro: {
    marginBottom: "60px",
    borderLeft: "2px solid var(--accent)",
    paddingLeft: "20px",
  },
  sectionTitle: {
    fontSize: "0.8rem",
    color: "var(--accent)",
    margin: "0 0 10px 0",
    letterSpacing: "2px",
  },
  introText: {
    fontFamily: "var(--font-serif)",
    fontSize: "1.1rem",
    color: "#ccc",
  },
  timeline: {
    display: "flex",
    flexDirection: "column",
    gap: "60px",
  },
  sceneCard: {
    background: "#161616",
    border: "1px solid #222",
    padding: "0",
    borderRadius: "4px",
    overflow: "hidden",
  },
  sceneHeader: {
    background: "#1e1e1e",
    padding: "15px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #222",
  },
  sceneNumber: {
    fontFamily: "var(--font-sans)",
    fontWeight: "bold",
    color: "#555",
    letterSpacing: "2px",
  },
  sceneActions: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },
  visualizeBtn: {
    background: "transparent",
    border: "1px solid var(--accent)",
    color: "var(--accent)",
    padding: "10px 24px",
    fontSize: "0.9rem",
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: "1px",
    transition: "all 0.2s",
    fontWeight: "bold"
  },
  visualizeBtnDisabled: {
    background: "transparent",
    border: "1px solid #444",
    color: "#444",
    padding: "10px 24px",
    fontSize: "0.9rem",
    cursor: "not-allowed",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  narrativeContent: {
    padding: "25px",
  },
  narrativeText: {
    fontFamily: "var(--font-serif)",
    fontSize: "1.15rem",
    marginBottom: "20px",
    color: "#e0e0e0",
  },
  mysteryLine: {
    fontFamily: "var(--font-sans)",
    fontSize: "0.9rem",
    color: "#888",
    fontStyle: "italic",
    borderTop: "1px solid #222",
    paddingTop: "15px",
  },
  mysteryIcon: {
    color: "var(--accent)",
    marginRight: "8px",
  },
  visualArea: {
    background: "#000",
    minHeight: "100px",
    borderTop: "1px solid #222",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  generatedImage: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  imageOverlayBtns: {
    position: 'absolute',
    bottom: '15px',
    right: '15px',
    display: 'flex',
    gap: '10px'
  },
  editDrawer: {
    background: '#1a1a1a',
    padding: '20px',
    borderTop: '1px solid var(--accent)',
    width: '100%',
    boxSizing: 'border-box'
  },
  promptPreview: {
    padding: "30px",
    color: "#444",
    fontSize: "0.8rem",
    textAlign: "center",
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto"
  },
  promptLabel: {
    display: "block",
    color: "var(--accent)",
    fontWeight: "bold",
    marginBottom: "10px",
    fontSize: "0.75rem",
    letterSpacing: "1px"
  },
  promptInput: {
    width: "100%",
    background: "#111",
    border: "1px solid #333",
    color: "#e0e0e0",
    padding: "15px",
    fontFamily: "var(--font-sans)",
    fontSize: "0.95rem",
    lineHeight: "1.5",
    borderRadius: "2px",
    minHeight: "100px",
    resize: "vertical",
    boxSizing: "border-box"
  },
  error: {
    color: "#ff4d4d",
    marginTop: "20px",
    textAlign: "center",
  },
  spinner: {
    width: "30px",
    height: "30px",
    border: "2px solid #333",
    borderTop: "2px solid var(--accent)",
    borderRadius: "50%",
    margin: "0 auto 20px auto",
    animation: "spin 1s linear infinite",
  },
  switch: {
    position: 'relative',
    display: 'inline-block',
    width: '50px',
    height: '24px',
  },
  slider: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#333',
    transition: '.4s',
    borderRadius: '24px',
    border: '1px solid #555'
  },
  // Bubble Styles
  bubbleDefault: {
    background: '#fff',
    color: '#111',
    padding: '20px 28px', // Increased padding
    borderRadius: '40px', // More rounded
    borderTopLeftRadius: '4px', 
    fontFamily: 'var(--font-sans)',
    fontWeight: '600',
    fontSize: '1.2rem', // Larger font
    lineHeight: '1.5',
    maxWidth: '90%', // Wider
    margin: '0 auto',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    position: 'relative',
    textAlign: 'center', // Center text for classic comic look
    border: '2px solid #111' // Distinct border
  },
  bubbleMonologue: {
    background: 'rgba(30, 41, 59, 0.95)', // Slightly more opaque
    color: '#e2e8f0',
    padding: '20px 28px',
    borderRadius: '6px', // Boxy for monologue
    fontFamily: 'var(--font-serif)',
    fontStyle: 'italic',
    fontSize: '1.1rem',
    lineHeight: '1.5',
    maxWidth: '90%',
    margin: '0 auto',
    border: '1px solid #64748b',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
  },
  bubbleSystem: {
    background: 'rgba(0, 50, 0, 0.9)',
    color: '#00ff41',
    padding: '15px 20px',
    borderRadius: '2px',
    fontFamily: 'monospace',
    fontSize: '1rem',
    maxWidth: '90%',
    margin: '0 auto',
    border: '1px solid #00ff41',
    boxShadow: '0 0 12px rgba(0, 255, 65, 0.3)',
  },
  bubbleSilent: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    padding: '30px',
    border: '1px dashed #333',
    borderRadius: '8px',
    fontSize: '1.1rem'
  },
  // Overlay Versions
  bubbleOverlay: {
    position: 'relative', // Relative to the flex container (overlay)
    background: '#fff',
    color: '#000',
    padding: '25px 35px', // Big padding for overlay
    borderRadius: '50px',
    borderTopLeftRadius: '5px',
    border: '3px solid #000', // Bold comic border
    fontFamily: 'var(--font-sans)',
    fontWeight: '700', // Bolder text
    fontSize: '1.3rem', // Big readable text
    lineHeight: '1.4',
    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
    zIndex: 10,
    maxWidth: '85%',
    textAlign: 'center',
    alignSelf: 'center' // Center in flex container
  },
  bubbleMonologueBase: {
    background: 'rgba(30, 41, 59, 0.95)',
    color: '#fff',
    borderRadius: '8px',
    border: '2px solid #fff',
    fontFamily: 'var(--font-serif)',
    fontStyle: 'italic',
    fontWeight: '400'
  },
  bubbleSystemBase: {
    background: 'rgba(0,0,0,0.9)',
    color: '#0f0',
    borderRadius: '2px',
    fontFamily: 'monospace',
    border: '2px solid #0f0'
  },
  webtoonOverlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none', // let clicks pass through to edit/regen buttons
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '30px', // More padding from edges
    boxSizing: 'border-box'
  },
  captionBox: {
    background: 'rgba(212, 175, 55, 0.1)',
    borderLeft: '3px solid var(--accent)',
    padding: '10px 15px',
    fontSize: '0.9rem',
    color: '#ccc',
    marginTop: '5px'
  },
  captionOverlay: {
    background: 'rgba(0,0,0,0.85)',
    color: '#fff',
    padding: '12px 18px',
    borderRadius: '4px',
    borderLeft: '4px solid var(--accent)',
    fontSize: '1rem', // Bigger caption
    alignSelf: 'flex-start',
    maxWidth: '90%',
    marginTop: 'auto' // Push to bottom if bubble is missing, but justify-between handles it mostly
  }
};

// Global styles injection
export const injectGlobalStyles = () => {
  if (document.getElementById('sceneweaver-global-styles')) return;
  
  const styleSheet = document.createElement("style");
  styleSheet.id = 'sceneweaver-global-styles';
  styleSheet.innerText = `
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @media (max-width: 800px) {
      div[style*="grid-template-columns: 1fr 2fr"] {
        grid-template-columns: 1fr !important;
      }
    }
    
    /* Toggle Switch Logic */
    .switch input { 
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 2px;
      background-color: #888;
      transition: .4s;
      borderRadius: 50%;
    }
    input:checked + .slider {
      background-color: #d4af37; /* Accent */
      border-color: #d4af37;
    }
    input:checked + .slider:before {
      transform: translateX(24px);
      background-color: #fff;
    }
  `;
  document.head.appendChild(styleSheet);
};
