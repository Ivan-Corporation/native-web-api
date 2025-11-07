import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSpeechSynthesis } from "../../hooks/useSpeechSynthesis";

export default function SpeechSynthesisDemo() {
  const { speak, cancel, voices } = useSpeechSynthesis();
  const [text, setText] = useState("Hello world! I am your browser speaking. 🗣️");
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

      <select
        onChange={(e) => setVoiceName(e.target.value)}
        className="w-full p-2 rounded-md bg-white/5 text-white/80"
      >
        <option value="">Default voice</option>
        {voices.map((v) => (
          <option key={v.name} value={v.name}>
            {v.name}
          </option>
        ))}
      </select>

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
