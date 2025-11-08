import ClipboardDemo from "../components/demos/ClipboardDemo";
import VibrationDemo from "../components/demos/VibrationDemo";
import VisibilityDemo from "../components/demos/VisibilityDemo";
import ScreenCaptureDemo from "../components/demos/ScreenCaptureDemo";
import AmbientLightDemo from "../components/demos/AmbientLightDemo";

import DeviceOrientationDemo from "../components/demos/DeviceOrientationDemo";
import GeolocationDemo from "../components/demos/GeolocationDemo";
import SpeechSynthesisDemo from "../components/demos/SpeechSynthesisDemo";
import IdleDetectionDemo from "../components/demos/IdleStatusDemo";

import IntersectionObserverDemo from "../components/demos/IntersectionObserverDemo";
import AudioContextDemo from "../components/demos/AudioContextDemo";
import StorageManagerDemo from "../components/demos/StorageManagerDemo";
import NetworkInfoDemo from "../components/demos/NetworkInfoDemo";

import BroadcastChannelDemo from "../components/demos/BroadcastChannelDemo";
import KeyboardDemo from "../components/demos/KeyboardDemo";
import HardwareConcurrencyDemo from "../components/demos/HardwareConcurrencyDemo";
import MediaDevicesDemo from "../components/demos/MediaDevicesDemo";
import EyeDropperDemo from "../components/demos/EyeDropperDemo";

import ShareDemo from "../components/demos/ShareDemo";
import ImageCaptureDemo from "../components/demos/ImageCaptureDemo";
import PermissionsDemo from "../components/demos/PermissionsDemo";
import NavigatorMemoryDemo from "../components/demos/NavigatorMemoryDemo";

// 🆕 NEW
import BackgroundSyncDemo from "../components/demos/BackgroundSyncDemo";
import ProximityDemo from "../components/demos/ProximityDemo";
import ClipboardItemDemo from "../components/demos/ClipboardItemDemo";

export type ApiItem = {
  id: string;
  title: string;
  emoji: string;
  description: string;
  category: string;
  Component: React.ComponentType<any>;
};

export const apis: ApiItem[] = [
  // 🧩 System
  {
    id: "clipboard",
    title: "Clipboard API",
    emoji: "📋",
    description: "Copy & read clipboard without extra libs (HTTPS only).",
    category: "System",
    Component: ClipboardDemo,
  },
  {
    id: "clipboard-item",
    title: "Clipboard Item API",
    emoji: "🖼️",
    description:
      "Copy and paste actual images via clipboard — no base64 hacks!",
    category: "System",
    Component: ClipboardItemDemo,
  },
  {
    id: "visibility",
    title: "Page Visibility API",
    emoji: "👁️",
    description: "Detect when user switches tabs (great for games).",
    category: "System",
    Component: VisibilityDemo,
  },
  {
    id: "idle",
    title: "Idle Detection API",
    emoji: "📆",
    description: "Detect when user goes AFK (experimental).",
    category: "System",
    Component: IdleDetectionDemo,
  },
  {
    id: "permissions",
    title: "Permissions API",
    emoji: "🔐",
    description: "Query and monitor permission states in real-time.",
    category: "System",
    Component: PermissionsDemo,
  },
  {
    id: "hardware",
    title: "Hardware Concurrency",
    emoji: "🧠",
    description: "Check how many CPU threads your device has.",
    category: "System",
    Component: HardwareConcurrencyDemo,
  },
  {
    id: "memory",
    title: "Navigator Memory API",
    emoji: "🧩",
    description: "Inspect JS heap memory usage (Chrome only).",
    category: "Performance",
    Component: NavigatorMemoryDemo,
  },

  // 📱 Device
  {
    id: "vibration",
    title: "Vibration API",
    emoji: "📳",
    description: "Make your phone vibrate with JS — yes, really.",
    category: "Device",
    Component: VibrationDemo,
  },
  {
    id: "geolocation",
    title: "Geolocation API",
    emoji: "📍",
    description: "Get user’s current position (with permission).",
    category: "Device",
    Component: GeolocationDemo,
  },
  {
    id: "keyboard",
    title: "Keyboard API",
    emoji: "⌨️",
    description: "Detect pressed keys and combos in real-time.",
    category: "Device",
    Component: KeyboardDemo,
  },

  // 🔊 Audio / Media
  {
    id: "speech",
    title: "Speech Synthesis API",
    emoji: "🔊",
    description: "Make your browser talk — literally.",
    category: "Audio",
    Component: SpeechSynthesisDemo,
  },
  {
    id: "audiocontext",
    title: "Web Audio API",
    emoji: "🎧",
    description: "Generate and visualize sounds dynamically.",
    category: "Audio",
    Component: AudioContextDemo,
  },
  {
    id: "screencap",
    title: "Screen Capture API",
    emoji: "📸",
    description: "Capture your screen directly — no OBS required.",
    category: "Media",
    Component: ScreenCaptureDemo,
  },
  {
    id: "media",
    title: "Media Devices API",
    emoji: "🎥",
    description: "Access your camera or mic natively.",
    category: "Media",
    Component: MediaDevicesDemo,
  },
  {
    id: "imagecapture",
    title: "Image Capture API",
    emoji: "📷",
    description: "Take high-quality photos directly from the camera.",
    category: "Media",
    Component: ImageCaptureDemo,
  },
  {
    id: "eyedropper",
    title: "EyeDropper API",
    emoji: "🎨",
    description: "Pick any pixel color from your screen!",
    category: "Media",
    Component: EyeDropperDemo,
  },

  // 🌐 Network
  {
    id: "network",
    title: "Network Information API",
    emoji: "🌐",
    description: "Know if user is on Wi-Fi or slow 3G 🌩️",
    category: "Network",
    Component: NetworkInfoDemo,
  },
  {
    id: "broadcast",
    title: "Broadcast Channel API",
    emoji: "📡",
    description: "Send messages between tabs instantly 🚀",
    category: "Network",
    Component: BroadcastChannelDemo,
  },
  {
    id: "backgroundsync",
    title: "Background Sync API",
    emoji: "🔁",
    description: "Sync data when connection returns — even offline! ⚡",
    category: "Network",
    Component: BackgroundSyncDemo,
  },

  // 💾 Storage
  {
    id: "storage",
    title: "Storage Manager API",
    emoji: "💾",
    description: "Check disk usage & quota directly in the browser.",
    category: "Storage",
    Component: StorageManagerDemo,
  },

  // 🧭 Sensors
  {
    id: "orientation",
    title: "Device Orientation API",
    emoji: "🧭",
    description: "Detect device motion and rotation in real-time.",
    category: "Sensors",
    Component: DeviceOrientationDemo,
  },
  {
    id: "light",
    title: "Ambient Light API",
    emoji: "💡",
    description: "React to your room lighting (experimental).",
    category: "Sensors",
    Component: AmbientLightDemo,
  },
  {
    id: "proximity",
    title: "Proximity Sensor API",
    emoji: "📶",
    description: "Detect when the user’s face is near the screen 👃",
    category: "Sensors",
    Component: ProximityDemo,
  },

  // 🔍 Misc / UX
  {
    id: "intersection",
    title: "Intersection Observer API",
    emoji: "🔍",
    description: "Observe element visibility for scroll effects.",
    category: "System",
    Component: IntersectionObserverDemo,
  },
  {
    id: "share",
    title: "Web Share API",
    emoji: "🌎",
    description: "Share text, links or files natively — no copy-paste needed.",
    category: "System",
    Component: ShareDemo,
  },
];
