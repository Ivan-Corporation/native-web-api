import { useEffect, useRef, useState } from "react";

export function useSpeechSynthesis() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const speakingRef = useRef(false);

  const loadVoices = () => {
    const loadedVoices = window.speechSynthesis.getVoices();
    if (loadedVoices.length) setVoices(loadedVoices);
  };

  useEffect(() => {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    const warmup = new SpeechSynthesisUtterance(".");
    warmup.volume = 0;
    speechSynthesis.speak(warmup);
  }, []);

  const speak = async (text: string, voiceName?: string) => {
    if (!text.trim()) return;

    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      await new Promise((r) => setTimeout(r, 250));
    }

    const ctxWarmup = new SpeechSynthesisUtterance(" ");
    ctxWarmup.volume = 0;
    speechSynthesis.speak(ctxWarmup);
    await new Promise((r) => setTimeout(r, 150));

    const utterance = new SpeechSynthesisUtterance(text);
    if (voiceName) {
      const voice = voices.find((v) => v.name === voiceName);
      if (voice) utterance.voice = voice;
    }
    // console.log('utterance', utterance)
    // utterance.pitch = 0.2;
    // utterance.volume = 2;
    utterance.onstart = () => (speakingRef.current = true);
    utterance.onend = () => (speakingRef.current = false);
    utterance.onerror = () => (speakingRef.current = false);

    speechSynthesis.speak(utterance);
  };

  const cancel = () => {
    speechSynthesis.cancel();
    speakingRef.current = false;
  };

  return { speak, cancel, voices };
}
