
import React, { useState } from "react";
import { styles } from "../styles";

export const CopyButton = ({ text, label, style, secondary = false }: { text: string, label: string, style?: React.CSSProperties, secondary?: boolean }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const baseStyle = secondary ? styles.copyBtnSecondary : styles.copyBtn;

  return (
    <button 
      onClick={handleCopy} 
      style={{
        ...baseStyle, 
        ...style, 
        ...(copied ? styles.copyBtnSuccess : {})
      }}
    >
      {copied ? "✓ Copied" : label}
    </button>
  );
};
