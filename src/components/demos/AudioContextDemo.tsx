import React from "react";
import { motion } from "framer-motion";
import { useAudioContext } from "../../hooks/useAudioContext";

export default function AudioContextDemo() {
  const { coin, laser, jump, explosion, powerUp, click, levelUp } =
    useAudioContext();

  const sfxButtons = [
    { label: "💰 Coin", action: coin, color: "bg-yellow-500" },
    { label: "🔫 Laser", action: laser, color: "bg-pink-500" },
    { label: "🪜 Jump", action: jump, color: "bg-blue-500" },
    { label: "⚡ Power Up", action: powerUp, color: "bg-green-500" },
    { label: "🌟 Level Up", action: levelUp, color: "bg-purple-500" },
    { label: "💥 Explosion", action: explosion, color: "bg-red-600" },
    { label: "🧊 Click", action: click, color: "bg-gray-600" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white/80 space-y-6 text-center"
    >
      <h3 className="text-xl font-semibold">Retro Sound FX Generator 🎮</h3>
      <p className="text-sm text-white/60">
        All sounds are generated natively using the Web Audio API — no samples!
      </p>

      <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
        {sfxButtons.map((b) => (
          <motion.button
            key={b.label}
            whileTap={{ scale: 0.9 }}
            onClick={b.action}
            className={`px-4 py-2 ${b.color} hover:brightness-110 rounded-md shadow-md`}
          >
            {b.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
