import { useEffect, useState } from "react";

export function useBackgroundSync(tag = "demo-sync") {
  const [supported, setSupported] = useState(false);
  const [status, setStatus] = useState<"idle" | "queued" | "synced" | "error">(
    "idle"
  );

  useEffect(() => {
    if ("serviceWorker" in navigator && "SyncManager" in window) {
      setSupported(true);
    }
  }, []);

  async function registerSync() {
    if (!supported) return;
    try {
      const reg = await navigator.serviceWorker.ready;
      await reg.sync.register(tag);
      setStatus("queued");
      setTimeout(() => setStatus("synced"), 3000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return { supported, status, registerSync };
}