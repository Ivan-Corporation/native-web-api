import { useEffect, useState } from "react";

export type NetworkInfo = {
  effectiveType: "slow-2g" | "2g" | "3g" | "4g" | null;
  downlink: number | null; // Mbps
  rtt: number | null; // ms
  saveData: boolean | null;
};

export function useNetworkInfo(): NetworkInfo | null {
  const [info, setInfo] = useState<NetworkInfo | null>(null);

  useEffect(() => {
    const nav = navigator as any;
    const connection =
      nav.connection || nav.mozConnection || nav.webkitConnection;
    console.log("connection", connection);
    if (!connection) {
      setInfo(null);
      return;
    }

    const getConnectionInfo = (): NetworkInfo => ({
      effectiveType: connection.effectiveType ?? null,
      downlink: connection.downlink ?? null,
      rtt: connection.rtt ?? null,
      saveData: connection.saveData ?? null,
    });

    const update = () => {
      setInfo(getConnectionInfo());
    };

    update();

    connection.addEventListener("change", update);
    return () => connection.removeEventListener("change", update);
  }, []);

  return info;
}