import { useEffect, useState } from "react";

export function useAmbientLight() {
  const [illuminance, setIlluminance] = useState<number | null>(null);
  const [simulated, setSimulated] = useState(false);

  useEffect(() => {
    try {
      // @ts-ignore experimental API
      const sensor = new AmbientLightSensor();
      sensor.onreading = () => setIlluminance(sensor.illuminance);
      sensor.onerror = () => setIlluminance(null);
      sensor.start();
      return () => sensor.stop();
    } catch {
      setIlluminance(null);
    }
  }, []);

  const simulate = () => {
    setSimulated(true);
    setIlluminance(Math.random() * 100);
  };

  return { illuminance, simulated, simulate };
}
