# 🌈 Web API Playground

An interactive React playground that demonstrates **modern & experimental Web APIs** — all in one place.  
Each API has its own live demo, built as a reusable React Hook and a fancy animated UI.

> ⚡ Built with React, TypeScript, and Framer Motion — styled with TailwindCSS.  
> 🎨 Designed to look like your browser got superpowers.

---

## 🚀 Features

🧩 **30+ Native Web APIs**, including:
- Clipboard API & Clipboard Item API  
- Screen Capture, Image Capture, and Media Devices  
- Device Orientation, Proximity Sensor, and Ambient Light  
- Speech Synthesis and Web Audio  
- Storage Manager, Permissions, and Network Info  
- Background Sync and Broadcast Channel  
- EyeDropper, Web Share, Idle Detection  
- ...and more!

🪄 **Live Demos** — Try every API interactively  
💎 **Animated UI** — Framer Motion sparkles, beams, and gradients  
🧠 **Hooks-first architecture** — Each API wrapped in a reusable custom hook  
🌐 **Native-only experience** — 100% Browser APIs, zero backend  
📦 **TypeScript-ready** — Strongly typed and documented hooks  

---

## 🧠 Tech Stack

| Tool | Purpose |
|------|----------|
| ⚛️ **React + Vite** | Frontend |
| 💅 **TailwindCSS** | Styling |
| 🎞 **Framer Motion** | Animations |
| 🧰 **TypeScript** | Types + DX |
| 🧩 **Native Web APIs** | Real demos (no mocks) |

---

## 🧭 Structure

```
src/
├── components/
│   ├── demos/           # Each API's live demo component
│   └── ui/              # Shared UI parts
├── hooks/               # All custom useXxx hooks for APIs
├── data/
│   └── apis.ts          # API metadata & category definitions
└── App.tsx              # Root layout & routing
```

---

## 🧪 Local Setup

```bash
# 1. Clone
git clone https://github.com/yourname/web-api-playground.git
cd web-api-playground

# 2. Install
npm install

# 3. Run dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) 🚀

---

## 🧬 Example Hook

```ts
// useClipboard.ts
export function useClipboard() {
  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };
  const read = async () => await navigator.clipboard.readText();
  return { copy, read };
}
```



## 🧠 Credits

Built by Ivan Koma — powered by curiosity and too much tea ☕  
Inspired by the wild world of browser APIs 🌐

---

## 📜 License

MIT — Free to use, modify, and meme.
