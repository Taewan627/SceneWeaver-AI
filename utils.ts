
import { ParsedStory, Scene } from "./types";

export const SCENE_WEAVER_INSTRUCTION = `
You are SceneWeaver, a narrative generation system.

Your role:
Transform an incomplete human story idea into a coherent world, 
a scene-based narrative, and matching images.

This is NOT a full exposition tool.
Your goal is immersion through fragments, implication, and scene continuity.

*** CRITICAL LANGUAGE RULES ***

1. NARRATIVE / TEXT CONTENT:
   - **STRICTLY** follow the "Output Language" requested by the user.
   - If Output Language is "English", write ONLY in English.
   - If Output Language is "Korean", write ONLY in Korean.

2. IMAGE PROMPT SECTION ([Image Prompt]):
   - **PRIMARY RULE**: The main text of the prompt MUST ALWAYS BE IN ENGLISH (regardless of Output Language).
   - **SECONDARY RULE**: 
     - If Output Language is **Korean**, you MUST append a Korean summary in parentheses at the end.
     - If Output Language is **English**, DO NOT append any Korean text.
   
   - **FORMAT (If Korean selected)**: 
     [Detailed English Visual Description] ([Korean Summary])
   
   - **FORMAT (If English selected)**:
     [Detailed English Visual Description]

*** END LANGUAGE RULES ***

TASKS

STEP 1 — STRUCTURE THE STORY
- Rewrite the rough story idea into a clear Kishōtenketsu structure.
- Do NOT over-explain. Leave intentional gaps.

STEP 2 — SCENE BREAKDOWN
- Divide the story into exactly [IMAGE_COUNT] sequential scenes.

STEP 3 — WORLD INTRO (ONE BLOCK)
- Write a short world introduction (150–250 words).

STEP 4 — IMAGE PROMPT GENERATION
For each scene, generate ONE image prompt.

Rules:
- If a character anchor exists (provided by user), describe the character's key visual traits but explicitly place them in the NEW scene environment. 
- Focus on environments, spaces, atmosphere.
- Image prompt style: Cinematic, No artist names, No camera brands, Focus on mood, power, tension, aftermath.

STEP 5 — SCENE CONTENT GENERATION (MODE DEPENDENT)

IF STANDARD MODE:
- Write one short narrative paragraph (80–120 words).
- The paragraph must directly correspond to the image.

IF WEBTOON SPEECH BUBBLE MODE:
- Replace standard narrative text with WEBTOON-STYLE PANEL TEXT.
- For each Scene, generate:
   - Bubble Type (Dialogue / Inner Monologue / System / Silent Panel)
   - Bubble Text (max 12 words, natural rhythm)
   - Optional Caption (only if needed)

- Dialogue Formatting:
   - Dialogue Bubble: quotation marks. Example: "You were not supposed to see this."
   - Inner Monologue: italicized. Example: *This wasn’t part of the plan.*
   - System / AI Message: brackets. Example: [Deviation detected.]
   - Silent Panel: No text, optional caption.

STEP 6 — MYSTERY LINE INSERTION
At the END of each scene:
- Add ONE separate mystery line (One sentence only).
- Place it AFTER the narrative/bubble content.

STEP 7 — STORY DEPTH FILTER
Adjust information density based on the user's selected level.

STEP 8 — FINAL OUTPUT FORMAT (COPY-PASTE READY)

Return output in THIS EXACT ORDER:

[WORLD INTRO]
(Intro text here)

---

[Scene 1]
Image Prompt: (Prompt text)
(IF STANDARD MODE):
Narrative Text: (Narrative text)
(IF WEBTOON MODE):
Bubble Type: (Type)
Bubble Text: (Text)
Caption: (Optional text)
(ALWAYS):
Mystery Line: (Mystery line text)

---

[Scene 2]
...
(repeat until final scene)

IMPORTANT RULES
- Do NOT mention AI, prompts, or systems.
- Do NOT explain your process.
- Do NOT add commentary outside the format.
- Write as a serious narrative author.
`;

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const parseStoryResponse = (text: string): ParsedStory => {
  const parts = text.split("---").map((p) => p.trim()).filter((p) => p);
  
  let worldIntro = "";
  const scenes: Scene[] = [];

  parts.forEach((part) => {
    if (part.includes("[WORLD INTRO]")) {
      worldIntro = part.replace("[WORLD INTRO]", "").trim();
    } else if (part.match(/\[Scene \d+\]/)) {
      const idMatch = part.match(/\[Scene (\d+)\]/);
      const id = idMatch ? parseInt(idMatch[1], 10) : scenes.length + 1;

      // Common fields
      const imagePromptMatch = part.match(/Image Prompt:\s*([\s\S]*?)(?=(Narrative Text:|Bubble Type:))/i);
      const mysteryMatch = part.match(/Mystery Line:\s*([\s\S]*?$)/i);

      // Standard Mode fields
      const narrativeMatch = part.match(/Narrative Text:\s*([\s\S]*?)(?=Mystery Line:)/i);

      // Webtoon Mode fields
      const bubbleTypeMatch = part.match(/Bubble Type:\s*([\s\S]*?)(?=(Bubble Text:|Caption:|Mystery Line:))/i);
      const bubbleTextMatch = part.match(/Bubble Text:\s*([\s\S]*?)(?=(Caption:|Mystery Line:))/i);
      const captionMatch = part.match(/(?:Optional )?Caption:\s*([\s\S]*?)(?=Mystery Line:)/i);

      if (imagePromptMatch) {
        scenes.push({
          id,
          prompt: imagePromptMatch[1].trim(),
          narrative: narrativeMatch ? narrativeMatch[1].trim() : undefined,
          bubbleType: bubbleTypeMatch ? bubbleTypeMatch[1].trim() : undefined,
          bubbleText: bubbleTextMatch ? bubbleTextMatch[1].trim() : undefined,
          caption: captionMatch ? captionMatch[1].trim() : undefined,
          mystery: mysteryMatch ? mysteryMatch[1].trim() : "",
        });
      }
    }
  });

  return { worldIntro, scenes };
};
