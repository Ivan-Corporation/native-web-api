import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSpeechSynthesis } from "../../hooks/useSpeechSynthesis";

export default function SpeechSynthesisDemo() {
  const { speak, cancel, voices } = useSpeechSynthesis();
  const [text, setText] = useState(
    "Hello world! I am your browser speaking. 🗣️"
  );
  const [voiceName, setVoiceName] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white/80 space-y-4"
    >
      <h3 className="text-lg font-semibold">Speech Synthesis API</h3>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-3 rounded-md bg-white/5 text-white outline-none focus:ring-2 focus:ring-purple-500/40"
        rows={3}
      />

      <div className="relative">
        <select
          onChange={(e) => setVoiceName(e.target.value)}
          value={voiceName}
          className="w-full p-2 pr-8 rounded-md bg-neutral-800 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/40 appearance-none cursor-pointer"
        >
          <option value="">Default voice</option>
          {voices.map((v) => (
            <option
              key={v.name}
              value={v.name}
              className="bg-neutral-800 text-white"
            >
              {v.name} — {v.lang}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <div className="flex gap-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => speak(text, voiceName)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-md text-white shadow-md"
        >
          🔊 Speak
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={cancel}
          className="px-4 py-2 bg-red-500 hover:bg-red-400 rounded-md text-white shadow-md"
        >
          🛑 Stop
        </motion.button>
      </div>
    </motion.div>
  );
}
