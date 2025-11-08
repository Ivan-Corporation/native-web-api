import { useState, useCallback } from "react";

export function useEyeDropper() {
  const [color, setColor] = useState<string | null>(null);
  const [supported, setSupported] = useState<boolean>("EyeDropper" in window);

  const pickColor = useCallback(async () => {
    if (!("EyeDropper" in window)) {
      setSupported(false);
      alert("EyeDropper API not supported in this browser 🥲");
      return;
    }

    try {
      // @ts-ignore
      const eyeDropper = new EyeDropper();
      const result = await eyeDropper.open();
      setColor(result.sRGBHex);
      return result.sRGBHex;
    } catch (err) {
      console.warn("EyeDropper cancelled or failed", err);
    }
  }, []);

  return { color, supported, pickColor };
}
