import { useState, useEffect } from "react";

export function useGeolocation() {
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported");
      return;
    }

    const watcher = navigator.geolocation.watchPosition(
      (pos) => {
        setCoords(pos.coords);
        setError(null);
      },
      (err) => {
        const messages: Record<number, string> = {
          1: "Permission denied",
          2: "Position unavailable",
          3: "Timeout",
        };
        setError(messages[err.code] || err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      }
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return { coords, error };
}