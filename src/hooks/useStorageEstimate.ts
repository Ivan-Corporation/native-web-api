import { useEffect, useState } from "react";

export function useStorageEstimate() {
  const [estimate, setEstimate] = useState({ usage: 0, quota: 0 });

  useEffect(() => {
    if ("storage" in navigator && navigator.storage.estimate) {
      navigator.storage.estimate().then((res) => {
        setEstimate({
          usage: res.usage || 0,
          quota: res.quota || 0,
        });
      });
    }
  }, []);

  return estimate;
}
