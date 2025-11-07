export function useVibration() {
  const vibrate = (pattern: number | number[]) => {
    if ("vibrate" in navigator) {
      navigator.vibrate(pattern);
    } else {
      alert("Vibration API not supported on this device 😢");
    }
  };
  return { vibrate };
}
