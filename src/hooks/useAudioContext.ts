import { useRef } from "react";

export function useAudioContext() {
  const ctxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  const ensureCtx = () => {
    if (!ctxRef.current) ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return ctxRef.current;
  };

  const playTone = (freq: number) => {
    const ctx = ensureCtx();
    stop();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    osc.type = "sine";
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    oscRef.current = osc;
  };

  const stop = () => {
    oscRef.current?.stop();
    oscRef.current = null;
  };

  return { playTone, stop };
}
