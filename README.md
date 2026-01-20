# 📜 SceneWeaver: Narrative Architecture System

SceneWeaver is a high-end narrative generation platform that transforms incomplete story fragments into structured, sequential scenes. By leveraging the **Google Gemini API**, it bridges the gap between raw imagination and coherent storytelling through automated world-building, scriptwriting, and visual generation.

---
Demo: https://huggingface.co/spaces/devmeta/sceneweaver

## ✨ Key Features

### 1. Intelligent Narrative Structuring
- **Kishōtenketsu Framework**: Automatically reorganizes raw ideas into the classic four-act structure (Introduction, Development, Twist, Conclusion).
- **World Context Synthesis**: Generates a deep "World Intro" from minimal input to establish atmosphere and stakes.

### 2. Dual Generation Modes
- **Standard Narrative**: Focuses on rich, descriptive prose and cinematic paragraphs suitable for light novels or scripts.
- **Webtoon Panel Mode**: Switches to a graphic novel format, generating **Speech Bubbles** (Dialogue/Inner Monologue), **System Messages**, and **Captions** designed to be overlaid on visuals.

### 3. Visual Continuity & Character Anchoring
- **Character Anchor**: Upload a reference image or provide a detailed description to maintain visual consistency across all generated scenes.
- **Environment Context**: AI ensures the character anchor is dynamically integrated into the specific environment of each scene.

### 4. Interactive Creative Suite
- **Scene-by-Scene Generation**: Generate narrative first, then trigger visual generation for each specific scene.
- **Live Prompt Refinement**: Users can manually edit the AI-generated visual prompts to fine-tune the output.
- **Bilingual Support**: Full native support for both English and Korean storytelling.

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI Models**: 
  - `gemini-2.5-flash`: Core logic, Kishōtenketsu structuring, and scriptwriting.
  - `gemini-2.5-flash-image`: Sequential scene visualization and character-consistent image generation.
- **Architecture**: Modular hook-based state management (`useSceneWeaver`).

---

## 🚀 How It Works

### The Creative Pipeline
1. **Input**: User provides a "Story Core" (fragment, dream, or concept).
2. **Weaving**: Gemini processes the core, applying the selected **Tone** (Dark, Poetic, Cinematic) and **Depth** (Public/Supporter/Full Access).
3. **Structuring**: The system breaks the narrative into sequential scenes, each containing a Visual Prompt, Narrative/Dialogue, and a "Mystery Line."
4. **Visualizing**: The `gemini-2.5-flash-image` model consumes the Visual Prompt (plus the optional Character Anchor) to produce high-fidelity scene art.
5. **Compositing**: In Webtoon Mode, the app dynamically overlays speech bubbles and captions onto the generated art for an authentic comic experience.

---

## 💻 Installation & Setup

1. **Environment**: Ensure you have a valid Gemini API Key.
2. **API Key**: The application expects the key via `process.env.API_KEY`.
3. **Usage**:
   - Enter your story idea in the **Story Core** field.
   - Choose your **Scene Count** and **Output Mode**.
   - Click **Initialize SceneWeaver** to generate the backbone.
   - Click **Visualize** on individual scene cards to generate images.

---

## 🎨 Design Philosophy
SceneWeaver is designed with a **Dark Minimalist** aesthetic, utilizing a "Gold & Charcoal" palette (`#d4af37` on `#121212`) to emphasize the "weaving" of stories. The interface prioritizes focus, keeping the complex AI logic behind a clean, industrial-grade dashboard.

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

---

**SceneWeaver** — *Bridging fragments of imagination into coherent cinematic worlds.*














