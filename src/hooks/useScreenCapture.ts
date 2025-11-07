import { useState } from "react";

export function useScreenCapture() {
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCapture = async () => {
    try {
      const media = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      setStream(media);
      return media;
    } catch (e) {
      alert("Screen capture failed 😅");
    }
  };

  const stopCapture = () => {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
  };

  return { stream, startCapture, stopCapture };
}
