import React from "react";
import { useNavigatorMemory } from "../../hooks/useNavigatorMemory";

export default function NavigatorMemoryDemo() {
const { metrics, supported, error, refresh } = useNavigatorMemory(2000);

  if (!supported) {
    return (
      <div>
        <p>measureUserAgentSpecificMemory() not supported.</p>
        <small>Only available in secure contexts (HTTPS) and Chrome 89+.</small>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={refresh}>Retry</button>
      </div>
    );
  }

  if (!metrics) return <div>Measuring memory...</div>;

  return (
    <div style={{ fontFamily: "monospace", fontSize: "14px" }}>
      <h3>App Memory Usage (Modern API)</h3>
      <div>Used: <strong>{metrics.usedMB} MB</strong></div>
      <div>Total: <strong>{metrics.totalMB} MB</strong></div>
      <div>
        Usage: <strong>{(metrics.usageRatio * 100).toFixed(1)}%</strong>
        <progress
          value={metrics.usedBytes}
          max={metrics.totalBytes}
          style={{ width: "100%", margin: "4px 0" }}
        />
      </div>

      {metrics.breakdown.length > 1 && (
        <details style={{ marginTop: "8px" }}>
          <summary>Breakdown ({metrics.breakdown.length} frames)</summary>
          <ul style={{ margin: "4px 0", paddingLeft: "20px" }}>
            {metrics.breakdown.map((item, i) => (
              <li key={i}>
                {(item.bytes / (1024 * 1024)).toFixed(2)} MB — {new URL(item.url).hostname}
              </li>
            ))}
          </ul>
        </details>
      )}

      <button onClick={refresh} style={{ marginTop: "8px", fontSize: "12px" }}>
        Refresh
      </button>
    </div>
  );
}
