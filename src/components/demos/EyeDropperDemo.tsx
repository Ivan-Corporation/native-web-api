import React from "react";
import { useEyeDropper } from "../../hooks/useEyeDropper";

export default function EyeDropperDemo() {
  const { color, supported, pickColor } = useEyeDropper();

  if (!supported) {
    return <p className="text-white/60">❌ EyeDropper API not supported in this browser.</p>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={pickColor}
        className="px-5 py-2 rounded-md bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:opacity-90 text-white font-medium shadow-md"
      >
        Pick a Color 🎨
      </button>

      {color && (
        <div className="flex flex-col items-center mt-3">
          <div
            className="w-20 h-20 rounded-full border-4 border-white shadow-inner"
            style={{ backgroundColor: color }}
          />
          <p className="mt-2 text-white/80 font-mono">{color}</p>
        </div>
      )}

      {!color && <p className="text-white/60 text-sm">Choose a color from your screen ✨</p>}
    </div>
  );
}
