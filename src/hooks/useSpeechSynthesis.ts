import { useEffect, useState } from "react";

export function useSpeechSynthesis() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const loadVoices = () => {
    const loadedVoices = window.speechSynthesis.getVoices();
    if (loadedVoices.length) setVoices(loadedVoices);
  };

  useEffect(() => {
    loadVoices();
    // Some browsers (esp. Chrome) need this event
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = (text: string, voiceName?: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    if (voiceName) {
      const voice = voices.find((v) => v.name === voiceName);
      if (voice) utterance.voice = voice;
    }
    speechSynthesis.speak(utterance);
  };

  const cancel = () => speechSynthesis.cancel();

  return { speak, cancel, voices };
}
