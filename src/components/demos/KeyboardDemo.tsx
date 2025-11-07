import React from "react";
import { useKeyboard } from "../../hooks/useKeyboard";
import { motion } from "framer-motion";

export default function KeyboardDemo() {
  const { key, code } = useKeyboard();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white/80 text-center space-y-4"
    >
      <h3 className="text-lg font-semibold">Keyboard API</h3>
      <p className="text-sm text-white/60">
        Press any key to see the magic happen ⌨️
      </p>

      <motion.div
        key={key}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="text-5xl font-bold text-fuchsia-400 select-none"
      >
        {key || "🤔"}
      </motion.div>
      <p className="text-sm text-white/50">{code || "No input yet"}</p>
    </motion.div>
  );
}
