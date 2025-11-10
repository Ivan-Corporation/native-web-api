import { useState, useEffect } from "react";

export function usePageVisibility() {
  const [visible, setVisible] = useState(!document.hidden);
  const [switchCount, setSwitchCount] = useState(0);

  useEffect(() => {
    const handleChange = () => {
      setVisible(!document.hidden);
      if (document.hidden === true) {
        setSwitchCount((c) => c + 1);
      }
    };
    document.addEventListener("visibilitychange", handleChange);
    return () => document.removeEventListener("visibilitychange", handleChange);
  }, []);

  return { visible, switchCount };
}