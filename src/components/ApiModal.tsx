import { motion, AnimatePresence } from "framer-motion";

export default function ApiModal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* backdrop */}
          <motion.div
            onClick={onClose}
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* modal card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-2xl mx-4 bg-[#111a2c] rounded-2xl border border-purple-500/30 shadow-[0_0_25px_rgba(124,58,237,0.25)] z-10
                       flex flex-col max-h-[90vh]" 
          >
            {/* header */}
            <div className="flex items-center justify-between p-6 pb-0">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-purple-400">{title}</span> 
              </h2>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-purple-300 transition cursor-pointer"
              >
                close
              </button>
            </div>

            {/* scrollable body */}
            <div className="flex-1 overflow-y-auto p-6 pt-3">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}