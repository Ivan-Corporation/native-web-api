import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ApiItem } from "../data/apis";

export default function ApiCard({
  item,
  onTry,
}: {
  item: ApiItem;
  onTry: (id: string) => void;
}) {
  const random = useMemo(
    () => ({
      beamDelay: Math.random() * 2,
      beamSpeed: 3 + Math.random() * 3,
      pulseDelay: Math.random() * 3,
      pulseSpeed: 5 + Math.random() * 3,
      sparkleCount: 8 + Math.floor(Math.random() * 4),
    }),
    []
  );

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className="relative group rounded-2xl overflow-hidden bg-[#0f1724]/90 border border-white/5 shadow-lg hover:shadow-fuchsia-500/30 backdrop-blur-lg"
    >
      {/* 🌈 Hover-only visual effects */}
      <AnimatePresence>
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          {/* Beam */}
          <motion.div
            className="absolute top-0 left-[-50%] w-[50%] h-full bg-gradient-to-r from-transparent via-fuchsia-400/15 to-transparent blur-3xl"
            animate={{ x: ["0%", "200%"] }}
            transition={{
              duration: random.beamSpeed,
              delay: random.beamDelay,
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1],
            }}
          />

          {/* Aura */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-purple-600/10 to-fuchsia-500/10 blur-md pointer-events-none"
            animate={{
              opacity: [0.25, 0.45, 0.25, 0.35],
              scale: [1, 1.02, 1, 1.01],
            }}
            transition={{
              duration: random.pulseSpeed,
              delay: random.pulseDelay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Sparkles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: random.sparkleCount }).map((_, i) => {
              const top = `${Math.random() * 100}%`;
              const left = `${Math.random() * 100}%`;
              const size = 0.15 + Math.random() * 0.25;
              const duration = 3 + Math.random() * 2;
              const delay = Math.random() * 4;

              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    top,
                    left,
                    width: `${size}rem`,
                    height: `${size}rem`,
                    background:
                      "radial-gradient(circle, rgba(232,121,249,0.55) 0%, transparent 70%)",
                  }}
                  animate={{
                    opacity: [0.2, 0.8, 0.3, 0.6, 0.25],
                    scale: [0.9, 1.2, 0.8, 1.1, 0.9],
                    y: [0, -6, 0, -4, 0],
                  }}
                  transition={{
                    duration,
                    delay,
                    repeat: Infinity,
                    ease: [0.42, 0, 0.58, 1],
                  }}
                />
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 🧩 Content */}
      <div className="relative z-10 p-5 flex flex-col justify-between h-full">
        <div className="flex items-start gap-3">
          <motion.div
            whileHover={{ y: -3, rotate: 4 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="text-4xl"
          >
            {item.emoji}
          </motion.div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
            <p className="text-sm text-white/60 leading-snug">
              {item.description}
            </p>
          </div>
        </div>
        <motion.button
          onClick={() => onTry(item.id)}
          whileTap={{ scale: 0.96 }}
          whileHover={{ boxShadow: "0 0 16px rgba(232,121,249,0.35)" }}
          className="mt-5 px-4 py-2 rounded-md text-sm font-semibold bg-gradient-to-r cursor-pointer from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white shadow-md transition"
        >
          Try Demo ⚡
        </motion.button>
      </div>
    </motion.div>
  );
}
