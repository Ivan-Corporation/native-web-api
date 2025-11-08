import { useCallback, useState } from "react";

export function useShare() {
  const [error, setError] = useState<string | null>(null);
  const [shared, setShared] = useState(false);

  const share = useCallback(async (data: ShareData) => {
    setError(null);
    setShared(false);
    if (!navigator.share) {
      setError("Web Share API not supported 😢");
      return;
    }
    try {
      await navigator.share(data);
      setShared(true);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  return { share, shared, error };
}
