import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useIntersection } from "../../hooks/useIntersection";

export default function IntersectionObserverDemo() {
  const ref:any = useRef<HTMLDivElement>(null);
  const isVisible = useIntersection(ref, { threshold: 0.3 });

  return (
    <div className="space-y-4 text-white/80">
      <h3 className="text-lg font-semibold">Intersection Observer API</h3>
      <p className="text-sm text-white/60">Scroll down to see the box appear 👇</p>

      <div className="h-48 overflow-y-auto border border-white/10 rounded-md p-4">
        <div className="h-40"></div>
        <motion.div
          ref={ref}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: isVisible ? 1 : 0.8,
            opacity: isVisible ? 1 : 0,
            rotate: isVisible ? 0 : -10,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-xl shadow-lg flex items-center justify-center"
        >
          👁️
        </motion.div>
        <div className="h-40"></div>
      </div>

      <p className="text-sm text-center text-white/60">
        {isVisible ? "👋 Visible in viewport" : "🫥 Hidden right now"}
      </p>
    </div>
  );
}
