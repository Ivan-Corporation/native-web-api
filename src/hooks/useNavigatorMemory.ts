import { useEffect, useState, useCallback } from "react";

interface MemoryBreakdown {
  bytes: number;
  breakdown: Array<{
    url: string;
    bytes: number;
  }>;
}

interface MemoryMetrics {
  totalBytes: number;
  usedBytes: number;
  usageRatio: number;
  breakdown: MemoryBreakdown["breakdown"];
  timestamp: number;
  totalMB: string;
  usedMB: string;
}

export function useNavigatorMemory(intervalMs = 3000) {
  const [metrics, setMetrics] = useState<MemoryMetrics | null>(null);
  const [supported, setSupported] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const measureMemory = useCallback(async () => {
    if (!("measureUserAgentSpecificMemory" in performance)) {
      setSupported(false);
      return;
    }

    try {
      setSupported(true);
      const result = (await (performance as any).measureUserAgentSpecificMemory()) as MemoryBreakdown;

      const totalBytes = result.bytes;
      const usedBytes = result.breakdown.reduce((sum, item) => sum + item.bytes, 0);
      const usageRatio = totalBytes > 0 ? usedBytes / totalBytes : 0;

      const toMB = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2);

      setMetrics({
        totalBytes,
        usedBytes,
        usageRatio,
        breakdown: result.breakdown,
        timestamp: Date.now(),
        totalMB: toMB(totalBytes),
        usedMB: toMB(usedBytes),
      });
      setError(null);
    } catch (err: any) {
      // Common: Not allowed in this context (e.g. cross-origin iframe)
      setError(err.message || "Memory measurement failed");
      console.warn("measureUserAgentSpecificMemory failed:", err);
    }
  }, []);

  useEffect(() => {
    measureMemory(); // Initial

    if (intervalMs > 0) {
      const id = setInterval(measureMemory, intervalMs);
      return () => clearInterval(id);
    }
  }, [intervalMs, measureMemory]);

  return { metrics, supported, error, refresh: measureMemory };
}