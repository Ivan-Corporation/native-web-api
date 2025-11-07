import { useEffect, useState } from "react";

export function useBroadcastChannel(name: string) {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const channel = new BroadcastChannel(name);
    const onMessage = (e: MessageEvent) => setMessages((m) => [...m, e.data]);
    channel.addEventListener("message", onMessage);

    return () => {
      channel.removeEventListener("message", onMessage);
      channel.close();
    };
  }, [name]);

  const sendMessage = (msg: string) => {
    const channel = new BroadcastChannel(name);
    channel.postMessage(msg);
    channel.close();
  };

  return { messages, sendMessage };
}
