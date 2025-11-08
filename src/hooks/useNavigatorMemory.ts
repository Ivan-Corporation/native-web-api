import { useEffect, useState } from "react";

export function useNavigatorMemory() {
  const [memory, setMemory] = useState<{
    jsHeapSizeLimit: number;
    totalJSHeapSize: number;
    usedJSHeapSize: number;
  } | null>(null);

  useEffect(() => {
    if ("memory" in performance) {
      const mem = (performance as any).memory;
      setMemory(mem);
      const interval = setInterval(() => {
        setMemory({ ...mem });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, []);

  return memory;
}
