import { useRef, useEffect } from "react";
import { useScreenCapture } from "../../hooks/useScreenCapture";
import { motion } from "framer-motion";

export default function ScreenCaptureDemo() {
  const { stream, startCapture, stopCapture } = useScreenCapture();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <p className="text-white/70">Capture your screen — browser-cam mode 🎥</p>

      <div className="flex gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={startCapture}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-md text-white font-medium"
        >
          Start Capture
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={stopCapture}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-md text-white font-medium"
        >
          Stop
        </motion.button>
      </div>

      <motion.div
        animate={{
          boxShadow: stream
            ? "0 0 20px rgba(0,255,100,0.4)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden rounded-lg border border-white/10"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full rounded-lg bg-black/20"
        />
      </motion.div>
    </motion.div>
  );
}
