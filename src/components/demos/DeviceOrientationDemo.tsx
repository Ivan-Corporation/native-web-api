import React from "react";
import { motion } from "framer-motion";
import { useDeviceOrientation } from "../../hooks/useDeviceOrientation";

export default function DeviceOrientationDemo() {
  const { alpha, beta, gamma } = useDeviceOrientation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white/80 space-y-3"
    >
      <h3 className="text-lg font-semibold">Device Orientation</h3>
      <p className="text-sm text-white/60">Move your phone or device — the cube reacts in real time!</p>

      <motion.div
        style={{
          transform: `rotateX(${beta}deg) rotateY(${gamma}deg) rotateZ(${alpha}deg)`,
        }}
        className="w-24 h-24 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-lg mx-auto mt-4 shadow-lg"
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
      />
      <div className="text-center text-sm text-white/60 mt-2">
        α: {alpha.toFixed(1)}° | β: {beta.toFixed(1)}° | γ: {gamma.toFixed(1)}°
      </div>
    </motion.div>
  );
}
