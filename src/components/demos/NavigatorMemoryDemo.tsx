import React from "react";
import { useNavigatorMemory } from "../../hooks/useNavigatorMemory";

export default function NavigatorMemoryDemo() {
  const memory = useNavigatorMemory();

  if (!memory)
    return <p className="text-center text-white/60">Memory info unavailable 🤷‍♂️</p>;

  return (
    <div className="text-center space-y-2">
      <h3 className="text-lg font-semibold text-fuchsia-400">💾 JS Heap Memory</h3>
      <div className="text-white/70 space-y-1">
        <p>Limit: {(memory.jsHeapSizeLimit / 1048576).toFixed(1)} MB</p>
        <p>Total: {(memory.totalJSHeapSize / 1048576).toFixed(1)} MB</p>
        <p>Used: {(memory.usedJSHeapSize / 1048576).toFixed(1)} MB</p>
      </div>
    </div>
  );
}
