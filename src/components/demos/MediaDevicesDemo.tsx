import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMediaDevices } from "../../hooks/useMediaDevices";

export default function MediaDevicesDemo() {
  const videoRef:any = useRef<HTMLVideoElement>(null);
  const { start, stop, active } = useMediaDevices(videoRef);
  const [error, setError] = useState<string | null>(null);

  const handleStart = async () => {
    try {
      await start();
      setError(null);
    } catch {
      setError("Permission denied or no camera 🎥");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white/80 space-y-4 text-center"
    >
      <h3 className="text-lg font-semibold">Media Devices API</h3>
      <p className="text-sm text-white/60">
        Access camera or microphone natively
      </p>

      <div className="flex justify-center gap-3">
        {!active ? (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleStart}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-md text-white"
          >
            Start Camera
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={stop}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-md text-white"
          >
            Stop
          </motion.button>
        )}
      </div>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="mx-auto w-64 h-48 bg-black/40 rounded-lg border border-white/10"
      />

      {error && <p className="text-red-400 text-sm">{error}</p>}
    </motion.div>
  );
}
