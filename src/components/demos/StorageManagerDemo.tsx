import React from "react";
import { motion } from "framer-motion";
import { useStorageEstimate } from "../../hooks/useStorageEstimate";

export default function StorageManagerDemo() {
  const { usage, quota } = useStorageEstimate();

  const percent = quota ? Math.round((usage / quota) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white/80 space-y-3"
    >
      <h3 className="text-lg font-semibold">StorageManager API</h3>
      {quota ? (
        <>
          <p className="text-sm text-white/60">
            Usage: {(usage / 1024 / 1024).toFixed(2)}MB / {(quota / 1024 / 1024).toFixed(2)}MB
          </p>
          <div className="w-full h-3 bg-white/10 rounded-md overflow-hidden">
            <motion.div
              animate={{ width: `${percent}%` }}
              className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-600"
            />
          </div>
          <p className="text-sm text-center text-white/60 mt-1">{percent}% used</p>
        </>
      ) : (
        <p className="text-sm text-white/50">Storage info not available 😢</p>
      )}
    </motion.div>
  );
}
