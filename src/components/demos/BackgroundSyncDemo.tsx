import React from "react";
import { useBackgroundSync } from "../../hooks/useBackgroundSync";

export default function BackgroundSyncDemo() {
  const { supported, status, registerSync } = useBackgroundSync();

  if (!supported)
    return <p className="text-yellow-400">Not supported in this browser 🥲</p>;

  const statusColors = {
    idle: "text-white/70",
    queued: "text-yellow-400 animate-pulse",
    synced: "text-green-400",
    error: "text-red-400",
  }[status];

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <button
        onClick={registerSync}
        className="px-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
      >
        Register Background Sync
      </button>
      <p className={`${statusColors} font-semibold`}>
        {status === "idle" && "Waiting..."}
        {status === "queued" && "Task queued (will sync soon) ⏳"}
        {status === "synced" && "Task synced successfully ✅"}
        {status === "error" && "Sync failed ❌"}
      </p>
    </div>
  );
}