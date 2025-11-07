import React from "react";
import { useBattery } from "../../hooks/useBattery";
import { motion } from "framer-motion";

export default function BatteryDemo() {
  const battery = useBattery();
  const level = battery ? Math.round(battery.level * 100) : null;

  const isLow = level !== null && level < 20;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <p className="text-white/70">Battery Status API 🔋</p>

      {level !== null ? (
        <motion.div
          animate={isLow ? { x: [0, 3, -3, 0] } : { x: 0 }}
          transition={{ duration: 0.4, repeat: isLow ? Infinity : 0 }}
          className="w-full bg-white/10 rounded-md overflow-hidden h-6"
        >
          <motion.div
            className="h-full transition-all"
            style={{
              width: `${level}%`,
              backgroundColor:
                level > 50
                  ? "#22c55e"
                  : level > 20
                  ? "#eab308"
                  : "#ef4444",
            }}
          />
        </motion.div>
      ) : (
        <p className="text-sm text-white/50">Battery info unavailable ⚡</p>
      )}

      {isLow && (
        <motion.p
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-red-400 text-sm"
        >
          ⚠️ Low battery! Plug in soon!
        </motion.p>
      )}
    </motion.div>
  );
}
