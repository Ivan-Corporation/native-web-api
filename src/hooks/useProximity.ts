import { useEffect, useState } from "react";

export function useProximity() {
  const [distance, setDistance] = useState<number | null>(null);
  const [near, setNear] = useState<boolean | null>(null);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if ("ondeviceproximity" in window) {
      setSupported(true);
      const handleProximity = (e: any) => {
        setDistance(e.value);
        setNear(e.near);
      };
      window.addEventListener("deviceproximity", handleProximity);
      return () => window.removeEventListener("deviceproximity", handleProximity);
    }
  }, []);

  return { supported, distance, near };
}