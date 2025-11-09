import React from "react";
import { useClipboard } from "../../hooks/useClipboard";
import { motion } from "framer-motion";

export default function ClipboardDemo() {
  const { copied, copy } = useClipboard();
  const sample = "I am a clipboard sample — no libs used ✨";

  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <p className="text-white/70">
        Copy text natively — no npm package, no regrets.
      </p>

      <div className="flex gap-3 items-center">
        <input
          className="flex-1 p-3 rounded-md bg-white/5 text-white outline-none focus:ring-2 focus:ring-purple-500/40 transition"
          value={sample}
          readOnly
        />
        <motion.button
          onClick={() => copy(sample)}
          whileTap={{ scale: 0.9 }}
          className={`px-4 py-2 rounded-md font-medium text-sm transition shadow-md cursor-pointer ${
            copied
              ? "bg-green-500/80 hover:bg-green-500 text-white"
              : "bg-purple-600 hover:bg-purple-500 text-white"
          }`}
        >
          {copied ? "Copied ✅" : "Copy"}
        </motion.button>
      </div>

      {copied && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-sm text-green-400 flex items-center gap-1"
        >
          ✨ Copied to clipboard successfully!
        </motion.div>
      )}

      <p className="text-sm text-white/50 mt-2">
        Works on <strong>HTTPS</strong> or localhost.
      </p>
    </motion.div>
  );
}
