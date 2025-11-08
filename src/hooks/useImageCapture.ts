import { useEffect, useRef, useState, useCallback } from "react";

export function useImageCapture() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<MediaStreamTrack | null>(null);

  useEffect(() => {
    let stream: MediaStream;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
        trackRef.current = stream.getVideoTracks()[0];
      } catch {
        setError("Camera access denied 😢");
      }
    })();
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const takePhoto = useCallback(async () => {
    if (!trackRef.current) return;
    try {
      // @ts-ignore
      const imageCapture = new ImageCapture(trackRef.current);
      const blob = await imageCapture.takePhoto();
      const url = URL.createObjectURL(blob);
      setPhoto(url);
    } catch {
      setError("Failed to capture photo 😭");
    }
  }, []);

  return { videoRef, photo, takePhoto, error };
}
