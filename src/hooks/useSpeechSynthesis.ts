export function useSpeechSynthesis() {
  const speak = (text: string, voiceName?: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    if (voiceName) {
      const voice = window.speechSynthesis.getVoices().find(v => v.name === voiceName);
      if (voice) utterance.voice = voice;
    }
    speechSynthesis.speak(utterance);
  };

  const cancel = () => speechSynthesis.cancel();

  return { speak, cancel, voices: window.speechSynthesis.getVoices() };
}
