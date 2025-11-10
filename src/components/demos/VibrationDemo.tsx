import React, { useState } from "react";
import { useVibration } from "../../hooks/useVibration";
import { motion, useAnimation } from "framer-motion";

interface Pattern {
  name: string;
  pattern: number[];
  emoji: string;
  color: string;
  animation?: any;
}

const VIBE_PATTERNS: Pattern[] = [
  {
    name: "Sisu Mode",
    pattern: [200, 50, 200, 50, 300],
    emoji: "Strength",
    color: "bg-blue-600 hover:bg-blue-500",
    animation: { rotate: [0, 10, -10, 15, -15, 0], scale: [1, 1.1, 1, 1.1, 1] },
  },
  {
    name: "Sauna Shock",
    pattern: [100, 100, 100, 100, 500, 200],
    emoji: "Hot",
    color: "bg-red-600 hover:bg-red-500",
    animation: { y: [0, -20, 0, -15, 0], rotate: [0, 360] },
  },
  {
    name: "Reindeer Rampage",
    pattern: [80, 80, 80, 80, 120, 120, 200],
    emoji: "Reindeer",
    color: "bg-yellow-600 hover:bg-yellow-500",
    animation: { x: [-20, 20, -20, 20, 0], rotate: [0, 5, -5, 0] },
  },
  {
    name: "Metal Guitar Solo",
    pattern: [50, 50, 60, 40, 70, 50, 80, 40, 100],
    emoji: "Guitar",
    color: "bg-black hover:bg-gray-800",
    animation: { rotate: [0, -30, 30, -20, 20, 0], scale: [1, 1.2, 1] },
  },
  {
    name: "Angry Nokia 3310",
    pattern: [300, 100, 300, 100, 300],
    emoji: "Brick",
    color: "bg-gray-700 hover:bg-gray-600",
    animation: { scale: [1, 1.3, 0.9, 1.3, 1], rotate: [0, 5, -5, 0] },
  },
  {
    name: "Kalsarikännit",
    pattern: [500, 500, 200, 200, 1000],
    emoji: "Beer",
    color: "bg-amber-600 hover:bg-amber-500",
    animation: { rotate: [0, 360, 720], y: [0, -10, 10, 0] },
  },
  {
    name: "Midsummer Mosquito",
    pattern: [30, 30, 30, 30, 30, 100],
    emoji: "Mosquito",
    color: "bg-green-600 hover:bg-green-500",
    animation: { x: [-5, 5, -5, 5, -5, 5, 0], scale: [1, 0.8, 1.2, 0.8, 1] },
  },
  {
    name: "Ice Swimming",
    pattern: [100, 300, 100, 300, 100],
    emoji: "Ice",
    color: "bg-cyan-600 hover:bg-cyan-500",
    animation: { y: [0, -30, 30, -20, 0], rotate: [0, -180, 180, 0] },
  },
  {
    name: "Salmiakki Overdose",
    pattern: [50, 50, 50, 50, 200, 50, 50],
    emoji: "Candy",
    color: "bg-purple-700 hover:bg-purple-600",
    animation: { scale: [1, 0.7, 1.3, 0.7, 1], rotate: [0, 180, -180, 0] },
  },
  {
    name: "Random Panic",
    pattern: Array.from({ length: 10 }, () => Math.floor(Math.random() * 200) + 50),
    emoji: "Panic",
    color: "bg-pink-600 hover:bg-pink-500",
    animation: { rotate: [0, 360, -360, 720, 0], scale: [1, 1.5, 0.5, 1.5, 1] },
  },
];

export default function VibrationDemo() {
  const { vibrate } = useVibration();
  const controls = useAnimation();
  const [selected, setSelected] = useState<number>(0);

  const startVibe = async (pattern: Pattern) => {
    vibrate(pattern.pattern);
    await controls.start({
      ...(pattern.animation || { rotate: [0, 5, -5, 0] }),
      transition: { duration: pattern.pattern.reduce((a, b) => a + b, 0) / 1000 + 0.2 },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-md mx-auto p-4"
    >
      <p className="text-white/80 text-center font-bold text-lg">
        Make your phone *literally dance* — Finnish Edition
      </p>

      <div className="grid grid-cols-2 gap-3">
        {VIBE_PATTERNS.map((pattern, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              setSelected(i);
              startVibe(pattern);
            }}
            className={`p-3 rounded-lg font-medium text-white shadow-lg transition-all ${
              selected === i ? "ring-4 ring-white/50 scale-105" : ""
            } ${pattern.color}`}
          >
            <div className="text-xl mb-1">{pattern.emoji}</div>
            <div className="text-xs">{pattern.name}</div>
          </motion.button>
        ))}
      </div>

      <motion.div
        animate={controls}
        className="mt-6 p-6 bg-white/10 backdrop-blur rounded-xl text-center"
      >
        <p className="text-6xl" role="img" aria-label="vibration">
          Phone
        </p>
        <p className="text-white/70 text-sm mt-2">
          {VIBE_PATTERNS[selected].name} activated!
        </p>
      </motion.div>

      <p className="text-xs text-white/50 text-center">
        Works only on mobile • Requires user gesture • No permissions needed
      </p>
    </motion.div>
  );
}