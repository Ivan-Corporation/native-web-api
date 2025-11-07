import { useState, type RefObject } from "react";

export function useMediaDevices(videoRef: RefObject<HTMLVideoElement>) {
  const [stream, setStream] = useState<MediaStream | null>(null);

  const start = async () => {
    const media = await navigator.mediaDevices.getUserMedia({ video: true });
    setStream(media);
    if (videoRef.current) videoRef.current.srcObject = media;
  };

  const stop = () => {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
  };

  return { start, stop, active: !!stream };
}
