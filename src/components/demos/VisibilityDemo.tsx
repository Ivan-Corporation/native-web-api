import { usePageVisibility } from "../../hooks/usePageVisibility";
import { motion } from "framer-motion";

export default function VisibilityDemo() {
  const { visible, switchCount } = usePageVisibility();

  return (
    <motion.div
      animate={{
        backgroundColor: visible
          ? "rgba(34,197,94,0.15)"
          : "rgba(239,68,68,0.15)",
        scale: visible ? 1 : 0.97,
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="p-4 rounded-md text-center border border-white/5"
    >
      <motion.p
        animate={{ opacity: visible ? 1 : 0.6, y: visible ? 0 : 3 }}
        transition={{ duration: 0.3 }}
        className="text-white text-xl font-semibold"
      >
        {visible ? "👀 Tab Active" : "💤 Tab Hidden"}
      </motion.p>

      <p className="text-sm text-white/50 mt-2">
        You switched tabs <strong>{switchCount}</strong> time
        {switchCount === 1 ? "" : "s"}.
      </p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: visible ? 0 : 1,
          y: visible ? 0 : -3,
        }}
        className="mt-3 text-xs text-red-400"
      >
        (Check console — hidden state logs visible!)
      </motion.div>
    </motion.div>
  );
}
