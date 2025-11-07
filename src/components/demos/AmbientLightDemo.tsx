import { useAmbientLight } from "../../hooks/useAmbientLight";
import { motion } from "framer-motion";

export default function AmbientLightDemo() {
  const { illuminance, simulated, simulate } = useAmbientLight();
  const darkMode = illuminance !== null && illuminance < 20;

  const lux = illuminance !== null ? illuminance.toFixed(1) : "N/A";

  return (
    <motion.div
      animate={{
        backgroundColor: darkMode
          ? "rgba(20,20,20,0.8)"
          : "rgba(255,255,255,0.1)",
      }}
      transition={{ duration: 0.6 }}
      className="p-5 rounded-lg text-center text-white/80 border border-white/10"
    >
      <p className="text-lg font-semibold mb-2">💡 Ambient Light API</p>

      <p className="text-3xl font-bold text-white">
        {lux} <span className="text-sm text-white/60">lux</span>
      </p>

      <p className="text-sm mt-2 text-white/60">
        {darkMode
          ? "🌙 It’s kinda dark in here..."
          : "☀️ Pretty bright, huh?"}
      </p>

      <button
        onClick={simulate}
        className="mt-4 px-3 py-2 bg-purple-600 hover:bg-purple-500 rounded-md text-sm text-white transition"
      >
        {simulated ? "🔄 Randomize again" : "✨ Simulate light change"}
      </button>

      {illuminance === null && !simulated && (
        <p className="mt-3 text-xs text-white/40">
          (Your browser probably doesn’t support this sensor)
        </p>
      )}
    </motion.div>
  );
}
