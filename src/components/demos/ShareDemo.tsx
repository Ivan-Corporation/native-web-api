import React from "react";
import { useShare } from "../../hooks/useShare";

export default function ShareDemo() {
  const { share, shared, error } = useShare();

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <button
        onClick={() =>
          share({
            title: "Native Share Test",
            text: "Testing the Web Share API!",
            url: window.location.href,
          })
        }
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md hover:scale-105 transition"
      >
        Share this page 🌍
      </button>
      {shared && <p className="text-green-400 font-semibold">✅ Shared successfully!</p>}
      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
}
