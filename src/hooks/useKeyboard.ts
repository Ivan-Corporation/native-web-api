import { useEffect, useState } from "react";

export function useKeyboard() {
  const [keyInfo, setKeyInfo] = useState({ key: "", code: "" });

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      setKeyInfo({ key: e.key, code: e.code });
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  return keyInfo;
}
