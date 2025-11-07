import React from "react";
import { useVibration } from "../../hooks/useVibration";
import { motion, useAnimation } from "framer-motion";

export default function VibrationDemo() {
  const { vibrate } = useVibration();
  const controls = useAnimation();

  const startVibe = async () => {
    vibrate([100, 80, 120, 80, 200]);
    await controls.start({
      rotate: [0, 5, -5, 3, -3, 0],
      transition: { duration: 0.6 },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <p className="text-white/70">
        Make your phone *literally dance* — Vibration API in action 📳
      </p>

      <motion.button
        animate={controls}
        whileTap={{ scale: 0.9 }}
        onClick={startVibe}
        className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-md text-white font-medium shadow-md"
      >
        Vibrate now 💥
      </motion.button>

      <p className="text-sm text-white/50">
        Works only on mobile and requires user gesture.
      </p>
    </motion.div>
  );
}