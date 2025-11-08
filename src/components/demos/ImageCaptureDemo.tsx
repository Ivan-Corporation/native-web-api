import React from "react";
import { useImageCapture } from "../../hooks/useImageCapture";

export default function ImageCaptureDemo() {
  const { videoRef, takePhoto, photo, error } = useImageCapture();

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="rounded-lg border border-white/10 w-56 h-40 object-cover"
      />
      <button
        onClick={takePhoto}
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-600 to-fuchsia-500 text-white shadow-md hover:scale-105 transition"
      >
        Take Photo 📸
      </button>
      {photo && (
        <img
          src={photo}
          alt="Captured"
          className="rounded-lg border border-white/10 w-56 h-40 object-cover"
        />
      )}
      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
}
