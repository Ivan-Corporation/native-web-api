import React from "react";
import { motion } from "framer-motion";
import { useIdleStatus } from "../../hooks/useIdleStatus";

export default function IdleStatusDemo() {
  const idle = useIdleStatus(4000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white/80 space-y-2 text-center"
    >
      <h3 className="text-lg font-semibold">Idle Detection (custom)</h3>
      <motion.div
        animate={{
          scale: idle ? 1.1 : 1,
          backgroundColor: idle ? "rgba(239,68,68,0.2)" : "rgba(34,197,94,0.2)",
        }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-md"
      >
        {idle ? "💤" : "⚡"}
      </motion.div>
      <p className="text-white/60 text-sm">
        {idle ? "You seem idle... move the mouse!" : "You're active 🔥"}
      </p>
    </motion.div>
  );
}
