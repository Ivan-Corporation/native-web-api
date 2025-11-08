import { motion } from "framer-motion";
import { useDeviceOrientation } from "../../hooks/useDeviceOrientation";

export default function DeviceOrientationDemo() {
  const { alpha, beta, gamma, supported, permission } = useDeviceOrientation();

  const requestAccess = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      const result = await (DeviceOrientationEvent as any).requestPermission();
      alert(`Permission: ${result}`);
    } else {
      alert("No permission needed. Try rotating your phone!");
    }
  };

  if (!supported) {
    return (
      <div className="text-center text-yellow-400 text-sm">
        Device Orientation not supported on this browser.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white/80 space-y-4"
    >
      <h3 className="text-lg font-semibold">3D Device Orientation</h3>

      {/* Permission UI */}
      {permission === "prompt" && (
        <button
          onClick={requestAccess}
          className="px-4 py-2 bg-blue-600 rounded-lg text-sm hover:bg-blue-700 transition"
        >
          Allow Motion Sensors
        </button>
      )}

      {permission === "denied" && (
        <p className="text-red-400 text-sm">Motion sensors blocked. Check settings.</p>
      )}

      {permission === "granted" && (
        <>
          <p className="text-sm text-white/60">
            Tilt your phone — watch the cube move in 3D!
          </p>

          {/* 3D Cube Container */}
          <div className="perspective-1000">
            <motion.div
              style={{
                transform: `rotateX(${beta}deg) rotateY(${-gamma}deg) rotateZ(${alpha}deg)`,
              }}
              className="w-24 h-24 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-lg mx-auto shadow-2xl preserve-3d"
              transition={{ type: "spring", stiffness: 80, damping: 12 }}
            >
              {/* Optional: Add text on face */}
              <div className="flex items-center justify-center h-full text-white font-bold text-2xl">
                3D
              </div>
            </motion.div>
          </div>

          <div className="text-center text-xs text-white/60 mt-3 font-mono">
            α: {alpha.toFixed(1)}° | β: {beta.toFixed(1)}° | γ: {gamma.toFixed(1)}°
          </div>
        </>
      )}
    </motion.div>
  );
}