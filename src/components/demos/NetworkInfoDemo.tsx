import React from "react";
import { motion } from "framer-motion";
import { useNetworkInfo } from "../../hooks/useNetworkInfo";

export default function NetworkInfoDemo() {
  const info = useNetworkInfo();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white/80 space-y-3"
    >
      <h3 className="text-lg font-semibold">Network Information API</h3>
      {info ? (
        <div className="text-sm text-white/60 space-y-1">
          <p>Type: {info.effectiveType}</p>
          <p>Downlink: {info.downlink} Mbps</p>
          <p>RTT: {info.rtt} ms</p>
          <p>Save Data: {info.saveData ? "Yes" : "No"}</p>
        </div>
      ) : (
        <p className="text-white/50">API not supported in this browser 🫠</p>
      )}
    </motion.div>
  );
}
