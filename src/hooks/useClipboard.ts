import { useState } from "react";

export function useClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      console.error("Clipboard API failed", e);
      alert("Copy failed — try manually (Safari restrictions)");
    }
  };

  return { copied, copy };
}
