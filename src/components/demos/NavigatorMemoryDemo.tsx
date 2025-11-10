import React from "react";
import { useNavigatorMemory } from "../../hooks/useNavigatorMemory";

export default function NavigatorMemoryDemo() {
  const { memory, supported } = useNavigatorMemory(1000);

  if (!supported) {
    return <div>Memory API not supported in this browser.</div>;
  }

  if (!memory) {
    return <div>Loading memory info...</div>;
  }

  return (
    <div style={{ fontFamily: "monospace", fontSize: "14px" }}>
      <h3>JS Heap Memory</h3>
      <div>Used: {memory.usedMB} MB</div>
      <div>Total: {memory.totalMB} MB</div>
      <div>Limit: {memory.limitMB} MB</div>
      <div>
        Usage: {(memory.usageRatio * 100).toFixed(1)}%
        <progress
          value={memory.usedJSHeapSize}
          max={memory.totalJSHeapSize}
          style={{ width: "100%", marginTop: "4px" }}
        />
      </div>
      <div>
        Available: {(memory.availableJSHeapSize / (1024 * 1024)).toFixed(2)} MB
      </div>
    </div>
  );
}
