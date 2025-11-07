import ClipboardDemo from "../components/demos/ClipboardDemo";
import VibrationDemo from "../components/demos/VibrationDemo";
import VisibilityDemo from "../components/demos/VisibilityDemo";
import ScreenCaptureDemo from "../components/demos/ScreenCaptureDemo";
import BatteryDemo from "../components/demos/BatteryDemo";
import AmbientLightDemo from "../components/demos/AmbientLightDemo";

export type ApiItem = {
id: string
title: string
emoji: string
description: string
Component: React.ComponentType<any>
}


export const apis:ApiItem[] = [
  {
    id: "clipboard",
    title: "Clipboard API",
    emoji: "📋",
    description: "Copy & read clipboard without extra libs (HTTPS only).",
    Component: ClipboardDemo,
  },
  {
    id: "vibration",
    title: "Vibration API",
    emoji: "📳",
    description: "Make your phone vibrate with JS — yes, really.",
    Component: VibrationDemo,
  },
  {
    id: "visibility",
    title: "Page Visibility API",
    emoji: "👁️",
    description: "Detect when user switches tabs (great for games).",
    Component: VisibilityDemo,
  },
  {
    id: "screencap",
    title: "Screen Capture API",
    emoji: "📸",
    description: "Capture screen directly from browser — no OBS needed.",
    Component: ScreenCaptureDemo,
  },
  {
    id: "battery",
    title: "Battery Status API",
    emoji: "🔋",
    description: "Check battery level natively (where supported).",
    Component: BatteryDemo,
  },
  {
    id: "light",
    title: "Ambient Light API",
    emoji: "💡",
    description: "React to room lighting (experimental).",
    Component: AmbientLightDemo,
  },
];
