import React from "react";
import { usePermissions } from "../../hooks/usePermissions";

const permissionsList = [
  { name: "geolocation", label: "Geolocation" },
  { name: "notifications", label: "Notifications" },
  { name: "clipboard-read", label: "Clipboard Read" },
  { name: "camera", label: "Camera" },
  { name: "microphone", label: "Microphone" },
];

export default function PermissionsDemo() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h2 className="text-xl font-semibold text-white/90">
        Permissions Status
      </h2>
      <div className="flex flex-col gap-3 w-full max-w-sm">
        {permissionsList.map(({ name, label }) => (
          <PermissionRow key={name} name={name} label={label} />
        ))}
      </div>
    </div>
  );
}

function PermissionRow({ name, label }: { name: string; label: string }) {
  const { state } = usePermissions(name as PermissionName);

  let color =
    state === "granted"
      ? "text-green-400"
      : state === "denied"
      ? "text-red-400"
      : "text-yellow-400";

  return (
    <div className="flex justify-between bg-white/5 p-2 px-4 rounded-xl">
      <span className="text-white/80">{label}</span>
      <span className={`font-semibold ${color}`}>
        {state ?? "checking..."}
      </span>
    </div>
  );
}
