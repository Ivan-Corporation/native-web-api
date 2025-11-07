import { useState, useEffect } from "react";

export function useIdleStatus(timeout = 5000) {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let timer: number;

    const reset = () => {
      clearTimeout(timer);
      setIdle(false);
      timer = window.setTimeout(() => setIdle(true), timeout);
    };

    const events = ["mousemove", "keydown", "scroll", "touchstart"];
    events.forEach(e => window.addEventListener(e, reset));

    reset(); // start timer

    return () => {
      clearTimeout(timer);
      events.forEach(e => window.removeEventListener(e, reset));
    };
  }, [timeout]);

  return idle;
}
