import { useState, useEffect } from "react";

export function useGeolocation() {
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported 😢");
      return;
    }

    const watcher = navigator.geolocation.watchPosition(
      (pos) => setCoords(pos.coords),
      (err) => setError(err.message),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return { coords, error };
}
