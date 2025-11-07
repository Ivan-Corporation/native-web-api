import { useEffect, useState } from "react";

type NetworkInformation = {
  type: string;
  effectiveType: string;
  saveData: boolean;
  downlink: number;
  rtt: number;
  rttdelay: number;
  maxrtt: number;
};

export function useNetworkInfo() {
  const [info, setInfo] = useState<NetworkInformation | null>(null);

  useEffect(() => {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (!connection) return;

    const update = () => setInfo({ ...connection });
    update();
    connection.addEventListener("change", update);
    return () => connection.removeEventListener("change", update);
  }, []);

  return info;
}
