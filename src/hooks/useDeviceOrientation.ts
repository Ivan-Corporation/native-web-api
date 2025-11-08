import { useEffect, useState } from "react";

interface OrientationData {
  alpha: number;
  beta: number;
  gamma: number;
  supported: boolean;
  permission: "granted" | "denied" | "prompt" | "unavailable";
}

export function useDeviceOrientation() {
  const [data, setData] = useState<OrientationData>({
    alpha: 0,
    beta: 0,
    gamma: 0,
    supported: false,
    permission: "unavailable",
  });

  useEffect(() => {
    // Check if API exists
    if (!("DeviceOrientationEvent" in window)) {
      setData((prev) => ({ ...prev, supported: false }));
      return;
    }

    let requested = false;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      setData({
        alpha: e.alpha || 0,
        beta: e.beta || 0,
        gamma: e.gamma || 0,
        supported: true,
        permission: "granted",
      });
    };

    const requestPermission = async () => {
      if (requested) return;
      requested = true;

      try {
        // iOS 13+ requires explicit permission
        if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
          const response = await (DeviceOrientationEvent as any).requestPermission();
          if (response === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
            setData((prev) => ({ ...prev, permission: "granted" }));
          } else {
            setData((prev) => ({ ...prev, permission: "denied" }));
          }
        } else {
          // Android or older browsers: auto-allowed on HTTPS/localhost
          window.addEventListener("deviceorientation", handleOrientation);
          setData((prev) => ({ ...prev, permission: "granted", supported: true }));
        }
      } catch (err) {
        console.error("Permission error:", err);
        setData((prev) => ({ ...prev, permission: "denied" }));
      }
    };

    // Auto-request on mount
    requestPermission();

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  return data;
}