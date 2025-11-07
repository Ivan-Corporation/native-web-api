import { motion, AnimatePresence } from "framer-motion";

export default function ApiModal({ open, onClose, title, children }: any) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* затемнение без блюра */}
          <motion.div
            onClick={onClose}
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* сама модалка */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-2xl mx-4 p-6 bg-[#111a2c] rounded-2xl border border-purple-500/30 shadow-[0_0_25px_rgba(124,58,237,0.25)] z-10"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-purple-400">🧩</span> {title}
              </h2>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-purple-300 transition cursor-pointer"
              >
                ✖
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
