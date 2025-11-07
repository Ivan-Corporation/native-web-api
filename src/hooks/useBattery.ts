import { useEffect, useState } from "react";

export function useBattery() {
  const [battery, setBattery] = useState<any | null>(null);

  useEffect(() => {
    (navigator as any).getBattery?.().then(setBattery);
  }, []);

  return battery;
}
