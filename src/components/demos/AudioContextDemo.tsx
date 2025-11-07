import React from "react";
import { useAudioContext } from "../../hooks/useAudioContext";
import { motion } from "framer-motion";

export default function AudioContextDemo() {
  const { playTone, stop } = useAudioContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white/80 space-y-4 text-center"
    >
      <h3 className="text-lg font-semibold">Web Audio API</h3>
      <p className="text-sm text-white/60">Generate sound dynamically 🎵</p>

      <div className="flex gap-3 justify-center">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => playTone(440)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-md shadow-md"
        >
          Play A4
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={stop}
          className="px-4 py-2 bg-red-500 hover:bg-red-400 rounded-md shadow-md"
        >
          Stop
        </motion.button>
      </div>
    </motion.div>
  );
}
