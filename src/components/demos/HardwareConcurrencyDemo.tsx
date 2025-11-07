import React from "react";
import { motion } from "framer-motion";
import { useHardwareConcurrency } from "../../hooks/useHardwareConcurrency";

export default function HardwareConcurrencyDemo() {
  const cores = useHardwareConcurrency();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white/80 text-center space-y-4"
    >
      <h3 className="text-lg font-semibold">Hardware Concurrency API</h3>
      <p className="text-sm text-white/60">How many CPU threads your device has 🧠</p>

      <div className="text-6xl font-bold text-purple-400">{cores}</div>
      <p className="text-sm text-white/50">
        That’s how many workers you could spawn for parallel tasks 💪
      </p>
    </motion.div>
  );
}
