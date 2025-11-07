import React from "react";
import { useGeolocation } from "../../hooks/useGeolocation";
import { motion } from "framer-motion";

export default function GeolocationDemo() {
  const { coords, error } = useGeolocation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white/80 space-y-3"
    >
      <h3 className="text-lg font-semibold">Geolocation API</h3>
      {error ? (
        <p className="text-red-400">{error}</p>
      ) : coords ? (
        <>
          <p className="text-sm text-white/60">Your live location:</p>
          <div className="text-center mt-2">
            <p className="font-mono">🌍 Lat: {coords.latitude.toFixed(4)}</p>
            <p className="font-mono">📍 Lng: {coords.longitude.toFixed(4)}</p>
            <p className="text-sm text-white/50 mt-1">
              Accuracy: ±{coords.accuracy.toFixed(1)}m
            </p>
          </div>
        </>
      ) : (
        <p className="text-white/60">Requesting location... 🧭</p>
      )}
    </motion.div>
  );
}
