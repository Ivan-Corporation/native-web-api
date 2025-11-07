import { useEffect, useState } from "react";

export function useDeviceOrientation() {
  const [orientation, setOrientation] = useState({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      setOrientation({
        alpha: e.alpha || 0,
        beta: e.beta || 0,
        gamma: e.gamma || 0,
      });
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

  return orientation;
}
