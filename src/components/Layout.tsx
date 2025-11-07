import React from "react";
import { motion } from "framer-motion";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0b1020] text-gray-200 relative overflow-hidden">
      {/* subtle animated gradient */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-700/20 via-transparent to-transparent blur-3xl"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative p-8 z-10">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ rotate: 10 }} className="text-4xl">
              🧪
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Web API Playground
              </h1>
              <p className="text-sm text-white/60">
                Native browser APIs — quick, fun, and 100% vanilla.
              </p>
            </div>
          </div>
          <div className="px-3 py-1 text-xs font-medium text-purple-300 bg-purple-500/10 border border-purple-400/20 rounded-lg backdrop-blur-sm">
            Dev Playground
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-14 text-sm text-white/40 text-center">
          Made with ☕, curiosity, and a sprinkle of Web Chaos
        </footer>
      </div>
    </div>
  );
}
