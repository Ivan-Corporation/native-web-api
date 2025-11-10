import { useEffect, useState, useCallback } from "react";

interface NavigatorMemoryInfo {
  jsHeapSizeLimit: number;
  totalJSHeapSize: number;
  usedJSHeapSize: number;
}

interface MemoryUsage extends NavigatorMemoryInfo {
  usageRatio: number; // 0 to 1
  availableJSHeapSize: number;
  usedMB: string;
  totalMB: string;
  limitMB: string;
}

export function useNavigatorMemory(intervalMs = 2000) {
  const [memory, setMemory] = useState<MemoryUsage | null>(null);
  const [supported, setSupported] = useState<boolean>(false);

  const readMemory = useCallback(() => {
    if (!("memory" in performance)) return null;

    const mem = (performance as any).memory as NavigatorMemoryInfo;

    const safeValue = (val: number) => (typeof val === "number" && !isNaN(val) ? val : 0);

    const usedJSHeapSize = safeValue(mem.usedJSHeapSize);
    const totalJSHeapSize = safeValue(mem.totalJSHeapSize);
    const jsHeapSizeLimit = safeValue(mem.jsHeapSizeLimit);

    const usageRatio = totalJSHeapSize > 0 ? usedJSHeapSize / totalJSHeapSize : 0;
    const availableJSHeapSize = totalJSHeapSize - usedJSHeapSize;

    const toMB = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2);

    return {
      jsHeapSizeLimit,
      totalJSHeapSize,
      usedJSHeapSize,
      usageRatio,
      availableJSHeapSize,
      usedMB: toMB(usedJSHeapSize),
      totalMB: toMB(totalJSHeapSize),
      limitMB: toMB(jsHeapSizeLimit),
    };
  }, []);

  useEffect(() => {
    if (!("memory" in performance)) {
      setSupported(false);
      return;
    }

    setSupported(true);

    // Initial read
    setMemory(readMemory());

    const interval = setInterval(() => {
      setMemory(readMemory());
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs, readMemory]);

  return { memory, supported };
}